import React from "react";
import { motion } from "framer-motion";
import photo from "./me.png"
import zb from "./zb.png"
import vision from "./vision.png"
import mj from "./mj.png"
import chatvat from "./chatvat.png"
import CursorFollower from "./CursorFollower";
import ProfessionalExperience from "./PE";

const App: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-blue-950 via-blue-800 to-blue-600 text-white min-h-screen">
      <CursorFollower/>
      {/* Header Section */}
      <header className="py-10 text-center">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Prasanna Kundu
        </motion.h1>
        <motion.p
          className="text-lg mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Full Stack Developer{"(BACKEND LOVER)"}
        </motion.p>
      </header>

      {/* About Section */}
      <section className="py-10 px-5 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
              <div className="mt-5">
            {/* Placeholder for adding a photo */}
            <div className="w-40 h-40 mx-auto bg-blue-800 rounded-full flex items-center justify-center">
              <span className="text-sm text-gray-300 rounded-3xl"><img src={photo} alt="Profile" className="rounded-full"/></span>
            </div>
          </div>
          <h2 className="text-3xl font-semibold mb-5">About Me</h2>
          <p>
            I am a passionate Full Stack Developer with expertise in designing
            and building robust software systems. I specialize in backend
            development while being proficient in frontend technologies. My
            skills include Java, Node.js, React, MongoDB, and more.
          </p>
      
        </motion.div>
      </section>
      <section className="py-10 px-5">
  <h2 className="text-3xl font-semibold text-center mb-5">Education</h2>
  <div className="text-center flex justify-center gap-10">
    <div className="mb-5">
      <h3 className="text-xl font-bold">MCA, Techno India University</h3>
      <p className="text-lg">2022 – 04/2024 | Kolkata, India</p>
      <p className="text-lg">CGPA: 8.9</p>
    </div>
    <div>
      <h3 className="text-xl font-bold">BCA, Techno India University</h3>
      <p className="text-lg">2019 – 2022 | Kolkata, India</p>
      <p className="text-lg">CGPA: 9.1</p>
    </div>
  </div>
</section>
<ProfessionalExperience/>
      {/* Skills Section */}
      <section className="py-10 px-5 overflow-hidden">
  <h2 className="text-3xl font-semibold text-center mb-5">Skills</h2>
  <motion.div
    className="whitespace-nowrap flex"
    initial={{ x: "100%" }}
    animate={{ x: "-100%" }}
    transition={{
      duration: 27,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    {[...Array(3)].map((_, iteration) => ( // Duplicate the list for seamless looping
      <ul
        key={iteration}
        className="flex items-center space-x-8"
      >
        {[
          { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
          { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
          { name: "Material UI", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg" },
          { name: "System Design", icon: "/path/to/system-design-icon.png" }, // Replace with custom icon
          { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
          { name: "DSA (Java)", icon: "/path/to/dsa-icon.png" }, // Replace with custom icon
          { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
          { name: "GIT", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
          { name: "Electron", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/electron/electron-original.svg" },
          { name: "Nest.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg" },
          { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
          { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg" },
          { name: "CSS/SCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
          { name: "Networking", icon: "/path/to/networking-icon.png" }, // Replace with custom icon
          { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
          { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
          { name: "TailwindCSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
          { name: "Spring Boot", icon: "/path/to/spring-boot-icon.png" }, // Replace with custom icon
          { name: "TypeORM", icon: "/path/to/typeorm-icon.png" }, // Replace with custom icon
          { name: "React Native", icon: "/path/to/react-native-icon.png" }, // Replace with custom icon
        ].map((skill, index) => (
          <li
            key={`${iteration}-${index}`}
            className="flex flex-col items-center bg-gradient-to-r from-blue-950 via-blue-500 to-blue-900 rounded-lg px-6 py-3 shadow-md text-sm"
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-12 h-12 mb-2"
            />
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    ))}
  </motion.div>
</section>


      {/* Projects Section */}
      <section className="py-10 px-5">
  <h2 className="text-3xl font-semibold text-center mb-5">Projects</h2>
  <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
    {[
      {
        title: "Zauvijek Billing Software",
        description:
          "Comprehensive billing software managing parties, inventory, sales, purchases, expenses, and employees. Contributed as a Backend Engineer using Node.js, SQLite, Electron, and MongoDB.",
        image: zb, // Replace with the actual image URL
        link: "#",
      },
      {
        title: "Course Management Software",
        description:
          "A scalable LMS handling 400+ students, offering course and student management, assignment tracking, and trainer tools. Built with Next.js, Node.js, MongoDB, and Spring Boot.",
        image: vision, // Replace with the actual image URL
        link: "#",
      },
      {
        title: "MOBI Jewellery (E-commerce Platform)",
        description:
          "Full-stack e-commerce platform with features like user authentication, admin dashboard, multiple payment gateways, and order tracking.",
        image: mj, // Replace with the actual image URL
        link: "https://github.com/pkundu307/mobi-jewellery",
      },
      {
        title: "AI Chat App with Gemini",
        description:
          "AI chatbot platform with personalized chat sessions, conversation history, and customizable UI. Built with Next.js, MongoDB, and Google OAuth.",
        image: chatvat, // Replace with the actual image URL
        link: "#",
      },
    ].map((project, index) => (
      <motion.div
        className="bg-blue-800 rounded-lg shadow-lg overflow-hidden"
        key={index}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-5">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <p className="mt-2 text-sm">{project.description}</p>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block mt-3 text-blue-300 hover:underline"
          >
            View Project
          </a>
        </div>
      </motion.div>
    ))}
  </div>
</section>


      {/* Footer Section */}
      <footer className="py-10 text-center">
  <motion.div
    initial={{ y: 50 }}
    animate={{ y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <section className="py-10 px-5">
      <h2 className="text-3xl font-semibold text-center mb-5">Contact Information</h2>
      <p>  Connect with me on </p>

      <div className="text-center">
        <p className="text-xl mb-5">
        
          <a
            href="https://www.linkedin.com/in/prasanna-kundu-08319b194/"
            className="text-blue-300 hover:text-blue-500 ml-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://i0.wp.com/theedinburghreporter.co.uk/wp-content/uploads/2023/07/alexander-shatov-9Zjd7PE_FRM-unsplash.jpg?fit=3200%2C2400&ssl=1" // LinkedIn CDN link
              alt="LinkedIn"
              className="w-20 h-12 rounded-full inline-block"
            />
          </a>
          <a
            href="https://github.com/pkundu307"
            className="text-blue-300 hover:text-blue-500 ml-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStEJOLvmB_jgIRwoTlBewFuAkjpttBAqOLdw&s" // GitHub CDN link
              alt="GitHub"
              className="w-10 h-10 rounded-full inline-block"
            />
          </a>
          <a
            href="https://leetcode.com/pkundu307"
            className="text-blue-300 hover:text-blue-500 ml-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://avatars.githubusercontent.com/u/41718343?s=280&v=4" // LeetCode CDN link
              alt="LeetCode"
              className="w-10 rounded-full h-10 inline-block"
            />
          </a>
          <a
            href="pkundu307@gmail.com"
            className="text-blue-300 hover:text-blue-500 ml-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://www.fayerwayer.com/resizer/v2/XC3RHEYJEFCTDA6ELESHG3DNWE.jpg?auth=ac7bd94939995ff95b55a35c86bcb763d91b4d43eb9499895b7cc064feefe659&width=1200&height=675&smart=true" // GitHub CDN link
              alt="Gmail"
              className="w-20 h-10 rounded-full inline-block"
            />
          </a>
        </p>
        <p className="text-xl">Phone: <a href="tel:+918420962599" className="text-blue-300">8420962599</a></p>
        <p className="text-xl">Email: <a href="mailto:pkundu307@gmail.com" className="text-blue-300">pkundu307@gmail.com</a></p>
        <p className="text-xl">Location: Kolkata, India</p>
      </div>
    </section>
  </motion.div>
</footer>

    </div>
  );
};

export default App;
