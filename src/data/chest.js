import { batch } from 'react-redux'
import { handleAdvance } from '../reducers/lobby';
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
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'ADVANCE', playerId, tile: 0}] ]))
          }

          await dispatch(handleAdvance({tile: 0, playerId}))
        }
      }
    },
    {
      id: 1,
      text: 'Get out of Murphy Hall (Academic Probation) free. You may keep this card for whenever you need it (max 2 cards).', 
      effect: () => {
        return async (dispatch) => {
            dispatch({type: "GET_JAIL_CARD"})
        }
      }
    },
    {
      id: 2,
      text: 'Go to Murphy Hall (Academic Probation).', 
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'ADVANCE', playerId, tile: 0}] ]))
            socket.send(JSON.stringify(['game-events', [{type: 'GO_TO_JAIL_NO_MOVE', playerId}] ]))
          }
            
          await dispatch(handleAdvance({tile: 10, playerId}))
          dispatch({type: "GO_TO_JAIL_NO_MOVE", playerId})
        }
      }
    },
    {
      id: 3,
      text: 'USAC Fees refund. Add $20 to your Bruincard. ', 
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId, moneyChange: 20}] ]))
          }
          dispatch({type: "HANDLE_CHANGE_MONEY", playerId, money: 20})
        }
      }
    }, 
    {
      id: 4,
      text: 'You signed up for Winter Break stay-through. Pay $20 per any dorms you own.', 
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket
          const properties = getState().lobbyReducer.game.properties
          let dormCount = 0

          properties.forEach(p => {
            if(p.ownerId === playerId) dormCount += p.dormCount
          })

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId, moneyChange: -20 * dormCount}] ]))
          }
          dispatch({type: "HANDLE_CHANGE_MONEY", playerId, money: -20 * dormCount})
        }
      }
    },
    {
      id: 5,
      text: 'Bruinbill error in your favor. Gain $200.  ', 
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId, moneyChange: 200}] ]))
          }
          dispatch({type: "HANDLE_CHANGE_MONEY", playerId, money: 200})
        }
      }
    },
    {
      id: 6,
      text: 'It\'s Bruinbash night! Collect $20 from each player for seats.', 
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'ALL_TRANSFER_MONEY_TO', playerId, transferAmount: 20}] ]))
          }
          dispatch({type: "ALL_TRANSFER_MONEY_TO", playerId, transferAmount: 20})
        }
      }
    },
    {
      id: 7,
      text: 'You need tutoring. Pay $100.', 
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId, moneyChange: -100}] ]))
          }
          dispatch({type: "HANDLE_CHANGE_MONEY", playerId, money: -100})
        }
      }
    },
    {
      id: 8,
      text: 'You got written up by your RA, after a noise complaint. Pay $50.', 
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId, moneyChange: -50}] ]))
          }
          dispatch({type: "HANDLE_CHANGE_MONEY", playerId, money: -50})
        }
      }
    },
    {
      id: 9,
      text: 'You have no swipes left. Pay $5 to use your friend\'s 19P plan.', 
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId, moneyChange: -5}] ]))
          }
          dispatch({type: "HANDLE_CHANGE_MONEY", playerId, money: -5})
        }
      }
    },
    {
      id: 10,
      text: 'You donated blood at the UCLA Blood and Platelet Center. Collect $50.', 
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId, moneyChange: 50}] ]))
          }
          dispatch({type: "HANDLE_CHANGE_MONEY", playerId, money: 50})
        }
      }
    },
    {
      id: 11,
      text: 'You sold a swipe to Rendezvous to a naive freshman for $10. Collect $10.', 
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId, moneyChange: 10}] ]))
          }
          dispatch({type: "HANDLE_CHANGE_MONEY", playerId, money: 10})
        }
      }
    },
    {
      id: 12,
      text: 'You forgot to waive UCShip. Pay $50.', 
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId, moneyChange: -50}] ]))
          }
          dispatch({type: "HANDLE_CHANGE_MONEY", playerId, money: -50})
        }
      }
    },
  
  ];
  
export default CHEST;
  