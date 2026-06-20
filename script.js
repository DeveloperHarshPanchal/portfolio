// =========================
// Popup
// =========================

const openBtn = document.getElementById("openPopup");
const overlay = document.getElementById("popupOverlay");
const closeBtn = document.getElementById("closePopup");

if (openBtn) {
  openBtn.addEventListener("click", (e) => {
    e.preventDefault();
    overlay.style.display = "flex";
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
  });
}

overlay?.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});

// =========================
// Mobile Menu
// =========================

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuIcon.classList.remove("bx-x");
  });
});

// =========================
// Active Navbar
// =========================

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });

      document
        .querySelector("header nav a[href*=" + id + "]")
        ?.classList.add("active");
    }
  });

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// =========================
// Scroll Reveal
// =========================

ScrollReveal({
  reset: false,
  distance: "80px",
  duration: 1800,
  delay: 200,
});

ScrollReveal().reveal(".home-content,.heading", {
  origin: "top",
});

ScrollReveal().reveal(
  ".home-img,.skills-columns,.timeline-items,.services-container,.portfolio-container,.contact",
  {
    origin: "bottom",
  },
);

ScrollReveal().reveal(".about-img", {
  origin: "left",
});

ScrollReveal().reveal(".about-content", {
  origin: "right",
});

// =========================
// Typed.js
// =========================

new Typed(".multiple-text", {
  strings: [
    "Web Developer",
    "MERN Stack Developer",
    "Frontend Developer",
    "Full-Stack Developer",
  ],
  typeSpeed: 90,
  backSpeed: 70,
  backDelay: 1200,
  loop: true,
});

// =========================
// Contact Form
// =========================

const form = document.querySelector(".contact-form");
const emailInput = document.querySelector("input[name='email']");
const errorMsg = document.querySelector(".error-msg");
const statusDiv = document.getElementById("form-status");

form?.addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(email)) {
    errorMsg.textContent = "Please enter a valid email";
    return;
  }

  errorMsg.textContent = "";

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
    });

    if (response.ok) {
      statusDiv.textContent = "✅ Message Sent Successfully";
      statusDiv.classList.add("success");
      form.reset();
    } else {
      statusDiv.textContent = "❌ Failed to send";
      statusDiv.classList.add("error");
    }
  } catch (err) {
    statusDiv.textContent = "❌ Something went wrong";
  }

  statusDiv.style.opacity = "1";

  setTimeout(() => {
    statusDiv.style.opacity = "0";
  }, 4000);
});

// ====================================================
// THREE.JS GLASS BACKGROUND (Floating Particles)
// ====================================================

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.zIndex = "-1";

document.body.appendChild(renderer.domElement);

// ======================
// PARTICLES
// ======================

const particlesGeometry = new THREE.BufferGeometry();

const count = 2000;

const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3),
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.15,
  color: 0x00ffff,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);

scene.add(particles);

// ======================
// Mouse Interaction
// ======================

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// ======================
// Animation
// ======================

function animate() {
  requestAnimationFrame(animate);

  particles.rotation.y += 0.0008;
  particles.rotation.x += 0.0003;

  camera.position.x += (mouseX * 0.0005 - camera.position.x) * 0.03;
  camera.position.y += (-mouseY * 0.0005 - camera.position.y) * 0.03;

  renderer.render(scene, camera);
}

animate();

// ======================
// Responsive
// ======================

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
