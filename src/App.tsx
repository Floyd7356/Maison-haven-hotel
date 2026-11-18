import { useCallback, useEffect, useState } from 'react';
import { MotionConfig, motion } from 'motion/react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { SEO_BY_ROUTE } from './data/hotelData';
import { AccommodationPage } from './pages/AccommodationPage';
import { ContactPage } from './pages/ContactPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { HomePage } from './pages/HomePage';
import { OurStoryPage } from './pages/OurStoryPage';
import { StaffPortalPage } from './pages/StaffPortalPage';
import type { PageRoute } from './types/hospitality';

function resolveRoute(pathname: string): PageRoute {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (
    clean === '/' ||
    clean === '/accommodation' ||
    clean === '/experiences' ||
    clean === '/our-story' ||
    clean === '/contact' ||
    clean === '/staff-portal'
  ) {
    return clean;
  }
  return '/';
}

function updateDocumentMeta(route: PageRoute): void {
  const seo = SEO_BY_ROUTE[route] || SEO_BY_ROUTE['/'];
  document.title = seo.title;

  const setMeta = (selector: string, content: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMeta('meta[name="description"]', seo.description);
  setMeta('meta[property="og:title"]', seo.title);
  setMeta('meta[property="og:description"]', seo.description);
  setMeta('meta[name="twitter:title"]', seo.title);
  setMeta('meta[name="twitter:description"]', seo.description);
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() =>
    resolveRoute(window.location.pathname)
  );

  const navigate = useCallback((route: PageRoute, hash?: string) => {
    const targetUrl = hash ? `${route}${hash}` : route;
    if (window.location.pathname + window.location.hash !== targetUrl) {
      window.history.pushState({ route }, '', targetUrl);
    }
    setCurrentRoute(route);

    if (hash) {
      const targetId = hash.replace(/^#/, '');
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 60);
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    updateDocumentMeta(currentRoute);
  }, [currentRoute]);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(resolveRoute(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const targetId = window.location.hash.replace(/^#/, '');
      setTimeout(() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);

  const renderPage = () => {
    switch (currentRoute) {
      case '/accommodation':
        return <AccommodationPage onNavigate={navigate} />;
      case '/experiences':
        return <ExperiencesPage onNavigate={navigate} />;
      case '/our-story':
        return <OurStoryPage onNavigate={navigate} />;
      case '/contact':
        return <ContactPage />;
      case '/staff-portal':
        return <StaffPortalPage />;
      case '/':
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F2EDE3] text-[#292824]">
        <Navbar currentRoute={currentRoute} onNavigate={navigate} />

        <motion.main
          key={currentRoute}
          initial={{ opacity: 0.92 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          {renderPage()}
        </motion.main>

        <Footer onNavigate={navigate} />
        <WhatsAppFloatingButton />
      </div>
    </MotionConfig>
  );
}
