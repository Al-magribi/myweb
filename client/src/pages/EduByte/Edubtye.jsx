import React from "react";
import HeroSection from "./components/HeroSection";
import ProblemSolution from "./components/ProblemSolution";
import Features from "./components/Features";
import Advantages from "./components/Advantages";
import DemoTestimonials from "./components/DemoTestimonials";
import Pricing from "./components/Pricing";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

const Edubtye = () => {
  return (
    <div className='edubyte-landing'>
      <HeroSection />
      <ProblemSolution />
      <Features />
      <Advantages />
      <DemoTestimonials />
      <Pricing />
      <CTA />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Edubtye;
