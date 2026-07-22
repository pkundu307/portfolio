import { motion } from 'framer-motion';
import React from 'react';

const ProfessionalExperience: React.FC = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company: "Numenor",
      date: "02/2025 – Present",
      location: "Remote, India",
      description: "As a software engineer, I am responsible for creating and managing APIs (FastAPI, Python) and connecting all kinds of databases (SQL, NoSQL, Graph databases) required for ongoing projects. I also handle UI fixes and implementing new features (React + TypeScript). Additionally, I manage deployment and CI/CD pipelines.",
      technologies: ["FastAPI", "Python", "React", "TypeScript", "Docker", "CI/CD"],
    },
    {
      title: "Full Stack Developer",
      company: "Zauvijek",
      date: "03/2024 – 02/2025",
      location: "Noida, India",
      description: "As a Full Stack Developer proficient in React, Node.js, Nest.js, and Electron, specializing in desktop Windows application development, my responsibilities span from frontend UI/UX design to backend architecture. I craft intuitive user interfaces, implement robust backend systems, and ensure seamless cross-platform compatibility using Electron.",
      technologies: ["React", "Node.js", "Nest.js", "Electron", "TypeScript"],
    },
    {
      title: "Full Stack Development Educator",
      company: "SURE TRUST",
      date: "09/2022 – 09/2023",
      location: "Remote, India",
      description: "Taught MERN stack development to students, provided doubt support and mentoring, helped organize assessments and coding tests, and guided students in building real-world projects.",
      technologies: ["MERN Stack", "Teaching", "Mentorship"],
    },
    {
      title: "Full Stack Developer",
      company: "Qleep Private Limited",
      date: "2020 – 2021",
      location: "Kolkata, India",
      description: "Implemented proper UI designs as per UX specifications, connected client-side with existing backend APIs, optimized frontend performance, and collaborated with design and backend teams to deliver seamless user experiences.",
      technologies: ["React", "JavaScript", "REST APIs", "CSS"],
    },
  ];

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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-20 px-6 relative z-10 bg-gradient-to-b from-gray-900 via-black to-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 section-divider"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-gradient">Professional Experience</span>
        </motion.h2>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500 hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              className="relative pl-0 md:pl-24 mb-8"
              variants={itemVariants}
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 md:left-8 top-0 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full neon-border z-10 hidden md:block" />

              {/* Experience Card */}
              <motion.div
                className="glass rounded-xl p-6 card-hover border-l-4 border-l-orange-500"
                whileHover={{ x: 5 }}
              >
                {/* Mobile Timeline Dot */}
                <div className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full neon-border md:hidden mb-4" />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-yellow-400">{exp.title}</h3>
                    <h4 className="text-lg font-semibold text-gray-200">{exp.company}</h4>
                  </div>
                  <div className="mt-2 md:mt-0 flex flex-col md:items-end">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full text-yellow-400 text-sm font-mono border border-yellow-500/30">
                      {exp.date}
                    </span>
                    <span className="text-gray-500 text-sm mt-1">{exp.location}</span>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {exp.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 text-yellow-400 text-xs rounded border border-yellow-500/20 hover:bg-yellow-500/10 transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProfessionalExperience;
