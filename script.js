(function(){
  // Countdown to 2026-30-05 11:00 (Europe/Prague)
 const weddingDate = new Date("May 30, 2026 11:00:00").getTime();
  function update(){
    const now = Date.now();
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / (1000*60*60*24));
    diff -= days * (1000*60*60*24);
    const hours = Math.floor(diff / (1000*60*60));
    diff -= hours * (1000*60*60);
    const minutes = Math.floor(diff / (1000*60));
    diff -= minutes * (1000*60);
    const seconds = Math.floor(diff / 1000);
    document.getElementById('days').textContent = String(days);
    document.getElementById('hours').textContent = String(hours).padStart(2,'0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2,'0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2,'0');
  }
  update(); setInterval(update, 1000);

  // RSVP: save to localStorage (simple)
  const form = document.getElementById('rsvpForm');
  const msg = document.getElementById('rsvpMsg');
  const saveBtn = document.getElementById('saveLocal');
  function serialize(f){ const fd = new FormData(f); const o={}; for(const [k,v] of fd) o[k]=v; return o; }
  form && form.addEventListener('submit', function(e){
    e.preventDefault();
    const data = serialize(form);
    const list = JSON.parse(localStorage.getItem('rsvpList')||'[]');
    list.push({...data, ts: new Date().toISOString()});
    localStorage.setItem('rsvpList', JSON.stringify(list));
    msg.textContent = 'Děkujeme! Vaše odpověď byla uložena.';
    form.reset();
  });
  saveBtn && saveBtn.addEventListener('click', function(){ const data = serialize(form); localStorage.setItem('rsvpDraft', JSON.stringify(data)); msg.textContent='Uloženo jako koncept.'; });

  // load draft if exists
  try{
    const draft = JSON.parse(localStorage.getItem('rsvpDraft')||'null');
    if(draft){ Object.entries(draft).forEach(([k,v])=>{ const el = document.getElementById(k); if(el) el.value = v; }); msg.textContent='Načten koncept odpovědi.'; }
  }catch(e){}
})();
