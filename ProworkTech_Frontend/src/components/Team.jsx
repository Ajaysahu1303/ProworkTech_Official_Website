import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import Harshika from '../assets/Team/Harshika_Yadav.png';
import Ayush from '../assets/Team/Ayush_Jaiswal.png';
import Ajay from '../assets/Team/Ajay.png';
import Tahir from '../assets/Team/Tahir.png';
import Hasham from '../assets/Team/Hasham.png';

const staticTeamMembers = [

];

const Team = () => {
  const [dynamicMembers, setDynamicMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/team');
        if (response.ok) {
          const data = await response.json();
          setDynamicMembers(data);
        }
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, []);

  // Combine static and dynamic members, ensuring static ones come first
  const allMembers = [...dynamicMembers];

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="team">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-lg mb-6"
          >
            Meet the <span className="text-gradient">Core Team</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Our team is composed of passionate individuals dedicated to delivering world-class results for our partners.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {allMembers.map((member, index) => (
            <motion.div
              key={member._id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 3) * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[4/5] mb-8 shadow-xl bg-slate-100">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <div className="flex gap-3">
                    <a href={member.social?.linkedin || "#"} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                      <Linkedin size={20} />
                    </a>
                    <a href={member.social?.twitter || "#"} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                      <Twitter size={20} />
                    </a>
                    <a href={member.social?.mail || "#"} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white hover:bg-primary-600 transition-colors">
                      <Mail size={20} />
                    </a>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
              <p className="text-primary-600 font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-slate-500 leading-relaxed line-clamp-3">
                {member.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
