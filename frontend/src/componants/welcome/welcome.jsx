

import React from 'react';
import { motion } from 'framer-motion'; // Make sure to install framer-motion

function Welcome() {
    const students = [
        { name: "علي محمد الجبوري", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/464715745_1057953536337849_3463993791486998049_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEFQORjtd576ymUduWGIZKLR43Cg5Ih5KJHjcKDkiHkooPIzHCkX51gV8QpWAPDdM4L921I_B0xxvM5s6IG1nbh&_nc_ohc=4YusbIAA-twQ7kNvgFnFscT&_nc_zt=23&_nc_ht=scontent.famm7-1.fna&_nc_gid=AZMNsjEdXgd6AUky9WQAMpi&oh=00_AYCKgZdA65BvhgM2gyeV7ozxLVqGA2aIeg9jcf85cGKaPg&oe=67251C95" },
        { name: "محمد علي العبيدي", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/462914077_1048492460617290_1312137916601842284_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEdgV6ysizaTdc6xYB_Xbj7ERYEyIU2EXQRFgTIhTYRdJIMrbVoMcPHJtaXshlFu72sU4Ey8aE5_Yk6AT-7U37T&_nc_ohc=v6UvisSawVgQ7kNvgFicObT&_nc_zt=23&_nc_ht=scontent.famm7-1.fna&_nc_gid=AzT6RPwv_niO2HhJZxzGjc-&oh=00_AYBv5VLMlCypCLSJMysquP5THsudGyZympKPknsu6LtPRg&oe=672528A7" },
        { name: "حسن سالم الزيدي", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/459430795_1024102453056291_1100526059511407460_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGafs-fE1LaBmy_f756vpGIK3hc1H8_2bcreFzUfz_Zt9WsQUU85bEcB7OrB8uUUNKa3_te3sGZekQIQjefzH9S&_nc_ohc=NtTWIzO05ugQ7kNvgEjoCR6&_nc_zt=23&_nc_ht=scontent.famm7-1.fna&_nc_gid=Aqey04ammAiYxA5gkATCnSZ&oh=00_AYDVvtezPIabxNvCu5PlXqDNEFirkSKFFMmaBYxEIDd22w&oe=67254D9F" },
        { name: "خالد عمر السعدي", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/455910015_1003724651760738_517112070223079531_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEuGviaSqYRczuQ6QxzfanD93Lg0NVVicP3cuDQ1VWJw3g_bbsyg9a6_xUo_ag1wnesn7MQevLO2oc-cfuF__Xa&_nc_ohc=XwqPs7KGZXUQ7kNvgEa8yFE&_nc_zt=23&_nc_ht=scontent.famm7-1.fna&_nc_gid=A95ZO06-f7m_SHqVgVQziPQ&oh=00_AYCLfVtxHbbcZzg-YB7K6k0LieJo98oel4Myn35xDxlVWA&oe=672524C6" },
        { name: "عصام أحمد الجندي", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/449827429_974908397975697_4012494905887085494_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHCrhJ42_JFwWWDFPrXPiX8CBwfma35MuAIHB-Zrfky4EvWJu10-Db-d3OOvYmrJOALKAxoCkH5FJ9g0a9NqEot&_nc_ohc=zOXi92Z4xasQ7kNvgFUrgwY&_nc_zt=23&_nc_ht=scontent.famm7-1.fna&_nc_gid=AGA3blvA8qnslOx_yeOYqRG&oh=00_AYCeNNPzwJE2xR8Oa-EZwt-msfQDOZj8-8_LhmTcCdPsSA&oe=672528E5" },
        { name: "رامي خالد الهاشمي", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/450212731_974908354642368_5543417289759570534_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGNJux2an3JXxFvm5VhvMZ8Yk85KcVjYoZiTzkpxWNihrp5OHGm5ghPC77zIE5FIeSMdu4aOEEHhI7jEF9EPpXZ&_nc_ohc=UQU9IdeOVxgQ7kNvgEujYrQ&_nc_zt=23&_nc_ht=scontent.famm7-1.fna&_nc_gid=A-RL53c9ex9iV5xHWESVNys&oh=00_AYB8N_MyJbyOWPuyVmxibuMcwahr80LnL6xv5v_KUCM_Iw&oe=67254116" },
        { name: "خالد إبراهيم الرفاعي", image: "https://scontent.famm7-1.fna.fbcdn.net/v/t39.30808-6/373011286_767373552062517_5097777091908025735_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeF2_T6KW-IzNCZ5Hke3Hk3SkTKtO4bI1weRMq07hsjXB60N5h8czPcmwB5pRLU3vWz4pU0s3Jdeqw1PRQKL2xVO&_nc_ohc=sR5PaPSgxcEQ7kNvgGTHHSs&_nc_zt=23&_nc_ht=scontent.famm7-1.fna&_nc_gid=Ak6uw59soWNGejg8wPPxXph&oh=00_AYAXk44fkhL37N4K_rUEDMw6hwwUYIEhgzx6BqfahL07Gg&oe=67253070" },
      ];
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
                  </h1><div></div>
          <h1 className="text-5xl font-bold text-purple-700 mb-4">
          Welcome to the new heroes          </h1>
          <p className="text-xl text-gray-600">
          We welcome the newest additions to our sports family.          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {students.map((student, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={student.image}
                    alt={`${student.name}'s profile`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h2 className="text-xl font-bold mb-2">{student.name}</h2>
                  <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    عضو جديد في أكاديميتنا
                  </p>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Welcome;