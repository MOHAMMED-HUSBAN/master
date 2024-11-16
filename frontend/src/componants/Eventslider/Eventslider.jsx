import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './EventSlider.css';
import Button from '@mui/material/Button';
import { fetchEvents, joinEvent } from '../../slice/eventSlice';

const EventSlider = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

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
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleJoinEvent = (eventId) => {
    dispatch(joinEvent(eventId));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="event-slider bg-gray-900">
        <h1 className="text-4xl font-bold text-white mb-8">All Events</h1>
        <div className="sport-select">
      
        </div>

        <Slider {...settings}>
          {events.map((event) => (
            <div key={event._id} className="event-slide">
              <img src={event.image} alt={event.title} className="event-img" />
              <div className="event-info">
                <span className="event-year">{event.year}</span>
                <h3>{event.title}</h3>
                <button
                  className="event-details-button"
                  onClick={() => openModal(event)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </Slider>

        {selectedEvent && (
          <div className="modal-overlay">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h2>{selectedEvent.title}</h2>
              <img
                src={selectedEvent.image}
                alt={selectedEvent.title}
                className="modal-image"
              />
              <p>
                <strong>Venue:</strong> {selectedEvent.venue}
              </p>
              <p>
                <strong>Date:</strong> {selectedEvent.date}
              </p>
              {selectedEvent.gender && (
                <p>
                  <strong>Gender:</strong> {selectedEvent.gender}
                </p>
              )}
              <Button 
                variant="contained" 
                className="join-button"
                onClick={() => handleJoinEvent(selectedEvent._id)}
              >
                Join Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EventSlider;