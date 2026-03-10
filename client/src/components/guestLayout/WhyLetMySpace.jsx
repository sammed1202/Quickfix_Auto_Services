import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styled from "styled-components";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const WhyLetMySpace = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const svgRefs = useRef([]);

  // Add to ref array
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  useGSAP(() => {
    // Horizontal scroll animation
    gsap.to(".gsapAnime", {
      x: () => -window.innerWidth * 2.5,
      ease: "power1.out",
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: 1,
        pin: true,
        start: "top top",
        end: "+=300%",
        anticipatePin: 1,
      },
    });

    // Card animations
    cardsRef.current.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        delay: i * 0.1,
      });

      // Hover animation
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        paused: true,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(card.querySelector(".card-icon"), {
            y: -5,
            duration: 0.3,
          });
        },
      });

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          y: -10,
          duration: 0.3,
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          y: 0,
          duration: 0.3,
        });
      });
    });

    // SVG animations
    svgRefs.current.forEach((svg, i) => {
      const paths = svg.querySelectorAll("path");
      gsap.set(paths, { opacity: 0, y: 20 });
      
      gsap.to(paths, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: cardsRef.current[i],
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    });
  }, { scope: containerRef });

  const features = [
    {
      title: "Real-Time Mechanic Listings",
      desc: "Browse service shops near your location with distance and availability info.",
      icon: (
        <svg ref={el => svgRefs.current[0] = el} className="card-icon" width="80" height="80" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#FF6B6B"/>
          <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#FF6B6B"/>
          <path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="#FF6B6B"/>
        </svg>
      )
    },
    {
      title: "Verified Service Providers",
      desc: "All mechanics and workshops are verified for reliability and professionalism.",
      icon: (
        <svg ref={el => svgRefs.current[1] = el} className="card-icon" width="80" height="80" viewBox="0 0 24 24">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="#4ECDC4"/>
        </svg>
      )
    },
    {
      title: "Transparent Pricing",
      desc: "View upfront service charges—no hidden fees.",
      icon: (
        <svg ref={el => svgRefs.current[2] = el} className="card-icon" width="80" height="80" viewBox="0 0 24 24">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" fill="#FFD166"/>
        </svg>
      )
    },
    {
      title: "Location-Based Assistance",
      desc: "Get help based on your real-time GPS location or preferred area.",
      icon: (
        <svg ref={el => svgRefs.current[3] = el} className="card-icon" width="80" height="80" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#06D6A0"/>
        </svg>
      )
    },
    {
      title: "Diverse Repair Services",
      desc: "Book towing, puncture repair, battery jump-start, engine fixes, and more.",
      icon: (
        <svg ref={el => svgRefs.current[4] = el} className="card-icon" width="80" height="80" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z" fill="#118AB2"/>
          <circle cx="7.5" cy="14.5" r="1.5" fill="#118AB2"/>
          <circle cx="16.5" cy="14.5" r="1.5" fill="#118AB2"/>
        </svg>
      )
    },
    {
      title: "Mobile Friendly",
      desc: "Book services, view updates, and chat with the mechanic—on any device.",
      icon: (
        <svg ref={el => svgRefs.current[5] = el} className="card-icon" width="80" height="80" viewBox="0 0 24 24">
          <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" fill="#EF476F"/>
        </svg>
      )
    },
    {
      title: "Flexible Booking",
      desc: "Book now or schedule assistance for later—your convenience, your call.",
      icon: (
        <svg ref={el => svgRefs.current[6] = el} className="card-icon" width="80" height="80" viewBox="0 0 24 24">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" fill="#FFC43D"/>
          <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="#FFC43D"/>
        </svg>
      )
    },
    {
      title: "Fast Response Time",
      desc: "Our partner mechanics respond quickly so you're never left stranded.",
      icon: (
        <svg ref={el => svgRefs.current[7] = el} className="card-icon" width="80" height="80" viewBox="0 0 24 24">
          <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" fill="#1B9AAA"/>
        </svg>
      )
    }
  ];

  return (
    <Container ref={containerRef}>
      <AnimatedContent className="gsapAnime">
        <Title>
          <Highlight>Quick</Highlight>
          <span>Fix</span>
        </Title>
        
        {features.map((feature, index) => (
          <Card key={index} ref={addToRefs}>
            {feature.icon}
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </Card>
        ))}
      </AnimatedContent>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  overflow-x: hidden;
  position: relative;
`;

const AnimatedContent = styled.div`
  display: flex;
  align-items: center;
  padding: 0 5vw;
  will-change: transform;
`;

const Title = styled.h1`
  font-size: 15vw;
  text-transform: uppercase;
  color: black;
  text-shadow: 5px 5px 10px rgba(71, 67, 67, 0.2);
  margin-right: 5vw;
  white-space: nowrap;
  font-weight: 900;
  letter-spacing: -2px;
`;

const Highlight = styled.span`
  background: black;
  color: white;
  padding: 0 20px;
  border-radius: 25px;
  display: inline-block;
`;

const Card = styled.div`
  width: 400px;
  height: 300px;
  padding: 30px;
  margin: 0 30px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);

  h3 {
    font-size: 1.5rem;
    margin: 20px 0 15px;
    color: #333;
    font-weight: 700;
    position: relative;
    z-index: 2;
  }

  p {
    font-size: 1rem;
    color: #666;
    line-height: 1.6;
    margin: 0;
    position: relative;
    z-index: 2;
    white-space: normal;
  }

  .card-icon {
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(247,214,160,0.3) 0%, rgba(255,255,255,0.8) 100%);
    z-index: 1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-10px) scale(1.03);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);

    &:before {
      opacity: 1;
    }

    .card-icon {
      transform: translateY(-5px) scale(1.1);
    }
  }
`;

export default WhyLetMySpace;