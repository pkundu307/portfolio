import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import photo from "./me.png";
import zb from "./zb.png";
import vision from "./vision.png";
import mj from "./mj.png";
import chatvat from "./chatvat.png";
import CursorFollower from "./CursorFollower";
import ProfessionalExperience from "./PE";

// Skill Categories
const skillsByCategory = {
  Frontend: [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
    { name: "Material UI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
    { name: "CSS/SCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  ],
  Backend: [
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
    { name: "Nest.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" },
    { name: "FastAPI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "Spring Boot", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/springboot/springboot-original.svg" },
  ],
  Database: [
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "Neo4j", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg" },
    { name: "Timescale DB", icon: "https://s3.amazonaws.com/assets.timescale.com/timescale-web/brand-images/badge/yellow/logo-yellow.png" },
    { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
    { name: "TypeORM", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typeorm/typeorm-original.svg" },
  ],
  Tools: [
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Electron", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" },
    { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { name: "System Design", icon: "https://cdn-icons-png.freepik.com/256/2452/2452663.png?semt=ais_hybrid" },
  ],
};

// Projects Data
const projects = [
  {
    title: "Zauvijek Billing Software",
    description: "Comprehensive billing software managing parties, inventory, sales, purchases, expenses, and employees. Contributed as a Backend Engineer using Node.js, SQLite, Electron, and MongoDB.",
    image: zb,
    link: "#",
    tags: ["Node.js", "SQLite", "Electron", "MongoDB"],
    category: "Full Stack",
  },
  {
    title: "Course Management Software",
    description: "A scalable LMS handling 400+ students, offering course and student management, assignment tracking, and trainer tools. Built with Next.js, Node.js, MongoDB, and Spring Boot.",
    image: vision,
    link: "#",
    tags: ["Next.js", "Node.js", "MongoDB", "Spring Boot"],
    category: "Full Stack",
  },
  {
    title: "MOBI Jewellery (E-commerce)",
    description: "Full-stack e-commerce platform with features like user authentication, admin dashboard, multiple payment gateways, and order tracking.",
    image: mj,
    link: "https://github.com/pkundu307/mobi-jewellery",
    tags: ["React", "Node.js", "MongoDB", "Payment Gateway"],
    category: "Full Stack",
  },
  {
    title: "AI Chat App with Gemini",
    description: "AI chatbot platform with personalized chat sessions, conversation history, and customizable UI. Built with Next.js, MongoDB, and Google OAuth.",
    image: chatvat,
    link: "#",
    tags: ["Next.js", "MongoDB", "Google AI", "OAuth"],
    category: "Full Stack",
  },
];

// Tech Stack for Hero
const techStack = [
  "React",
  "Node.js",
  "Python",
  "Java",
  "TypeScript",
  "MongoDB",
  "PostgreSQL",
  "Docker",
];

const App: React.FC = () => {
  const [typedText, setTypedText] = useState("");
  const [currentTech, setCurrentTech] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const [mounted, setMounted] = useState(false);

  const fullText = "Full Stack Developer";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Typing effect
    let index = 0;
    const typeInterval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(typeInterval);
      }
    }, 100);

    // Tech rotation effect
    const techInterval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % techStack.length);
    }, 2000);

    // Particles animation
    setShowParticles(true);

    return () => {
      clearInterval(typeInterval);
      clearInterval(techInterval);
    };
  }, []);

  // Particle generation
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    tx: `${(Math.random() - 0.5) * 100}px`,
    ty: `${(Math.random() - 0.5) * 100}px`,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="text-4xl font-bold text-gradient mb-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            P
          </motion.div>
          <div className="text-yellow-500 font-mono text-sm">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      <CursorFollower />

      {/* Background Effects */}
      <div className="scanline fixed inset-0 pointer-events-none z-50" />
      <div className="grid-pattern fixed inset-0 pointer-events-none z-0" />

      {/* Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {showParticles &&
          particles.map((particle) => (
            <div
              key={particle.id}
              className="particle absolute"
              style={{
                left: `${particle.left}%`,
                top: "100%",
                animationDelay: `${particle.delay}s`,
                animationDuration: `${particle.duration}s`,
                ["--tx" as any]: particle.tx,
                ["--ty" as any]: particle.ty,
              }}
            />
          ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass border-b border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="text-2xl font-bold text-gradient font-mono"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <span className="text-yellow-400">&lt;</span>PK<span className="text-yellow-400">/&gt;</span>
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              {["About", "Experience", "Skills", "Projects", "Contact"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-yellow-400 transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <motion.div
            className="text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-block px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-4">
                <span className="text-yellow-400 font-mono text-sm">
                  {`// ${techStack[currentTech]}`}
                </span>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4"
              variants={itemVariants}
            >
              Hi, I'm{" "}
              <span className="text-gradient-vertical">
                Prasanna Kundu
              </span>
            </motion.h1>

            <motion.p
              className="text-2xl md:text-3xl text-gray-300 mb-6 font-mono typing-cursor"
              variants={itemVariants}
            >
              {typedText}
            </motion.p>

            <motion.p
              className="text-gray-400 mb-8 max-w-lg"
              variants={itemVariants}
            >
              Building robust backend systems and crafting seamless frontend experiences.
              Passionate about scalable architecture and clean code.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <motion.a
                href="#projects"
                className="btn-glow px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-3 border border-yellow-500 text-yellow-400 font-bold rounded-lg hover:bg-yellow-500/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right - Profile Image */}
          <motion.div
            className="relative flex justify-center"
            variants={itemVariants}
          >
            <div className="relative">
              {/* Floating Tech Badges */}
              <div className="absolute -top-4 -right-4 badge-pulse">
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
                  alt="React"
                  className="w-12 h-12"
                />
              </div>
              <div className="absolute top-20 -left-8 badge-pulse" style={{ animationDelay: "0.5s" }}>
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"
                  alt="Node.js"
                  className="w-10 h-10"
                />
              </div>
              <div className="absolute -bottom-4 -right-12 badge-pulse" style={{ animationDelay: "1s" }}>
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
                  alt="Python"
                  className="w-10 h-10"
                />
              </div>
              <div className="absolute bottom-10 left-8 badge-pulse" style={{ animationDelay: "1.5s" }}>
                <img
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
                  alt="Docker"
                  className="w-8 h-8"
                />
              </div>

              {/* Profile Image */}
              <motion.div
                className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-yellow-500/50 neon-border relative z-10"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img src={photo} alt="Prasanna Kundu" className="w-full h-full object-cover" />
              </motion.div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-yellow-500/20 blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-yellow-500/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-yellow-500 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 section-divider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">About Me</span>
          </motion.h2>

          <motion.div
            className="glass rounded-2xl p-8 card-hover"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  I am a passionate <span className="text-yellow-400 font-semibold">Full Stack Developer</span> with expertise in
                  designing and building robust software systems. I specialize in <span className="text-orange-400 font-semibold">backend development</span>
                  while being proficient in frontend technologies.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mt-4">
                  My skills include <span className="text-yellow-400">Java</span>, <span className="text-yellow-400">Node.js</span>,{" "}
                  <span className="text-yellow-400">React</span>, <span className="text-yellow-400">MongoDB</span>, and more.
                  I thrive on solving complex problems and creating scalable solutions.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Years Experience", value: "5+" },
                  { label: "Projects Completed", value: "50+" },
                  { label: "Happy Clients", value: "30+" },
                  { label: "Technologies", value: "25+" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-4 bg-black/50 rounded-lg border border-yellow-500/20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-gradient">{stat.value}</div>
                    <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 section-divider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">Education</span>
          </motion.h2>

          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-yellow-500 to-orange-500 hidden md:block" />

            <div className="space-y-8">
              {[
                {
                  degree: "MCA",
                  school: "Techno India University",
                  period: "2022 - 2024",
                  location: "Kolkata, India",
                  achievement: "CGPA: 8.9",
                },
                {
                  degree: "BCA",
                  school: "Techno India University",
                  period: "2019 - 2022",
                  location: "Kolkata, India",
                  achievement: "CGPA: 9.1",
                },
              ].map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="flex-1 w-full md:w-auto">
                    <div className="glass rounded-xl p-6 card-hover border-l-4 border-l-yellow-500">
                      <h3 className="text-2xl font-bold text-yellow-400">{edu.degree}</h3>
                      <h4 className="text-xl font-semibold mt-1">{edu.school}</h4>
                      <p className="text-gray-400 mt-2">{edu.period}</p>
                      <p className="text-gray-500 text-sm">{edu.location}</p>
                      <div className="mt-3 inline-block px-3 py-1 bg-yellow-500/20 rounded-full text-yellow-400 text-sm font-mono">
                        {`CGPA: ${edu.achievement}`}
                      </div>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full neon-border" />
                  <div className="flex-1 w-full md:w-auto" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Professional Experience Section */}
      <ProfessionalExperience />

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 section-divider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">Technical Skills</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skillsByCategory).map(([category, skills], catIndex) => (
              <motion.div
                key={category}
                className="glass rounded-xl p-6 card-hover"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
              >
                <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-yellow-500 rounded-full" />
                  {category}
                </h3>
                <div className="space-y-3">
                  {skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="flex items-center gap-3 p-2 hover:bg-yellow-500/10 rounded-lg transition-colors cursor-pointer group"
                      whileHover={{ x: 5 }}
                    >
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-8 h-8 opacity-70 group-hover:opacity-100 transition-opacity"
                      />
                      <span className="text-gray-300 group-hover:text-yellow-400 transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 section-divider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">Featured Projects</span>
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div
                  key={project.title}
                  className="glass rounded-xl overflow-hidden card-hover border border-yellow-500/20"
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-yellow-500/90 text-black text-sm font-semibold rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-yellow-400 mb-2">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-800 text-yellow-400 text-xs rounded border border-yellow-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      <span>View Project</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 section-divider"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-gradient">Get In Touch</span>
          </motion.h2>

          <motion.div
            className="glass rounded-2xl p-8 card-hover"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <p className="text-gray-300 text-lg mb-6">
                Let's build something amazing together!
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-8">
                {[
                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/prasanna-kundu-08319b194/",
                    icon: (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    ),
                    color: "text-orange-400 hover:text-orange-300",
                  },
                  {
                    name: "GitHub",
                    url: "https://github.com/pkundu307",
                    icon: (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    ),
                    color: "text-yellow-400 hover:text-yellow-300",
                  },
                  {
                    name: "LeetCode",
                    url: "https://leetcode.com/pkundu307",
                    icon: (
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0l12 6v12l-12 6-12-6v-12z" />
                        <path fill="#fff" d="M14.83 14.83l-2.37-2.37 2.37-2.37-1.26-1.26-2.37 2.37-2.37-2.37-1.26 1.26 2.37 2.37-2.37 2.37 1.26 1.26 2.37-2.37 2.37 2.37z" />
                      </svg>
                    ),
                    color: "text-yellow-400 hover:text-yellow-300",
                  },
                  {
                    name: "Email",
                    url: "mailto:pkundu307@gmail.com",
                    icon: (
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    ),
                    color: "text-orange-400 hover:text-orange-300",
                  },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 rounded-xl bg-gray-800 hover:bg-gray-700 transition-all ${social.color} hover:scale-110`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-black/50 rounded-lg border border-yellow-500/20">
                  <div className="text-yellow-400 font-mono text-sm mb-1">PHONE</div>
                  <a href="tel:+918420962599" className="text-gray-300 hover:text-yellow-400 transition-colors">
                    +91 8420962599
                  </a>
                </div>
                <div className="p-4 bg-black/50 rounded-lg border border-yellow-500/20">
                  <div className="text-yellow-400 font-mono text-sm mb-1">EMAIL</div>
                  <a href="mailto:pkundu307@gmail.com" className="text-gray-300 hover:text-yellow-400 transition-colors">
                    pkundu307@gmail.com
                  </a>
                </div>
                <div className="p-4 bg-black/50 rounded-lg border border-yellow-500/20">
                  <div className="text-yellow-400 font-mono text-sm mb-1">LOCATION</div>
                  <p className="text-gray-300">
                    Trivandrum, Kerala
                    <span className="text-gray-500 text-xs block">
                      (Current)
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-yellow-500/20 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-sm">
            <span className="text-yellow-400 font-mono">&copy; 2024</span> Prasanna Kundu. Built with{" "}
            <span className="text-orange-400">React</span> &{" "}
            <span className="text-orange-400">TailwindCSS</span>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
