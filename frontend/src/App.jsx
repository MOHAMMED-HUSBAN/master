// src/App.jsx

import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./componants/Header";
import Footer from "./componants/Footer";
import HeroSection from "./componants/HeroSection";
import Newscard from "./componants/Newscard";
import TaekwondoNews from "./componants/TaekwondoNews";
import VideoLessons from "./componants/VideoLessons";
import Geolocation from "./componants/Geolocation/Geolocation";
import Aboutus from "./componants/Aboutus/Aboutus";
import Eventslider from "./componants/Eventslider/Eventslider";
import WhatWeOffer from "./componants/WhatWeOffer/WhatWeOffer";
import ProgramsPage from "./componants/ProgramsPage/ProgramsPage";
import Shop from "./componants/Shop/ShopPage";
import News from "./componants/Newspage/News";
import Cart from "./componants/Shop/Cart";
import video from "./componants/VideoLessons";

import Program from "./componants/WhatWeOffer/WhatWeOffer2";
import ProgramDetails from "./componants/WhatWeOffer/ProgramDetails";
import Signup from "./componants/Signup/Signup";
import Login from "./componants/Signup/Login";
import Profile from "./componants/profile/Profile";
import TaekwondoChampionsPage from "./componants/TaekwondoChampionsPage";
import ChampionDetails from "./componants/ChampionDetails";
import Welcome from "./componants/welcome/welcome";

import SubscriptionPage from "./pages/SubscriptionPage";
import axios from "axios";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <HeroSection />
              <WhatWeOffer />
              <Program />
              <Newscard />
              <ProgramsPage />
              <Eventslider />
              <TaekwondoNews />

              {/* <VideoLessons /> */}
              {/* <Geolocation /> */}
              <Footer />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header />
              <Aboutus />
              <Geolocation />
              <Footer />
            </>
          }
        />
        <Route path="/" element={<WhatWeOffer />} />
        <Route path="/program-details/:program" element={<ProgramDetails />} />
        <Route
          path="/event"
          element={
            <>
              <Header />
              <Eventslider />
              <Footer />
            </>
          }
        />
        <Route
          path="/shop"
          element={
            <>
              <Header />
              <Shop />
              <Footer />
            </>
          }
        />
        <Route
          path="/news"
          element={
            <>
              <Header />
              <News />
              <Footer />
            </>
          }
        />
        <Route
          path="/Program"
          element={
            <>
              <Header />
              <Program />
              <Footer />
            </>
          }
        />
        <Route
          path="/video"
          element={
            <>
              <Header />
              <VideoLessons />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="/homepage"
          element={
            <>
              <homepage />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/champions" element={<TaekwondoChampionsPage />} />
        <Route path="/ChampionDetails" element={<ChampionDetails />} />

        <Route
          path="/welcome"
          element={
            <>
              <Header />
              <Welcome />
              <Footer />

            
            </>
          }
        />
          <Route
                path="/subscriptions"
                element={
                  <>
                    <Header />
                    <SubscriptionPage />
                    <Footer />
                  </>
                }
              />
      </Routes>
    </Router>
  );
}
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default App;
