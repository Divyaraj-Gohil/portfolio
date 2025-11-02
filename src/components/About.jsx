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

  const handleDownloadResume = async () => {
    try {
      // Construct the correct path based on environment
      const baseUrl = import.meta.env.BASE_URL || '/';
      const resumeUrl = `${baseUrl}resume.pdf`;
      
      console.log('Attempting to download resume from:', resumeUrl);
      
      // Fetch the file as a blob
      const response = await fetch(resumeUrl);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch resume: ${response.status} ${response.statusText}`);
      }
      
      // Get the blob data
      const blob = await response.blob();
      
      // Check if blob is valid (not empty)
      if (blob.size === 0) {
        throw new Error('Resume file appears to be empty');
      }
      
      console.log('Resume blob size:', blob.size, 'bytes');
      console.log('Resume blob type:', blob.type);
      
      // Verify it's actually a PDF by checking the first bytes
      const arrayBuffer = await blob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      const pdfHeader = uint8Array.slice(0, 4);
      const pdfHeaderString = String.fromCharCode(...pdfHeader);
      
      if (pdfHeaderString !== '%PDF') {
        console.warn('Warning: File does not appear to be a valid PDF (header:', pdfHeaderString, ')');
      }
      
      // Create a new blob with explicit PDF type
      const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
      
      // Create a blob URL
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      
      // Create download link
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'Divyaraj_Gohil_Resume.pdf';
      link.setAttribute('download', 'Divyaraj_Gohil_Resume.pdf');
      link.style.display = 'none';
      
      // Append to body
      document.body.appendChild(link);
      
      // Trigger download
      link.click();
      
      // Cleanup after a delay to ensure download starts
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
        window.URL.revokeObjectURL(blobUrl);
      }, 300);
      
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert(`Failed to download resume: ${error.message}\n\nPlease check:\n1. resume.pdf is in the public folder\n2. The file is a valid PDF\n3. Your browser allows downloads`);
    }
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

          <div className="max-w-4xl mx-auto px-2">
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed"
            >
              I'm a Backend Node.js Developer driven by the challenge of building powerful and efficient 
              server-side applications. My MERN stack proficiency, particularly in Node.js and database 
              optimization, allows me to create robust solutions.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed"
            >
              I also leverage NestJS for modern development practices and have experience with Shopify 
              integrations, adding value to e-commerce platforms. My expertise includes working with 
              MongoDB, SQL, Sequelize, TypeORM, GraphQL, and WebSocket for real-time applications.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 sm:mb-8 leading-relaxed"
            >
              I'm passionate about creating scalable backend systems, optimizing database performance, 
              and building seamless integrations that enhance user experiences.
            </motion.p>

            <motion.div variants={itemVariants} className="flex justify-center">
              <button
                onClick={handleDownloadResume}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2 text-base sm:text-lg"
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

