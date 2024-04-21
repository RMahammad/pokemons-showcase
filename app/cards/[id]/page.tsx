"use client";
import RadarChart from "@/components/charts/RadarChart";
import { getPokemonByName } from "@/lib/graphql";
import { PokemonAbility, PokemonData, PokemonStat } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CiLineHeight } from "react-icons/ci";
import { FaWeightHanging } from "react-icons/fa6";
import { GiCrystalGrowth, GiHabitatDome, GiRegeneration } from "react-icons/gi";
import { IoIosHappy, IoIosStats } from "react-icons/io";
import { IoColorFilterSharp, IoDiamond } from "react-icons/io5";
import { MdOutlineCatchingPokemon } from "react-icons/md";
import { TbCapture } from "react-icons/tb";
import styled, { keyframes } from "styled-components";

export interface PokemonStats {
  statName: string[];
  statValue: number[];
}

const PokemonHero = styled.div`
  background-image: url("/assets/card/background.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-top: 96px;
  padding-bottom: 96px;
`;

const PokemonImageContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PokemonImage = styled(Image)`
  width: 300px;
  height: 300px;
  z-index: 1;

  @media (max-width: 768px) {
    width: 280px;
    height: 280px;
  }
`;

const PokemonImageDecorationPlace = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  background: rgba(158, 236, 252, 0.3);
  border: 2px solid #9eecfc;
  border-radius: 50%;
  box-shadow: 0 0 30px 0 #9eecfc;
  transform: rotateX(75deg) translateY(180%);
  content: "";
`;

const rotateAnimation = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

const PokemonImageAnimation = styled.div`
  &::before {
    animation: ${rotateAnimation} 7s linear infinite;
    background: url("/assets/card/tech-decoration.svg") center / cover no-repeat;
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  left: 10%;
  top: 10%;
  position: absolute;
  transform: rotateX(75deg) translateY(220%);
  width: 80%;
`;

const PokemonDetailsContainer = styled.div`
  background-image: linear-gradient(180deg, #5a7fff, #2244bf);
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  padding-top: 32px;
  /* padding-bottom: 96px; */
`;

const CharacteristicsItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: white;
  font-size: 20px;
  font-weight: 600;
`;

const Detail = styled.div`
  max-width: 1150px;
  width: 100%;
`;

const PokemonHeaderContainer = styled.div`
  background-image: linear-gradient(
    -89deg,
    rgba(74, 24, 133, 0) 0%,
    #4a1885 50%
  );
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 24px;
  padding-left: 32px;
  border-top-left-radius: 40px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CategoriesTitle = styled.h3`
  font-size: 24px;
  color: white;
`;

const HalftoneImage = styled(Image)`
  position: absolute;
  top: -50px;
  z-index: -1;
  fill: white;
  color: white;
`;

const PokeballIcon = styled(MdOutlineCatchingPokemon)`
  color: white;
  transform: rotate(20deg);
  font-size: 30px;
`;

const DetailBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );

  @media (max-width: 768px) {
    background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }
`;

const DetailTitle = styled.div`
  background-image: linear-gradient(
    270deg,
    rgba(25, 7, 45, 0.5) 0%,
    #19072d 100%
  );
  color: white;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  font-size: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 32px;
  padding-left: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;

  @media (max-width: 768px) {
    gap: 10px;
    padding-right: 10px;
  }
`;

const DetailDescription = styled.p`
  color: white;
  font-size: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 32px;
  padding-left: 32px;
`;

const PokemonCard = () => {
  const params = useParams<{ id: string }>();
  // const [pokemonDetails, setPokemonDetails] = useState<PokemonData>();
  const [pokemonStats, setPokemonStats] = useState<PokemonStats>({
    statName: [],
    statValue: [],
  });

  const { data: pokemonDetails, isFetching } = useQuery({
    queryKey: ["pokemonDetails", { name: params.id }],
    queryFn: () => getPokemonByName({ name: params.id }),
  });

  const handleSetStats = () => {
    if (!isFetching && pokemonDetails[0]) {
      const statNames = pokemonDetails[0].pokemon_v2_pokemonstats.map(
        (stat: PokemonStat) => stat.pokemon_v2_stat.name.toUpperCase()
      );
      const statValues = pokemonDetails[0].pokemon_v2_pokemonstats.map(
        (stat: PokemonStat) => stat.base_stat
      );

      setPokemonStats({
        statName: statNames,
        statValue: statValues,
      });
    }
  };

  useEffect(() => {
    handleSetStats();
  }, [pokemonDetails]);

  console.log("This is stats: ", pokemonDetails);

  return (
    <div>
      {isFetching ? (
        <>Loading...</>
      ) : (
        pokemonDetails[0] && (
          <div>
            <PokemonHero>
              <PokemonImageContainer>
                {pokemonDetails[0]?.pokemon_v2_pokemonsprites[0]?.sprites?.other
                  ?.dream_world?.front_default ? (
                  <PokemonImage
                    src={
                      pokemonDetails[0].pokemon_v2_pokemonsprites[0].sprites
                        .other.dream_world.front_default
                    }
                    width={100}
                    height={100}
                    alt="Pokeball"
                  />
                ) : pokemonDetails[0]?.pokemon_v2_pokemonsprites[0].sprites
                    .front_default ? (
                  <PokemonImage
                    src={
                      pokemonDetails[0].pokemon_v2_pokemonsprites[0].sprites
                        .front_default
                    }
                    width={100}
                    height={100}
                    alt="Pokeball"
                  />
                ) : (
                  <PokemonImage
                    src={"/assets/home/pokeball.png"}
                    width={100}
                    height={100}
                    alt="Pokeball"
                  />
                )}

                <PokemonImageDecorationPlace />

                <PokemonImageAnimation />
              </PokemonImageContainer>
            </PokemonHero>

            <PokemonDetailsContainer>
              <Detail>
                {/* Detail Title */}
                <PokemonHeaderContainer>
                  <HalftoneImage
                    src={"/assets/home/halfway.svg"}
                    width={200}
                    height={200}
                    alt="halfway"
                  />
                  <PokeballIcon />
                  <CategoriesTitle>
                    {pokemonDetails[0].name.toUpperCase()} - Details
                  </CategoriesTitle>
                </PokemonHeaderContainer>

                {/* Common informations */}
                <DetailBody>
                  <DetailTitle>
                    <CharacteristicsItem>
                      <IoIosStats />

                      <p>Base Exp. : {pokemonDetails[0].base_experience}</p>
                    </CharacteristicsItem>

                    <CharacteristicsItem>
                      <GiRegeneration />

                      <p>
                        Generation :{" "}
                        {
                          pokemonDetails[0].pokemon_v2_pokemonspecy
                            .pokemon_v2_generation?.name
                        }
                      </p>
                    </CharacteristicsItem>
                  </DetailTitle>

                  <DetailTitle>
                    <CharacteristicsItem>
                      <IoIosHappy />

                      <p>
                        Base Happiness :{" "}
                        {
                          pokemonDetails[0].pokemon_v2_pokemonspecy
                            ?.base_happiness
                        }
                      </p>
                    </CharacteristicsItem>

                    <CharacteristicsItem>
                      <GiCrystalGrowth />

                      <p>
                        Growth Rate :{" "}
                        {
                          pokemonDetails[0].pokemon_v2_pokemonspecy
                            .pokemon_v2_growthrate?.name
                        }
                      </p>
                    </CharacteristicsItem>
                  </DetailTitle>

                  <DetailTitle>
                    <CharacteristicsItem>
                      <TbCapture />

                      <p>
                        Capture Rate :{" "}
                        {pokemonDetails[0].pokemon_v2_pokemonspecy.capture_rate}
                      </p>
                    </CharacteristicsItem>

                    <CharacteristicsItem>
                      <IoColorFilterSharp />

                      <p>
                        Color :{" "}
                        {
                          pokemonDetails[0].pokemon_v2_pokemonspecy
                            .pokemon_v2_pokemoncolor?.name
                        }
                      </p>
                    </CharacteristicsItem>
                  </DetailTitle>

                  <DetailTitle>
                    <CharacteristicsItem>
                      <CiLineHeight />
                      <p>Height : {pokemonDetails[0].height / 10} m</p>
                    </CharacteristicsItem>

                    <CharacteristicsItem>
                      <GiHabitatDome />

                      <p>
                        Habitat :{" "}
                        {
                          pokemonDetails[0].pokemon_v2_pokemonspecy
                            .pokemon_v2_pokemonhabitat?.name
                        }
                      </p>
                    </CharacteristicsItem>
                  </DetailTitle>

                  <DetailTitle>
                    <CharacteristicsItem>
                      <FaWeightHanging />

                      <p>Weight : {pokemonDetails[0].weight / 10} kg</p>
                    </CharacteristicsItem>

                    <CharacteristicsItem>
                      <IoDiamond />

                      <p>
                        Mythical :{" "}
                        {pokemonDetails[0].pokemon_v2_pokemonspecy.is_mythical
                          ? "Yes"
                          : "No"}
                      </p>
                    </CharacteristicsItem>
                  </DetailTitle>
                </DetailBody>
              </Detail>

              <Detail>
                <PokemonHeaderContainer>
                  <HalftoneImage
                    src={"/assets/home/halfway.svg"}
                    width={200}
                    height={200}
                    alt="halfway"
                  />
                  <PokeballIcon />
                  <CategoriesTitle>
                    {pokemonDetails[0].name.toUpperCase()} - Abilities
                  </CategoriesTitle>
                </PokemonHeaderContainer>

                {/* Abilities */}
                <DetailBody>
                  {pokemonDetails[0].pokemon_v2_pokemonabilities.length > 0 &&
                    pokemonDetails[0].pokemon_v2_pokemonabilities.map(
                      (item: PokemonAbility) => (
                        <div key={item.id}>
                          <DetailTitle>
                            {item.pokemon_v2_ability.name.toUpperCase()}
                          </DetailTitle>

                          <DetailDescription>
                            {
                              item.pokemon_v2_ability
                                .pokemon_v2_abilityeffecttexts[0]?.effect
                            }
                          </DetailDescription>
                        </div>
                      )
                    )}
                </DetailBody>
              </Detail>

              <RadarChart data={pokemonStats} />
            </PokemonDetailsContainer>
          </div>
        )
      )}
    </div>
  );
};

export default PokemonCard;
