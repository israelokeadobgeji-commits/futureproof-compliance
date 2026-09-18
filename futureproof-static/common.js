const FP = {
  phone1: "+234 815 158 2701",
  phone2: "+234 816 918 0353",
  whatsapp: "2348169180353",
  email: "futureproofcompliance701@gmail.com"
};
function wa(message){return `https://wa.me/${FP.whatsapp}?text=${encodeURIComponent(message)}`}
function mail(subject, body){return `mailto:${FP.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}
document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.getElementById('menuBtn'), nav=document.getElementById('mainNav');
  if(btn&&nav) btn.addEventListener('click',()=>nav.classList.toggle('open'));
  document.querySelectorAll('[data-wa]').forEach(a=>a.href=wa(a.dataset.wa));
  document.querySelectorAll('[data-mail-subject]').forEach(a=>a.href=mail(a.dataset.mailSubject,a.dataset.mailBody||''));
});
