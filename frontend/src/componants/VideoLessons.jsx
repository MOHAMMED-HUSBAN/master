import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const VideoLessons = () => {
  const [selectedBelt, setSelectedBelt] = useState(null);

  const beltLessons = [

    { belt: 'White', color: '#000000', videoUrl: 'https://www.youtube.com/watch?v=WhkjRruCBTo&list=PLSFr5pEwo7gSwvfg4bjxoF3liyfJkCLAj' },
    { belt: 'Yellow', color: '#FFD700', videoUrl: 'https://www.youtube.com/watch?v=tGlrUplKHh8&list=PLSFr5pEwo7gSwvfg4bjxoF3liyfJkCLAj&index=2' },
    { belt: 'Green', color: '#008000', videoUrl: 'https://www.youtube.com/watch?v=ksSqKt0UkWo&list=PLSFr5pEwo7gSwvfg4bjxoF3liyfJkCLAj&index=3' },
    { belt: 'Blue', color: '#0000FF', videoUrl: 'https://www.youtube.com/watch?v=Lt917gacJho&list=PLSFr5pEwo7gSwvfg4bjxoF3liyfJkCLAj&index=4' },
    { belt: 'Red', color: '#FF0000', videoUrl: 'https://www.youtube.com/watch?v=VdqNEAHWCBM&list=PLSFr5pEwo7gSwvfg4bjxoF3liyfJkCLAj&a=5' },
    { belt: 'Black', color: '#000000', videoUrl: 'https://www.youtube.com/watch?v=jcBwWo4wN7c&list=PLSFr5pEwo7gSwvfg4bjxoF3liyfJkCLAj&index=6' },

  ];

  return (
    
    <section className="bg-gray-100 py-12">
      
      
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Video Lessons: Taekwondo Belt Rankings</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {beltLessons.map((lesson) => (
            <button
              key={lesson.belt}
              style={{
                backgroundColor: selectedBelt === lesson.belt ? lesson.color : 'white',
                color: selectedBelt === lesson.belt ? 'white' : 'black',
                border: `2px solid ${lesson.color}`,
              }}
              className={`py-2 px-4 rounded hover:bg-opacity-75`}
              onClick={() => setSelectedBelt(lesson.belt)}
            >
              {lesson.belt} Belt
            </button>
          ))}
          
        </div>

        {selectedBelt && (
          <div className="bg-white rounded-lg shadow-md p-6 justify-center text-center">
            <h3 className="text-xl font-semibold mb-4">{selectedBelt} Belt Lesson</h3>
            <div className="aspect-w-16 aspect-h-9">
              <ReactPlayer
                url={beltLessons.find(lesson => lesson.belt === selectedBelt).videoUrl}
                controls
                width="100%"
                height="450px"
              />
            </div>
            <p className="mt-4">
              Learn the techniques and skills required for the {selectedBelt} belt in Taekwondo.
            </p>
          </div>
        )}

        {!selectedBelt && (
          <p className="text-center text-gray-600">
            Select a belt color above to view the corresponding lesson video.
          </p>
        )}
      </div>
    </section>
  );
};

export default VideoLessons;
