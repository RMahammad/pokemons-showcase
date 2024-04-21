"use client";
import { Container } from "../globalsStyle";
import HomeHero from "@/components/home/Hero";
import HomeCategories from "@/components/home/HomeCategories";

export default function Home() {
  return (
    <Container>
      <HomeHero />

      <HomeCategories />
    </Container>
  );
}
