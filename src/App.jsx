import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Features from './components/Features'
import Customers from './components/Customers'
import Contact from './components/Contact'
import ScrollToTop from './components/ScrollToTop'
import Chatbot from './components/Chatbot'
import WhatsAppButton from './components/WhatsAppButton'

const App = () => {
  return (
    <>
      <ScrollToTop />
      <div className="overflow-x-hidden w-full text-gray-800 bg-white">
        <Navbar />
        <div className="pt-20">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <About />
                <Services />
                <Features />
                <Customers />
                <Contact />
                <Footer />
              </>
            } />
            <Route path='/about' element={
              <>
                <About />
                <Footer />
              </>
            } />
            <Route path="/services" element={
              <>
                <Services />
                <Footer />
              </>
            } />
            <Route path="/customers" element={
              <>
                <Customers />
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Contact />
                <Footer />
              </>
            } />
          </Routes>
        </div>
        <Chatbot />
        <WhatsAppButton />
      </div>
    </>
  )
}

export default App;
