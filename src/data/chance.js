import { handleAdvance, handleCardDraw, handleFees, handleMoveBackwards } from '../reducers/lobby';
import {TileType, TILES} from '../config'

const CHANCE = [
    {
      id: 0,
      text: 'Gene wants to see you. Advance to Bruinwalk.',
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket
          const player = getState().lobbyReducer.game.players.find(p => p._id === playerId)

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'ADVANCE', playerId, tile: 0, startTile: player.currentTile}] ]))
          }

          await dispatch(handleAdvance({tile: 0, playerId, startTile: player.currentTile}))
        }
      }
    },
    {
      id: 1,
      text: "You're hungry. Advance to Royce or Powell. If owned by someone else, pay 10 times the amount rolled you just rolled",
      effect: (playerId, movement) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket
          const player = getState().lobbyReducer.game.players.find(p => p._id === playerId)
          const utilityDestination = (player.currentTile <= 28 && player.currentTile > 12) ? 28 : 12;

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'ADVANCE', playerId, tile: utilityDestination, startTile: player.currentTile}] ]))
          }

          await dispatch(handleAdvance({tile: utilityDestination, playerId, startTile: player.currentTile}))
          dispatch({type: "PROPERTY_DECISION", id: utilityDestination, movement, utilityPayMax: true})
        }
      }
    },
    {
      id: 2,
      text: "It's time to see some art! Advance to the Fowler Museum.",
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket
          const player = getState().lobbyReducer.game.players.find(p => p._id === playerId)

          if(socket !== null)
            socket.send(JSON.stringify(['game-events', [{type: 'ADVANCE', playerId, tile: 39, startTile: player.currentTile}] ]))

          await dispatch(handleAdvance({tile: 39, playerId, startTile: player.currentTile}))

          // Movement: 0 is ok as destination is not a utility, dice roll not important
          dispatch({type: "PROPERTY_DECISION", id: 39, movement: 0})
        }
      }
    },
    {
      id: 3,
      text: "You've got a final coming up. Advance to YRL.",
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket
          const player = getState().lobbyReducer.game.players.find(p => p._id === playerId)

          if(socket !== null)
            socket.send(JSON.stringify(['game-events', [{type: 'ADVANCE', playerId, tile: 34, startTile: player.currentTile}] ]))

          await dispatch(handleAdvance({tile: 34, playerId, startTile: player.currentTile}))

          // Movement: 0 is ok as destination is not a utility, dice roll not important
          dispatch({type: "PROPERTY_DECISION", id: 34, movement: 0})
        }
      }
    },
    {
      id: 4,
      text: 'You want some new UCLA merch! Advance to Ackerman.',
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket
          const player = getState().lobbyReducer.game.players.find(p => p._id === playerId)

          if(socket !== null)
            socket.send(JSON.stringify(['game-events', [{type: 'ADVANCE', playerId, tile: 21, startTile: player.currentTile}] ]))

          await dispatch(handleAdvance({tile: 21, playerId, startTile: player.currentTile}))

          // Movement: 0 is ok as destination is not a utility, dice roll not important
          dispatch({type: "PROPERTY_DECISION", id: 21, movement: 0})
        }
      }
    },
    {
      id: 5,
      text: 'Go to Academic Probation. Go directly to Academic Probation. Do not pass Bruinwalk, do not collect $200.',
      effect: (playerId) => {
        return async (dispatch) => {
          dispatch({type: "GO_TO_JAIL", id: playerId, tellServer: true})
        }
      }
    },
    {
      id: 6,
      text: 'Textbook fees: pay $100.',
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
      id: 7,
      text: 'Go back three spaces.',
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket
          const player = getState().lobbyReducer.game.players.find(p => p._id === playerId)
          const backThree = player.currentTile > 3 ? player.currentTile - 3 : (37 + player.currentTile)

          if(socket !== null)
            socket.send(JSON.stringify(['game-events', [{type: 'MOVE_BACKWARDS', playerId, tile: backThree, startTile: player.currentTile}] ]))

          await dispatch(handleMoveBackwards({tile: backThree, playerId, startTile: player.currentTile}))

          if(TILES[backThree].type === TileType.PROPERTY){
            dispatch({type: 'PROPERTY_DECISION', id: backThree, movement: 0})
          } else if(TILES[backThree].type === TileType.CHANCE){
              dispatch(handleCardDraw("CHANCE", playerId))
          } else if(TILES[backThree].type === TileType.CHEST){
              dispatch(handleCardDraw("CHEST", playerId))
          } else if(TILES[backThree].type === TileType.FEES){
              dispatch(handleFees({id: playerId}))
          }
        }
      }
    },
    {
      id: 8,
      text: "You're stopped by Andre on Bruinwalk. You're feeling generous and give him some money. Pay $10.",
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId, moneyChange: -10}] ]))
          }
          dispatch({type: "HANDLE_CHANGE_MONEY", playerId, money: -10})
        }
      }
    },
    {
      id: 9,
      text: "You just failed a final. Pay $50 for all the food and drink you're going to need to drown your sorrows.",
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
      id: 10,
      text: "You contracted food poisoning after eating a salad at Covel. Pay $50 because you don't have UCSHIP.",
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
      id: 11,
      text: "You lost your BruinCard. Pay $25 for a replacement.",
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId, moneyChange: -25}] ]))
          }
          dispatch({type: "HANDLE_CHANGE_MONEY", playerId, money: -25})
        }
      }
    },
    {
      id: 12,
      text: "Your clothes were destroyed by a washing machine. Pay $50.",
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
      id: 13,
      text: "You get lost in Boelter Hall and ending up sleeping in a hallway. When you wake up, your wallet is gone. Lose $20.",
      effect: (playerId) => {
        return async (dispatch, getState) => {
          const socket = getState().lobbyReducer.socket

          if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId, moneyChange: -20}] ]))
          }
          dispatch({type: "HANDLE_CHANGE_MONEY", playerId, money: -20})
        }
      }
    }
  ];
  
export default CHANCE;
  