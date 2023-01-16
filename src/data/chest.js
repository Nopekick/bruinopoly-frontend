/**
 * interface ChestCard {
 *   id: number
 *   text: string
 *   action: (state: GameState, playerId: PlayerId) => void
 * }
 */
const CHEST = [
    {
      id: 0,
      text: 'Advance to Bruinwalk and add $200 to your Bruincard.', 
      getEvents: (player, room) => {
        return [
          {
            type: 'ADVANCE',
            playerId: player._id,
            tile: 0,
          },
          {
            type: 'CHANGE_MONEY',
            playerId: player._id,
            moneyChange: 200,
          }
        ]
      }
    },
    //skipping for now 
    {
      id: 1,
      text: 'Get out of Murphy Hall (Academic Probation) free. You may keep this card for whenever you need it. ', 
      getEvents: (player, room) => {
        return [
          {
            type: 'ADVANCE',
            playerId: player._id,
            tile: 0,
          },
          {
            type: 'CHANGE_MONEY',
            playerId: player._id,
            moneyChange: 200,
          }
        ]
  
      }
    },
    {
      id: 2,
      text: 'Go to Murphy Hall (Academic Probation).', 
      getEvents: (player, room) => {
        return [
          {
            type: 'GO_TO_JAIL',
            playerId: player._id,
          }
        ]
      }
    },
    {
      id: 3,
      text: 'USAC Fees refund. Add $20 to your Bruincard. ', 
      getEvents: (player, room) => {
        return [
          {
            type: 'CHANGE_MONEY',
            playerId: player._id,
            moneyChange: 20
          }
        ]
      }
    },
    //ignored for now because no houses implemented yet 
    {
      id: 4,
      text: 'You signed up for Winter Break stay-through. Pay $50 per any dorms you own.', 
      getEvents: (player, room) => {
        //loop through to find all dorms that are owned by the student
  
        return [
          {
            type: 'CHANGE_MONEY',
            playerId: player._id,
            moneyChange: 20
          }
        ]
      }
    },
    {
      id: 5,
      text: 'Bruinbill error in your favor. Gain $200.  ', 
      getEvents: (player, room) => {
        return [
          {
            type: 'CHANGE_MONEY',
            playerId: player._id,
            moneyChange: 200
          }
        ]
      }
    },
    {
      id: 6,
      text: 'It\'s Bruinbash night! Collect $20 from each player for seats.', 
      getEvents: (player, room) => {
        let res = []
        for (const p of room.players) {
          if (p._id !== player._id) {
            res.push(
              {
                type: 'TRANSFER_MONEY',
                playerId: player._id,
                recipientId: p._id,
                moneyChange: 20
              }
            )
          }
        }
        return res;
      }
    },
    {
      id: 7,
      text: 'You need tutoring. Pay $100.', 
      getEvents: (player, room) => {
        return [
          {
            type: 'CHANGE_MONEY',
            playerId: player._id,
            moneyChange: -100
          }
        ]
      }
    },
    {
      id: 8,
      text: 'You got written up by your RA, after a noise complaint. Pay $50.', 
      getEvents: (player, room) => {
        return [
          {
            type: 'CHANGE_MONEY',
            playerId: player._id,
            moneyChange: -50
          }
        ]
      }
    },
    {
      id: 9,
      text: 'You have no swipes left. Pay $5 to use your friend\'s 19P plan.', 
      getEvents: (player, room) => {
        return [
          {
            type: 'CHANGE_MONEY',
            playerId: player._id,
            moneyChange: -5
          }
        ]
      }
    },
    {
      id: 10,
      text: 'You donated blood at the UCLA Blood and Platelet Center. Collect $50.', 
      getEvents: (player, room) => {
        return [
          {
            type: 'CHANGE_MONEY',
            playerId: player._id,
            moneyChange: -50
          }
        ]
      }
    },
    {
      id: 11,
      text: 'You sold a swipe to Rendezvous to a naive freshman for $10. Collect $10.', 
      getEvents: (player, room) => {
        return [
          {
            type: 'CHANGE_MONEY',
            playerId: player._id,
            moneyChange: 10
          }
        ]
      }
    },
    {
      id: 12,
      text: 'You forgot to waive UCShip. Pay $50.', 
      getEvents: (player, room) => {
        return [
          {
            type: 'CHANGE_MONEY',
            playerId: player._id,
            moneyChange: -50
          }
        ]
      }
    },
  
  ];
  
export default CHEST;
  