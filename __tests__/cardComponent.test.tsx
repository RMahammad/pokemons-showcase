import React from "react";
import { getAllByRole, render } from "@testing-library/react";
import CardComponent from "@/components/cards/CardComponent";

// Mock data for testing
const mockData = [
  {
    name: "bulbasaur",
    pokemon_v2_pokemonsprites: [
      {
        sprites: {
          front_default: "/assets/home/pokeball.png",
          other: {
            dream_world: {
              front_default: "/assets/home/pokeball.png",
            },
          },
        },
      },
    ],
  },
  // Add more mock data items if needed
];

describe("CardComponent", () => {
  it("renders without crashing", () => {
    render(<CardComponent data={[]} />);
  });

  it("renders the correct number of cards", () => {
    // @ts-ignore
    const { getAllByRole } = render(<CardComponent data={mockData} />);
    const cardLinks = getAllByRole("link");
    expect(cardLinks.length).toBe(mockData.length);
  });

  it("renders card titles correctly", () => {
    // @ts-ignore
    const { getByText } = render(<CardComponent data={mockData} />);
    mockData.forEach((item) => {
      const cardTitle = getByText(item.name.toUpperCase());
      expect(cardTitle).toBeInTheDocument();
    });
  });

  it("renders default card image when sprite is not available", () => {
    // @ts-ignore
    const { getAllByRole } = render(<CardComponent data={mockData} />);
    const defaultCardImages = getAllByRole("img");
    const defaultCardImagesSrc = defaultCardImages.map((img) =>
      img.getAttribute("src")
    );

    expect(defaultCardImagesSrc).toEqual(
      Array(mockData.length).fill(
        "/_next/image?url=%2Fassets%2Fhome%2Fpokeball.png&w=256&q=75"
      )
    );
  });

  // Add more specific tests as needed
});
