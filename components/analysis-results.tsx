"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  Users,
  MessageSquare,
  Eye,
  Hash,
  BarChart3,
  Clock,
  Zap
} from "lucide-react";

interface AnalysisResultsProps {
  data: any;
}

export function AnalysisResults({ data }: AnalysisResultsProps) {
  // Mock data for demonstration
  const mockMetrics = {
    followers: 125000,
    avgEngagement: 3.2,
    viralRate: 12,
    postsPerDay: 4.5,
    replyRate: 78,
    retweetRate: 234,
    topHashtags: ["#AI", "#Tech", "#Innovation", "#Future"],
    bestTime: "2:00 PM EST",
    contentMix: {
      original: 60,
      replies: 25,
      retweets: 15
    },
    topTopics: [
      { topic: "Artificial Intelligence", score: 85 },
      { topic: "Technology Trends", score: 72 },
      { topic: "Business Strategy", score: 68 },
      { topic: "Innovation", score: 61 }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Followers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockMetrics.followers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Active audience</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Engagement Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.avgEngagement}%</div>
            <p className="text-xs text-muted-foreground">Above average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Viral Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.viralRate}%</div>
            <p className="text-xs text-muted-foreground">Of posts go viral</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Best Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMetrics.bestTime}</div>
            <p className="text-xs text-muted-foreground">Optimal posting</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Content Mix Analysis</CardTitle>
          <CardDescription>
            Breakdown of content types and their performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Original Content</span>
                <span className="text-sm text-muted-foreground">
                  {mockMetrics.contentMix.original}%
                </span>
              </div>
              <Progress value={mockMetrics.contentMix.original} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Replies</span>
                <span className="text-sm text-muted-foreground">
                  {mockMetrics.contentMix.replies}%
                </span>
              </div>
              <Progress value={mockMetrics.contentMix.replies} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Retweets</span>
                <span className="text-sm text-muted-foreground">
                  {mockMetrics.contentMix.retweets}%
                </span>
              </div>
              <Progress value={mockMetrics.contentMix.retweets} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Topic Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Top Topics & Themes</CardTitle>
          <CardDescription>
            Primary content themes that resonate with the audience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockMetrics.topTopics.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{index + 1}</Badge>
                  <span className="font-medium">{item.topic}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={item.score} className="w-24 h-2" />
                  <span className="text-sm text-muted-foreground">
                    {item.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Hashtag Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Hashtags</CardTitle>
          <CardDescription>
            Hashtags that drive the most engagement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {mockMetrics.topHashtags.map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                <Hash className="w-3 h-3 mr-1" />
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}