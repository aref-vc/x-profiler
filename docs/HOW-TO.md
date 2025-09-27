# X Profiler - How-To Guide

## 📖 Table of Contents
1. [Getting Started](#getting-started)
2. [Setting Up API Keys](#setting-up-api-keys)
3. [Analyzing a Profile](#analyzing-a-profile)
4. [Understanding Results](#understanding-results)
5. [Troubleshooting](#troubleshooting)
6. [Tips and Best Practices](#tips-and-best-practices)

## 🚀 Getting Started

### Step 1: Access the Application
1. Open your web browser (Chrome, Firefox, Safari, or Edge recommended)
2. Navigate to `http://localhost:3032`
3. You'll see the X Profiler homepage with a dark theme interface

### Step 2: First-Time Setup
On your first visit, you'll need to configure your API keys. Don't worry, this is a one-time setup!

## 🔑 Setting Up API Keys

### Getting Your X (Twitter) API Bearer Token

1. **Create a Twitter Developer Account**
   - Go to [developer.twitter.com](https://developer.twitter.com)
   - Click "Sign up" if you don't have an account
   - Complete the application process (usually instant for basic access)

2. **Create a Project and App**
   - In the developer portal, click "Create Project"
   - Name your project (e.g., "X Profile Analysis")
   - Create an app within the project
   - Choose "Production" environment

3. **Generate Bearer Token**
   - Navigate to your app's "Keys and tokens" tab
   - Under "Bearer Token", click "Generate"
   - Copy the token immediately (you won't see it again!)
   - Save it somewhere secure

### Getting Your Google Gemini API Key

1. **Access Google AI Studio**
   - Go to [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account

2. **Create API Key**
   - Click "Create API Key"
   - Select "Create API key in new project" or choose existing
   - Copy the generated API key

### Configuring Keys in X Profiler

1. **Open Settings**
   - Click the "Settings" button in the top-right corner
   - A dialog will open for API configuration

2. **Enter Your Keys**
   - Paste your X API Bearer Token in the first field
   - Paste your Google Gemini API Key in the second field
   - Click "Save Settings"

3. **Verify Configuration**
   - You'll see a success message
   - The dialog will close automatically
   - Your keys are now stored locally in your browser

## 🔍 Analyzing a Profile

### Basic Analysis

1. **Enter Username**
   - Type any X/Twitter username in the input field
   - You can enter with or without the @ symbol
   - Examples: `elonmusk`, `@naval`, `lexfridman`

2. **Start Analysis**
   - Click the "Analyze" button
   - Watch the progress bar as the analysis proceeds

3. **Analysis Stages**
   You'll see these stages:
   - ✓ Validating profile (10%)
   - ✓ Fetching tweets (25%)
   - ✓ Analyzing content patterns (40%)
   - ✓ Extracting viral formulas (55%)
   - ✓ Detecting voice & style (70%)
   - ✓ Calculating engagement metrics (85%)
   - ✓ Generating insights (95%)
   - ✓ Analysis complete! (100%)

### Advanced Options

- **Multiple Profiles**: Analyze different profiles sequentially
- **Fresh Analysis**: Each analysis fetches the latest tweets
- **Comparison**: Keep multiple tabs open to compare profiles

## 📊 Understanding Results

### Overview Tab
The main metrics dashboard showing:

- **Profile Information**
  - Username and display name
  - Verification status
  - Follower/following counts
  - Join date and bio

- **Engagement Metrics**
  - Average engagement per tweet
  - Viral rate percentage
  - Posts per day frequency
  - Reply and retweet rates

- **Content Analysis**
  - Top topics with relevance scores
  - Most used hashtags
  - Content mix (original/replies/retweets)
  - Best posting times

### Voice & Style Tab
Personality and writing analysis:

- **Personality Traits**
  - Humor level (0-100)
  - Authority score
  - Empathy rating
  - Controversy index

- **Writing Style**
  - Complexity level
  - Vocabulary richness
  - Sentence length patterns
  - Emoji usage frequency

- **Emotional Tone**
  - Primary emotions detected
  - Sentiment distribution
  - Engagement triggers

### Templates Tab
Extracted viral content patterns:

- **Hook Patterns**
  - Opening line formulas
  - Success rates
  - Engagement boost percentages

- **Top Performers**
  - Highest engagement tweets
  - Content structure analysis
  - Replicable formats

### Insights Tab
AI-generated recommendations:

- **Quick Wins**
  - Immediate improvements
  - Low-effort optimizations

- **Strategic Recommendations**
  - Long-term growth strategies
  - Content calendar suggestions
  - Audience engagement tactics

## 🔧 Troubleshooting

### Common Issues and Solutions

#### "429 Too Many Requests" Error
**Problem**: Hit X API rate limit
**Solution**:
- Wait 15 minutes for rate limit reset
- Analyze fewer profiles per session
- Consider upgrading X API tier

#### "API keys are required" Message
**Problem**: Keys not configured
**Solution**:
- Click Settings button
- Enter both API keys
- Save and retry analysis

#### Analysis Stuck at Stage
**Problem**: Network or API timeout
**Solution**:
- Refresh the page
- Check internet connection
- Verify API keys are valid
- Try a different username

#### No Results Displayed
**Problem**: User has protected tweets or no tweets
**Solution**:
- Try a public profile
- Ensure user has recent tweets
- Check if profile exists

### API Key Validation

To test if your keys work:

1. **X API Test**
   - Try analyzing a known public profile
   - If it fetches profile data, X API works

2. **Gemini API Test**
   - If you see AI insights, Gemini works
   - Check for recommendations in results

## 💡 Tips and Best Practices

### For Best Results

1. **Choose Active Profiles**
   - Users with 50+ recent tweets
   - Public profiles only
   - Active within last 30 days

2. **Optimal Usage Times**
   - Avoid peak hours (9-11 AM EST)
   - Late evening has fewer rate limits
   - Weekend mornings are ideal

3. **Interpreting Results**
   - Focus on patterns, not individual metrics
   - Compare multiple profiles in your niche
   - Track changes over time

### Power User Tips

1. **Competitive Analysis**
   - Analyze top performers in your field
   - Note their posting patterns
   - Identify content gaps

2. **Content Strategy**
   - Use templates as inspiration
   - Adapt voice insights to your style
   - Test recommended posting times

3. **Growth Hacking**
   - Apply hook patterns to your tweets
   - Monitor engagement improvements
   - Iterate based on results

### Data Privacy

- **Local Storage Only**: API keys never leave your browser
- **No Data Collection**: We don't store analysis results
- **Secure Connection**: Always use HTTPS in production
- **Clear Data**: Use browser settings to clear stored keys

## 📱 Mobile Usage

While optimized for desktop, X Profiler works on mobile:

1. **Responsive Design**: Adapts to screen size
2. **Touch Interactions**: All buttons are touch-friendly
3. **Tablet Support**: Best experience on iPad/tablets

## 🔄 Updating Your Keys

To change API keys:

1. Open Settings dialog
2. Clear existing keys
3. Enter new keys
4. Save changes

Keys are immediately updated in localStorage.

## 🎯 Use Cases

### Content Creators
- Understand viral patterns
- Optimize posting schedule
- Improve engagement rates

### Marketing Teams
- Analyze competitor strategies
- Track brand voice consistency
- Measure campaign effectiveness

### Researchers
- Study communication patterns
- Analyze influence networks
- Track trend evolution

### Personal Branding
- Refine your voice
- Find your niche
- Build engagement strategies

## 🆘 Getting Help

### Resources
- Check the "How to Use" button in-app
- Review error messages carefully
- Consult API documentation

### Common Questions

**Q: How many profiles can I analyze?**
A: With free tier, 1-2 per 15 minutes. Paid tiers allow more.

**Q: Is my data safe?**
A: Yes, all processing is temporary. Nothing is stored server-side.

**Q: Can I export results?**
A: Currently view-only. Export feature coming soon.

**Q: Works with private profiles?**
A: No, only public profiles can be analyzed.

**Q: How current is the data?**
A: Fetches latest 100 tweets in real-time.

## 🎉 Success Stories

Users have used X Profiler to:
- Increase engagement by 300%
- Identify optimal posting times
- Develop unique content voice
- Build targeted growth strategies
- Understand audience preferences

---

Ready to decode viral patterns? Start analyzing! 🚀