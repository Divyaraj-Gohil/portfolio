import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';
import { certifications } from '../data/certifications';

const Certifications = () => {
  const [showAll, setShowAll] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.02, y: -5 }
  };

  return (
    <section
      id="certifications"
      className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800/50 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Certifications
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Professional certifications and credentials I've earned.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto"
        >
          {(showAll ? certifications : certifications.slice(0, 4)).map((cert) => (
            <motion.a
              key={cert.id}
              href={cert.credentialUrl || undefined}
              target={cert.credentialUrl ? '_blank' : undefined}
              rel={cert.credentialUrl ? 'noopener noreferrer' : undefined}
              variants={cardVariants}
              whileHover="hover"
              className={`bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-emerald-500 flex flex-col ${
                cert.credentialUrl ? 'cursor-pointer' : 'cursor-default'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 flex-1">
                {/* Icon */}
                <div className="p-3 sm:p-4 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 flex-shrink-0">
                  <FaCertificate className="text-3xl text-emerald-600 dark:text-emerald-400" />
                </div>

                {/* Content */}
                <div className="flex-1 w-full">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                      {cert.title}
                    </h3>
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap self-start sm:self-auto">
                      {cert.date}
                    </span>
                  </div>

                  <p className="text-lg font-semibold mb-3 text-emerald-600 dark:text-emerald-400">
                    {cert.organization}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                    {cert.description}
                  </p>

                  {cert.credentialUrl && (
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                      View credential
                      <FaExternalLinkAlt className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {certifications.length > 4 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2.5 rounded-full text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 transition-colors shadow-md"
            >
              {showAll ? 'Show less' : 'View all certifications'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Certifications;
