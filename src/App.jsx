import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Features from "./components/Features";
import Customers from "./components/Customers";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import MouseTrail from "./components/MouseTrail";

const App = () => {
  return (
    <>
      <MouseTrail particleColor="rgba(0,0,0,0.6)" connectionColor="rgba(0,0,0,0.6)"/>
      <ScrollToTop />
      <div className="overflow-x-hidden min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-800">
        <Navbar />
        <div className="pt-20">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <About />
                  <Services />
                  <Features />
                  <Customers />
                  <Contact />
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
