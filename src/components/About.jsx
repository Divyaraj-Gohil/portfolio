import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';

const About = () => {
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
    visible: { opacity: 1, y: 0 },
  };

  const handleDownloadResume = () => {
    // Resume is in public folder - Vite automatically handles base path
    const resumeUrl = `${import.meta.env.BASE_URL}resume.pdf`;
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Divyaraj_Gohil_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-white dark:bg-gray-900"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-white"
          >
            About Me
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-12"
          />

          <div className="max-w-4xl mx-auto">
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
            >
              I'm a Backend Node.js Developer driven by the challenge of building powerful and efficient 
              server-side applications. My MERN stack proficiency, particularly in Node.js and database 
              optimization, allows me to create robust solutions.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed"
            >
              I also leverage NestJS for modern development practices and have experience with Shopify 
              integrations, adding value to e-commerce platforms. My expertise includes working with 
              MongoDB, SQL, Sequelize, TypeORM, GraphQL, and WebSocket for real-time applications.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed"
            >
              I'm passionate about creating scalable backend systems, optimizing database performance, 
              and building seamless integrations that enhance user experiences.
            </motion.p>

            <motion.div variants={itemVariants} className="flex justify-center">
              <button
                onClick={handleDownloadResume}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
              >
                <FaDownload className="w-5 h-5" />
                Download Resume
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

