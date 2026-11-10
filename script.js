/* ==========================================================================
   🐿️ SQUIRREL CYBER OPS // PURPLE TEAM CYBERSECURITY EDITION
   JavaScript Engine: script.js
   Author: Nik Nurhazirah binti Nik Hussain (52215226033)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initClock();
  initMatrixRain();
  initAudioSynth();
  initStatCounters();
  initNetworkCanvas();
  initTerminal();
  initMobileNav();
  triggerSimulation('recon');
});

/* --------------------------------------------------------------------------
   1. LIVE HUD CLOCK (UTC+8)
   -------------------------------------------------------------------------- */
function initClock() {
  const clockEl = document.getElementById("hud-clock");
  function update() {
    const now = new Date();
    // Format to Malaysian Standard Time (UTC+8)
    const options = { timeZone: "Asia/Kuala_Lumpur", hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const timeStr = now.toLocaleTimeString("en-GB", options);
    if (clockEl) clockEl.textContent = `${timeStr} MYT // SECURE`;
  }
  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   2. WEB AUDIO SYNTHESIZER (Sci-Fi Audio Engine)
   -------------------------------------------------------------------------- */
let audioCtx = null;
let soundEnabled = true;

function initAudioSynth() {
  const toggleBtn = document.getElementById("sound-toggle");
  const statusEl = document.getElementById("sound-status");

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      if (statusEl) statusEl.textContent = soundEnabled ? "ON" : "OFF";
      if (soundEnabled) playSynthBeep(880, 0.08, 'sine');
    });
  }
}

function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSynthBeep(freq = 600, duration = 0.08, type = 'sine', gainVal = 0.05) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(gainVal, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore audio permission restrictions
  }
}

function playCyberChord() {
  if (!soundEnabled) return;
  [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
    setTimeout(() => playSynthBeep(freq, 0.12, 'triangle', 0.03), idx * 60);
  });
}

function playAlertTone() {
  if (!soundEnabled) return;
  playSynthBeep(350, 0.1, 'sawtooth', 0.04);
  setTimeout(() => playSynthBeep(300, 0.15, 'sawtooth', 0.04), 100);
}

/* --------------------------------------------------------------------------
   3. MATRIX DIGITAL RAIN CANVAS
   -------------------------------------------------------------------------- */
let matrixRunning = true;
let matrixAnimId = null;

function initMatrixRain() {
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const characters = "0110100101NIKIRAPURPLETEAM52215226033SQUIRRELACORNKALIUNIKLMIIT0123456789ABCDEF!@#$%^&*()";
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -50);
  }

  function draw() {
    ctx.fillStyle = "rgba(8, 4, 15, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px 'Fira Code', monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      
      // Cyberpunk color palette: blend of neon purple and cyber cyan
      if (Math.random() > 0.85) {
        ctx.fillStyle = "#c084fc"; // Bright Purple
      } else if (Math.random() > 0.7) {
        ctx.fillStyle = "#06b6d4"; // Cyber Cyan
      } else {
        ctx.fillStyle = "#7c3aed"; // Darker Purple
      }

      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    if (matrixRunning) {
      matrixAnimId = requestAnimationFrame(draw);
    }
  }

  draw();

  const matrixToggle = document.getElementById("matrix-toggle");
  const statusEl = document.getElementById("matrix-status");
  if (matrixToggle) {
    matrixToggle.addEventListener("click", () => {
      matrixRunning = !matrixRunning;
      if (statusEl) statusEl.textContent = matrixRunning ? "ACTIVE" : "PAUSED";
      if (matrixRunning) {
        draw();
      } else {
        cancelAnimationFrame(matrixAnimId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    });
  }
}

/* --------------------------------------------------------------------------
   4. STAT COUNTERS ANIMATION
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const statValues = document.querySelectorAll(".stat-value");
  statValues.forEach(el => {
    const target = parseFloat(el.getAttribute("data-target"));
    let current = 0;
    const isDecimal = target % 1 !== 0;
    const duration = 1800;
    const step = target / (duration / 25);

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
    }, 25);
  });
}

/* --------------------------------------------------------------------------
   5. SQUIRREL MASCOT "AGENT ACORN" ACTIONS & SPEECH
   -------------------------------------------------------------------------- */
const mascotQuotes = {
  scout: [
    "🔍 Recon in progress: Gathering WHOIS, DNS records & subdomains. Zero footprint detected!",
    "🔍 Scanning perimeter... Detected 3 open listening ports: 21 (FTP), 22 (SSH), 80 (HTTP).",
    "🔍 OSINT query dispatched to Certificate Transparency logs (crt.sh). Subdomains mapped!"
  ],
  defend: [
    "🛡️ Blue Team shields active! Ingress firewall rule applied: DROP invalid SYN flood.",
    "🛡️ Behavioral EDR sensor deployed: Tracking 5-second sliding windows for encryption bursts.",
    "🛡️ Snort IDS rule compiled: Alerting on suspicious Nmap NSE script user-agents!"
  ],
  nut: [
    "🌰 Cyber Acorn unlocked: AES-256 encrypted payload stored in cryptographic cache.",
    "🌰 Decoded hidden token: Credentials recovered from QR raster analysis!",
    "🌰 Nut security: Password complexity verified. Banned common dictionary entries."
  ],
  dance: [
    "⚡ Cyberpunk boost initiated! Overclocking detection matrix to 10 Gbps throughput!",
    "⚡ Purple Team synergy maximized: Offensive telemetry directly feeding detection rules!",
    "⚡ Agent Acorn standing guard: UniKL Cyber Defense Lab status OPTIMAL!"
  ]
};

function squirrelAction(action) {
  playSynthBeep( action === 'defend' ? 440 : 880, 0.1, 'triangle' );
  const bubble = document.getElementById("mascot-dialogue");
  const svg = document.getElementById("squirrel-svg");

  if (bubble && mascotQuotes[action]) {
    const quotes = mascotQuotes[action];
    const picked = quotes[Math.floor(Math.random() * quotes.length)];
    bubble.textContent = picked;
    bubble.style.borderColor = action === 'defend' ? '#06b6d4' : '#a855f7';
  }

  if (svg) {
    svg.style.transform = "scale(1.1) rotate(-3deg)";
    setTimeout(() => {
      svg.style.transform = "scale(1) rotate(0deg)";
    }, 300);
  }
}

// Click mascot directly
const mascotCard = document.getElementById("mascot-interactive");
if (mascotCard) {
  mascotCard.addEventListener("click", (e) => {
    if (!e.target.closest("button")) {
      const actions = ['scout', 'defend', 'nut', 'dance'];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      squirrelAction(randomAction);
    }
  });
}

/* --------------------------------------------------------------------------
   6. PURPLE TEAM COMBAT SIMULATOR & NETWORK CANVAS
   -------------------------------------------------------------------------- */
const simulationScenarios = {
  recon: {
    name: "Stealth Port Scan (Nmap SYN Sweep)",
    red: "Attacker (192.168.100.128) transmits half-open TCP SYN packets across ports 1-65535 using: 'sudo nmap -sS -p- 192.168.100.117'",
    blue: "Firewall & HIDS detect an anomalous burst of 65,000 SYN packets without corresponding ACKs. State table alert triggers in Splunk SIEM.",
    purple: "Collaborative Action: Purple Team configures dynamic rate-limiting on border firewall and updates Suricata rule SID:200192 to flag scanning signatures automatically."
  },
  brute: {
    name: "SSH Credential Brute-Force (THC-Hydra)",
    red: "Attacker deploys Hydra dictionary attack against port 22: 'hydra -l robin -P p_lists.txt ssh://192.168.100.117' attempting 325 password variations.",
    blue: "SSH daemon logs 5 authentication failures in under 10 seconds. Fail2ban triggers immediate iptables jail rule, dropping subsequent packets for 1 hour.",
    purple: "Collaborative Action: Purple Team enforces Public Key Authentication (ED25519) in sshd_config, disables password logins entirely, and configures Geo-IP ingress filtering."
  },
  docker: {
    name: "Container Breakout & Sudo Escalation",
    red: "Attacker exploits Sudo script vulnerability, joins the local 'docker' group, and executes: 'docker run -v /:/mnt --rm -it alpine chroot /mnt sh' to capture root flag.",
    blue: "Endpoint sensor (Sysmon/auditd) flags unauthorized namespace escape and anomalous mounting of host root directory ('/') into an ephemeral container.",
    purple: "Collaborative Action: Purple Team implements Principle of Least Privilege: removes non-admin users from the docker group, deploys rootless Docker, and enforces AppArmor confinement."
  },
  ransomware: {
    name: "Behavioral Ransomware File Encryption",
    red: "Simulated ransomware simulator initiates rapid file encryption burst: modifying 50 user documents in under 5 seconds with elevated Shannon entropy.",
    blue: "UniKL ML Sensor (XGBoost) processes 5-second sliding temporal window. Classification flags ransomware burst with 99.8% confidence; automated containment isolates host in 350ms.",
    purple: "Collaborative Action: Purple Team verifies early containment before shadow copy deletion occurs, updates ML model feature weights, and validates immutable backup restoration."
  }
};

function triggerSimulation(key) {
  playCyberChord();
  const scenario = simulationScenarios[key];
  if (!scenario) return;

  // Update Buttons Active State
  const buttons = document.querySelectorAll(".scenario-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  const clickedBtn = document.querySelector(`.scenario-btn[onclick*="${key}"]`);
  if (clickedBtn) clickedBtn.classList.add("active");

  // Update Timeline Content
  const redLog = document.getElementById("red-action-log");
  const blueLog = document.getElementById("blue-action-log");
  const purpleLog = document.getElementById("purple-action-log");

  if (redLog) redLog.innerHTML = `<span class="neon-pink">[SCENARIO: ${scenario.name}]</span><br>${scenario.red}`;
  if (blueLog) blueLog.innerHTML = `<span class="neon-cyan">[SURVEILLANCE ACTIVATED]</span><br>${scenario.blue}`;
  if (purpleLog) purpleLog.innerHTML = `<span class="neon-purple">[PURPLE SYNCHRONIZATION]</span><br>${scenario.purple}`;

  // Reset & trigger network packet burst on canvas
  triggerPacketBurst();
}

/* --------------------------------------------------------------------------
   7. LIVE NETWORK CANVAS SIMULATION
   -------------------------------------------------------------------------- */
let canvasNodes = [];
let networkPackets = [];

function initNetworkCanvas() {
  const canvas = document.getElementById("network-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth - 32;
    canvas.height = 240;
    setupNodes();
  }

  function setupNodes() {
    const w = canvas.width;
    const h = canvas.height;
    canvasNodes = [
      { id: 'attacker', label: '🔴 ATTACKER\n192.168.100.128', x: w * 0.12, y: h * 0.5, color: '#f43f5e' },
      { id: 'firewall', label: '🟣 FIREWALL/IDS\n192.168.100.1', x: w * 0.38, y: h * 0.5, color: '#a855f7' },
      { id: 'endpoint', label: '🔵 TARGET SERVER\n192.168.100.117', x: w * 0.65, y: h * 0.5, color: '#06b6d4' },
      { id: 'siem',     label: '🟢 SIEM SENSOR\n192.168.100.200', x: w * 0.88, y: h * 0.5, color: '#10b981' }
    ];
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function drawNetwork() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connection lines
    ctx.strokeStyle = "rgba(168, 85, 247, 0.25)";
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);

    for (let i = 0; i < canvasNodes.length - 1; i++) {
      ctx.beginPath();
      ctx.moveTo(canvasNodes[i].x, canvasNodes[i].y);
      ctx.lineTo(canvasNodes[i + 1].x, canvasNodes[i + 1].y);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Draw and update moving packets
    for (let i = networkPackets.length - 1; i >= 0; i--) {
      const p = networkPackets[i];
      p.progress += p.speed;
      if (p.progress >= 1) {
        networkPackets.splice(i, 1);
        continue;
      }
      const curX = p.from.x + (p.to.x - p.from.x) * p.progress;
      const curY = p.from.y + (p.to.y - p.from.y) * p.progress;

      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(curX, curY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Draw Nodes
    canvasNodes.forEach(node => {
      // Glow circle
      ctx.fillStyle = "rgba(18, 10, 36, 0.9)";
      ctx.strokeStyle = node.color;
      ctx.lineWidth = 2;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = 12;

      ctx.beginPath();
      ctx.arc(node.x, node.y, 24, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Node label
      ctx.fillStyle = "#fff";
      ctx.font = "10px 'Fira Code', monospace";
      ctx.textAlign = "center";
      const lines = node.label.split("\n");
      ctx.fillText(lines[0], node.x, node.y + 42);
      ctx.fillStyle = "#9ca3af";
      ctx.fillText(lines[1], node.x, node.y + 55);
    });

    requestAnimationFrame(drawNetwork);
  }

  drawNetwork();
  setInterval(spawnRoutinePacket, 1200);
}

function spawnRoutinePacket() {
  if (canvasNodes.length < 4) return;
  const isAttack = Math.random() > 0.6;
  if (isAttack) {
    networkPackets.push({
      from: canvasNodes[0],
      to: canvasNodes[1],
      progress: 0,
      speed: 0.018,
      color: '#f43f5e'
    });
  } else {
    networkPackets.push({
      from: canvasNodes[2],
      to: canvasNodes[3],
      progress: 0,
      speed: 0.02,
      color: '#06b6d4'
    });
  }
}

function triggerPacketBurst() {
  if (canvasNodes.length < 4) return;
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      networkPackets.push({
        from: canvasNodes[0],
        to: canvasNodes[1],
        progress: 0,
        speed: 0.025,
        color: '#f43f5e'
      });
      setTimeout(() => {
        networkPackets.push({
          from: canvasNodes[1],
          to: canvasNodes[2],
          progress: 0,
          speed: 0.03,
          color: '#a855f7'
        });
        networkPackets.push({
          from: canvasNodes[2],
          to: canvasNodes[3],
          progress: 0,
          speed: 0.035,
          color: '#10b981'
        });
      }, 400);
    }, i * 150);
  }
}

/* --------------------------------------------------------------------------
   8. SKILLS CATEGORY FILTERING
   -------------------------------------------------------------------------- */
function filterSkills(category) {
  playSynthBeep(700, 0.06, 'sine');
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach(btn => btn.classList.remove("active"));
  const clicked = document.querySelector(`.filter-btn[onclick*="${category}"]`);
  if (clicked) clicked.classList.add("active");

  const cards = document.querySelectorAll(".skill-card");
  cards.forEach(card => {
    const cardCat = card.getAttribute("data-category");
    if (category === "all" || cardCat === category) {
      card.style.display = "block";
      card.style.opacity = "1";
    } else {
      card.style.display = "none";
      card.style.opacity = "0";
    }
  });
}

/* --------------------------------------------------------------------------
   9. INTERACTIVE COMMAND TERMINAL (CLI)
   -------------------------------------------------------------------------- */
const terminalCommands = {
  help: `Available commands:
  - whoami       : Displays current student operative profile & ID
  - bio          : Summary of academic background & career goals
  - skills       : Lists top cybersecurity technical capabilities
  - projects     : Lists lab exercises, CTFs & research projects
  - ops          : Explains Purple Team operations doctrine
  - mascot       : Interacts with Agent Acorn
  - scan         : Simulates live Nmap port scan against target machine
  - flags        : Displays captured CTF challenge flags
  - clear        : Clears the terminal screen
  - contact      : Shows official communication channels`,

  whoami: `Operative: Nik Nurhazirah binti Nik Hussain
Student ID: 52215226033
Programme : Bachelor of Information Technology (Hons) in Cyber Security
Campus    : Universiti Kuala Lumpur (UniKL) - MIIT City Campus
Callsign  : Agent Acorn // Purple Team Operative`,

  bio: `I am a cybersecurity undergraduate at UniKL MIIT passionate about Purple Team operations.
My focus is bridging offensive vulnerability assessments with automated behavioral endpoint defense (ML/EDR).
Aspirations: Purple Team Lead, Threat Intelligence Specialist, and Security Architect.`,

  skills: `Technical Arsenal:
  [+] Vulnerability Assessment : Nmap, Nikto, Gobuster (95%)
  [+] OSINT & Passive Recon    : theHarvester, WHOIS, Wayback CDX, Google Dorks (90%)
  [+] Authentication Cracking  : THC-Hydra, vsFTPd, Leetspeak Dictionaries (88%)
  [+] Endpoint Security        : Behavioral Sliding Windows, Shannon Entropy, XGBoost (94%)
  [+] Systems & Infrastructure : Kali Linux, Debian, Bash, Python 3, Docker Escape (92%)`,

  projects: `Documented Lab Deliverables & Projects:
  1. Vulnerability Analysis Suite (Lab 1 - 4: Threat/Vuln, Bluemoon CTF, Passive OSINT, Active Footprinting)
     Repo: https://github.com/Nnhazirah/Vulnerability-Analysis
  2. IDB30102 Endpoint Security: ML Behavioral Ransomware Detection (99.8% precision)
     Repo: https://github.com/Nnhazirah/IDB30102_GroupI_EndpointSecurity
  3. BlueMoon: 2021 Boot2Root CTF Walkthrough (Rooted Flag 1, 2 & Root)
  4. Squirrel Recon: Python OSINT Harvester & DNS Pipeline`,

  ops: `PURPLE TEAM PHILOSOPHY:
  Red Team tests the defenses. Blue Team builds the sensors.
  Purple Team connects both worlds in a continuous loop:
  Offensive Telemetry ➔ Empirical Evidence ➔ High-Fidelity Detection Rules ➔ Zero Blindspots.`,

  mascot: `🐿️ Agent Acorn: "Reporting for duty! I guard the cryptographic nuts and monitor network traffic at UniKL Cyber Labs!"`,

  flags: `Captured CTF Flags (BlueMoon 2021):
  [+] Flag 1 (User Robin) : Fl4g{u5er1r34ch3d5ucc355fully}
  [+] Flag 2 (User Jerry) : Fl4g{Y0ur34ch3du53r25uc355ful1y}
  [+] Flag 3 (System Root): Fl4g{r00t_pr1v1l3g3_3sc4l4t10n_d0ck3r_m4st3r}`,

  contact: `Communication Transceiver:
  Email : hazirahhussain04@gmail.com
  GitHub: https://github.com/Nnhazirah
  Campus: UniKL MIIT, 1016 Jalan Sultan Ismail, Kuala Lumpur`
};

function initTerminal() {
  const termInput = document.getElementById("term-input");
  const termOutput = document.getElementById("term-output");
  if (!termInput || !termOutput) return;

  const commandHistory = [];
  let historyIndex = -1;

  termInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const rawInput = termInput.value.trim();
      termInput.value = "";
      if (!rawInput) return;

      commandHistory.push(rawInput);
      historyIndex = commandHistory.length;

      // Echo command
      appendTerminalLine(`nikira@squirrel:~$ ${rawInput}`, 'cmd-echo');
      playSynthBeep(800, 0.05, 'square', 0.03);

      const cmd = rawInput.toLowerCase();

      if (cmd === "clear") {
        termOutput.innerHTML = "";
      } else if (cmd === "scan") {
        simulateScan(termOutput);
      } else if (terminalCommands[cmd]) {
        appendTerminalLine(terminalCommands[cmd], 'output-text');
      } else {
        appendTerminalLine(`bash: command not found: ${rawInput}. Type 'help' for available commands.`, 'error-text');
      }

      termOutput.scrollTop = termOutput.scrollHeight;
    } else if (e.key === "ArrowUp") {
      if (historyIndex > 0) {
        historyIndex--;
        termInput.value = commandHistory[historyIndex];
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        termInput.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        termInput.value = "";
      }
      e.preventDefault();
    }
  });

  function appendTerminalLine(text, className) {
    const line = document.createElement("div");
    line.className = `term-line ${className}`;
    line.innerHTML = text.replace(/\n/g, "<br>");
    termOutput.appendChild(line);
  }

  function simulateScan(container) {
    appendTerminalLine("[*] Initiating SYN Stealth Scan against 192.168.100.117...", "neon-cyan");
    setTimeout(() => {
      appendTerminalLine("PORT   STATE SERVICE VERSION", "neon-purple");
      appendTerminalLine("21/tcp open  ftp     vsftpd 3.0.3", "output-text");
      appendTerminalLine("22/tcp open  ssh     OpenSSH 7.9p1 Debian", "output-text");
      appendTerminalLine("80/tcp open  http    Apache httpd 2.4.38 ((Debian))", "output-text");
      appendTerminalLine("[+] Nmap scan complete: 1 host up, 3 open ports verified.", "neon-pink");
      container.scrollTop = container.scrollHeight;
    }, 800);
  }
}

/* --------------------------------------------------------------------------
   10. CONTACT FORM ENCRYPTED TRANSMISSION SIMULATOR
   -------------------------------------------------------------------------- */
function handleContactSubmit(event) {
  event.preventDefault();
  playSynthBeep(950, 0.15, 'sawtooth');

  const feedback = document.getElementById("form-feedback");
  const form = document.getElementById("contact-form");
  if (!feedback || !form) return;

  feedback.style.color = "#06b6d4";
  feedback.textContent = "[*] Encrypting message packet with AES-256-GCM... Dispatching to uplink...";

  setTimeout(() => {
    playCyberChord();
    feedback.style.color = "#10b981";
    feedback.textContent = "[✓] TRANSMISSION CONFIRMED! Message received by Agent Acorn & Nik Nurhazirah.";
    form.reset();
  }, 1400);
}

/* --------------------------------------------------------------------------
   11. MOBILE MENU TOGGLE
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.getElementById("mobile-toggle");
  const menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      menu.classList.toggle("open");
    });
    // Close when link clicked
    menu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("open");
      });
    });
  }
}
