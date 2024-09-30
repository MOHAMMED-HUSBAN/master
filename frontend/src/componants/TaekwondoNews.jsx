import React, { useState, useEffect } from 'react';

const TaekwondoNews = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then((response) => response.json())
      .then((data) => setNewsData(data))
      .catch((error) => console.error('Error fetching news:', error));
  }, []);

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 270"><path fill="rgb(15 23 42)" fillOpacity="1" d="M0,256L48,261.3C96,267,192,277,288,240C384,203,480,117,576,106.7C672,96,768,160,864,197.3C960,235,1056,245,1152,240C1248,235,1344,213,1392,202.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>

      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">The Academy Taekwondo News</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsData.map((news, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">{news.title}</h3>
                <ul className="list-disc pl-5">
                  {news.sections.map((section, idx) => (
                    <li key={idx}>{section.title}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TaekwondoNews;
