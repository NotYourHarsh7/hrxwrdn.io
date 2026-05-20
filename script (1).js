/* ============================================================
   HARSHWARDHAN AHLAWAT — PORTFOLIO SCRIPT
   ============================================================ */

/* ── THEME ── */
(function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.classList.remove('dark-theme', 'light-theme');
  document.documentElement.classList.add(saved + '-theme');
})();

const themeSwitcher = document.getElementById('theme-switcher');
themeSwitcher.addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark-theme');
  html.classList.toggle('dark-theme', !isDark);
  html.classList.toggle('light-theme', isDark);
  localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

/* ── CLOCK ── */
function updateClock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const now = new Date();
  const pad = n => String(n).padStart(2, '0');
  el.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}  ${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()}`;
}
updateClock();
setInterval(updateClock, 1000);

/* ── FOOTER YEAR ── */
const fyEl = document.getElementById('footer-year');
if (fyEl) fyEl.textContent = new Date().getFullYear();

/* ── MOBILE HAMBURGER ── */
const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});
document.addEventListener('click', e => {
  if (sidebar.classList.contains('open') &&
      !sidebar.contains(e.target) &&
      e.target !== hamburger) {
    sidebar.classList.remove('open');
  }
});

/* ── ACTIVE NAV + INTERSECTION OBSERVER ── */
const sections  = document.querySelectorAll('.section');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.classList.toggle('active', a.dataset.section === id);
      });
    }
  });
}, { threshold: 0.2 });

sections.forEach(s => sectionObserver.observe(s));

/* Close sidebar on nav click (mobile) */
navLinks.forEach(a => {
  a.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
});

/* ── WORDS OF WISDOM ── */
const quotes = [
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. — Winston Churchill",
  "In the middle of every difficulty lies opportunity. — Albert Einstein",
  "Strive not to be a success, but rather to be of value. — Albert Einstein",
  "The journey of a thousand miles begins with one step. — Lao Tzu",
  "Do not wait to strike till the iron is hot; but make it hot by striking. — William Butler Yeats",
  "The only limit to our realization of tomorrow is our doubts of today. — Franklin D. Roosevelt",
  "What you get by achieving your goals is not as important as what you become by achieving your goals. — Zig Ziglar",
  "Simplicity is the soul of efficiency. — Austin Freeman",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. — Martin Fowler",
  "Talk is cheap. Show me the code. — Linus Torvalds"
];

let quoteIndex = Math.floor(Math.random() * quotes.length);
const quoteEl = document.getElementById('wisdom-quote');

function showQuote(text) {
  quoteEl.style.opacity = '0';
  setTimeout(() => {
    quoteEl.textContent = `"${text}"`;
    quoteEl.style.opacity = '1';
  }, 300);
}

if (quoteEl) showQuote(quotes[quoteIndex]);

document.getElementById('new-quote-btn')?.addEventListener('click', () => {
  quoteIndex = (quoteIndex + 1) % quotes.length;
  showQuote(quotes[quoteIndex]);
});

/* ============================================================
   PROJECT DATA
   ============================================================ */
const projectData = {
  'vlsi-alu': {
    tag: 'VLSI Design',
    title: '4-bit ALU in VHDL',
    summary: 'A fully functional 4-bit Arithmetic Logic Unit designed from scratch in VHDL, simulated and verified using Xilinx Vivado. Supports addition, subtraction, AND, OR, XOR, and NOT operations with carry/overflow flags.',
    what: 'I designed a 4-bit ALU capable of performing arithmetic (ADD, SUB) and logic (AND, OR, XOR, NOT) operations. The ALU takes two 4-bit operands and a 3-bit opcode, outputting a 4-bit result along with carry and zero flags. I wrote a comprehensive test bench to verify all operations across edge cases.',
    how: 'The project was structured into modular VHDL entities: a full adder, a logic unit, a multiplexer-based output selector, and a top-level ALU wrapper. I used structural and dataflow modelling styles. Simulation was done in Vivado Simulator with waveform analysis to validate correctness. I also documented the state transitions and timing diagrams.',
    tech: ['VHDL', 'Xilinx Vivado', 'Digital Logic', 'RTL Design', 'Test Benches'],
    links: [
      { label: '⌥ GitHub Repo', href: 'https://github.com/NotYourHarsh7' },
    ],
    media: ['Schematic Diagram', 'Simulation Waveform']
  },
  'personal-site': {
    tag: 'Web Development',
    title: 'Personal Portfolio Website',
    summary: 'The very site you\'re browsing right now. Built with pure HTML, CSS, and vanilla JavaScript — no frameworks, no dependencies. Features dark/light mode, a live clock, interactive project detail overlays, and smooth scroll-triggered animations.',
    what: 'Built a fully responsive personal portfolio from scratch. The site features a fixed sidebar navigation with active section tracking, a live clock, theme switching with localStorage persistence, scroll-reveal animations using IntersectionObserver, and an interactive project detail modal system.',
    how: 'Pure HTML5, CSS3 (custom properties, grid, flexbox), and vanilla JavaScript — deliberately no frameworks to keep things lean and demonstrate fundamentals. CSS custom properties power the theming system. IntersectionObserver handles both scroll animations and active nav highlighting. The project overlay uses CSS transforms and transitions for smooth open/close.',
    tech: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'IntersectionObserver API', 'localStorage', 'CSS Custom Properties'],
    links: [
      { label: '⌥ GitHub Repo', href: 'https://github.com/NotYourHarsh7' },
      { label: '⊞ Live Site', href: '#' },
    ],
    media: ['Homepage Screenshot', 'Mobile View']
  },
  'arduino-sensor': {
    tag: 'Embedded Systems',
    title: 'Arduino Multi-Sensor Hub',
    summary: 'A multi-sensor data acquisition system built on Arduino Uno. Reads temperature, humidity, and light intensity data in real time and displays it via a structured serial dashboard with threshold alerts.',
    what: 'Designed and built a sensor hub that continuously reads from a DHT11 temperature/humidity sensor and an LDR (light-dependent resistor). Data is formatted and sent to a serial monitor dashboard at 1-second intervals. Threshold-based alerts trigger an LED warning when temperature exceeds 35°C or light drops below a set level.',
    how: 'Wired sensors on a breadboard, wrote the firmware in C++ using the Arduino IDE. Used the DHT library for sensor reading, a voltage divider circuit for the LDR, and structured the serial output as a simple tabular dashboard. Debounced sensor reads to avoid floating values and implemented rolling averages for smooth readings.',
    tech: ['Arduino Uno', 'C++', 'DHT11', 'LDR', 'Arduino IDE', 'Serial Monitor', 'Breadboard Prototyping'],
    links: [
      { label: '⌥ GitHub Repo', href: 'https://github.com/NotYourHarsh7' },
    ],
    media: ['Circuit Diagram', 'Serial Dashboard Output']
  },
  'python-scripts': {
    tag: 'Python',
    title: 'Python Automation Scripts',
    summary: 'A growing collection of Python utility scripts targeting academic and personal workflow automation — from organising directories and batch-renaming files to scraping lecture resources from university portals.',
    what: 'Created a suite of small but practical tools: a file organiser that sorts downloads by extension into folders, a PDF merger/renamer for lecture notes, a basic web scraper for publicly accessible university resources using BeautifulSoup, and a marks calculator that reads a CSV and computes weighted averages.',
    how: 'Scripts are written in Python 3 with a focus on readability and reusability. The file organiser uses os and shutil modules. The scraper uses requests and BeautifulSoup4, with polite crawl delays. The marks calculator uses Python\'s csv module and simple arithmetic, with output formatted in a readable table via tabulate.',
    tech: ['Python 3', 'BeautifulSoup4', 'Requests', 'os / shutil', 'csv', 'tabulate'],
    links: [
      { label: '⌥ GitHub Repo', href: 'https://github.com/NotYourHarsh7' },
    ],
    media: ['Script Output Terminal']
  }
};

/* ============================================================
   PROJECT OVERLAY
   ============================================================ */
const overlay       = document.getElementById('project-overlay');
const overlayClose  = document.getElementById('overlay-close');
const overlayBack   = document.getElementById('overlay-backdrop');

function openOverlay(projectId) {
  const data = projectData[projectId];
  if (!data) return;

  document.getElementById('ol-tag').textContent     = data.tag;
  document.getElementById('ol-title').textContent   = data.title;
  document.getElementById('ol-summary').textContent = data.summary;
  document.getElementById('ol-what').textContent    = data.what;
  document.getElementById('ol-how').textContent     = data.how;

  // Tech tags
  const techEl = document.getElementById('ol-tech');
  techEl.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');

  // Links
  const linksEl = document.getElementById('ol-links');
  linksEl.innerHTML = data.links.map(l =>
    `<a href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`
  ).join('');

  // Media placeholders
  const mediaEl = document.getElementById('ol-media');
  mediaEl.innerHTML = data.media.map(m =>
    `<div class="media-placeholder">[ ${m} ]</div>`
  ).join('');

  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

overlayClose.addEventListener('click', closeOverlay);
overlayBack.addEventListener('click', closeOverlay);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) closeOverlay();
});

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.dataset.project;
    if (id) openOverlay(id);
  });
  // Keyboard accessible
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const id = card.dataset.project;
      if (id) openOverlay(id);
    }
  });
});
