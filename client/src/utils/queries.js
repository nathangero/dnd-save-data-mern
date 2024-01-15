import { gql } from "@apollo/client";

export const CHECK_USER = gql`
query CheckUser($username: String!) {
  checkUser(username: $username) {
    _id
    username
  }
}
`;

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
        max
        temp
      }
      inspiration
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
        level_1 {
          _id
          current
          max
        }
        level_2 {
          _id
          current
          max
        }
        level_3 {
          _id
          current
          max
        }
        level_4 {
          _id
          current
          max
        }
        level_5 {
          _id
          current
          max
        }
        level_6 {
          _id
          current
          max
        }
        level_7 {
          _id
          current
          max
        }
        level_8 {
          _id
          current
          max
        }
        level_9 {
          _id
          current
          max
        }
      }
      spells {
        _id
        cantrips {
          _id
          castingTime
          description
          duration
          durationType
          name
          range
        }
        level_1 {
          _id
          castingTime
          description
          duration
          durationType
          name
          range
        }
        level_2 {
          _id
          castingTime
          description
          duration
          durationType
          name
          range
        }
        level_3 {
          _id
          castingTime
          description
          duration
          durationType
          name
          range
        }
        level_4 {
          _id
          castingTime
          description
          duration
          durationType
          name
          range
        }
        level_5 {
          _id
          castingTime
          description
          duration
          durationType
          name
          range
        }
        level_6 {
          _id
          castingTime
          description
          duration
          durationType
          name
          range
        }
        level_7 {
          _id
          castingTime
          description
          duration
          durationType
          name
          range
        }
        level_8 {
          _id
          castingTime
          description
          duration
          durationType
          name
          range
        }
        level_9 {
          _id
          castingTime
          description
          duration
          durationType
          name
          range
        }
      }
      timeCreated
      treasures {
        _id
        amount
        description
        name
      }
      weapons {
        _id
        amount
        attackDamageStat
        category
        description
        dieType
        name
        proficient
      }
    }
  }
}
`;