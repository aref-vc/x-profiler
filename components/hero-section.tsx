"use client";

import { Badge } from "@/components/ui/badge";
import { Twitter, Zap, TrendingUp, Brain } from "lucide-react";

export function HeroSection() {
  return (
    <div className="text-center py-12 space-y-6">
      <div className="flex justify-center mb-4">
        <div className="relative">
          <Twitter className="w-16 h-16 text-primary animate-pulse" />
          <Zap className="w-8 h-8 text-yellow-500 absolute -top-2 -right-2 animate-bounce" />
        </div>
      </div>

      <h1 className="text-5xl font-bold bg-gradient-to-r from-secondary via-accent to-primary bg-clip-text text-transparent">
        X Profiler
      </h1>

      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Analyze X profiles with AI-powered insights
      </p>

      <div className="flex gap-3 justify-center flex-wrap">
        <Badge variant="secondary" className="px-3 py-1">
          <Brain className="w-3 h-3 mr-1" />
          AI-Powered Analysis
        </Badge>
        <Badge variant="secondary" className="px-3 py-1">
          <TrendingUp className="w-3 h-3 mr-1" />
          Viral Formulas
        </Badge>
        <Badge variant="secondary" className="px-3 py-1">
          <Twitter className="w-3 h-3 mr-1" />
          X API v2
        </Badge>
      </div>
    </div>
  );
}