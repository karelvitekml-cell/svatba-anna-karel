(function(){
  // Countdown to 2026-30-05 11:00 (Europe/Prague)
 <script>
const weddingDate = new Date("May 30, 2026 11:00:00").getTime();

const timer = setInterval(function() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").innerText = days;
  document.getElementById("hours").innerText = hours;
  document.getElementById("minutes").innerText = minutes;
  document.getElementById("seconds").innerText = seconds;

  if (distance < 0) {
    clearInterval(timer);
    document.getElementById("countdown").innerHTML = "<h3>Je to tady! 💍</h3>";
  }
}, 1000);
</script>
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
.map-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}
  // load draft if exists
  try{
    const draft = JSON.parse(localStorage.getItem('rsvpDraft')||'null');
    if(draft){ Object.entries(draft).forEach(([k,v])=>{ const el = document.getElementById(k); if(el) el.value = v; }); msg.textContent='Načten koncept odpovědi.'; }
  }catch(e){}
})();
