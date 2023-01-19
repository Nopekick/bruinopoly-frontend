import axios from 'axios';
import {API_URL, SOCKET_URL, sleep, PROPERTIES, TileType, TILES} from '../config';


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
const SET_TURN = "SET_TURN"
const END_TURN = "END_TURN"
const SET_HOST_SELF = "SET_HOST_SELF"
const SET_HOST = "SET_HOST"
const UPDATE_PLAYERS = "UPDATE_PLAYERS"
const ADD_MESSAGE = "ADD_MESSAGE"
const SET_SOCKET = "SET_SOCKET"

const MOVE_ONE = "MOVE_ONE"
const MOVEMENT = "MOVEMENT"
const PROPERTY_DECISION = "PROPERTY_DECISION"
const CLOSE_PROPERTY = "CLOSE_PROPERTY"
const ATTEMPT_BUY = "ATTEMPT_BUY"
const HANDLE_CHANGE_MONEY = "HANDLE_CHANGE_MONEY"

const GO_TO_JAIL = "GO_TO_JAIL"
const USE_GET_OUT_OF_JAIL = "USE_GET_OUT_OF_JAIL"
const GET_OUT_OF_JAIL_FREE = "GET_OUT_OF_JAIL_FREE"
const JAIL_TURN = "JAIL_TURN"
const OPEN_JAIL_POPUP = "OPEN_JAIL_POPUP"
const CLOSE_JAIL_POPUP = "CLOSE_JAIL_POPUP"

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
const HANDLE_RENT = "HANDLE_RENT"
const GAME_OVER = "GAME_OVER"

//FOR TESTING
const BUY_ALL_PROPERTIES = "BUY_ALL_PROPERTIES"
const TEST_ADD_PLAYER = "TEST_ADD_PLAYER"
const TEST_ADD_PLAYERS = "TEST_ADD_PLAYERS"
const TEST_MOVE_ALL_TO = "TEST_MOVE_ALL_TO"
const TEST_ALL_TO_JAIL = "TEST_ALL_TO_JAIL"
const TEST_ADD_JAIL_CARDS = "TEST_ADD_JAIL_CARDS"


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
    winPopup: null,
    jailPopup: null,
    doubles: null,
    jailCards: 0
}

export function lobbyReducer(state = initialState, action) {
    switch (action.type) {
        case TEST_ADD_PLAYER: 
            return {...state, game: {...state.game, players: [...state.game.players, action.player]}}
        case TEST_ADD_PLAYER: 
            return {...state, game: {...state.game, players: [...state.game.players, ...action.players]}}
        case TEST_MOVE_ALL_TO:
            return {...state, game: {...state.game, players: state.game.players.map((p) => {return {...p, currentTile: action.tileNum}})}}
        case TEST_ALL_TO_JAIL:
            return {...state, game: {...state.game, players: state.game.players.map((p) => {return {...p, turnsInJail: 1}})}}
        case TEST_ADD_JAIL_CARDS:
            return {...state, jailCards: 2}
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
                if(p._id === action.playerId){
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

            return {...state, jailCards: 0, tradePopup: null, doubles: null, gameID: action.id, game: action.room, lobbyError: null, joinRoomError: null, salePopup: null,
                createRoomError: null, userInfo: {...state.userInfo, id: playerId}, jailPopup: null, propertyPopup: null, chestPopup: null, chancePopup: null, winPopup: null}
        case LEAVE_ROOM:
            if(state.socket !== null && typeof state.socket.close !== "undefined")
                state.socket.close()
            //SHOULD TOKEN BECOME NULL UPON LEAVING ROOM? MAYBE CHANGE LATER
            return {...state, gameID: null, yourTurn: false, isHost: false, messages: [], players: null, game: null, socket: null, doubles: null, jailPopup: null,
                 chancePopup: null, chestPopup: null, salePopup: null, tradePopup: null, propertyPopup: null, token: null, winPopup: null, jailCards: 0}
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
        case SET_HOST_SELF: 
            if(action.token) {
                return {...state, isHost: true, token: action.token}
            }
            return {...state, isHost: true}
        case SET_HOST:
            //new player has not yet received game/room info, will know host when that is received
            if (state.game === null) return {...state}

            //current lobby members changing host value 
            return {...state, game: {...state.game, host: action.host}}
        case START_GAME:
            return {...state, game: action.game}
        case START_TURN:
            return {...state, yourTurn: true}
        case SET_TURN:
            return {...state, game: {...state.game, currentTurn: action.id}}
        case END_TURN:
            return {...state, yourTurn: false}
        case MOVE_ONE:
            let p1 = state.game.players.filter(p => p._id === action.id)[0]

            if(p1.turnsInJail === 0)
                return {...state, game: {...state.game, players: state.game.players.map((player)=>{
                    if(player._id !== action.id) return player
                    else if((player.currentTile + 1)%40 === 0) return {...player, currentTile: (player.currentTile + 1)%40, money: player.money + 200} //pass GO, get $200
                    else return {...player, currentTile: (player.currentTile + 1)%40}
                })}}

            return {...state}
        case DOUBLES:
            //Logic when player rolls double: go to jail on 3rd consecutive doubles roll
            if(state.doubles === null){
                return {...state, yourTurn: true, doubles: {show: true, number: 1}}
            } else if(state.doubles.number === 2){
                if(state.socket !== null){
                    state.socket.send(JSON.stringify(['game-events', [{type: 'GO_TO_JAIL', playerId: state.userInfo.id}, {type: 'END_TURN'}] ]))
                }
                
                return {...state, yourTurn: false, doubles: {show: true, number: 3}, game: {...state.game, players: state.game.players.map((player)=>{
                    if(player._id !== state.userInfo.id) return player
                    else return {...player, currentTile: 10, turnsInJail: 3}
                })}} 
            } else {
                return {...state, yourTurn: true, doubles: {show: true, number: 2}}
            }   
        case MOVEMENT:
            let p2 = state.game.players.filter(p => p._id === state.userInfo.id)[0]

            //only send movement if not in jail without triple doubles, or in jail with doubles
            if(state.socket !== null && 
                ((p2.turnsInJail === 0 && !(state.doubles && state.doubles.number === 2 && action.doubles === true))
                 || (p2.turnsInJail !== 0 && action.doubles === true))){
                state.socket.send(JSON.stringify(['game-events', [{type: 'MOVEMENT', playerId: state.userInfo.id, numTiles: action.movement}] ]))
            }

            //if player is in jail, reduce jail turn count, or free them if doubles
            if(p2.turnsInJail !== 0 && action.doubles === true){
                if(state.socket !== null){
                    state.socket.send(JSON.stringify(['game-events', [{type: 'GET_OUT_OF_JAIL_FREE', playerId: state.userInfo.id}] ]))
                }

                return {...state, game: {...state.game, players: state.game.players.map((player)=>{
                    if(player._id !== state.userInfo.id) return player
                    return {...player, turnsInJail: 0}
                })}}
            } else if(p2.turnsInJail !== 0 && action.doubles === false){
                if(state.socket !== null){
                    state.socket.send(JSON.stringify(['game-events', [{type: 'JAIL_TURN', playerId: state.userInfo.id}] ]))
                }
        
                return {...state, game: {...state.game, players: state.game.players.map((p)=>{
                    if(p._id !== state.userInfo.id) return p
                    return {...p, turnsInJail: p.turnsInJail - 1}
                })}}
            } else if(action.doubles === false){
                //Not in jail, do nothing??
                return {...state, doubles: null}
            }

            return {...state}
        case OPEN_JAIL_POPUP:
            const jailPlayer = state.game.players.filter(p => p._id === state.userInfo.id)[0]
            if(jailPlayer.turnsInJail === 0) return {...state}
            
            return {...state, jailPopup: true}
        case CLOSE_JAIL_POPUP:
            return {...state, jailPopup: null}
        case USE_GET_OUT_OF_JAIL:
            if(state.socket !== null){
                state.socket.send(JSON.stringify(['game-events', [{type: 'GET_OUT_OF_JAIL_FREE', playerId: state.userInfo.id}] ]))
            }
        
            return {...state, jailCards: Math.max(0, state.jailCards - 1), jailPopup: null,
                game: {...state.game, players: state.game.players.map((p) => {
                    if(p._id !== state.userInfo.id) return p
                    return {...p, turnsInJail: 0}
                })}}
        case GET_OUT_OF_JAIL_FREE:
            return {...state, game: {...state.game, players: state.game.players.map((p) => {
                    if(p._id !== action.id) return p
                    return {...p, turnsInJail: 0}
                })}}
        case JAIL_TURN:
            return {...state, game: {...state.game, players: state.game.players.map((p) => {
                    if(p._id !== action.id) return p
                    return {...p, turnsInJail: Math.max(0, p.turnsInJail-1)}
                })}}
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
            //Logic for handling trade when this player accepts trade
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
            //Logic for handling game state when other player accepts trade 
            // console.log("HANDLE_ACCEPT_TRADE:", action.obj)
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
            } else if(owner !== state.userInfo.id && action.justOpening !== true) {   //what is justOpening??
                //No rent if property mortgaged
                if(state.game.properties[action.id].isMortgaged === true){
                    return {...state}
                }

                //PAY RENT 
                let property = PROPERTIES[action.id]
                const ownedProperties = state.game.players.find((p) => p._id === owner).propertiesOwned

                let rent = 0; 
                if(property.utility === true){
                    //UTILITY RENT
                    if(ownAll(action.id, ownedProperties)){
                        rent = action.movement * 10;
                    } else {
                        rent = action.movement * 4;
                    }
                } else if(property.railroad === true){
                    //RAILROAD RENT
                    switch(railroadCount(ownedProperties)){
                        case 1: rent = 25; break;
                        case 2: rent = 50; break;
                        case 3: rent = 100; break;
                        case 4: rent = 200; break;
                        default: rent = 0;
                    }
                } else {
                    //NORMAL RENT, CONSIDER DORMS
                    if(ownAll(action.id, ownedProperties) && state.game.properties[action.id].dormCount === 5){
                        rent = property.rent5;
                    } else if(ownAll(action.id, ownedProperties) && state.game.properties[action.id].dormCount === 4){
                        rent = property.rent4;
                    } else if(ownAll(action.id, ownedProperties) && state.game.properties[action.id].dormCount === 3){
                        rent = property.rent3;
                    } else if(ownAll(action.id, ownedProperties) && state.game.properties[action.id].dormCount === 2){
                        rent = property.rent2;
                    } else if(ownAll(action.id, ownedProperties) && state.game.properties[action.id].dormCount === 1){
                        rent = property.rent1;
                    } else if(ownAll(action.id, ownedProperties)) {
                        rent = property.rent * 2;
                    } else {
                        rent = property.rent;
                    }
                }

                // BANKRUPTCY LOGIC HERE (TODO)

                if(state.socket !== null){
                    //calculate rent here, other players listen to 'RENT' event and just use given amount
                    state.socket.send(JSON.stringify(['game-events', [{type: 'RENT', playerId: state.userInfo.id, propertyOwner: owner, propertyId: action.id, rent}]]))
                }
            
                return {...state, game: {...state.game, players: state.game.players.map((p)=>{
                    if(p._id === state.userInfo.id) 
                        return {...p, money: p.money - rent}
                    else if(p._id === owner) 
                        return {...p, money: p.money + rent}
                    else 
                        return p
                })}}
            }
            return {...state}
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
                state.socket.send(JSON.stringify(['game-events', [{type: 'CARD_DRAW', deck: "CHANCE", playerId: state.userInfo.id, cardIndex: state.game.chanceDeck.currentCardIndex}] ]))

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
            if(state.socket !== null && action.send)
                state.socket.send(JSON.stringify(['game-events', [{type: 'MORTGAGE_PROPERTY', playerId: action.playerId, propertyId: action.propertyNum, mortgage: action.actionType}] ]))

            if(action.actionType === "MORTGAGE"){
                return {...state, game: {...state.game, properties: state.game.properties.map((p,i)=>{
                    if(i === action.propertyNum)
                        return {...p, isMortgaged: true}   
                    return p
                }), players: state.game.players.map((p)=>{
                    if(p._id === action.playerId)
                        return {...p, money: p.money + PROPERTIES[action.propertyNum].mortgage}
                    return p
                })}}
            } else if(action.actionType === "LIFT MORTGAGE"){
                return {...state, game: {...state.game, properties: state.game.properties.map((p,i)=>{
                    if(i === action.propertyNum)
                        return {...p, isMortgaged: false}   
                    return p
                }), players: state.game.players.map((p)=>{
                    if(p._id === action.playerId)
                        return {...p, money: p.money - (PROPERTIES[action.propertyNum].mortgage * 1.1)}
                    return p
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
        case HANDLE_RENT:
            return {...state, game: {...state.game, players: state.game.players.map((p)=>{
                if(p._id === action.playerId) 
                    return {...p, money: p.money - action.rent}
                else if(p._id === action.ownerId) 
                    return {...p, money: p.money + action.rent}
                else 
                    return p
            })}}
        case GAME_OVER:
            // make other popups false?
            if(state.socket !== null)
                state.socket.close()
            return {...state, winPopup: {winner: action.winner, maxWealth: action.maxWealth}}
        default:
            return state;
    }
}

export const joinRoom = ({id, name, password, token}) => async (dispatch) => {
    //console.log(id, name, password)
    let socket;
    try {
        socket = new WebSocket(`ws://${SOCKET_URL}?room_id=${id}&name=${name}&password=${password}&token=${token}`);
    } catch(e){
        console.log("An error occurred: ", e)
        return dispatch({type: JOIN_ROOM_ERROR, error: "Failed to join room"})
    }
    
    dispatch({type: SET_SOCKET, socket})

    socket.addEventListener('open', function (event) {
        //console.log("open event")
    });

    socket.addEventListener('error', function (event) {
        //console.log("Error event")
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
               //console.log(data[1])
                dispatch({type: ADD_MESSAGE, message: data[1], send: false})
                break;
            case 'host':
                dispatch({type: SET_HOST_SELF, token: data[1].token})
                break;
            case 'new-host':
                dispatch({type: SET_HOST, host: data[1]})
                break;
            case 'can-start':
                dispatch({type: START_GAME, game: data[1].game})
                break;
            case 'game-over':
                console.log("The winner has id:",data[1].winner)
                dispatch({type: GAME_OVER, winner: data[1].winner, maxWealth: data[1].maxWealth})
                //dispatch event to close socket connection, display winner popup with button to leave game
                break;
            case 'your-turn':
                dispatch({type: START_TURN})
                break;
            case 'player-turn':
                dispatch({type: SET_TURN, id: data[1].id})
                break;
            case 'offered-trade':
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
                        break;
                    case "GO_TO_JAIL":
                        dispatch({type: GO_TO_JAIL, id: event.playerId, tellServer: false})
                        break;
                    case "GET_OUT_OF_JAIL_FREE":
                        dispatch({type: GET_OUT_OF_JAIL_FREE, id: event.playerId})
                        break;
                    case "JAIL_TURN":
                        dispatch({type: JAIL_TURN, id: event.playerId})
                        break;
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
                    case "MORTGAGE_PROPERTY":
                        dispatch({type: MORTGAGE, send: false, playerId: event.playerId, propertyNum: event.propertyId, actionType: event.mortgage})
                        break
                    case "RENT":
                        dispatch({type: HANDLE_RENT, rent: event.rent, playerId: event.playerId, ownerId: event.propertyOwner})
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
    
    //console.log(data)
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
       // console.log(result.data)
        dispatch({type: SET_ROOMS_LIST, rooms: result.data.rooms})
    } catch(e){
       // console.log(e)
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

export const requestGameOver = () => async (dispatch, getState) => {
    const socket = getState().lobbyReducer.socket
    
    if(socket !== null) {
        socket.send(JSON.stringify(['game-events', [{type: 'END_TURN'}]]))
    }
    dispatch({type: END_TURN})
}

export const handleMovement = ({movement, id, doubles, onlyMove}) => async (dispatch, getState) => {
    const player = getState().lobbyReducer.game.players.find(p => p._id === id)
    const doubleState = getState().lobbyReducer.doubles

    if(onlyMove === false)
        dispatch({type: MOVEMENT, movement, doubles})

   
    //If player is in jail and did not roll doubles, skip tile movement
    //Or if player is not in jail, but just rolled 3 consecutive doubles, also skip tile movement
    if((player.turnsInJail !== 0 && doubles === false) ||
        (player.turnsInJail === 0 && doubles === true && doubleState && doubleState.number === 2)) {
        await sleep(1)
        return;
    } 

    for(let i = 0; i < movement; i++){
        dispatch({type: MOVE_ONE, id, doubles})
        await sleep(1)
    }
}

export const turnLogic = ({movement, id, destination, doubles}) => async (dispatch, getState) => {
    const socket = getState().lobbyReducer.socket
    const player = getState().lobbyReducer.game.players.find(p => p._id === id)
    const doubleState = getState().lobbyReducer.doubles

    await dispatch(handleMovement({movement, id, doubles, onlyMove: false}))

    //NEEDS CHANGES: ADD END TURN TO END OF PROPERTY_DECISION, CARD DRAWING, FEE PAYING
    if((player.turnsInJail !== 0 && doubles == false) ||
        (player.turnsInJail === 0 && doubleState && doubleState.number === 2 && doubles === true)) {
        //do nothing if in jail and didn't roll doubles
        //also do nothing if not in jail, rolled 3 consecutive doulbes
    }
    else if(TILES[destination].type === TileType.PROPERTY){
        dispatch({type: PROPERTY_DECISION, id: destination, movement})
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
        if(socket !== null) {
            socket.send(JSON.stringify(['game-events', [{type: 'END_TURN'}]]))
        }
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

const ownAll = (propertyNum, ownedProperties) => {
    if(propertyNum === 1 && ownedProperties.includes(1) && ownedProperties.includes(3)){
        return true;
    } else if(propertyNum === 3 && ownedProperties.includes(1) && ownedProperties.includes(3)){
        return true;
    } else if(propertyNum === 6 && ownedProperties.includes(6) && ownedProperties.includes(8) && ownedProperties.includes(9)){
        return true;
    } else if(propertyNum === 8 && ownedProperties.includes(6) && ownedProperties.includes(8) && ownedProperties.includes(9)){
        return true;
    } else if(propertyNum === 9 && ownedProperties.includes(6) && ownedProperties.includes(8) && ownedProperties.includes(9)){
        return true;
    } else if(propertyNum === 11 && ownedProperties.includes(11) && ownedProperties.includes(13) && ownedProperties.includes(14)){
        return true;
    } else if(propertyNum === 13 && ownedProperties.includes(11) && ownedProperties.includes(13) && ownedProperties.includes(14)){
        return true;
    } else if(propertyNum === 14 && ownedProperties.includes(11) && ownedProperties.includes(13) && ownedProperties.includes(14)){
        return true;
    } else if(propertyNum === 16 && ownedProperties.includes(16) && ownedProperties.includes(18) && ownedProperties.includes(19)){
        return true;
    } else if(propertyNum === 18 && ownedProperties.includes(16) && ownedProperties.includes(18) && ownedProperties.includes(19)){
        return true;
    } else if(propertyNum === 19 && ownedProperties.includes(16) && ownedProperties.includes(18) && ownedProperties.includes(19)){
        return true;
    } else if(propertyNum === 21 && ownedProperties.includes(21) && ownedProperties.includes(23) && ownedProperties.includes(24)){
        return true;
    } else if(propertyNum === 23 && ownedProperties.includes(21) && ownedProperties.includes(23) && ownedProperties.includes(24)){
        return true;
    } else if(propertyNum === 24 && ownedProperties.includes(21) && ownedProperties.includes(23) && ownedProperties.includes(24)){
        return true;
    } else if(propertyNum === 26 && ownedProperties.includes(26) && ownedProperties.includes(27) && ownedProperties.includes(29)){
        return true;
    } else if(propertyNum === 27 && ownedProperties.includes(26) && ownedProperties.includes(27) && ownedProperties.includes(29)){
        return true;
    } else if(propertyNum === 29 && ownedProperties.includes(26) && ownedProperties.includes(27) && ownedProperties.includes(29)){
        return true;
    } else if(propertyNum === 31 && ownedProperties.includes(31) && ownedProperties.includes(32) && ownedProperties.includes(34)){
        return true;
    } else if(propertyNum === 32 && ownedProperties.includes(31) && ownedProperties.includes(32) && ownedProperties.includes(34)){
        return true;
    } else if(propertyNum === 34 && ownedProperties.includes(31) && ownedProperties.includes(32) && ownedProperties.includes(34)){
        return true;
    } else if(propertyNum === 37 && ownedProperties.includes(37) && ownedProperties.includes(39)){
        return true;
    } else if(propertyNum === 39 && ownedProperties.includes(37) && ownedProperties.includes(39)){
        return true;
    } else if(propertyNum === 12 && ownedProperties.includes(12) && ownedProperties.includes(28)){
        //utilities Powell and Royce
    } else if(propertyNum === 28 && ownedProperties.includes(12) && ownedProperties.includes(28)){
        //utilities Powell and Royce
    } else {
        return false
    }
}

const railroadCount = (ownedProperties) => {
    //railroads are 5, 15, 25, 35
    let count = 0;
    if(ownedProperties.includes(5)) count++;
    if(ownedProperties.includes(15)) count++;
    if(ownedProperties.includes(25)) count++;
    if(ownedProperties.includes(35)) count++;
    return count;
}
