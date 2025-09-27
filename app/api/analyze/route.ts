import { NextRequest, NextResponse } from "next/server";
import { XApiService } from "@/lib/services/x-api";
import { GeminiApiService } from "@/lib/services/gemini-api";
import { AnalysisResult } from "@/lib/types";
import { validateApiKeys } from "@/lib/config/api-config";

// Input validation helper
function isValidUsername(username: string): boolean {
  // Allow alphanumeric, underscore, and max 15 chars (Twitter username rules)
  const usernameRegex = /^[a-zA-Z0-9_]{1,15}$/;
  return usernameRegex.test(username);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, xBearerToken, geminiApiKey } = body;

    // Validate required fields
    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Clean and validate username
    const cleanUsername = username.replace("@", "").trim();

    if (!isValidUsername(cleanUsername)) {
      return NextResponse.json(
        { error: "Invalid username format. Please use only letters, numbers, and underscores (max 15 characters)." },
        { status: 400 }
      );
    }

    // Validate and get API keys securely
    const apiValidation = validateApiKeys(xBearerToken, geminiApiKey);

    if (!apiValidation.valid) {
      return NextResponse.json(
        { error: apiValidation.error || "API configuration error" },
        { status: 400 }
      );
    }

    const { xApiKey, geminiKey } = apiValidation;

    // Initialize services with validated keys
    const xApi = new XApiService(xApiKey);
    const geminiApi = new GeminiApiService(geminiKey);

    try {
      // Step 1: Get user profile (no console logging in production)
      const userProfile = await xApi.getUserByUsername(cleanUsername);

      if (!userProfile) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      // Step 2: Get user's recent tweets
      const tweets = await xApi.getUserTweets(userProfile.id, 100);

      if (!tweets || tweets.length === 0) {
        return NextResponse.json(
          { error: "No tweets found for this user" },
          { status: 404 }
        );
      }

      // Step 3: Extract tweet texts for analysis
      const tweetTexts = tweets.map(t => t.text);

      // Step 4: Perform AI analysis
      const [contentAnalysis, voiceAnalysis, viralFormulas] = await Promise.all([
        geminiApi.analyzeContent(tweetTexts),
        geminiApi.analyzeVoice(tweetTexts),
        geminiApi.extractViralFormulas(tweetTexts.slice(0, 20)) // Top tweets for viral patterns
      ]);

      // Step 5: Calculate metrics
      const totalEngagement = tweets.reduce(
        (sum, tweet) => sum + tweet.public_metrics.like_count + tweet.public_metrics.retweet_count + tweet.public_metrics.reply_count,
        0
      );
      const avgEngagement = totalEngagement / tweets.length;

      // Find viral tweets (high engagement)
      const viralThreshold = avgEngagement * 3; // 3x average is considered viral
      const viralTweets = tweets.filter(
        t => (t.public_metrics.like_count + t.public_metrics.retweet_count) > viralThreshold
      );
      const viralRate = (viralTweets.length / tweets.length) * 100;

      // Extract hashtags
      const allHashtags: { [key: string]: number } = {};
      tweets.forEach(tweet => {
        tweet.entities?.hashtags?.forEach(hashtag => {
          allHashtags[hashtag.tag] = (allHashtags[hashtag.tag] || 0) + 1;
        });
      });
      const topHashtags = Object.entries(allHashtags)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([tag]) => `#${tag}`);

      // Calculate posting frequency
      const oldestTweet = new Date(tweets[tweets.length - 1]?.created_at || new Date());
      const newestTweet = new Date(tweets[0]?.created_at || new Date());
      const daysDiff = Math.max(1, (newestTweet.getTime() - oldestTweet.getTime()) / (1000 * 60 * 60 * 24));
      const postsPerDay = tweets.length / daysDiff;

      // Step 6: Generate recommendations
      const analysisData = {
        metrics: { avgEngagement, viralRate, postsPerDay },
        content: contentAnalysis,
        voice: voiceAnalysis,
      };
      const recommendations = await geminiApi.generateRecommendations(analysisData);

      // Step 7: Compile final analysis result
      const analysisResult: AnalysisResult = {
        profile: {
          username: userProfile.username,
          displayName: userProfile.name,
          verified: userProfile.verified || false,
          followers: userProfile.public_metrics.followers_count,
          following: userProfile.public_metrics.following_count,
          tweets: userProfile.public_metrics.tweet_count,
          joinDate: new Date(userProfile.created_at).toLocaleDateString(),
          bio: userProfile.description || "",
        },
        metrics: {
          avgEngagement: Math.round(avgEngagement * 10) / 10,
          viralRate: Math.round(viralRate * 10) / 10,
          postsPerDay: Math.round(postsPerDay * 10) / 10,
          replyRate: tweets.filter(t => t.referenced_tweets?.some(rt => rt.type === "replied_to")).length,
          retweetRate: tweets.filter(t => t.referenced_tweets?.some(rt => rt.type === "retweeted")).length,
          growthRate: 0, // Would need historical data
        },
        content: {
          topTopics: contentAnalysis?.semanticTopics?.primaryThemes?.map((topic, i) => ({
            topic,
            score: 85 - i * 10, // Estimated scores
          })) || [],
          topHashtags,
          contentMix: {
            original: tweets.filter(t => !t.referenced_tweets).length,
            replies: tweets.filter(t => t.referenced_tweets?.some(rt => rt.type === "replied_to")).length,
            retweets: tweets.filter(t => t.referenced_tweets?.some(rt => rt.type === "retweeted")).length,
          },
          bestTime: "2:00 PM EST", // Would need time analysis
          peakDays: ["Tuesday", "Thursday"], // Would need day analysis
        },
        voice: voiceAnalysis,
        templates: {
          hooks: viralFormulas?.hookPatterns?.openingTypes?.slice(0, 3).map(hook => ({
            pattern: hook.type,
            successRate: hook.successRate,
            engagementBoost: `+${Math.round(hook.successRate * 2)}%`,
          })) || [],
          topPerformers: viralTweets.slice(0, 3).map(tweet => ({
            text: tweet.text.substring(0, 100) + "...",
            engagement: tweet.public_metrics.like_count + tweet.public_metrics.retweet_count,
            type: tweet.text.includes("1/") ? "thread" : "single",
          })),
        },
        recommendations,
      };

      return NextResponse.json(analysisResult);

    } catch (apiError: any) {

      // Check for specific API errors
      if (apiError.message?.includes("User not found")) {
        return NextResponse.json(
          { error: "User not found. Please check the username." },
          { status: 404 }
        );
      }

      if (apiError.message?.includes("429") || apiError.message?.includes("Rate limit") || apiError.message?.includes("Too Many Requests")) {
        return NextResponse.json(
          { error: "X API rate limit reached. Please wait a few minutes and try again." },
          { status: 429 }
        );
      }

      // Return error if APIs fail
      throw apiError;
    }

  } catch (error) {
    // Log errors securely (in production, use proper logging service)
    if (process.env.NODE_ENV === 'development') {
      console.error("Analysis error:", error);
    }
    return NextResponse.json(
      { error: "Failed to analyze profile. Please try again." },
      { status: 500 }
    );
  }
}