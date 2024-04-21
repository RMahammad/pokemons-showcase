"use client";
import { navMenu } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { DetailedHTMLProps, LinkHTMLAttributes } from "react";
import styled from "styled-components";

type MenuLinkProps = DetailedHTMLProps<
  LinkHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  active?: string;
};

// ** Header container
const HeaderContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #6523b6;
`;

// ** Logo menu container
const LogoMenuContainer = styled.div`
  display: flex;
  gap: 20px;
`;

// ** Header logo
const HeaderLogo = styled(Image)`
  object-fit: contain;
`;

// ** Menu container
const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

// ** Menu links
const MenuLink = styled(Link)<MenuLinkProps>`
  text-decoration: none;
  color: white;
  background-color: ${({ active }) =>
    active === "true" ? "#4a1885" : "transparent"};
  &:hover {
    background-color: #4a1885; /* Change background color on hover */
  }
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 32px;
`;

// ** Learn more button
const LearnMoreButton = styled.button`
  background-color: #af4417;
  border: 1px solid #fb7823;
  text-decoration: none;
  color: white;
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 32px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(to top, #fb7823, #af4417);
  }
`;

const Header = () => {
  const params = usePathname();

  return (
    <HeaderContainer>
      <LogoMenuContainer>
        <Link href={"/"}>
          <HeaderLogo
            width={120}
            height={50}
            src={"/assets/logo/logo.png"}
            alt="Logo"
          />
        </Link>

        <MenuContainer>
          {navMenu.map((item, index) => (
            <MenuLink
              href={item.url}
              key={index}
              active={params === item.url ? "true" : "false"}
            >
              {item.title}
            </MenuLink>
          ))}
        </MenuContainer>
      </LogoMenuContainer>
      <LearnMoreButton>Learn more</LearnMoreButton>
    </HeaderContainer>
  );
};

export default Header;
