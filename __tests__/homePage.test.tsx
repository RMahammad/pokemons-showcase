// Import React and required modules
import React from "react";
import { render } from "@testing-library/react";

// Import the component you want to test
import Home from "@/app/(home)/page";

jest.mock("@/components/home/Hero", () => {
  const MockedHero = () => {
    return <div data-testid="hero">Mocked Hero</div>;
  };

  return MockedHero;
});
jest.mock("@/components/home/HomeCategories", () => {
  const MockedCategories = () => {
    return <div data-testid="categories">Mocked Categories</div>;
  };

  return MockedCategories;
});

describe("Home Component", () => {
  it("renders Home component with Hero and Categories", () => {
    // Render the Home component
    const { getByTestId } = render(<Home />);

    // Ensure that Hero component is rendered
    const heroElement = getByTestId("hero");
    expect(heroElement).toBeInTheDocument();

    // Ensure that HomeCategories component is rendered
    const categoriesElement = getByTestId("categories");
    expect(categoriesElement).toBeInTheDocument();
  });
});
