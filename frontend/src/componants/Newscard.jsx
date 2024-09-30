import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

export default function App() {
  const handleSlideChange = (swiper) => {
  };

  return (
    <>
  <section className="relative bg-slate-900 p-10  rounded-lg shadow-lg backdrop-filter backdrop-blur-md">
    
  <div className="flex justify-center items-center h-full">
    <div className="text-center">
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
        Our Heroes 
      </h1>
      <p className="text-white text-base sm:text-lg">
      ' Champions overcome challenges and reach new heights '
      </p>
      <br></br>
    </div>
  </div>
  
        <div className="main">
        <Swiper
  loop={true}
  autoplay={{ delay: 3000, disableOnInteraction: false  , reverseDirection: true,}}
  navigation={false}
  modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
  className="mySwiper"
  effect={"coverflow"}
  coverflowEffect={{
    rotate: 10,
    stretch: 50,
    depth: 200,
    modifier: 1,
    slideShadows: true,
  }}
  centeredSlides={true} // الشريحة النشطة في المنتصف
  slidesPerView={"auto"} // عرض الشرائح بناءً على حجمها
  spaceBetween={100} // تقليل المسافة بين الشرائح لتظهر بجانب بعضها
  onSlideChange={handleSlideChange}
>
  <SwiperSlide
    style={{
      height: "400px",
      width: "400px",
      backgroundImage: "url('https://iconape.com/wp-content/files/tb/323002/png/323002.png')",
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
  </SwiperSlide>
  <SwiperSlide
    style={{
      height: "400px",
      width: "400px",
      backgroundImage: "url('https://iconape.com/wp-content/files/tb/323002/png/323002.png')",
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
  </SwiperSlide>
  <SwiperSlide
    style={{
      height: "400px",
      width: "400px",
      backgroundImage: "url('https://iconape.com/wp-content/files/tb/323002/png/323002.png')",
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
  </SwiperSlide>
</Swiper>

        </div>
        
      </section>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 270"><path fill="rgb(15 23 42)" fill-opacity="1" d="M0,256L48,261.3C96,267,192,277,288,240C384,203,480,117,576,106.7C672,96,768,160,864,197.3C960,235,1056,245,1152,240C1248,235,1344,213,1392,202.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
    </>
    
  );
}
