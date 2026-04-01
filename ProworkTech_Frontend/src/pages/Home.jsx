import React from 'react';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>Prowork Tech | Premium Digital Marketing & Web Development in Prayagraj</title>
        <meta name="description" content="Prowork Tech is Prayagraj's leading digital marketing and web development agency. We scale local businesses and startups with data-driven growth strategies." />
        <meta name="keywords" content="digital marketing prayagraj, web development prayagraj, SEO optimization prayagraj, social media marketing prayagraj, prowork tech" />
        <meta property="og:title" content="Prowork Tech | Premium Digital Marketing in Prayagraj" />
        <meta property="og:description" content="Scale your local brand with Prowork Tech's high-performance digital marketing, web engineering, and brand optimization services." />
        <meta property="og:type" content="website" />
      </Helmet>
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

