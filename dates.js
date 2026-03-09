// dates.js — Lógica de datas para o site de formatura
// Curso: Ciências Contábeis | Elaborado por Vítor do Mar

const INICIO = new Date(2026, 1, 9);   // 09 fev 2026
const FIM    = new Date(2026, 11, 12); // 12 dez 2026

function calcular() {
  const hoje  = new Date();
  const hojeZ = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());

  const totalMs   = FIM - INICIO;
  const cursadoMs = Math.max(0, hojeZ - INICIO);
  const restaMs   = Math.max(0, FIM - hojeZ);

  const totalDias   = Math.round(totalMs   / 86400000);
  const cursadoDias = Math.min(Math.round(cursadoMs / 86400000), totalDias);
  const restaDias   = Math.round(restaMs   / 86400000);
  const semanasResta = Math.ceil(restaDias / 7);
  const pct         = Math.min(100, Math.round((cursadoDias / totalDias) * 1000) / 10);

  const opts = { day: '2-digit', month: 'long', year: 'numeric' };

  document.getElementById('dataFormatura').textContent =
    'Formatura: ' + FIM.toLocaleDateString('pt-BR', opts);
  document.getElementById('diasRestantes').textContent  = restaDias;
  document.getElementById('pctTexto').textContent       = pct.toFixed(1) + '%';
  document.getElementById('diasCursados').textContent   = cursadoDias;
  document.getElementById('diasTotal').textContent      = totalDias;
  document.getElementById('semanasRestantes').textContent = semanasResta;
  document.getElementById('hoje').textContent =
    hojeZ.toLocaleDateString('pt-BR', opts);

  // Anima a barra de progresso
  setTimeout(() => {
    document.getElementById('progressBar').style.width = pct + '%';
  }, 900);
}

// Cache-busting: força ?v=AAAAMMDD na URL para sempre buscar versão fresh
function cacheBust() {
  const hoje = new Date();
  const v = hoje.getFullYear().toString() +
            String(hoje.getMonth() + 1).padStart(2, '0') +
            String(hoje.getDate()).padStart(2, '0');
  const url = new URL(window.location.href);
  if (url.searchParams.get('v') !== v) {
    url.searchParams.set('v', v);
    window.location.replace(url.toString());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  cacheBust();
  calcular();
});
