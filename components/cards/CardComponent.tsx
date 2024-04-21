"use client";
import { PokemonCardProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import styled from "styled-components";

const PokemonCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  padding: 32px;
`;

const CardItem = styled(Link)`
  background-image: url("/assets/home/square-pattern-30.svg"),
    linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 38%);
  transform: skewX(-9deg) translate3d(0, 0, 1px);
  transform-origin: left bottom;
  background-color: #f16c38;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  width: 200px;
  height: 200px;

  @media (max-width: 768px) {
    width: 260px;
    height: 200px;
    margin-left: -30px;
  }
`;

const CardImage = styled(Image)`
  object-fit: contain;
  height: 150px;
  width: 150px;
`;

const DefaultCardImage = styled(Image)`
  object-fit: contain;
  height: 100px;
  width: 100px;
`;

const CardTitle = styled.p`
  background-image: linear-gradient(
    270deg,
    rgba(25, 7, 45, 0.5) 0%,
    #19072d 100%
  );
  color: white;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  font-size: 20px;
  padding: 10px;
  width: calc(100% - 20px);
`;

interface CardComponentProps {
  data: PokemonCardProps[];
}

const CardComponent: FC<CardComponentProps> = ({ data }) => {
  return (
    <div>
      <PokemonCardsContainer>
        {data.map((item, index) => (
          <div key={index}>
            <CardItem href={`/cards/${item.name}`}>
              {item.pokemon_v2_pokemonsprites[0]?.sprites?.other?.dream_world
                ?.front_default ? (
                <CardImage
                  src={
                    item.pokemon_v2_pokemonsprites[0].sprites.other.dream_world
                      .front_default
                  }
                  width={100}
                  height={100}
                  alt="Pokeball"
                />
              ) : item.pokemon_v2_pokemonsprites[0].sprites.front_default ? (
                <CardImage
                  src={item.pokemon_v2_pokemonsprites[0].sprites.front_default}
                  width={100}
                  height={100}
                  alt="Pokeball"
                />
              ) : (
                <DefaultCardImage
                  src={"/assets/home/pokeball.png"}
                  width={100}
                  height={100}
                  alt="Pokeball"
                />
              )}

              <CardTitle>{item.name.toUpperCase()}</CardTitle>
            </CardItem>
          </div>
        ))}
      </PokemonCardsContainer>
    </div>
  );
};

export default CardComponent;
