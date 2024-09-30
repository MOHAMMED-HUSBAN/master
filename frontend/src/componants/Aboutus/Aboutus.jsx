import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AboutUs = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 text-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: 'url("https://scontent.famm6-1.fna.fbcdn.net/v/t1.6435-9/59475753_1193628550797071_7065142299075805184_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=2a1932&_nc_ohc=mlF22X2IC80Q7kNvgGJcy3F&_nc_ht=scontent.famm6-1.fna&oh=00_AYD0prAcGC6eZjdjiQwI-79CegTv2tbQ9b3k0cdxqWJiMw&oe=66DABDBD")',
        paddingTop: '8rem',
      }}
    >
      <motion.h1
        variants={itemVariants}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-700 mb-8 sm:mb-12 uppercase"
      >
        About Our Taekwondo Academy
      </motion.h1>

      <motion.section
        variants={itemVariants}
        className="flex flex-col md:flex-row items-center justify-center bg-gray-100 bg-opacity-80 rounded-lg shadow-lg mb-8 sm:mb-12 p-4 sm:p-6 lg:p-8"
      >
        <div className="md:flex-1 md:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-center  text-purple-700 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-base sm:text-lg text-center leading-relaxed">
            To empower individuals through the art of Taekwondo, fostering
            physical fitness, mental discipline, and personal growth.
          </p>
        </div>
        <img
          src="path_to_mission_image.jpg"
          alt="pic"
          className="md:flex-1 max-w-full h-auto rounded-lg mt-4 md:mt-0 md:ml-6"
        />
      </motion.section>

      <motion.section
        variants={itemVariants}
        className="flex flex-col md:flex-row-reverse items-center justify-center bg-gray-100 bg-opacity-80 rounded-lg shadow-lg mb-8 sm:mb-12 p-4 sm:p-6 lg:p-8"
      >
        <img
          src="path_to_history_image.jpg"
          alt="pic"
          className="md:flex-1 max-w-full h-auto rounded-lg mt-4 md:mt-0 md:mr-6"
        />
        <div className="md:flex-1 md:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-purple-700 mb-4">
            Our History
          </h2>
          <p className="text-gray-700 text-base sm:text-lg text-center leading-relaxed">
            Founded in 2000, our academy has trained thousands of students in
            the traditional Korean martial art of Taekwondo.
          </p>
        </div>
      </motion.section>

      <motion.section
        variants={itemVariants}
        className="flex flex-col md:flex-row items-center justify-center bg-gray-100 bg-opacity-80 rounded-lg shadow-lg mb-8 sm:mb-12 p-4 sm:p-6 lg:p-8"
      >
        <div className="md:flex-1 md:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-center text-purple-700 mb-4">
            Our Instructors
          </h2>
          <ul className="list-none text-gray-700 text-base text-center sm:text-lg leading-relaxed">
            <li className="mb-2">Master Kim - 7th Dan Black Belt</li>
            <li className="mb-2">Instructor Lee - 5th Dan Black Belt</li>
            <li className="mb-2">Instructor Park - 4th Dan Black Belt</li>
          </ul>
        </div>
        <img
          src="path_to_instructors_image.jpg"
          alt="pic"
          className="md:flex-1 max-w-full h-auto rounded-lg mt-4 md:mt-0 md:ml-6"
        />
      </motion.section>

      <motion.section
        variants={itemVariants}
        className="flex flex-col md:flex-row-reverse items-center justify-center bg-gray-100 bg-opacity-80 rounded-lg shadow-lg p-4 sm:p-6 lg:p-8"
      >
        <img
          src="path_to_classes_image.jpg"
          alt="pic"
          className="md:flex-1 max-w-full h-auto rounded-lg mt-4 md:mt-0 md:mr-6"
        />
        <div className="md:flex-1 md:text-left">
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-700 text-center mb-4">
            Our Classes
          </h2>
          <ul className="list-none text-gray-700 text-base sm:text-lg leading-relaxed text-center">
            <li className="mb-2">Children's Taekwondo (Ages 5-12)</li>
            <li className="mb-2">Teen Taekwondo (Ages 13-17)</li>
            <li className="mb-2">Adult Taekwondo (Ages 18+)</li>
            <li className="mb-2">Family Classes</li>
          </ul>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default AboutUs;
