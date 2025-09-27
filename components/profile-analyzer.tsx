"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Loader2,
  BarChart3,
  MessageSquare,
  Hash,
  Clock,
  TrendingUp,
  Sparkles,
  Users,
  Eye,
  Zap,
  AlertCircle
} from "lucide-react";
import { AnalysisResults } from "@/components/analysis-results";
import { TemplateLibrary } from "@/components/template-library";
import { VoiceAnalysis } from "@/components/voice-analysis";

export function ProfileAnalyzer() {
  const [username, setUsername] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState("");
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [error, setError] = useState("");
  const [analysisData, setAnalysisData] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!username.trim()) {
      setError("Please enter a valid X username");
      return;
    }

    setError("");
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setAnalysisProgress(0);
    setAnalysisStage("Validating profile...");

    // Simulate analysis stages
    const stages = [
      { stage: "Validating profile...", progress: 10 },
      { stage: "Fetching tweets...", progress: 25 },
      { stage: "Analyzing content patterns...", progress: 40 },
      { stage: "Extracting viral formulas...", progress: 55 },
      { stage: "Detecting voice & style...", progress: 70 },
      { stage: "Calculating engagement metrics...", progress: 85 },
      { stage: "Generating insights...", progress: 95 },
      { stage: "Analysis complete!", progress: 100 }
    ];

    try {
      // Simulate API call with progressive updates
      for (const { stage, progress } of stages) {
        setAnalysisStage(stage);
        setAnalysisProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Get API keys from localStorage
      const settings = localStorage.getItem("xProfilerSettings");
      if (!settings) {
        setError("Please configure your API keys in Settings first.");
        setIsAnalyzing(false);
        return;
      }

      const { xBearerToken, geminiApiKey } = JSON.parse(settings);
      if (!xBearerToken || !geminiApiKey) {
        setError("Both API keys are required. Please configure them in Settings.");
        setIsAnalyzing(false);
        return;
      }

      // Fetch analysis data with API keys
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.replace("@", ""),
          xBearerToken,
          geminiApiKey
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to analyze profile");
      }

      const data = await response.json();
      setAnalysisData(data);
      setAnalysisComplete(true);
    } catch (err) {
      setError("Failed to analyze profile. Please try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Profile Analysis
          </CardTitle>
          <CardDescription>
            Enter an X username to decode their viral content patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">X Username</Label>
            <div className="flex gap-2">
              <Input
                id="username"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                disabled={isAnalyzing}
                className="flex-1"
              />
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !username.trim()}
                className="min-w-[120px]"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing
                  </>
                ) : (
                  <>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analyze
                  </>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{analysisStage}</span>
                <span className="font-medium">{analysisProgress}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
          )}

          {!isAnalyzing && !analysisComplete && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MessageSquare className="w-4 h-4" />
                <span>Content Analysis</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Hash className="w-4 h-4" />
                <span>Topic Modeling</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <TrendingUp className="w-4 h-4" />
                <span>Viral Patterns</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4" />
                <span>Voice & Style</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {analysisComplete && analysisData && (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="voice">Voice & Style</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <AnalysisResults data={analysisData} />
          </TabsContent>

          <TabsContent value="voice" className="space-y-4">
            <VoiceAnalysis data={analysisData?.voice} />
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <TemplateLibrary templates={analysisData?.templates} />
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Viral Intelligence Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Deep insights and recommendations based on the analysis.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}