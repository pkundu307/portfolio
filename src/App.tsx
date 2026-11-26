import { useEffect } from "react";
import "./portfolio.css";
import photo from "./me.png";

type Accent = "c" | "m" | "v" | "l";

const stats = [
  { value: "4+", label: "years of professional experience" },
  { value: "12+", label: "microservices built at Numenor" },
  { value: "1,000", label: "students on my LMS" },
  { value: "1", label: "founder-led marketplace, Jottosop" },
];

const jobs = [
  {
    role: "Full Stack AI Developer",
    org: "Numenor · Thiruvananthapuram",
    when: "Jan 2025 – Present",
    text: "Designed and developed 12+ microservices in Python, Go and JavaScript. Built asynchronous processing pipelines on message brokers and integrated frontends with backend services, working with cross-functional teams to ship and maintain them.",
  },
  {
    role: "Full Stack Developer",
    org: "Zauvijek · Noida",
    when: "Feb 2024 – Jan 2025",
    text: "Built features with React, Electron, Node.js and NestJS, including a cross-platform desktop billing application. Managed data with TypeORM, SQLite and MongoDB.",
  },
  {
    role: "Mentor, MERN Stack",
    org: "SURE TRUST · Remote",
    when: "",
    text: "Taught the MERN stack, gave doubt support and helped organize tests.",
  },
  {
    role: "Full Stack Developer Intern",
    org: "Qleep Private Limited · Kolkata",
    when: "2020 – 2021",
    text: "Implemented UX designs as UI and connected the client to the existing backend server.",
  },
];

const projects: {
  label: string;
  title: string;
  text: string;
  tags: string[];
  accent: Accent;
  link: { href: string; text: string };
}[] = [
  {
    label: "Founder · 10/2024 – Present",
    title: "Jottosop",
    text: "End-to-end customizable e-commerce platform with CRM and a transparent marketplace model. Seller vs admin RBAC, seller onboarding workflows and AI-powered shopping and selling features, from strategy to deployment.",
    tags: ["RBAC", "CRM", "AI"],
    accent: "c",
    link: { href: "https://jottosop.in/", text: "Visit jotosop.in →" },
  },
  {
    label: "Security tooling",
    title: "MCPGuard",
    text: "Python gateway that intercepts MCP tool calls between AI clients and servers. Human-in-the-loop Allow/Block, concurrent authorization with timeouts and fail-closed behavior, and audit logs with sensitive-data redaction. Validated with Claude Code.",
    tags: ["Python", "MCP", "JSON-RPC", "Tkinter"],
    accent: "m",
    link: { href: "https://github.com/pkundu307/MCPGuard", text: "View on GitHub →" },
  },
  {
    label: "Education tech",
    title: "Course Management Software",
    text: "LMS for institutions, trainers and students: course and student management, assignment tracking, attendance and trainer tools. Running with 1,000 students.",
    tags: ["Next.js", "Node.js", "Express", "Spring Boot", "MongoDB"],
    accent: "v",
    link: { href: "https://github.com/pkundu307/vision_project", text: "View on GitHub →" },
  },
  {
    label: "Applied AI",
    title: "AI PDF Assistant",
    text: "Mobile PDF assistant with semantic search and context-aware Q&A. RAG pipeline with Groq as primary LLM and Gemini fallback, persistent chat history and page-numbered source references.",
    tags: ["FastAPI", "React Native", "pgvector", "RAG"],
    accent: "l",
    link: {
      href: "https://pub-5b521def0bfc46dd9037956c478b8c67.r2.dev/application-60a8ce37-20d1-4ff0-9834-968b73090658.apk",
      text: "Download Android APK →",
    },
  },
];

const stack = [
  { group: "Backend", items: ["Node.js", "TypeScript", "Fastify", "Express", "NestJS", "FastAPI", "Go", "Spring Boot"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "MySQL", "Neo4j", "Redis"] },
  { group: "Messaging and infra", items: ["RabbitMQ", "Kafka", "BullMQ", "gRPC", "WebSocket", "Docker", "Kubernetes", "AWS", "CI/CD"] },
  { group: "Applied AI", items: ["RAG", "Vector DBs", "MCP", "Agentic AI", "Prompting"] },
  { group: "Frontend", items: ["React", "Next.js", "React Native", "Electron"] },
];

const contacts = [
  { text: "pkundu307@gmail.com", href: "mailto:pkundu307@gmail.com" },
  { text: "+91 8420962599", href: "tel:+918420962599" },
  { text: "GitHub", href: "https://github.com/pkundu307" },
  { text: "LinkedIn", href: "https://www.linkedin.com/in/prasanna-kundu-08319b194/" },
  { text: "LeetCode", href: "https://leetcode.com/pkundu307/" },
];

const external = (href: string) =>
  href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};

export default function App() {
  useEffect(() => {
    document.title = "Prasanna Kundu – Backend Engineer";
  }, []);

  return (
    <div className="pf">
      <header className="top">
        <a href="#top" className="logo">
          PK<span>.</span>
        </a>
        <nav className="nav" aria-label="Sections">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#stack">Stack</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="top" className="wrap" style={{ paddingTop: 72 }}>
          <div className="hero">
          <div>
          <div className="mono">Backend Engineer · Thiruvananthapuram, India</div>
          <h1 className="h1">Prasanna Kundu builds secure, event-driven backend services.</h1>
          <p className="p lead">
            4+ years across microservices, payments and applied AI. I design APIs, async pipelines and the
            systems around them, mostly in Node.js, TypeScript and Python.
          </p>
          <div className="btns">
            <a className="btn solid" href="#projects">View projects</a>
            <a className="btn" href="mailto:pkundu307@gmail.com">Email me</a>
          </div>
          </div>
          <img className="photo" src={photo} alt="Prasanna Kundu" />
          </div>
          <div className="grid g-220">
            {stats.map((s) => (
              <div className="card" key={s.label}>
                <div className="stat">{s.value}</div>
                <p className="p" style={{ marginTop: 6 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="wrap">
          <div className="mono">Experience</div>
          <h2 className="h2">Where I’ve worked</h2>
          <div className="stack-col">
            {jobs.map((j) => (
              <div className="card row" key={j.role + j.org}>
                <div>
                  <div className="h3">{j.role}</div>
                  <p className="p" style={{ marginTop: 6 }}>{j.org}</p>
                  {j.when && <div className="mono" style={{ marginTop: 10 }}>{j.when}</div>}
                </div>
                <p className="p">{j.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="wrap projects">
          <div className="mono" style={{ color: "#22d3ee" }}>Projects</div>
          <h2 className="h2 neon">Things I’ve built</h2>
          <div className="grid g-320">
            {projects.map((p) => (
              <article className={`pcard n-${p.accent}`} key={p.title}>
                <div className="mono">{p.label}</div>
                <h3 className="h3">{p.title}</h3>
                <p className="p">{p.text}</p>
                <div className="tags">
                  {p.tags.map((t) => (
                    <span className="tag" key={t}>{t}</span>
                  ))}
                </div>
                <a href={p.link.href} {...external(p.link.href)}>{p.link.text}</a>
              </article>
            ))}
          </div>
        </section>

        <section id="stack" className="wrap">
          <div className="mono">Stack</div>
          <h2 className="h2">What I work with</h2>
          <div className="grid g-240">
            {stack.map((s) => (
              <div className="card" key={s.group}>
                <div className="mono" style={{ marginBottom: 14 }}>{s.group}</div>
                <div className="tags">
                  {s.items.map((i) => (
                    <span className="tag" key={i}>{i}</span>
                  ))}
                </div>
              </div>
            ))}
            <div className="card">
              <div className="mono" style={{ marginBottom: 14 }}>Education</div>
              <p className="p">MCA (2022 – 2024) and BCA (2019 – 2022), Techno India University, Kolkata.</p>
            </div>
          </div>
        </section>

        <section id="contact" className="wrap" style={{ paddingBottom: 72 }}>
          <div className="card contact">
            <div className="mono">Contact</div>
            <h2 className="h2" style={{ marginBottom: 16 }}>Open to backend roles.</h2>
            <p className="p" style={{ maxWidth: 560 }}>
              If you’re building payments, platform or AI-backed services, I’d like to hear about it.
            </p>
            <div className="links">
              {contacts.map((c) => (
                <a key={c.text} href={c.href} {...external(c.href)}>{c.text}</a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}