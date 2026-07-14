# Customer Intelligence Dashboard — Implementation Plan

A unified customer view tool that consolidates data from 5 sources and uses AI to generate insights, risk signals, and recommended next actions.

---

## Solution Overview

**CustomerIQ** — A single-page web application that simulates a real-world customer intelligence platform. It ingests data from multiple sources, displays a consolidated 360° account view, and leverages the Gemini API for AI-generated summaries and next best action recommendations.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CustomerIQ Dashboard                      │
│                   (HTML + CSS + JavaScript)                  │
├───────────────┬──────────────┬──────────────┬───────────────┤
│  CRM Module   │  Support     │   Email      │  Slack +      │
│  (Zoho-like)  │  Tickets     │   Thread     │  Usage Data   │
├───────────────┴──────────────┴──────────────┴───────────────┤
│                  Data Aggregation Layer (JS)                 │
├─────────────────────────────────────────────────────────────┤
│           AI Engine (Google Gemini API)                     │
│   • Unified Summary  • Risk Signals  • Opportunities        │
│   • Next Best Action Recommendations                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Sources (Dummy Data)

| # | Source | Data Points |
|---|--------|------------|
| 1 | **CRM (Zoho)** | Company, ARR, plan, owner, deal stage, renewal date, health score |
| 2 | **Support Tickets** | Open/closed tickets, priority, issue categories, resolution time |
| 3 | **Email Threads** | Last contact, email sentiment, key topics discussed |
| 4 | **Slack Conversations** | Channel mentions, internal team notes, escalations |
| 5 | **Product Usage** | DAU/MAU, feature adoption, login frequency, last active |

---

## Pages / Views

### 1. Landing / Search Page
- Search/select a customer account
- List of recent accounts with health score badges
- Premium hero with animated gradient

### 2. Customer 360° View (Main Dashboard)
- **Header**: Company logo, name, ARR, health score ring
- **Source Cards**: One card per data source with key metrics
- **Timeline**: Chronological activity across all sources
- **AI Panel** (right sidebar):
  - 🔍 Executive Summary
  - ⚠️ Risk Signals
  - 🚀 Opportunities
  - ✅ Next Best Action recommendations

### 3. AI Analysis Modal
- Full Gemini-powered deep-dive analysis
- Markdown-rendered output
- Copy/Export functionality

---

## File Structure

```
voloplay assesment/
├── index.html          ← Landing / account search
├── dashboard.html      ← Customer 360° view
├── styles/
│   ├── main.css        ← Design system, tokens, animations
│   └── dashboard.css   ← Dashboard-specific styles
├── scripts/
│   ├── data.js         ← All dummy data for 6 customers
│   ├── app.js          ← Landing page logic
│   ├── dashboard.js    ← Dashboard rendering
│   └── ai.js           ← Gemini API integration
└── assets/
    └── (generated images)
```

---

## Proposed Changes

### [NEW] index.html
Landing page with account search, recent accounts grid, health score indicators

### [NEW] dashboard.html  
Full 360° dashboard with data source cards, activity timeline, AI insights panel

### [NEW] styles/main.css
Design system: dark theme, HSL colors, glassmorphism, micro-animations, typography

### [NEW] styles/dashboard.css
Dashboard-specific layout: grid, card styles, timeline, AI panel

### [NEW] scripts/data.js
6 realistic dummy customer accounts with data from all 5 sources

### [NEW] scripts/app.js
Search functionality, account filtering, navigation

### [NEW] scripts/dashboard.js
Dashboard rendering, timeline generation, health score visualization

### [NEW] scripts/ai.js
Gemini API calls, prompt engineering, response parsing & rendering

---

## Design System

- **Palette**: Deep navy `#0A0F1E` base, electric blue `#3B82F6` accent, emerald `#10B981` positive, amber `#F59E0B` warning, rose `#F43F5E` risk
- **Typography**: Inter (Google Fonts) — weights 300/400/500/600/700
- **Glass cards**: `backdrop-filter: blur(20px)` with subtle borders
- **Animations**: Framer-style CSS keyframes, count-up numbers, pulse rings

---

## AI Prompt Strategy

```
System: You are a Senior Customer Success analyst. Analyze the following 
consolidated customer data from multiple sources and provide:

1. EXECUTIVE SUMMARY (2-3 sentences)
2. RISK SIGNALS (bullet list with severity: HIGH/MEDIUM/LOW)  
3. OPPORTUNITIES (bullet list)
4. NEXT BEST ACTIONS (prioritized list with owner, timeline, and rationale)

Customer Data:
[CRM data] + [Support tickets] + [Email threads] + [Slack notes] + [Usage]

Be specific, actionable, and data-driven. Format as JSON.
```

---

## Verification Plan

### Manual Verification
- Open `index.html` in browser — verify search and account cards render
- Select a customer — verify dashboard loads with all 5 data source cards
- Click "Generate AI Analysis" — verify Gemini API call and response renders
- Verify responsive layout on mobile
- Verify health score ring animation, timeline, and all interactive elements

---

## Open Questions

> [!IMPORTANT]
> **Gemini API Key**: The app will need a Gemini API key. I'll add a key input field on the landing page so you can enter your own key — this avoids hardcoding credentials and makes the demo publicly shareable without API cost risks.

> [!NOTE]
> **Hosting**: For the live demo link requirement, the easiest path is GitHub Pages (static HTML — no server needed). I'll structure the code to work as a pure static site.
