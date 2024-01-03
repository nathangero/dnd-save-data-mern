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
        amount
        description
        name
      }
      featureTraits {
        _id
        actionType
        description
        name
        traitType
        uses
      }
      gold
      hp {
        _id
        current
        dieType
        dieAmountCurrent
        dieAmountMax
        max
        temp
      }
      inspriation
      languages {
        _id
        name
        proficiency
      }
      level
      name
      proficiencies {
        _id
        description
        name
      }
      race
      savingThrows {
        _id
        cha
        con
        dex
        int
        str
        wis
      }
      scores {
        _id
        cha
        con
        dex
        int
        str
        wis
      }
      skills {
        _id
        acrobatics
        animalHandling
        arcana
        athletics
        deception
        history
        insight
        intimidation
        investigation
        medicine
        nature
        perception
        performance
        persuasion
        religion
        sleightOfHand
        stealth
        survival
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

export const CHECK_USER = gql`
query CheckUser($username: String!) {
  checkUser(username: $username) {
    _id
    username
  }
}
`;