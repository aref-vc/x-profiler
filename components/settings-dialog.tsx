"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Save, Eye, EyeOff, Info, HelpCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ApiSettings {
  xBearerToken: string;
  geminiApiKey: string;
}

export function SettingsDialog() {
  const [open, setOpen] = useState(false);
  const [showTokens, setShowTokens] = useState(false);
  const [settings, setSettings] = useState<ApiSettings>({
    xBearerToken: "",
    geminiApiKey: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem("xProfilerSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem("xProfilerSettings", JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setOpen(false);
    }, 2000);
  };

  const hasApiKeys = settings.xBearerToken && settings.geminiApiKey;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="w-4 h-4" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>API Configuration</DialogTitle>
          <DialogDescription>
            Configure your API keys to use X Profiler. Your keys are stored locally in your browser.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* How to Use Section */}
          <Alert>
            <HelpCircle className="h-4 w-4" />
            <AlertDescription className="space-y-2">
              <div className="font-semibold">How to use X Profiler:</div>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Add your X (Twitter) API Bearer Token below</li>
                <li>Add your Google Gemini API key</li>
                <li>Enter any X username to analyze</li>
                <li>View AI-powered insights on their profile</li>
              </ol>
            </AlertDescription>
          </Alert>

          {/* X API Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="xBearer">X API Bearer Token</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3 h-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Get your Bearer Token from the X Developer Portal at developer.twitter.com</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex gap-2">
              <Input
                id="xBearer"
                type={showTokens ? "text" : "password"}
                placeholder="Enter your X API Bearer Token"
                value={settings.xBearerToken}
                onChange={(e) => setSettings({ ...settings, xBearerToken: e.target.value })}
                className="font-mono text-sm"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowTokens(!showTokens)}
              >
                {showTokens ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Required for fetching X profile data and tweets
            </p>
          </div>

          {/* Gemini API Section */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="gemini">Google Gemini API Key</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3 h-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>Get your API key from Google AI Studio at makersuite.google.com/app/apikey</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex gap-2">
              <Input
                id="gemini"
                type={showTokens ? "text" : "password"}
                placeholder="Enter your Gemini API Key"
                value={settings.geminiApiKey}
                onChange={(e) => setSettings({ ...settings, geminiApiKey: e.target.value })}
                className="font-mono text-sm"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Required for AI-powered content analysis
            </p>
          </div>

          {/* Status Alert */}
          {saved && (
            <Alert className="bg-green-500/10 border-green-500/50">
              <Save className="h-4 w-4 text-green-500" />
              <AlertDescription className="text-green-500">
                Settings saved successfully!
              </AlertDescription>
            </Alert>
          )}

          {!hasApiKeys && (
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Both API keys are required for full functionality. The app will use limited features without them.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!settings.xBearerToken || !settings.geminiApiKey}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}