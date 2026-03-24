import React from 'react';
import Hero from '../components/Hero';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials';
import Services from '../components/Services';
import About from '../components/About';
import Insights from '../components/Insights';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services showMoreButton={true} limit={3} />
      <Testimonials />
      <Insights />
      <Clients />
      <CTA />
    </>
  );
};


export default Home;

