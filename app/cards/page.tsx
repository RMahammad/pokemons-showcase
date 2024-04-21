"use client";
import CardComponent from "@/components/cards/CardComponent";
import CardFilter from "@/components/cards/CardFilter";
import Pagination from "@/components/shared/Pagination";
import { getAllTypes, getPokemons } from "@/lib/graphql";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useReducer } from "react";
import styled from "styled-components";

const CardPageContainer = styled.div`
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );

  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }
`;

const NotFoundTitle = styled.h3`
  text-align: center;
  padding: 20px;
  font-size: 48px;
`;

export type State = {
  name: string;
  page: number;
  category: string;
};

export type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_CATEGORY"; payload: string };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

const CardsComponent = () => {
  const searchParams = useSearchParams();

  const initialState: State = {
    name: "",
    page: 0,
    category: searchParams.get("category") || "",
  };

  // ** Reducer for states
  const [state, dispatch] = useReducer(reducer, initialState);

  let limit = 20;

  const { data: allPokemons, isFetching: isFethcingPokemons } = useQuery({
    queryKey: ["allPokemons", state.category, state.name, limit, state.page],
    queryFn: () =>
      getPokemons({
        categoryId: state.category || undefined,
        name: state.name || undefined,
        limit: limit,
        page: state.page,
      }),
    placeholderData: keepPreviousData,
  });

  const { data: allTypes, isFetching: isFetchingTypes } = useQuery({
    queryKey: ["allTypes"],
    queryFn: () => getAllTypes(),
  });

  return (
    <CardPageContainer>
      {/* Filter section */}

      <CardFilter state={state} dispatch={dispatch} types={allTypes} />

      {isFethcingPokemons ? (
        <NotFoundTitle>Loading...</NotFoundTitle>
      ) : allPokemons.length === 0 ? (
        <NotFoundTitle>There is no more pokemon cards</NotFoundTitle>
      ) : (
        <CardComponent data={allPokemons} />
      )}

      {/* Pagination */}
      <Pagination
        state={state}
        dispatch={dispatch}
        arrayLength={allPokemons?.length}
      />
    </CardPageContainer>
  );
};

const Cards = () => {
  return (
    <Suspense>
      <CardsComponent />
    </Suspense>
  );
};

export default Cards;
