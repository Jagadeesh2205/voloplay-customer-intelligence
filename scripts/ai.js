// ============================================================
// CustomerIQ — AI Engine (Google Gemini API)
// ============================================================

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

function buildPrompt(customer) {
  const c = customer;
  const days = daysUntil(c.crm.renewalDate);

  return `You are a Senior Customer Success Analyst at a B2B SaaS company. Analyze the following consolidated customer intelligence data and provide actionable insights.

## Customer: ${c.company} (${c.industry})
- Plan: ${c.crm.plan} | ARR: ${formatCurrency(c.crm.arr)} | Health Score: ${c.crm.healthScore}/100
- Renewal: ${formatDate(c.crm.renewalDate)} (${days} days away)
- Account Owner: ${c.accountOwner} | CSM: ${c.csm}
- NPS Score: ${c.crm.npsScore}/10
- Expansion Potential: ${c.crm.expansionPotential}

## CRM Data (Zoho)
- Deal Stage: ${c.crm.dealStage}
- Lifetime Value: ${formatCurrency(c.crm.lifetimeValue)}
- Key Contacts: ${c.crm.contacts.map(ct => `${ct.name} (${ct.role}), last contacted ${formatDate(ct.lastContact)}`).join('; ')}
- Tags: ${c.crm.tags.join(', ')}

## Support Tickets (Zendesk)
- Open Tickets: ${c.support.openTickets} | Closed (30d): ${c.support.closedLast30}
- Avg Resolution Time: ${c.support.avgResolutionHours}h | CSAT: ${c.support.csat}/5
- Escalations: ${c.support.escalations}
- Open Issues: ${c.support.tickets.filter(t => t.status === 'open').map(t => `[${t.priority.toUpperCase()}] ${t.issue} (${t.category})`).join(' | ')}

## Email Communications
- Last Email: ${formatDate(c.emails.lastEmailDate)} | Emails (30d): ${c.emails.emailsLast30}
- Sentiment: ${c.emails.sentiment} (score: ${c.emails.sentimentScore})
- Key Topics: ${c.emails.keyTopics.join(', ')}
- Recent Threads: ${c.emails.threads.map(e => `"${e.subject}" from ${e.from}: "${e.snippet.slice(0, 100)}..."`).join(' | ')}

## Slack / Internal Notes
- Escalation Flag: ${c.slack.escalationFlag}
- Internal Notes: ${c.slack.internalNotes.map(n => `[${n.author}]: ${n.message}`).join(' | ')}

## Product Usage Analytics
- Last Login: ${formatDate(c.usage.lastLogin)}
- DAU: ${c.usage.dau} | MAU: ${c.usage.mau} | DAU/MAU: ${(c.usage.dauMauRatio * 100).toFixed(0)}%
- Login Trend: ${c.usage.loginTrend}
- Session Duration: ${c.usage.sessionDuration}
- Features Adopted (${c.usage.featuresAdopted.length}): ${c.usage.featuresAdopted.join(', ')}
- Features NOT Adopted (${c.usage.featuresNotAdopted.length}): ${c.usage.featuresNotAdopted.join(', ')}
- Feature Adoption Rate: ${(c.usage.adoptionRate * 100).toFixed(0)}%
- Plan Utilization: ${(c.usage.planUtilization * 100).toFixed(0)}%
- API Error Rate: ${(c.usage.apiErrorRate * 100).toFixed(1)}%
- API Calls/Month: ${c.usage.apiCallsMonth.toLocaleString()}

---

Based on the above multi-source data, provide a structured analysis in the following EXACT JSON format:

{
  "executiveSummary": "2-3 sentence summary of the customer's current state, highlighting the most critical business context.",
  "riskSignals": [
    {"severity": "HIGH|MEDIUM|LOW", "signal": "Description of the risk", "source": "Which data source reveals this"}
  ],
  "opportunities": [
    {"type": "Expansion|Retention|Advocacy|Adoption", "opportunity": "Description", "estimatedValue": "ARR impact if applicable"}
  ],
  "nextBestActions": [
    {"priority": 1, "action": "Specific actionable step", "owner": "Account Owner|CSM|Engineering|Product", "timeline": "Immediate|This Week|This Month", "rationale": "Why this action matters"}
  ],
  "accountSentiment": "Positive|Neutral|At Risk|Critical",
  "confidenceScore": 85
}

Be specific, data-driven, and actionable. Reference actual data points from the analysis. Provide 2-4 risk signals, 2-3 opportunities, and 3-4 next best actions ranked by priority.`;
}

async function generateAIAnalysis(customer, apiKey) {
  const prompt = buildPrompt(customer);
  const models = [
    { name: "gemini-2.0-flash", version: "v1beta" },
    { name: "gemini-1.5-flash", version: "v1" },
    { name: "gemini-1.5-flash", version: "v1beta" }
  ];
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/${model.version}/models/${model.name}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.3,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1500
          }
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || `API error ${response.status} with ${model.name} (${model.version})`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

      // Extract JSON from the response (handle markdown code blocks)
      const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, rawText];
      const jsonStr = jsonMatch[1].trim();

      try {
        return JSON.parse(jsonStr);
      } catch (e) {
        // Fallback: try parsing the raw text
        const start = rawText.indexOf('{');
        const end = rawText.lastIndexOf('}') + 1;
        if (start !== -1 && end > start) {
          return JSON.parse(rawText.slice(start, end));
        }
        throw new Error("Failed to parse AI response as JSON");
      }
    } catch (err) {
      console.warn(`Failed with model ${model.name} (${model.version}):`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error("Failed to generate AI analysis across all models");
}

function getSeverityColor(severity) {
  if (severity === "HIGH") return "#F43F5E";
  if (severity === "MEDIUM") return "#F59E0B";
  return "#3B82F6";
}

function getSeverityBg(severity) {
  if (severity === "HIGH") return "rgba(244,63,94,0.12)";
  if (severity === "MEDIUM") return "rgba(245,158,11,0.12)";
  return "rgba(59,130,246,0.12)";
}

function getOpportunityIcon(type) {
  const icons = { Expansion: "📈", Retention: "🛡️", Advocacy: "🌟", Adoption: "🚀" };
  return icons[type] || "💡";
}

function getPriorityIcon(p) {
  const icons = { 1: "🔥", 2: "⚡", 3: "✅", 4: "📌" };
  return icons[p] || "•";
}

function getTimelineColor(tl) {
  if (tl === "Immediate") return "#F43F5E";
  if (tl === "This Week") return "#F59E0B";
  return "#10B981";
}
