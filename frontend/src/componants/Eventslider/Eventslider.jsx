import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './EventSlider.css';
import taekwondoImage from '../../assets/taekwondo.png';
import img2 from '../../assets/event-1-layer.png';
import img3 from '../../assets/event-2-layer.png';
import Button from '@mui/material/Button';




const EventSlider = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: 'Meeting of the Korean Committee',
      year: '2/12/2024',
      image: taekwondoImage,
      venue: 'Zarqa, Alsharq Academy',
      date: ' 18/12/2024',
      // ageGroup: '2009, 2010, 2011, 2012, 2013, 2014, 2015',
      gender:'Male , Female'
    },
    {
      id: 2,
      title: 'Football',
      venue: 'Amman, Studium',
      year: '6/9/2024',
      date: ' 18/12/2024',
      image: img2,
       gender:'Male'
    },
    {
      id: 3,
      title: 'Effective volleyball',
      year: '13/7/2024',
      venue: 'Amman, Studium',
      date: ' 13/7/2024',
       gender:'Male , Female',
      // month: 'June',
      image: "https://www.austinsportscenter.com/wp-content/uploads/2020/02/14_miz_boys_21_s19007ls.jpg"
    }
  ];
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 270"><path fill="rgb(15 23 42)" fill-opacity="1" d="M0,256L48,261.3C96,267,192,277,288,240C384,203,480,117,576,106.7C672,96,768,160,864,197.3C960,235,1056,245,1152,240C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    <div className="event-slider bg-gray-900" >
      
      <h1 className="text-3xl font-bold">All Events</h1>
      <div className="sport-select">
        <span>Select</span>
        <select className="text-black">
          <option>All Sports</option>
          <option>Taekwondo</option>
          <option>Trip</option>
        </select>
      </div>
      
      <Slider {...settings}>
        {events.map((event) => (
          <div key={event.id} className="event-slide">
            <img src={event.image} alt={event.title} />
            <div className="event-info">
              <span className="event-year">{event.year}</span>
              {event.month && <span className="event-month">{event.month}</span>}
              <h3>{event.title}</h3>
              <button onClick={() => openModal(event)}>Details</button>
            </div>
          </div>
        ))}
      </Slider>
      {selectedEvent && (
  <div
  className="modal"
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    overflow: 'hidden',
  }}
>
  <div
    className="modal-content"
    style={{
      padding: '15px', // Reduced padding
      borderRadius: '8px',
      position: 'relative',
      maxWidth: '300px', // Reduced max-width
      width: '90%', // Slightly reduced width
      textAlign: 'center',
      overflow: 'hidden',
    }}
  >
      <span
        className="close"
        onClick={closeModal}
       
      >
        &times;
      </span>
      <h2>{selectedEvent.title}</h2>
      <img
        src={selectedEvent.image}
        alt={selectedEvent.title}
    
      />
      {selectedEvent.venue && (
        <p>
          <strong>Venue:</strong> {selectedEvent.venue}
        </p>
      )}
      {selectedEvent.date && (
        <p>
          <strong>Date:</strong> {selectedEvent.date}
        </p>
      )}
      {selectedEvent.ageGroup && (
        <p>
          <strong>Age group:</strong> {selectedEvent.ageGroup}
        </p>
      )}
      {selectedEvent.gender && (
        <p>
          <strong>Gender:</strong> {selectedEvent.gender}
        </p>
      )}
      <button
        className="join-button"
       
      >
        Join us
      </button>
    </div>
  </div>
)}
     
    
    </div>
    </>
  );
};

export default EventSlider;
