import React from "react";
import { render } from "@testing-library/react";
import HomeHero from "@/components/home/Hero";

describe("HomeHero Component", () => {
  it("renders without crashing", () => {
    render(<HomeHero />);
  });

  it("displays the hero title correctly", () => {
    const { getByText } = render(<HomeHero />);
    const heroTitle = getByText("Discover the multifaceted world of Pokémon.");
    expect(heroTitle).toBeInTheDocument();
  });

  it("renders the video element with correct attributes", () => {
    const { getByTestId } = render(<HomeHero />);
    const videoElement = getByTestId("hero-video");
    expect(videoElement).toBeInTheDocument();
    expect(videoElement).toHaveAttribute("autoplay", "");
    expect(videoElement).toHaveAttribute("loop", "");
    expect(videoElement).toHaveAttribute("preload", "none");
    expect(videoElement).toHaveAttribute("playsInline", "");
  });

  it("get source of video correct", () => {
    const { getByTestId } = render(<HomeHero />);
    const videoElement = getByTestId("hero-video-source");
    expect(videoElement).toHaveAttribute("src", "/assets/home/poke029-pokemon-unite-official-site-header-video-1920x1080.mp4");
  });
});
