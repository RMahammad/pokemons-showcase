import React from "react";
import { getByRole, render } from "@testing-library/react";
import Header from "@/components/shared/Header";

// Mocking Next.js modules
jest.mock("next/image", () => ({
  __esModule: true,
  default: jest.fn(() => <img alt="Logo" />),
}));
jest.mock("next/link", () => {
  return ({ children }: any) => {
    return children;
  };
});
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("Header component", () => {
  // Test rendering and functionality
  test("renders logo and menu items", () => {
    // Mock usePathname hook
    const usePathnameMock = jest.fn();
    usePathnameMock.mockReturnValue("/");
    jest.mock("next/navigation", () => ({
      usePathname: usePathnameMock,
    }));

    const { getByAltText, getByText, getByRole } = render(<Header />);

    // Ensure logo (Image component) is rendered
    const logo = getByAltText("Logo");
    expect(logo).toBeInTheDocument();

    // Ensure menu items are rendered
    const menuContainer = getByRole("navigation");
    expect(menuContainer).toBeInTheDocument();

    // Find menu items by text
    expect(getByText(/Home.*Pokemon cards/)).toBeInTheDocument();
  });
});
