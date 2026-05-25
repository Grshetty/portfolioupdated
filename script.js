// ── TYPEWRITER HERO ──
const phrases = [
  'React.js',
  'HTML5 & CSS3',
  'JavaScript',
  'Tailwind CSS',
  'Bootstrap',
  'WordPress',
  'REST API Integration',
  'SQL Databases',
  'Git & GitHub'
];
let pi = 0, ci = 0, deleting = false;
const twEl = document.getElementById('tw-text');
function typeHero() {
  const word = phrases[pi];
  if (!deleting) {
    twEl.textContent = word.slice(0, ci + 1);
    ci++;
    if (ci === word.length) { deleting = true; setTimeout(typeHero, 1600); return; }
  } else {
    twEl.textContent = word.slice(0, ci - 1);
    ci--;
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(typeHero, deleting ? 55 : 90);
}
setTimeout(typeHero, 1400);

// ── SKILL PILLS TYPEWRITER ──
const feSkills = ['React.js', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap', 'JavaScript', 'Tailwind CSS', 'WordPress'];
const biSkills = ['REST API'];
const dbSkills = ['SQL', 'Git', 'GitHub'];

function renderSkills(containerId, skills) {
  const el = document.getElementById(containerId);
  skills.forEach((s, i) => {
    setTimeout(() => {
      const pill = document.createElement('div');
      pill.className = 'skill-pill';
      pill.style.opacity = '0';
      pill.style.transform = 'translateY(10px)';
      pill.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      el.appendChild(pill);
      let idx = 0;
      function typePill() {
        if (idx <= s.length) {
          pill.textContent = s.slice(0, idx);
          idx++;
          setTimeout(typePill, 60);
        } else {
          pill.style.opacity = '1';
          pill.style.transform = 'translateY(0)';
        }
      }
      setTimeout(() => {
        pill.style.opacity = '1';
        typePill();
      }, 100);
    }, i * 220);
  });
}

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
let skillsTyped = false;
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (entry.target.closest('#skills') && !skillsTyped) {
        skillsTyped = true;
        setTimeout(() => renderSkills('fe-skills', feSkills), 200);
        setTimeout(() => renderSkills('bi-skills', biSkills), 200 + feSkills.length * 220 + 300);
        setTimeout(() => renderSkills('db-skills', dbSkills), 200 + (feSkills.length + biSkills.length) * 220 + 600);
      }
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ── CHATBOT ──
const chatMessages = document.getElementById('chatMessages');
const quickReplies = document.getElementById('quickReplies');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const WA = 'https://wa.me/917981227221';
let step = 0;

function scroll() { chatMessages.scrollTop = chatMessages.scrollHeight; }

function addMsg(html, type) {
  const div = document.createElement('div');
  div.className = 'msg ' + type;
  const b = document.createElement('div');
  b.className = 'bubble';
  b.innerHTML = html;
  div.appendChild(b);
  chatMessages.appendChild(div);
  scroll();
}

function showTyping() {
  const div = document.createElement('div');
  div.className = 'msg bot'; div.id = 'typingDots';
  div.innerHTML = '<div class="bubble" style="background:rgba(93,202,165,0.1);border:0.5px solid rgba(93,202,165,0.2);border-radius:4px 18px 18px 18px"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
  chatMessages.appendChild(div); scroll();
}
function removeTyping() { const t = document.getElementById('typingDots'); if (t) t.remove(); }

function botReply(html, delay, afterCb) {
  setTimeout(() => {
    showTyping();
    setTimeout(() => {
      removeTyping();
      addMsg(html, 'bot');
      if (afterCb) afterCb();
    }, 900);
  }, delay);
}

function setQR(replies) {
  quickReplies.innerHTML = '';
  replies.forEach(r => {
    const btn = document.createElement('button');
    btn.className = 'qr-btn'; btn.textContent = r;
    btn.onclick = () => handleInput(r);
    quickReplies.appendChild(btn);
  });
}
function clearQR() { quickReplies.innerHTML = ''; }

function handleInput(text) {
  clearQR();
  addMsg(text, 'user');
  const l = text.toLowerCase();
  if (step === 1) {
    step = 2;
    const res = (l.includes('good') || l.includes('great') || l.includes('fine') || l.includes('well'))
      ? "That's awesome! 🎉 How can I help you today?"
      : "Good to hear from you! How can I help today?";
    botReply(res, 200, () => setQR(['WhatsApp Contact', 'Send Email', 'Personal Work', 'View Skills', 'View Projects']));
  } else if (step >= 2) {
    if (l.includes('contact') || l.includes('ruthveek') || l.includes('number') || l.includes('whatsapp') || l.includes('phone')) {
      step = 3;
      botReply(
        `You can reach Ruthveek directly via WhatsApp or Call!<br><br><strong style="font-size:15px;color:#5DCAA5">+91-7981227221</strong><br><br><a class="wa-btn" href="${WA}" target="_blank"><svg viewBox="0 0 24 24" style="width:16px;height:16px;fill:#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg> Chat on WhatsApp</a>`,
        300, () => setQR(["Thanks!", "Send Email", "Personal Work", "View Projects", "View Skills"])
      );
    } else if (l.includes('email') || l.includes('mail')) {
      botReply(
        `You can email Ruthveek directly at:<br><br><strong style="font-size:15px;color:#5DCAA5">ruthveekgourishetty@gmail.com</strong><br><br><a class="wa-btn" href="mailto:ruthveekgourishetty@gmail.com" style="background:#dd4b39;gap:6px"><i class="bi bi-envelope-fill"></i> Send Email</a>`,
        300, () => setQR(["Thanks!", "WhatsApp Contact", "Personal Work", "View Projects", "View Skills"])
      );
    } else if (l.includes('personal') || l.includes('work') || l.includes('game') || l.includes('snake') || l.includes('archery') || l.includes('login')) {
      botReply(
        `Ruthveek has built 4 interactive personal projects:<br><br>• <strong>Archery Game</strong><br>• <strong>Snake Game</strong><br>• <strong>Animated Login Form</strong><br>• <strong>Secured Login Form</strong><br><br>These projects highlight advanced canvas operations, gameplay mechanics, micro-interactions, responsive styling, and form input validation.`,
        300, () => setQR(["Thanks!", "WhatsApp Contact", "Send Email", "View Projects", "View Skills"])
      );
    } else if (l.includes('skill') || l.includes('tech')) {
      botReply("Ruthveek's tech stack: <strong>React, HTML5, CSS3, Bootstrap, JavaScript, Tailwind CSS</strong> on the frontend, plus <strong>Responsive Design, API Integration, State Management</strong>, and <strong>Git, GitHub, SQL</strong> for tools!", 300, () => setQR(['WhatsApp Contact', 'Send Email', 'Personal Work', 'View Projects']));
    } else if (l.includes('project')) {
      botReply("Ruthveek has built 8 active applications: the featured <strong>Hospital Management System</strong> (9 roles), <strong>Library Management System</strong>, beautiful landing pages (<strong>Lens & Lights Media</strong> and <strong>SecurXperts</strong>), and 4 interactive personal creations (<strong>Archery Game</strong>, <strong>Snake Game</strong>, <strong>Animated Login Form</strong>, and <strong>Login Form</strong>)!", 300, () => setQR(['WhatsApp Contact', 'Send Email', 'Personal Work', 'View Skills']));
    } else if (l.includes('thank') || l.includes('bye')) {
      botReply("You're welcome! Feel free to reach out to Ruthveek directly. Have a great day! 👋", 300);
    } else {
      botReply("I can help you contact Ruthveek, or tell you about his skills, personal work, and projects. What would you like to know?", 300, () => setQR(['WhatsApp Contact', 'Send Email', 'Personal Work', 'View Skills', 'View Projects']));
    }
  }
}

chatSend.onclick = () => { const v = chatInput.value.trim(); if (!v) return; chatInput.value = ''; handleInput(v); };
chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') chatSend.click(); });

botReply("Hi! 👋 How are you doing today?", 800, () => {
  step = 1;
  setQR(["I'm great, thanks!", "Hello!", "Doing well!"]);
});

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');

if (mobileMenuToggle && navLinks && mobileMenuOverlay) {
  mobileMenuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    navLinks.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
  });

  // Close menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
    });
  });

  // Close menu when clicking on overlay
  mobileMenuOverlay.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
      mobileMenuOverlay.classList.remove('active');
    }
  });
}

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  });

  // Scroll to top when clicked
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Active nav link highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (navLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink.style.color = 'var(--accent)';
      } else {
        navLink.style.color = 'rgba(255,255,255,0.55)';
      }
    }
  });
});

// Parallax effect for hero orbs (reduced for mobile performance)
let isMobile = window.innerWidth <= 768;

window.addEventListener('resize', () => {
  isMobile = window.innerWidth <= 768;
});

if (!isMobile) {
  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const orb1 = document.querySelector('.hero-orb1');
    const orb2 = document.querySelector('.hero-orb2');
    const orb3 = document.querySelector('.hero-orb3');

    if (orb1) orb1.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    if (orb2) orb2.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px)`;
    if (orb3) orb3.style.transform = `translate(${mouseX * 10}px, ${mouseY * 10}px)`;
  });
}
