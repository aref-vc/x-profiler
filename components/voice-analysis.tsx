"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Smile,
  Brain,
  Heart,
  Zap,
  MessageCircle,
  Sparkles,
  Target,
  Users
} from "lucide-react";

interface VoiceAnalysisProps {
  data?: any;
}

export function VoiceAnalysis({ data }: VoiceAnalysisProps) {
  // Mock voice analysis data
  const voiceTraits = {
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
      emojiUsage: 65,
      punctuation: {
        exclamation: 23,
        questions: 31,
        ellipsis: 12
      }
    },
    emotionalTone: [
      { emotion: "Optimistic", score: 82 },
      { emotion: "Professional", score: 79 },
      { emotion: "Inspirational", score: 71 },
      { emotion: "Casual", score: 58 }
    ],
    writingPatterns: [
      "Uses storytelling to make points",
      "Starts with hooks or questions",
      "Includes data and statistics",
      "Personal anecdotes for relatability",
      "Call-to-action endings"
    ]
  };

  const getPersonalityIcon = (trait: string) => {
    switch (trait.toLowerCase()) {
      case "humor":
        return Smile;
      case "authority":
        return Brain;
      case "empathy":
        return Heart;
      case "controversy":
        return Zap;
      default:
        return MessageCircle;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-blue-500";
    if (score >= 40) return "text-yellow-500";
    return "text-gray-500";
  };

  return (
    <div className="space-y-6">
      {/* Personality Traits */}
      <Card>
        <CardHeader>
          <CardTitle>Personality Traits</CardTitle>
          <CardDescription>
            Key personality characteristics detected in content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(voiceTraits.personality).map(([trait, data]) => {
              const Icon = getPersonalityIcon(trait);
              return (
                <div key={trait} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${getScoreColor(data.score)}`} />
                      <span className="font-medium capitalize">{trait}</span>
                    </div>
                    <span className={`font-bold ${getScoreColor(data.score)}`}>
                      {data.score}%
                    </span>
                  </div>
                  <Progress value={data.score} className="h-2" />
                  <p className="text-xs text-muted-foreground">{data.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Writing Style */}
      <Card>
        <CardHeader>
          <CardTitle>Writing Style Analysis</CardTitle>
          <CardDescription>
            Linguistic patterns and stylistic choices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Complexity</p>
              <Badge variant="outline">{voiceTraits.style.complexity}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Emoji Usage</p>
              <div className="flex items-center gap-2">
                <Progress value={voiceTraits.style.emojiUsage} className="w-20 h-2" />
                <span className="text-sm font-medium">{voiceTraits.style.emojiUsage}%</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Vocabulary Style</p>
            <p className="text-sm font-medium">{voiceTraits.style.vocabulary}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Punctuation Patterns</p>
            <div className="flex gap-3">
              <Badge variant="secondary">
                ! {voiceTraits.style.punctuation.exclamation}%
              </Badge>
              <Badge variant="secondary">
                ? {voiceTraits.style.punctuation.questions}%
              </Badge>
              <Badge variant="secondary">
                ... {voiceTraits.style.punctuation.ellipsis}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emotional Tone */}
      <Card>
        <CardHeader>
          <CardTitle>Emotional Tone Profile</CardTitle>
          <CardDescription>
            Dominant emotional tones in content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {voiceTraits.emotionalTone.map((tone, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className={`w-4 h-4 ${getScoreColor(tone.score)}`} />
                  <span className="font-medium">{tone.emotion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={tone.score} className="w-24 h-2" />
                  <span className="text-sm text-muted-foreground">
                    {tone.score}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Writing Patterns */}
      <Card>
        <CardHeader>
          <CardTitle>Signature Writing Patterns</CardTitle>
          <CardDescription>
            Recurring patterns that define the unique voice
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {voiceTraits.writingPatterns.map((pattern, index) => (
              <div key={index} className="flex items-start gap-2">
                <Target className="w-4 h-4 text-primary mt-0.5" />
                <p className="text-sm">{pattern}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}