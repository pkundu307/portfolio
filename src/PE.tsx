import { motion } from 'framer-motion';

const ProfessionalExperience = () => {
  return (
    <section className="py-10 px-5 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white">
      <h2 className="text-3xl font-semibold text-center mb-5 text-blue-400">Professional Experience</h2>
      <div className="max-w-5xl mx-auto">
        <div className="space-y-8 pl-6 border-l-4 border-blue-400">
          {[
            {
              title: "Zauvijek, Full Stack Developer",
              date: "03/2024 – present",
              location: "Noida, India",
              description: "As a Full Stack Developer proficient in React, Node.js, Nest.js, and Electron, specializing in desktop Windows application development, my responsibilities span from frontend UI/UX design to backend architecture. I am tasked with crafting intuitive user interfaces, implementing robust backend systems, and ensuring seamless cross-platform compatibility using Electron."
            },
            {
              title: "Full Stack Development Educator (SURE TRUST)",
              date: "09/2022 – 09/2023",
              location: "Remote, India",
              description: "Responsibilities: Taught MERN stack, Provided doubt support, Helped organize tests."
            },
            {
              title: "Full Stack Developer (Qleep Private Limited)",
              date: "2020 – 2021",
              location: "Kolkata, India",
              description: "Responsibilities: Implemented proper UI as per the design provided by the UX designer, connected the client-side with the existing backend."
            },
          ].map((experience, index) => (
            <motion.div
              className="flex items-center space-x-4 bg-transparent hover:bg-blue-900 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out rounded-lg p-4"
              key={index}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-3 h-3 bg-blue-400 rounded-full" />
              <div>
                <h3 className="text-xl font-semibold">{experience.title}</h3>
                <p className="text-sm text-gray-400">{experience.date} | {experience.location}</p>
                <p className="mt-2 text-sm text-gray-300">{experience.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalExperience;
