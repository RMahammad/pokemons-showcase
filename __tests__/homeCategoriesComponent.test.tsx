import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import HomeCategories from "@/components/home/HomeCategories";

// Mock the useQuery hook
jest.mock("@tanstack/react-query", () => ({
  useQuery: jest.fn(() => ({
    isPending: false,
    isError: false,
    error: null,
    data: [
      { id: 1, name: "Grass" },
      { id: 2, name: "Fire" },
    ],
    isFetching: false,
    isPlaceholderData: false,
  })),
}));

describe("HomeCategories", () => {
  it("renders the component with data", async () => {
    render(<HomeCategories />);

    // Check if the title is rendered
    expect(screen.getByText("Pokemon Categories")).toBeInTheDocument();

    // Check if the type items are rendered
    await waitFor(() => {
      expect(screen.getByText("GRASS")).toBeInTheDocument();
      expect(screen.getByText("FIRE")).toBeInTheDocument();
    });
  });
});
