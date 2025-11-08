document.addEventListener("DOMContentLoaded", function () {
  // === INICIALIZA EMAILJS ===
  emailjs.init("QmeDwbnnX-cd0FPQr");

  // TYPED COM LOOP
  const typed = document.querySelector(".typed-text");
  if (typed) {
    new Typed(typed, {
      strings: ["Luiz Cauã", "Desenvolvedor Front-end"],
      typeSpeed: 100,
      backSpeed: 70,
      backDelay: 1000,
      loop: true,
      showCursor: true,
      cursorChar: "|"
    });
  }

  // ANO ATUAL
  document.getElementById("year").textContent = new Date().getFullYear();

  // TEMA
  const toggle = document.getElementById("theme-toggle");
  const body = document.body;
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    body.classList.add("dark-mode");
    toggle.checked = true;
  }
  toggle.addEventListener("change", () => {
    const isDark = toggle.checked;
    body.classList.toggle("dark-mode", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  // BOTÃO VOLTAR AO TOPO
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("hidden", window.scrollY < 300);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // === FORMULÁRIO ===
  const form = document.getElementById("contact-form");
  const message = document.querySelector(".form-message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach(input => {
      const error = input.parentElement.querySelector(".error");
      if (!input.value.trim()) {
        error.textContent = "Campo obrigatório.";
        valid = false;
      } else if (input.type === "email" && !/\S+@\S+\.\S+/.test(input.value)) {
        error.textContent = "E-mail inválido.";
        valid = false;
      } else {
        error.textContent = "";
      }
    });

    if (valid) {
      const templateParams = {
        from_name: document.getElementById("nome").value,
        from_email: document.getElementById("email").value,
        message: document.getElementById("mensagem").value,
      };

      emailjs.send("service_cp6b9op", "template_wzm1n3q", templateParams)
        .then(() => {
          message.textContent = "Enviado com sucesso! Cheque seu Gmail.";
          message.style.color = "#51cf66";
          form.reset();
          setTimeout(() => message.textContent = "", 5000);
        }, (error) => {
          message.textContent = "Erro ao enviar. Tente novamente.";
          message.style.color = "#ff6b6b";
          console.error("Erro EmailJS:", error);
        });
    }
  });
});