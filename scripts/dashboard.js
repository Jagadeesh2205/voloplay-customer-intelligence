// ============================================================
// CustomerIQ — Dashboard Rendering Engine
// ============================================================

let currentCustomer = null;
let aiAnalysisCache = null;

function initDashboard() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  if (!id) { window.location.href = 'index.html'; return; }

  currentCustomer = getCustomerById(id);
  if (!currentCustomer) { window.location.href = 'index.html'; return; }

  // Load saved API key
  const savedKey = localStorage.getItem('customeriq_api_key') || '';
  const keyInput = document.getElementById('ai-key-input');
  if (keyInput && savedKey) keyInput.value = savedKey;

  renderAll();
}

function renderAll() {
  const c = currentCustomer;
  renderAccountHeader(c);
  renderSourceCards(c);
  renderTimeline(c);
  renderContactsCard(c);
  renderUsageCard(c);
  renderAIPlaceholder();
  animateNumbers();
}

// ── Account Header ────────────────────────────────────────
function renderAccountHeader(c) {
  const days = daysUntil(c.crm.renewalDate);
  const health = getHealthLabel(c.crm.healthScore);
  const renewalColor = days < 30 ? 'var(--rose)' : days < 90 ? 'var(--amber)' : 'var(--emerald)';
  const strokeDash = 2 * Math.PI * 38; // r=38
  const offset = strokeDash - (c.crm.healthScore / 100) * strokeDash;
  const ringColor = c.crm.healthScore >= 80 ? '#10B981' : c.crm.healthScore >= 60 ? '#F59E0B' : '#F43F5E';
  const sentColor = c.emails.sentimentScore > 0.3 ? 'var(--emerald)' : c.emails.sentimentScore < -0.2 ? 'var(--rose)' : 'var(--amber)';

  document.getElementById('account-header').innerHTML = `
    <div class="account-header card glow-blue">
      <div class="account-header-top">
        <div class="account-identity">
          <div class="account-logo" style="background:linear-gradient(135deg,${c.logoColor},${c.logoColor}bb);">
            ${c.logo}
          </div>
          <div>
            <div class="account-name">${c.company}</div>
            <div class="account-meta">
              <div class="account-meta-item"><span class="icon">🏢</span>${c.industry}</div>
              <div class="account-meta-item"><span class="icon">👤</span>AO: ${c.accountOwner}</div>
              <div class="account-meta-item"><span class="icon">🎯</span>CSM: ${c.csm}</div>
              <div class="account-meta-item"><span class="icon">🌐</span>${c.website}</div>
              ${c.slack.escalationFlag 
                ? '<span class="badge badge-rose" style="font-size:11px;">⚠️ ESCALATION ACTIVE</span>' 
                : '<span class="badge badge-emerald" style="font-size:11px;">✓ No Escalations</span>'}
            </div>
          </div>
        </div>

        <div class="health-ring-wrap" style="width:96px;height:96px;">
          <svg width="96" height="96" viewBox="0 0 96 96">
            <circle class="health-ring-bg" cx="48" cy="48" r="38" stroke-width="6"/>
            <circle class="health-ring-fill"
              cx="48" cy="48" r="38"
              stroke="${ringColor}"
              stroke-width="6"
              stroke-dasharray="${strokeDash}"
              stroke-dashoffset="${offset}"
              style="filter:drop-shadow(0 0 6px ${ringColor}88)"/>
          </svg>
          <div class="health-ring-text">
            <span class="health-ring-score" style="font-size:24px;">${c.crm.healthScore}</span>
            <span class="health-ring-label">health</span>
          </div>
        </div>
      </div>

      <div class="account-kpis">
        <div class="kpi-item">
          <div class="kpi-value" data-count="${c.crm.arr}" data-prefix="$" data-format="currency">$0</div>
          <div class="kpi-label">Annual Recurring Revenue</div>
          <div class="kpi-sub">${c.crm.plan} Plan</div>
        </div>
        <div class="kpi-item">
          <div class="kpi-value" style="color:${renewalColor};">${days}d</div>
          <div class="kpi-label">Until Renewal</div>
          <div class="kpi-sub">${formatDate(c.crm.renewalDate)}</div>
        </div>
        <div class="kpi-item">
          <div class="kpi-value" data-count="${c.crm.npsScore}">/10</div>
          <div class="kpi-label">NPS Score</div>
          <div class="kpi-sub">Customer sentiment</div>
        </div>
        <div class="kpi-item">
          <div class="kpi-value" style="color:${sentColor};">${getSentimentIcon(c.emails.sentiment)}</div>
          <div class="kpi-label">Email Sentiment</div>
          <div class="kpi-sub" style="text-transform:capitalize;">${c.emails.sentiment}</div>
        </div>
        <div class="kpi-item">
          <div class="kpi-value">${c.support.openTickets}</div>
          <div class="kpi-label">Open Tickets</div>
          <div class="kpi-sub">${c.support.escalations} escalation${c.support.escalations !== 1 ? 's' : ''}</div>
        </div>
        <div class="kpi-item">
          <div class="kpi-value" style="color:${c.usage.adoptionRate >= 0.7 ? 'var(--emerald)' : c.usage.adoptionRate >= 0.4 ? 'var(--amber)' : 'var(--rose)'}">
            ${Math.round(c.usage.adoptionRate * 100)}%
          </div>
          <div class="kpi-label">Feature Adoption</div>
          <div class="kpi-sub">${c.usage.featuresAdopted.length}/${c.usage.featuresAdopted.length + c.usage.featuresNotAdopted.length} features</div>
        </div>
      </div>
    </div>`;
}

// ── Source Cards ──────────────────────────────────────────
function renderSourceCards(c) {
  const container = document.getElementById('source-cards');

  const sentimentColor = c.emails.sentimentScore > 0.3 ? 'var(--emerald)' : c.emails.sentimentScore < -0.2 ? 'var(--rose)' : 'var(--amber)';
  const trendIcon = c.usage.loginTrend.includes('grow') ? '📈' : c.usage.loginTrend.includes('declin') ? '📉' : '➡️';
  const trendColor = c.usage.loginTrend.includes('grow') ? 'var(--emerald)' : c.usage.loginTrend.includes('declin') ? 'var(--rose)' : 'var(--text-secondary)';

  container.innerHTML = `
    <!-- CRM Card -->
    <div class="source-card card fade-in-up delay-1">
      <div class="source-card-header">
        <div>
          <div class="source-name">CRM · Zoho</div>
          <div class="source-status">${c.crm.dealStage}</div>
        </div>
        <div class="source-icon" style="background:rgba(59,130,246,0.15);">🏢</div>
      </div>
      <div class="source-stats">
        <div>
          <div class="source-stat-value" style="color:var(--blue);">${formatCurrency(c.crm.arr)}</div>
          <div class="source-stat-label">ARR</div>
        </div>
        <div>
          <div class="source-stat-value" style="color:var(--blue);">${formatCurrency(c.crm.lifetimeValue)}</div>
          <div class="source-stat-label">LTV</div>
        </div>
      </div>
      <div class="source-items">
        <div class="source-item"><span class="source-item-icon">📋</span>Plan: ${c.crm.plan}</div>
        <div class="source-item"><span class="source-item-icon">⭐</span>Expansion: ${c.crm.expansionPotential}</div>
        <div class="source-item"><span class="source-item-icon">🗓️</span>Renewal: ${formatDate(c.crm.renewalDate)}</div>
        <div class="source-item"><span class="source-item-icon">👥</span>${c.crm.contacts.length} key contact${c.crm.contacts.length > 1 ? 's' : ''}</div>
      </div>
    </div>

    <!-- Support Card -->
    <div class="source-card card fade-in-up delay-2">
      <div class="source-card-header">
        <div>
          <div class="source-name">Support · Zendesk</div>
          <div class="source-status">${c.support.openTickets} open / ${c.support.closedLast30} closed (30d)</div>
        </div>
        <div class="source-icon" style="background:rgba(244,63,94,0.12);">🎫</div>
      </div>
      <div class="source-stats">
        <div>
          <div class="source-stat-value" style="color:${c.support.openTickets > 3 ? 'var(--rose)' : c.support.openTickets > 1 ? 'var(--amber)' : 'var(--emerald)'};">
            ${c.support.openTickets}
          </div>
          <div class="source-stat-label">Open Tickets</div>
        </div>
        <div>
          <div class="source-stat-value" style="color:${c.support.csat >= 4 ? 'var(--emerald)' : c.support.csat >= 3 ? 'var(--amber)' : 'var(--rose)'};">
            ${c.support.csat}/5
          </div>
          <div class="source-stat-label">CSAT Score</div>
        </div>
      </div>
      <div class="source-items">
        <div class="source-item"><span class="source-item-icon">⏱️</span>Avg resolution: ${c.support.avgResolutionHours}h</div>
        <div class="source-item"><span class="source-item-icon">🚨</span>Escalations: ${c.support.escalations}</div>
        <div class="source-item"><span class="source-item-icon">📁</span>Top: ${c.support.topCategories.slice(0,2).join(', ')}</div>
      </div>
    </div>

    <!-- Email Card -->
    <div class="source-card card fade-in-up delay-3">
      <div class="source-card-header">
        <div>
          <div class="source-name">Email · Gmail/Outlook</div>
          <div class="source-status">Last: ${formatDate(c.emails.lastEmailDate)}</div>
        </div>
        <div class="source-icon" style="background:rgba(245,158,11,0.12);">✉️</div>
      </div>
      <div class="source-stats">
        <div>
          <div class="source-stat-value">${c.emails.emailsLast30}</div>
          <div class="source-stat-label">Emails (30d)</div>
        </div>
        <div>
          <div class="source-stat-value" style="color:${sentimentColor};">${getSentimentIcon(c.emails.sentiment)}</div>
          <div class="source-stat-label" style="text-transform:capitalize;">${c.emails.sentiment}</div>
        </div>
      </div>
      <div class="source-items">
        ${c.emails.keyTopics.slice(0,3).map(t => `<div class="source-item"><span class="source-item-icon">🏷️</span>${t}</div>`).join('')}
      </div>
    </div>

    <!-- Slack Card -->
    <div class="source-card card fade-in-up delay-4">
      <div class="source-card-header">
        <div>
          <div class="source-name">Slack · Internal Notes</div>
          <div class="source-status">${c.slack.channels.join(', ')}</div>
        </div>
        <div class="source-icon" style="background:rgba(139,92,246,0.12);">💬</div>
      </div>
      <div class="source-stats">
        <div>
          <div class="source-stat-value">${c.slack.mentions}</div>
          <div class="source-stat-label">Mentions</div>
        </div>
        <div>
          <div class="source-stat-value" style="color:${c.slack.escalationFlag ? 'var(--rose)' : 'var(--emerald)'};">
            ${c.slack.escalationFlag ? '🔴' : '🟢'}
          </div>
          <div class="source-stat-label">${c.slack.escalationFlag ? 'Escalated' : 'Normal'}</div>
        </div>
      </div>
      <div class="source-items">
        ${c.slack.internalNotes.slice(0,2).map(n => 
          `<div class="source-item"><span class="source-item-icon">📝</span><span style="font-size:11px;">${n.author}: ${n.message.slice(0,60)}…</span></div>`
        ).join('')}
      </div>
    </div>

    <!-- Usage Card -->
    <div class="source-card card fade-in-up delay-5" style="grid-column: span 2;">
      <div class="source-card-header">
        <div>
          <div class="source-name">Product Usage · Analytics</div>
          <div class="source-status">Last active: ${formatDate(c.usage.lastLogin)}</div>
        </div>
        <div class="source-icon" style="background:rgba(16,185,129,0.12);">📊</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:16px;">
        <div>
          <div class="source-stat-value">${c.usage.dau}</div>
          <div class="source-stat-label">DAU</div>
        </div>
        <div>
          <div class="source-stat-value">${c.usage.mau}</div>
          <div class="source-stat-label">MAU</div>
        </div>
        <div>
          <div class="source-stat-value" style="color:${c.usage.dauMauRatio >= 0.4 ? 'var(--emerald)' : c.usage.dauMauRatio >= 0.25 ? 'var(--amber)' : 'var(--rose)'};">
            ${Math.round(c.usage.dauMauRatio * 100)}%
          </div>
          <div class="source-stat-label">DAU/MAU</div>
        </div>
        <div>
          <div class="source-stat-value" style="color:${trendColor};">${trendIcon}</div>
          <div class="source-stat-label" style="text-transform:capitalize;">${c.usage.loginTrend}</div>
        </div>
      </div>
      
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
        <div>
          <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:8px;">30-DAY LOGIN TREND</div>
          <div class="sparkline">
            ${(()=>{
              const max = Math.max(...c.usage.logins30d);
              return c.usage.logins30d.map((v,i) => {
                const h = Math.max(8, (v/max)*36);
                const isLast = i === c.usage.logins30d.length - 1;
                const barColor = c.usage.loginTrend.includes('grow') ? '#10B981' : c.usage.loginTrend.includes('declin') ? '#F43F5E' : '#3B82F6';
                return `<div class="spark-bar" style="height:${h}px;background:${isLast ? barColor : barColor+'66'};border-radius:3px 3px 0 0;" title="Day ${i+1}: ${v} logins"></div>`;
              }).join('');
            })()}
          </div>
        </div>
        <div>
          <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:8px;">PLAN UTILIZATION</div>
          <div style="margin-bottom:6px;">
            <div class="progress-bar">
              <div class="progress-fill" style="width:${Math.round(c.usage.planUtilization*100)}%;background:${c.usage.planUtilization >= 0.9 ? 'var(--rose)' : c.usage.planUtilization >= 0.7 ? 'var(--amber)' : 'var(--emerald)'};"></div>
            </div>
          </div>
          <div style="font-size:12px;color:var(--text-secondary);">${Math.round(c.usage.planUtilization*100)}% utilized</div>
          <div style="margin-top:8px;font-size:12px;color:var(--text-muted);">
            API: ${(c.usage.apiCallsMonth/1e6).toFixed(1)}M calls · Error rate: ${(c.usage.apiErrorRate*100).toFixed(1)}%
          </div>
        </div>
      </div>
    </div>`;
}

// ── Feature Adoption & Tickets ─────────────────────────────
function renderUsageCard(c) {
  const allFeatures = [...c.usage.featuresAdopted, ...c.usage.featuresNotAdopted];

  document.getElementById('usage-detail').innerHTML = `
    <div class="card" style="padding:20px;">
      <div class="section-header">
        <div class="section-title">🔬 Feature Adoption</div>
        <span class="badge ${c.usage.adoptionRate >= 0.7 ? 'badge-emerald' : c.usage.adoptionRate >= 0.4 ? 'badge-amber' : 'badge-rose'}">
          ${Math.round(c.usage.adoptionRate * 100)}%
        </span>
      </div>
      <div class="feature-list">
        ${allFeatures.map(f => {
          const adopted = c.usage.featuresAdopted.includes(f);
          return `<div class="feature-item">
            <span class="${adopted ? 'feature-adopted' : 'feature-missing'}">${adopted ? '✓' : '○'}</span>
            <span class="feature-name" style="${!adopted ? 'color:var(--text-muted)' : ''}">${f}</span>
            ${!adopted ? '<span class="badge badge-gray" style="font-size:10px;">Not adopted</span>' : ''}
          </div>`;
        }).join('')}
      </div>
    </div>

    <div class="card" style="padding:20px;margin-top:16px;">
      <div class="section-header">
        <div class="section-title">🎫 Open Support Tickets</div>
        <span class="badge ${c.support.openTickets > 3 ? 'badge-rose' : 'badge-amber'}">${c.support.openTickets} open</span>
      </div>
      <div class="ticket-list">
        ${c.support.tickets.filter(t => t.status === 'open').map(t => `
          <div class="ticket-card">
            <div class="ticket-header">
              <span class="ticket-id">${t.id}</span>
              <span class="badge ${t.priority === 'high' ? 'badge-rose' : t.priority === 'medium' ? 'badge-amber' : 'badge-gray'}">${t.priority}</span>
              <span class="badge badge-blue">${t.category}</span>
            </div>
            <div class="ticket-issue">${t.issue}</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Opened ${formatDate(t.created)}</div>
          </div>
        `).join('') || '<div style="color:var(--text-muted);font-size:13px;">No open tickets 🎉</div>'}
      </div>
    </div>`;
}

// ── Contacts Card ─────────────────────────────────────────
function renderContactsCard(c) {
  const colors = ['#3B82F6','#10B981','#8B5CF6','#F59E0B','#EF4444'];
  document.getElementById('contacts-card').innerHTML = `
    <div class="card" style="padding:20px;">
      <div class="section-header" style="margin-bottom:14px;">
        <div class="section-title">👥 Key Contacts</div>
      </div>
      <div class="contacts-list">
        ${c.crm.contacts.map((ct, i) => `
          <div class="contact-item">
            <div class="contact-avatar" style="background:${colors[i % colors.length]};">
              ${ct.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <div class="contact-name">${ct.name}</div>
              <div class="contact-role">${ct.role}</div>
            </div>
            <div class="contact-last">Last: ${formatDate(ct.lastContact)}</div>
          </div>
        `).join('')}
      </div>
    </div>`;
}

// ── Activity Timeline ─────────────────────────────────────
function renderTimeline(c) {
  const events = buildTimeline(c);
  const container = document.getElementById('activity-timeline');

  container.innerHTML = `
    <div class="timeline-section card" style="padding:20px;">
      <div class="section-header">
        <div class="section-title">🕐 Activity Timeline</div>
        <span class="badge badge-gray">${events.length} events</span>
      </div>
      <div class="timeline">
        ${events.map(e => {
          const sourceClass = e.type === 'ticket' ? 'source-ticket' : e.type === 'email' ? 'source-email' : 'source-slack';
          return `
          <div class="timeline-item">
            <div class="timeline-dot">${e.icon}</div>
            <div>
              <div class="timeline-date">
                <span class="timeline-source ${sourceClass}">${e.source}</span>
                ${formatDate(e.date)}
              </div>
              <div class="timeline-title">${e.title}</div>
              <div class="timeline-meta">${e.meta}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

// ── AI Placeholder ────────────────────────────────────────
function renderAIPlaceholder() {
  const panel = document.getElementById('ai-results');
  panel.innerHTML = `
    <div class="ai-placeholder">
      <span class="ai-placeholder-icon">🤖</span>
      Enter your Gemini API key above and click <strong>Generate AI Analysis</strong> to get an AI-powered executive summary, risk signals, opportunities, and recommended next actions for this account.
    </div>`;
}

// ── Trigger AI Analysis ───────────────────────────────────
async function triggerAIAnalysis() {
  const keyInput = document.getElementById('ai-key-input');
  const apiKey = (keyInput?.value || '').trim();

  if (!apiKey) {
    showToast('Please enter your Gemini API key', 'error');
    keyInput?.focus();
    return;
  }

  localStorage.setItem('customeriq_api_key', apiKey);

  const btn = document.getElementById('ai-generate-btn');
  const panel = document.getElementById('ai-results');

  btn.disabled = true;
  btn.innerHTML = `<div class="spinner" style="width:16px;height:16px;border-top-color:white;"></div> Analysing…`;

  panel.innerHTML = `
    <div style="display:flex;flex-direction:column;gap:12px;padding:8px 0;">
      <div class="skeleton" style="height:80px;"></div>
      <div class="skeleton" style="height:60px;"></div>
      <div class="skeleton" style="height:100px;"></div>
      <div class="skeleton" style="height:80px;"></div>
    </div>`;

  try {
    const analysis = await generateAIAnalysis(currentCustomer, apiKey);
    aiAnalysisCache = analysis;
    renderAIResults(analysis);
    showToast('AI analysis complete!', 'success');
  } catch (err) {
    panel.innerHTML = `<div class="ai-error">❌ ${err.message}<br><br><small>Make sure your API key is valid and has access to Gemini API.</small></div>`;
    showToast('AI analysis failed', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = `✨ Regenerate Analysis`;
  }
}

// ── Render AI Results ─────────────────────────────────────
function renderAIResults(analysis) {
  const panel = document.getElementById('ai-results');

  const sentimentColors = {
    'Positive': { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', color: '#34D399', icon: '😊' },
    'Neutral': { bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', color: '#FCD34D', icon: '😐' },
    'At Risk': { bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.2)', color: '#FB7185', icon: '⚠️' },
    'Critical': { bg: 'rgba(244,63,94,0.15)', border: 'rgba(244,63,94,0.4)', color: '#F43F5E', icon: '🚨' }
  };
  const sc = sentimentColors[analysis.accountSentiment] || sentimentColors['Neutral'];

  panel.innerHTML = `
    <!-- Sentiment Banner -->
    <div class="sentiment-banner" style="background:${sc.bg};border:1px solid ${sc.border};color:${sc.color};">
      <span style="font-size:18px;">${sc.icon}</span>
      <div>
        <div style="font-weight:700;font-size:13px;">${analysis.accountSentiment}</div>
        <div style="font-size:11px;opacity:0.8;">AI Confidence: ${analysis.confidenceScore}%</div>
      </div>
    </div>

    <!-- Executive Summary -->
    <div class="ai-section fade-in-up delay-1">
      <div class="ai-section-title" style="color:#60A5FA;">📋 Executive Summary</div>
      <div class="ai-summary-text">${analysis.executiveSummary}</div>
    </div>

    <!-- Risk Signals -->
    <div class="ai-section fade-in-up delay-2">
      <div class="ai-section-title" style="color:#FB7185;">⚠️ Risk Signals</div>
      ${analysis.riskSignals.map(r => `
        <div class="risk-item" style="background:${getSeverityBg(r.severity)};">
          <div>
            <div class="risk-severity" style="background:${getSeverityBg(r.severity)};color:${getSeverityColor(r.severity)};">${r.severity}</div>
          </div>
          <div style="flex:1;">
            <div class="risk-text">${r.signal}</div>
            <div class="risk-source">📍 ${r.source}</div>
          </div>
        </div>`).join('')}
    </div>

    <!-- Opportunities -->
    <div class="ai-section fade-in-up delay-3">
      <div class="ai-section-title" style="color:#34D399;">🚀 Opportunities</div>
      ${analysis.opportunities.map(o => `
        <div class="opportunity-item">
          <div>${getOpportunityIcon(o.type)}</div>
          <div style="flex:1;">
            <div class="opportunity-text">${o.opportunity}</div>
            ${o.estimatedValue ? `<div class="opportunity-value">💰 ${o.estimatedValue}</div>` : ''}
          </div>
          <div class="opportunity-type-badge">${o.type}</div>
        </div>`).join('')}
    </div>

    <!-- Next Best Actions -->
    <div class="ai-section fade-in-up delay-4">
      <div class="ai-section-title" style="color:#FCD34D;">✅ Next Best Actions</div>
      ${analysis.nextBestActions.map(a => `
        <div class="nba-item">
          <div class="nba-priority-icon">${getPriorityIcon(a.priority)}</div>
          <div class="nba-content">
            <div class="nba-action">${a.action}</div>
            <div class="nba-meta">
              <span class="nba-owner">👤 ${a.owner}</span>
              <span class="nba-timeline" style="background:${getTimelineColor(a.timeline)}22;color:${getTimelineColor(a.timeline)};">${a.timeline}</span>
            </div>
            <div class="nba-rationale">${a.rationale}</div>
          </div>
        </div>`).join('')}
    </div>

    <button onclick="copyAnalysis()" class="btn btn-secondary btn-sm" style="width:100%;margin-top:4px;justify-content:center;">
      📋 Copy Analysis
    </button>`;
}

// ── Copy Analysis ─────────────────────────────────────────
function copyAnalysis() {
  if (!aiAnalysisCache) return;
  const text = JSON.stringify(aiAnalysisCache, null, 2);
  navigator.clipboard.writeText(text).then(() => showToast('Analysis copied to clipboard!', 'success'));
}

// ── Toast Notifications ───────────────────────────────────
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const icons = { success: '✅', error: '❌', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideOutRight 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ── Animate count-up numbers ──────────────────────────────
function animateNumbers() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const format = el.dataset.format;
    let start = 0;
    const duration = 1200;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = prefix + (format === 'currency' ? current.toLocaleString('en-US') : current) + (el.textContent.includes('/') ? '/10' : '');
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = prefix + (format === 'currency' ? target.toLocaleString('en-US') : target);
    };
    requestAnimationFrame(step);
  });
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', initDashboard);
