
// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/effect-coverflow';

// export default function App() {
//   const handleSlideChange = (swiper) => {
//   };

//   const champions = [
//     {
//       name: "Ahmad Abu Ghaush",
//       title: "Olympic Gold RIO ",
//       bio: "Ahmad made history by winning Jordan's first Olympic gold medal in Taekwondo at Rio 2016.",
//       achievements: ["Olympic Gold - Rio 2016", "World Taekwondo Championships Bronze"],
//       quote: "Always believe in your dream, no matter how big it seems.",
//       image: "https://jordantimes.com/sites/default/files/styles/news_inner/public/Abughaush.jpg?itok=Fpd5enCk",
//     },
//     {
//       name: "Zaid Kareem",
//       title: "National Champion",
//       bio: "Zaid Kareem is one of Jordan's top Taekwondo athletes, known for his exceptional skills and dedication.",
//       achievements: ["Jordan National Champion", "Asian Taekwondo Championships Silver Medal"],
//       quote: "Hard work and perseverance are the keys to success.",
//       image: "https://cdnuploads.aa.com.tr/uploads/Contents/2024/08/08/thumbs_b_c_7e22022d4879f6925dc2009355eec0b3.jpg?v=195503", // Replace with a valid URL
//     },
//     {
//       name: "Saleh sharabatii",
//       title: "Olympic Silver Medalist",
//       bio: "Salah Sharabatii won the silver medal in Taekwondo at the Tokyo 2020 Olympics, showcasing Jordan's growing talent.",
//       achievements: ["Olympic Silver - Tokyo 2020", "Asian Taekwondo Championships Gold Medal"],
//       quote: "Never underestimate your own power and potential.",
//       image: "https://factjo.com/AllNewImages/large/2023_06_11_11_24_57.jpg", // Replace with a valid URL
//     }
//   ];

//   return (
//     <>
//       <section className="relative bg-slate-900 p-10 rounded-lg shadow-lg backdrop-filter backdrop-blur-md">
//         <div className="flex justify-center items-center h-full">
//           <div className="text-center">
//             <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
//               Our Heroes
//             </h1>
//             <p className="text-white text-base sm:text-lg">
//               'Champions overcome challenges and reach new heights'
//             </p>
//             <br />
//           </div>
//         </div>

//         <div className="main">
//           <Swiper
//             loop={true}
//             autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: true }}
//             navigation={false}
//             modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
//             className="mySwiper"
//             effect={"coverflow"}
//             coverflowEffect={{
//               rotate: 10,
//               stretch: 50,
//               depth: 200,
//               modifier: 1,
//               slideShadows: true,
//             }}
//             centeredSlides={true} // الشريحة النشطة في المنتصف
//             slidesPerView={"auto"} // عرض الشرائح بناءً على حجمها
//             spaceBetween={100} // تقليل المسافة بين الشرائح لتظهر بجانب بعضها
//             onSlideChange={handleSlideChange}
//           >
//             {champions.map((champion, index) => (
//               <SwiperSlide
//                 key={index}
//                 style={{
//                   height: "400px",
//                   width: "400px",
//                   backgroundImage: `url(${champion.image})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   backgroundRepeat: "no-repeat",
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "flex-end",
//                   alignItems: "center",
//                   padding: "20px",
//                   borderRadius: "10px",
//                 }}
//               >
//                 <h2 className="text-white text-xl font-bold">{champion.name}</h2>
//                 <p className="text-white">{champion.title}</p>
//                 <p className="text-white text-sm mt-2">{champion.quote}</p>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </section>
//       {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 270">
//         <path fill="rgb(15 23 42)" fillOpacity="1" d="M0,256L48,261.3C96,267,192,277,288,240C384,203,480,117,576,106.7C672,96,768,160,864,197.3C960,235,1056,245,1152,240C1248,235,1344,213,1392,202.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
//       </svg> */}
//     </>
//   );
// }

import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import ChampionDetails from './ChampionDetails';

export default function App() {
  const navigate = useNavigate();

  const handleSlideChange = (swiper) => {
    // يمكن إضافة الكود الخاص بالوظائف الأخرى هنا لاحقًا
  };

  const handleSlideClick = (championName) => {
    navigate(`/champion/${championName}`);
  };

  const champions = [
    {
      name: "Ahmad Abu Ghaush",
      title: "Olympic Gold RIO",
      bio: "Ahmad made history by winning Jordan's first Olympic gold medal in Taekwondo at Rio 2016.",
      achievements: ["Olympic Gold - Rio 2016", "World Taekwondo Championships Bronze"],
      quote: "Always believe in your dream, no matter how big it seems.",
      image: "https://jordantimes.com/sites/default/files/styles/news_inner/public/Abughaush.jpg?itok=Fpd5enCk",
    },

    {
            name: "Zaid Kareem",
            title: "National Champion",
            bio: "Zaid Kareem is one of Jordan's top Taekwondo athletes, known for his exceptional skills and dedication.",
            achievements: ["Jordan National Champion", "Asian Taekwondo Championships Silver Medal"],
            quote: "Hard work and perseverance are the keys to success.",
            image: "https://cdnuploads.aa.com.tr/uploads/Contents/2024/08/08/thumbs_b_c_7e22022d4879f6925dc2009355eec0b3.jpg?v=195503", // Replace with a valid URL
          },
          {
            name: "Saleh sharabatii",
            title: "Olympic Silver Medalist",
            bio: "Salah Sharabatii won the silver medal in Taekwondo at the Tokyo 2020 Olympics, showcasing Jordan's growing talent.",
            achievements: ["Olympic Silver - Tokyo 2020", "Asian Taekwondo Championships Gold Medal"],
            quote: "Never underestimate your own power and potential.",
            image: "https://factjo.com/AllNewImages/large/2023_06_11_11_24_57.jpg", // Replace with a valid URL
          },
  ];

  return (
    <section className="relative bg-slate-900 p-10 rounded-lg shadow-lg backdrop-filter backdrop-blur-md">
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Heroes</h1>
          <p className="text-white text-base sm:text-lg">
            'Champions overcome challenges and reach new heights'
          </p>
        </div>
      </div>

      <div className="main">
        <Swiper
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: true }}
          navigation={false}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          effect={"coverflow"}
          coverflowEffect={{ rotate: 10, stretch: 50, depth: 200, modifier: 1, slideShadows: true }}
          centeredSlides={true}
          slidesPerView={"auto"}
          spaceBetween={100}
          onSlideChange={handleSlideChange}
        >
          {champions.map((champion, index) => (
            <SwiperSlide
              key={index}
              onClick={() => handleSlideClick(champion.name)}
              style={{
                height: "400px",
                width: "400px",
                backgroundImage: `url(${champion.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                alignItems: "center",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <h2 className="text-white text-xl font-bold">{champion.name}</h2>
              <p className="text-white">{champion.title}</p>
              <p className="text-white text-sm mt-2">{champion.quote}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Routes>
        <Route
          path="/champion/:id"
          element={<ChampionDetails champions={champions} />}
        />
      </Routes>
    </section>
  );
}
