import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiMoon, HiSun, HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Section tracking
      const sections = ['home', 'about', 'projects', 'skills', 'experience', 'awards', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Projects', id: 'projects' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Awards', id: 'awards' },
    { label: 'Contact', id: 'contact' }
  ];

  const scrollToSection = (sectionId) => {
    // Re-enable body scroll first
    document.body.style.overflow = '';
    
    // Close menu immediately
    setIsMenuOpen(false);
    
    // Small delay to ensure menu is closed and scroll is enabled
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on:
      // - The menu button
      // - Inside the nav (including menu items)
      // - Dark mode toggle
      if (
        isMenuOpen &&
        !event.target.closest('nav') &&
        !event.target.closest('[aria-label="Toggle menu"]') &&
        !event.target.closest('[aria-label="Toggle dark mode"]')
      ) {
        setIsMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    if (isMenuOpen) {
      // Use a small delay to avoid conflicts with button clicks
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside, true);
        // Prevent body scroll when menu is open
        document.body.style.overflow = 'hidden';
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickOutside, true);
        document.body.style.overflow = '';
      };
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Mobile menu backdrop */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            setIsMenuOpen(false);
          }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || isMenuOpen
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate max-w-[140px] sm:max-w-none"
            >
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
                Divyaraj Gohil
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-2 xl:px-3 py-2 text-sm xl:text-base font-medium transition-all duration-300 whitespace-nowrap ${
                    activeSection === item.id
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex-shrink-0"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <HiSun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <HiMoon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>

            {/* Tablet Navigation - compact version with all items */}
            <div className="hidden md:flex lg:hidden items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-1.5 py-2 text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                    activeSection === item.id
                      ? 'text-gray-900 dark:text-gray-100'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                  title={item.label}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSectionTablet"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600 rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
              <button
                onClick={toggleDarkMode}
                className="p-1.5 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex-shrink-0 ml-1"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <HiSun className="w-4 h-4 text-yellow-500" />
                ) : (
                  <HiMoon className="w-4 h-4 text-gray-700" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <HiSun className="w-5 h-5 text-yellow-500" />
                ) : (
                  <HiMoon className="w-5 h-5 text-gray-700" />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors relative z-50"
                aria-label="Toggle menu"
                type="button"
              >
                {isMenuOpen ? (
                  <HiX className="w-6 h-6 text-gray-900 dark:text-white" />
                ) : (
                  <HiMenu className="w-6 h-6 text-gray-900 dark:text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile & Tablet Menu */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? 'auto' : 0
            }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className={`lg:hidden overflow-hidden relative z-50 ${
              isMenuOpen ? 'pb-4 bg-white dark:bg-gray-900' : ''
            }`}
          >
            <div className="space-y-2 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`relative block w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-gray-900 dark:text-gray-100 font-semibold bg-gray-100 dark:bg-gray-800'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  type="button"
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSectionMobile"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-600 via-gray-500 to-gray-600 rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;

