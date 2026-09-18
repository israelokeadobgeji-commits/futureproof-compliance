const BUSINESS = {
  whatsapp: '2348169180353',
  name: 'FUTUREPROOF'
};
const wa = (message) => `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;

document.getElementById('registerHero').href = wa('Hello FUTUREPROOF, I want to register my business and become compliant. Please guide me through the registration process.');
document.getElementById('discoveryBtn').href = wa('Hello FUTUREPROOF, I would like to schedule the free 15-minute discovery call.');
document.getElementById('startupBtn').href = wa('Hello FUTUREPROOF, I would like to request the Startup Compliance & Tax Strategy Session.');
document.getElementById('corporateBtn').href = wa('Hello FUTUREPROOF, I would like to request the Corporate Advisory & Tax Regularisation Session.');
document.getElementById('contactBtn').href = wa('Hello FUTUREPROOF, I would like to speak with your team about business compliance.');

const menuBtn = document.getElementById('menuBtn');
const mainNav = document.getElementById('mainNav');
menuBtn.addEventListener('click',()=>mainNav.classList.toggle('open'));
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mainNav.classList.remove('open')));

const steps = [
  {title:'Let’s check your business',subtitle:'Start with your registration details.',fields:[
    {name:'businessName',label:'Registered business name',type:'text',required:true,placeholder:'Enter registered business name'},
    {name:'cacNumber',label:'CAC registration number',type:'text',required:true,placeholder:'BN / RC / IT number'},
    {name:'businessType',label:'Business type',type:'choice',required:true,options:['Business Name','Limited Liability Company','Incorporated Trustees','Other']},
    {name:'registrationDate',label:'Date registered',type:'date'}
  ]},
  {title:'Tell us about your business',subtitle:'This helps us make the assessment more relevant.',fields:[
    {name:'industry',label:'Industry / sector',type:'text',required:true},
    {name:'state',label:'State of operation',type:'text',required:true},
    {name:'lga',label:'LGA',type:'text'},
    {name:'employees',label:'Number of employees',type:'select',options:['0','1–5','6–20','21–50','51+']},
    {name:'turnover',label:'Estimated turnover range',type:'select',options:['Below ₦25m','₦25m–₦100m','₦100m–₦500m','Above ₦500m','Prefer not to say']}
  ]},
  {title:'Let’s check your tax position',subtitle:'Answer based on what you currently know.',fields:[
    {name:'tin',label:'Do you have a Tax Identification Number?',type:'choice',required:true,options:['Yes','No','Not Sure']},
    {name:'taxRegistered',label:'Are your relevant tax registrations in place?',type:'choice',required:true,options:['Yes','No','Not Sure']},
    {name:'taxCurrent',label:'Are your current tax obligations up to date?',type:'choice',required:true,options:['Yes','No','Not Sure']}
  ]},
  {title:'CAC and post-registration compliance',subtitle:'Tell us about your ongoing corporate compliance.',fields:[
    {name:'annualReturns',label:'Are your CAC annual returns up to date?',type:'choice',required:true,options:['Yes','No','Not Sure','Not Applicable']},
    {name:'cacRecords',label:'Are your CAC records and business information up to date?',type:'choice',required:true,options:['Yes','No','Not Sure']}
  ]},
  {title:'Licences, permits and brand protection',subtitle:'Some requirements depend on your industry and activities.',fields:[
    {name:'regulated',label:'Does your business operate in a regulated industry?',type:'choice',required:true,options:['Yes','No','Not Sure']},
    {name:'licenses',label:'Are required licences / permits current?',type:'choice',required:true,options:['Yes','No','Not Sure','Not Applicable']},
    {name:'trademark',label:'How is your brand protected?',type:'choice',required:true,options:['Trademark Registered','Application In Progress','Not Registered','Not Sure']}
  ]},
  {title:'Employees and documentation',subtitle:'Final checks before your result.',fields:[
    {name:'hasEmployees',label:'Do you have employees?',type:'choice',required:true,options:['Yes','No']},
    {name:'hrDocs',label:'Are your basic employee / HR records in place?',type:'choice',options:['Yes','No','Not Sure']},
    {name:'documents',label:'Are your key business and compliance documents organized and accessible?',type:'choice',required:true,options:['Yes','No','Not Sure']}
  ]}
];

const modal = document.getElementById('assessmentModal');
const stepContent = document.getElementById('stepContent');
const stepCounter = document.getElementById('stepCounter');
const progressBar = document.getElementById('progressBar');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const formView = document.getElementById('assessmentFormView');
const resultsView = document.getElementById('resultsView');
let step = 0; let answers = {};

document.querySelectorAll('[data-open-assessment]').forEach(b=>b.addEventListener('click',openAssessment));
document.getElementById('closeAssessment').addEventListener('click',closeAssessment);
modal.addEventListener('click',e=>{if(e.target===modal) closeAssessment();});
backBtn.addEventListener('click',()=>{if(step>0){step--;renderStep();}});
nextBtn.addEventListener('click',()=>{if(!validateStep())return;if(step<steps.length-1){step++;renderStep();}else showResults();});

function openAssessment(){ modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; renderStep(); }
function closeAssessment(){ modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.style.overflow=''; step=0; answers={}; formView.hidden=false; resultsView.hidden=true; }

function renderStep(){
  const current=steps[step]; stepCounter.textContent=`${step+1}/${steps.length}`; progressBar.style.width=`${((step+1)/steps.length)*100}%`;
  backBtn.disabled=step===0; nextBtn.textContent=step===steps.length-1?'See My Result →':'Continue →';
  stepContent.innerHTML=`<span class="eyebrow dark">STEP ${step+1}</span><h2 class="step-title">${current.title}</h2><p class="step-sub">${current.subtitle}</p><div class="form-grid" id="fields"></div>`;
  const holder=document.getElementById('fields');
  current.fields.forEach(field=>{
    if(field.name==='hrDocs' && answers.hasEmployees==='No') return;
    const wrap=document.createElement('div'); wrap.className='field';
    wrap.innerHTML=`<label>${field.label}${field.required?' *':''}</label>`;
    if(field.type==='choice'){
      const grid=document.createElement('div'); grid.className='choice-grid';
      field.options.forEach(opt=>{const btn=document.createElement('button');btn.type='button';btn.className='choice'+(answers[field.name]===opt?' selected':'');btn.textContent=opt;btn.onclick=()=>{answers[field.name]=opt;renderStep();};grid.appendChild(btn)});wrap.appendChild(grid);
    }else if(field.type==='select'){
      const s=document.createElement('select');s.innerHTML='<option value="">Select an option</option>'+field.options.map(o=>`<option ${answers[field.name]===o?'selected':''}>${o}</option>`).join('');s.onchange=e=>answers[field.name]=e.target.value;wrap.appendChild(s);
    }else{
      const i=document.createElement('input');i.type=field.type;i.value=answers[field.name]||'';i.placeholder=field.placeholder||'';i.oninput=e=>answers[field.name]=e.target.value;wrap.appendChild(i);
    } holder.appendChild(wrap);
  });
}
function validateStep(){const required=steps[step].fields.filter(f=>f.required && !(f.name==='hrDocs'&&answers.hasEmployees==='No'));const missing=required.find(f=>!answers[f.name]);if(missing){alert(`Please complete: ${missing.label}`);return false;}return true;}

function statusFrom(v,{na=false}={}){if(na&&v==='Not Applicable')return'na';if(v==='Yes'||v==='Trademark Registered')return'ok';if(v==='Application In Progress')return'warn';if(v==='No'||v==='Not Registered')return'bad';return'warn';}
function assess(){
  const areas=[
    {id:'registration',title:'Business Registration',status:answers.cacNumber?'ok':'bad'},
    {id:'cac',title:'CAC Compliance',status:statusFrom(answers.cacRecords)},
    {id:'annual',title:'Annual Returns',status:statusFrom(answers.annualReturns,{na:true})},
    {id:'tax',title:'Tax Compliance',status:[answers.tin,answers.taxRegistered,answers.taxCurrent].some(v=>v==='No')?'bad':[answers.tin,answers.taxRegistered,answers.taxCurrent].some(v=>v==='Not Sure')?'warn':'ok'},
    {id:'licenses',title:'Licences & Permits',status:statusFrom(answers.licenses,{na:true})},
    {id:'trademark',title:'Trademark / Brand Protection',status:statusFrom(answers.trademark)},
    {id:'documentation',title:'Business Documentation',status:statusFrom(answers.documents)},
    {id:'hr',title:'HR Compliance',status:answers.hasEmployees==='No'?'na':statusFrom(answers.hrDocs)}
  ];
  const weights={ok:1,warn:.55,bad:.15,na:null}; let earned=0,total=0;areas.forEach(a=>{if(weights[a.status]!==null){earned+=weights[a.status];total++;}});const score=Math.round((earned/Math.max(total,1))*100);return{areas,score,priorities:areas.filter(a=>a.status==='bad'||a.status==='warn')};
}
const meta={ok:['Complete','ok','●'],warn:['Attention Needed','warn','●'],bad:['Action Required','bad','●'],na:['Not Assessed / N/A','', '○']};
const detail={annual:'Your responses indicate that your annual returns position may need attention.',tax:'Review your tax registration and current obligations to confirm what may be outstanding.',trademark:'Review your brand protection status and whether trademark registration is appropriate.',cac:'Review ongoing CAC obligations and the accuracy of your corporate records.',licenses:'Check whether licences or permits apply to your industry and whether they are current.',documentation:'Organize and verify your key business and compliance documents.',hr:'Review basic employment documentation and records where you have employees.',registration:'Review your business registration information.'};
function showResults(){
  const result=assess();formView.hidden=true;resultsView.hidden=false;
  resultsView.innerHTML=`<div class="result-top"><span class="eyebrow dark">YOUR FUTUREPROOF SCORE</span><div class="result-score">${result.score}<span>/100</span></div><h2>${answers.businessName||'Your business'} appears to have ${result.priorities.length?'some compliance areas that require attention.':'a strong compliance position based on your answers.'}</h2><p>This is an informational assessment based only on the information you provided.</p></div><h3>Compliance overview</h3><div>${result.areas.map(a=>`<div class="status-row"><span>${a.title}</span><b class="${meta[a.status][1]}">${meta[a.status][2]} ${meta[a.status][0]}</b></div>`).join('')}</div><h3 style="margin-top:28px">What’s next for your business?</h3>${result.priorities.length?result.priorities.map(a=>`<div class="priority"><b class="${meta[a.status][1]}">${meta[a.status][0]}</b><h4>${a.title}</h4><p>${detail[a.id]}</p><a class="btn btn-dark" target="_blank" rel="noopener" href="${wa(`Hello FUTUREPROOF, I completed the Business Compliance Assessment for ${answers.businessName||'my business'} and need assistance with ${a.title}.`)}">Let FUTUREPROOF Handle It ↗</a></div>`).join(''):'<p>No immediate issue was identified from your responses. You can still request a professional compliance review.</p>'}<div class="disclaimer"><strong>Important:</strong> Your FUTUREPROOF Score is an informational assessment based on the information you provide. It is not an official government compliance rating or legal/tax opinion. Requirements may vary depending on your business activities, location and circumstances.</div><button class="btn btn-outline full" id="closeResults">Close Assessment</button>`;
  document.getElementById('closeResults').onclick=closeAssessment;
}
