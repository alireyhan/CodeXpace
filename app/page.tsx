import Header from '@/components/Header';
import Hero from '@/components/Hero';
import TechStack from '@/components/TechStack';
import Services from '@/components/Services';
import LatestProjects from '@/components/LatestProjects';
import IndustryExpertise from '@/components/IndustryExpertise';
// import WorkWithUs from '@/components/WorkWithUs';
import AboutCompany from '@/components/AboutCompany';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-black relative" style={{ overflowX: 'hidden', overflowY: 'visible', minHeight: '100vh', height: 'auto', width: '100%' }}>
      <Header />
      <Hero />
      <TechStack />
      <Services />
      <LatestProjects />
      <IndustryExpertise />
      {/* <WorkWithUs /> */}
      <AboutCompany />
      <div style={{ position: 'relative', zIndex: 100, overflow: 'visible', width: '100%' }}>
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}

