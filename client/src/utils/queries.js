import { gql } from "@apollo/client";

export const GET_ME = gql`
query GetMe {
  getMe {
    _id
    username
    characters {
      _id
      alignment
      armor
      background
      class
      deathSaves {
        _id
        failures
        successes
      }
      equipment {
        _id
      }
      featureTraits {
        _id
      }
      gold
      hp {
        _id
      }
      inspriation
      languages {
        _id
      }
      level
      name
      proficiencies {
        _id
      }
      race
      savingThrows {
        _id
      }
      scores {
        _id
      }
      skills {
        _id
      }
      speed
      spellCastStat
      spellSlots {
        _id
      }
      spells {
        _id
      }
      timeCreated
      treasures {
        _id
      }
      weapons {
        _id
      }
    }
  }
}
`;