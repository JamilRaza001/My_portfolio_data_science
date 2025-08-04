/* scripts.js */

// Create animated background particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    const size = Math.random() * 4 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 15 + "s";
    particle.style.animationDuration = Math.random() * 10 + 10 + "s";

    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
createParticles();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Enhanced scroll effects with parallax
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  const scrolled = window.scrollY;

  navbar.classList.toggle("scrolled", scrolled > 50);

  document.querySelectorAll(".hero, #particles").forEach((el) => {
    const speed = el.id === "particles" ? 0.2 : 0.5;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Fade-in observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), idx * 100);
    }
  });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

// Typing effect for subtitle
const subtitleEl = document.querySelector(".hero .subtitle");
const roles = ["Data Scientist", "AI Engineer", "Data Analyst", "ML Engineer", "Analytics Expert"];
let roleIndex = 0;

function typeRole() {
  const role = roles[roleIndex];
  const staticText = " • AI Engineer • Data Analyst";
  let i = 0;
  subtitleEl.textContent = "";

  const typing = setInterval(() => {
    subtitleEl.innerHTML = `<span style=\"color:#4ecdc4; font-weight:600;\">${role.slice(0, i + 1)}</span>${staticText}`;
    i++;
    if (i === role.length) {
      clearInterval(typing);
      setTimeout(() => {
        subtitleEl.style.opacity = "0.7";
        setTimeout(() => {
          subtitleEl.style.opacity = "1";
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeRole, 500);
        }, 500);
      }, 2500);
    }
  }, 80);
}

setTimeout(typeRole, 3000);

// Mousemove parallax effect
document.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero");
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  hero.style.transform += ` translate(${x}px, ${y}px)`;
});

// Timeline animations
const timelineItems = document.querySelectorAll(".timeline-item");
timelineItems.forEach((item, idx) => {
  item.style.opacity = "0";
  item.style.transform = idx % 2 === 0 ? "translateX(-50px)" : "translateX(50px)";
  item.style.transition = "all 0.6s ease";
  new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateX(0)";
      }
    });
  }, { threshold: 0.3 }).observe(item);
});
