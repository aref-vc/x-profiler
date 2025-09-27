import { Tweet, User } from "@/lib/types";

export class XApiService {
  private bearerToken: string;
  private baseUrl = "https://api.twitter.com/2";

  constructor() {
    this.bearerToken = process.env.X_BEARER_TOKEN || "";
    if (!this.bearerToken) {
      console.warn("X_BEARER_TOKEN not configured");
    }
  }

  private async makeRequest(endpoint: string, params?: URLSearchParams) {
    const url = `${this.baseUrl}${endpoint}${params ? `?${params}` : ""}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.bearerToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`X API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async getUserByUsername(username: string): Promise<User> {
    try {
      const params = new URLSearchParams({
        "user.fields": "id,name,username,verified,description,created_at,public_metrics,profile_image_url",
      });

      const data = await this.makeRequest(`/users/by/username/${username}`, params);
      return data.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }

  async getUserTweets(userId: string, maxResults = 100): Promise<Tweet[]> {
    try {
      const params = new URLSearchParams({
        max_results: maxResults.toString(),
        "tweet.fields": "id,text,created_at,public_metrics,context_annotations,entities,referenced_tweets",
        exclude: "retweets,replies",
      });

      const data = await this.makeRequest(`/users/${userId}/tweets`, params);
      return data.data || [];
    } catch (error) {
      console.error("Error fetching tweets:", error);
      throw error;
    }
  }

  async getTweetMetrics(tweetIds: string[]) {
    try {
      const params = new URLSearchParams({
        ids: tweetIds.join(","),
        "tweet.fields": "public_metrics",
      });

      const data = await this.makeRequest(`/tweets`, params);
      return data.data || [];
    } catch (error) {
      console.error("Error fetching tweet metrics:", error);
      throw error;
    }
  }

  async searchRecentTweets(query: string, maxResults = 100) {
    try {
      const params = new URLSearchParams({
        query,
        max_results: maxResults.toString(),
        "tweet.fields": "id,text,created_at,public_metrics,author_id",
      });

      const data = await this.makeRequest(`/tweets/search/recent`, params);
      return data.data || [];
    } catch (error) {
      console.error("Error searching tweets:", error);
      throw error;
    }
  }
}