import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Awards from './components/Awards';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <html lang="en" />
        
        {/* Primary Meta Tags */}
        <title>Divyaraj Gohil - Backend Node.js Developer Portfolio</title>
        <meta
          name="description"
          content="Backend Node.js Developer specializing in Node.js, NestJS, Express, MongoDB, Shopify integrations, and building scalable server-side applications. View my projects, experience, and skills."
        />
        <meta name="keywords" content="Divyaraj Gohil, backend developer, node.js developer, nestjs, express, mongodb, shopify, typescript, portfolio, software engineer, full stack developer, Gujarat, India" />
        <meta name="author" content="Divyaraj Gohil" />
        <meta name="robots" content="index, follow" />
        <meta name="geo.region" content="IN-GJ" />
        <meta name="geo.placename" content="Gujarat, India" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://divyaraj-gohil.github.io/portfolio/" />
        <meta property="og:title" content="Divyaraj Gohil - Backend Node.js Developer Portfolio" />
        <meta
          property="og:description"
          content="Backend Node.js Developer specializing in building powerful and efficient server-side applications with Node.js, NestJS, and Shopify integrations."
        />
        <meta property="og:image" content="https://divyaraj-gohil.github.io/portfolio/og-image.jpg" />
        <meta property="og:site_name" content="Divyaraj Gohil Portfolio" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://divyaraj-gohil.github.io/portfolio/" />
        <meta name="twitter:title" content="Divyaraj Gohil - Backend Node.js Developer Portfolio" />
        <meta
          name="twitter:description"
          content="Backend Node.js Developer specializing in building powerful and efficient server-side applications."
        />
        <meta name="twitter:image" content="https://divyaraj-gohil.github.io/portfolio/og-image.jpg" />
        <meta name="twitter:creator" content="@divyarajgohil" />
        
        {/* Additional SEO */}
        <link rel="canonical" href="https://divyaraj-gohil.github.io/portfolio/" />
        <meta name="theme-color" content="#2563eb" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Awards />
        <Contact />
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;

