function saveState(){try{localStorage.setItem('mg_requests',JSON.stringify(STATE.requests));localStorage.setItem('mg_budgets',JSON.stringify(STATE.budgets));}catch(e){}}
function saveSettings(){try{localStorage.setItem('mg_settings',JSON.stringify(SETTINGS));}catch(e){}}
function loadSettings(){try{const s=localStorage.getItem('mg_settings');if(s)Object.assign(SETTINGS,JSON.parse(s));}catch(e){}}
function loadState(){try{const r=localStorage.getItem('mg_requests');const b=localStorage.getItem('mg_budgets');if(r)STATE.requests=JSON.parse(r);if(b)STATE.budgets=JSON.parse(b);}catch(e){}}

const ROLE_NAV = {
  requester:[
    {id:'dashboard',label:'Dashboard',icon:'▦',section:'Main'},
    {id:'submit',label:'New Request',icon:'+'},
    {id:'myrequests',label:'My Requests',icon:'≡',clarifyDot:true},
    {id:'closeout',label:'My Closeouts',icon:'✓'},
  ],
  budget:[
    {id:'dashboard',label:'Dashboard',icon:'▦',section:'Main'},
    {id:'requests',label:'All Requests',icon:'≡'},
    {id:'budget',label:'Budget Tracker',icon:'$',section:'Reports'},
    {id:'sla',label:'SLA Monitor',icon:'⏱',badge:true},
  ],
  medical:[
    {id:'dashboard',label:'Dashboard',icon:'▦',section:'Main'},
    {id:'requests',label:'All Requests',icon:'≡'},
    {id:'sla',label:'SLA Monitor',icon:'⏱',badge:true,section:'Reports'},
  ],
  legal:[
    {id:'dashboard',label:'Dashboard',icon:'▦',section:'Main'},
    {id:'requests',label:'All Requests',icon:'≡'},
    {id:'transparency',label:'Transparency',icon:'◈',section:'Reports'},
    {id:'sla',label:'SLA Monitor',icon:'⏱',badge:true},
  ],
  admin:[
    {id:'dashboard',label:'Dashboard',icon:'▦',section:'Main'},
    {id:'requests',label:'All Requests',icon:'≡'},
    {id:'submit',label:'New Request',icon:'+'},
    {id:'closeout',label:'Closeout',icon:'✓',section:'Operations'},
    {id:'budget',label:'Budget Tracker',icon:'$'},
    {id:'transparency',label:'Transparency',icon:'◈'},
    {id:'sla',label:'SLA Monitor',icon:'⏱',badge:true},
    {id:'audit',label:'Audit Log',icon:'◎'},
    {id:'settings',label:'Settings',icon:'⚙',section:'Admin'},
  ]
};

const ROLE_BANNERS = {
  requester:{bg:'rgba(46,134,193,0.15)',color:'#a9cce3',icon:'📋',desc:'Submit and track your funding requests'},
  budget:{bg:'rgba(183,119,13,0.15)',color:'#f9d97e',icon:'💰',desc:'Review and approve budget allocations'},
  medical:{bg:'rgba(30,132,73,0.15)',color:'#a9dfbf',icon:'🔬',desc:'Review scientific merit and strategic alignment'},
  legal:{bg:'rgba(142,68,173,0.15)',color:'#d7bde2',icon:'⚖️',desc:'Review compliance and regulatory requirements'},
  admin:{bg:'rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.7)',icon:'👑',desc:'Full access — all modules and settings'},
};

const SETTINGS = {
  brandName:'Acceleration Point',brandTagline:'Empowering Medical Affairs',productName:'MedGrants',
  therapeuticAreas:['Oncology','Cardiology','Neurology','Rare Disease','Immunology','Hematology','Respiratory','Other'],
  regions:['North America','Europe','APAC','LATAM','Middle East & Africa'],
  currencies:['USD','EUR','GBP','JPY','CHF'],
  costCenters:['CC-101','CC-102','CC-103','CC-104','CC-201','CC-202','CC-203','CC-204','CC-301','CC-302'],
  transparencyCategories:['Sponsorship - Congress','Educational Grant','Research Grant - IIT','Charitable Donation','Advisory Board','Speaker Fee','Investigator Meeting'],
  requestTypes:['Sponsorship','Grant','Donation'],
  approverLabels:{budget:'Budget Owner',medical:'Medical Reviewer',legal:'Legal / Compliance'},
  sla:{budget:2,medical:4,legal:4}
};

const NOW_BASE=new Date('2025-04-10T12:00:00');
function nowStr(){return NOW_BASE.toISOString().slice(0,16).replace('T',' ');}
const REQUESTER_IDENTITY='Dr. Sarah Chen';

const DEFAULT_REQUESTS=[
  {id:'SG-2025-001',type:'Sponsorship',title:'ASCO Annual Meeting 2025',requester:'Dr. Sarah Chen',requesterTitle:'MSL',region:'North America',ta:'Oncology',amount:45000,currency:'USD',beneficiary:'American Society of Clinical Oncology',benefType:'HCO',benefCountry:'United States',quarter:'Q2',costCenter:'CC-102',status:'Legal Review',submitted:'2025-04-01',eventDate:'2025-06-02',fmv:true,commercial:false,rationale:'Scientific congress supporting key oncology KOL engagement and data dissemination.',companyBenefit:'Positions the company as a committed partner to the oncology community; provides a platform to engage with key opinion leaders ahead of upcoming data readouts.',sunshine:true,transparencyCategory:'Sponsorship - Congress',closeout:null,sla:{budgetDue:'2025-04-03',medicalDue:'2025-04-07',legalDue:'2025-04-11',budgetDone:'2025-04-02',medicalDone:'2025-04-05',legalDone:null},audit:[{ts:'2025-04-01 09:00',user:'Dr. Sarah Chen',action:'Request submitted.'},{ts:'2025-04-02 11:20',user:'John Marcus (Budget Owner)',action:'Budget approved — $45,000 reserved. Routed to Medical Review.'},{ts:'2025-04-05 14:10',user:'Dr. Patel (Medical Reviewer)',action:'Medical review approved. Routed to Legal / Compliance.'}]},
  {id:'SG-2025-002',type:'Grant',title:'Cardiovascular Outcomes IIT',requester:'Mark Liu',requesterTitle:'Medical Director',region:'Europe',ta:'Cardiology',amount:120000,currency:'EUR',beneficiary:'Dr. Hans Weber',benefType:'HCP',benefCountry:'Germany',quarter:'Q2',costCenter:'CC-204',status:'Medical Review',submitted:'2025-04-03',eventDate:'2025-07-15',fmv:true,commercial:false,rationale:'Investigator-initiated trial examining CV outcomes in high-risk patients.',companyBenefit:'Generates independent real-world evidence; strengthens scientific credibility through peer-led research.',sunshine:false,transparencyCategory:'Research Grant - IIT',closeout:null,sla:{budgetDue:'2025-04-05',medicalDue:'2025-04-09',legalDue:'2025-04-13',budgetDone:'2025-04-04',medicalDone:null,legalDone:null},audit:[{ts:'2025-04-03 10:00',user:'Mark Liu',action:'Request submitted.'},{ts:'2025-04-04 09:45',user:'Lisa Park (Budget Owner)',action:'Budget approved — €120,000 reserved. Routed to Medical Review.'}]},
  {id:'SG-2025-003',type:'Donation',title:'Rare Disease Patient Foundation',requester:'Dr. Sarah Chen',requesterTitle:'MSL',region:'North America',ta:'Rare Disease',amount:15000,currency:'USD',beneficiary:'RD Patient Foundation',benefType:'HCO',benefCountry:'United States',quarter:'Q1',costCenter:'CC-301',status:'Clarification Requested',submitted:'2025-03-10',eventDate:'2025-04-20',fmv:true,commercial:false,rationale:'Charitable contribution to patient advocacy organization aligned with therapeutic focus.',companyBenefit:"Demonstrates corporate social responsibility and deepens the company's relationship with the rare disease patient community.",sunshine:true,transparencyCategory:'Charitable Donation',closeout:null,clarificationNote:'Please provide additional documentation confirming the organization\'s 501(c)(3) status and confirm no board members are HCPs affiliated with our company.',sla:{budgetDue:'2025-03-12',medicalDue:'2025-03-14',legalDue:'2025-03-16',budgetDone:'2025-03-11',medicalDone:'2025-03-12',legalDone:null},audit:[{ts:'2025-03-10 08:30',user:'Dr. Sarah Chen',action:'Request submitted.'},{ts:'2025-03-11 10:00',user:'John Marcus (Budget Owner)',action:'Budget approved.'},{ts:'2025-03-12 15:30',user:'Dr. Patel (Medical Reviewer)',action:'Medical review approved.'},{ts:'2025-03-14 09:15',user:'Claire Osei (Legal/Compliance)',action:'Clarification requested — additional compliance documentation required before this request can be approved.'}]},
  {id:'SG-2025-004',type:'Sponsorship',title:'ESC Congress 2025',requester:'Mark Liu',requesterTitle:'Medical Director',region:'Europe',ta:'Cardiology',amount:60000,currency:'EUR',beneficiary:'European Society of Cardiology',benefType:'HCO',benefCountry:'Belgium',quarter:'Q3',costCenter:'CC-204',status:'Pending Budget Review',submitted:'2025-04-08',eventDate:'2025-08-30',fmv:true,commercial:false,rationale:"Premier European cardiology congress — key platform for data presentations.",companyBenefit:"Provides visibility among European cardiology thought leaders; aligns with EU market expansion strategy.",sunshine:false,transparencyCategory:'Sponsorship - Congress',closeout:null,sla:{budgetDue:'2025-04-10',medicalDue:'2025-04-14',legalDue:'2025-04-18',budgetDone:null,medicalDone:null,legalDone:null},audit:[{ts:'2025-04-08 11:00',user:'Mark Liu',action:'Request submitted — pending budget owner review.'}]},
  {id:'SG-2025-005',type:'Grant',title:'Neurology Education Program',requester:'Dr. Sarah Chen',requesterTitle:'MSL',region:'North America',ta:'Neurology',amount:30000,currency:'USD',beneficiary:'AAN Foundation',benefType:'HCO',benefCountry:'United States',quarter:'Q2',costCenter:'CC-105',status:'Clarification Requested',submitted:'2025-03-25',eventDate:'2025-05-10',fmv:false,commercial:false,rationale:'Educational grant for neurology fellowship program.',companyBenefit:'Supports HCP education in a disease area where unmet need remains high.',sunshine:true,transparencyCategory:'Educational Grant',closeout:null,clarificationNote:'Please confirm whether FMV documentation has been completed for this grant. Additionally, please provide more detail on the scientific rationale — specifically how this fellowship program aligns with our current neurology pipeline priorities.',clarificationFromStage:'Medical Review',messages:[],sla:{budgetDue:'2025-03-27',medicalDue:'2025-03-31',legalDue:null,budgetDone:'2025-03-26',medicalDone:null,legalDone:null},audit:[{ts:'2025-03-25 09:00',user:'Dr. Sarah Chen',action:'Request submitted.'},{ts:'2025-03-26 14:00',user:'John Marcus (Budget Owner)',action:'Budget approved.'},{ts:'2025-03-28 10:30',user:'Dr. Patel (Medical Reviewer)',action:'Clarification requested at Medical Review stage. Note to requester: "Please confirm whether FMV documentation has been completed for this grant. Additionally, please provide more detail on the scientific rationale." In-platform alert sent to requester.'}]},
  {id:'SG-2025-006',type:'Sponsorship',title:'Hematology Society Spring Symposium',requester:'Dr. Sarah Chen',requesterTitle:'MSL',region:'North America',ta:'Oncology',amount:22000,currency:'USD',beneficiary:'American Hematology Society',benefType:'HCO',benefCountry:'United States',quarter:'Q2',costCenter:'CC-102',status:'Closed / Completed',submitted:'2025-02-15',eventDate:'2025-03-28',fmv:true,commercial:false,rationale:'Annual spring symposium for hematology KOLs.',companyBenefit:'Maintained presence among hematology KOLs; foundation for follow-up scientific exchanges with five high-priority accounts.',sunshine:true,transparencyCategory:'Sponsorship - Congress',closeout:{actualSpend:19800,attendance:142,outcomeNotes:'Event held as planned. 142 attendees. Sponsor acknowledgment displayed appropriately. No promotional content observed.',confirmed:true,closedDate:'2025-04-02'},sla:{budgetDue:'2025-02-17',medicalDue:'2025-02-21',legalDue:'2025-02-25',budgetDone:'2025-02-16',medicalDone:'2025-02-20',legalDone:'2025-02-24'},audit:[{ts:'2025-02-15 08:00',user:'Dr. Sarah Chen',action:'Request submitted.'},{ts:'2025-02-16 10:00',user:'John Marcus (Budget Owner)',action:'Budget approved.'},{ts:'2025-02-20 09:00',user:'Dr. Patel (Medical Reviewer)',action:'Medical review approved.'},{ts:'2025-02-24 14:00',user:'Claire Osei (Legal/Compliance)',action:'Legal review approved.'},{ts:'2025-04-02 11:00',user:'Dr. Sarah Chen',action:'Post-event closeout submitted. Actual: $19,800 vs committed $22,000. Variance: -$2,200.'}]},
];
const DEFAULT_BUDGETS=[
  {region:'North America',ta:'Oncology',quarter:'Q2',total:200000,committed:67000,actual:19800},
  {region:'North America',ta:'Neurology',quarter:'Q2',total:80000,committed:0,actual:0},
  {region:'North America',ta:'Rare Disease',quarter:'Q1',total:50000,committed:15000,actual:0},
  {region:'Europe',ta:'Cardiology',quarter:'Q2',total:300000,committed:120000,actual:0},
  {region:'Europe',ta:'Cardiology',quarter:'Q3',total:300000,committed:60000,actual:0},
];

const STATE={role:'requester',view:'dashboard',requests:JSON.parse(JSON.stringify(DEFAULT_REQUESTS)),budgets:JSON.parse(JSON.stringify(DEFAULT_BUDGETS)),nextId:7,settingsTab:'branding'};
const ROLE_MAP={requester:{label:'Requester (MSL)',canApprove:false,approvalStep:null},budget:{label:'Budget Owner',canApprove:true,approvalStep:'Pending Budget Review'},medical:{label:'Medical Reviewer',canApprove:true,approvalStep:'Medical Review'},legal:{label:'Legal / Compliance',canApprove:true,approvalStep:'Legal Review'},admin:{label:'Admin / Leadership',canApprove:false,approvalStep:null}};
const STATUS_FLOW=['Pending Budget Review','Medical Review','Legal Review','Approved'];
const STATUS_BADGE={'Pending Budget Review':'badge-pending','Medical Review':'badge-medical','Legal Review':'badge-legal','Approved':'badge-approved','Rejected':'badge-rejected','Closed / Completed':'badge-closed','Clarification Requested':'badge-clarify'};

function getSLAStatus(r){const today='2025-04-10';const due={'Pending Budget Review':r.sla.budgetDue,'Medical Review':r.sla.medicalDue,'Legal Review':r.sla.legalDue}[r.status];if(!due)return{status:'ok',label:'N/A'};const days=Math.ceil((new Date(due)-new Date(today))/86400000);if(days<0)return{status:'over',label:`${Math.abs(days)}d overdue`};if(days<=1)return{status:'warn',label:'Due today'};return{status:'ok',label:`${days}d remaining`};}
function getOverdueCount(){return STATE.requests.filter(r=>['Pending Budget Review','Medical Review','Legal Review'].includes(r.status)&&getSLAStatus(r).status==='over').length;}
function myRequests(){return STATE.requests.filter(r=>r.requester===REQUESTER_IDENTITY);}
function myClarifications(){return myRequests().filter(r=>r.status==='Clarification Requested');}
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3000);}

function buildNav(){
  const items=ROLE_NAV[STATE.role]||ROLE_NAV.admin;
  const overdue=getOverdueCount();
  const clarifyCount=myClarifications().length;
  let html='';let lastSection='';
  items.forEach(item=>{
    if(item.section&&item.section!==lastSection){html+=`<div class="nav-section">${item.section}</div>`;lastSection=item.section;}
    const active=STATE.view===item.id?'active':'';
    const badge=item.badge&&overdue>0?`<span class="nav-badge" style="display:inline">${overdue}</span>`:'';
    const dot=item.clarifyDot&&clarifyCount>0?`<span class="nav-alert-dot" title="${clarifyCount} clarification${clarifyCount>1?'s':''} needed"></span>`:'';
    html+=`<div class="nav-item ${active}" onclick="showView('${item.id}')" id="nav-${item.id}"><span class="nav-icon">${item.icon}</span>${item.label}${badge}${dot}</div>`;
  });
  const b=ROLE_BANNERS[STATE.role];
  html+=`<div class="role-banner" style="background:${b.bg};margin-top:12px"><div style="font-size:11px;color:${b.color};line-height:1.5">${b.icon} ${b.desc}</div></div>`;
  document.getElementById('sidebarNav').innerHTML=html;
}

function setRole(r){
  STATE.role=r;
  document.getElementById('topbarRole').textContent=ROLE_MAP[r]?.label||r;
  document.getElementById('topbarNewBtn').style.display=(r==='requester'||r==='admin')?'':'none';
  STATE.view='dashboard';
  buildNav();renderView();
}

function showView(v){
  STATE.view=v;buildNav();
  const titles={dashboard:'Dashboard',requests:'All Requests',submit:'New Request',myrequests:'My Requests',closeout:'Post-Event Closeout',budget:'Budget Tracker',transparency:'Transparency Reporting',sla:'SLA Monitor',audit:'Audit Log',settings:'Admin Settings'};
  document.getElementById('topbarTitle').textContent=titles[v]||v;
  renderView();
}

function renderView(){
  const views={dashboard:renderDashboard,requests:renderRequests,submit:renderSubmit,myrequests:renderMyRequests,closeout:renderCloseout,budget:renderBudget,transparency:renderTransparency,sla:renderSLA,audit:renderAuditLog,settings:renderSettings};
  (views[STATE.view]||renderDashboard)();
}

// ── CLARIFICATION ALERT COMPONENT ──
function renderClarificationAlerts(){
  const items=myClarifications();
  if(!items.length)return'';
  return`<div style="margin-bottom:20px">
    ${items.map(r=>`
      <div class="clarify-alert">
        <div class="clarify-alert-icon">⚠️</div>
        <div class="clarify-alert-body">
          <div class="clarify-alert-title">Clarification Requested — Action Required</div>
          <div style="margin-top:8px">
            <div class="clarify-item">
              <div class="clarify-item-title">${r.title}</div>
              <div class="clarify-item-meta">${r.id} · ${r.type} · ${r.currency} ${r.amount.toLocaleString()} · Submitted ${r.submitted}</div>
              ${r.clarificationNote?`<div class="clarify-item-note"><strong>Reviewer note:</strong> ${r.clarificationNote}</div>`:''}
              <div class="clarify-alert-actions">
                <button class="btn sm primary" onclick="openDetail('${r.id}')">View Request</button>
                <button class="btn sm" onclick="dismissClarify('${r.id}')">Mark as Addressed</button>
              </div>
            </div>
          </div>
          <div class="clarify-alert-desc" style="margin-top:4px">Review the reviewer's note above, update your request documentation, and resubmit. In-app notification only — email notification available in Phase 2.</div>
        </div>
      </div>
    `).join('')}
  </div>`;
}

function dismissClarify(id){
  const r=STATE.requests.find(x=>x.id===id);if(!r)return;
  const returnStage=r.clarificationFromStage||'Pending Budget Review';
  const stageLabel={
    'Pending Budget Review': SETTINGS.approverLabels.budget||'Budget Owner',
    'Medical Review': SETTINGS.approverLabels.medical||'Medical Reviewer',
    'Legal Review': SETTINGS.approverLabels.legal||'Legal / Compliance'
  }[returnStage]||returnStage;
  r.status=returnStage;
  r.audit.push({ts:nowStr(),user:REQUESTER_IDENTITY,action:`Clarification marked as addressed. Request routed back to ${stageLabel} (bypassing previously completed review steps).`});
  saveState();closeDetail();buildNav();renderView();showToast(`Request routed back to ${stageLabel}.`);
}

// ── DASHBOARDS ──
function renderDashboard(){
  if(STATE.role==='requester')return renderDashboardRequester();
  if(STATE.role==='budget')return renderDashboardBudget();
  if(STATE.role==='medical')return renderDashboardMedical();
  if(STATE.role==='legal')return renderDashboardLegal();
  renderDashboardAdmin();
}

function renderDashboardRequester(){
  const mine=myRequests();
  const pending=mine.filter(r=>['Pending Budget Review','Medical Review','Legal Review'].includes(r.status)).length;
  const approved=mine.filter(r=>r.status==='Approved'||r.status==='Closed / Completed').length;
  const needsCloseout=mine.filter(r=>r.status==='Approved'&&!r.closeout);
  const clarify=myClarifications();
  document.getElementById('mainContent').innerHTML=`
    <div class="welcome-card"><div class="wc-left"><h2>Welcome, Requester</h2><p>Submit and track your sponsorship and grant requests.</p></div><div class="wc-right">📋</div></div>
    ${renderClarificationAlerts()}
    <div class="stats-grid-3">
      <div class="stat-card accent-left"><div class="stat-label">My Requests</div><div class="stat-value">${mine.length}</div><div class="stat-sub">All time</div></div>
      <div class="stat-card amber-left"><div class="stat-label">In Review</div><div class="stat-value" style="color:var(--ap-amber)">${pending}</div><div class="stat-sub">Awaiting approval</div></div>
      <div class="stat-card ${clarify.length>0?'red-left':'green-left'}"><div class="stat-label">${clarify.length>0?'Needs Attention':'Approved / Closed'}</div><div class="stat-value" style="color:${clarify.length>0?'var(--ap-red)':'var(--ap-green)'}">${clarify.length>0?clarify.length:approved}</div><div class="stat-sub">${clarify.length>0?'Clarification requested':'Completed'}</div></div>
    </div>
    ${needsCloseout.length>0?`<div class="card" style="border-left:4px solid var(--ap-amber)"><div class="card-header"><span class="card-title">Closeout Required</span><span class="badge badge-overdue">${needsCloseout.length} item${needsCloseout.length>1?'s':''}</span></div><table><thead><tr><th>ID</th><th>Title</th><th>Committed</th><th>Event Date</th><th>Action</th></tr></thead><tbody>${needsCloseout.map(r=>`<tr><td style="font-family:monospace;font-size:12px">${r.id}</td><td>${r.title}</td><td>${r.currency} ${r.amount.toLocaleString()}</td><td>${r.eventDate}</td><td><button class="btn sm warning" onclick="openCloseoutForm('${r.id}')">Closeout</button></td></tr>`).join('')}</tbody></table></div>`:''}
    <div class="card"><div class="card-header"><span class="card-title">My Recent Requests</span><button class="btn sm ghost" onclick="showView('myrequests')">View all →</button></div>
    ${mine.length===0?`<div class="empty-state">No requests yet.<br><br><button class="btn primary" onclick="showView('submit')">Submit Your First Request</button></div>`:`
    <table><thead><tr><th>ID</th><th>Title</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead><tbody>${mine.slice().reverse().slice(0,5).map(r=>`<tr onclick="openDetail('${r.id}')" style="cursor:pointer"><td style="font-family:monospace;font-size:12px">${r.id}</td><td>${r.title}</td><td><span class="badge badge-type">${r.type}</span></td><td>${r.currency} ${r.amount.toLocaleString()}</td><td><span class="badge ${STATUS_BADGE[r.status]||'badge-type'}">${r.status}</span></td></tr>`).join('')}</tbody></table>`}
    </div>
    <div style="text-align:center;padding:8px"><button class="btn primary" onclick="showView('submit')">+ Submit New Request</button></div>`;
}

function renderDashboardBudget(){
  const pending=STATE.requests.filter(r=>r.status==='Pending Budget Review');
  const overdue=pending.filter(r=>getSLAStatus(r).status==='over').length;
  const totalCommitted=STATE.budgets.reduce((a,b)=>a+b.committed,0);
  const totalBudget=STATE.budgets.reduce((a,b)=>a+b.total,0);
  document.getElementById('mainContent').innerHTML=`
    <div class="welcome-card"><div class="wc-left"><h2>Budget Owner View</h2><p>Review requests pending budget approval and monitor spend.</p></div><div class="wc-right">💰</div></div>
    <div class="stats-grid">
      <div class="stat-card accent-left"><div class="stat-label">Pending Your Review</div><div class="stat-value" style="color:var(--ap-amber)">${pending.length}</div><div class="stat-sub">${overdue>0?`<span style="color:var(--ap-red);font-weight:600">${overdue} overdue</span>`:'All within SLA'}</div></div>
      <div class="stat-card"><div class="stat-label">Total Committed</div><div class="stat-value" style="color:var(--ap-accent)">$${totalCommitted.toLocaleString()}</div></div>
      <div class="stat-card"><div class="stat-label">Total Budget</div><div class="stat-value">$${totalBudget.toLocaleString()}</div></div>
      <div class="stat-card"><div class="stat-label">Budget Utilized</div><div class="stat-value">${Math.round(totalCommitted/totalBudget*100)}%</div></div>
    </div>
    ${pending.length>0?`<div class="card"><div class="card-header"><span class="card-title">Pending Your Approval</span><span class="badge badge-pending">${pending.length} item${pending.length>1?'s':''}</span></div><table><thead><tr><th>ID</th><th>Title</th><th>Requester</th><th>Amount</th><th>SLA</th><th>Action</th></tr></thead><tbody>${pending.map(r=>{const sla=getSLAStatus(r);return`<tr><td style="font-family:monospace;font-size:12px">${r.id}</td><td><strong style="font-weight:600">${r.title}</strong><br><span style="font-size:11px;color:var(--ap-muted)">${r.ta} · ${r.region}</span></td><td style="font-size:12px">${r.requester}</td><td style="font-weight:600">${r.currency} ${r.amount.toLocaleString()}</td><td><div class="sla-indicator"><div class="sla-dot sla-${sla.status}"></div>${sla.label}</div></td><td><button class="btn sm primary" onclick="openDetail('${r.id}')">Review</button></td></tr>`;}).join('')}</tbody></table></div>`:`<div class="card"><div class="empty-state">No requests pending your review.</div></div>`}
    <div class="card"><div class="card-header"><span class="card-title">Budget Utilization</span><button class="btn sm ghost" onclick="showView('budget')">Full tracker →</button></div>${STATE.budgets.map(b=>{const pct=Math.round(b.committed/b.total*100);return`<div class="budget-bar-row"><div class="budget-bar-label"><span>${b.region} — ${b.ta} (${b.quarter})</span><span style="color:var(--ap-muted)">${b.committed.toLocaleString()} / ${b.total.toLocaleString()} (${pct}%)</span></div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${pct>85?'var(--ap-red)':pct>60?'var(--ap-amber)':'var(--ap-accent)'}"></div></div></div>`;}).join('')}</div>`;
}

function renderDashboardMedical(){
  const pending=STATE.requests.filter(r=>r.status==='Medical Review');
  const overdue=pending.filter(r=>getSLAStatus(r).status==='over').length;
  document.getElementById('mainContent').innerHTML=`
    <div class="welcome-card"><div class="wc-left"><h2>Medical Reviewer View</h2><p>Evaluate requests awaiting your scientific and strategic review.</p></div><div class="wc-right">🔬</div></div>
    <div class="stats-grid-3">
      <div class="stat-card accent-left"><div class="stat-label">Pending Your Review</div><div class="stat-value" style="color:var(--ap-amber)">${pending.length}</div><div class="stat-sub">${overdue>0?`<span style="color:var(--ap-red);font-weight:600">${overdue} overdue SLA</span>`:'All within SLA'}</div></div>
      <div class="stat-card"><div class="stat-label">Reviewed This Cycle</div><div class="stat-value" style="color:var(--ap-green)">${STATE.requests.filter(r=>r.sla.medicalDone).length}</div></div>
      <div class="stat-card"><div class="stat-label">Avg Medical Review Time</div><div class="stat-value">2.5d</div><div class="stat-sub">vs 4d SLA target</div></div>
    </div>
    ${pending.length>0?`<div class="card"><div class="card-header"><span class="card-title">Pending Your Review</span><span class="badge badge-medical">${pending.length}</span></div><table><thead><tr><th>ID</th><th>Title</th><th>Type</th><th>Requester</th><th>Amount</th><th>SLA</th><th>Action</th></tr></thead><tbody>${pending.map(r=>{const sla=getSLAStatus(r);return`<tr><td style="font-family:monospace;font-size:12px">${r.id}</td><td><strong style="font-weight:600">${r.title}</strong><br><span style="font-size:11px;color:var(--ap-muted)">${r.ta} · ${r.region}</span></td><td><span class="badge badge-type">${r.type}</span></td><td style="font-size:12px">${r.requester}</td><td style="font-weight:600">${r.currency} ${r.amount.toLocaleString()}</td><td><div class="sla-indicator"><div class="sla-dot sla-${sla.status}"></div>${sla.label}</div></td><td><button class="btn sm primary" onclick="openDetail('${r.id}')">Review</button></td></tr>`;}).join('')}</tbody></table></div>`:`<div class="card"><div class="empty-state">No requests pending your review.</div></div>`}`;
}

function renderDashboardLegal(){
  const pending=STATE.requests.filter(r=>r.status==='Legal Review');
  const overdue=pending.filter(r=>getSLAStatus(r).status==='over').length;
  const reportable=STATE.requests.filter(r=>r.sunshine).length;
  document.getElementById('mainContent').innerHTML=`
    <div class="welcome-card"><div class="wc-left"><h2>Legal / Compliance View</h2><p>Review requests for regulatory compliance and transparency requirements.</p></div><div class="wc-right">⚖️</div></div>
    <div class="stats-grid">
      <div class="stat-card accent-left"><div class="stat-label">Pending Your Review</div><div class="stat-value" style="color:var(--ap-amber)">${pending.length}</div><div class="stat-sub">${overdue>0?`<span style="color:var(--ap-red);font-weight:600">${overdue} overdue</span>`:'All within SLA'}</div></div>
      <div class="stat-card"><div class="stat-label">Sunshine Reportable</div><div class="stat-value" style="color:var(--ap-accent)">${reportable}</div><div class="stat-sub">Transfers of value</div></div>
      <div class="stat-card"><div class="stat-label">Approved This Cycle</div><div class="stat-value" style="color:var(--ap-green)">${STATE.requests.filter(r=>r.sla.legalDone).length}</div></div>
      <div class="stat-card"><div class="stat-label">FMV Issues</div><div class="stat-value" style="color:var(--ap-red)">${STATE.requests.filter(r=>!r.fmv&&r.status!=='Rejected').length}</div></div>
    </div>
    ${pending.length>0?`<div class="card"><div class="card-header"><span class="card-title">Pending Legal / Compliance Review</span><span class="badge badge-legal">${pending.length}</span></div><table><thead><tr><th>ID</th><th>Title</th><th>Amount</th><th>FMV</th><th>Sunshine</th><th>SLA</th><th>Action</th></tr></thead><tbody>${pending.map(r=>{const sla=getSLAStatus(r);return`<tr><td style="font-family:monospace;font-size:12px">${r.id}</td><td><strong style="font-weight:600">${r.title}</strong><br><span style="font-size:11px;color:var(--ap-muted)">${r.ta} · ${r.region}</span></td><td style="font-weight:600">${r.currency} ${r.amount.toLocaleString()}</td><td style="color:${r.fmv?'var(--ap-green)':'var(--ap-red)'};font-weight:600">${r.fmv?'✓':'!'}</td><td style="font-size:12px">${r.sunshine?'Yes':'No'}</td><td><div class="sla-indicator"><div class="sla-dot sla-${sla.status}"></div>${sla.label}</div></td><td><button class="btn sm primary" onclick="openDetail('${r.id}')">Review</button></td></tr>`;}).join('')}</tbody></table></div>`:`<div class="card"><div class="empty-state">No requests pending your review.</div></div>`}
    <div class="card"><div class="card-header"><span class="card-title">Transparency Snapshot</span><button class="btn sm ghost" onclick="showView('transparency')">Full report →</button></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px"><div style="padding:14px;background:#f8f9fb;border-radius:8px"><div style="font-size:11px;color:var(--ap-muted);margin-bottom:4px">Sunshine Act Reportable</div><div style="font-size:20px;font-weight:700">${reportable} transfers</div></div><div style="padding:14px;background:#f8f9fb;border-radius:8px"><div style="font-size:11px;color:var(--ap-muted);margin-bottom:4px">Total Reportable Value</div><div style="font-size:20px;font-weight:700;color:var(--ap-accent)">$${STATE.requests.filter(r=>r.sunshine).reduce((a,r)=>a+r.amount,0).toLocaleString()}</div></div></div></div>`;
}

function renderDashboardAdmin(){
  const total=STATE.requests.length;
  const approved=STATE.requests.filter(r=>r.status==='Approved'||r.status==='Closed / Completed').length;
  const pending=STATE.requests.filter(r=>['Pending Budget Review','Medical Review','Legal Review'].includes(r.status)).length;
  const overdue=getOverdueCount();
  const totalCommitted=STATE.budgets.reduce((a,b)=>a+b.committed,0);
  const totalActual=STATE.budgets.reduce((a,b)=>a+b.actual,0);
  const pendingCloseout=STATE.requests.filter(r=>r.status==='Approved'&&!r.closeout).length;
  const clarifyCount=STATE.requests.filter(r=>r.status==='Clarification Requested').length;
  document.getElementById('mainContent').innerHTML=`
    <div class="welcome-card"><div class="wc-left"><h2>Leadership Overview</h2><p>Full visibility across all requests, budgets, SLA performance, and compliance reporting.</p></div><div class="wc-right">👑</div></div>
    <div class="stats-grid">
      <div class="stat-card accent-left"><div class="stat-label">Total Requests</div><div class="stat-value">${total}</div></div>
      <div class="stat-card"><div class="stat-label">Pending Review</div><div class="stat-value" style="color:var(--ap-amber)">${pending}</div><div class="stat-sub">${overdue>0?`<span style="color:var(--ap-red);font-weight:600">${overdue} overdue SLA</span>`:'All within SLA'}</div></div>
      <div class="stat-card"><div class="stat-label">Approved / Closed</div><div class="stat-value" style="color:var(--ap-green)">${approved}</div><div class="stat-sub">${pendingCloseout} pending closeout</div></div>
      <div class="stat-card"><div class="stat-label">Total Committed</div><div class="stat-value" style="color:var(--ap-accent)">$${totalCommitted.toLocaleString()}</div><div class="stat-sub">Actual: $${totalActual.toLocaleString()}</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
      <div class="card" style="margin-bottom:0"><div class="card-header"><span class="card-title">Pipeline by Stage</span></div>${['Pending Budget Review','Medical Review','Legal Review','Clarification Requested','Approved','Closed / Completed','Rejected'].map(s=>{const c=STATE.requests.filter(r=>r.status===s).length;return c>0?`<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f2f5"><span style="font-size:13px">${s}</span><span class="badge ${STATUS_BADGE[s]||'badge-type'}">${c}</span></div>`:''}).join('')}</div>
      <div class="card" style="margin-bottom:0"><div class="card-header"><span class="card-title">Budget Utilization</span></div>${STATE.budgets.slice(0,3).map(b=>{const pct=Math.round(b.committed/b.total*100);return`<div class="budget-bar-row"><div class="budget-bar-label"><span style="font-size:12px">${b.region} — ${b.ta}</span><span style="color:var(--ap-muted);font-size:11px">${pct}%</span></div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${pct>85?'var(--ap-red)':pct>60?'var(--ap-amber)':'var(--ap-accent)'}"></div></div></div>`;}).join('')}<button class="btn sm ghost" onclick="showView('budget')" style="margin-top:6px">Full tracker →</button></div>
    </div>
    <div class="card"><div class="card-header"><span class="card-title">Recent Activity</span><button class="btn sm ghost" onclick="showView('requests')">View all →</button></div><table><thead><tr><th>ID</th><th>Title</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead><tbody>${STATE.requests.slice().reverse().slice(0,5).map(r=>`<tr onclick="openDetail('${r.id}')" style="cursor:pointer"><td style="font-family:monospace;font-size:12px">${r.id}</td><td>${r.title}</td><td><span class="badge badge-type">${r.type}</span></td><td>${r.currency} ${r.amount.toLocaleString()}</td><td><span class="badge ${STATUS_BADGE[r.status]||'badge-type'}">${r.status}</span></td></tr>`).join('')}</tbody></table></div>`;
}

// ── MY REQUESTS ──
function renderMyRequests(){
  const mine=myRequests();
  const clarify=myClarifications();
  document.getElementById('mainContent').innerHTML=`
    ${clarify.length>0?renderClarificationAlerts():''}
    <div class="card" style="padding:0"><table><thead><tr><th>ID</th><th>Title</th><th>Type</th><th>Amount</th><th>Submitted</th><th>Status</th><th></th></tr></thead><tbody>
    ${mine.length===0?`<tr><td colspan="7"><div class="empty-state">No requests yet.<br><br><button class="btn primary" onclick="showView('submit')">Submit Your First Request</button></div></td></tr>`:
    mine.slice().reverse().map(r=>`<tr><td style="font-family:monospace;font-size:12px">${r.id}</td><td><strong style="font-weight:600">${r.title}</strong>${r.status==='Clarification Requested'?` <span style="color:var(--ap-red);font-size:11px">⚠ Action needed</span>`:''}<br><span style="font-size:11px;color:var(--ap-muted)">${r.ta} · ${r.region}</span></td><td><span class="badge badge-type">${r.type}</span></td><td style="font-weight:600">${r.currency} ${r.amount.toLocaleString()}</td><td style="font-size:12px">${r.submitted}</td><td><span class="badge ${STATUS_BADGE[r.status]||'badge-type'}">${r.status}</span></td><td><button class="btn sm" onclick="openDetail('${r.id}')">View</button></td></tr>`).join('')}
    </tbody></table></div>`;
}

// ── ALL REQUESTS ──
function renderRequests(){
  const canAct=STATE.role==='budget'||STATE.role==='medical'||STATE.role==='legal';
  const fs=document.getElementById('filterStatus')?.value||'';const ft=document.getElementById('filterType')?.value||'';const fq=document.getElementById('filterSearch')?.value?.toLowerCase()||'';
  let list=STATE.requests;if(fs)list=list.filter(r=>r.status===fs);if(ft)list=list.filter(r=>r.type===ft);if(fq)list=list.filter(r=>r.title.toLowerCase().includes(fq)||r.id.toLowerCase().includes(fq)||r.requester.toLowerCase().includes(fq));
  document.getElementById('mainContent').innerHTML=`
    <div class="filter-bar"><input id="filterSearch" placeholder="Search by title, ID, or requester..." style="flex:1;min-width:200px" oninput="renderRequests()" /><select id="filterStatus" onchange="renderRequests()"><option value="">All Statuses</option>${['Pending Budget Review','Medical Review','Legal Review','Clarification Requested','Approved','Rejected','Closed / Completed'].map(s=>`<option>${s}</option>`).join('')}</select><select id="filterType" onchange="renderRequests()"><option value="">All Types</option>${SETTINGS.requestTypes.map(t=>`<option>${t}</option>`).join('')}</select></div>
    <div class="card" style="padding:0"><table><thead><tr><th>ID</th><th>Title</th><th>Type</th><th>Requester</th><th>Amount</th>${canAct?'<th>SLA</th>':''}<th>Status</th><th></th></tr></thead><tbody>${list.length===0?`<tr><td colspan="${canAct?8:7}"><div class="empty-state">No requests match filters.</div></td></tr>`:list.map(r=>{const sla=getSLAStatus(r);return`<tr><td style="font-family:monospace;font-size:12px">${r.id}</td><td style="max-width:180px"><strong style="font-weight:600">${r.title}</strong><br><span style="font-size:11px;color:var(--ap-muted)">${r.region} · ${r.ta}</span></td><td><span class="badge badge-type">${r.type}</span></td><td style="font-size:12px">${r.requester}</td><td style="font-weight:600">${r.currency} ${r.amount.toLocaleString()}</td>${canAct?`<td>${['Pending Budget Review','Medical Review','Legal Review'].includes(r.status)?`<div class="sla-indicator"><div class="sla-dot sla-${sla.status}"></div>${sla.label}</div>`:'—'}</td>`:''}<td><span class="badge ${STATUS_BADGE[r.status]||'badge-type'}">${r.status}</span></td><td><button class="btn sm" onclick="openDetail('${r.id}')">View</button></td></tr>`;}).join('')}</tbody></table></div>`;
}

// ── SUBMIT ──
function renderSubmit(){
  const taOpts=SETTINGS.therapeuticAreas.map(t=>`<option>${t}</option>`).join('');
  const regionOpts=SETTINGS.regions.map(r=>`<option>${r}</option>`).join('');
  const currOpts=SETTINGS.currencies.map(c=>`<option>${c}</option>`).join('');
  const ccOpts=SETTINGS.costCenters.map(c=>`<option>${c}</option>`).join('');
  const tcatOpts=SETTINGS.transparencyCategories.map(c=>`<option>${c}</option>`).join('');
  const typeOpts=SETTINGS.requestTypes.map(t=>`<option>${t}</option>`).join('');
  document.getElementById('mainContent').innerHTML=`
    <div class="card" style="max-width:720px">
      <div class="card-header"><span class="card-title">Submit New Request</span></div>
      <div class="form-grid">
        <div class="form-section-title">Request Details</div>
        <div class="form-group full"><label>Request Title *</label><input id="f_title" placeholder="e.g. ASCO Annual Meeting 2025 Sponsorship" /></div>
        <div class="form-group"><label>Request Type *</label><select id="f_type"><option value="">Select type</option>${typeOpts}</select></div>
        <div class="form-group"><label>Therapeutic Area *</label><select id="f_ta"><option value="">Select TA</option>${taOpts}</select></div>
        <div class="form-group"><label>Funding Amount *</label><input id="f_amount" type="number" placeholder="0" /></div>
        <div class="form-group"><label>Currency *</label><select id="f_currency">${currOpts}</select></div>
        <div class="form-section-title">Justification &amp; Value</div>
        <div class="form-group full"><label>Scientific / Business Rationale *</label><textarea id="f_rationale" placeholder="Describe the scientific merit, educational purpose, or strategic basis..."></textarea><span class="form-hint">Explain why this event, program, or initiative warrants Medical Affairs funding.</span></div>
        <div class="form-group full"><label>Company Benefit *</label><textarea id="f_benefit" placeholder="Explain how the company benefits — e.g. scientific visibility, KOL engagement, pipeline alignment..."></textarea><span class="form-hint">Required for all request types. Focus on Medical Affairs value, not commercial outcomes.</span></div>
        <div class="form-section-title">Beneficiary &amp; Event</div>
        <div class="form-group"><label>Beneficiary Name *</label><input id="f_beneficiary" placeholder="HCP name or organization" /></div>
        <div class="form-group"><label>Beneficiary Type *</label><select id="f_beneftype"><option value="">Select</option><option>HCP</option><option>HCO</option><option>Organization</option></select></div>
        <div class="form-group"><label>Beneficiary Country *</label><input id="f_benefcountry" placeholder="e.g. United States" /></div>
        <div class="form-group"><label>Region *</label><select id="f_region"><option value="">Select region</option>${regionOpts}</select></div>
        <div class="form-group"><label>Quarter *</label><select id="f_quarter"><option>Q1</option><option>Q2</option><option>Q3</option><option>Q4</option></select></div>
        <div class="form-group"><label>Cost Center *</label><select id="f_cc"><option value="">Select</option>${ccOpts}</select></div>
        <div class="form-group"><label>Event / Program Date *</label><input id="f_date" type="date" /></div>
        <div class="form-group"><label>Transparency Category</label><select id="f_tcat">${tcatOpts}</select></div>
        <div class="form-section-title">Compliance Attestations</div>
        <div class="form-group full"><label style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:400;cursor:pointer"><input type="checkbox" id="f_fmv" style="width:15px;height:15px" />Fair Market Value (FMV) has been assessed and is appropriate for this request.</label></div>
        <div class="form-group full"><label style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:400;cursor:pointer"><input type="checkbox" id="f_commercial" style="width:15px;height:15px" />No commercial influence or promotional intent associated with this request.</label></div>
        <div class="form-group full"><label style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:400;cursor:pointer"><input type="checkbox" id="f_sunshine" style="width:15px;height:15px" />This transfer of value requires Sunshine Act / transparency reporting.</label></div>
        <div class="form-group full" style="margin-top:8px;display:flex;gap:8px">
          <button class="btn primary" onclick="submitRequest()">Submit Request</button>
          <button class="btn ghost" onclick="showView('dashboard')">Cancel</button>
        </div>
      </div>
    </div>`;
}

function submitRequest(){
  const title=document.getElementById('f_title').value.trim();const type=document.getElementById('f_type').value;const amount=parseFloat(document.getElementById('f_amount').value);const currency=document.getElementById('f_currency').value;const rationale=document.getElementById('f_rationale').value.trim();const companyBenefit=document.getElementById('f_benefit').value.trim();const beneficiary=document.getElementById('f_beneficiary').value.trim();const benefType=document.getElementById('f_beneftype').value;const benefCountry=document.getElementById('f_benefcountry').value.trim();const region=document.getElementById('f_region').value;const quarter=document.getElementById('f_quarter').value;const ta=document.getElementById('f_ta').value;const cc=document.getElementById('f_cc').value;const eventDate=document.getElementById('f_date').value;const tcat=document.getElementById('f_tcat').value;const fmv=document.getElementById('f_fmv').checked;const commercial=document.getElementById('f_commercial').checked;const sunshine=document.getElementById('f_sunshine').checked;
  if(!title||!type||!amount||!rationale||!companyBenefit||!beneficiary||!benefType||!region||!ta||!eventDate){alert('Please complete all required fields.');return;}
  if(!fmv||!commercial){alert('Please confirm all compliance attestations.');return;}
  const id=`SG-2025-00${STATE.nextId++}`;const ts=nowStr();const requester=STATE.role==='requester'?REQUESTER_IDENTITY:'Admin User';
  const sd=SETTINGS.sla;const bd=new Date('2025-04-10');bd.setDate(bd.getDate()+sd.budget);const md=new Date(bd);md.setDate(md.getDate()+sd.medical);const ld=new Date(md);ld.setDate(ld.getDate()+sd.legal);
  STATE.requests.push({id,type,title,requester,requesterTitle:'MSL',region,ta,amount,currency,beneficiary,benefType,benefCountry:benefCountry||'Not specified',quarter,costCenter:cc||'TBD',status:'Pending Budget Review',submitted:'2025-04-10',eventDate,fmv,commercial,rationale,companyBenefit,sunshine,transparencyCategory:tcat,closeout:null,sla:{budgetDue:bd.toISOString().slice(0,10),medicalDue:md.toISOString().slice(0,10),legalDue:ld.toISOString().slice(0,10),budgetDone:null,medicalDone:null,legalDone:null},audit:[{ts,user:requester,action:'Request submitted — pending budget owner review. Budget provisionally reserved.'}]});
  saveState();
  document.getElementById('mainContent').innerHTML=`
    <div style="max-width:520px;margin:40px auto;text-align:center">
      <div style="width:64px;height:64px;background:#d4edda;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;font-size:28px">✓</div>
      <h2 style="font-size:20px;font-weight:700;color:var(--ap-navy);margin-bottom:8px">Request Submitted</h2>
      <p style="color:var(--ap-muted);font-size:14px;margin-bottom:6px">Your request has been submitted and is now pending Budget Owner review.</p>
      <p style="font-family:monospace;font-size:13px;color:var(--ap-accent);font-weight:600;margin-bottom:28px">${id}</p>
      <div style="display:flex;gap:10px;justify-content:center">
        <button class="btn primary" onclick="openDetail('${id}')">View Request</button>
        <button class="btn" onclick="showView('myrequests')">My Requests</button>
        <button class="btn ghost" onclick="showView('submit')">Submit Another</button>
      </div>
    </div>`;
}

// ── CLOSEOUT ──
function renderCloseout(){
  const isRequester=STATE.role==='requester';
  const pending=isRequester?STATE.requests.filter(r=>r.status==='Approved'&&!r.closeout&&r.requester===REQUESTER_IDENTITY):STATE.requests.filter(r=>r.status==='Approved'&&!r.closeout);
  const completed=isRequester?STATE.requests.filter(r=>r.closeout&&r.requester===REQUESTER_IDENTITY):STATE.requests.filter(r=>r.closeout);
  const tv=completed.reduce((a,r)=>a+(r.closeout.actualSpend-r.amount),0);
  document.getElementById('mainContent').innerHTML=`
    <div class="stats-grid-3"><div class="stat-card"><div class="stat-label">Pending Closeout</div><div class="stat-value" style="color:var(--ap-amber)">${pending.length}</div></div><div class="stat-card"><div class="stat-label">Completed</div><div class="stat-value" style="color:var(--ap-green)">${completed.length}</div></div><div class="stat-card"><div class="stat-label">Total Variance</div><div class="stat-value">${completed.length>0?(tv<0?'-':'+')+'$'+Math.abs(tv).toLocaleString():'—'}</div><div class="stat-sub">Actual vs committed</div></div></div>
    ${pending.length>0?`<div class="card"><div class="card-header"><span class="card-title">Pending Closeout</span></div><table><thead><tr><th>ID</th><th>Title</th><th>Committed</th><th>Event Date</th><th>Action</th></tr></thead><tbody>${pending.map(r=>`<tr><td style="font-family:monospace;font-size:12px">${r.id}</td><td><strong style="font-weight:600">${r.title}</strong><br><span style="font-size:11px;color:var(--ap-muted)">${r.requester}</span></td><td style="font-weight:600">${r.currency} ${r.amount.toLocaleString()}</td><td>${r.eventDate}</td><td><button class="btn sm primary" onclick="openCloseoutForm('${r.id}')">Submit Closeout</button></td></tr>`).join('')}</tbody></table></div>`:`<div class="card"><div class="empty-state">No requests pending closeout.</div></div>`}
    <div class="card"><div class="card-header"><span class="card-title">Completed Closeouts</span></div>${completed.length===0?`<div class="empty-state">No completed closeouts yet.</div>`:`<table><thead><tr><th>ID</th><th>Title</th><th>Committed</th><th>Actual</th><th>Variance</th><th>Attendance</th><th>Closed</th></tr></thead><tbody>${completed.map(r=>{const v=r.closeout.actualSpend-r.amount;return`<tr onclick="openDetail('${r.id}')" style="cursor:pointer"><td style="font-family:monospace;font-size:12px">${r.id}</td><td>${r.title}</td><td>${r.currency} ${r.amount.toLocaleString()}</td><td style="font-weight:600;color:var(--ap-green)">${r.currency} ${r.closeout.actualSpend.toLocaleString()}</td><td style="color:${v<0?'var(--ap-green)':'var(--ap-red)'};font-weight:600">${v<0?'-':'+'}${r.currency} ${Math.abs(v).toLocaleString()}</td><td>${r.closeout.attendance}</td><td style="font-size:12px">${r.closeout.closedDate}</td></tr>`;}).join('')}</tbody></table>`}</div>`;
}

function openCloseoutForm(id){
  const r=STATE.requests.find(x=>x.id===id);if(!r)return;
  document.getElementById('detailPanel').innerHTML=`<div class="detail-header"><div><div style="font-size:11px;color:var(--ap-muted)">${r.id} — Post-Event Closeout</div><div style="font-size:15px;font-weight:600;color:var(--ap-navy)">${r.title}</div></div><button class="btn sm ghost" onclick="closeDetail()">✕</button></div><div class="detail-body"><div class="info-row"><div class="info-label">Committed Amount</div><div class="info-value" style="font-weight:600">${r.currency} ${r.amount.toLocaleString()}</div></div><div class="info-row"><div class="info-label">Event Date</div><div class="info-value">${r.eventDate}</div></div><div class="section-label">Reconciliation Details</div><div class="closeout-form"><div class="form-group" style="margin-bottom:12px"><label>Actual Spend (${r.currency}) *</label><input id="co_actual" type="number" placeholder="0" /></div><div class="form-group" style="margin-bottom:12px"><label>Number of Attendees</label><input id="co_attendance" type="number" placeholder="0" /></div><div class="form-group" style="margin-bottom:12px"><label>Outcome Notes *</label><textarea id="co_notes" placeholder="Describe event outcomes, attendance quality, fund usage confirmation..."></textarea></div><div class="form-group" style="margin-bottom:14px"><label style="display:flex;align-items:center;gap:8px;font-size:13px;font-weight:400;cursor:pointer"><input type="checkbox" id="co_confirm" style="width:15px;height:15px" />I confirm funds were used appropriately.</label></div><div style="display:flex;gap:8px"><button class="btn primary" onclick="submitCloseout('${r.id}')">Submit Closeout</button><button class="btn ghost" onclick="closeDetail()">Cancel</button></div></div></div>`;
  document.getElementById('detailPanel').classList.add('open');document.getElementById('overlay').classList.add('open');
}

function submitCloseout(id){
  const actual=parseFloat(document.getElementById('co_actual').value);const attendance=parseInt(document.getElementById('co_attendance').value)||0;const notes=document.getElementById('co_notes').value.trim();const confirmed=document.getElementById('co_confirm').checked;
  if(!actual||!notes){alert('Please complete all required fields.');return;}if(!confirmed){alert('Please confirm appropriate fund usage.');return;}
  const r=STATE.requests.find(x=>x.id===id);const variance=actual-r.amount;
  r.closeout={actualSpend:actual,attendance,outcomeNotes:notes,confirmed,closedDate:'2025-04-10'};r.status='Closed / Completed';
  r.audit.push({ts:nowStr(),user:STATE.role==='requester'?REQUESTER_IDENTITY:'Admin User',action:`Post-event closeout submitted. Actual: ${r.currency} ${actual.toLocaleString()} vs committed ${r.currency} ${r.amount.toLocaleString()}. Variance: ${variance<0?'-':'+'}${r.currency} ${Math.abs(variance).toLocaleString()}. Attendance: ${attendance}.`});
  const bl=STATE.budgets.find(b=>b.region===r.region&&b.ta===r.ta&&b.quarter===r.quarter);if(bl)bl.actual+=actual;
  saveState();closeDetail();showToast('Closeout submitted.');showView('closeout');
}

// ── BUDGET / TRANSPARENCY / SLA / AUDIT ──
function renderBudget(){
  const tb=STATE.budgets.reduce((a,b)=>a+b.total,0);const tc=STATE.budgets.reduce((a,b)=>a+b.committed,0);const ta=STATE.budgets.reduce((a,b)=>a+b.actual,0);
  document.getElementById('mainContent').innerHTML=`
    <div class="stats-grid-3"><div class="stat-card"><div class="stat-label">Total Budget</div><div class="stat-value">$${tb.toLocaleString()}</div></div><div class="stat-card"><div class="stat-label">Total Committed</div><div class="stat-value" style="color:var(--ap-accent)">$${tc.toLocaleString()}</div><div class="stat-sub">${Math.round(tc/tb*100)}% utilized</div></div><div class="stat-card"><div class="stat-label">Total Actual Spend</div><div class="stat-value" style="color:var(--ap-green)">$${ta.toLocaleString()}</div></div></div>
    <div class="card" style="padding:0"><div class="card-header" style="padding:16px 20px"><span class="card-title">Budget by Region, TA &amp; Quarter</span></div><table><thead><tr><th>Region</th><th>TA</th><th>Quarter</th><th>Total</th><th>Committed</th><th>Actual</th><th>Remaining</th><th>Variance</th><th>Utilization</th></tr></thead><tbody>${STATE.budgets.map(b=>{const rem=b.total-b.committed;const v=b.actual-b.committed;const pct=Math.round(b.committed/b.total*100);return`<tr><td>${b.region}</td><td>${b.ta}</td><td style="font-family:monospace;font-size:12px">${b.quarter}</td><td>${b.total.toLocaleString()}</td><td style="color:var(--ap-accent);font-weight:600">${b.committed.toLocaleString()}</td><td style="color:var(--ap-green);font-weight:600">${b.actual.toLocaleString()}</td><td style="color:${rem<20000?'var(--ap-red)':'inherit'};font-weight:600">${rem.toLocaleString()}</td><td style="color:${v<0?'var(--ap-green)':v>0?'var(--ap-red)':'inherit'};font-size:12px">${v===0?'—':(v<0?'-':'+')+'$'+Math.abs(v).toLocaleString()}</td><td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar" style="width:80px;flex-shrink:0"><div class="progress-fill" style="width:${pct}%;background:${pct>85?'var(--ap-red)':pct>60?'var(--ap-amber)':'var(--ap-accent)'}"></div></div><span style="font-size:12px">${pct}%</span></div></td></tr>`;}).join('')}</tbody></table></div>`;
}

function renderTransparency(){
  const reportable=STATE.requests.filter(r=>r.sunshine);const totalValue=reportable.reduce((a,r)=>a+r.amount,0);const byType={};reportable.forEach(r=>{byType[r.transparencyCategory]=(byType[r.transparencyCategory]||0)+r.amount;});
  document.getElementById('mainContent').innerHTML=`
    <div class="stats-grid-3"><div class="stat-card"><div class="stat-label">Reportable Transfers</div><div class="stat-value">${reportable.length}</div><div class="stat-sub">Sunshine Act / EFPIA</div></div><div class="stat-card"><div class="stat-label">Total Reportable Value</div><div class="stat-value" style="color:var(--ap-accent)">$${totalValue.toLocaleString()}</div></div><div class="stat-card"><div class="stat-label">HCP Recipients</div><div class="stat-value">${reportable.filter(r=>r.benefType==='HCP').length}</div><div class="stat-sub">Individual reporting required</div></div></div>
    <div class="export-row"><button class="btn primary sm" onclick="exportCSV()">Export Sunshine Act CSV</button><button class="btn sm">Export EFPIA Report</button><button class="btn sm">Export by HCP</button></div>
    <div class="card" style="padding:0"><div class="card-header" style="padding:16px 20px"><span class="card-title">Reportable Transfers of Value</span></div><table><thead><tr><th>ID</th><th>Recipient</th><th>Type</th><th>Country</th><th>Category</th><th>Amount</th><th>Status</th><th>Reportable</th></tr></thead><tbody>${STATE.requests.map(r=>`<tr><td style="font-family:monospace;font-size:12px">${r.id}</td><td><strong style="font-weight:600">${r.beneficiary}</strong><br><span style="font-size:11px;color:var(--ap-muted)">${r.benefType}</span></td><td><span class="badge badge-type">${r.type}</span></td><td style="font-size:12px">${r.benefCountry}</td><td style="font-size:12px">${r.transparencyCategory}</td><td style="font-weight:600">${r.currency} ${r.amount.toLocaleString()}</td><td><span class="badge ${STATUS_BADGE[r.status]||'badge-type'}">${r.status}</span></td><td style="text-align:center">${r.sunshine?`<span style="color:var(--ap-green);font-weight:600">Yes</span>`:`<span style="color:var(--ap-muted)">No</span>`}</td></tr>`).join('')}</tbody></table></div>
    <div class="card"><div class="card-header"><span class="card-title">Reportable Value by Category</span></div>${Object.entries(byType).map(([cat,val])=>{const pct=Math.round(val/totalValue*100);return`<div class="budget-bar-row"><div class="budget-bar-label"><span>${cat}</span><span style="color:var(--ap-muted)">$${val.toLocaleString()} (${pct}%)</span></div><div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:var(--ap-accent)"></div></div></div>`;}).join('')}</div>`;
}
function exportCSV(){const rows=STATE.requests.filter(r=>r.sunshine);const csv=['ID,Title,Recipient,Recipient Type,Country,Category,Amount,Currency,Status,Submitted,Event Date',...rows.map(r=>`${r.id},"${r.title}","${r.beneficiary}",${r.benefType},${r.benefCountry},"${r.transparencyCategory}",${r.amount},${r.currency},${r.status},${r.submitted},${r.eventDate}`)].join('\n');const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='sunshine_act_report.csv';a.click();}

function renderSLA(){
  const active=STATE.requests.filter(r=>['Pending Budget Review','Medical Review','Legal Review'].includes(r.status));
  document.getElementById('mainContent').innerHTML=`
    <div class="stats-grid-3"><div class="stat-card"><div class="stat-label">Active Reviews</div><div class="stat-value">${active.length}</div></div><div class="stat-card"><div class="stat-label">Overdue</div><div class="stat-value" style="color:var(--ap-red)">${active.filter(r=>getSLAStatus(r).status==='over').length}</div></div><div class="stat-card"><div class="stat-label">Due Today / Tomorrow</div><div class="stat-value" style="color:var(--ap-amber)">${active.filter(r=>getSLAStatus(r).status==='warn').length}</div></div></div>
    <div class="card" style="padding:0"><div class="card-header" style="padding:16px 20px"><span class="card-title">SLA Status by Request</span></div><table><thead><tr><th>ID</th><th>Title</th><th>Stage</th><th>SLA Status</th><th>Budget</th><th>Medical</th><th>Legal</th><th></th></tr></thead><tbody>${active.length===0?`<tr><td colspan="8"><div class="empty-state">No active reviews.</div></td></tr>`:active.map(r=>{const sla=getSLAStatus(r);function sc(done,due){if(done)return`<span style="color:var(--ap-green);font-size:12px">✓ ${done}</span>`;if(due)return`<span style="color:${new Date(due)<new Date('2025-04-10')?'var(--ap-red)':'var(--ap-muted)'};font-size:12px">Due ${due}</span>`;return`<span style="color:var(--ap-muted);font-size:12px">—</span>`;}return`<tr><td style="font-family:monospace;font-size:12px">${r.id}</td><td style="max-width:150px;font-size:13px;font-weight:500">${r.title}</td><td><span class="badge ${STATUS_BADGE[r.status]||'badge-type'}">${r.status}</span></td><td><div class="sla-indicator"><div class="sla-dot sla-${sla.status}"></div><strong>${sla.label}</strong></div></td><td>${sc(r.sla.budgetDone,r.sla.budgetDue)}</td><td>${sc(r.sla.medicalDone,r.sla.medicalDue)}</td><td>${sc(r.sla.legalDone,r.sla.legalDue)}</td><td><button class="btn sm" onclick="openDetail('${r.id}')">Review</button></td></tr>`;}).join('')}</tbody></table></div>
    <div class="card"><div class="card-header"><span class="card-title">Approval Cycle Time (Completed)</span></div>${STATE.requests.filter(r=>r.sla.budgetDone&&r.sla.medicalDone&&r.sla.legalDone).map(r=>{const b=Math.ceil((new Date(r.sla.budgetDone)-new Date(r.submitted))/86400000);const m=Math.ceil((new Date(r.sla.medicalDone)-new Date(r.sla.budgetDone))/86400000);const l=Math.ceil((new Date(r.sla.legalDone)-new Date(r.sla.medicalDone))/86400000);return`<div class="budget-bar-row"><div class="budget-bar-label"><span>${r.id} — ${r.title}</span><span style="color:var(--ap-muted)">Total: ${b+m+l} days</span></div><div style="display:flex;gap:4px;font-size:11px;margin-top:4px"><span style="background:#d1ecf1;color:#0c5460;padding:2px 8px;border-radius:10px">Budget: ${b}d</span><span style="background:#e2d9f3;color:#4a235a;padding:2px 8px;border-radius:10px">Medical: ${m}d</span><span style="background:#d4edda;color:#155724;padding:2px 8px;border-radius:10px">Legal: ${l}d</span></div></div>`;}).join('')||'<div class="empty-state" style="padding:24px">No completed full-cycle requests yet.</div>'}</div>`;
}

function renderAuditLog(){
  const all=[];STATE.requests.forEach(r=>r.audit.forEach(a=>all.push({...a,requestId:r.id,requestTitle:r.title})));all.sort((a,b)=>b.ts.localeCompare(a.ts));
  document.getElementById('mainContent').innerHTML=`<div class="card"><div class="card-header"><span class="card-title">Full Audit Trail</span><span style="font-size:12px;color:var(--ap-muted)">${all.length} entries</span></div>${all.map(e=>`<div class="audit-entry"><div class="audit-time">${e.ts}</div><div class="audit-text"><span style="font-family:monospace;font-size:11px;background:#eef0f3;padding:2px 6px;border-radius:4px;margin-right:6px">${e.requestId}</span><strong style="font-weight:600">${e.user}</strong> — ${e.action}<div style="font-size:11px;color:var(--ap-muted);margin-top:2px">${e.requestTitle}</div></div></div>`).join('')}</div>`;
}

// ── SETTINGS ──
function renderSettings(){
  const tabs=['branding','lists','sla','danger'];
  const tabLabels={branding:'Branding',lists:'Reference Lists',sla:'SLA & Workflow',danger:'Reset'};
  STATE.settingsTab=STATE.settingsTab||'branding';
  document.getElementById('mainContent').innerHTML=`<div class="settings-grid"><div class="settings-nav">${tabs.map(t=>`<div class="settings-nav-item${STATE.settingsTab===t?' active':''}" onclick="switchSettingsTab('${t}')">${tabLabels[t]}</div>`).join('')}</div><div id="settingsContent"></div></div>`;
  renderSettingsTab();
}
function switchSettingsTab(t){STATE.settingsTab=t;renderSettings();}
function renderSettingsTab(){
  const el=document.getElementById('settingsContent');if(!el)return;const t=STATE.settingsTab;
  if(t==='branding'){el.innerHTML=`<div class="settings-panel"><h3>Branding</h3><p>The Acceleration Point logo is fixed for this deployment. The product name can be customized per client.</p><div style="background:#0d2b4e;border-radius:10px;padding:18px;margin-bottom:20px;display:flex;align-items:center;gap:16px"><svg width="140" height="34" viewBox="0 0 140 34" xmlns="http://www.w3.org/2000/svg"><circle cx="16" cy="17" r="13" fill="none" stroke="#F57C20" stroke-width="3.5"/><circle cx="16" cy="17" r="4.5" fill="#F57C20"/><text x="36" y="15" font-family="-apple-system,sans-serif" font-size="12" font-weight="700" fill="#ffffff">acceleration</text><text x="36" y="29" font-family="-apple-system,sans-serif" font-size="12" font-weight="700" fill="#F57C20">point</text></svg><div><div style="font-size:16px;font-weight:600;color:#fff" id="prev_product">${SETTINGS.productName}</div><div style="font-size:11px;color:rgba(255,255,255,0.4);margin-top:2px">Sponsorship &amp; Grants Management</div></div></div><div class="form-grid"><div class="form-group full"><label>Product Name</label><input id="s_productName" value="${SETTINGS.productName}" placeholder="e.g. MedGrants" /></div></div><hr class="divider"><button class="btn primary" onclick="saveBranding()">Save</button></div>`;
    document.getElementById('s_productName').addEventListener('input',function(){document.getElementById('prev_product').textContent=this.value;});
  }else if(t==='lists'){
    const listDefs=[{key:'therapeuticAreas',label:'Therapeutic Areas',hint:'Used in intake form and budget tracking'},{key:'regions',label:'Regions',hint:'Geographic regions'},{key:'currencies',label:'Currencies',hint:'Supported currencies'},{key:'costCenters',label:'Cost Centers',hint:'Budget cost centers'},{key:'transparencyCategories',label:'Transparency Categories',hint:'Sunshine Act reporting categories'},{key:'requestTypes',label:'Request Types',hint:'Types of funding requests'}];
    el.innerHTML=`<div class="settings-panel"><h3>Reference Lists</h3><p>Manage dropdown options throughout the application.</p>${listDefs.map(d=>`<div style="margin-bottom:24px"><div style="font-size:13px;font-weight:600;color:var(--ap-navy);margin-bottom:3px">${d.label}</div><div style="font-size:11px;color:var(--ap-muted);margin-bottom:10px">${d.hint}</div><div class="tag-list" id="tags_${d.key}">${SETTINGS[d.key].map(v=>`<div class="tag-item">${v}<span class="tag-remove" onclick="removeTag('${d.key}','${v}')">×</span></div>`).join('')}</div><div class="tag-add-row"><input id="input_${d.key}" placeholder="Add new..." onkeydown="if(event.key==='Enter')addTag('${d.key}')" /><button class="btn sm primary" onclick="addTag('${d.key}')">Add</button></div></div>`).join('')}</div>`;
  }else if(t==='sla'){
    el.innerHTML=`<div class="settings-panel"><h3>SLA &amp; Workflow</h3><p>Set business day limits per approval step.</p><div style="margin:20px 0"><div class="sla-config-row"><label>Budget Owner Review</label><input id="sla_budget" type="number" min="1" max="30" value="${SETTINGS.sla.budget}" /><span>business days</span></div><div class="sla-config-row"><label>Medical Review</label><input id="sla_medical" type="number" min="1" max="30" value="${SETTINGS.sla.medical}" /><span>business days</span></div><div class="sla-config-row"><label>Legal / Compliance</label><input id="sla_legal" type="number" min="1" max="30" value="${SETTINGS.sla.legal}" /><span>business days</span></div></div><hr class="divider"><div style="margin-bottom:20px"><div style="font-size:13px;font-weight:600;color:var(--ap-navy);margin-bottom:12px">Approver Role Labels</div><div class="sla-config-row"><label>Step 1 Approver</label><input id="lbl_budget" value="${SETTINGS.approverLabels.budget}" style="flex:1;max-width:220px" /></div><div class="sla-config-row"><label>Step 2 Approver</label><input id="lbl_medical" value="${SETTINGS.approverLabels.medical}" style="flex:1;max-width:220px" /></div><div class="sla-config-row"><label>Step 3 Approver</label><input id="lbl_legal" value="${SETTINGS.approverLabels.legal}" style="flex:1;max-width:220px" /></div></div><button class="btn primary" onclick="saveSLA()">Save Configuration</button></div>`;
  }else if(t==='danger'){
    el.innerHTML=`<div class="settings-panel"><h3>Reset Application Data</h3><p>Reset to default state for a clean client demo.</p><div style="background:#fff5f5;border:1px solid #f5c6cb;border-radius:8px;padding:18px;margin-bottom:16px"><div style="font-size:13px;font-weight:600;color:var(--ap-red);margin-bottom:6px">Reset All Request Data</div><div style="font-size:13px;color:#555;margin-bottom:14px">Clears all requests and restores sample data. Settings preserved.</div><button class="btn danger" onclick="resetData()">Reset to Default Data</button></div><div style="background:#fff5f5;border:1px solid #f5c6cb;border-radius:8px;padding:18px"><div style="font-size:13px;font-weight:600;color:var(--ap-red);margin-bottom:6px">Full Factory Reset</div><div style="font-size:13px;color:#555;margin-bottom:14px">Resets all data AND all settings back to factory defaults.</div><button class="btn danger" onclick="fullReset()">Full Factory Reset</button></div></div>`;
  }
}
function saveBranding(){SETTINGS.productName=document.getElementById('s_productName').value.trim()||SETTINGS.productName;saveSettings();applyBranding();showToast('Product name saved.');}
function addTag(key){const input=document.getElementById('input_'+key);const val=input.value.trim();if(!val||SETTINGS[key].includes(val)){input.value='';return;}SETTINGS[key].push(val);saveSettings();input.value='';renderSettingsTab();}
function removeTag(key,val){SETTINGS[key]=SETTINGS[key].filter(v=>v!==val);saveSettings();renderSettingsTab();}
function saveSLA(){SETTINGS.sla.budget=parseInt(document.getElementById('sla_budget').value)||2;SETTINGS.sla.medical=parseInt(document.getElementById('sla_medical').value)||4;SETTINGS.sla.legal=parseInt(document.getElementById('sla_legal').value)||4;SETTINGS.approverLabels.budget=document.getElementById('lbl_budget').value.trim()||'Budget Owner';SETTINGS.approverLabels.medical=document.getElementById('lbl_medical').value.trim()||'Medical Reviewer';SETTINGS.approverLabels.legal=document.getElementById('lbl_legal').value.trim()||'Legal / Compliance';saveSettings();showToast('SLA configuration saved.');}
function resetData(){if(!confirm('Reset all requests and budgets to default sample data?'))return;STATE.requests=JSON.parse(JSON.stringify(DEFAULT_REQUESTS));STATE.budgets=JSON.parse(JSON.stringify(DEFAULT_BUDGETS));STATE.nextId=7;saveState();showToast('Data reset.');showView('dashboard');}
function fullReset(){if(!confirm('Full factory reset — all data and settings will be cleared. Continue?'))return;localStorage.removeItem('mg_requests');localStorage.removeItem('mg_budgets');localStorage.removeItem('mg_settings');location.reload();}

// ── DETAIL PANEL ──
function openDetail(id){
  const r=STATE.requests.find(x=>x.id===id);if(!r)return;
  const statusIdx=STATUS_FLOW.indexOf(r.status);
  const canAct=ROLE_MAP[STATE.role].canApprove&&r.status===ROLE_MAP[STATE.role].approvalStep;
  const canCloseout=r.status==='Approved'&&!r.closeout&&(STATE.role==='requester'||STATE.role==='admin');
  const labels=[SETTINGS.approverLabels.budget,SETTINGS.approverLabels.medical,SETTINGS.approverLabels.legal,'Approved'];
  const wfHtml=STATUS_FLOW.slice(0,4).map((s,i)=>{const isDone=(statusIdx>i)||(r.status==='Approved');const isActive=r.status===s;const cls=isDone&&!isActive?'done':isActive?'active':'';return`<div style="flex:1;padding:10px 12px;background:${cls==='done'?'#d4edda':cls==='active'?'#d1ecf1':'#f8f9fb'};border:1px solid ${cls==='done'?'#27ae60':cls==='active'?'var(--ap-accent)':'var(--ap-border)'};font-size:12px"><div style="font-size:10px;color:var(--ap-muted)">Step ${i+1}</div><div style="font-weight:600;color:var(--ap-navy)">${labels[i]}</div><div style="font-size:11px;color:${cls==='done'?'var(--ap-green)':cls==='active'?'var(--ap-accent)':'var(--ap-muted)'};margin-top:2px">${cls==='done'?'✓ Completed':cls==='active'?'● In Progress':'Pending'}</div></div>`;}).join('');

  // Build message thread
  const thread = r.messages||[];
  const clarifySection = r.status==='Clarification Requested' ? `
    <div style="background:#fff8f0;border:1.5px solid #e67e22;border-radius:10px;overflow:hidden;margin:14px 0">
      <div style="padding:12px 16px;background:#fef3e2;border-bottom:1px solid #f0d090;display:flex;align-items:center;gap:8px">
        <span style="font-size:14px">⚠</span>
        <span style="font-size:12px;font-weight:700;color:#7d4e00;text-transform:uppercase;letter-spacing:0.05em">Clarification Requested</span>
      </div>
      <div style="padding:14px 16px">
        ${r.clarificationNote?`
        <div style="display:flex;gap:10px;margin-bottom:14px">
          <div style="width:32px;height:32px;border-radius:50%;background:#fde8c8;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#7d4e00;flex-shrink:0">R</div>
          <div style="flex:1">
            <div style="font-size:11px;color:var(--ap-muted);margin-bottom:4px"><strong style="color:#7d4e00">Reviewer</strong> · ${nowStr()}</div>
            <div style="background:#fff;border:1px solid #f0d090;border-radius:8px;padding:10px 14px;font-size:13px;color:#7d4e00;line-height:1.6">${r.clarificationNote}</div>
          </div>
        </div>`:''}
        ${thread.map(m=>`
        <div style="display:flex;gap:10px;margin-bottom:14px;${m.from==='requester'?'flex-direction:row-reverse':''}">
          <div style="width:32px;height:32px;border-radius:50%;background:${m.from==='requester'?'#d6eaf8':'#fde8c8'};display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${m.from==='requester'?'var(--ap-blue)':'#7d4e00'};flex-shrink:0">${m.from==='requester'?'S':'R'}</div>
          <div style="flex:1">
            <div style="font-size:11px;color:var(--ap-muted);margin-bottom:4px;${m.from==='requester'?'text-align:right':''}"><strong style="color:${m.from==='requester'?'var(--ap-blue)':'#7d4e00'}">${m.from==='requester'?r.requester:'Reviewer'}</strong> · ${m.ts}</div>
            <div style="background:${m.from==='requester'?'#ebf5fb':'#fff'};border:1px solid ${m.from==='requester'?'#aed6f1':'#f0d090'};border-radius:8px;padding:10px 14px;font-size:13px;line-height:1.6">${m.text}</div>
          </div>
        </div>`).join('')}
        ${STATE.role==='requester'?`
        <div style="border-top:1px solid #f0d090;padding-top:12px;margin-top:4px">
          <div style="font-size:11px;font-weight:600;color:var(--ap-muted);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.05em">Your Response</div>
          <textarea id="clarify_reply" placeholder="Provide the requested clarification or additional information here..." style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:8px;font-size:13px;font-family:inherit;min-height:90px;resize:vertical;margin-bottom:10px"></textarea>
          <div style="display:flex;gap:8px">
            <button class="btn primary sm" onclick="submitClarifyReply('${r.id}')">Send Response</button>
            <button class="btn sm" onclick="resubmitAfterClarify('${r.id}')">Respond &amp; Resubmit</button>
          </div>
          <div style="font-size:11px;color:var(--ap-muted);margin-top:8px">In-app messaging only — email notification available in Phase 2.</div>
        </div>`:`
        <div style="border-top:1px solid #f0d090;padding-top:10px;margin-top:4px">
          <div style="font-size:12px;color:var(--ap-muted)">Awaiting requester response. You will be notified when they reply.</div>
        </div>`}
      </div>
    </div>` : (thread.length>0 ? `
    <div style="background:#f8f9fb;border:1px solid var(--ap-border);border-radius:10px;overflow:hidden;margin:14px 0">
      <div style="padding:10px 16px;border-bottom:1px solid var(--ap-border)"><span style="font-size:12px;font-weight:600;color:var(--ap-muted);text-transform:uppercase;letter-spacing:0.05em">Clarification Thread (Resolved)</span></div>
      <div style="padding:14px 16px">
        ${r.clarificationNote?`<div style="display:flex;gap:10px;margin-bottom:12px"><div style="width:28px;height:28px;border-radius:50%;background:#fde8c8;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#7d4e00;flex-shrink:0">R</div><div><div style="font-size:11px;color:var(--ap-muted);margin-bottom:3px"><strong style="color:#7d4e00">Reviewer note</strong></div><div style="font-size:13px;color:var(--ap-muted);line-height:1.5">${r.clarificationNote}</div></div></div>`:''}
        ${thread.map(m=>`<div style="display:flex;gap:10px;margin-bottom:10px;${m.from==='requester'?'flex-direction:row-reverse':''}"><div style="width:28px;height:28px;border-radius:50%;background:${m.from==='requester'?'#d6eaf8':'#fde8c8'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:${m.from==='requester'?'var(--ap-blue)':'#7d4e00'};flex-shrink:0">${m.from==='requester'?'S':'R'}</div><div style="flex:1"><div style="font-size:11px;color:var(--ap-muted);margin-bottom:3px">${m.ts}</div><div style="font-size:13px;color:var(--ap-muted);line-height:1.5">${m.text}</div></div></div>`).join('')}
      </div>
    </div>` : '');

  document.getElementById('detailPanel').innerHTML=`
    <div class="detail-header"><div><div style="font-size:11px;color:var(--ap-muted)">${r.id}</div><div style="font-size:15px;font-weight:700;color:var(--ap-navy)">${r.title}</div></div><button class="btn sm ghost" onclick="closeDetail()">✕ Close</button></div>
    <div class="detail-body">
      <div style="display:flex;gap:2px;margin-bottom:16px">${wfHtml}</div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px"><span class="badge ${STATUS_BADGE[r.status]||'badge-type'}">${r.status}</span><span class="badge badge-type">${r.type}</span>${r.sunshine?`<span class="badge" style="background:#d1ecf1;color:#0c5460">Sunshine Reportable</span>`:''}</div>
      ${clarifySection}
      <div class="info-row"><div class="info-label">Requester</div><div class="info-value">${r.requester} <span style="color:var(--ap-muted);font-size:12px">(${r.requesterTitle})</span></div></div>
      <div class="info-row"><div class="info-label">Beneficiary</div><div class="info-value">${r.beneficiary} <span style="color:var(--ap-muted);font-size:12px">(${r.benefType} · ${r.benefCountry})</span></div></div>
      <div class="info-row"><div class="info-label">Committed Amount</div><div class="info-value" style="font-weight:700">${r.currency} ${r.amount.toLocaleString()}</div></div>
      ${r.closeout?`<div class="info-row"><div class="info-label">Actual Spend</div><div class="info-value" style="font-weight:700;color:var(--ap-green)">${r.currency} ${r.closeout.actualSpend.toLocaleString()} <span style="font-size:12px;color:${r.closeout.actualSpend-r.amount<0?'var(--ap-green)':'var(--ap-red)'}">(${r.closeout.actualSpend-r.amount<0?'-':'+'}${r.currency} ${Math.abs(r.closeout.actualSpend-r.amount).toLocaleString()} variance)</span></div></div>`:''}
      <div class="info-row"><div class="info-label">Region / TA</div><div class="info-value">${r.region} · ${r.ta}</div></div>
      <div class="info-row"><div class="info-label">Quarter / Cost Center</div><div class="info-value">${r.quarter} / ${r.costCenter}</div></div>
      <div class="info-row"><div class="info-label">Event Date</div><div class="info-value">${r.eventDate}</div></div>
      <div class="info-row"><div class="info-label">FMV Confirmed</div><div class="info-value" style="color:${r.fmv?'var(--ap-green)':'var(--ap-red)'};font-weight:600">${r.fmv?'Yes':'No — required'}</div></div>
      <div class="rationale-block"><div class="rationale-block-label">Scientific / Business Rationale</div><div class="rationale-block-text">${r.rationale}</div></div>
      <div class="rationale-block company"><div class="rationale-block-label">Company Benefit</div><div class="rationale-block-text">${r.companyBenefit||'<span style="color:var(--ap-muted);font-style:italic">Not provided</span>'}</div></div>
      ${r.closeout?`<div style="margin:14px 0;padding:14px;background:#d4edda;border-radius:8px;border:1px solid #27ae60"><div style="font-size:11px;font-weight:700;color:#155724;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.05em">Post-Event Closeout — ${r.closeout.closedDate}</div><div style="font-size:13px;line-height:1.6;color:#155724">${r.closeout.outcomeNotes}</div><div style="font-size:12px;color:#155724;margin-top:8px">Attendance: ${r.closeout.attendance} · Fund usage confirmed: ${r.closeout.confirmed?'Yes':'No'}</div></div>`:''}
      ${canAct?`<div class="action-bar"><button class="btn success" onclick="takeAction('${r.id}','approve')">✓ Approve</button><button class="btn danger" onclick="takeAction('${r.id}','reject')">✗ Reject</button><button class="btn" onclick="promptClarify('${r.id}')">⟲ Request Clarification</button></div>`:''}
      ${canCloseout?`<div class="action-bar"><button class="btn warning" onclick="closeDetail();openCloseoutForm('${r.id}')">Submit Post-Event Closeout</button></div>`:''}
      <div class="section-label">SLA Timeline</div>
      <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px">${[['Budget Review',r.sla.budgetDue,r.sla.budgetDone],['Medical Review',r.sla.medicalDue,r.sla.medicalDone],['Legal / Compliance',r.sla.legalDue,r.sla.legalDone]].map(([label,due,done])=>`<div style="display:flex;align-items:center;gap:8px;font-size:12px"><span style="width:140px;color:var(--ap-muted)">${label}</span>${done?`<span style="color:var(--ap-green)">✓ Completed ${done}</span>`:(due?`<span style="color:${new Date(due)<new Date('2025-04-10')?'var(--ap-red)':'var(--ap-muted)'}">Due ${due}${new Date(due)<new Date('2025-04-10')?' — Overdue':''}</span>`:'<span style="color:var(--ap-muted)">Not yet scheduled</span>')}</div>`).join('')}</div>
      <div class="section-label">Audit Trail</div>
      ${r.audit.map(a=>`<div class="audit-entry"><div class="audit-time">${a.ts}</div><div class="audit-text"><strong style="font-weight:600">${a.user}</strong><br><span style="font-size:12px;color:var(--ap-muted)">${a.action}</span></div></div>`).join('')}
    </div>`;
  document.getElementById('detailPanel').classList.add('open');document.getElementById('overlay').classList.add('open');
}
function closeDetail(){document.getElementById('detailPanel').classList.remove('open');document.getElementById('overlay').classList.remove('open');}

function promptClarify(id){
  const bar=document.querySelector('.action-bar');if(!bar)return;
  bar.innerHTML=`
    <div style="width:100%">
      <div style="font-size:12px;font-weight:600;color:var(--ap-navy);margin-bottom:8px">Request Clarification from Submitter</div>
      <textarea id="clarify_note" placeholder="Describe what additional information or clarification is needed from the requester..." style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:8px;font-size:13px;font-family:inherit;min-height:90px;resize:vertical;margin-bottom:10px"></textarea>
      <div style="display:flex;gap:8px">
        <button class="btn primary sm" onclick="submitClarifyNote('${id}')">Send to Requester</button>
        <button class="btn ghost sm" onclick="openDetail('${id}')">Cancel</button>
      </div>
      <div style="font-size:11px;color:var(--ap-muted);margin-top:8px">An in-app alert will be shown to the requester. Email notification available in Phase 2.</div>
    </div>`;
}

function submitClarifyNote(id){
  const note=document.getElementById('clarify_note')?.value.trim();
  if(!note){alert('Please enter a clarification note.');return;}
  takeAction(id,'clarify',note);
}

function submitClarifyReply(id){
  const text=document.getElementById('clarify_reply')?.value.trim();
  if(!text){alert('Please enter your response.');return;}
  const r=STATE.requests.find(x=>x.id===id);if(!r)return;
  if(!r.messages)r.messages=[];
  const ts=nowStr();
  r.messages.push({from:'requester',text,ts});
  r.audit.push({ts,user:REQUESTER_IDENTITY,action:`Clarification response sent: "${text}"`});
  saveState();showToast('Response sent to reviewer.');openDetail(id);
}

function resubmitAfterClarify(id){
  const text=document.getElementById('clarify_reply')?.value.trim();
  if(!text){alert('Please enter your response before resubmitting.');return;}
  const r=STATE.requests.find(x=>x.id===id);if(!r)return;
  if(!r.messages)r.messages=[];
  const ts=nowStr();
  r.messages.push({from:'requester',text,ts});
  const returnStage=r.clarificationFromStage||'Pending Budget Review';
  const stageLabel={
    'Pending Budget Review': SETTINGS.approverLabels.budget||'Budget Owner',
    'Medical Review': SETTINGS.approverLabels.medical||'Medical Reviewer',
    'Legal Review': SETTINGS.approverLabels.legal||'Legal / Compliance'
  }[returnStage]||returnStage;
  r.status=returnStage;
  r.audit.push({ts,user:REQUESTER_IDENTITY,action:`Clarification provided and request resubmitted directly to ${stageLabel} (bypassing previously completed review steps). Response: "${text}"`});
  saveState();closeDetail();buildNav();showToast(`Response sent. Request routed back to ${stageLabel}.`);renderView();
}

function takeAction(id,action,clarifyNote=''){
  const r=STATE.requests.find(x=>x.id===id);if(!r)return;
  const roleLabel=ROLE_MAP[STATE.role].label;const ts=nowStr();const today='2025-04-10';
  if(action==='approve'){const idx=STATUS_FLOW.indexOf(r.status);const next=STATUS_FLOW[idx+1];if(r.status==='Pending Budget Review')r.sla.budgetDone=today;if(r.status==='Medical Review')r.sla.medicalDone=today;if(r.status==='Legal Review')r.sla.legalDone=today;r.audit.push({ts,user:roleLabel,action:`Approved at ${r.status} stage.${next?` Routed to: ${next}.`:' Request fully approved.'}`});r.status=next||'Approved';}
  else if(action==='reject'){r.audit.push({ts,user:roleLabel,action:`Rejected at ${r.status} stage. Request closed.`});r.status='Rejected';}
  else if(action==='clarify'){r.clarificationNote=clarifyNote;r.clarificationFromStage=r.status;r.audit.push({ts,user:roleLabel,action:`Clarification requested at ${r.status} stage. Note to requester: "${clarifyNote}". In-platform alert sent to requester.`});r.status='Clarification Requested';}
  saveState();closeDetail();buildNav();showToast(`Action recorded.`);renderView();
}

function applyBranding(){
  const pn=document.getElementById('brandProduct');
  if(pn) pn.textContent=SETTINGS.productName;
  const sc=document.getElementById('sidebarCredit');
  if(sc) sc.innerHTML=`Powered by Acceleration Point<br>accelerationpoint.com`;
  document.title=`${SETTINGS.productName} — Sponsorship & Grants`;
}

loadSettings();loadState();applyBranding();setRole('requester');
