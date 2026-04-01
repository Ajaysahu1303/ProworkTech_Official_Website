import React, { useEffect } from 'react';
import Testimonials from '../components/Testimonials';
import { Helmet } from 'react-helmet-async';
import CTA from '../components/CTA';

const Reviews = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-20">
      <Helmet>
        <title>Client Reviews & Feedback | Prowork Tech</title>
        <meta name="description" content="Read authentic reviews and feedback from our local partners in Prayagraj." />
      </Helmet>

      <Testimonials hideViewMore={true} />

      <CTA />
    </div>
  );
};

export default Reviews;
