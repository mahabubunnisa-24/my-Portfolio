const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");
const yearEl = document.getElementById("year");

// Mobile menu: open and close the navigation
if (menuBtn && nav) {
  menuBtn.addEventListener("click", function () {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after tapping a link
  nav.addEventListener("click", function (event) {
    if (event.target.tagName === "A") {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}

// Footer: show the current year automatically
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Highlight the nav link of the section you are viewing
const links = document.querySelectorAll("#nav a");
const sections = [];

links.forEach(function (link) {
  const section = document.querySelector(link.getAttribute("href"));
  if (section) sections.push(section);
});

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          links.forEach(function (link) {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}