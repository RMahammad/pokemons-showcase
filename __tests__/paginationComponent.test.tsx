import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "@/components/shared/Pagination";

describe("Pagination Component", () => {
  test("renders correctly with next button enabled and previous button disabled", () => {
    const arrayLength = 10;
    const state = { page: 0, name: "", category: "" };
    const dispatch = jest.fn();
    const { getByText, getByTestId } = render(
      <Pagination arrayLength={arrayLength} state={state} dispatch={dispatch} />
    );

    const previousButton = getByText("Previous");
    const nextButton = getByText("Next");

    expect(previousButton).toBeDisabled();
    expect(nextButton).toBeEnabled();
  });

  test("clicking next button calls dispatch with incremented page number", () => {
    const arrayLength = 10;
    const state = { page: 0, name: "", category: "" };
    const dispatch = jest.fn();
    const { getByText } = render(
      <Pagination arrayLength={arrayLength} state={state} dispatch={dispatch} />
    );

    const nextButton = getByText("Next");
    fireEvent.click(nextButton);

    expect(dispatch).toHaveBeenCalledWith({ type: "SET_PAGE", payload: 1 });
  });

  test("clicking previous button calls dispatch with decremented page number", () => {
    const arrayLength = 10;
    const state = { page: 2, name: "", category: "" };
    const dispatch = jest.fn();
    const { getByText } = render(
      <Pagination arrayLength={arrayLength} state={state} dispatch={dispatch} />
    );

    const previousButton = getByText("Previous");
    fireEvent.click(previousButton);

    expect(dispatch).toHaveBeenCalledWith({ type: "SET_PAGE", payload: 1 });
  });

  test("previous button should be disabled on first page", () => {
    const arrayLength = 10;
    const state = { page: 0, name: "", category: "" };
    const dispatch = jest.fn();
    const { getByText } = render(
      <Pagination arrayLength={arrayLength} state={state} dispatch={dispatch} />
    );

    const previousButton = getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  test("next button should be disabled when arrayLength is 0", () => {
    const arrayLength = 0;
    const state = { page: 0, name: "", category: "" };
    const dispatch = jest.fn();
    const { getByText } = render(
      <Pagination arrayLength={arrayLength} state={state} dispatch={dispatch} />
    );

    const nextButton = getByText("Next");
    expect(nextButton).toBeDisabled();
  });
});
