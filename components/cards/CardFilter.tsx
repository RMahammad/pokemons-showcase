"use client";
import { Action, State } from "@/app/cards/page";
import { PokemonTypesProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface CardFilterProps {
  types: PokemonTypesProps[];
  dispatch: Dispatch<Action>;
  state: State;
}

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  gap: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 60px;
  padding-left: 60px;
  width: 500px;
  background-color: #6523b6;
  clip-path: polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%);

  @media (max-width: 768px) {
    padding-right: 50px;
    padding-left: 50px;
    flex-wrap: wrap;
    width: calc(100% - 100px);
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

const InputComponent = styled.input`
  border: none;
  outline: none;

  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;

  &:focus {
    outline: none;
  }
`;

const InputTitle = styled.label`
  color: white;
  font-size: 20px;
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`;

const SelectComponent = styled.select`
  border: none;
  outline: none;

  border-radius: 5px;
  padding-top: 10px;
  padding-bottom: 10px;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    width: 100%;
    -webkit-appearance: none;
  }
`;

const SelectTitle = styled.label`
  color: white;
  font-size: 20px;
`;

const CardFilter = ({ types, state, dispatch }: CardFilterProps) => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams.get("category");
  const router = useRouter();
  return (
    <FilterContainer>
      <InputContainer>
        <InputTitle htmlFor="inputSearch">Search by name</InputTitle>
        <InputComponent
          id="inputSearch"
          onChange={(e) => {
            dispatch({
              type: "SET_NAME",
              payload: e.target.value.toLowerCase(),
            });
          }}
          type="search"
        />
      </InputContainer>

      <SelectContainer>
        <SelectTitle htmlFor="categorySearch">Choose category:</SelectTitle>

        <SelectComponent
          onChange={(e) => {
            if (categoryParams) {
              router.replace("/cards", undefined);
            }
            dispatch({
              type: "SET_CATEGORY",
              payload: e.target.value.toLowerCase(),
            });
          }}
          value={state.category}
          name="categorySearch"
          id="categorySearch"
        >
          <option value="">All</option>
          {types?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name.toUpperCase()}
            </option>
          ))}
        </SelectComponent>
      </SelectContainer>
    </FilterContainer>
  );
};

export default CardFilter;
