import { NextRequest, NextResponse } from "next/server";
import { XApiService } from "@/lib/services/x-api";
import { GeminiApiService } from "@/lib/services/gemini-api";
import { AnalysisResult } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    // Clean username (remove @ if present)
    const cleanUsername = username.replace("@", "");

    // Initialize services
    const xApi = new XApiService();
    const geminiApi = new GeminiApiService();

    try {
      // Step 1: Get user profile
      console.log(`Fetching profile for @${cleanUsername}...`);
      const userProfile = await xApi.getUserByUsername(cleanUsername);

      if (!userProfile) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      // Step 2: Get user's recent tweets
      console.log(`Fetching tweets for user ID ${userProfile.id}...`);
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
      console.log("Performing AI analysis...");
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
          topTopics: contentAnalysis.semanticTopics.primaryThemes.map((topic, i) => ({
            topic,
            score: 85 - i * 10, // Estimated scores
          })),
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
          hooks: viralFormulas.hookPatterns.openingTypes.slice(0, 3).map(hook => ({
            pattern: hook.type,
            successRate: hook.successRate,
            engagementBoost: `+${Math.round(hook.successRate * 2)}%`,
          })),
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
      console.error("API error:", apiError);

      // Check for specific API errors
      if (apiError.message?.includes("User not found")) {
        return NextResponse.json(
          { error: "User not found. Please check the username." },
          { status: 404 }
        );
      }

      if (apiError.message?.includes("Rate limit")) {
        return NextResponse.json(
          { error: "API rate limit reached. Please try again later." },
          { status: 429 }
        );
      }

      // For development, return mock data if APIs fail
      if (process.env.NODE_ENV === "development") {
        console.log("Falling back to mock data...");
        return NextResponse.json(getMockData(cleanUsername));
      }

      throw apiError;
    }

  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze profile. Please try again." },
      { status: 500 }
    );
  }
}

// Mock data fallback for development
function getMockData(username: string): AnalysisResult {
  return {
    profile: {
      username,
      displayName: "Mock User",
      verified: true,
      followers: 125000,
      following: 892,
      tweets: 4523,
      joinDate: "2020-03-15",
      bio: "AI researcher, entrepreneur, tech enthusiast"
    },
    metrics: {
      avgEngagement: 3.2,
      viralRate: 12,
      postsPerDay: 4.5,
      replyRate: 78,
      retweetRate: 234,
      growthRate: 8.5
    },
    content: {
      topTopics: [
        { topic: "Artificial Intelligence", score: 85 },
        { topic: "Technology Trends", score: 72 },
        { topic: "Business Strategy", score: 68 },
        { topic: "Innovation", score: 61 }
      ],
      topHashtags: ["#AI", "#Tech", "#Innovation", "#Future", "#MachineLearning"],
      contentMix: {
        original: 60,
        replies: 25,
        retweets: 15
      },
      bestTime: "2:00 PM EST",
      peakDays: ["Tuesday", "Thursday"]
    },
    voice: {
      personality: {
        humor: { score: 78, description: "Frequently uses wit and humor" },
        authority: { score: 85, description: "Strong expertise positioning" },
        empathy: { score: 72, description: "Connects emotionally with audience" },
        controversy: { score: 45, description: "Moderate controversial takes" }
      },
      style: {
        complexity: "Moderate",
        vocabulary: "Professional yet accessible",
        sentenceLength: "Short to medium",
        emojiUsage: 65
      },
      emotionalTone: [
        { emotion: "Optimistic", score: 82 },
        { emotion: "Professional", score: 79 },
        { emotion: "Inspirational", score: 71 },
        { emotion: "Casual", score: 58 }
      ]
    },
    templates: {
      hooks: [
        {
          pattern: "Controversial opinion: [STATEMENT]\\n\\nHere's why I'm right: [REASONING]",
          successRate: 89,
          engagementBoost: "+234%"
        }
      ],
      topPerformers: [
        {
          text: "The future of AI isn't about replacing humans...",
          engagement: 12500,
          type: "thread"
        }
      ]
    },
    recommendations: [
      "Post more threads - they get 3x more engagement",
      "Increase posting frequency on Tuesdays",
      "Use more questions as hooks",
      "Engage more with replies for community building"
    ]
  };
}