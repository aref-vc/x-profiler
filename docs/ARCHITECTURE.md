# X Profiler - Architecture Overview

## 🏗️ System Architecture

X Profiler is built using a modern, scalable architecture leveraging Next.js 15's App Router, TypeScript, and AI services.

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│  ┌────────────────────────────────────────────────────┐    │
│  │                X Profiler Frontend                  │    │
│  │         (Next.js + TypeScript + Tailwind)          │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Next.js API Routes                       │
│                   (/api/analyze/route.ts)                   │
└─────────────────────────────────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌──────────────────────┐    ┌──────────────────────┐
│    X API Service     │    │  Gemini AI Service   │
│     (X API v2)       │    │  (Google Gemini AI)  │
└──────────────────────┘    └──────────────────────┘
                │                       │
                ▼                       ▼
        ┌─────────────┐         ┌─────────────┐
        │ X Platform  │         │ Google AI   │
        │   Servers   │         │   Servers   │
        └─────────────┘         └─────────────┘
```

## 🔧 Core Components

### Frontend Layer

#### 1. **Main Application (`app/`)**
- **page.tsx**: Entry point with ProfileAnalyzer component
- **layout.tsx**: Root layout with theme provider and fonts
- **globals.css**: Tailwind CSS configuration and custom styles

#### 2. **Component Architecture**
```
components/
├── ui/                     # Reusable UI components (shadcn/ui)
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── popover.tsx
│   └── ...
├── header.tsx             # App header with settings and help
├── hero-section.tsx       # Landing hero section
├── profile-analyzer.tsx   # Main analyzer component
├── analysis-results.tsx   # Results display component
├── voice-analysis.tsx     # Voice & style analysis
├── template-library.tsx   # Viral templates display
├── settings-dialog.tsx    # API configuration modal
└── feature-highlights.tsx # Feature showcase
```

#### 3. **State Management**
- **React State**: Local component state for UI interactions
- **LocalStorage**: Persistent storage for API keys
- **Props Drilling**: Data flow through component hierarchy

### Backend Layer

#### 1. **API Routes (`app/api/`)**
```typescript
// app/api/analyze/route.ts
export async function POST(request: NextRequest) {
  // 1. Extract username and API keys
  // 2. Initialize service instances
  // 3. Fetch user profile (X API)
  // 4. Fetch recent tweets (X API)
  // 5. Analyze content (Gemini AI)
  // 6. Extract viral formulas (Gemini AI)
  // 7. Generate recommendations (Gemini AI)
  // 8. Return structured analysis
}
```

#### 2. **Service Layer (`lib/services/`)**

**X API Service**
```typescript
class XApiService {
  - getUserByUsername(username: string): Promise<User>
  - getUserTweets(userId: string, maxResults: number): Promise<Tweet[]>
  - getTweetMetrics(tweetIds: string[]): Promise<Metrics[]>
  - searchRecentTweets(query: string): Promise<Tweet[]>
}
```

**Gemini AI Service**
```typescript
class GeminiApiService {
  - analyzeContent(tweets: string[]): Promise<ContentAnalysis>
  - analyzeVoice(tweets: string[]): Promise<VoiceAnalysis>
  - extractViralFormulas(tweets: string[]): Promise<ViralFormula>
  - generateRecommendations(data: any): Promise<string[]>
}
```

### Data Flow

1. **User Input** → Frontend form submission
2. **API Request** → POST to `/api/analyze` with username
3. **Service Calls** → Parallel API calls to X and Gemini
4. **Data Processing** → Transform and structure responses
5. **Response** → Return analysis to frontend
6. **Display** → Render results in tabs and components

## 🔐 Security Architecture

### API Key Management
- **Storage**: Browser localStorage (client-side only)
- **Transmission**: Sent with each analysis request
- **Server**: Keys used temporarily, never stored
- **Environment**: Fallback to env variables for development

### Data Protection
- **No User Data Storage**: All analysis is ephemeral
- **HTTPS Only**: Secure transmission of data
- **Input Validation**: Username sanitization
- **Rate Limiting**: Handled by external APIs

## 🎨 Design System

### Component Library
- **Base**: shadcn/ui components
- **Styling**: Tailwind CSS with custom theme
- **Icons**: Lucide React icons
- **Font**: JetBrains Mono

### Theme Configuration
```javascript
// Color Palette (HSL)
--primary: 203, 100%, 14%    // Deep blue
--secondary: 31, 100%, 48%   // Vibrant orange
--accent: 40, 97%, 64%       // Golden yellow
--background: 0, 0%, 4%      // Near black
--foreground: 0, 0%, 95%     // Off white
```

## 🚀 Performance Optimizations

### Frontend
- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Next.js font loading
- **CSS**: Tailwind CSS purging unused styles

### Backend
- **Parallel Processing**: Concurrent API calls
- **Fallback Handlers**: Graceful degradation on API failures
- **Error Boundaries**: Comprehensive error handling
- **Caching**: Browser caching for static assets

## 🔄 Error Handling Strategy

### Levels of Error Handling

1. **API Level**
   - Rate limit detection and user messaging
   - Network error recovery
   - Invalid response handling

2. **Service Level**
   - Fallback analysis when AI fails
   - Default values for missing data
   - Graceful degradation

3. **Component Level**
   - Loading states
   - Error states with clear messages
   - Retry mechanisms

## 📦 Build and Deployment

### Build Process
```bash
npm run build
# Outputs to .next/ directory
# Static assets in .next/static
# Server functions in .next/server
```

### Deployment Considerations
- **Platform**: Optimized for Vercel deployment
- **Environment**: Node.js 18+ required
- **API Keys**: Must be configured per environment
- **Scaling**: Stateless design allows horizontal scaling

## 🔮 Future Architecture Considerations

### Planned Enhancements
1. **Caching Layer**: Redis for API response caching
2. **Queue System**: Background job processing
3. **WebSocket**: Real-time analysis updates
4. **Database**: PostgreSQL for historical data
5. **Authentication**: User accounts and saved analyses
6. **Microservices**: Separate analysis workers

### Scalability Path
1. **Phase 1**: Current monolithic Next.js app
2. **Phase 2**: Add caching and background jobs
3. **Phase 3**: Extract services to separate APIs
4. **Phase 4**: Implement microservices architecture

## 📊 Monitoring and Observability

### Current Implementation
- Console logging for debugging
- Error tracking in browser console
- API response time logging

### Future Monitoring
- Application Performance Monitoring (APM)
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Custom metrics dashboard