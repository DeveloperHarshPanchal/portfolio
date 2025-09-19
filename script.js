const openBtn = document.getElementById("openPopup");
const overlay = document.getElementById("popupOverlay");
const closeBtn = document.getElementById("closePopup");

openBtn.addEventListener("click", (e) => {
  e.preventDefault();
  overlay.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

// Close popup if user clicks outside the box
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});
// toggle icon navbar
let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};
// Close menu when clicking a link (optional)
document.querySelectorAll(".navbar a").forEach((link) => {
  link.onclick = () => {
    navbar.classList.remove("active");
  };
});
// scroll section active link
let sections = document.querySelectorAll("section");
let navlinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navlinks.forEach((links) => {
        links.classList.remove("active");
        const activeLink = document.querySelector(`header nav a[href*=${id}]`);
        if (activeLink) activeLink.classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

  /* remove toggle icon and navbar when click navbar link */

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// Close navbar when any nav link is clicked (for mobile)

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".navbar").classList.remove("active");
    document.getElementById("menu-icon")?.classList.remove("bx-x");
  });
});

// scroll reveal

ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});
ScrollReveal().reveal(".home-content,.heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img,.skills-columns,.timeline-items,.services-container,.portfolio-box,.contact-form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1,.about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p,.about-content", { origin: "right" });

// typed.js

const typed = new Typed(".multiple-text", {
  strings: ["Aspiring Web Developer", "Aspiring Full-Stack Developer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});

// const form = document.querySelector(".contact-form");
// const emailInput = document.querySelector("input[name='email']");
// const errorMsg = document.querySelector(".error-msg");

// form.addEventListener("submit", async function (e) {
//   e.preventDefault(); // stop normal submit

//   const email = emailInput.value.trim();
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   // Email validation
//   if (!regex.test(email)) {
//     errorMsg.textContent = "❌ Please enter a valid email address";
//     emailInput.focus();
//     return;
//   } else {
//     errorMsg.textContent = "";
//   }

//   // Prepare data
//   const formData = new FormData(form);

//   // Send to Web3Forms
//   const response = await fetch(form.action, {
//     method: form.method,
//     body: formData,
//   });

//   if (response.ok) {
//     alert("✅ Message sent successfully!");
//     form.reset(); // clear inputs
//   } else {
//     alert("❌ Failed to send message. Please try again.");
//   }
// });

// Select form, email input, and status div
const form = document.querySelector(".contact-form");
const emailInput = document.querySelector("input[name='email']");
const errorMsg = document.querySelector(".error-msg");
const statusDiv = document.getElementById("form-status");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); // stop default submission

  const email = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Email validation
  if (!regex.test(email)) {
    errorMsg.textContent = "❌ Please enter a valid email address";
    emailInput.focus();
    return;
  } else {
    errorMsg.textContent = "";
  }

  // Prepare form data
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
    });

    if (response.ok) {
      // Success message
      statusDiv.textContent = "✅ Message sent successfully!";
      statusDiv.classList.remove("error");
      statusDiv.classList.add("success");
      statusDiv.style.opacity = "1";

      form.reset(); // clear all inputs
    } else {
      // Error message
      statusDiv.textContent = "❌ Failed to send message. Please try again.";
      statusDiv.classList.remove("success");
      statusDiv.classList.add("error");
      statusDiv.style.opacity = "1";
    }
  } catch (error) {
    // Network error
    statusDiv.textContent = "❌ Something went wrong. Please try again later.";
    statusDiv.classList.remove("success");
    statusDiv.classList.add("error");
    statusDiv.style.opacity = "1";
    console.error(error);
  }

  // Fade out after 4 seconds
  setTimeout(() => {
    statusDiv.style.opacity = "0";
  }, 4000);
});
