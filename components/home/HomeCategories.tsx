import { getAllTypes } from "@/lib/graphql";
import { PokemonTypesProps } from "@/types";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import styled from "styled-components";

const CategoriesContainer = styled.div`
  background-image: url("/assets/home/background.jpg");
  background-size: cover;
  display: flex;
  justify-content: center;
  padding-top: 96px;
  padding-bottom: 96px;
`;

const Category = styled.div`
  max-width: 1150px;
`;

const CategoriesTitleContainer = styled.div`
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

const NewsletterIcon = styled(FaRegCalendarAlt)`
  color: white;
  transform: rotate(-20deg);
  font-size: 30px;
`;

const CategoriesItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  background-image: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.6) 100%
  );
  padding: 32px;

  @media (max-width: 768px) {
    background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.2) 100%
    );
  }
`;

const TypeItem = styled(Link)`
  background-image: url("/assets/home/square-pattern-30.svg"),
    linear-gradient(180deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 38%);
  transform: skewX(-9deg) translate3d(0, 0, 1px);
  transform-origin: left bottom;
  background-color: #f16c38;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 10px;
  text-decoration: none;
  padding: 20px;
`;

const TypeTitle = styled.p`
  background-image: linear-gradient(
    270deg,
    rgba(25, 7, 45, 0.5) 0%,
    #19072d 100%
  );
  color: white;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 6px;
  font-size: 20px;
  margin-right: -20px;
  margin-left: -20px;
  margin-bottom: -20px;
  padding: 10px;
`;

const HomeCategories = () => {
  const { data, isFetching } = useQuery({
    queryKey: ["allTypes"],
    queryFn: () => getAllTypes(),
  });

  return (
    <CategoriesContainer>
      <Category>
        {/* Title section */}
        <CategoriesTitleContainer>
          <HalftoneImage
            src={"/assets/home/halfway.svg"}
            width={200}
            height={200}
            alt="halfway"
          />
          <NewsletterIcon />
          <CategoriesTitle>Pokemon Categories</CategoriesTitle>
        </CategoriesTitleContainer>

        {/* Categories */}
        <CategoriesItemContainer>
          {isFetching ? (
            <>Loading...</>
          ) : (
            data?.map((item: PokemonTypesProps, index: number) => (
              <div key={index}>
                <TypeItem href={`/cards?category=${item.id}`}>
                  <Image
                    src={"/assets/home/pokeball.png"}
                    width={100}
                    height={100}
                    alt="Pokeball"
                  />
                  <TypeTitle>{item.name.toUpperCase()}</TypeTitle>
                </TypeItem>
              </div>
            ))
          )}
        </CategoriesItemContainer>
      </Category>
    </CategoriesContainer>
  );
};

export default HomeCategories;
