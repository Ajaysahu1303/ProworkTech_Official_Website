import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import logo_trendzila from '../assets/Clients/Trendzila.png';
import logo_kravemomos from '../assets/Clients/Krave_Momos.png';
import logo_pawan from '../assets/Clients/Pawan_Namkeens.png';
import logo_kartavya from '../assets/Clients/Kartavya_IAS.png';

const Clients = () => {
  const [clientsData, setClientsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/clients');
        if (response.ok) {
          const data = await response.json();
          setClientsData(data);
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  const staticClients = [
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

  const allClients = [...staticClients, ...clientsData];

  // A single group of clients
  const MarqueeGroup = () => (
    <div className="flex items-center gap-12 md:gap-24 pr-12 md:pr-24 min-w-max">
      {allClients.map((client, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center transition-transform hover:scale-110 group min-w-[120px]"
        >
          <img
            src={client.logo}
            alt={client.name}
            className="h-20 w-auto object-contain mb-4 drop-shadow-sm group-hover:drop-shadow-md transition-all"
          />
          <span className="text-sm font-semibold text-slate-500 tracking-tight group-hover:text-slate-800">
            {client.name}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-16 bg-white border-y border-slate-100 overflow-hidden relative">
      <div className="container-custom">
        <p className="text-center text-sm font-bold text-primary-500 uppercase tracking-widest mb-12">
          Partnering with Prayagraj's Rising Brands
        </p>

        {loading ? (
             <div className="flex justify-center items-center py-10">
                 <Loader2 className="animate-spin text-primary-500" size={32} />
             </div>
        ) : (
          <div className="w-full relative flex items-center group/marquee">
            {/* Fade Edges to blend with background smoothly */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <style>
              {`
                @keyframes marquee {
                  0% { transform: translateX(0); }
                  /* Since we map 8 groups, translating by -12.5% moves exactly 1 group seamlessly */
                  100% { transform: translateX(-12.5%); }
                }
                .animate-marquee-custom {
                  /* Using linear for smooth constant speed sliding */
                  animation: marquee 15s linear infinite;
                }
                .group\\/marquee:hover .animate-marquee-custom {
                  animation-play-state: paused;
                }
              `}
            </style>

            <div className="flex animate-marquee-custom min-w-max">
              {[...Array(8)].map((_, i) => <MarqueeGroup key={i} />)}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Clients;

