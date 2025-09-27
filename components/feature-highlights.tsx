"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  TrendingUp,
  MessageSquare,
  Palette,
  Clock,
  Users,
  Sparkles,
  BarChart3,
  Zap,
  Target
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Gemini Pro API for deep semantic understanding",
    color: "text-primary"
  },
  {
    icon: TrendingUp,
    title: "Viral Formulas",
    description: "Extract proven patterns that drive engagement",
    color: "text-secondary"
  },
  {
    icon: MessageSquare,
    title: "Content Templates",
    description: "Ready-to-use templates from successful posts",
    color: "text-accent"
  },
  {
    icon: Palette,
    title: "Voice & Style",
    description: "Decode personality traits and writing patterns",
    color: "text-secondary"
  },
  {
    icon: Clock,
    title: "Optimal Timing",
    description: "Discover best posting times for maximum reach",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Audience Insights",
    description: "Understand follower demographics and behavior",
    color: "text-accent"
  },
  {
    icon: Sparkles,
    title: "Hook Patterns",
    description: "Psychological triggers that capture attention",
    color: "text-accent"
  },
  {
    icon: BarChart3,
    title: "Performance Metrics",
    description: "Track engagement rates and growth patterns",
    color: "text-primary"
  },
  {
    icon: Zap,
    title: "Real-time Analysis",
    description: "Fast processing with live progress updates",
    color: "text-secondary"
  },
  {
    icon: Target,
    title: "Success Prediction",
    description: "Estimate viral probability for content types",
    color: "text-destructive"
  }
];

export function FeatureHighlights() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Powerful Analytics Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <CardContent className="p-6 space-y-3">
              <feature.icon
                className={`w-8 h-8 ${feature.color} group-hover:scale-110 transition-transform`}
              />
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}