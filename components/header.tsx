"use client";

import { SettingsDialog } from "@/components/settings-dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  return (
    <header className="fixed top-0 right-0 z-50 p-4 flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <HelpCircle className="w-4 h-4" />
              How to Use
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-sm p-4">
            <div className="space-y-3">
              <div className="font-semibold">Quick Start Guide:</div>
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
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <SettingsDialog />
    </header>
  );
}