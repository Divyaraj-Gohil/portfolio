import { motion } from 'framer-motion';
import { FaTrophy, FaAward, FaStar } from 'react-icons/fa';
import { awards } from '../data/awards';

const Awards = () => {
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

  const getIcon = (iconType) => {
    switch (iconType) {
      case 'trophy':
        return <FaTrophy className="text-3xl" />;
      case 'hackathon':
        return <FaAward className="text-3xl" />;
      default:
        return <FaStar className="text-3xl" />;
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case 'gold':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/20',
          icon: 'text-yellow-600 dark:text-yellow-400',
          border: 'border-yellow-500',
          badge: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
        };
      case 'blue':
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/20',
          icon: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-500',
          badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
        };
      default:
        return {
          bg: 'bg-purple-100 dark:bg-purple-900/20',
          icon: 'text-purple-600 dark:text-purple-400',
          border: 'border-purple-500',
          badge: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
        };
    }
  };

  return (
    <section
      id="awards"
      className="py-20 md:py-32 bg-white dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Awards & Achievements
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-4" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Recognition for outstanding contributions and achievements.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto"
        >
          {awards.map((award) => {
            const colors = getColorClasses(award.color);
            
            return (
              <motion.div
                key={award.id}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4"
                style={{ borderLeftColor: award.color === 'gold' ? '#eab308' : '#3b82f6' }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  {/* Icon */}
                  <div className={`p-3 sm:p-4 rounded-xl ${colors.bg} flex-shrink-0`}>
                    <div className={colors.icon}>
                      {getIcon(award.icon)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {award.title}
                      </h3>
                      <span className={`px-3 py-1 ${colors.badge} rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap self-start sm:self-auto`}>
                        {award.date}
                      </span>
                    </div>
                    
                    <p className={`text-lg font-semibold mb-3 ${colors.icon}`}>
                      {award.organization}
                    </p>
                    
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;

