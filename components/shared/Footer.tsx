"use client";
import { footerMenu, socialAccounts } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiOutlineMailOpen } from "react-icons/hi";
import styled from "styled-components";

// ** Footer container
const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background-image: url("/assets/footer/background.jpg");
  background-size: auto;
  background-repeat: repeat;
  padding-top: 32px;
`;

// ** Social and logo container
const SocialLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 1280px;
  width: 100%;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

// ** Social
const SocialAccountContainer = styled.div`
  display: flex;
  gap: 5px;
  width: 300px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const SocialIconLink = styled(Link)`
  font-size: 45px;
  color: white;
`;

// ** Newsletter

const NewsletterContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  color: white;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const NewsletterIcon = styled(HiOutlineMailOpen)`
  color: #fb7823;
  transform: rotate(-20deg);
  font-size: 30px;
`;

// ** Footer logo
const FooterLogo = styled(Image)`
  object-fit: contain;

  @media (max-width: 768px) {
    width: 200px;
  }
`;

// ** Privacy Images
const PrivacyImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  width: 300px;

  @media (max-width: 768px) {
    justify-content: center;
    align-items: center;
  }
`;

const PrivacyImage = styled(Image)``;

// ** Privacy menu container
const PrivacyMenuContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const PrivacyMenuLink = styled(Link)`
  text-decoration: none;
  color: #ffb22e;
  &:hover {
    color: #fafa00;
  }
`;

const PrivacyText = styled.div`
  max-width: 500px;
  font-size: 10px;
  color: white;
  text-align: center;

  @media (max-width: 768px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

// ** Snorlax image
const SnorlaxImage = styled(Image)`
  display: flex;
  align-items: flex-end;
  object-fit: contain;
  width: 100%;

  @media (max-width: 768px) {
    object-fit: cover;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      {/* Social, Logo Container */}
      <SocialLogoContainer>
        <div>
          <SocialAccountContainer data-testid="social-icons">
            {socialAccounts.map((item, index) => (
              <SocialIconLink href={item.url} key={index}>
                {item.icon}
              </SocialIconLink>
            ))}
          </SocialAccountContainer>

          <NewsletterContainer>
            <NewsletterIcon />

            <p>SIGN UP FOR THE NEWSLETTER!</p>
          </NewsletterContainer>
        </div>

        <FooterLogo
          width={500}
          height={200}
          src={"/assets/logo/logo.png"}
          alt="Logo"
        />

        <PrivacyImagesContainer>
          <PrivacyImage
            src={"/assets/footer/privacy-2x.png"}
            alt="privacy image"
            width={100}
            height={50}
          />

          <PrivacyImage
            src={"/assets/footer/rating-en-us.jpg"}
            alt="privacy image"
            width={100}
            height={50}
          />
        </PrivacyImagesContainer>
      </SocialLogoContainer>

      {/* Privacy menu */}
      <PrivacyMenuContainer>
        {footerMenu.map((item, index) => (
          <PrivacyMenuLink key={index} href={item.url}>
            {item.title}
          </PrivacyMenuLink>
        ))}
      </PrivacyMenuContainer>

      {/* Privacy text */}
      <PrivacyText>
        ©️️️2021 Pokémon. ©️️️1995–2021 Nintendo / Creatures Inc. / GAME FREAK
        inc. <br /> <br /> ©️️️2021 Tencent.
        <br />
        <br /> TM, ® Nintendo. <br /> <br /> Terminology is not final. <br />
        <br /> Screenshots and game footage are from a title under development.
        <br /> <br />
        This is a free-to-start game; optional in-game purchases available. Data
        charges may apply. <br /> <br /> Nintendo Switch is a trademark of
        Nintendo <br /> <br /> Apple and the Apple logo are trademarks of Apple
        Inc., registered in the U.S. and other countries. App Store is a service
        mark of Apple Inc. <br /> <br /> Android, Google Play, and the Google
        Play logo are trademarks of Google, LLC.
      </PrivacyText>

      {/* Snorlax image */}
      <div>
        <SnorlaxImage
          width={1000}
          height={500}
          src={"/assets/footer/snorlax-2x.png"}
          alt="snorlax"
        />
      </div>
    </FooterContainer>
  );
};

export default Footer;
