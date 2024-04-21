"use server";

import { GetPokemonProps } from "@/types";

const baseUrl = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;

// ** Get all pokemon types
export async function getAllTypes() {
  const query = `
  query getTypes {
    pokemon_v2_type {
      name
      id
    }
  }`;

  if (!baseUrl) {
    throw new Error("GraphQL endpoint is not defined");
  }

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Method-Used": "graphiql",
    },
    next: {
      revalidate: 60,
    },
    body: JSON.stringify({ query }),
  });

  const responseBody = await res.json();

  if (responseBody && responseBody.data && responseBody.data.pokemon_v2_type) {
    return responseBody.data.pokemon_v2_type;
  } else {
    throw new Error("Failed to fetch the post");
  }
}

// ** Get pokemons ( Include filtering: by category, by name )
export async function getPokemons({
  categoryId,
  name,
  limit = 20,
  page = 0,
}: GetPokemonProps) {
  const whereClause = `
  where: {
    ${
      categoryId
        ? `pokemon_v2_pokemontypes: {type_id: {_eq: ${categoryId}}}`
        : ""
    }
    ${categoryId && name ? "," : ""}
    ${name ? `name: {_eq: "${name}"}` : ""}
  }
`;

  const offset = page * limit;

  const query = `
  query getPokemons {
    pokemon_v2_pokemon(limit: ${limit}, offset: ${offset}, ${whereClause}) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

  if (!baseUrl) {
    throw new Error("GraphQL endpoint is not defined");
  }

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const responseBody = await res.json();

  console.log("This is response body:", offset, responseBody);

  if (
    responseBody &&
    responseBody.data &&
    responseBody.data.pokemon_v2_pokemon
  ) {
    return responseBody.data.pokemon_v2_pokemon;
  } else {
    throw new Error("Failed to fetch the post");
  }
}

export interface GetPokemonByNameProps {
  name: string;
}

// ** Get pokemon by name ( Include filtering: by category, by name )
export async function getPokemonByName({ name }: GetPokemonByNameProps) {
  const whereClause = `
  where: {
    ${name ? `name: {_eq: "${name}"}` : ""}
  }
`;

  const query = `
  query getPokemonByName{
  pokemon_v2_pokemon(${whereClause}) {
    id
    height
    base_experience
    name
    order
    weight
    pokemon_v2_pokemonabilities {
      id
      ability_id
      pokemon_v2_ability {
        name
        pokemon_v2_abilityeffecttexts(where: {language_id: {_eq: 9}}) {
          effect
        }
      }
    }
    pokemon_v2_pokemonforms {
      form_name
      form_order
      name
      order
      is_battle_only
      is_mega
    }
    pokemon_v2_pokemonitems {
      rarity
      id
      item_id
      pokemon_v2_item {
        cost
        name
        fling_power
      }
    }
    pokemon_v2_pokemonsprites {
      sprites
    }
    pokemon_v2_pokemontypes {
      id
      pokemon_id
      pokemon_v2_type {
        name
        id
      }
    }
    pokemon_v2_pokemonspecy {
      base_happiness
      capture_rate
      pokemon_v2_growthrate {
        name
        formula
        id
        pokemon_v2_growthratedescriptions {
          description
          growth_rate_id
          id
        }
      }
      pokemon_v2_generation {
        name
      }
      name
      is_mythical
      pokemon_v2_pokemoncolor {
        name
      }
      pokemon_v2_pokemonshape {
        name
      }
      pokemon_v2_pokemonhabitat {
        name
      }
      forms_switchable
      id
      is_baby
    }
    pokemon_v2_pokemonstats {
      base_stat
      effort
      pokemon_v2_stat {
        name
        id
      }
    }
  }
}
`;

  if (!baseUrl) {
    throw new Error("GraphQL endpoint is not defined");
  }

  const res = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const responseBody = await res.json();

  console.log("This is response body:", responseBody);

  if (
    responseBody &&
    responseBody.data &&
    responseBody.data.pokemon_v2_pokemon
  ) {
    return responseBody.data.pokemon_v2_pokemon;
  } else {
    throw new Error("Failed to fetch the post");
  }
}
