import React from "react";

// Sample data for champions
const champions = [
  {
    name: "Ahmad Abu Ghaush",
    title: "Olympic Gold Medalist",
    bio: "Ahmad made history by winning Jordan's first Olympic gold medal in Taekwondo at Rio 2016.",
    achievements: ["Olympic Gold - Rio 2016", "World Taekwondo Championships Bronze"],
    quote: "Always believe in your dream, no matter how big it seems.",
    image: "https://www.palestinechronicle.com/wp-content/uploads/2016/08/Ahmed-Abugaush.jpg", // Replace with a valid URL
  },
  {
    name: "Dana Haider",
    title: "National Champion",
    bio: "Dana is a national Taekwondo champion and has inspired many young athletes in Jordan.",
    achievements: ["National Championship Gold 2022", "Asian Games Silver"],
    quote: "The secret is to stay focused and never give up.",
    image: "https://example.com/dana.jpg", // Replace with a valid URL
  },
  // Add more champions here...
];

const TaekwondoChampionsPage = () => {
  return (
    <div style={styles.pageContainer}>
      {/* Header Section */}
      <header style={styles.header}>
        <h1>Jordanian Taekwondo Champions</h1>
        <p>Be inspired by the journey of Jordan’s Taekwondo stars.</p>
        <img
          src="https://example.com/hero-image.jpg" // Replace with a valid URL
          alt="Jordanian Taekwondo Champions"
          style={styles.heroImage}
        />
      </header>

      {/* Champion Profiles */}
      <section style={styles.championsSection}>
        <h2>Meet Our Champions</h2>
        <div style={styles.grid}>
          {champions.map((champion, index) => (
            <div key={index} style={styles.card}>
              <img
                src={champion.image}
                alt={champion.name}
                style={styles.cardImage}
              />
              <h3>{champion.name}</h3>
              <h4>{champion.title}</h4>
              <p>{champion.bio}</p>
              <ul>
                {champion.achievements.map((achievement, i) => (
                  <li key={i}>{achievement}</li>
                ))}
              </ul>
              <blockquote>{`"${champion.quote}"`}</blockquote>
            </div>
          ))}
        </div>
      </section>

      {/* Champion Spotlight */}
      <section style={styles.spotlightSection}>
        <h2>Champion Spotlight</h2>
        <p>
          Featured Champion: <strong>Ahmad Abu Ghaush</strong>. Read more about his journey from local competitions to winning Olympic gold.
        </p>
      </section>

      {/* Call to Action */}
      <section style={styles.ctaSection}>
        <h2>Join the Journey</h2>
        <p>
          Are you inspired by our champions? Find a Taekwondo training center near you and start your journey today!
        </p>
        <button style={styles.ctaButton}>Find a Training Center</button>
      </section>
    </div>
  );
};

// Styles (inline for simplicity)
const styles = {
  pageContainer: {
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    lineHeight: "1.6",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  heroImage: {
    width: "100%",
    maxHeight: "400px",
    objectFit: "cover",
    marginTop: "20px",
  },
  championsSection: {
    marginBottom: "40px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  cardImage: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  spotlightSection: {
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "40px",
  },
  ctaSection: {
    textAlign: "center",
    backgroundColor: "#ffedcc",
    padding: "20px",
    borderRadius: "8px",
  },
  ctaButton: {
    backgroundColor: "#e67e22",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default TaekwondoChampionsPage;
