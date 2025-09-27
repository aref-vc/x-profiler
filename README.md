# X Profile Viral Intelligence 🚀

An AI-powered analytics platform that decodes what makes X (Twitter) profiles and their content go viral. Built with Next.js, Shadcn/ui, X API v2, and Gemini AI.

## Features

### 🎯 Core Analytics
- **Content & Semantic Analysis** - Deep NLP analysis of tweet content
- **Voice & Style Detection** - Personality traits and writing patterns
- **Viral Formula Extraction** - Hook patterns and engagement triggers
- **Template Generation** - Ready-to-use content templates
- **Engagement Intelligence** - Metrics, trends, and growth patterns

### 📊 Key Capabilities
- Real-time profile analysis with progress tracking
- Viral content pattern recognition
- Psychological trigger identification
- Optimal posting time detection
- Audience demographic insights
- Content mix optimization recommendations

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui with Radix UI
- **APIs**: X API v2, Google Gemini Pro
- **Styling**: Tailwind CSS with custom theme
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- X Developer Account with API credentials
- Google Cloud account with Gemini API access

### Installation

1. Clone the repository
```bash
cd "/Users/aref/Documents/Claude Code/X Profiler"
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API credentials:
```env
X_BEARER_TOKEN=your_bearer_token
GEMINI_API_KEY=your_gemini_api_key
```

4. Start the development server
```bash
./start.sh
# or
npm run dev
```

The app will be available at `http://localhost:3032`

## Usage

1. **Enter Username**: Input any X/Twitter username (with or without @)
2. **Analyze**: Click analyze to start the AI-powered analysis
3. **View Results**: Explore comprehensive insights across multiple tabs:
   - Overview: Key metrics and engagement data
   - Voice & Style: Personality and writing analysis
   - Templates: Extracted viral formulas
   - Insights: AI-generated recommendations

## API Configuration

### X API v2 Setup
1. Go to [Twitter Developer Portal](https://developer.twitter.com)
2. Create a new app or use existing one
3. Generate Bearer Token
4. Add to `.env.local`

### Gemini API Setup
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Generate API key
3. Add to `.env.local`

## Project Structure

```
X Profiler/
├── app/
│   ├── api/
│   │   └── analyze/         # Analysis API endpoint
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/
│   ├── ui/                  # Shadcn UI components
│   ├── profile-analyzer.tsx # Main analyzer component
│   ├── analysis-results.tsx # Results display
│   ├── voice-analysis.tsx   # Voice & style analysis
│   └── template-library.tsx # Template generator
├── lib/
│   ├── services/
│   │   ├── x-api.ts        # X API integration
│   │   └── gemini-api.ts   # Gemini AI integration
│   ├── types.ts            # TypeScript types
│   └── utils.ts            # Utility functions
└── public/                  # Static assets
```

## Available Scripts

```bash
npm run dev      # Start development server (port 3032)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Port Configuration

This application runs on **port 3032** as configured in the Claude Code port allocation system.

## Features Roadmap

- [ ] Historical analysis tracking
- [ ] Competitor comparison
- [ ] Export reports (PDF/CSV)
- [ ] Scheduled monitoring
- [ ] Team collaboration features
- [ ] API access for developers

## License

Private project - All rights reserved

## Support

For issues or questions, please create an issue in the project repository.