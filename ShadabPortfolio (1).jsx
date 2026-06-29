import { useState, useEffect, useRef } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────
const DATA = {
  name: "Shadab Ahmed",
  title: "Data Analyst & Web Developer",
  bio: "Detail-oriented Associate with hands-on experience in advanced Excel, data analysis, and reporting. Background in Electronics & Communication Engineering with working knowledge of Python, HTML, CSS, and JavaScript.",
  location: "Jabalpur, Madhya Pradesh",
  email: "ahmedshadab286@gmail.com",
  phone: "+91 7987454307",
  linkedin: "https://www.linkedin.com/in/shadab-ahmed-67b35121b",

  stats: [
    { num: "2+", label: "Years Exp." },
    { num: "8.1", label: "CGPA" },
    { num: "2",   label: "Certs" },
  ],

  skills: [
    { icon: "📊", name: "Microsoft Excel",  desc: "Advanced formulas, Pivot Tables, VLOOKUP/HLOOKUP, Data Validation, KPI Dashboards", level: 92 },
    { icon: "📈", name: "Data Analysis",    desc: "Trend identification, data cleaning, transformation, and business reporting", level: 80 },
    { icon: "🐍", name: "Python",           desc: "Data processing, scripting, automation and analysis workflows", level: 68 },
    { icon: "🌐", name: "Web Development",  desc: "HTML & CSS for building structured, styled web pages", level: 65 },
    { icon: "⚡", name: "JavaScript",       desc: "Frontend scripting and interactive web elements", level: 55 },
    { icon: "🗄️", name: "SQL",              desc: "Basic queries, data retrieval, and database understanding (actively learning)", level: 40 },
  ],

  experience: [
    {
      role: "Associate", company: "SRCOMSOFT", period: "Apr 2025 – Present",
      bullets: [
        "Managed and maintained large datasets ensuring high accuracy and data integrity",
        "Performed data validation, cleaning, and transformation using advanced Excel",
        "Generated reports and dashboards to support business decision-making",
        "Utilized VLOOKUP, HLOOKUP, IF, and Pivot Tables for data analysis",
        "Reduced data errors by implementing validation checks and structured templates",
      ],
    },
    {
      role: "Business Development Associate", company: "Squadstack", period: "Sep 2024 – Mar 2025",
      bullets: [
        "Generated and qualified leads through cold calling and email outreach",
        "Delivered product presentations and communicated value propositions",
        "Analyzed sales data using Excel Pivot Tables and VLOOKUP",
        "Created dashboards to monitor KPIs like conversion rates and revenue",
        "Built and maintained strong client relationships to improve retention",
      ],
    },
    {
      role: "Data Analysis & Reporting", company: "Project-Based Contribution", period: "Jan 2024 – Jun 2024",
      bullets: [
        "Worked on data analysis projects using Excel dashboards",
        "Created sample business reports and KPI dashboards",
        "Practiced data cleaning and transformation techniques",
        "Analyzed datasets to identify trends and actionable insights",
      ],
    },
  ],

  projects: [
    {
      icon: "⚡", name: "Footstep Power Generator",
      desc: "Designed a system to generate electrical energy from human footsteps using piezoelectric sensors. Integrated multiple sensors to improve voltage output and validated performance for real-world deployment in high-footfall areas.",
      tags: ["Piezoelectric Sensors", "Circuit Design", "Renewable Energy", "ECE"],
    },
    {
      icon: "📊", name: "KPI Dashboards & Business Reports",
      desc: "Built comprehensive Excel dashboards to track business KPIs including conversion rates and revenue trends. Implemented data validation frameworks that reduced errors and automated repetitive reporting workflows.",
      tags: ["Excel", "Data Analysis", "KPIs", "Dashboards"],
    },
  ],

  education: [
    { degree: "B.Tech — Electronics & Communication Engineering", school: "Shri Ram Institute of Technology", period: "2020 – 2024", note: "CGPA 8.10 / 10" },
    { degree: "Higher Secondary Education (PCM)", school: "Nachiketa Higher Secondary School", period: "2019 – 2020", note: null },
  ],

  certifications: [
    { name: "Web Development (HTML & CSS)", issuer: "Udemy", icon: "🎓" },
    { name: "Python Programming", issuer: "CodeWithHarry", icon: "🐍" },
    { name: "SQL", issuer: "Actively learning", icon: "🔒", muted: true },
  ],
};

// ── THEME ────────────────────────────────────────────────────────────────────
const C = {
  ink: "#0f1117", slate: "#3a3f52", muted: "#8690a8",
  rule: "#e2e6f0", paper: "#f7f8fc", white: "#ffffff",
  accent: "#2d6ef5", accent2: "#00c9a0", glow: "rgba(45,110,245,0.12)",
};

// ── HOOK: reveal on scroll ───────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── SMALL COMPONENTS ─────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(28px)", transition: `opacity .6s ${delay}ms ease, transform .6s ${delay}ms ease`, ...style }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".75rem", color: C.accent, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: ".75rem" }}>{children}</p>;
}

function SectionTitle({ children, light }) {
  return <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", color: light ? C.white : C.ink, marginBottom: "3rem" }}>{children}</h2>;
}

// ── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ active }) {
  const links = ["skills", "experience", "projects", "education", "contact"];
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 2.5rem", background: "rgba(247,248,252,0.88)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.rule}` }}>
      <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".85rem", fontWeight: 600, color: C.accent, letterSpacing: ".04em" }}>SA_portfolio</span>
      <div style={{ display: "flex", gap: "2rem" }}>
        {links.map(l => (
          <a key={l} href={`#${l}`} style={{ fontSize: ".85rem", fontWeight: 500, color: active === l ? C.accent : C.slate, textDecoration: "none", letterSpacing: ".03em", transition: "color .2s", textTransform: "capitalize" }}>{l}</a>
        ))}
      </div>
    </nav>
  );
}

// ── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const chips = ["Excel", "Python", "SQL", "HTML/CSS", "JavaScript", "Pivot Tables", "VLOOKUP", "Dashboards"];
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "8rem 2.5rem 4rem", background: C.paper }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", maxWidth: 1100, width: "100%", alignItems: "center" }}>
        {/* left */}
        <div>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".8rem", color: C.accent, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: "1rem" }}>// {DATA.title}</p>
          <h1 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(2.8rem,5vw,4.2rem)", lineHeight: 1.08, color: C.ink, marginBottom: "1.2rem" }}>
            Shadab<br /><em style={{ fontStyle: "italic", color: C.accent }}>Ahmed</em>
          </h1>
          <p style={{ fontSize: "1rem", color: C.slate, lineHeight: 1.75, maxWidth: 420, marginBottom: "2rem" }}>{DATA.bio}</p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#contact" style={{ display: "inline-block", padding: ".7rem 1.6rem", background: C.accent, color: "#fff", fontSize: ".875rem", fontWeight: 600, borderRadius: 6, textDecoration: "none" }}>Get in touch</a>
            <a href="#experience" style={{ display: "inline-block", padding: ".7rem 1.6rem", border: `1.5px solid ${C.rule}`, color: C.slate, fontSize: ".875rem", fontWeight: 500, borderRadius: 6, textDecoration: "none" }}>View experience</a>
          </div>
        </div>
        {/* right — card */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ background: C.white, border: `1px solid ${C.rule}`, borderRadius: 16, padding: "2rem", width: "100%", maxWidth: 360, boxShadow: "0 4px 32px rgba(0,0,0,.06)", position: "relative" }}>
            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1.5rem" }}>
              {DATA.stats.map(s => (
                <div key={s.label} style={{ flex: 1 }}>
                  <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "2rem", color: C.accent, lineHeight: 1 }}>{s.num}</div>
                  <div style={{ fontSize: ".72rem", color: C.muted, letterSpacing: ".05em", textTransform: "uppercase", marginTop: ".2rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
              {chips.map((c, i) => (
                <span key={c} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".72rem", padding: ".3rem .7rem", borderRadius: 100, border: `1px solid ${i < 2 ? C.accent : C.rule}`, color: i < 2 ? C.accent : C.slate, background: i < 2 ? C.glow : C.paper }}>{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SKILLS ───────────────────────────────────────────────────────────────────
function SkillBar({ level }) {
  const [ref, visible] = useReveal();
  return (
    <div ref={ref} style={{ height: 4, background: C.rule, borderRadius: 2, marginTop: ".8rem", overflow: "hidden" }}>
      <div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${C.accent}, ${C.accent2})`, width: visible ? `${level}%` : "0%", transition: "width 1s ease" }} />
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "6rem 2.5rem", background: C.white }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><SectionLabel>// What I work with</SectionLabel></Reveal>
        <Reveal delay={80}><SectionTitle>Technical Skills</SectionTitle></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1.5rem" }}>
          {DATA.skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 60}>
              <div style={{ background: C.paper, border: `1px solid ${C.rule}`, borderRadius: 12, padding: "1.4rem 1.2rem", height: "100%" }}>
                <div style={{ fontSize: "1.5rem", marginBottom: ".6rem" }}>{s.icon}</div>
                <div style={{ fontWeight: 600, fontSize: ".9rem", color: C.ink, marginBottom: ".3rem" }}>{s.name}</div>
                <div style={{ fontSize: ".8rem", color: C.muted, lineHeight: 1.5 }}>{s.desc}</div>
                <SkillBar level={s.level} />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" style={{ padding: "6rem 2.5rem", background: C.paper }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><SectionLabel>// Where I've worked</SectionLabel></Reveal>
        <Reveal delay={80}><SectionTitle>Professional Experience</SectionTitle></Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {DATA.experience.map((job, i) => (
            <Reveal key={job.company} delay={i * 100}>
              <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "2rem", alignItems: "start" }}>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".78rem", color: C.muted, textAlign: "right", paddingTop: ".2rem", lineHeight: 1.6 }}>{job.period.replace(" – ", "\n– ")}</div>
                <div style={{ background: C.white, border: `1px solid ${C.rule}`, borderRadius: 12, padding: "1.6rem" }}>
                  <div style={{ fontWeight: 600, fontSize: "1rem", color: C.ink }}>{job.role}</div>
                  <div style={{ fontSize: ".85rem", color: C.accent, fontWeight: 500, marginBottom: ".8rem" }}>{job.company}</div>
                  <ul style={{ listStyle: "none" }}>
                    {job.bullets.map(b => (
                      <li key={b} style={{ fontSize: ".875rem", color: C.slate, padding: ".3rem 0 .3rem 1.2rem", position: "relative" }}>
                        <span style={{ position: "absolute", left: 0, color: C.accent2, fontSize: ".75rem" }}>→</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── PROJECTS ─────────────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" style={{ padding: "6rem 2.5rem", background: C.white }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><SectionLabel>// Things I've built</SectionLabel></Reveal>
        <Reveal delay={80}><SectionTitle>Projects</SectionTitle></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {DATA.projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div style={{ background: C.paper, border: `1px solid ${C.rule}`, borderRadius: 14, padding: "2rem", height: "100%" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{p.icon}</div>
                <div style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.25rem", marginBottom: ".5rem", color: C.ink }}>{p.name}</div>
                <div style={{ fontSize: ".875rem", color: C.slate, lineHeight: 1.7 }}>{p.desc}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem", marginTop: "1rem" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: ".72rem", padding: ".2rem .6rem", borderRadius: 4, background: C.glow, color: C.accent, fontWeight: 500 }}>{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── EDUCATION ────────────────────────────────────────────────────────────────
function Education() {
  return (
    <section id="education" style={{ padding: "6rem 2.5rem", background: C.paper }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal><SectionLabel>// Credentials</SectionLabel></Reveal>
        <Reveal delay={80}><SectionTitle>Education & Certifications</SectionTitle></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <Reveal delay={100}>
            <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.3rem", marginBottom: "1.2rem", color: C.ink }}>Education</h3>
            {DATA.education.map(e => (
              <div key={e.degree} style={{ background: C.white, border: `1px solid ${C.rule}`, borderRadius: 12, padding: "1.4rem", marginBottom: "1rem" }}>
                <div style={{ fontWeight: 600, fontSize: ".95rem", color: C.ink }}>{e.degree}</div>
                <div style={{ fontSize: ".85rem", color: C.accent, margin: ".2rem 0" }}>{e.school}</div>
                <div style={{ fontSize: ".8rem", color: C.muted }}>{e.period}</div>
                {e.note && <span style={{ display: "inline-block", marginTop: ".6rem", fontFamily: "'JetBrains Mono',monospace", fontSize: ".8rem", padding: ".2rem .6rem", background: "rgba(0,201,160,.1)", color: C.accent2, borderRadius: 4 }}>{e.note}</span>}
              </div>
            ))}
          </Reveal>
          <Reveal delay={180}>
            <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "1.3rem", marginBottom: "1.2rem", color: C.ink }}>Certifications</h3>
            {DATA.certifications.map(c => (
              <div key={c.name} style={{ background: c.muted ? "rgba(45,110,245,.04)" : C.white, border: `1px solid ${c.muted ? "rgba(45,110,245,.2)" : C.rule}`, borderRadius: 12, padding: "1.4rem", marginBottom: "1rem" }}>
                <div style={{ fontWeight: 600, fontSize: ".9rem", color: c.muted ? C.muted : C.ink }}>{c.icon} {c.name}</div>
                <div style={{ fontSize: ".82rem", color: C.muted, marginTop: ".2rem" }}>{c.issuer}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ padding: "6rem 2.5rem", background: C.ink, textAlign: "center" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".75rem", color: C.accent2, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: ".75rem" }}>// Let's connect</p>
        <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(1.8rem,3vw,2.6rem)", color: C.white, marginBottom: "1rem" }}>Get In Touch</h2>
        <p style={{ color: "rgba(255,255,255,.6)", marginBottom: "2.5rem", fontSize: ".95rem" }}>Open to data analyst roles, web development projects, and collaborative opportunities.</p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: `✉️ ${DATA.email}`, href: `mailto:${DATA.email}`, primary: true },
            { label: "💼 LinkedIn Profile", href: DATA.linkedin, primary: false },
            { label: `📞 ${DATA.phone}`, href: `tel:${DATA.phone}`, primary: false },
          ].map(l => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", padding: ".8rem 1.8rem", border: `1.5px solid ${l.primary ? C.accent : "rgba(255,255,255,.15)"}`, borderRadius: 8, color: C.white, textDecoration: "none", fontSize: ".875rem", fontWeight: 500, background: l.primary ? C.accent : "transparent" }}>
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Google Fonts
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;600&display=swap";
    document.head.appendChild(link);

    // Global styles
    const style = document.createElement("style");
    style.textContent = `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; } html { scroll-behavior: smooth; } body { font-family: 'Inter', sans-serif; background: #f7f8fc; overflow-x: hidden; }`;
    document.head.appendChild(style);

    // Active section tracker
    const sections = ["skills", "experience", "projects", "education", "contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.4 });
    sections.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <Nav active={activeSection} />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <footer style={{ background: C.ink, textAlign: "center", padding: "1.5rem", borderTop: "1px solid rgba(255,255,255,.07)", fontSize: ".78rem", color: "rgba(255,255,255,.3)", fontFamily: "'JetBrains Mono',monospace" }}>
        © 2025 Shadab Ahmed · Jabalpur, Madhya Pradesh
      </footer>
    </div>
  );
}
