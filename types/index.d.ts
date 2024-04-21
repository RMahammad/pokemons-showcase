export interface NavMenuProps {
  title: string;
  url: string;
}

export interface FooterMenuProps {
  title: string;
  url: string;
}

export interface SocialAccountProps {
  title: string;
  url: string;
  icon: React.ReactElement<IconBaseProps>;
}

export interface PokemonTypesProps {
  name: string;
  id: string;
}

export interface GetPokemonProps {
  categoryId: string | undefined | null;
  name: string | undefined | null;
  limit: number;
  page: number;
}

interface PokemonSprite {
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
    front_default: string;
  };
}

export interface PokemonCardProps {
  name: string;
  id: number;
  pokemon_v2_pokemonsprites: PokemonSprite[];
}

export interface AbilityEffectText {
  effect: string;
}

export interface Ability {
  name: string;
  pokemon_v2_abilityeffecttexts: AbilityEffectText[];
}

export interface PokemonAbility {
  id: number;
  ability_id: number;
  pokemon_v2_ability: Ability;
}

export interface PokemonForm {
  form_name: string;
  form_order: number;
  name: string;
  order: number;
  is_battle_only: boolean;
  is_mega: boolean;
}

export interface PokemonSprite {
  sprites: {
    other: {
      home: {
        front_shiny: string;
        front_female: string | null;
        front_default: string;
        front_shiny_female: string | null;
      };
      showdown: {
        back_shiny: string;
        back_female: string | null;
        front_shiny: string;
        back_default: string;
        front_female: string | null;
        front_default: string;
        back_shiny_female: string | null;
        front_shiny_female: string | null;
      };
      dream_world: {
        front_female: string | null;
        front_default: string;
      };
      "official-artwork": {
        front_shiny: string;
        front_default: string;
      };
    };
    versions: {
      [generation: string]: {
        [version: string]: {
          [format: string]: string | null;
        };
      };
    };
    back_shiny: string;
    back_female: string | null;
    front_shiny: string;
    back_default: string;
    front_female: string | null;
    front_default: string;
    back_shiny_female: string | null;
    front_shiny_female: string | null;
  };
}

export interface PokemonType {
  id: number;
  pokemon_id: number;
  pokemon_v2_type: {
    name: string;
    id: number;
  };
}

export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  pokemon_v2_growthrate: {
    name: string;
    formula: string;
    id: number;
    pokemon_v2_growthratedescriptions: {
      description: string;
      growth_rate_id: number;
      id: number;
    }[];
  };
  pokemon_v2_generation: {
    name: string;
  };
  name: string;
  is_mythical: boolean;
  pokemon_v2_pokemoncolor: {
    name: string;
  };
  pokemon_v2_pokemonshape: {
    name: string;
  };
  pokemon_v2_pokemonhabitat: {
    name: string;
  };
  forms_switchable: boolean;
  id: number;
  is_baby: boolean;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  pokemon_v2_stat: {
    name: string;
    id: number;
  };
}

export interface PokemonData {
  id: number;
  height: number;
  base_experience: number;
  name: string;
  order: number;
  weight: number;
  pokemon_v2_pokemonabilities: PokemonAbility[];
  pokemon_v2_pokemonforms: PokemonForm[];
  pokemon_v2_pokemonsprites: PokemonSprite[];
  pokemon_v2_pokemontypes: PokemonType[];
  pokemon_v2_pokemonspecy: PokemonSpecies;
  pokemon_v2_pokemonstats: PokemonStat[];
}
