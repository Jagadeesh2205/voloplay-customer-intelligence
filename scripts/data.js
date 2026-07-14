// ============================================================
// CustomerIQ — Dummy Data Layer
// Simulates data from 5 integrated sources for 6 accounts
// ============================================================

const CUSTOMERS = [
  {
    id: "acc_001",
    company: "Nexus Dynamics",
    industry: "FinTech",
    logo: "ND",
    logoColor: "#3B82F6",
    website: "nexusdynamics.io",
    accountOwner: "Sarah Chen",
    csm: "Marcus Webb",

    // ── Source 1: CRM (Zoho) ──────────────────────────────
    crm: {
      source: "Zoho CRM",
      plan: "Enterprise",
      arr: 120000,
      mrr: 10000,
      dealStage: "Renewal Negotiation",
      renewalDate: "2026-09-15",
      contractStart: "2024-09-15",
      contacts: [
        { name: "Arjun Mehta", role: "CTO", email: "arjun@nexusdynamics.io", lastContact: "2026-07-10" },
        { name: "Priya Nair", role: "VP Engineering", email: "priya@nexusdynamics.io", lastContact: "2026-07-01" }
      ],
      healthScore: 62,
      npsScore: 6,
      expansionPotential: "High",
      lifetimeValue: 340000,
      tags: ["at-risk", "renewal-q3", "expansion-candidate"]
    },

    // ── Source 2: Support Tickets ──────────────────────────
    support: {
      source: "Zendesk",
      openTickets: 4,
      closedLast30: 9,
      avgResolutionHours: 28,
      csat: 3.2,
      tickets: [
        { id: "TKT-4821", status: "open", priority: "high", issue: "API rate limiting causing production failures", created: "2026-07-08", category: "Bug" },
        { id: "TKT-4890", status: "open", priority: "high", issue: "Webhook delivery delays exceeding SLA", created: "2026-07-11", category: "Performance" },
        { id: "TKT-4756", status: "open", priority: "medium", issue: "Data export format incompatible with internal BI tool", created: "2026-07-03", category: "Feature Request" },
        { id: "TKT-4701", status: "open", priority: "low", issue: "Dashboard PDF export missing logo branding", created: "2026-06-28", category: "UI Bug" }
      ],
      topCategories: ["Bug", "Performance", "Feature Request"],
      escalations: 2
    },

    // ── Source 3: Email Threads ────────────────────────────
    emails: {
      source: "Gmail / Outlook",
      lastEmailDate: "2026-07-10",
      emailsLast30: 14,
      sentiment: "negative",
      sentimentScore: -0.42,
      threads: [
        { date: "2026-07-10", from: "Arjun Mehta", subject: "RE: API Issues — We're losing confidence", snippet: "Sarah, I have to be honest — these recurring API issues are affecting our revenue pipeline. We're evaluating alternatives.", sentiment: "negative" },
        { date: "2026-07-05", from: "Sarah Chen", subject: "Check-in + renewal discussion", snippet: "Arjun, wanted to touch base before the renewal. Happy to set up an executive call to address your concerns.", sentiment: "neutral" },
        { date: "2026-06-22", from: "Priya Nair", subject: "Feature request: Bulk API endpoint", snippet: "Hi team, our engineers need a bulk endpoint for transaction processing. Is this on your roadmap?", sentiment: "neutral" }
      ],
      keyTopics: ["API reliability", "renewal concerns", "feature requests", "competitive evaluation"]
    },

    // ── Source 4: Slack ────────────────────────────────────
    slack: {
      source: "Slack",
      channels: ["#cs-nexus-dynamics", "#escalations"],
      internalNotes: [
        { date: "2026-07-11", author: "Marcus Webb", channel: "#cs-nexus-dynamics", message: "⚠️ Arjun just told me they're running a POC with Finacle. We need exec involvement ASAP." },
        { date: "2026-07-09", author: "Sarah Chen", channel: "#escalations", message: "Escalating Nexus Dynamics. 2 high-priority tickets, renewal in 63 days, and now competitive threat." },
        { date: "2026-07-04", author: "Dev Kapoor (Eng)", channel: "#cs-nexus-dynamics", message: "The rate limiting issue is a known bug in v4.2.1. Fix is in the release candidate for next week." }
      ],
      mentions: 23,
      escalationFlag: true
    },

    // ── Source 5: Product Usage ────────────────────────────
    usage: {
      source: "Product Analytics",
      lastLogin: "2026-07-12",
      dau: 31,
      mau: 89,
      dauMauRatio: 0.35,
      sessionDuration: "4m 12s",
      featuresAdopted: ["API Gateway", "Webhooks", "Dashboard", "Reports"],
      featuresNotAdopted: ["AI Insights", "Bulk Export", "SSO", "Custom Roles"],
      adoptionRate: 0.43,
      loginTrend: "declining",
      logins30d: [42, 38, 41, 35, 33, 29, 31],
      apiCallsMonth: 2400000,
      apiErrorRate: 0.034,
      planUtilization: 0.72
    }
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "acc_002",
    company: "Orbital Health",
    industry: "HealthTech",
    logo: "OH",
    logoColor: "#10B981",
    website: "orbitalhealth.com",
    accountOwner: "James Liu",
    csm: "Ananya Sharma",

    crm: {
      source: "Zoho CRM",
      plan: "Professional",
      arr: 48000,
      mrr: 4000,
      dealStage: "Active",
      renewalDate: "2027-01-20",
      contractStart: "2025-01-20",
      contacts: [
        { name: "Dr. Reena Kapoor", role: "Head of Digital", email: "reena@orbitalhealth.com", lastContact: "2026-07-08" },
        { name: "Tom Bradley", role: "IT Manager", email: "tom@orbitalhealth.com", lastContact: "2026-06-15" }
      ],
      healthScore: 88,
      npsScore: 9,
      expansionPotential: "High",
      lifetimeValue: 96000,
      tags: ["healthy", "expansion-ready", "advocate"]
    },

    support: {
      source: "Zendesk",
      openTickets: 1,
      closedLast30: 3,
      avgResolutionHours: 6,
      csat: 4.8,
      tickets: [
        { id: "TKT-5012", status: "open", priority: "low", issue: "Request for HIPAA BAA documentation renewal", created: "2026-07-09", category: "Compliance" }
      ],
      topCategories: ["Compliance", "Onboarding"],
      escalations: 0
    },

    emails: {
      source: "Gmail / Outlook",
      lastEmailDate: "2026-07-08",
      emailsLast30: 6,
      sentiment: "positive",
      sentimentScore: 0.78,
      threads: [
        { date: "2026-07-08", from: "Dr. Reena Kapoor", subject: "Love the new AI Insights feature!", snippet: "Ananya, the new AI Insights module is exactly what we needed. Our team is saving 3+ hours per week on reporting.", sentiment: "positive" },
        { date: "2026-06-30", from: "Ananya Sharma", subject: "Quarterly business review recap", snippet: "Reena, attached is the QBR summary. Excited to explore the Enterprise tier features we discussed.", sentiment: "positive" }
      ],
      keyTopics: ["AI Insights adoption", "QBR follow-up", "enterprise upgrade interest", "HIPAA compliance"]
    },

    slack: {
      source: "Slack",
      channels: ["#cs-orbital-health"],
      internalNotes: [
        { date: "2026-07-08", author: "Ananya Sharma", channel: "#cs-orbital-health", message: "🌟 Reena is a massive fan of the AI Insights update. She mentioned they might need the Enterprise tier for multi-site support." },
        { date: "2026-07-01", author: "James Liu", channel: "#cs-orbital-health", message: "QBR went great. They're onboarding 3 more hospital branches in Q4. Perfect upsell window." }
      ],
      mentions: 8,
      escalationFlag: false
    },

    usage: {
      source: "Product Analytics",
      lastLogin: "2026-07-12",
      dau: 67,
      mau: 142,
      dauMauRatio: 0.47,
      sessionDuration: "11m 38s",
      featuresAdopted: ["AI Insights", "Dashboard", "Reports", "Webhooks", "SSO", "API Gateway"],
      featuresNotAdopted: ["Custom Roles", "Bulk Export"],
      adoptionRate: 0.78,
      loginTrend: "growing",
      logins30d: [45, 52, 58, 61, 67, 70, 67],
      apiCallsMonth: 890000,
      apiErrorRate: 0.002,
      planUtilization: 0.91
    }
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "acc_003",
    company: "Stratos Retail",
    industry: "E-Commerce",
    logo: "SR",
    logoColor: "#F59E0B",
    website: "stratosretail.com",
    accountOwner: "Emily Park",
    csm: "Rohan Gupta",

    crm: {
      source: "Zoho CRM",
      plan: "Enterprise",
      arr: 96000,
      mrr: 8000,
      dealStage: "Active",
      renewalDate: "2026-11-30",
      contractStart: "2025-11-30",
      contacts: [
        { name: "Carlos Mendez", role: "COO", email: "carlos@stratosretail.com", lastContact: "2026-07-06" },
        { name: "Lisa Wong", role: "Head of Ops", email: "lisa@stratosretail.com", lastContact: "2026-07-02" }
      ],
      healthScore: 74,
      npsScore: 7,
      expansionPotential: "Medium",
      lifetimeValue: 192000,
      tags: ["stable", "renewal-q4", "ops-heavy"]
    },

    support: {
      source: "Zendesk",
      openTickets: 2,
      closedLast30: 7,
      avgResolutionHours: 14,
      csat: 4.1,
      tickets: [
        { id: "TKT-4930", status: "open", priority: "medium", issue: "Inventory sync delay during peak sale events", created: "2026-07-07", category: "Performance" },
        { id: "TKT-4944", status: "open", priority: "low", issue: "Need multi-currency support for EU expansion", created: "2026-07-10", category: "Feature Request" }
      ],
      topCategories: ["Performance", "Feature Request", "Integration"],
      escalations: 0
    },

    emails: {
      source: "Gmail / Outlook",
      lastEmailDate: "2026-07-06",
      emailsLast30: 9,
      sentiment: "neutral",
      sentimentScore: 0.12,
      threads: [
        { date: "2026-07-06", from: "Carlos Mendez", subject: "Planning for Holiday Season 2026", snippet: "Rohan, we're ramping up for Black Friday. Need to confirm platform capacity and discuss the EU launch plan.", sentiment: "neutral" },
        { date: "2026-06-28", from: "Lisa Wong", subject: "Multi-currency requirements doc", snippet: "Hi, attaching our requirements for EU expansion. Would need this by September at the latest.", sentiment: "neutral" }
      ],
      keyTopics: ["EU expansion", "multi-currency", "holiday season capacity", "peak load planning"]
    },

    slack: {
      source: "Slack",
      channels: ["#cs-stratos-retail"],
      internalNotes: [
        { date: "2026-07-07", author: "Rohan Gupta", channel: "#cs-stratos-retail", message: "Carlos confirmed they're expanding to 5 EU countries. Multi-currency feature is a hard requirement. Loop in product team." },
        { date: "2026-07-01", author: "Emily Park", channel: "#cs-stratos-retail", message: "They're planning a 3x traffic spike for Black Friday. Need to work with Eng to ensure capacity." }
      ],
      mentions: 11,
      escalationFlag: false
    },

    usage: {
      source: "Product Analytics",
      lastLogin: "2026-07-12",
      dau: 54,
      mau: 121,
      dauMauRatio: 0.45,
      sessionDuration: "8m 22s",
      featuresAdopted: ["API Gateway", "Webhooks", "Dashboard", "Reports", "Bulk Export"],
      featuresNotAdopted: ["AI Insights", "SSO", "Custom Roles"],
      adoptionRate: 0.62,
      loginTrend: "stable",
      logins30d: [50, 53, 54, 52, 56, 54, 54],
      apiCallsMonth: 5600000,
      apiErrorRate: 0.008,
      planUtilization: 0.85
    }
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "acc_004",
    company: "Vantage AI",
    industry: "SaaS / AI",
    logo: "VA",
    logoColor: "#8B5CF6",
    website: "vantage.ai",
    accountOwner: "Rachel Torres",
    csm: "Kevin O'Brien",

    crm: {
      source: "Zoho CRM",
      plan: "Startup",
      arr: 18000,
      mrr: 1500,
      dealStage: "Active",
      renewalDate: "2026-12-01",
      contractStart: "2025-12-01",
      contacts: [
        { name: "Zara Ahmed", role: "CEO", email: "zara@vantage.ai", lastContact: "2026-07-09" }
      ],
      healthScore: 91,
      npsScore: 10,
      expansionPotential: "Very High",
      lifetimeValue: 36000,
      tags: ["champion", "fast-growing", "referral-source"]
    },

    support: {
      source: "Zendesk",
      openTickets: 0,
      closedLast30: 1,
      avgResolutionHours: 3,
      csat: 5.0,
      tickets: [
        { id: "TKT-4810", status: "closed", priority: "low", issue: "Webhook signature verification question", created: "2026-07-02", category: "How-To" }
      ],
      topCategories: ["How-To", "Feature Request"],
      escalations: 0
    },

    emails: {
      source: "Gmail / Outlook",
      lastEmailDate: "2026-07-09",
      emailsLast30: 5,
      sentiment: "very positive",
      sentimentScore: 0.91,
      threads: [
        { date: "2026-07-09", from: "Zara Ahmed", subject: "Referral — Introducing you to Meridian Labs", snippet: "Kevin, I've been raving about you guys to my network. Zach at Meridian Labs will be reaching out — I told him you're the best.", sentiment: "positive" },
        { date: "2026-07-01", from: "Zara Ahmed", subject: "We hit 10K users!", snippet: "Kevin, we just crossed 10K active users. Your platform has been core to our growth. Looking at upgrading plans soon.", sentiment: "positive" }
      ],
      keyTopics: ["referrals", "platform growth", "plan upgrade interest", "network advocacy"]
    },

    slack: {
      source: "Slack",
      channels: ["#cs-vantage-ai"],
      internalNotes: [
        { date: "2026-07-09", author: "Kevin O'Brien", channel: "#cs-vantage-ai", message: "🚀 Zara is referring Meridian Labs to us! Also strong signals for upgrade to Professional plan. Let's schedule a growth call." },
        { date: "2026-07-01", author: "Rachel Torres", channel: "#cs-vantage-ai", message: "Vantage just hit 10K users. Their plan is maxed out — this is a natural upgrade conversation." }
      ],
      mentions: 6,
      escalationFlag: false
    },

    usage: {
      source: "Product Analytics",
      lastLogin: "2026-07-12",
      dau: 89,
      mau: 156,
      dauMauRatio: 0.57,
      sessionDuration: "15m 04s",
      featuresAdopted: ["API Gateway", "Webhooks", "AI Insights", "Dashboard", "Reports", "SSO", "Custom Roles"],
      featuresNotAdopted: ["Bulk Export"],
      adoptionRate: 0.92,
      loginTrend: "rapidly growing",
      logins30d: [60, 68, 74, 80, 85, 88, 89],
      apiCallsMonth: 980000,
      apiErrorRate: 0.001,
      planUtilization: 0.99
    }
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "acc_005",
    company: "Meridian Logistics",
    industry: "Supply Chain",
    logo: "ML",
    logoColor: "#EF4444",
    website: "meridianlogistics.co",
    accountOwner: "David Kim",
    csm: "Pooja Ramesh",

    crm: {
      source: "Zoho CRM",
      plan: "Professional",
      arr: 36000,
      mrr: 3000,
      dealStage: "At Risk",
      renewalDate: "2026-08-01",
      contractStart: "2025-08-01",
      contacts: [
        { name: "Frank Deluca", role: "CTO", email: "frank@meridianlogistics.co", lastContact: "2026-06-15" },
        { name: "Anne Goh", role: "Operations Lead", email: "anne@meridianlogistics.co", lastContact: "2026-06-01" }
      ],
      healthScore: 34,
      npsScore: 4,
      expansionPotential: "Low",
      lifetimeValue: 72000,
      tags: ["churn-risk", "renewal-q3", "disengaged"]
    },

    support: {
      source: "Zendesk",
      openTickets: 3,
      closedLast30: 2,
      avgResolutionHours: 52,
      csat: 2.4,
      tickets: [
        { id: "TKT-4611", status: "open", priority: "high", issue: "Integration with SAP ERP broken after platform update", created: "2026-06-20", category: "Bug" },
        { id: "TKT-4700", status: "open", priority: "high", issue: "Route optimization reports returning stale data", created: "2026-07-01", category: "Bug" },
        { id: "TKT-4790", status: "open", priority: "medium", issue: "No response from support for 10+ days", created: "2026-07-08", category: "Support Quality" }
      ],
      topCategories: ["Bug", "Support Quality", "Integration"],
      escalations: 3
    },

    emails: {
      source: "Gmail / Outlook",
      lastEmailDate: "2026-07-08",
      emailsLast30: 4,
      sentiment: "very negative",
      sentimentScore: -0.87,
      threads: [
        { date: "2026-07-08", from: "Frank Deluca", subject: "Formal complaint — considering cancellation", snippet: "David, I'm writing to formally express our dissatisfaction. The SAP integration has been broken for 18 days. We are actively reviewing contracts.", sentiment: "negative" },
        { date: "2026-06-30", from: "Anne Goh", subject: "Still waiting on SAP fix", snippet: "It's been 10 days since TKT-4611 was filed. No resolution, no ETA. This is unacceptable for our operations.", sentiment: "negative" }
      ],
      keyTopics: ["SAP integration failure", "cancellation threat", "support response time", "operational impact"]
    },

    slack: {
      source: "Slack",
      channels: ["#cs-meridian-logistics", "#churn-risk"],
      internalNotes: [
        { date: "2026-07-09", author: "Pooja Ramesh", channel: "#churn-risk", message: "🔴 CRITICAL: Meridian renewal is Aug 1. SAP bug still open. Frank sent a formal complaint. We have ~18 days to save this account." },
        { date: "2026-07-05", author: "David Kim", channel: "#cs-meridian-logistics", message: "Eng team says SAP fix lands in v4.3.0 next Tuesday. I'm going to personally reach out to Frank with a timeline." }
      ],
      mentions: 34,
      escalationFlag: true
    },

    usage: {
      source: "Product Analytics",
      lastLogin: "2026-07-09",
      dau: 8,
      mau: 44,
      dauMauRatio: 0.18,
      sessionDuration: "2m 05s",
      featuresAdopted: ["Dashboard", "Reports"],
      featuresNotAdopted: ["AI Insights", "API Gateway", "Webhooks", "SSO", "Custom Roles", "Bulk Export"],
      adoptionRate: 0.22,
      loginTrend: "rapidly declining",
      logins30d: [35, 28, 22, 18, 15, 10, 8],
      apiCallsMonth: 120000,
      apiErrorRate: 0.041,
      planUtilization: 0.28
    }
  },

  // ─────────────────────────────────────────────────────────
  {
    id: "acc_006",
    company: "Pinnacle Edu",
    industry: "EdTech",
    logo: "PE",
    logoColor: "#F97316",
    website: "pinnacleedu.org",
    accountOwner: "Natalie Ross",
    csm: "Siddharth Rao",

    crm: {
      source: "Zoho CRM",
      plan: "Professional",
      arr: 60000,
      mrr: 5000,
      dealStage: "Upsell Discussion",
      renewalDate: "2027-03-01",
      contractStart: "2026-03-01",
      contacts: [
        { name: "Michelle Park", role: "VP Product", email: "michelle@pinnacleedu.org", lastContact: "2026-07-07" },
        { name: "Brian Torres", role: "Data Analyst", email: "brian@pinnacleedu.org", lastContact: "2026-07-05" }
      ],
      healthScore: 79,
      npsScore: 8,
      expansionPotential: "High",
      lifetimeValue: 120000,
      tags: ["healthy", "upsell-active", "data-driven"]
    },

    support: {
      source: "Zendesk",
      openTickets: 1,
      closedLast30: 5,
      avgResolutionHours: 9,
      csat: 4.5,
      tickets: [
        { id: "TKT-5021", status: "open", priority: "medium", issue: "Custom dashboard widget builder crashes on Safari", created: "2026-07-11", category: "Bug" }
      ],
      topCategories: ["Feature Request", "Bug", "How-To"],
      escalations: 0
    },

    emails: {
      source: "Gmail / Outlook",
      lastEmailDate: "2026-07-07",
      emailsLast30: 11,
      sentiment: "positive",
      sentimentScore: 0.65,
      threads: [
        { date: "2026-07-07", from: "Michelle Park", subject: "Data governance features — strong interest", snippet: "Siddharth, we're ready to move forward on the Enterprise plan. Specifically need the data governance and custom roles features for our university contracts.", sentiment: "positive" },
        { date: "2026-07-03", from: "Brian Torres", subject: "API usage analysis I ran", snippet: "Hi, sharing an internal analysis we ran. We're hitting our API limits 3x a week. Probably time to revisit our plan tier.", sentiment: "neutral" }
      ],
      keyTopics: ["enterprise upgrade", "data governance", "API limits", "university contracts"]
    },

    slack: {
      source: "Slack",
      channels: ["#cs-pinnacle-edu"],
      internalNotes: [
        { date: "2026-07-07", author: "Siddharth Rao", channel: "#cs-pinnacle-edu", message: "✅ Michelle confirmed intent to upgrade to Enterprise. She needs data governance + custom roles. Strong close in next 2 weeks." },
        { date: "2026-07-05", author: "Natalie Ross", channel: "#cs-pinnacle-edu", message: "Brian shared API usage data — they're hitting limits regularly. Natural conversation to move to Enterprise tier. ARR uplift potential ~$36K." }
      ],
      mentions: 9,
      escalationFlag: false
    },

    usage: {
      source: "Product Analytics",
      lastLogin: "2026-07-12",
      dau: 78,
      mau: 168,
      dauMauRatio: 0.46,
      sessionDuration: "9m 51s",
      featuresAdopted: ["API Gateway", "Dashboard", "Reports", "AI Insights", "Webhooks", "SSO"],
      featuresNotAdopted: ["Custom Roles", "Bulk Export"],
      adoptionRate: 0.75,
      loginTrend: "growing",
      logins30d: [60, 65, 68, 72, 75, 78, 78],
      apiCallsMonth: 1800000,
      apiErrorRate: 0.003,
      planUtilization: 0.94
    }
  }
];

// Utility helpers
function getCustomerById(id) {
  return CUSTOMERS.find(c => c.id === id);
}

function getHealthLabel(score) {
  if (score >= 80) return { label: "Healthy", class: "health-good" };
  if (score >= 60) return { label: "At Risk", class: "health-medium" };
  return { label: "Critical", class: "health-critical" };
}

function formatCurrency(n) {
  return '$' + n.toLocaleString('en-US');
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function daysUntil(dateStr) {
  const diff = new Date(dateStr) - new Date();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function getSentimentIcon(sentiment) {
  if (sentiment.includes("positive")) return "😊";
  if (sentiment.includes("negative")) return "😟";
  return "😐";
}

// Build unified timeline for a customer (across all sources)
function buildTimeline(customer) {
  const events = [];

  // Support tickets
  customer.support.tickets.forEach(t => {
    events.push({
      date: t.created,
      type: "ticket",
      icon: t.priority === "high" ? "🔴" : t.priority === "medium" ? "🟡" : "🟢",
      source: "Support",
      title: `[${t.id}] ${t.issue}`,
      meta: `${t.priority.toUpperCase()} priority · ${t.category} · ${t.status}`
    });
  });

  // Email threads
  customer.emails.threads.forEach(e => {
    events.push({
      date: e.date,
      type: "email",
      icon: "✉️",
      source: "Email",
      title: e.subject,
      meta: `From: ${e.from} · ${e.sentiment}`
    });
  });

  // Slack notes
  customer.slack.internalNotes.forEach(s => {
    events.push({
      date: s.date,
      type: "slack",
      icon: "💬",
      source: "Slack",
      title: s.message.length > 80 ? s.message.slice(0, 80) + "…" : s.message,
      meta: `${s.author} in ${s.channel}`
    });
  });

  // Sort by date descending
  return events.sort((a, b) => new Date(b.date) - new Date(a.date));
}
