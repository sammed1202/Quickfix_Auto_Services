import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";
import WhyLetMySpace from "./WhyLetMySpace";
import CustomCursor from "../CustomStyles/CustomCursor";
import styled from "styled-components";

const Home = () => {
  const [size, setSize] = useState("20px");
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
    
    const handleScroll = () => {
      setSize("20px");
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const brand = "Welcome-to-QuickFix";
  const brandChar = brand.split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <>
      <CustomCursor 
        color="linear-gradient(135deg, rgb(255, 0, 0), rgb(255, 136, 0))" 
        size={size} 
        index="-10" 
      />
      
      <HeroSection>
        <HeroOverlay />
        <HeroContent>
          <motion.div
            className="brand-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {brandChar.map((ch, index) => (
              <motion.span 
                key={index} 
                className="brand-char"
                variants={childVariants}
                custom={index}
              >
                {ch}
              </motion.span>
            ))}
          </motion.div>

          <HeroText
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <h2>Your On-the-Spot Vehicle Rescue Partner</h2>
            <p>
              When your vehicle breaks down, Quick Fix is here to get you back on the road!
              We connect you with trusted nearby mechanical shops offering fast and reliable help.
            </p>
          </HeroText>
        </HeroContent>
      </HeroSection>

      <ContentWrapper>
        <FeatureSection data-aos="fade-up">
          <FeatureGrid>
            <FeatureCard 
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setSize("650px")}
              onHoverEnd={() => setSize("20px")}
            >
              <Icon>🛠️</Icon>
              <h3>Instant Help Nearby</h3>
              <p>Find the nearest mechanic for towing, puncture repair, engine issues, and more.</p>
            </FeatureCard>

            <FeatureCard 
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setSize("650px")}
              onHoverEnd={() => setSize("20px")}
            >
              <Icon>✅</Icon>
              <h3>Verified Mechanics</h3>
              <p>Get assistance from trusted and rated service providers.</p>
            </FeatureCard>

            <FeatureCard 
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setSize("650px")}
              onHoverEnd={() => setSize("20px")}
            >
              <Icon>💵</Icon>
              <h3>Transparent Pricing</h3>
              <p>Check real-time prices and shop details before booking.</p>
            </FeatureCard>
          </FeatureGrid>
        </FeatureSection>

        <About />
        <WhyLetMySpace />
        <Services />
        <Contact />
      </ContentWrapper>
    </>
  );
};

// Styled Components
const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
              url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  width: 80%;
  max-width: 1200px;
  padding: 2rem;
  text-align: center;

  .brand-container {
    margin-bottom: 2rem;
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 700;
    letter-spacing: 2px;
  }

  .brand-char {
    display: inline-block;
    transition: all 0.3s ease;

    &:nth-child(1) { animation: rotatechar 2s ease 1s infinite }
    &:nth-child(3) { animation: rotatecharZ 2s ease 0s infinite }
    &:nth-child(8) { animation: rotatechar 3s ease 0s infinite }
    &:nth-child(11) { animation: rotatechar 3s ease 0s infinite }
    &:nth-child(12) { animation: barrel 3s linear 0.1s infinite }
    &:nth-child(13) { animation: barrel 3s linear 0.2s infinite }
    &:nth-child(14) { animation: barrel 3s linear 0.3s infinite }
    &:nth-child(15) { animation: barrel 3s linear 0.4s infinite }
    &:nth-child(16) { animation: barrel 3s linear 0.5s infinite }
    &:nth-child(17) { animation: barrel 3s linear 0.6s infinite }
    &:nth-child(18) { animation: barrel 3s linear 0.7s infinite }
    &:nth-child(19) { animation: barrel 3s linear 0.8s infinite }
    &:nth-child(20) { animation: barrel 3s linear 0.9s infinite }
    &:nth-child(21) { animation: barrel 3s linear 1s infinite }
  }

  @keyframes rotatechar {
    from { transform: rotateY(0deg); }
    to { transform: rotateY(-360deg); }
  }

  @keyframes rotatecharZ {
    from { transform: rotate3d(0,0,0,0deg) }
    to { transform: rotate3d(1,0,0,360deg); }
  }

  @keyframes barrel {
    0% { opacity: 1; }
    100% { opacity: 0; }
  }
`;

const HeroText = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 15px;
  backdrop-filter: blur(5px);

  h1 {
    font-size: clamp(1.5rem, 4vw, 3rem);
    margin-bottom: 1rem;
    color: #ff8c00;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  }

  p {
    font-size: clamp(1rem, 2vw, 1.2rem);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
`;

const FeatureSection = styled.section`
  padding: 4rem 0;
  background: #f8f9fa62;
  backdrop-filter:blur(20px);
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
`;

const FeatureCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  text-align: center;

  h3 {
    margin: 1rem 0;
    color: #333;
    font-size: 1.3rem;
  }

  p {
    color: #666;
    line-height: 1.6;
  }
`;

const Icon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export default Home;