# 🧠 SUPER MASTER PROMPT — TOP 1% AI ENGINEER PORTFOLIO
> Tech Stack: React 18 + Vite + TailwindCSS + Framer Motion + Three.js (R3F) + GSAP
> Deployment Target: GitHub Pages
> Color Palette: Navy (#0A192F) · Deep Blue (#112240) · Sky Blue (#64FFDA accent) · Electric Blue (#00B4D8)

---

## 🎯 MISSION BRIEF

You are a **world-class senior UI/UX engineer and creative director** specializing in AI engineer portfolios. Your task is to build a **production-ready, fully deployable React portfolio** that ranks in the **top 1% globally** — the kind that gets AI engineers hired at OpenAI, Anthropic, DeepMind, and Google DeepMind.

This is not a template. This is a **statement of mastery**.

---

## 🏗️ PROJECT BOOTSTRAP

```bash
npm create vite@latest ai-portfolio -- --template react
cd ai-portfolio
npm install tailwindcss @tailwindcss/vite framer-motion
npm install @react-three/fiber @react-three/drei three
npm install gsap @gsap/react
npm install react-router-dom react-intersection-observer
npm install react-type-animation lucide-react
npm install react-vertical-timeline-component
npm install react-tilt react-particles tsparticles
npx tailwindcss init -p
```

---

## 📁 FOLDER STRUCTURE

```
src/
├── assets/
│   ├── images/          # Profile, project screenshots
│   └── icons/           # Tech stack SVG icons
├── components/
│   ├── 3d/
│   │   ├── NeuralNetCanvas.jsx    # Three.js animated neural network
│   │   ├── ParticleField.jsx      # Floating particle background
│   │   └── FloatingBrain.jsx      # 3D AI brain model
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   ├── Certifications.jsx
│   │   ├── Publications.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   └── ui/
│       ├── Navbar.jsx
│       ├── SectionWrapper.jsx
│       ├── TechCard.jsx
│       ├── ProjectCard.jsx
│       ├── GlassCard.jsx
│       └── AnimatedCounter.jsx
├── constants/
│   └── index.js          # All portfolio data (SINGLE SOURCE OF TRUTH)
├── hooks/
│   ├── useScrollReveal.js
│   └── useTypewriter.js
├── styles/
│   └── globals.css
├── App.jsx
├── main.jsx
└── index.html
```

---

## 🎨 DESIGN SYSTEM — THE LAW

### Color Tokens (tailwind.config.js)

```js
colors: {
  navy:      { DEFAULT: '#0A192F', light: '#112240', dark: '#060D1B' },
  blue:      { DEFAULT: '#1D4ED8', sky: '#00B4D8', electric: '#64FFDA' },
  accent:    { cyan: '#64FFDA', glow: '#00B4D8', purple: '#7C3AED' },
  glass:     { DEFAULT: 'rgba(255,255,255,0.05)', border: 'rgba(100,255,218,0.15)' },
  text:      { primary: '#CCD6F6', secondary: '#8892B0', muted: '#4A5568' },
}
```

### Typography

```js
fontFamily: {
  sans:  ['Inter', 'system-ui', 'sans-serif'],
  mono:  ['JetBrains Mono', 'Fira Code', 'monospace'],
  display: ['Clash Display', 'Cal Sans', 'Inter', 'sans-serif'],
}
```
Import from Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Design Principles (NEVER BREAK THESE)

| Rule | Requirement |
|------|-------------|
| Background | Deep navy `#0A192F` — no pure black, no white |
| Cards | Glassmorphism: `backdrop-blur-md bg-white/5 border border-cyan-500/15` |
| Accent | `#64FFDA` (electric cyan) for highlights, borders, hover states |
| Body text | `#CCD6F6` for headings, `#8892B0` for body |
| Section numbers | Mono font, cyan color, `01.`, `02.` etc. |
| Spacing | Generous — min `py-24` per section |
| Animations | Subtle, purposeful — never decorative noise |
| Images | ALL images → use `onerror` fallback + CSS-based avatar/placeholder |

---

## 🌐 CRITICAL: GOOGLE DRIVE IMAGE FIX

**Problem:** Google Drive share links (`drive.google.com/file/d/ID/view`) do NOT render in `<img>` tags.

**Fix — apply this pattern to EVERY image in the portfolio:**

```jsx
// utils/imageUtils.js
export const getDriveImageUrl = (driveUrl) => {
  // Pattern 1: /file/d/FILE_ID/view
  const match1 = driveUrl?.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  // Pattern 2: id=FILE_ID
  const match2 = driveUrl?.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const fileId = match1?.[1] || match2?.[1];
  if (!fileId) return driveUrl;
  // Use thumbnail endpoint — works without login
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
};

// Component usage:
const SafeImage = ({ src, alt, fallback, className }) => {
  const [error, setError] = useState(false);
  const resolvedSrc = src?.includes('drive.google.com')
    ? getDriveImageUrl(src)
    : src;
  if (error || !src) return <FallbackAvatar alt={alt} className={className} />;
  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
      crossOrigin="anonymous"
    />
  );
};
```

**Also add a CSS-only fallback avatar for profile sections:**
```jsx
const FallbackAvatar = ({ initials = "AI", className }) => (
  <div className={`flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-400 ${className}`}>
    <span className="font-mono font-bold text-navy text-2xl">{initials}</span>
  </div>
);
```

---

## 📐 SECTION-BY-SECTION SPECS

### 01 · HERO SECTION

**Layout:** Full viewport height split — left text, right 3D canvas

**Left Content:**
```
[mono] Hi, my name is
[display H1 — large] Your Name
[display H2 — gradient] AI Engineer & ML Architect
[body] Short 2-line bio focusing on LLMs, MLOps, AI products
[CTA buttons] "View My Work" (filled) + "Download CV" (outline)
[social icons] GitHub · LinkedIn · HuggingFace · Twitter
```

**Right Content (Three.js Canvas):**
- Animated neural network with glowing nodes and pulsing connections
- Floating particles reacting to mouse movement
- Subtle rotation — never distracting

**Typewriter effect** on role: cycle through `["AI Engineer", "ML Architect", "LLM Developer", "MLOps Engineer"]`

**Implementation:**
```jsx
// NeuralNetCanvas.jsx — Three.js neural network
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'

const NeuralSphere = () => {
  const meshRef = useRef()
  useFrame((state) => {
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.15
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.1
  })
  return (
    <mesh ref={meshRef}>
      <Sphere args={[1, 100, 200]} scale={2.4}>
        <MeshDistortMaterial
          color="#00B4D8"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          wireframe={false}
          opacity={0.85}
          transparent
        />
      </Sphere>
    </mesh>
  )
}
```

---

### 02 · ABOUT SECTION

**Layout:** 2-column — left image with decorative frame, right text + stats

**Profile Image Rules:**
```jsx
// Always use SafeImage component
// Decorative frame — cyan border offset
<div className="relative w-64 h-64 mx-auto">
  <div className="absolute inset-0 border-2 border-cyan-400 rounded translate-x-3 translate-y-3" />
  <SafeImage
    src={profileImageUrl}
    alt="Profile"
    className="w-full h-full object-cover rounded grayscale hover:grayscale-0 transition-all duration-500 relative z-10"
    fallback="initials"
  />
</div>
```

**Stats Row (animated counters):**
- Projects Completed · Models Deployed · Papers Published · Years Experience

**Right Text:**
- 3-4 sentences: focus on AI specialization, research areas, impact
- Highlight: LLMs, Computer Vision, MLOps, Responsible AI
- Personal interests that humanize you

---

### 03 · SKILLS SECTION

**Layout:** Tabbed interface OR categorized grid

**Categories:**
```
AI/ML Core     → PyTorch, TensorFlow, JAX, Scikit-learn, HuggingFace
LLMs & NLP     → LangChain, LlamaIndex, OpenAI, Anthropic SDK, PEFT/LoRA
MLOps          → MLflow, DVC, Weights & Biases, Kubeflow, Airflow
Cloud & Infra  → AWS SageMaker, GCP Vertex AI, Azure ML, Docker, K8s
Dev Tools      → Python, FastAPI, Git, Linux, SQL, Spark
```

**Card Component:**
```jsx
const TechCard = ({ name, icon, level }) => (
  <div className="group glass-card p-4 hover:border-cyan-400/50 transition-all duration-300 cursor-default">
    <img src={icon} alt={name} className="w-12 h-12 mb-3 group-hover:scale-110 transition-transform" />
    <p className="text-sm font-mono text-text-secondary">{name}</p>
    <div className="mt-2 h-1 bg-navy-light rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
)
```

---

### 04 · PROJECTS SECTION

**Layout:** Alternating featured projects (large) + grid of minor projects

**Featured Project Card:**
```jsx
// Alternating left/right layout for top 3 projects
<div className="grid md:grid-cols-12 gap-6 items-center">
  {/* Image — 7 cols */}
  <div className="md:col-span-7 relative group">
    <SafeImage src={project.image} alt={project.title}
      className="w-full rounded object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute inset-0 bg-navy/50 group-hover:bg-transparent transition-all rounded" />
  </div>
  {/* Content — 5 cols, overlapping */}
  <div className="md:col-span-5 md:-ml-12 relative z-10 text-right">
    <span className="text-cyan-400 font-mono text-sm">Featured Project</span>
    <h3 className="text-2xl font-display font-semibold text-text-primary mt-1">{project.title}</h3>
    <div className="glass-card p-4 mt-3 text-left">
      <p className="text-text-secondary text-sm">{project.description}</p>
    </div>
    <div className="flex justify-end gap-2 mt-3 flex-wrap">
      {project.tags.map(tag => (
        <span key={tag} className="font-mono text-xs text-text-secondary">{tag}</span>
      ))}
    </div>
    <div className="flex justify-end gap-4 mt-3">
      <a href={project.github}><GitHubIcon /></a>
      <a href={project.demo}><ExternalLinkIcon /></a>
    </div>
  </div>
</div>
```

**Project Data Schema:**
```js
{
  title: "LLM Fine-tuning Pipeline",
  description: "End-to-end pipeline for fine-tuning LLaMA-2 on domain-specific data using QLoRA. Reduced training time by 60% with custom data preprocessing and distributed training.",
  image: "GOOGLE_DRIVE_URL_OR_LOCAL_PATH",
  tags: ["Python", "PyTorch", "HuggingFace", "LoRA", "AWS"],
  github: "https://github.com/...",
  demo: "https://...",
  featured: true,
  metrics: "94% accuracy · 60% faster training"
}
```

---

### 05 · EXPERIENCE SECTION

**Layout:** Vertical timeline (right-side content, left-side line with dot)

**Timeline Item:**
```jsx
<div className="relative pl-8 border-l-2 border-navy-light">
  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-navy border-2 border-cyan-400" />
  <span className="font-mono text-cyan-400 text-sm">{period}</span>
  <h3 className="text-lg font-semibold text-text-primary mt-1">{role}</h3>
  <h4 className="text-text-secondary">{company}</h4>
  <ul className="mt-3 space-y-1">
    {highlights.map(item => (
      <li key={item} className="text-text-secondary text-sm flex gap-2">
        <span className="text-cyan-400 mt-0.5">▹</span>{item}
      </li>
    ))}
  </ul>
</div>
```

---

### 06 · CERTIFICATIONS & ACHIEVEMENTS

**Layout:** 3-column masonry grid of glass cards

**Card Design:**
```jsx
<div className="glass-card p-5 hover:border-cyan-400/40 group">
  <div className="flex items-center gap-3 mb-3">
    <SafeImage src={cert.badgeUrl} alt={cert.issuer}
      className="w-12 h-12 rounded object-contain"
      fallback="icon" />
    <div>
      <h4 className="font-semibold text-text-primary text-sm">{cert.name}</h4>
      <p className="text-xs text-text-secondary font-mono">{cert.issuer} · {cert.date}</p>
    </div>
  </div>
  <div className="flex justify-between items-center">
    <span className={`text-xs px-2 py-1 rounded-full font-mono ${levelColors[cert.level]}`}>
      {cert.level}
    </span>
    <a href={cert.credentialUrl} className="text-cyan-400 text-xs hover:underline">
      Verify ↗
    </a>
  </div>
</div>
```

---

### 07 · CONTACT SECTION

**Layout:** 2-column — left CTA + social links, right functional form

**Form (no backend needed — use EmailJS or Formspree):**
```jsx
// EmailJS integration
import emailjs from '@emailjs/browser'

const handleSubmit = async (e) => {
  e.preventDefault()
  await emailjs.sendForm(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    formRef.current,
    'YOUR_PUBLIC_KEY'
  )
}
```

**Social Links:** GitHub · LinkedIn · HuggingFace · Twitter/X · Email · Resume (PDF)

---

## ✨ VISUAL EFFECTS IMPLEMENTATION

### Glassmorphism Utility Classes (globals.css)
```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 255, 218, 0.1);
  border-radius: 12px;
  transition: border-color 0.3s ease;
}
.glass-card:hover {
  border-color: rgba(100, 255, 218, 0.3);
}
.section-number {
  font-family: 'JetBrains Mono', monospace;
  color: #64FFDA;
  font-size: 0.875rem;
}
.gradient-text {
  background: linear-gradient(135deg, #64FFDA 0%, #00B4D8 50%, #1D4ED8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.glow-cyan {
  box-shadow: 0 0 20px rgba(100, 255, 218, 0.15);
}
```

### Scroll Reveal (Framer Motion Pattern)
```jsx
// SectionWrapper.jsx — wraps every section
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export const SectionWrapper = (Component, idName) => function HOC() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <motion.section
      ref={ref}
      id={idName}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-24 px-6 max-w-6xl mx-auto"
    >
      <Component />
    </motion.section>
  )
}
```

### Particle Background (tsparticles)
```jsx
import Particles from 'react-particles'
import { loadSlim } from 'tsparticles-slim'

const particlesConfig = {
  particles: {
    number: { value: 50 },
    color: { value: '#64FFDA' },
    opacity: { value: 0.15 },
    size: { value: { min: 1, max: 2 } },
    links: { enable: true, color: '#64FFDA', opacity: 0.08, distance: 150 },
    move: { enable: true, speed: 0.6 },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: 'repulse' } },
    modes: { repulse: { distance: 80, duration: 0.4 } },
  },
}
```

---

## 📊 NAVBAR SPEC

```
Fixed top · blur backdrop · logo left · nav links right · mobile hamburger
Links: About · Skills · Projects · Experience · Contact
Active state: cyan underline with dot
CTA: "Resume" → outlined cyan button
Progress bar: thin cyan line showing scroll progress at top
```

```jsx
// Scroll progress indicator
const [scrollProgress, setScrollProgress] = useState(0)
useEffect(() => {
  const handler = () => {
    const scrolled = window.scrollY
    const total = document.documentElement.scrollHeight - window.innerHeight
    setScrollProgress((scrolled / total) * 100)
  }
  window.addEventListener('scroll', handler)
  return () => window.removeEventListener('scroll', handler)
}, [])
// Render: <div style={{ width: `${scrollProgress}%` }} className="h-[2px] bg-cyan-400 fixed top-0 left-0 z-50 transition-all" />
```

---

## 🚀 GITHUB PAGES DEPLOYMENT

### vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/your-repo-name/',  // Replace with your GitHub repo name
})
```

### package.json scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist"
  },
  "devDependencies": {
    "gh-pages": "^6.0.0"
  }
}
```

### Deploy Commands
```bash
npm install --save-dev gh-pages
npm run deploy
```

### .github/workflows/deploy.yml (Auto-deploy on push)
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 📋 CONSTANTS FILE SCHEMA (src/constants/index.js)

```js
// SINGLE SOURCE OF TRUTH — edit only this file to update portfolio

export const personalInfo = {
  name: "Your Name",
  title: "AI Engineer",
  roles: ["AI Engineer", "ML Architect", "LLM Developer", "MLOps Engineer"],
  bio: "Building AI systems that scale from prototype to production.",
  location: "Your City, Country",
  email: "you@email.com",
  phone: "+91 XXXXXXXXXX",  // optional
  profileImage: "GOOGLE_DRIVE_LINK_OR_/assets/profile.jpg",
  resumeUrl: "GOOGLE_DRIVE_LINK_TO_PDF",
  social: {
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    huggingface: "https://huggingface.co/username",
    twitter: "https://twitter.com/username",
  }
}

export const stats = [
  { label: "Projects", value: 20, suffix: "+" },
  { label: "Models Deployed", value: 15, suffix: "" },
  { label: "Papers", value: 5, suffix: "" },
  { label: "Years Exp", value: 4, suffix: "+" },
]

export const skills = { /* see skill categories above */ }
export const projects = [ /* see project schema above */ ]
export const experience = [ /* see timeline schema above */ ]
export const certifications = [ /* see cert schema above */ ]
```

---

## ✅ QUALITY CHECKLIST — BEFORE DEPLOY

### Performance
- [ ] All images lazy-loaded (`loading="lazy"`)
- [ ] Three.js canvas: `frameloop="demand"` unless animating continuously
- [ ] Code splitting via React.lazy for heavy sections
- [ ] `npm run build` output < 2MB total
- [ ] Lighthouse Performance score > 85

### Visual Quality
- [ ] All Google Drive images render via thumbnail URL pattern
- [ ] `onError` fallback on every `<img>` tag
- [ ] No white flash on dark background
- [ ] Smooth scroll behavior (`scroll-behavior: smooth` in globals.css)
- [ ] All section reveals fire correctly on scroll
- [ ] Mobile nav works at 375px, 768px, 1024px, 1440px breakpoints
- [ ] Hover states on all interactive elements
- [ ] Cursor changes to pointer on all clickable items

### Content
- [ ] Typewriter cycles all roles
- [ ] Animated counters trigger on scroll into view
- [ ] Timeline items animate in sequence (stagger 0.1s)
- [ ] Contact form validates and shows success/error state
- [ ] All external links open in `target="_blank" rel="noopener noreferrer"`
- [ ] Resume download works

### Accessibility
- [ ] All images have meaningful `alt` text
- [ ] Nav has `aria-label`
- [ ] Color contrast ratio > 4.5:1 for body text
- [ ] Focus states visible on keyboard navigation

### GitHub Pages
- [ ] `base` in vite.config.js matches repo name
- [ ] `404.html` handling for SPA routing (copy index.html to 404.html in public/)
- [ ] Custom domain CNAME file if using custom domain

---

## 🎁 BONUS: AI-SPECIFIC DESIGN TOUCHES

1. **Neural network animation** in hero — shows deep understanding of the field
2. **Code snippets** in project cards — shows technical depth
3. **Model metrics badges** — "94% F1 · 2M params · 12ms latency"
4. **HuggingFace integration** — link to model cards
5. **arXiv paper cards** — if you have publications
6. **Live demo embeds** — Gradio/Streamlit iframes in modal overlay
7. **Dataset contribution badges** — Kaggle, HuggingFace datasets
8. **Conference badges** — NeurIPS, ICML, ICLR participation
9. **Contribution graph** — GitHub activity heatmap widget
10. **AI-themed cursor** — custom SVG cursor resembling a neural node

---

## 🧪 TESTING PROTOCOL

After building, test in this exact order:

```
1. npm run dev → check all sections render
2. Resize to 375px mobile → verify nav, cards, hero stack correctly  
3. Test Google Drive images → open Network tab, verify 200 on thumbnail URLs
4. Test contact form → submit test message
5. npm run build → check for errors
6. npm run preview → test production build locally
7. Deploy to GitHub Pages → test live URL
8. Run Lighthouse → fix any score below 80
```

---

## 🏆 TOP 1% CRITERIA

Your portfolio ranks in the top 1% when it achieves ALL of:

| Criterion | Target |
|-----------|--------|
| Load time | < 2 seconds on 4G |
| Visual distinctiveness | Instantly recognizable, not template-like |
| Content depth | Shows real projects with real metrics |
| AI credibility signals | HuggingFace, papers, deployed models |
| Mobile experience | Flawless at all breakpoints |
| Motion quality | Subtle, purposeful, 60fps |
| Recruiter impact | "I need to talk to this person" in 10 seconds |
| GitHub presence | Stars, contributions visible/linked |
| Technical writing | Project descriptions show thinking, not just tools |
| Personality | One genuine human element per section |

---

*Built for AI engineers who build the future. Make them stop scrolling.*
