document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = [...document.querySelectorAll("header[id],section[id]")];
  function updateNav() {
    let pos = window.scrollY + 140;
    let current = "home";
    sections.forEach((s) => {
      if (pos >= s.offsetTop) current = s.id;
    });
    navLinks.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === "#" + current),
    );
  }
  window.addEventListener("scroll", updateNav);
  updateNav();

  const backTop = document.getElementById("backTop");
  window.addEventListener("scroll", () =>
    backTop.classList.toggle("show", window.scrollY > 500),
  );
  backTop.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );

  document.querySelectorAll(".filter-btn").forEach((btn) =>
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll(".project-item").forEach((item) => {
        item.classList.toggle(
          "hide",
          filter !== "all" && item.dataset.category !== filter,
        );
      });
    }),
  );

  const counters = document.querySelectorAll(".counter");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.done) {
          entry.target.dataset.done = "1";
          const target = +entry.target.dataset.target;
          let n = 0;
          const step = Math.max(1, Math.ceil(target / 40));
          const timer = setInterval(() => {
            n += step;
            if (n >= target) {
              n = target;
              clearInterval(timer);
            }
            entry.target.textContent = n;
          }, 30);
        }
      });
    },
    { threshold: 0.5 },
  );
  counters.forEach((c) => observer.observe(c));

  document.getElementById("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert(
      "Thank you! Please contact me directly by email: shawonmondol709@gmail.com",
    );
    e.target.reset();
  });
  document.querySelectorAll("#mainNav .nav-link").forEach((a) =>
    a.addEventListener("click", () => {
      const nav = document.getElementById("mainNav");
      if (nav.classList.contains("show"))
        bootstrap.Collapse.getOrCreateInstance(nav).hide();
    }),
  );
  document.getElementById("year").textContent = new Date().getFullYear();
});
