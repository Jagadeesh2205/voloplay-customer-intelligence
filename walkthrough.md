# CustomerIQ — Build Walkthrough

**Unified Customer Intelligence Platform** built for the Voloplay AI Tool-Building Challenge

---

## What Was Built

A fully functional, premium single-page web application that consolidates customer data from **5 sources** into a **360° account view**, with **Gemini AI** generating actionable insights.

---

## Screenshots

### Landing Page
![CustomerIQ Landing Page](file:///C:/Users/A%20JAGADEESH/.gemini/antigravity-ide/brain/89961f02-ff94-46fd-aecc-774e9140fa32/landing_page_1784024623652.png)

### Account Cards Grid
![Account Cards with Health Score Rings](file:///C:/Users/A%20JAGADEESH/.gemini/antigravity-ide/brain/89961f02-ff94-46fd-aecc-774e9140fa32/account_cards_1784024660839.png)

### Customer 360° Dashboard
![Nexus Dynamics Dashboard](file:///C:/Users/A%20JAGADEESH/.gemini/antigravity-ide/brain/89961f02-ff94-46fd-aecc-774e9140fa32/dashboard_view_1784024686334.png)

### Dashboard (Scrolled) — Activity Timeline & AI Panel
![Dashboard Scrolled — Timeline and AI Sidebar](file:///C:/Users/A%20JAGADEESH/.gemini/antigravity-ide/brain/89961f02-ff94-46fd-aecc-774e9140fa32/dashboard_scrolled_1784024776475.png)

---

## Files Created

| File | Size | Purpose |
|---|---|---|
| [index.html](file:///c:/Users/A%20JAGADEESH/Documents/Web%20applications/voloplay%20assesment/index.html) | 11KB | Landing page — hero, search, account grid |
| [dashboard.html](file:///c:/Users/A%20JAGADEESH/Documents/Web%20applications/voloplay%20assesment/dashboard.html) | 12KB | 360° customer view dashboard |
| [scripts/data.js](file:///c:/Users/A%20JAGADEESH/Documents/Web%20applications/voloplay%20assesment/scripts/data.js) | 24KB | Dummy data for 6 accounts × 5 sources |
| [scripts/ai.js](file:///c:/Users/A%20JAGADEESH/Documents/Web%20applications/voloplay%20assesment/scripts/ai.js) | 6KB | Gemini API integration + prompt engineering |
| [scripts/app.js](file:///c:/Users/A%20JAGADEESH/Documents/Web%20applications/voloplay%20assesment/scripts/app.js) | 6KB | Landing page — search, render, navigation |
| [scripts/dashboard.js](file:///c:/Users/A%20JAGADEESH/Documents/Web%20applications/voloplay%20assesment/scripts/dashboard.js) | 27KB | Full dashboard rendering engine |
| [styles/main.css](file:///c:/Users/A%20JAGADEESH/Documents/Web%20applications/voloplay%20assesment/styles/main.css) | 13KB | Design system — tokens, animations, components |
| [styles/dashboard.css](file:///c:/Users/A%20JAGADEESH/Documents/Web%20applications/voloplay%20assesment/styles/dashboard.css) | 13KB | Dashboard-specific layout and styles |

---

## Features Implemented

### ✅ Data Sources (5)
1. **CRM (Zoho-like)** — ARR, plan, deal stage, renewal date, contacts, NPS, expansion potential
2. **Support Tickets (Zendesk)** — open/closed tickets, CSAT, resolution time, escalations
3. **Email Threads** — sentiment analysis, key topics, last contact date
4. **Slack** — internal team notes, channel mentions, escalation flag
5. **Product Usage** — DAU/MAU ratio, login trends, feature adoption, plan utilization

### ✅ Functional Requirements
- ✓ Uses data from 5 different sources
- ✓ Unified 360° account view per customer
- ✓ AI-powered executive summary via Gemini
- ✓ Risk signals with HIGH/MEDIUM/LOW severity
- ✓ Opportunities (Expansion/Retention/Advocacy/Adoption)
- ✓ Next Best Actions with owner + timeline + rationale
- ✓ Clear, premium user-friendly format

### ✅ Premium UI Features
- Dark theme with glassmorphism cards
- Animated health score rings (SVG)
- Count-up number animations
- 30-day login sparkline chart
- Feature adoption progress bars
- Real-time search/filter
- Activity timeline across all sources
- Toast notifications
- API key persisted in localStorage
- Responsive layout (mobile-friendly)

---

## How to Use

1. Open `http://localhost:8765` (server is running) or open `index.html` in a browser
2. Enter your **Gemini API key** (optional, for AI features — free at [aistudio.google.com](https://aistudio.google.com))
3. Browse the 6 dummy customer accounts — each with different health profiles
4. Click any account card to open the 360° dashboard
5. On the dashboard, click **"Generate AI Analysis"** in the right sidebar
6. AI returns: Executive Summary + Risk Signals + Opportunities + Next Best Actions

---

## Customer Accounts (Dummy Data)

| Company | Industry | Health | Scenario |
|---|---|---|---|
| Nexus Dynamics | FinTech | 62 — At Risk | API failures, competitor evaluation, renewal in 63d |
| Orbital Health | HealthTech | 88 — Healthy | Champion, upsell opportunity, loving AI features |
| Stratos Retail | E-Commerce | 74 — Stable | EU expansion, Black Friday planning, multi-currency need |
| Vantage AI | SaaS/AI | 91 — Excellent | Referral source, plan limit hit, rapid growth |
| Meridian Logistics | Supply Chain | 34 — Critical | SAP bug, formal complaint, churn risk in 18 days |
| Pinnacle Edu | EdTech | 79 — Healthy | Active upsell discussion, API limits hit, enterprise intent |

---

## Deployment for Live Link

To make publicly accessible via **GitHub Pages**:

```bash
git init
git add .
git commit -m "CustomerIQ - Initial build"
git remote add origin https://github.com/YOUR_USERNAME/customeriq.git
git push -u origin main
# Then enable GitHub Pages in repo Settings → Pages → main branch
```

Live URL will be: `https://YOUR_USERNAME.github.io/customeriq/`

---

## Verification

- ✅ All 6 account cards render on landing page
- ✅ Search/filter works in real-time
- ✅ Dashboard loads with all 5 source cards
- ✅ Account header shows KPIs with count-up animation
- ✅ Activity timeline populates from all 3 event sources
- ✅ Feature adoption chart and ticket list render
- ✅ AI sidebar prompts for API key
- ✅ No JavaScript errors in console
- ✅ Responsive on mobile viewports
