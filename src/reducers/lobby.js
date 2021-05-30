import axios from 'axios';
import { ar } from 'date-fns/locale';
//import Cookies from 'universal-cookie';
import {API_URL, SOCKET_URL, sleep, PROPERTIES, TileType, TILES} from '../config';

//const cookies = new Cookies();

const SET_USER_INFO = "SET_USER_INFO"

const SET_ROOMS_LIST = "SET_ROOMS_LIST"
const ADD_NEW_ROOM = "ADD_NEW_ROOM"
const JOIN_ROOM = "JOIN_ROOM"
const LEAVE_ROOM = "LEAVE_ROOM"

const LOBBY_ERROR = "LOBBY_ERROR"
const JOIN_ROOM_ERROR = "JOIN_ROOM_ERROR"
const CREATE_ROOM_ERROR = "CREATE_ROOMS_ERROR"

const REQUEST_START = "REQUEST_START"
const START_GAME = "START_GAME"
const START_TURN = "START_TURN"
const END_TURN = "END_TURN"
const SET_HOST = "SET_HOST"
const UPDATE_PLAYERS = "UPDATE_PLAYERS"
const ADD_MESSAGE = "ADD_MESSAGE"
const SET_SOCKET = "SET_SOCKET"

const MOVE_ONE = "MOVE_ONE"
const MOVEMENT = "MOVEMENT"
const GO_TO_JAIL = "GO_TO_JAIL"
const LEAVE_JAIL = "LEAVE_JAIL"
const PROPERTY_DECISION = "PROPERTY_DECISION"
const CLOSE_PROPERTY = "CLOSE_PROPERTY"
const ATTEMPT_BUY = "ATTEMPT_BUY"
const HANDLE_CHANGE_MONEY = "HANDLE_CHANGE_MONEY"

const OPEN_TRADE = "OPEN_TRADE"
const CANCEL_TRADE = "CANCEL_TRADE"
const OFFER_TRADE = "OFFER_TRADE"
const RECEIVE_TRADE = "RECEIVE_TRADE"
const ACCEPT_TRADE = "ACCEPT_TRADE"
const HANDLE_ACCEPT_TRADE = "HANDLE_ACCEPT_TRADE"

const OPEN_BUY_DORM = "OPEN_BUY_DORM"
const OPEN_SELL_DORM = "OPEN_SELL_DORM"
const CLOSE_DORM = "CLOSE_DORM"
const BUY_DORM = "BUY_DORM"
const SELL_DORM = "SELL_DORM"

const OPEN_MORTGAGE = "OPEN_MORTGAGE"
const CLOSE_MORTGAGE = "CLOSE_MORTGAGE"
const MORTGAGE = "MORTGAGE"

const HIDE_DICE = "HIDE_DICE"
const DOUBLES = "DOUBLES"
const DRAW_CHANCE = "DRAW_CHANCE"
const DRAW_CHEST = "DRAW_CHEST"
const CLOSE_CARDS = "CLOSE_CARDS"

//actions types to handle game-events from server
const ADD_PROPERTY = "ADD_PROPERTY"
const PAY_FEES = "PAY_FEES"

//FOR TESTING
const BUY_ALL_PROPERTIES = "BUY_ALL_PROPERTIES"



const initialState = {
    userInfo: null,
    redirectTo: null,
    rooms: null,
    socket: null,
    lobbyError: null,
    joinRoomError: null,
    createRoomError: null,
    players: null,
    gameID: null,
    isHost: false,
    game: null,
    yourTurn: false,
    token: null,
    messages: [],
    tradePopup: null,
    propertyPopup: null,
    salePopup: null,
    chancePopup: null,
    chestPopup: null,
    mortgagePopup: null,
    doubles: null
}

export function lobbyReducer(state = initialState, action) {
    switch (action.type) {
        case BUY_ALL_PROPERTIES:
            if(state.yourTurn === false) return
            let arr = [6,8,9]

            if(state.socket !== null){
                state.socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId: state.userInfo.id, moneyChange: 10000}] ]))
                arr.forEach(async (num)=>{
                    await sleep(.5)
                    state.socket.send(JSON.stringify(['game-events', [{type: 'PURCHASE_PROPERTY', playerId: state.userInfo.id, propertyId: num}]]))
                })
            }      
           //["1", "3", "5", "6", "8", "9", "11", "12", "13", "14", "15", "16", "18", "19", "21", "23", "24", "25", "26", "27", "28", "29", "31", "33", "34", "35", "37", "39"]
            return {...state, game: {...state.game, players: state.game.players.map((p)=>{
                if(p._id === state.userInfo.id){
                    return {...p, money: 100000, propertiesOwned: arr}
                } else {
                    return p
                }
            }), properties: state.game.properties.map((p,i)=>{
                if(arr.includes(i)){
                    return {...p, ownerId: state.userInfo.id}
                } else {
                    return p
                }
            })} }
        case HANDLE_CHANGE_MONEY:
            return {...state, game: {...state.game, players: state.game.players.map((p)=>{
                if(p._id == action.playerId){
                    return {...p, money: p.money + action.money}
                }
                return p
            })}}
        case SET_USER_INFO:
            return {...state, userInfo: action.userObj, redirectTo: "/"}
        case SET_ROOMS_LIST:
            return {...state, rooms: action.rooms}
        case LOBBY_ERROR:
            return {...state, lobbyError: action.error}
        case JOIN_ROOM_ERROR:
            if(state.socket !== null && typeof state.socket.close !== "undefined")
                state.socket.close()
            return {...state, joinRoomError: action.error, gameID: null, game: null, players: null, socket: null}
        case CREATE_ROOM_ERROR:
            alert("Room could not be created. Something went wrong.")
            return {...state, createRoomError: action.error}
        case ADD_NEW_ROOM:
            return {...state, rooms: [...state.rooms, action.room], token: action.token}
        case JOIN_ROOM:
            let playerId = null; 
            action.room.players.forEach((player)=> { 
                if(player.name === state.userInfo.name)
                    playerId = player._id
            })

            return {...state, tradePopup: null, doubles: null, gameID: action.id, game: action.room, lobbyError: null, joinRoomError: null, 
                createRoomError: null, userInfo: {...state.userInfo, id: playerId}}
        case LEAVE_ROOM:
            if(state.socket !== null && typeof state.socket.close !== "undefined")
                state.socket.close()
            //SHOULD TOKEN BECOME NULL UPON LEAVING ROOM? MAYBE CHANGE LATER
            return {...state, gameID: null, yourTurn: false, isHost: false, messages: [], players: null, game: null, socket: null, doubles: null, 
                 chancePopup: null, chestPopup: null, salePopup: null, tradePopup: null, propertyPopup: null, token: null}
        case UPDATE_PLAYERS:
            return {...state, players: action.players}
        case ADD_MESSAGE:
            if(state.socket !== null && action.send){
                //console.log(state.socket)
                state.socket.send(JSON.stringify(['message', action.message]))
            }
            return {...state, messages: [...state.messages, action.message]}
        case REQUEST_START: 
            if(state.socket !== null)
                state.socket.send(JSON.stringify(['request-start']))
            return {...state}
        case SET_SOCKET:
            return {...state, socket: action.socket}
        case SET_HOST: 
            return {...state, isHost: true}
        case START_GAME:
            return {...state, game: action.game}
        case START_TURN:
            return {...state, yourTurn: true}
        case END_TURN:
            if(state.socket !== null)
                state.socket.send(JSON.stringify(['game-events', [{type: 'END_TURN'}]]))

            return {...state, yourTurn: false}
        case MOVE_ONE:
            let p1 = state.game.players.filter(p => p._id === action.id)[0]

            if(p1.turnsInJail === 0)
                return {...state, game: {...state.game, players: state.game.players.map((player)=>{
                    if(player._id !== action.id) return player
                    else if((player.currentTile + 1)%40 === 0) return {...player, currentTile: (player.currentTile + 1)%40, money: player.money + 200}
                    else return {...player, currentTile: (player.currentTile + 1)%40}
                })}}

            return {...state}
        case MOVEMENT:
            let p2 = state.game.players.filter(p => p._id === state.userInfo.id)[0]

            //only send movement if not in jail, or in jail with doubles
            if(p2.turnsInJail === 0 || (p2.turnsInJail !== 0 && action.doubles === true) && state.socket !== null){
                state.socket.send(JSON.stringify(['game-events', [{type: 'MOVEMENT', playerId: state.userInfo.id, numTiles: action.movement}] ]))
            }

            //if player is in jail, reduce jail turn count, or free them if doubles
            if(p2.turnsInJail !== 0 && action.doubles === true){
                return {...state, game: {...state.game, players: state.game.players.map((player)=>{
                    if(player._id !== state.userInfo.id) return player
                    return {...player, turnsInJail: 0}
                })}}
            } else if(p2.turnsInJail !== 0  && action.doubles === false){
                return {...state, game: {...state.game, players: state.game.players.map((p)=>{
                    if(p._id !== state.userInfo.id) return p
                    return {...p, turnsInJail: p.turnsInJail - 1}
                })}}
            } else if(action.doubles === false){
                return {...state, doubles: null}
            }

            return {...state}
        case GO_TO_JAIL:
            if(state.socket !== null && action.tellServer === true){
                state.socket.send(JSON.stringify(['game-events', [{type: 'GO_TO_JAIL', playerId: action.id}] ]))
            }
        
            return {...state, game: {...state.game, players: state.game.players.map((player)=>{
                if(player._id !== action.id) return player
                else return {...player, currentTile: 10, turnsInJail: 3}
            })}} 
        case OPEN_TRADE:
            if(state.game.players.length > 1 && state.yourTurn === true)
                return {...state, tradePopup: {receive: false}}
            else return {...state}
        case OFFER_TRADE:
            if(state.socket !== null)
                state.socket.send(JSON.stringify(['game-events', [{type: 'OFFER_TRADE', ...action.obj}]]))
            return {...state}
        case ACCEPT_TRADE:
            let tempTradeObj = {...state.tradePopup}
            delete tempTradeObj.type
            if(state.socket !== null)
                state.socket.send(JSON.stringify(['game-events', [{type: 'ACCEPT_TRADE', ...tempTradeObj}]]))
            //return {...state, tradePopup: null}

            return {...state, tradePopup: null, game: {...state.game, properties: state.game.properties.map((p,i) => {
                if(tempTradeObj.propertiesOutgoing.includes(i)){
                    return {...p, ownerId: tempTradeObj.receivingPlayerId}
                } else if(tempTradeObj.propertiesIncoming.includes(i)){
                    return {...p, ownerId: tempTradeObj.playerId}
                } else {
                    return p;
                }
            }), players: state.game.players.map((p) => {
                //remove/add necessary properties
                let tempP;
                if(p._id === tempTradeObj.playerId){
                    tempP = Object.assign({}, p);
                    tempP.money -= tempTradeObj.moneyOutgoing;
                    tempP.money += tempTradeObj.moneyIncoming; 

                    tempP.propertiesOwned = tempP.propertiesOwned.filter((po)=>{
                        return !tempTradeObj.propertiesOutgoing.includes(po)
                    })
                    tempP.propertiesOwned = [...tempP.propertiesOwned, ...tempTradeObj.propertiesIncoming]

                    return tempP;
                } else if(p._id === tempTradeObj.receivingPlayerId){
                    tempP = Object.assign({}, p);
                    tempP.money += tempTradeObj.moneyOutgoing;
                    tempP.money -= tempTradeObj.moneyIncoming; 

                    tempP.propertiesOwned = tempP.propertiesOwned.filter((po)=>{
                        return !tempTradeObj.propertiesIncoming.includes(po)
                    })
                    tempP.propertiesOwned = [...tempP.propertiesOwned, ...tempTradeObj.propertiesOutgoing]

                    return tempP;
                } else {
                    return p;
                }
            })}}
            
        case HANDLE_ACCEPT_TRADE:
            console.log("HANDLE_ACCEPT_TRADE:", action.obj)
                /* {
                playerId: ...
                receivingPlayerId: ...
                propertiesOutgoing: [] 
                propertiesIncoming: []
                moneyOutgoing: ...
                moneyIncoming: ...
            } */  
            return {...state, tradePopup: null, game: {...state.game, properties: state.game.properties.map((p,i) => {
                if(action.obj.propertiesOutgoing.includes(i)){
                    return {...p, ownerId: action.obj.receivingPlayerId}
                } else if(action.obj.propertiesIncoming.includes(i)){
                    return {...p, ownerId: action.obj.playerId}
                } else {
                    return p;
                }
            }), players: state.game.players.map((p) => {
                //remove/add necessary properties
                let tempP;
                if(p._id === action.obj.playerId){
                    tempP = Object.assign({}, p);
                    tempP.money -= action.obj.moneyOutgoing;
                    tempP.money += action.obj.moneyIncoming; 

                    tempP.propertiesOwned = tempP.propertiesOwned.filter((po)=>{
                        return !action.obj.propertiesOutgoing.includes(po)
                    })
                    tempP.propertiesOwned = [...tempP.propertiesOwned, ...action.obj.propertiesIncoming]

                    return tempP;
                } else if(p._id === action.obj.receivingPlayerId){
                    tempP = Object.assign({}, p);
                    tempP.money += action.obj.moneyOutgoing;
                    tempP.money -= action.obj.moneyIncoming; 

                    tempP.propertiesOwned = tempP.propertiesOwned.filter((po)=>{
                        return !action.obj.propertiesIncoming.includes(po)
                    })
                    tempP.propertiesOwned = [...tempP.propertiesOwned, ...action.obj.propertiesOutgoing]

                    return tempP;
                } else {
                    return p;
                }
            })}}
        case RECEIVE_TRADE:
            //console.log("RECEIVING TRADE OFFER: ", action.obj)
            return {...state, tradePopup: {receive: true, ...action.obj}}
        case CANCEL_TRADE: 
            return {...state, tradePopup: null}
        case PROPERTY_DECISION:
            let p3 = state.game.players.filter(p => p._id === state.userInfo.id)[0]
            let owner = state.game.properties[action.id].ownerId

            if(p3.turnsInJail !== 0) return {...state}

            if(owner === state.userInfo.id){
                //DO NOTHING
                return {...state}
            } else if (owner === null){
                //CAN POTENTIALLY BUY
                return {...state, salePopup: action.id}
            } else if(owner !== state.userInfo.id && action.justOpening !== true) {
                //PAY RENT  (ADD BANKRUPTY CHECK LATER)
                //TODO: calculate rent for railroad and utility
                let property = PROPERTIES[action.id]

                if(state.socket !== null){
                    state.socket.send(JSON.stringify(['game-events', [{type: 'RENT', playerId: state.userInfo.id, propertyOwner: owner, propertyId: action.id}]]))
                }
            
                return {...state, game: {...state.game, players: state.game.players.map((p)=>{
                    if(p._id === state.userInfo.id) 
                        return {...p, money: p.money - property.rent}
                    else if(p._id === owner) 
                        return {...p, money: p.money + property.rent}
                    else 
                        return p
                })}}
            }
        case CLOSE_PROPERTY:
            return {...state, salePopup: null}
        case ATTEMPT_BUY:
            let player = state.game.players.filter(p => p._id === state.userInfo.id)[0]

            if(player.money >= action.property.price){
                //CAN BUY: DECREASE MONEY, ADD PROPERTY TO USER'S PROPERTIES, NOTIFY SERVER
                if(state.socket !== null)
                    state.socket.send(JSON.stringify(['game-events', [{type: 'PURCHASE_PROPERTY', playerId: state.userInfo.id, propertyId: action.property.id}]]))

                let temp_properties = [...state.game.properties]
                temp_properties[action.property.id] = {...state.game.properties[action.property.id], ownerId: state.userInfo.id}
                
                return {...state, game: {...state.game, 
                    properties: temp_properties, 
                    players: state.game.players.map((p)=>{
                        if(p._id !== state.userInfo.id) return p
                        return {...p, 
                            money: p.money - action.property.price, 
                            propertiesOwned: [...p.propertiesOwned, action.property.id]
                        }
                    })}}
            } else {
                return {...state}
            }
        case DRAW_CHANCE:
            let p4 = state.game.players.filter(p => p._id === state.userInfo.id)[0]
            if(p4.turnsInJail !== 0) return {...state}

            if(state.socket !== null)
                state.socket.send(JSON.stringify(['game-events', [{type: 'CARD_DRAW', deck: "COMMUNITY_CHEST", playerId: state.userInfo.id, cardIndex: state.game.chanceDeck.currentCardIndex}] ]))

            return {...state, chancePopup: state.game.chanceDeck.currentCardIndex, 
                game: {...state.game, chanceDeck: {...state.game.chanceDeck, currentCardIndex: (state.game.chanceDeck.currentCardIndex + 1)%14}}}
        case DRAW_CHEST:
            let p5 = state.game.players.filter(p => p._id === state.userInfo.id)[0]
            if(p5.turnsInJail !== 0) return {...state}

            if(state.socket !== null)
                state.socket.send(JSON.stringify(['game-events', [{type: 'CARD_DRAW', deck: "COMMUNITY_CHEST", playerId: state.userInfo.id, cardIndex: state.game.communityChestDeck.currentCardIndex}] ]))

            return {...state, chestPopup: state.game.communityChestDeck.currentCardIndex, 
                game: {...state.game, communityChestDeck: {...state.game.communityChestDeck, currentCardIndex: (state.game.communityChestDeck.currentCardIndex + 1)%13}}}
        case CLOSE_CARDS:
            if(state.doubles === null)
                return {...state, chancePopup: null, chestPopup: null}
            else 
                return {...state, chancePopup: null, chestPopup: null, doubles: {...state.doubles, show: false}}
        case DOUBLES:
            if(state.doubles === null){
                return {...state, yourTurn: true, doubles: {show: true, number: 1}}
            } else if(state.doubles.number === 2){
                if(state.socket !== null && action.tellServer === true){
                    state.socket.send(JSON.stringify(['game-events', [{type: 'GO_TO_JAIL', playerId: action.id}] ]))
                }
            
                return {...state, yourTurn: false, doubles: {show: true, number: 3}, game: {...state.game, players: state.game.players.map((player)=>{
                    if(player._id !== state.userInfo.id) return player
                    else return {...player, currentTile: 10, turnsInJail: 3}
                })}} 
            } else {
                return {...state, yourTurn: true, doubles: {show: true, number: 2}}
            }
        case HIDE_DICE:
            return {...state, yourTurn: false}
        case ADD_PROPERTY:
            let temp =[...state.game.properties]
            temp[action.property.id] = {...state.game.properties[action.property.id], ownerId: action.playerId}
            
            return {...state, game: {...state.game, 
                properties: temp, 
                players: state.game.players.map((p)=>{
                    if(p._id !== action.playerId) return p
                    return {...p, 
                        money: p.money - action.property.price, 
                        propertiesOwned: [...p.propertiesOwned, action.property.id]
                    }
                })}}
        case PAY_FEES:
            if(state.socket !== null)
                state.socket.send(JSON.stringify(['game-events', [{type: 'CHANGE_MONEY', playerId: action.id, moneyChange: -200}] ]))

            return {...state, game: {...state.game, players: state.game.players.map((p)=>{
                if(p._id !== action.id) return p
                else return {...p, money: p.money - 200}
            })}}
        case OPEN_MORTGAGE:
            if(state.yourTurn === true)
                return {...state, mortgagePopup: {}}
            return {...state}
        case CLOSE_MORTGAGE:
            if(state.yourTurn === true)
                return {...state, mortgagePopup: null}
            return {...state}
        case MORTGAGE:
            //TODO: contact server
            if(action.actionType === "MORTGAGE"){
                return {...state, game: {...state.game, properties: state.game.properties.map((p,i)=>{
                    if(i === action.propertyNum)
                        return {...p, isMortgaged: true}
                    else    
                        return p
                }), players: state.game.players.map((p)=>{
                    if(p._id === action.playerId)
                        return {...p, money: p.money + PROPERTIES[action.propertyNum].mortgage}
                })}}
            } else if(action.actionType === "LIFT MORTGAGE"){
                return {...state, game: {...state.game, properties: state.game.properties.map((p,i)=>{
                    if(i === action.propertyNum)
                        return {...p, isMortgaged: false}
                    else    
                        return p
                }), players: state.game.players.map((p)=>{
                    if(p._id === action.playerId)
                        return {...p, money: p.money - (PROPERTIES[action.propertyNum].mortgage * 1.1)}
                })}}
            } else  
                return state
        case OPEN_BUY_DORM:
            if(state.yourTurn === true)
                return {...state, propertyPopup: {buy: true, sell: false}}
            return {...state}
        case OPEN_SELL_DORM:
            if(state.yourTurn === true)
                return {...state, propertyPopup: {buy: false, sell: true}}
            return {...state}
        case CLOSE_DORM:
            return {...state, propertyPopup: null}
        case BUY_DORM:
            if(action.send === true && state.yourTurn === false)
                return

            //TODO: maybe add additional checks for purchase
            if(state.socket !== null && action.send === true)
                state.socket.send(JSON.stringify(['game-events', [{type: 'PURCHASE_DORM',propertyId: action.propertyId, playerId: action.playerId}] ]))

            return {...state, game: {...state.game, players: state.game.players.map((p)=>{
                if(p._id === action.playerId)
                    return {...p, money: p.money - PROPERTIES[action.propertyId].dormCost}
                else    
                    return p
            }), properties: state.game.properties.map((p, i)=>{
                if(i === action.propertyId)
                    return {...p, dormCount: p.dormCount + 1}
                else
                    return p
            })}}
        case SELL_DORM:
            if(action.send === true && state.yourTurn === false)
                return

            //TODO: maybe add additional checks for sale
            if(state.socket !== null && action.send === true)
                state.socket.send(JSON.stringify(['game-events', [{type: 'SELL_DORM',propertyId: action.propertyId, playerId: action.playerId}] ]))
            
            return {...state, game: {...state.game, players: state.game.players.map((p)=>{
                if(p._id === action.playerId)
                    return {...p, money: p.money + PROPERTIES[action.propertyId].dormCost / 2}
                else    
                    return p
            }), properties: state.game.properties.map((p, i)=>{
                
                if(i === action.propertyId)
                    return {...p, dormCount: p.dormCount - 1}
                else
                    return p
            })}}
        default:
            return state;
    }
}

export const joinRoom = ({id, name, password, token}) => async (dispatch) => {
    console.log(id, name, password)
    let socket = new WebSocket(`ws://${SOCKET_URL}?room_id=${id}&name=${name}&password=${password}&token=${token}`);
    
    dispatch({type: SET_SOCKET, socket})

    socket.addEventListener('open', function (event) {
        console.log("open event")
    });

    socket.addEventListener('error', function (event) {
        console.log("Error event")
    });

    socket.addEventListener('message', function(event) {
        let data = JSON.parse(event.data)
        console.log('Message from server ', data);

        switch(data[0]){
            case 'join-error':
                dispatch({type: JOIN_ROOM_ERROR, error: data[1].message})
                break;
            case 'playerlist':
                dispatch({type: UPDATE_PLAYERS, players: data[1].message})
                break;
            case 'join':    
                dispatch({type: JOIN_ROOM, id, room: data[1].roomData})
                break;
            case 'message':
                console.log(data[1])
                dispatch({type: ADD_MESSAGE, message: data[1], send: false})
                break;
            case 'host':
                dispatch({type: SET_HOST})
                break;
            case 'can-start':
                dispatch({type: START_GAME, game: data[1].game})
                break;
            case 'game-over':
                console.log("The winner has id:",data[1].winner)
                //dispatch event to close socket connection, display winner popup with button to leave game
                break;
            case 'your-turn':
                dispatch({type: START_TURN})
                break;
            case 'offered-trade':
                let temp = Object.assign({}, data[1])
                console.log("IN BREAK, RECEIVING TRADE OFFER: ", temp)
                dispatch({type: RECEIVE_TRADE, obj: {...data[1]} })
                break;
            case 'game-events':
                console.log(data[1][0])
                let event = data[1][0]
                switch(event.type){
                    case "PURCHASE_DORM":
                        dispatch({type: BUY_DORM, send: false, propertyId: event.propertyId, playerId: event.playerId})
                        break;
                    case "SELL_DORM":
                        dispatch({type: SELL_DORM, send: false, propertyId: event.propertyId, playerId: event.playerId})
                        break;
                    case "CHANGE_MONEY":
                        dispatch({type: HANDLE_CHANGE_MONEY, playerId: event.playerId, money: event.moneyChange})
                    case "MOVEMENT":
                        dispatch(handleMovement({movement: event.numTiles, id: event.playerId, doubles: false, onlyMove: true}))
                        break;
                    case "PURCHASE_PROPERTY":
                        dispatch({type: ADD_PROPERTY, playerId: event.playerId, property: PROPERTIES[parseInt(event.propertyId)]})
                        break;
                    case "OFFER_TRADE":
                        //ignore, needs to be 'offered-trade' event
                        break;
                        dispatch({type: RECEIVE_TRADE, obj: {...event} })
                        break;
                    case "ACCEPT_TRADE":
                        dispatch({type: HANDLE_ACCEPT_TRADE, obj: {...event} })
                        break;
                    default:
                        console.log("game-events default")
                }
                break;
            default:
                console.log("default case")
        }
    })
    
}

export const createRoom = (data) => async (dispatch) => {
    if(data.name === "" || data.startTime === "" || data.timeLimit === ""){
        dispatch({type: CREATE_ROOM_ERROR, error: "All rooms require a name, a start time, and a time limit."})
        return
    }
    
    console.log(data)
    try {  
        let result = await axios.post(`${API_URL}/rooms`, data);
        console.log(result.data);
        dispatch({type: ADD_NEW_ROOM, room: result.data.room, token: result.data.token})
    } catch(e){
        dispatch({type: CREATE_ROOM_ERROR, error: e})
    }
}

export const getRooms = () => async (dispatch) => {
    try {
        let result = await axios.get(`${API_URL}/rooms`)
        console.log(result.data)
        dispatch({type: SET_ROOMS_LIST, rooms: result.data.rooms})
    } catch(e){
        console.log(e)
        dispatch({type: LOBBY_ERROR, error: e})
    }
   
};

export const addMessage = (message) => async (dispatch) => {
    dispatch({type: ADD_MESSAGE, message, send: true})
};

export const requestStart = () => async (dispatch) => {
    dispatch({type: REQUEST_START})
};

export const leaveLobby = () => async (dispatch) => {
    dispatch({type: LEAVE_ROOM})
};

export const handleMovement = ({movement, id, doubles, onlyMove}) => async (dispatch) => {
    if(onlyMove === false)
        dispatch({type: MOVEMENT, movement, doubles})

    for(let i = 0; i < movement; i++){
        dispatch({type: MOVE_ONE, id, doubles})
        await sleep(1)
    }
}

export const turnLogic = ({movement, id, destination, doubles}) => async (dispatch) => {
    //dispatch({type: HIDE_DICE})
    await dispatch(handleMovement({movement, id, doubles, onlyMove: false}))


    if(TILES[destination].type === TileType.PROPERTY){
        dispatch({type: PROPERTY_DECISION, id: destination})
    } else if(TILES[destination].type === TileType.CHANCE){
        dispatch({type: DRAW_CHANCE})
    } else if(TILES[destination].type === TileType.CHEST){
        dispatch({type: DRAW_CHEST})
    } else if(TILES[destination].type === TileType.FEES){
        dispatch({type: PAY_FEES, id})
    } else {
        if(destination === 30){
            dispatch({type: GO_TO_JAIL, id, tellServer: true})
        }
    }

    if(doubles){
        dispatch({type: DOUBLES})
    } else {
        console.log("ENDING TURN")
        dispatch({type: END_TURN})
    }

    //(1) LAND ON PROPERTY => BUY/SKIP IF NOT OWNED, PAY RENT IF OWNED
    //(2) LAND ON CARD DRAW (COMMUNITY CHEST OR CHANCE)=> DRAW CARD, DO CARD EFFECTS,
    //(3) LAND ON FEES => PAY FEES
    //(4) LAND ON GOTO JAIL => GO TO JAIL
}

export const handlePurchase = ({buy, property}) => async (dispatch) => {
    if(buy === true){
        let propertyData = PROPERTIES[property];
        dispatch({type: ATTEMPT_BUY, property: propertyData}) 
    } 

    dispatch({type: CLOSE_PROPERTY})
}

export const setUserInfo = (info) => async (dispatch) => {
    let {name, major, year} = info;
    if(!name || name === ""){
        return
    }

    dispatch({type: SET_USER_INFO, userObj: {...info, id: null}})
};
