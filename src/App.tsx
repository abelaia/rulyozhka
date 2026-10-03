import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';

import { PROGRESS_SPRING } from './animations';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Marquee from './components/Marquee/Marquee';
import Services from './components/Services/Services';
import Materials from './components/Materials/Materials';
import Works from './components/Works/Works';
import Process from './components/Process/Process';
import Reviews from './components/Reviews/Reviews';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, PROGRESS_SPRING);

  return (
    // reducedMotion="user" — анимации отключаются, если они выключены в системе
    <MotionConfig reducedMotion="user">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Materials />
        <Works />
        <Process />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </MotionConfig>
  );
}
