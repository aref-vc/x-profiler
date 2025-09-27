"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Zap,
  Users,
  Hash,
  Sparkles,
  Target,
  FileText
} from "lucide-react";

interface TemplateLibraryProps {
  templates?: any;
}

export function TemplateLibrary({ templates }: TemplateLibraryProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Mock template data
  const mockTemplates = {
    hooks: [
      {
        pattern: "Controversial opinion: [STATEMENT]\\n\\nHere's why I'm right: [REASONING]",
        example: "Controversial opinion: Remote work is killing innovation\\n\\nHere's why I'm right: ...",
        successRate: 89,
        engagementBoost: "+234%",
        bestFor: "Tech discourse"
      },
      {
        pattern: "Everyone's talking about [TOPIC], but nobody mentions [OVERLOOKED_ASPECT]\\n\\n[INSIGHT]",
        example: "Everyone's talking about AI, but nobody mentions the energy crisis it's creating\\n\\n...",
        successRate: 85,
        engagementBoost: "+187%",
        bestFor: "Thought leadership"
      },
      {
        pattern: "[NUMBER] [ITEMS] that [BENEFIT]:\\n\\n[LIST]",
        example: "5 mental models that transformed my thinking:\\n\\n1. Inversion\\n2. ...",
        successRate: 92,
        engagementBoost: "+312%",
        bestFor: "Educational content"
      }
    ],
    threads: [
      {
        name: "Story Arc Thread",
        structure: [
          "1/ Hook with personal story or observation",
          "2-3/ Build tension or problem",
          "4-5/ Introduce solution or insight",
          "6-7/ Provide examples or evidence",
          "8/ Conclude with call to action"
        ],
        avgEngagement: 3420,
        viralProbability: 78
      },
      {
        name: "Educational Thread",
        structure: [
          "1/ State the main concept clearly",
          "2/ Why this matters now",
          "3-5/ Break down into components",
          "6-7/ Real-world applications",
          "8/ Resources for learning more"
        ],
        avgEngagement: 2890,
        viralProbability: 71
      }
    ],
    replies: [
      {
        pattern: "This is [ADJECTIVE], but have you considered [ALTERNATIVE_PERSPECTIVE]?",
        purpose: "Constructive disagreement",
        engagementRate: 4.2
      },
      {
        pattern: "Adding to this: [ADDITIONAL_INSIGHT]\\n\\n[SUPPORTING_EVIDENCE]",
        purpose: "Value-add reply",
        engagementRate: 3.8
      }
    ]
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Viral Content Templates</CardTitle>
          <CardDescription>
            Proven formulas extracted from high-performing posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="hooks" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hooks">Hook Patterns</TabsTrigger>
              <TabsTrigger value="threads">Thread Templates</TabsTrigger>
              <TabsTrigger value="replies">Reply Strategies</TabsTrigger>
            </TabsList>

            <TabsContent value="hooks" className="space-y-4">
              {mockTemplates.hooks.map((hook, index) => (
                <Card key={index} className="relative">
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-green-600">
                              {hook.successRate}% Success
                            </Badge>
                            <Badge variant="outline" className="text-blue-600">
                              {hook.engagementBoost}
                            </Badge>
                            <Badge variant="secondary">{hook.bestFor}</Badge>
                          </div>
                          <code className="block bg-muted p-3 rounded text-sm mt-3 whitespace-pre-wrap">
                            {hook.pattern}
                          </code>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopy(hook.pattern, index)}
                        >
                          {copiedIndex === index ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>

                      <div className="border-t pt-3">
                        <p className="text-sm text-muted-foreground mb-2">Example:</p>
                        <p className="text-sm italic">{hook.example}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="threads" className="space-y-4">
              {mockTemplates.threads.map((thread, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{thread.name}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">
                            <Users className="w-3 h-3 mr-1" />
                            {thread.avgEngagement.toLocaleString()} avg
                          </Badge>
                          <Badge variant="outline">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {thread.viralProbability}% viral
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(thread.structure.join("\\n"), index + 100)}
                      >
                        {copiedIndex === index + 100 ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {thread.structure.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-2">
                          <MessageSquare className="w-4 h-4 text-primary mt-0.5" />
                          <p className="text-sm">{step}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="replies" className="space-y-4">
              {mockTemplates.replies.map((reply, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{reply.purpose}</Badge>
                        <Badge variant="outline">
                          <Zap className="w-3 h-3 mr-1" />
                          {reply.engagementRate}% rate
                        </Badge>
                      </div>
                      <code className="block bg-muted p-3 rounded text-sm whitespace-pre-wrap">
                        {reply.pattern}
                      </code>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full"
                        onClick={() => handleCopy(reply.pattern, index + 200)}
                      >
                        {copiedIndex === index + 200 ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy Template
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Template Usage Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 text-primary mt-0.5" />
              <p className="text-sm">Customize templates to match your authentic voice</p>
            </div>
            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 text-primary mt-0.5" />
              <p className="text-sm">Test different patterns to find what resonates with your audience</p>
            </div>
            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 text-primary mt-0.5" />
              <p className="text-sm">Combine hooks with thread structures for maximum impact</p>
            </div>
            <div className="flex items-start gap-2">
              <Target className="w-4 h-4 text-primary mt-0.5" />
              <p className="text-sm">Track performance to refine your approach over time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}