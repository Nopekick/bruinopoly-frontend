import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {turnLogic, requestGameOver, handleEndTurn, escapeBankruptcy} from '../../reducers/lobby'
import {differenceInSeconds} from 'date-fns'
import { makeStyles } from '@material-ui/core/styles';
import { positions, sleep, CHEST, CHANCE, mapIdToName } from '../../config'
import B from '../../assets/B.png';
import Bruinopoly from '../../assets/bruinopoly.png';
import FinAidCards from '../../assets/Financial_Aid_Cards.png';
import ExuseMeCards from '../../assets/Exuse_Me_Cards.png';

import SalePopup from './SalePopup'
import CardPopup from './CardPopup'
import TradePopup from './Trade'
import PropertyPopup from './PropertyPopup'
import MortgagePopup from './MortgagePopup'
import TradeResult from './TradeResult';
import BankruptcyPopup from './BankruptcyPopup';

export default function Board(props){
    const endTurnInProgress = useSelector(state => state.lobbyReducer.endTurnInProgress)
    const hideDice = useSelector(state => state.lobbyReducer.hideDice)
    const players = useSelector(state => state.lobbyReducer.game.players)

    const classes = useStyles();

    return(
        <div className={classes.board}>
            {!props.chestPopup && !props.chancePopup && !props.propertyPopup && !props.salePopup && props.bankruptcy && props.bankruptcy.show && <BankruptcyPopup />}
            {!props.chestPopup && !props.chancePopup &&!props.propertyPopup && !props.salePopup && props.bankruptcy && props.bankruptcy.impossible === false && <AttemptEscapeBankruptcy />}
            {props.mortgagePopup && <MortgagePopup />}
            {props.salePopup && <SalePopup property={props.salePopup} />}
            {props.propertyPopup && <PropertyPopup />}
            {props.tradePopup && !props.tradePopup.decision && <TradePopup />}
            {props.tradePopup && props.tradePopup.decision && <TradeResult />}
            {props.chestPopup !== null && <CardPopup info={CHEST[props.chestPopup.index]} id={props.chestPopup.playerId}
                chest={true} name={mapIdToName(players, props.chestPopup.playerId)}/>}
            {props.chancePopup !== null && <CardPopup info={CHANCE[props.chancePopup.index]} id={props.chancePopup.playerId} 
                chance={true} name={mapIdToName(players, props.chancePopup.playerId)}/>}
            {!props.salePopup && props.doubles && props.doubles.show && <CardPopup doubles={props.doubles} name={props.name}/>}
            {props.turn && !hideDice && <DiceBox />}
            {endTurnInProgress && <EndTurnAlerter date={endTurnInProgress} />}            
            <img draggable="false" alt="bruinopoly text" className={classes.Bruinopoly} src={Bruinopoly} />
            <img draggable="false" alt="B" className={classes.B} src={B} />
            <img draggable="false" alt="financial aid card" className={classes.FinAidCards} src={FinAidCards} />
            <img draggable="false" alt="excuse me card" className={classes.ExuseMeCards} src={ExuseMeCards} />
            <div className={classes.NoParking}>
                {positions[20]}
            </div>
            <div className={classes.topRail}>
                {positions.slice(21, 30)}
            </div>
            <div className={classes.GoToJail}>
                {positions[30]}
            </div>
            <div className={classes.rightRail}>
                {positions.slice(31, 40)}
            </div>
            <div className={classes.Go}>
                {positions[0]}
            </div>
            <div className={classes.bottomRail}>
                {positions.slice(1, 10)}
            </div>
            <div className={classes.Jail}>
                {positions[10]}
            </div>
            <div className={classes.leftRail}>
                {positions.slice(11, 20)}
            </div>
        </div>
        
    )

}

function EndTurnAlerter(props) {
    const [timeToEnd, changeTimeToEnd] = useState(60 - differenceInSeconds(new Date(), new Date(props.date)))
    const dispatch = useDispatch()
    const classes = turnStyles();

    useEffect(() => {
        const interval = setInterval(()=>{
            if(timeToEnd > 0) changeTimeToEnd(t => t - 1)
        }, 1000)
        const timeout = setTimeout(()=>{
            clearInterval(interval)
            dispatch(handleEndTurn())
        }, timeToEnd*1000)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [])

    return (
        <div className={classes.turnBox}>
            <div className={classes.text}>Turn ending in {timeToEnd} seconds</div>
            <button onClick={()=>{dispatch(handleEndTurn())}} className={classes.button}>END TURN</button>
        </div>
    )
}

function AttemptEscapeBankruptcy() {
    const dispatch = useDispatch()
    const classes = turnStyles();

    return (
        <div className={classes.turnBox}>
            <button onClick={()=>{dispatch(escapeBankruptcy())}} style={{marginTop: '20px'}} className={classes.button}>ESCAPE BANKRUPTCY</button>
        </div>
    )
}

function DiceBox() {
    const players = useSelector(state => state.lobbyReducer.game.players)
    const user = useSelector(state => state.lobbyReducer.userInfo)
    const {startDate, timeLimit} = useSelector(state => state.lobbyReducer.game)
    const doubles = useSelector(state => state.lobbyReducer.doubles)
    const dispatch = useDispatch()

    const classes = diceStyles();
    const [left, updateLeft] = useState(6)
    const [right, updateRight] = useState(6)
    const [haveRolled, updateRolled] = useState(false)

    let handleRoll = async () => {
        if(haveRolled) return

        //If game should end and player isn't in middle of turn (doubles), don't let turn happen and notify server
        const end_time = new Date(startDate);
        end_time.setMinutes(end_time.getMinutes() + Number(timeLimit));
        const cur_time = new Date(new Date().toLocaleString('en-US', {timeZone: "America/Los_Angeles"}));
        if (cur_time >= end_time && !doubles) return dispatch(requestGameOver())
       
        //Continue with roll logic
        let leftDice = Math.floor(Math.random()*6+1)
        let rightDice = Math.floor(Math.random()*6+1)

        //TEMP FIX: IN BEGINNING OF HANDLING TURN LOGIC, MAKE yourTurn = false to always hide dice 
        if(leftDice !== rightDice)
            updateRolled(true)

        for(let i = 0; i < 13; i++){
            updateLeft(Math.floor(Math.random()*6+1))
            updateRight(Math.floor(Math.random()*6+1))
            await sleep(0.1)
        }
        updateLeft(leftDice)
        updateRight(rightDice)

        let movement = leftDice + rightDice
        let destination = (players.filter(p => p._id === user.id)[0].currentTile + movement) % 40

        await sleep(1)
        dispatch(turnLogic({movement, id: user.id, destination, doubles: leftDice === rightDice}))
    }

    return (
        <div className={classes.diceBox}>
            <button onClick={handleRoll} className={classes.roll}>ROLL</button>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Dice number={left}/>
                <Dice number={right}/>
            </div>
        </div>
    )
}

function Dice(props){
    const classes = diceStyles();

    return (
        <div className={classes.dice}>
            {(props.number === 1 ? (
                <div>
                    <div className={classes.circle} style={{left: '18px', top: '18px'}}></div>
                </div>
            ) : (props.number === 2 ? (
                <div>
                    <div className={classes.circle} style={{left: '6px', top: '6px'}}></div>
                    <div className={classes.circle} style={{right: '6px', bottom: '6px'}}></div>
                </div>
            ) : (props.number === 3 ? (
                <div>
                   <div className={classes.circle} style={{left: '6px', bottom: '6px'}}></div>
                    <div className={classes.circle} style={{right: '6px', top: '6px'}}></div>
                    <div className={classes.circle} style={{right: '18px', top: '18px'}}></div>
                </div>
            ) : (props.number === 4 ? (
                <div>
                   <div className={classes.circle} style={{left: '6px', bottom: '6px'}}></div>
                   <div className={classes.circle} style={{right: '6px', bottom: '6px'}}></div>
                   <div className={classes.circle} style={{left: '6px', top: '6px'}}></div>
                   <div className={classes.circle} style={{right: '6px', top: '6px'}}></div>
                </div>
            ) : (props.number === 5 ? (
                <div>
                   <div className={classes.circle} style={{left: '6px', bottom: '6px'}}></div>
                   <div className={classes.circle} style={{right: '6px', bottom: '6px'}}></div>
                   <div className={classes.circle} style={{left: '6px', top: '6px'}}></div>
                   <div className={classes.circle} style={{right: '6px', top: '6px'}}></div>
                   <div className={classes.circle} style={{left: '18px', top: '18px'}}></div>
                </div>
            ) : (props.number === 6 ? (
                <div>
                   <div className={classes.circle} style={{left: '6px', bottom: '6px'}}></div>
                   <div className={classes.circle} style={{right: '6px', bottom: '6px'}}></div>
                   <div className={classes.circle} style={{left: '6px', top: '6px'}}></div>
                   <div className={classes.circle} style={{right: '6px', top: '6px'}}></div>
                   <div className={classes.circle} style={{right: '6px', top: '18px'}}></div>
                   <div className={classes.circle} style={{left: '6px', top: '18px'}}></div>
                </div>
            ) : null))))))}
        </div>
    )
}

const useStyles = makeStyles(() => ({
    board: {
        width: '745px',
        height: '745px',
        position: 'relative',
        backgroundColor: '#F7F2E7',
        border: '1.5px solid #C4B299',
        borderRadius: '15px',
        boxSizing: 'border-box',
        boxShadow: '4px 4px 0px rgba(196, 178, 153, 0.8)'
    },
    Bruinopoly: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '350px',
        zIndex: '1'
    },
    B: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '225px',
        zIndex: '0',
    },
    FinAidCards: {
        position: 'absolute',
        top: '31%',
        left: '31%',
        transform: 'translate(-50%, -50%)',
        height: '215px'
    },
    ExuseMeCards: {
        position: 'absolute',
        bottom: '31%',
        right: '31%',
        transform: 'translate(50%, 50%)',
        height: '215px'
    },
    NoParking: {
        position: 'absolute',
        top: '0px',
        left: '0px'
    },
    GoToJail: {
        position: 'absolute',
        top: '0px',
        right: '0px'
    },
    Go: {
        position: 'absolute',
        bottom: '0px',
        right: '0px'
    },
    Jail: {
        position: 'absolute',
        bottom: '0px',
        left: '0px'
    },
    topRail: {
        width: '540px',
        height: '100px',
        position: 'absolute',
        top: '0px',
        left: '50%',
        transform: 'translate(-50%, 0) rotate(180deg)',
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    rightRail: {
        width: '540px',
        height: '100px',
        position: 'absolute',
        right: '0px',
        top: '50%',
        transform: 'translate(calc(50% - 50px), -50%) rotate(270deg)',
        display: 'flex',
        flexDirection: 'row-reverse',
    },
    bottomRail: {
        height: '100px',
        width: '540px',
        position: 'absolute',
        bottom: '0px',
        left: '50%',
        transform: 'translate(-50%, 0)',
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    leftRail: {
        height: '100px',
        width: '540px',
        position: 'absolute',
        top: '50%',
        left: '0px',
        transform: 'translate(calc(-50% + 50px), -50%) rotate(90deg)',
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    corner: {
        width: '100px',
        height: '100px'
    }
}))

const diceStyles = makeStyles(() => ({
    diceBox: {
        width: '104px',
        height: '86px',
        position: 'absolute',
        left: '115px',
        bottom: '115px',
        zIndex: 4,
    },
    roll: {
        width: '104px',
        height: '30px',
        textAlign: 'center',
        fontFamily: 'ChelseaMarket',
        fontSize: '20px',
        borderRadius: '5px',
        backgroundColor: '#C5B49C',
        border: 'none',
        cursor: 'pointer',
        marginBottom: '10px',
        color: 'white',
        outline: 'none'
    },
    dice: {
        backgroundColor: 'white',
        borderRadius: '5px',
        boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.15)',
        height: '46px',
        width: '46px',
        border: '0.5px solid #C1C1C1',
        position: 'relative'
    },
    circle: {
        height: '10px',
        width: '10px',
        backgroundColor: 'black',
        borderRadius: '50%',
        position: 'absolute'
    }
}))

const turnStyles = makeStyles(() => ({
    turnBox: {
        width: '170px',
        height: '86px',
        position: 'absolute',
        left: '115px',
        bottom: '115px',
        zIndex: 4,
    },
    text: {
        fontFamily: 'ChelseaMarket',
        fontSize: '22px',
        color: '#433F36',
       
    },
    button: {
        padding: '4px 10px',
        textAlign: 'center',
        fontFamily: 'ChelseaMarket',
        fontSize: '20px',
        borderRadius: '5px',
        backgroundColor: '#C5B49C',
        border: 'none',
        cursor: 'pointer',
        marginBottom: '10px',
        color: 'white',
        outline: 'none'
    },
}))