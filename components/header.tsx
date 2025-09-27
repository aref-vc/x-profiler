"use client";

import { useState } from "react";
import { SettingsDialog } from "@/components/settings-dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function Header() {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 z-50 p-4 flex items-center gap-2">
      <Popover open={helpOpen} onOpenChange={setHelpOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <HelpCircle className="w-4 h-4" />
            How to Use
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-4" align="end">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Quick Start Guide</h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setHelpOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Click Settings to add your API keys</li>
              <li>Enter any X username (without @)</li>
              <li>Click Analyze to start</li>
              <li>Explore the insights across different tabs</li>
            </ol>
            <div className="pt-2 border-t">
              <div className="text-xs text-muted-foreground">
                <div className="font-semibold mb-1">Required APIs:</div>
                <ul className="list-disc list-inside space-y-1">
                  <li>X API Bearer Token (Twitter Developer)</li>
                  <li>Google Gemini API Key (AI Studio)</li>
                </ul>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="text-xs">
                <div className="font-semibold mb-1 text-yellow-600 dark:text-yellow-500">⚠️ X API Free Tier Limits:</div>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>500 requests per 15-minute window</li>
                  <li>Rate limits reset every 15 minutes</li>
                  <li>If you see "429 Too Many Requests", wait 15 minutes</li>
                  <li>Analyze 1-2 profiles per session to avoid limits</li>
                </ul>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <SettingsDialog />
    </header>
  );
}