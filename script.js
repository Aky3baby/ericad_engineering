document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    const responseDiv = document.getElementById('formResponse');
    responseDiv.innerHTML = '<p class="sending">Sending your message...</p>';
    
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => response.text())
    .then(data => {
        responseDiv.innerHTML = `<p class="success">${data}</p>`;
        form.reset();
    })
    .catch(error => {
        responseDiv.innerHTML = `<p class="error">There was an error sending your message. Please try again later.</p>`;
    });
});

document.getElementById('interactiveMap').addEventListener('click', function() {
    window.open('https://maps.google.com?q=123+Main+St+City+Country', '_blank');
  });


  function copyEmail() {
    const email = document.getElementById('email-text').innerText;
    navigator.clipboard.writeText(email);
    alert("Copied to clipboard: " + email);
  }
  document.getElementById('email').innerHTML = 
  'contact' + '@' + 'yourdomain' + '.com';




// Dropdown Handling for Mobile
document.querySelectorAll('.dropdown > a').forEach(item => {
  item.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
          e.preventDefault();
          item.parentElement.classList.toggle('active');
      }
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav') && window.innerWidth <= 768) {
      document.querySelector('nav ul').classList.remove('active');
      document.querySelectorAll('.dropdown').forEach(drop => drop.classList.remove('active'));
  }
});
  // Show clickable links only on relevant devices
function isTouchDevice() {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    if (isTouchDevice()) {
      document.querySelectorAll('.desktop-view').forEach(el => el.style.display = 'none');
      document.querySelectorAll('.clickable-contact').forEach(el => el.style.display = 'inline');
    }
  });
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = e.target;
    
    // Validate form
    if (!validateForm()) return;
    
    // Show loading state
    form.classList.add('form-submitting');
    
    // Submit form data (using Fetch API)
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        showMessage('success', 'Message sent successfully!');
        form.reset();
      } else {
        showMessage('error', data.message || 'Error sending message');
      }
    })
    .catch(error => {
      showMessage('error', 'Network error. Please try again.');
    })
    .finally(() => {
      form.classList.remove('form-submitting');
    });
  });
  
  function validateForm() {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Validate name
    const name = document.getElementById('name');
    if (name.value.trim() === '') {
      showError('name-error', 'Please enter your name');
      isValid = false;
    } else {
      hideError('name-error');
    }
    
    // Validate email
    const email = document.getElementById('email');
    if (!emailRegex.test(email.value)) {
      showError('email-error', 'Please enter a valid email');
      isValid = false;
    } else {
      hideError('email-error');
    }
    
    // Validate message
    const message = document.getElementById('message');
    if (message.value.trim() === '') {
      showError('message-error', 'Please enter your message');
      isValid = false;
    } else {
      hideError('message-error');
    }
    
    return isValid;
  }
  
  function showError(id, message) {
    const element = document.getElementById(id);
    element.textContent = message;
    element.style.display = 'block';
  }
  
  function hideError(id) {
    document.getElementById(id).style.display = 'none';
  }
  
  function showMessage(type, text) {
    const messageEl = document.getElementById('form-message');
    messageEl.className = `form-message ${type}`;
    messageEl.textContent = text;
    setTimeout(() => messageEl.style.opacity = '0', 5000);
  }
  document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Update active state
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // For dropdown items, also highlight the parent
                if (this.closest('.dropdown-menu')) {
                    this.closest('.dropdown').querySelector('> a').classList.add('active');
                }
            }
        });
    });

    // Smooth scroll to service sections
document.querySelectorAll('.dropdown-menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    // Smooth scroll
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Close dropdown after click (mobile)
    if (window.innerWidth <= 768) {
      this.closest('.dropdown').classList.remove('active');
      document.querySelector('nav ul').classList.remove('active');
    }
  });
});

// Keep dropdown open on hover (desktop)
let isMobile = window.innerWidth <= 768;
window.addEventListener('resize', () => {
  isMobile = window.innerWidth <= 768;
});

document.querySelectorAll('.dropdown').forEach(item => {
  if (!isMobile) {
    item.addEventListener('mouseenter', () => {
      item.classList.add('active');
    });
    item.addEventListener('mouseleave', () => {
      item.classList.remove('active');
    });
  }
});
    
    // Update active state on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
                
                // Handle service dropdown items
                if (sectionId.includes('services') || 
                    sectionId === 'architecture-drawings' ||
                    sectionId === 'surveying' ||
                    sectionId === 'structural-engineering' ||
                    sectionId === 'mep-drawings' ||
                    sectionId === 'general-construction' ||
                    sectionId === 'renovation-services') {
                    document.querySelector('nav a[href="#services"]').classList.add('active');
                }
            }
        });
    });
});





document.addEventListener('DOMContentLoaded', function() {
  // ========== Menu Toggle Functionality ==========
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');

  // Only run if elements exist
  if (hamburger && navMenu) {
    // Toggle menu visibility
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      navMenu.classList.toggle('active');
      this.querySelector('i').classList.toggle('fa-bars');
      this.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.hamburger') && !e.target.closest('nav ul')) {
        navMenu.classList.remove('active');
        hamburger.querySelector('i').classList = 'fas fa-bars';
      }
    });

    // Close menu on mobile link click
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
          hamburger.querySelector('i').classList = 'fas fa-bars';
        }
      });
    });
  } else {
    console.error('Missing elements:', {
      hamburger: !!hamburger,
      navMenu: !!navMenu
    });
  }
});















// Updated JavaScript with proper element selection
document.querySelectorAll('.gallery-toggle').forEach(button => {
  button.addEventListener('click', (e) => {
    const projectCard = e.target.closest('.project-card');
    const gallery = projectCard.querySelector('.project-gallery');
    
    gallery.classList.toggle('active');
    e.target.textContent = gallery.classList.contains('active') 
      ? 'Hide Gallery' 
      : 'View Project Gallery';
  });
});


function updateTimer() {
  const now = new Date().getTime();
  const distance = targetDate - now;
  const targetDate = new Date('December 31, 2025 00:00:00').getTime();

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000); // Fixed line

  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}