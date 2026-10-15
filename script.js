
/* =========================================
   SORVETES ARTESANAIS GUANDELINI
   JavaScript principal
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // =====================================
  // 1. CONFIGURAÇÕES
  // =====================================

  // Número da sorveteria com código do Brasil e DDD.
  // Confirme se este é o número correto antes de publicar.
  const WHATSAPP_NUMBER = "5543999205777";

  // =====================================
  // 2. MENU MOBILE
  // =====================================

  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector("#main-nav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    mainNav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    // Fecha o menu depois de clicar em um link.
    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    // Fecha o menu ao pressionar Escape.
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Fecha o menu quando a tela muda para desktop.
    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) {
        closeMenu();
      }
    });

    // Fecha o menu ao clicar fora dele.
    document.addEventListener("click", (event) => {
      const clickedInsideMenu = mainNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    });
  }

  // =====================================
  // 3. LINKS DO WHATSAPP
  // =====================================

  const whatsappLinks = document.querySelectorAll("[data-whatsapp]");

  whatsappLinks.forEach((link) => {
    const customMessage = link.dataset.message;

    const defaultMessage =
      "Olá! Conheci o site da Sorvetes Artesanais Guandelini " +
      "e gostaria de saber mais sobre os produtos.";

    const message = customMessage || defaultMessage;

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    link.href = whatsappURL;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  // =====================================
  // 4. ANIMAÇÕES AO ROLAR A PÁGINA
  // =====================================

  const revealElements = document.querySelectorAll(".reveal");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    document.documentElement.classList.add("js-enabled");

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    // Mantém o conteúdo visível em navegadores sem suporte
    // ou quando o usuário prefere movimento reduzido.
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // =====================================
  // 5. ANO AUTOMÁTICO NO RODAPÉ
  // =====================================

  const yearElement = document.querySelector("#year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // =====================================
  // 6. DESTAQUE DOS LINKS DE NAVEGAÇÃO
  // =====================================

  const sectionLinks = document.querySelectorAll(
    '.main-nav a[href^="#"]:not(.button)'
  );

  const sections = Array.from(sectionLinks)
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          sectionLinks.forEach((link) => {
            const isCurrent =
              link.getAttribute("href") === `#${entry.target.id}`;

            if (isCurrent) {
              link.setAttribute("aria-current", "location");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0
      }
    );

    sections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }

  // =====================================
  // 7. ANO E INICIALIZAÇÃO CONCLUÍDOS
  // =====================================

  console.log("Site Guandelini carregado com sucesso!");
});

