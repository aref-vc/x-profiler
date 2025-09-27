# Changelog

All notable changes to X Profiler will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2024-09-27

### 🔒 Security Release

This major version focuses on comprehensive security improvements and vulnerability fixes.

### Added
- **Security Headers & CSP** - Implemented Content Security Policy and security headers via middleware
- **Input Validation** - Added robust username validation with regex patterns (alphanumeric, underscore, max 15 chars)
- **API Configuration Module** - New centralized API key management system (`/lib/config/api-config.ts`)
- **Environment Template** - Created `.env.local.example` for secure configuration guidance
- **Comprehensive .gitignore** - Added extensive .gitignore to prevent accidental credential commits
- **Security Documentation** - Added SECURITY.md with security policies and best practices
- **TypeScript Type Safety** - Fixed all type errors for better code reliability

### Changed
- **API Key Management** - Migrated from client-side localStorage to server-side environment variables
- **Error Handling** - Improved error messages without exposing sensitive information
- **Logging Strategy** - Removed all sensitive console.log statements from production code
- **Dependency Updates** - Updated Next.js from 15.0.3 to 15.5.4 (fixes 7 critical vulnerabilities)

### Fixed
- **Critical Security Vulnerabilities**:
  - Removed hardcoded API credentials from `.env.local`
  - Fixed client-side API key exposure vulnerability
  - Patched 7 critical Next.js security vulnerabilities
  - Fixed authorization bypass in Next.js middleware
  - Resolved cache poisoning vulnerability
  - Fixed SSRF vulnerability in middleware
  - Patched DoS vulnerability with Server Actions

### Security
- **Input Sanitization** - All user inputs now properly validated and sanitized
- **No Exposed Secrets** - API keys removed from codebase and client-side storage
- **Security Headers** - X-Frame-Options, X-XSS-Protection, X-Content-Type-Options implemented
- **CSP Policy** - Strict Content Security Policy to prevent XSS attacks
- **Zero Vulnerabilities** - npm audit shows 0 vulnerabilities

### Developer Experience
- Improved type safety throughout the application
- Better error messages for configuration issues
- Clear documentation for API setup

## [1.3.0] - 2024-09-27

### Added
- Comprehensive documentation suite:
  - ARCHITECTURE.md - Technical architecture and design
  - HOW-TO.md - Detailed usage instructions
  - LIMITATIONS.md - Current limitations and constraints

## [1.2.0] - 2024-09-27

### Added
- X API free tier limitations warning in "How to Use" tooltip
- Rate limit information for better user awareness

### Fixed
- "How to Use" button functionality (changed from Tooltip to Popover component)

## [1.1.0] - 2024-09-27

### Changed
- Renamed application to "X Profiler" (from Twitter Profile Analyzer)
- Removed all mock/placeholder data
- Moved API configuration to user-configurable Settings dialog

### Added
- Settings dialog for API key configuration
- localStorage support for API keys
- "How to Use" tooltip in header

## [1.0.0] - 2024-09-27

### Initial Release
- Real-time X (Twitter) profile analysis
- Integration with X API v2 and Google Gemini AI
- Content & semantic analysis
- Voice & style detection
- Viral formula extraction
- Template generation
- Engagement intelligence
- JetBrains Mono font integration
- Custom dark theme with glassmorphism design