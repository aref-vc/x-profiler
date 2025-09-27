// Secure API configuration management
// This file centralizes API key management and validation

interface ApiConfig {
  xBearerToken: string | undefined;
  geminiApiKey: string | undefined;
  isConfigured: boolean;
}

export function getApiConfig(): ApiConfig {
  const config = {
    xBearerToken: process.env.X_BEARER_TOKEN,
    geminiApiKey: process.env.GEMINI_API_KEY,
    isConfigured: false
  };

  // Check if both keys are configured
  config.isConfigured = !!(config.xBearerToken && config.geminiApiKey);

  return config;
}

export function validateApiKeys(xBearerToken?: string, geminiApiKey?: string): {
  valid: boolean;
  error?: string;
  xApiKey?: string;
  geminiKey?: string;
} {
  // Get server-side configuration
  const serverConfig = getApiConfig();

  // Prefer server-side keys for security
  const xApiKey = serverConfig.xBearerToken || xBearerToken;
  const geminiKey = serverConfig.geminiApiKey || geminiApiKey;

  if (!xApiKey || !geminiKey) {
    return {
      valid: false,
      error: "API keys are not configured. Please set up environment variables or configure in settings."
    };
  }

  // Basic validation - ensure keys are strings and have reasonable length
  if (typeof xApiKey !== 'string' || xApiKey.length < 10) {
    return {
      valid: false,
      error: "Invalid X API Bearer Token format"
    };
  }

  if (typeof geminiKey !== 'string' || geminiKey.length < 10) {
    return {
      valid: false,
      error: "Invalid Gemini API Key format"
    };
  }

  return {
    valid: true,
    xApiKey,
    geminiKey
  };
}