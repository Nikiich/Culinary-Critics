import React from 'react';
import '../css/HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="content-container">
        <section className="about-section">
          <h2>About Our Service</h2>
          <p>Discover the best places to eat around you and share your experiences with others. Our platform is dedicated to bringing food enthusiasts together.</p>
          <p>Whether you're looking for the trendiest cafes, the coziest family restaurants, or the best fine dining, we've got you covered.</p>
        </section>
        <div className="separate-line"></div>
        <section className="features-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>Real, unbiased restaurant reviews</li>
            <li>User-friendly restaurant search and navigation</li>
            <li>Connect with a community of fellow food lovers</li>
            <li>Share your own experiences and culinary discoveries</li>
          </ul>
        </section>
      </section>
    </div>
  );
}

export default HomePage;
