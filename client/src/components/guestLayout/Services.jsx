import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styled, { keyframes } from "styled-components";

// SVG Icons as React Components
const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00bfae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
);

const ToolsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00bfae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);

const BatteryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00bfae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="16" height="10" rx="2" ry="2"></rect>
    <line x1="22" y1="11" x2="22" y2="13"></line>
  </svg>
);

const TowTruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00bfae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5" cy="18" r="2"></circle>
    <circle cx="19" cy="18" r="2"></circle>
    <path d="M19 18h2a1 1 0 0 0 1-1v-5a1 1 0 0 0-.3-.7L17 8H5"></path>
    <path d="M15 18H9"></path>
    <path d="M3 8h10l3 3h4"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00bfae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#00bfae" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

// Background images for cards
const backgroundImages = [
  "linear-gradient(135deg, rgba(0,191,174,0.1) 0%, rgba(255,255,255,0.8) 100%), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')",
  "linear-gradient(135deg, rgba(0,191,174,0.1) 0%, rgba(255,255,255,0.8) 100%), url('https://images.unsplash.com/photo-1551830820-330a71b99659?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')",
  "linear-gradient(135deg, rgba(0,191,174,0.1) 0%, rgba(255,255,255,0.8) 100%), url('https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')",
  "linear-gradient(135deg, rgba(0,191,174,0.1) 0%, rgba(255,255,255,0.8) 100%), url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')",
  "linear-gradient(135deg, rgba(0,191,174,0.1) 0%, rgba(255,255,255,0.8) 100%), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')",
  "linear-gradient(135deg, rgba(0,191,174,0.1) 0%, rgba(255,255,255,0.8) 100%), url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')"
];

// Animation keyframes
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const ServiceCardContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  animation: ${fadeIn} 0.8s ease-out forwards;
  animation-delay: ${props => props.delay}ms;
  opacity: 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.85);
    z-index: 1;
    transition: all 0.5s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);

    &:before {
      background: rgba(255, 255, 255, 0.53);
    }

    .service-content {
      transform: translateY(-5px);
    }

    svg {
      animation: ${float} 3s ease-in-out infinite, ${pulse} 2s ease-in-out infinite;
    }
  }
`;

const ServiceContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.5s ease;
`;

const ServiceIcon = styled.div`
  margin-bottom: 20px;
  svg {
    transition: all 0.3s ease;
  }
`;

const ServiceTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
  position: relative;
  display: inline-block;

  &:after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 50px;
    height: 3px;
    background: #00bfae;
    transition: all 0.3s ease;
  }
`;

const ServiceDescription = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
  flex-grow: 1;
`;

const ReadMoreLink = styled.a`
  font-size: 16px;
  color: #00bfae;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  position: relative;
  align-self: flex-start;

  &:hover {
    color: #008f7e;
    transform: translateX(5px);

    i {
      transform: translateX(5px);
    }
  }

  i {
    margin-left: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
  }
`;

const ServicesSection = styled.section`
  padding: 100px 0;
  position: relative;
  overflow: hidden;
`;

const SectionTitle = styled.h2`
  font-size: 42px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  position: relative;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);

  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: #00bfae;
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  font-size: 18px;
  color: #555;
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
  line-height: 1.6;
`;

const services = [
  {
    title: "On-Road Assistance",
    icon: <TruckIcon />,
    description: "Immediate help with flat tires, jump-starts, fuel delivery, and other on-road emergencies.",
    link: "#",
  },
  {
    title: "Mechanical Repairs",
    icon: <ToolsIcon />,
    description: "Connect with trusted mechanics for engine, clutch, brake, and other repair services.",
    link: "#",
  },
  {
    title: "Battery & Electrical Help",
    icon: <BatteryIcon />,
    description: "Fix battery issues, get replacements, or resolve wiring problems with expert assistance.",
    link: "#",
  },
  {
    title: "Towing Services",
    icon: <TowTruckIcon />,
    description: "Book reliable towing services to move your vehicle to the nearest garage or your preferred location.",
    link: "#",
  },
  {
    title: "Verified Shops & Transparent Pricing",
    icon: <ShieldIcon />,
    description: "Every shop is verified and displays real-time pricing so you know what you're paying for.",
    link: "#",
  },
  {
    title: "Live Booking & Updates",
    icon: <ClockIcon />,
    description: "Track your service request, view mechanic ETA, and stay updated from booking to completion.",
    link: "#",
  },
];

const ServiceCard = ({ title, icon, description, link, delay, bgImage }) => {
  return (
    <div className="col-lg-6" data-aos="fade-up">
      <ServiceCardContainer delay={delay} style={{ backgroundImage: bgImage }}>
        <ServiceContent className="service-content">
          <ServiceIcon>{icon}</ServiceIcon>
          <ServiceTitle>{title}</ServiceTitle>
          <ServiceDescription>{description}</ServiceDescription>
          <ReadMoreLink href={link}>
            Learn More <i className="bi bi-arrow-right"></i>
          </ReadMoreLink>
        </ServiceContent>
      </ServiceCardContainer>
    </div>
  );
};

const Services = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({
      duration: 800,
      delay: 0,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <ServicesSection id="services">
      <div className="container">
        <SectionTitle>🚗 Services We Help With</SectionTitle>
        <SectionSubtitle>
          Get immediate assistance for all your vehicle needs with our comprehensive
          roadside and repair services.
        </SectionSubtitle>
        <div className="row g-4">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              icon={service.icon}
              description={service.description}
              link={service.link}
              delay={index * 100}
              bgImage={backgroundImages[index % backgroundImages.length]}
            />
          ))}
        </div>
      </div>
    </ServicesSection>
  );
};

export default Services;