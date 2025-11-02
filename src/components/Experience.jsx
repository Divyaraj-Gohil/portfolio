import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { experience, education } from '../data/experience';

const Experience = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.02, y: -5 }
  };

  return (
    <section
      id="experience"
      className="py-20 md:py-32 bg-gray-50 dark:bg-gray-800 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Experience & Education
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My professional journey and academic background.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-16"
          >
            {/* Experience Section */}
            <div>
              <motion.h3
                variants={itemVariants}
                className="text-3xl font-bold mb-12 text-gray-900 dark:text-white flex items-center gap-4"
              >
                <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                  <FaBriefcase className="text-white text-2xl" />
                </div>
                <span className="text-gray-900 dark:text-white">
                  Work Experience
                </span>
              </motion.h3>

              {/* Timeline for Experience */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-blue-600 rounded-full hidden md:block"></div>

                <div className="space-y-8">
                  {experience.map((exp, index) => (
                    <div
                      key={exp.id}
                      className="relative md:pl-20"
                    >
                      {/* Timeline dot - fixed position relative to timeline */}
                      <div className="hidden md:block absolute left-8 top-6 w-6 h-6 bg-white dark:bg-gray-800 rounded-full border-4 border-blue-600 shadow-lg z-20 transform -translate-x-1/2"></div>

                      <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover="hover"
                        className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-600 relative overflow-hidden group"
                      >
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/5 transition-all duration-300"></div>
                        
                        <div className="relative z-10">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {exp.title}
                                </h4>
                              </div>
                              <div className="flex items-center gap-2 text-xl text-blue-600 dark:text-blue-400 font-semibold mb-3">
                                <FaMapMarkerAlt className="text-lg" />
                                <span>{exp.company}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <FaCalendarAlt className="text-sm" />
                                <span className="font-medium">{exp.period}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3 mt-6">
                            {exp.description.map((point, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3 group/item"
                              >
                                <div className="mt-2 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                                  {point}
                                </p>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div>
              <motion.h3
                variants={itemVariants}
                className="text-3xl font-bold mb-12 text-gray-900 dark:text-white flex items-center gap-4"
              >
                <div className="p-3 bg-emerald-600 rounded-xl shadow-lg">
                  <FaGraduationCap className="text-white text-2xl" />
                </div>
                <span className="text-gray-900 dark:text-white">
                  Education
                </span>
              </motion.h3>

              {/* Timeline for Education */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-emerald-600 rounded-full hidden md:block"></div>

                <div className="space-y-8">
                  {education.map((edu, index) => (
                    <div
                      key={edu.id}
                      className="relative md:pl-20"
                    >
                      {/* Timeline dot - fixed position relative to timeline */}
                      <div className="hidden md:block absolute left-8 top-6 w-6 h-6 bg-white dark:bg-gray-800 rounded-full border-4 border-emerald-600 shadow-lg z-20 transform -translate-x-1/2"></div>

                      <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover="hover"
                        className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-emerald-600 relative overflow-hidden group"
                      >
                        {/* Subtle overlay on hover */}
                        <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/5 transition-all duration-300"></div>
                        
                        <div className="relative z-10">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                                  {edu.degree}
                                </h4>
                                {edu.description[0]?.includes('8.49') && (
                                  <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full text-sm font-semibold">
                                    CGPA: 8.49/10
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 text-xl text-emerald-600 dark:text-emerald-400 font-semibold mb-3">
                                <FaMapMarkerAlt className="text-lg" />
                                <span>{edu.institution}</span>
                              </div>
                              <div className="text-lg text-gray-700 dark:text-gray-300 mb-2 font-medium">
                                {edu.field}
                              </div>
                              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                <FaCalendarAlt className="text-sm" />
                                <span className="font-medium">{edu.period}</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3 mt-6">
                            {edu.description.map((point, idx) => {
                              // Skip CGPA as it's already shown in badge
                              if (point.includes('CGPA')) return null;
                              return (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-start gap-3 group/item"
                                >
                                  <div className="mt-2 w-2 h-2 rounded-full bg-emerald-600 flex-shrink-0 group-hover/item:scale-150 transition-transform"></div>
                                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-1">
                                    {point}
                                  </p>
                                </motion.div>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
