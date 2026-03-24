import React from 'react';
import { motion } from 'framer-motion';
import logo_trendzila from '../assets/Clients/Trendzila.png';
import logo_kravemomos from '../assets/Clients/Krave_Momos.png';
import logo_pawan from '../assets/Clients/Pawan_Namkeens.png';
import logo_kartavya from '../assets/Clients/Kartavya_IAS.png';

const Clients = () => {
  const clients = [
    {
      name: "Trendzila",
      logo: logo_trendzila,
    },
    {
      name: "Krave Momos",
      logo: logo_kravemomos,
    },
    {
      name: "Pawan Namkeens",
      logo: logo_pawan,
    },
    {
      name: "Kartavya IAS",
      logo: logo_kartavya,
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="container-custom">
        <p className="text-center text-sm font-bold text-primary-500 uppercase tracking-widest mb-12">
          Partnering with Prayagraj's Rising Brands
        </p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center justify-center transition-all hover:scale-110 cursor-pointer group"
            >
              {/* Logo Image */}
              <img
                src={client.logo}
                alt={client.name}
                className="h-20 w-auto object-contain mb-4 drop-shadow-sm group-hover:drop-shadow-md transition-all" // height adjust kar sakte hain
              />

              <span className="text-sm font-semibold text-slate-500 tracking-tight group-hover:text-slate-800">
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clients;

