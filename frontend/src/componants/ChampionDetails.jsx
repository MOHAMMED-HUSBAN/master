import React from 'react';
import { useParams } from 'react-router-dom';

export default function ChampionDetails({ champions }) {
  const { id } = useParams();
  const decodedId = decodeURIComponent(id); // فك الترميز

  const champion = champions.find(champ => champ.name === decodedId);

  if (!champion) {
    return <div className="text-white">Champion not found.</div>;
  }

  return (
    <div className="text-white p-10">
      <h2 className="text-3xl font-bold">{champion.name}</h2>
      <p className="text-xl">{champion.title}</p>
      <p className="mt-4">{champion.bio}</p>
      <h3 className="text-xl font-semibold mt-6">Achievements:</h3>
      <ul className="list-disc list-inside">
        {champion.achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
      <p className="italic mt-6">"{champion.quote}"</p>
    </div>
  );
}
