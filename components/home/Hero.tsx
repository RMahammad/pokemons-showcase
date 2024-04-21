import React from "react";
import styled from "styled-components";

// ** Hero section
const HeroContainer = styled.div`
  position: relative;
  margin-bottom: -5px;
`;

const HeroVideo = styled.video`
  width: 100%;
  height: 100vh;
  object-fit: cover;
`;

const HeroTitleContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(17, 17, 17, 0.8);
  clip-path: polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%);
  padding-right: 50px;
  padding-left: 50px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 15px;
`;

const HeroTitle = styled.h1`
  color: white;
  max-width: 700px;
  text-align: center;
  font-size: 48px;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const HomeHero = () => {
  return (
    <HeroContainer>
      <HeroVideo
        autoPlay={true}
        loop={true}
        muted
        width="320"
        height="240"
        preload="none"
        playsInline
        data-testid="hero-video"
      >
        <source
          src="/assets/home/poke029-pokemon-unite-official-site-header-video-1920x1080.mp4"
          type="video/mp4"
          data-testid="hero-video-source"
        />
      </HeroVideo>

      <HeroTitleContainer>
        <HeroTitle>Discover the multifaceted world of Pokémon.</HeroTitle>
      </HeroTitleContainer>
    </HeroContainer>
  );
};

export default HomeHero;
