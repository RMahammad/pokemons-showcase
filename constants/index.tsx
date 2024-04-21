import { FooterMenuProps, NavMenuProps, SocialAccountProps } from "@/types";
import {
  FaInstagram,
  FaSquareFacebook,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

export const navMenu: NavMenuProps[] = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Pokemon cards",
    url: "/cards",
  },
];

export const socialAccounts: SocialAccountProps[] = [
  { title: "Facebook", icon: <FaSquareFacebook />, url: "/" },
  { title: "Twitter", icon: <FaXTwitter />, url: "/" },
  { title: "Youtube", icon: <FaYoutube />, url: "/" },
  { title: "Instagram", icon: <FaInstagram />, url: "/" },
];

export const footerMenu: FooterMenuProps[] = [
  { title: "TERMS OF USE", url: "/" },
  { title: "PRIVACY NOTICE", url: "/" },
  { title: "LEGAL INFO", url: "/" },
  { title: "CUSTOMER SERVICE", url: "/" },
];
