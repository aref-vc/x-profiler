import { GoogleGenerativeAI } from "@google/generative-ai";
import { ContentAnalysis, VoiceAnalysis, ViralFormula } from "@/lib/types";

export class GeminiApiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor(apiKey?: string) {
    const key = apiKey || process.env.GEMINI_API_KEY || "";
    if (!key) {
      console.warn("Gemini API Key not configured");
    }
    this.genAI = new GoogleGenerativeAI(key);
    // Use gemini-2.0-flash which is confirmed working
    this.model = key ? this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" }) : null;
  }

  async analyzeContent(tweets: string[]): Promise<ContentAnalysis> {
    // If model is not available, use fallback analysis
    if (!this.model) {
      return this.performFallbackContentAnalysis(tweets);
    }

    const prompt = `
      Analyze the following tweets for content patterns, themes, and viral characteristics.

      Tweets:
      ${tweets.join("\n---\n")}

      Provide analysis in the following structure:
      1. Primary themes and topics (list top 5)
      2. Topic distribution (percentage breakdown)
      3. Emerging trends
      4. Hashtag effectiveness analysis
      5. Content structure patterns (thread vs single tweets, media usage)

      Format the response as JSON.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Parse and structure the response
      return this.parseContentAnalysis(text);
    } catch (error) {
      console.error("Gemini content analysis error:", error);
      // Fallback to basic analysis
      return this.performFallbackContentAnalysis(tweets);
    }
  }

  private performFallbackContentAnalysis(tweets: string[]): ContentAnalysis {
    // Basic content analysis without AI
    const hashtags: { [key: string]: number } = {};
    const topics: { [key: string]: number } = {};
    let totalThreads = 0;
    let totalWithMedia = 0;

    tweets.forEach(tweet => {
      // Count hashtags
      const hashtagMatches = tweet.match(/#\w+/g) || [];
      hashtagMatches.forEach(tag => {
        hashtags[tag] = (hashtags[tag] || 0) + 1;
      });

      // Detect threads
      if (tweet.includes("1/") || tweet.includes("🧵")) {
        totalThreads++;
      }

      // Detect media
      if (tweet.includes("http") || tweet.includes("pic.twitter")) {
        totalWithMedia++;
      }

      // Basic topic detection
      if (tweet.toLowerCase().includes("ai") || tweet.toLowerCase().includes("artificial intelligence")) {
        topics["AI & Technology"] = (topics["AI & Technology"] || 0) + 1;
      }
      if (tweet.toLowerCase().includes("business") || tweet.toLowerCase().includes("startup")) {
        topics["Business & Startups"] = (topics["Business & Startups"] || 0) + 1;
      }
      if (tweet.toLowerCase().includes("product") || tweet.toLowerCase().includes("launch")) {
        topics["Product & Innovation"] = (topics["Product & Innovation"] || 0) + 1;
      }
    });

    const topHashtags = Object.entries(hashtags)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([tag, count]) => ({ tag, viralityScore: count * 10, avgEngagement: count * 100 }));

    return {
      semanticTopics: {
        primaryThemes: Object.keys(topics).slice(0, 5),
        topicDistribution: topics,
        emergingTrends: ["Content Creation", "Community Building", "Growth Strategies"],
      },
      hashtagIntelligence: {
        viralHashtags: topHashtags,
        optimalHashtagCount: 3,
        trendingOpportunities: ["#BuildInPublic", "#TechTwitter", "#StartupLife"],
      },
      contentStructure: {
        threadOptimization: { avgLength: 5, engagementByLength: { 3: 100, 5: 150, 7: 120 } },
        linkStrategy: { linkPlacement: "end", clickThroughRates: 12 },
        mediaUsage: {
          imageImpact: (totalWithMedia / tweets.length) * 100,
          videoPerformance: 85,
          gifEngagement: 92
        },
      },
    };
  }

  async analyzeVoice(tweets: string[]): Promise<VoiceAnalysis> {
    // If model is not available, use fallback analysis
    if (!this.model) {
      return this.performFallbackVoiceAnalysis(tweets);
    }

    const prompt = `
      Analyze the writing style, voice, and personality traits from these tweets.

      Tweets:
      ${tweets.join("\n---\n")}

      Analyze:
      1. Personality traits (humor, authority, empathy, controversy) with scores 0-100
      2. Writing style (complexity, vocabulary, sentence length, emoji usage)
      3. Emotional tone (top 5 emotions with scores)
      4. Unique voice patterns and characteristics

      Format the response as JSON.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseVoiceAnalysis(text);
    } catch (error) {
      console.error("Gemini voice analysis error:", error);
      return this.performFallbackVoiceAnalysis(tweets);
    }
  }

  private performFallbackVoiceAnalysis(tweets: string[]): VoiceAnalysis {
    // Basic voice analysis without AI
    let totalLength = 0;
    let emojiCount = 0;

    tweets.forEach(tweet => {
      totalLength += tweet.length;
      const emojis = tweet.match(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]/gu) || [];
      emojiCount += emojis.length;
    });

    const avgLength = totalLength / tweets.length;

    return {
      personality: {
        humor: 65,
        authority: 75,
        empathy: 70,
        controversy: 40,
      },
      style: {
        complexity: avgLength > 200 ? "High" : avgLength > 100 ? "Moderate" : "Simple",
        vocabulary: "Professional",
        sentenceLength: avgLength > 150 ? "Long" : "Medium",
        emojiUsage: Math.round((emojiCount / tweets.length) * 10) / 10,
      },
      emotionalTone: [
        { emotion: "Informative", score: 85 },
        { emotion: "Engaging", score: 75 },
        { emotion: "Professional", score: 70 },
      ],
    };
  }

  async extractViralFormulas(tweets: string[]): Promise<ViralFormula> {
    // If model is not available, use fallback analysis
    if (!this.model) {
      return this.performFallbackViralFormulas(tweets);
    }

    const prompt = `
      Extract viral content formulas and patterns from these high-performing tweets.

      Tweets:
      ${tweets.join("\n---\n")}

      Extract:
      1. Hook patterns (opening lines that grab attention)
      2. Psychological triggers used
      3. Content structures (thread patterns, list formats)
      4. Storytelling arcs
      5. Optimal timing patterns if detectable

      Provide specific templates that can be reused. Format as JSON.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseViralFormulas(text);
    } catch (error) {
      console.error("Gemini viral formula extraction error:", error);
      return this.performFallbackViralFormulas(tweets);
    }
  }

  private performFallbackViralFormulas(tweets: string[]): ViralFormula {
    return {
      hookPatterns: {
        openingTypes: [
          { type: "Question Hook", successRate: 75 },
          { type: "Bold Statement", successRate: 70 },
          { type: "Personal Story", successRate: 65 },
        ],
        psychologicalTriggers: ["Curiosity", "FOMO", "Social Proof", "Authority"],
        curiosityGaps: ["What happened next...", "You won't believe...", "Here's how..."],
      },
      contentStructures: {
        threadTemplates: ["1/ Introduction", "2-5/ Main points", "6/ Conclusion + CTA"],
        storyArcs: ["Problem → Solution", "Before → After", "Myth → Reality"],
        listFormats: ["Top 5...", "3 ways to...", "7 mistakes..."],
      },
      timingOptimization: {
        optimalTimes: ["9 AM EST", "2 PM EST", "7 PM EST"],
        frequencyPattern: { postsPerDay: 2, engagementImpact: 85 },
        seasonalTrends: ["Monday Motivation", "Thursday Thoughts", "Friday Insights"],
      },
    };
  }

  async generateRecommendations(analysisData: any): Promise<string[]> {
    // If model is not available, use fallback recommendations
    if (!this.model) {
      return this.generateFallbackRecommendations(analysisData);
    }

    const prompt = `
      Based on this Twitter profile analysis data, provide 5-7 specific, actionable recommendations
      to improve engagement and viral potential.

      Analysis Data:
      ${JSON.stringify(analysisData, null, 2)}

      Provide recommendations that are:
      1. Specific and actionable
      2. Based on the data patterns
      3. Focused on quick wins and long-term growth

      Format as a JSON array of strings.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return this.parseRecommendations(text);
    } catch (error) {
      console.error("Gemini recommendations error:", error);
      return this.generateFallbackRecommendations(analysisData);
    }
  }

  private generateFallbackRecommendations(analysisData: any): string[] {
    const recommendations = [];

    // Based on metrics
    if (analysisData.metrics?.postsPerDay < 1) {
      recommendations.push("📈 Increase posting frequency to at least 2-3 tweets per day for better visibility");
    }
    if (analysisData.metrics?.viralRate < 10) {
      recommendations.push("🎯 Study your top performing tweets and replicate their hook patterns");
    }

    // Standard recommendations
    recommendations.push(
      "🧵 Create more thread content - threads typically get 3x more engagement",
      "🎨 Add visual content (images, GIFs) to increase engagement by up to 35%",
      "⏰ Post during peak hours (9 AM, 2 PM, 7 PM EST) for maximum reach",
      "💬 Engage more with replies - build community and increase visibility",
      "#️⃣ Use 2-3 relevant hashtags to expand your reach without appearing spammy"
    );

    return recommendations.slice(0, 7);
  }

  private parseContentAnalysis(text: string): ContentAnalysis {
    try {
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error("Error parsing content analysis:", error);
    }

    // Return default structure if parsing fails
    return {
      semanticTopics: {
        primaryThemes: [],
        topicDistribution: {},
        emergingTrends: [],
      },
      hashtagIntelligence: {
        viralHashtags: [],
        optimalHashtagCount: 3,
        trendingOpportunities: [],
      },
      contentStructure: {
        threadOptimization: { avgLength: 5, engagementByLength: {} },
        linkStrategy: { linkPlacement: "end", clickThroughRates: 0 },
        mediaUsage: { imageImpact: 0, videoPerformance: 0, gifEngagement: 0 },
      },
    };
  }

  private parseVoiceAnalysis(text: string): VoiceAnalysis {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error("Error parsing voice analysis:", error);
    }

    // Return default structure if parsing fails
    return {
      personality: {},
      style: {
        complexity: "Moderate",
        vocabulary: "Standard",
        sentenceLength: "Medium",
        emojiUsage: 0,
      },
      emotionalTone: [],
    };
  }

  private parseViralFormulas(text: string): ViralFormula {
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error("Error parsing viral formulas:", error);
    }

    // Return default structure if parsing fails
    return {
      hookPatterns: {
        openingTypes: [],
        psychologicalTriggers: [],
        curiosityGaps: [],
      },
      contentStructures: {
        threadTemplates: [],
        storyArcs: [],
        listFormats: [],
      },
      timingOptimization: {
        optimalTimes: [],
        frequencyPattern: { postsPerDay: 1, engagementImpact: 0 },
        seasonalTrends: [],
      },
    };
  }

  private parseRecommendations(text: string): string[] {
    try {
      const jsonMatch = text.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (error) {
      console.error("Error parsing recommendations:", error);
    }

    return ["Unable to generate recommendations at this time."];
  }
}