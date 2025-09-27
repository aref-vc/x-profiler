export interface User {
  id: string;
  name: string;
  username: string;
  verified?: boolean;
  description?: string;
  created_at: string;
  profile_image_url?: string;
  public_metrics: {
    followers_count: number;
    following_count: number;
    tweet_count: number;
    listed_count: number;
    like_count?: number;
  };
}

export interface Tweet {
  id: string;
  text: string;
  created_at: string;
  author_id?: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
    bookmark_count?: number;
    impression_count?: number;
  };
  entities?: {
    hashtags?: Array<{ start: number; end: number; tag: string }>;
    mentions?: Array<{ start: number; end: number; username: string }>;
    urls?: Array<{ start: number; end: number; url: string }>;
  };
  context_annotations?: Array<{
    domain: { id: string; name: string; description?: string };
    entity: { id: string; name: string; description?: string };
  }>;
  referenced_tweets?: Array<{
    type: "retweeted" | "quoted" | "replied_to";
    id: string;
  }>;
}

export interface AnalysisResult {
  profile: {
    username: string;
    displayName: string;
    verified: boolean;
    followers: number;
    following: number;
    tweets: number;
    joinDate: string;
    bio: string;
  };
  metrics: {
    avgEngagement: number;
    viralRate: number;
    postsPerDay: number;
    replyRate: number;
    retweetRate: number;
    growthRate: number;
  };
  content: {
    topTopics: Array<{ topic: string; score: number }>;
    topHashtags: string[];
    contentMix: {
      original: number;
      replies: number;
      retweets: number;
    };
    bestTime: string;
    peakDays: string[];
  };
  voice: VoiceAnalysis;
  templates: ContentTemplates;
  recommendations: string[];
}

export interface VoiceAnalysis {
  personality: {
    [trait: string]: {
      score: number;
      description: string;
    };
  };
  style: {
    complexity: string;
    vocabulary: string;
    sentenceLength: string;
    emojiUsage: number;
  };
  emotionalTone: Array<{
    emotion: string;
    score: number;
  }>;
}

export interface ContentTemplates {
  hooks: Array<{
    pattern: string;
    successRate: number;
    engagementBoost: string;
  }>;
  topPerformers: Array<{
    text: string;
    engagement: number;
    type: string;
  }>;
}

export interface ContentAnalysis {
  semanticTopics: {
    primaryThemes: string[];
    topicDistribution: { [topic: string]: number };
    emergingTrends: string[];
  };
  hashtagIntelligence: {
    viralHashtags: Array<{ tag: string; viralityScore: number; avgEngagement: number }>;
    optimalHashtagCount: number;
    trendingOpportunities: string[];
  };
  contentStructure: {
    threadOptimization: { avgLength: number; engagementByLength: Record<number, number> };
    linkStrategy: { linkPlacement: string; clickThroughRates: number };
    mediaUsage: { imageImpact: number; videoPerformance: number; gifEngagement: number };
  };
}

export interface ViralFormula {
  hookPatterns: {
    openingTypes: Array<{ type: string; successRate: number; examples: string[] }>;
    psychologicalTriggers: Array<{ trigger: string; effectiveness: number; usage: string[] }>;
    curiosityGaps: Array<{ pattern: string; completionRate: number; engagement: number }>;
  };
  contentStructures: {
    threadTemplates: Array<{ structure: string; avgEngagement: number; viralProbability: number }>;
    storyArcs: Array<{ beginning: string; middle: string; end: string; success: number }>;
    listFormats: Array<{ type: string; optimalLength: number; engagement: number }>;
  };
  timingOptimization: {
    optimalTimes: Array<{ hour: number; dayOfWeek: string; engagement: number }>;
    frequencyPattern: { postsPerDay: number; engagementImpact: number };
    seasonalTrends: Array<{ period: string; topics: string[]; effectiveness: number }>;
  };
}