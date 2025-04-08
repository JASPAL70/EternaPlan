import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import ServiceDetails from "./components/ServiceDetails";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Features from "./components/Features";


import "./index.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <Features />
              <About />
              <Contact />
            </>
          }
        />
        <Route path="/services" element={<Services />} />
        <Route path="/service/:id" element={<ServiceDetails />} />

        <Route path="/about" element={<About />} />
        
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;