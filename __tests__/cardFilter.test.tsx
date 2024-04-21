import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CardFilter from "@/components/cards/CardFilter";

// Mocking useRouter and useSearchParams
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    replace: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
  }),
}));

// Mocking Pokemon types
const mockTypes = [
  { id: "1", name: "grass" },
  { id: "2", name: "fire" },
  { id: "3", name: "water" },
];

describe("CardFilter component", () => {
  it("renders correctly", () => {
    const mockDispatch = jest.fn();
    const mockState = { category: "", name: "", page: 0 };
    const { getByLabelText, getByText } = render(
      <CardFilter types={mockTypes} dispatch={mockDispatch} state={mockState} />
    );

    expect(getByLabelText("Search by name")).toBeInTheDocument();
    expect(getByLabelText("Choose category:")).toBeInTheDocument();
    expect(getByText("All")).toBeInTheDocument();
    mockTypes.forEach((type) => {
      expect(getByText(type.name.toUpperCase())).toBeInTheDocument();
    });
  });

  it("dispatches SET_NAME action on input change", () => {
    const mockDispatch = jest.fn();
    const mockState = { category: "", name: "", page: 0 };
    const { getByLabelText } = render(
      <CardFilter types={mockTypes} dispatch={mockDispatch} state={mockState} />
    );

    const input = getByLabelText("Search by name");
    fireEvent.change(input, { target: { value: "bulbasaur" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_NAME",
      payload: "bulbasaur",
    });
  });

  it("dispatches SET_CATEGORY action on select change", () => {
    const mockDispatch = jest.fn();
    const mockState = { category: "", name: "", page: 0 };
    const { getByLabelText } = render(
      <CardFilter types={mockTypes} dispatch={mockDispatch} state={mockState} />
    );

    const select = getByLabelText("Choose category:");
    fireEvent.change(select, { target: { value: "1" } });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "SET_CATEGORY",
      payload: "1",
    });
  });
});
