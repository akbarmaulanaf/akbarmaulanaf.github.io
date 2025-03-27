// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Simulate terminal typing effect
  const typingElement = document.querySelector(".hero-section h1");
  if (typingElement) {
    // Store the original content including HTML tags
    const originalContent = typingElement.innerHTML;
    // Extract the text content and HTML structure
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = originalContent;

    // Save the static part and the part to be animated separately
    const staticPart = "Hi, I'm ";
    const namePart = document.querySelector(".name-highlight").textContent;

    // Start with just the static part
    typingElement.innerHTML = staticPart + "<span class='name-highlight'></span>";
    const nameElement = typingElement.querySelector(".name-highlight");

    let i = 0;
    const typeWriter = () => {
      if (i < namePart.length) {
        nameElement.textContent += namePart.charAt(i);
        i++;
        setTimeout(typeWriter, Math.random() * 60 + 30); // Random typing speed for realistic effect
      }
    };

    setTimeout(() => {
      typeWriter();
    }, 500);
  }

  // Add glitch effect occasionally to the name highlight
  setInterval(() => {
    const nameHighlight = document.querySelector(".name-highlight");
    if (nameHighlight) {
      // Add glitch class temporarily
      nameHighlight.classList.add("glitch");

      // Remove glitch class after short duration
      setTimeout(() => {
        nameHighlight.classList.remove("glitch");
      }, 150);
    }
  }, 2000); // Every 2 seconds (changed from 5000)

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Offset for fixed navbar
          behavior: "smooth",
        });
      }
    });
  });

  // Add active class to nav items on scroll
  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY + 100; // Add offset to detect sections earlier

    // Activate menu items based on scroll position
    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll(".navbar .nav-link").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          }
        });
      }
    });

    // Special case for the last section (make it active when at bottom of page)
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.offsetHeight;
    const lastSection = document.querySelector("section:last-of-type");
    const lastSectionId = lastSection ? lastSection.getAttribute("id") : null;

    // If we're at the bottom of the page
    if (scrollPosition + windowHeight >= documentHeight - 100) {
      document.querySelectorAll(".navbar .nav-link").forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + lastSectionId) {
          link.classList.add("active");
        }
      });
    }
  });

  // 3D tilt effect for profile card
  const profileCard = document.querySelector(".profile-card-inner");

  if (profileCard) {
    profileCard.addEventListener("mousemove", function (e) {
      const card = this;
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const cardCenterY = cardRect.top + cardRect.height / 2;

      // Calculate mouse position relative to card center (values between -1 and 1)
      const mouseX = (e.clientX - cardCenterX) / (cardRect.width / 2);
      const mouseY = (e.clientY - cardCenterY) / (cardRect.height / 2);

      // Max rotation angle (in degrees)
      const maxRotation = 10;

      // Apply the rotation based on mouse position
      card.style.transform = `rotateY(${mouseX * maxRotation}deg) rotateX(${-mouseY * maxRotation}deg)`;

      // Move the profile image slightly in the opposite direction for parallax effect
      const profileImage = card.querySelector(".profile-image");
      if (profileImage) {
        profileImage.style.transform = `translateX(${-mouseX * 10}px) translateY(${-mouseY * 10}px)`;
      }
    });

    // Reset transform when mouse leaves
    profileCard.addEventListener("mouseleave", function () {
      this.style.transform = "rotateY(0deg) rotateX(0deg)";
      const profileImage = this.querySelector(".profile-image");
      if (profileImage) {
        profileImage.style.transform = "translateX(0) translateY(0)";
      }
    });

    // Smooth transition on mouse enter
    profileCard.addEventListener("mouseenter", function () {
      this.style.transition = "transform 0.2s ease";
      setTimeout(() => {
        this.style.transition = "none";
      }, 200);
    });
  }

  // Matrix-style character rain effect (subtle in background)
  const canvas = document.createElement("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "-1";
  canvas.style.opacity = "0.05";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  // Matrix characters (can include various symbols)
  const characters = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン[]{}#$%&^*!";
  const columns = Math.floor(canvas.width / 15); // Character width + spacing
  const drops = [];

  // Initialize drops
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -canvas.height);
  }

  function drawMatrix() {
    // Semi-transparent black to create fade effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff41";
    ctx.font = "15px monospace";

    for (let i = 0; i < drops.length; i++) {
      // Choose a random character
      const char = characters.charAt(Math.floor(Math.random() * characters.length));

      // Draw the character
      ctx.fillText(char, i * 15, drops[i] * 15);

      // Move it down
      drops[i]++;

      // Reset if it's too far down or randomly
      if (drops[i] * 15 > canvas.height && Math.random() > 0.98) {
        drops[i] = Math.floor(Math.random() * -20);
      }
    }
  }

  // Update at slower rate for subtle effect
  setInterval(drawMatrix, 100);

  // Handle Windows-style tabs in the contact section
  const tabButtons = document.querySelectorAll(".tab-button");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      // Add active class to clicked button
      button.classList.add("active");

      // Hide all tab panes
      const tabPanes = document.querySelectorAll(".tab-pane");
      tabPanes.forEach((pane) => {
        pane.classList.remove("active");
      });

      // Show the selected tab pane
      const tabId = button.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Add hover effects to the Windows buttons
  const windowsContainer = document.querySelector(".windows-container");
  if (windowsContainer) {
    const windowsClose = windowsContainer.querySelector(".windows-close");

    windowsClose.addEventListener("click", () => {
      // Add a small animation when 'closing' the window
      windowsContainer.style.transition = "transform 0.5s, opacity 0.5s";
      windowsContainer.style.transform = "scale(0.95)";
      windowsContainer.style.opacity = "0";

      // Reset after animation
      setTimeout(() => {
        windowsContainer.style.transform = "scale(1)";
        windowsContainer.style.opacity = "1";
      }, 1000);
    });
  }

  // Close mobile menu when clicking on a nav link
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      // Check if navbar is expanded (mobile view)
      const navbarCollapse = document.querySelector(".navbar-collapse");
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        // Use Bootstrap's collapse method to hide the menu
        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
        bsCollapse.hide();
      }
    });
  });
});

// Add window resize handler
window.addEventListener("resize", function () {
  // Recalculate canvas dimensions for matrix animation
  const canvas = document.querySelector("canvas");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Adjust profile card positioning based on screen size
  const profileCard = document.querySelector(".profile-card");
  const profileCardInner = document.querySelector(".profile-card-inner");
  const profileImage = document.querySelector(".profile-image");

  if (profileCard && profileCardInner && profileImage) {
    if (window.innerWidth < 768) {
      // Mobile styling
      profileCard.style.right = "auto";
      profileCard.style.left = "auto";
      profileCardInner.style.display = "flex";
      profileCardInner.style.justifyContent = "center";
      profileImage.style.right = "auto";
      profileImage.style.left = "auto";
      profileImage.style.position = "relative";
    } else {
      // Desktop styling - reset to original CSS
      profileCard.style.right = "";
      profileCard.style.left = "";
      profileCardInner.style.display = "";
      profileCardInner.style.justifyContent = "";
      profileImage.style.right = "0";
      profileImage.style.left = "";
      profileImage.style.position = "absolute";
    }
  }
});

// On page load, trigger resize event to set initial responsive styles
window.dispatchEvent(new Event("resize"));
