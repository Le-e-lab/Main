document.addEventListener("DOMContentLoaded", () => {
    // Select all navbar links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent default link behavior

            const page = this.getAttribute("href").substring(1); // Get "home", "about", etc.
            loadPage(page);
        });
    });

    // Load correct page on refresh or first visit
    const hash = window.location.hash.substring(1);
    if (hash) {
        loadPage(hash);
    } else {
        loadPage('home'); // Default to Home
    }
});

// Function to load pages dynamically and highlight active nav link
function loadPage(page) {
    const filePath = `pages/${page}.html`; // Ensure correct folder

    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error('Page not found');
            return response.text();
        })
        .then(data => {
            document.getElementById('content').innerHTML = data;
            history.pushState({ page: page }, page.charAt(0).toUpperCase() + page.slice(1), `#${page}`); // Update URL
            document.title = page.charAt(0).toUpperCase() + page.slice(1);

            // Highlight the active nav link
            document.querySelectorAll("nav a").forEach(link => {
                link.classList.remove("active"); // Remove active class from all links
                if (link.getAttribute("href") === `#${page}`) {
                    link.classList.add("active"); // Add active class to the current page link
                }
            });
        })
        .catch(error => {
            console.error('Error loading page:', error);
            document.getElementById('content').innerHTML = `<h2>Page Not Found</h2><p>The requested page does not exist.</p>`;
        });
}

// Handle back/forward navigation and keep nav link highlighted
window.addEventListener('popstate', (event) => {
    if (event.state) {
        loadPage(event.state.page);
    }
});

// document.querySelector('#menu-button').addEventListener('click', function() {
//     document.querySelector('#sidebar').classList.toggle('open');
// });

document.addEventListener("click", (event) => {
    if (event.target.id === "go-to-about") {
        loadPage("about"); // Switch to About page
    }
});

document.addEventListener("click", (event) => {
    if (event.target.id === "gohome") {
        loadPage("home"); 
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector("#sidebar");
    const toggleButton = document.querySelector("#menu-button");

    // Toggle sidebar when clicking the menu button
    toggleButton.addEventListener("click", function (event) {
        sidebar.classList.toggle("open");
        event.stopPropagation(); // Prevent closing when clicking the button itself
    });

    // Close sidebar when clicking outside
    document.addEventListener("click", function (event) {
        if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
            sidebar.classList.remove("open");
        }
    });
});

  // Particle Animation
  const canvas = document.getElementById("particleCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  let particles = [];
  class Particle {
      constructor(x, y) {
          this.x = x;
          this.y = y;
          this.size = Math.random() * 3 + 1;
          this.speedX = Math.random() * 3 - 1.5;
          this.speedY = Math.random() * 3 - 1.5;
          this.alpha = 1;
      }
      update() {
          this.x += this.speedX;
          this.y += this.speedY;
          this.alpha -= 0.01;
      }
      draw() {
          ctx.fillStyle = `rgba(128, 0, 128, ${this.alpha})`;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
      }
  }

  function handleParticles() {
      for (let i = particles.length - 1; i >= 0; i--) {
          particles[i].update();
          particles[i].draw();
          if (particles[i].alpha <= 0) {
              particles.splice(i, 1);
          }
      }
  }
  
  function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("mousemove", function(event) {
      for (let i = 0; i < 5; i++) {
          particles.push(new Particle(event.clientX, event.clientY));
      }
  });

  document.addEventListener("DOMContentLoaded", function () {
   const aboutSection = document.querySelector(".about");
   window.addEventListener("scroll", function () {
     if (window.scrollY > 100) aboutSection.classList.add("show");
   });
 });


