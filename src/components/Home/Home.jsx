import React from "react";
import Hero from "./Hero";
import BrandPartner from "./BrandPartner";
import About from "./About";
import Contact from "./Contact";
import Offer from "./Offer";
import FAQ from "./FAQ";
import Category from "./Category";

const Home = () => {
  return (
    <div>
      <Hero />
      <BrandPartner />
      <Category />
      <About />
      <Contact />
      <Offer />
      <FAQ />
    </div>
  );
};

export default Home;
