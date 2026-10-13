// Configuração: número do WhatsApp com DDI e DDD, só dígitos. Ex.: "5511987654321".
// Enquanto estiver vazio, os botões levam ao formulário de contato em vez do WhatsApp.
const WHATSAPP_NUMERO = "5511966376200"; // provisório: trocar pelo número profissional

function linkWhats(mensagem) {
  return "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(mensagem);
}

if (WHATSAPP_NUMERO) {
  document.querySelectorAll(".js-whats").forEach((a) => {
    a.href = linkWhats(a.dataset.msg || "Oi Bernardo, quero um orçamento de tour FPV.");
    a.target = "_blank";
    a.rel = "noopener";
  });
}

const form = document.getElementById("form-orcamento");
const erro = document.getElementById("form-erro");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nome = form.nome.value.trim();
  const cidade = form.cidade.value.trim();
  if (!nome || !cidade) {
    erro.hidden = false;
    (nome ? form.cidade : form.nome).focus();
    return;
  }
  erro.hidden = true;
  const msg = `Oi Bernardo, sou ${nome}. Quero um orçamento de tour FPV.\nImóvel: ${form.tipo.value}\nCidade: ${cidade}`;
  if (WHATSAPP_NUMERO) {
    window.open(linkWhats(msg), "_blank", "noopener");
  } else {
    erro.textContent = "O WhatsApp ainda não foi configurado neste site.";
    erro.hidden = false;
  }
});

// O vídeo do hero só toca quando está na tela e para se a pessoa preferir menos movimento.
const heroVideo = document.querySelector(".hero__video video");
if (heroVideo) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    heroVideo.removeAttribute("autoplay");
    heroVideo.pause();
  } else if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entrada]) => {
      entrada.isIntersecting ? heroVideo.play().catch(() => {}) : heroVideo.pause();
    }).observe(heroVideo);
  }
}
