"use client";
import { Action, State } from "@/app/cards/page";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

export interface PaginationProps {
  arrayLength: number;
  dispatch: Dispatch<Action>;
  state: State;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  padding-bottom: 20px;
`;

const PaginationButton = styled.button`
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
`;

const Pagination = ({ arrayLength, state, dispatch }: PaginationProps) => {
  const handleNavigation = (direction: string) => {
    if (direction === "next") {
      dispatch({
        type: "SET_PAGE",
        payload: state.page + 1,
      });
    } else {
      dispatch({
        type: "SET_PAGE",
        payload: state.page - 1,
      });
    }
  };
  return (
    <PaginationContainer>
      <PaginationButton
        disabled={!state.page || state.page === 0}
        onClick={() => {
          if (state.page || state.page !== 0) {
            handleNavigation("previous");
          }
        }}
      >
        Previous
      </PaginationButton>
      <PaginationButton
        disabled={arrayLength === 0}
        onClick={() => {
          if (arrayLength !== 0) {
            handleNavigation("next");
          }
        }}
      >
        Next
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
