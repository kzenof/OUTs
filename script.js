(() => {
  const initVkPlaylist = () => {
    if (!window.VK || !VK.Widgets || !VK.Widgets.Playlist) return false;
    const id = "vk_playlist_-2000124572_28124572";
    if (!document.getElementById(id)) return false;
    if (document.getElementById(id).dataset.ready === "1") return true;
    VK.Widgets.Playlist(id, -2000124572, 28124572, "433b63af81331a929a");
    document.getElementById(id).dataset.ready = "1";
    return true;
  };

  const waitVk = () => {
    if (initVkPlaylist()) return;
    let tries = 0;
    const timer = setInterval(() => {
      tries += 1;
      if (initVkPlaylist() || tries > 40) clearInterval(timer);
    }, 150);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", waitVk);
  } else {
    waitVk();
  }
  const reveals = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = lightbox?.querySelector(".lightbox__img");
  const closeBtn = lightbox?.querySelector(".lightbox__close");

  const openLightbox = (src, alt) => {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    if (!lightbox || !lightboxImg) return;
    lightbox.hidden = true;
    lightboxImg.removeAttribute("src");
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".gallery__item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.full;
      const img = btn.querySelector("img");
      openLightbox(src, img?.alt);
    });
  });

  closeBtn?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
  });

  const nav = document.querySelector(".nav");
  let lastY = window.scrollY;

  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (!nav) return;
      nav.style.borderBottomColor =
        y > 12 ? "rgba(236, 234, 230, 0.18)" : "rgba(236, 234, 230, 0.12)";
      lastY = y;
    },
    { passive: true }
  );
})();
