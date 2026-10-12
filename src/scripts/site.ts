function initUtilityBar() {
  const items = Array.from(document.querySelectorAll<HTMLElement>("[data-utility-item]"));
  if (items.length < 2) return;
  let index = 0;
  window.setInterval(() => {
    items[index]?.classList.remove("is-active");
    index = (index + 1) % items.length;
    items[index]?.classList.add("is-active");
  }, 4000);
}

function initNav() {
  const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
  const nav = document.querySelector<HTMLElement>("[data-site-nav]");
  if (!toggle || !nav) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });
}

function initAutoCarousels() {
  document.querySelectorAll<HTMLElement>("[data-carousel-auto]").forEach((root) => {
    const track = root.querySelector<HTMLElement>("[data-carousel-auto-track]");
    if (!track) return;
    const count = Number(track.dataset.count) || 0;
    const slides = Array.from(track.children) as HTMLElement[];
    if (count < 2 || slides.length < count * 2) return;

    const delay = Number(root.dataset.autoplay) || 5000;
    let index = 0;
    let timer = 0;
    let paused = false;

    const getStep = () => {
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      return slides[0].getBoundingClientRect().width + gap;
    };

    const place = (animate: boolean) => {
      track.style.transition = animate ? "" : "none";
      track.style.transform = `translateX(-${index * getStep()}px)`;
      if (!animate) void track.offsetWidth;
    };

    const go = (delta: number) => {
      if (delta < 0 && index === 0) {
        index = count;
        place(false);
      }
      index += delta;
      place(true);
    };

    track.addEventListener("transitionend", () => {
      if (index >= count) {
        index -= count;
        place(false);
      }
    });

    const restart = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        if (!paused) go(1);
      }, delay);
    };

    root.querySelector("[data-carousel-auto-prev]")?.addEventListener("click", () => {
      go(-1);
      restart();
    });
    root.querySelector("[data-carousel-auto-next]")?.addEventListener("click", () => {
      go(1);
      restart();
    });
    root.addEventListener("mouseenter", () => (paused = true));
    root.addEventListener("mouseleave", () => (paused = false));

    let startX = 0;
    track.addEventListener("pointerdown", (event) => (startX = event.clientX), { passive: true });
    track.addEventListener(
      "pointerup",
      (event) => {
        const dx = event.clientX - startX;
        if (Math.abs(dx) < 40) return;
        go(dx < 0 ? 1 : -1);
        restart();
      },
      { passive: true },
    );

    window.addEventListener("resize", () => place(false));
    place(false);
    restart();
  });
}

function initCarousel() {
  const root = document.querySelector<HTMLElement>("[data-carousel]");
  const track = document.querySelector<HTMLElement>("[data-carousel-track]");
  if (!root || !track) return;

  const prev = document.querySelector<HTMLButtonElement>("[data-carousel-prev]");
  const next = document.querySelector<HTMLButtonElement>("[data-carousel-next]");
  const dotsRoot = document.querySelector<HTMLElement>("[data-carousel-dots]");
  const single = root.dataset.carouselMode === "single";
  const total = track.children.length;
  let index = 0;

  const getStep = () => {
    const card = track.querySelector<HTMLElement>(".testimonial-card");
    if (!card) return root.clientWidth;
    const styles = getComputedStyle(track);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    return card.getBoundingClientRect().width + gap;
  };

  const getMaxIndex = () => {
    if (single) return Math.max(0, total - 1);
    const card = track.querySelector<HTMLElement>(".testimonial-card");
    if (!card) return 0;
    const visible = Math.max(1, Math.round(root.clientWidth / card.getBoundingClientRect().width));
    return Math.max(0, total - visible);
  };

  const renderDots = () => {
    if (!dotsRoot) return;
    dotsRoot.innerHTML = "";
    const max = getMaxIndex();
    for (let i = 0; i <= max; i += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Vai alla recensione ${i + 1}`);
      button.classList.toggle("is-active", i === index);
      button.addEventListener("click", () => {
        index = i;
        render();
      });
      dotsRoot.appendChild(button);
    }
  };

  const render = () => {
    index = Math.min(Math.max(0, index), getMaxIndex());
    track.style.transform = `translateX(-${index * getStep()}px)`;
    renderDots();
  };

  prev?.addEventListener("click", () => {
    index = index <= 0 ? getMaxIndex() : index - 1;
    render();
  });

  next?.addEventListener("click", () => {
    index = index >= getMaxIndex() ? 0 : index + 1;
    render();
  });

  window.addEventListener("resize", render);
  render();

  if (single && total > 1) {
    window.setInterval(() => {
      index = index >= getMaxIndex() ? 0 : index + 1;
      render();
    }, 6000);
  }
}

function initDiscountPopup() {
  const popup = document.querySelector<HTMLElement>("[data-discount-popup]");
  if (!popup) return;

  const storageKey = "amodotuo-discount-seen";
  const openers = document.querySelectorAll<HTMLElement>("[data-open-discount], a[href='#sconto']");

  const open = () => {
    popup.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const close = () => {
    popup.hidden = true;
    document.body.style.overflow = "";
    localStorage.setItem(storageKey, "1");
  };

  openers.forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      open();
    });
  });

  popup.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("[data-discount-close]")) close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !popup.hidden) close();
  });

  if (!localStorage.getItem(storageKey)) open();
}

function initCookieBanner() {
  const banner = document.querySelector<HTMLElement>("[data-cookie-banner]");
  if (!banner) return;
  const storageKey = "amodotuo-cookie-consent";
  if (localStorage.getItem(storageKey)) return;

  banner.hidden = false;
  const categories = banner.querySelector<HTMLElement>("[data-cookie-categories]");
  const save = banner.querySelector<HTMLElement>("[data-cookie-choice='save']");

  banner.querySelector("[data-cookie-preferences]")?.addEventListener("click", () => {
    if (categories) categories.hidden = !categories.hidden;
    if (save) save.hidden = !save.hidden;
  });

  banner.querySelectorAll<HTMLElement>("[data-cookie-choice]").forEach((button) => {
    button.addEventListener("click", () => {
      const choice = button.dataset.cookieChoice;
      const accepted =
        choice === "accept"
          ? ["preferences", "statistics", "marketing"]
          : choice === "save"
            ? Array.from(banner.querySelectorAll<HTMLInputElement>("input:checked")).map((input) => input.name)
            : [];
      localStorage.setItem(storageKey, JSON.stringify({ functional: true, accepted }));
      banner.hidden = true;
    });
  });
}

function initForms() {
  document.querySelectorAll<HTMLFormElement>("[data-local-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector<HTMLElement>("[data-form-status]");
      const message = form.dataset.success || "Invio completato.";
      if (status) {
        status.textContent = message;
        status.classList.add("is-visible");
      }
      form.reset();
    });
  });
}

initUtilityBar();
initNav();
initAutoCarousels();
initCarousel();
initDiscountPopup();
initCookieBanner();
initForms();
