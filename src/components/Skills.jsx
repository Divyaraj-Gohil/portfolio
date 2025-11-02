import { motion } from 'framer-motion';
import { skills } from '../data/skills';
import * as SiIcons from 'react-icons/si';
import { FaPlug, FaLink, FaObjectGroup, FaCodeBranch, FaBug, FaDatabase, FaCloud } from 'react-icons/fa';

const Skills = () => {
  // Icon mapping for custom icons
  const customIcons = {
    FaPlug,
    FaLink,
    FaObjectGroup,
    FaCodeBranch,
    FaBug,
    FaDatabase,
    FaCloud,
  };

  // Duplicate skills for seamless infinite scroll
  const duplicatedSkills = [...skills, ...skills];

  // Get icon component
  const getIcon = (iconName) => {
    if (customIcons[iconName]) {
      return customIcons[iconName];
    }
    return SiIcons[iconName] || SiIcons.SiReact; // Fallback to React icon
  };

  // Calculate carousel width (number of skills * card width + gaps)
  const cardWidth = 160; // w-40 = 160px
  const gap = 32; // gap-8 = 32px
  const carouselWidth = skills.length * (cardWidth + gap);

  return (
    <section
      id="skills"
      className="py-20 md:py-32 bg-white dark:bg-gray-900 overflow-hidden relative"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10 pointer-events-none" />

          {/* Infinite Scrolling Carousel */}
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -carouselWidth],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {duplicatedSkills.map((skill, index) => {
                const Icon = getIcon(skill.icon);

                return (
                  <motion.div
                    key={`${skill.name}-${index}`}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.15,
                      y: -15,
                      transition: { duration: 0.3 }
                    }}
                    className="flex-shrink-0 w-40 h-44 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-200 dark:border-gray-700"
                  >
                    <motion.div
                      whileHover={{ 
                        rotate: [0, -10, 10, -10, 10, 0],
                        scale: 1.2
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-6xl mb-4 transition-transform duration-300"
                      style={{ color: skill.color }}
                    >
                      <Icon />
                    </motion.div>
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center px-3 leading-tight">
                      {skill.name}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
