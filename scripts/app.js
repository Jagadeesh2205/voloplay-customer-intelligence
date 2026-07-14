// ============================================================
// CustomerIQ — Landing Page Logic
// ============================================================

let apiKeyGlobal = '';

function init() {
  renderAccountGrid(CUSTOMERS);
  setupSearch();
  loadApiKey();
}

function loadApiKey() {
  const saved = localStorage.getItem('customeriq_api_key');
  if (saved) {
    apiKeyGlobal = saved;
    const inp = document.getElementById('landing-api-key');
    if (inp) inp.value = saved;
  }
}

function saveApiKey(key) {
  apiKeyGlobal = key;
  localStorage.setItem('customeriq_api_key', key);
}

function setupSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const filtered = q
      ? CUSTOMERS.filter(c =>
          c.company.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.crm.plan.toLowerCase().includes(q) ||
          c.crm.tags.some(t => t.includes(q))
        )
      : CUSTOMERS;
    renderAccountGrid(filtered);
  });

  // API key input on landing
  const keyInput = document.getElementById('landing-api-key');
  if (keyInput) {
    keyInput.addEventListener('input', (e) => saveApiKey(e.target.value.trim()));
  }
}

function renderAccountGrid(customers) {
  const grid = document.getElementById('accounts-grid');
  if (!grid) return;

  if (customers.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:48px 0;color:var(--text-muted);">
      <div style="font-size:36px;margin-bottom:12px;">🔍</div>
      <div>No accounts match your search</div>
    </div>`;
    return;
  }

  grid.innerHTML = customers.map((c, i) => {
    const health = getHealthLabel(c.crm.healthScore);
    const days = daysUntil(c.crm.renewalDate);
    const renewalColor = days < 30 ? 'var(--rose)' : days < 90 ? 'var(--amber)' : 'var(--emerald)';
    const strokeDash = 2 * Math.PI * 30; // r=30
    const offset = strokeDash - (c.crm.healthScore / 100) * strokeDash;
    const ringColor = c.crm.healthScore >= 80 ? '#10B981' : c.crm.healthScore >= 60 ? '#F59E0B' : '#F43F5E';

    return `
    <div class="account-card card fade-in-up delay-${(i % 5) + 1}"
         onclick="openAccount('${c.id}')"
         style="padding:24px;cursor:pointer;">
      
      <div class="flex items-center justify-between" style="margin-bottom:16px;">
        <div class="flex items-center gap-3">
          <div class="account-logo" style="width:48px;height:48px;font-size:16px;background:linear-gradient(135deg,${c.logoColor},${c.logoColor}99);">
            ${c.logo}
          </div>
          <div>
            <div style="font-size:15px;font-weight:700;margin-bottom:2px;">${c.company}</div>
            <div style="font-size:12px;color:var(--text-muted);">${c.industry}</div>
          </div>
        </div>
        
        <div class="health-ring-wrap" style="width:56px;height:56px;">
          <svg width="56" height="56" viewBox="0 0 76 76">
            <circle class="health-ring-bg" cx="38" cy="38" r="30" stroke-width="5"/>
            <circle class="health-ring-fill"
              cx="38" cy="38" r="30"
              stroke="${ringColor}"
              stroke-width="5"
              stroke-dasharray="${strokeDash}"
              stroke-dashoffset="${offset}"
              style="filter:drop-shadow(0 0 4px ${ringColor}66)"/>
          </svg>
          <div class="health-ring-text">
            <span class="health-ring-score" style="font-size:14px;">${c.crm.healthScore}</span>
            <span class="health-ring-label">health</span>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
        <div>
          <div style="font-size:16px;font-weight:700;">${formatCurrency(c.crm.arr)}</div>
          <div style="font-size:11px;color:var(--text-muted);">ARR</div>
        </div>
        <div>
          <div style="font-size:16px;font-weight:700;">${c.crm.plan}</div>
          <div style="font-size:11px;color:var(--text-muted);">Plan</div>
        </div>
      </div>

      <div class="flex items-center justify-between" style="margin-bottom:14px;">
        <span class="badge ${health.class === 'health-good' ? 'badge-emerald' : health.class === 'health-medium' ? 'badge-amber' : 'badge-rose'}">
          ${health.label}
        </span>
        ${c.slack.escalationFlag ? '<span class="badge badge-rose">⚠️ Escalation</span>' : ''}
      </div>

      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${c.crm.tags.slice(0,3).map(t => `<span class="badge badge-gray">${t}</span>`).join('')}
      </div>

      <hr class="divider" style="margin:14px 0;">

      <div class="flex items-center justify-between">
        <div style="font-size:12px;color:var(--text-secondary);">
          <span style="color:${renewalColor};font-weight:600;">${days}d</span> to renewal
        </div>
        <div style="font-size:12px;color:var(--text-muted);">
          ${c.support.openTickets} open tickets
        </div>
        <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:var(--text-muted);">
          <div class="pulse-dot ${c.crm.healthScore >= 80 ? '' : c.crm.healthScore >= 60 ? 'amber' : 'red'}" style="width:6px;height:6px;"></div>
          ${c.usage.loginTrend}
        </div>
      </div>
    </div>`;
  }).join('');
}

function openAccount(id) {
  // Save API key before navigating
  const keyInput = document.getElementById('landing-api-key');
  if (keyInput && keyInput.value) saveApiKey(keyInput.value.trim());

  window.location.href = `dashboard.html?id=${id}`;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', init);
