import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import {PROPERTIES, getColor } from '../../config';
import { tradeDecision } from '../../reducers/lobby';

import mortgage from '../../assets/mortgage_black.png'
import arrow from '../../assets/price_change.png'

export default function TradePopup(props){
    const [pay, changePay] = useState(0)
    const [receive, changeReceive] = useState(0)
    const [tradeRecipient, changeRecipient] = useState(null)
    const [myProperties, changeMyProperties] = useState([])
    const [otherProperties, changeOtherProperties] = useState([])
    const [propertiesITrade, changeMyTradeProperties] = useState([])
    const [propertiesOtherTrade, changeOtherTradeProperties] = useState([])
    const players = useSelector(state => state.lobbyReducer.game.players)
    const player = useSelector(state => state.lobbyReducer.userInfo)
    const trade = useSelector(state => state.lobbyReducer.tradePopup)
    const properties = useSelector(state => state.lobbyReducer.game.properties)
    const [tradeOffererName, changeTradeOffererName] = useState("")
    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(()=>{
        const me = players.filter(p => p._id === player.id)[0]
        changeMyProperties(me.propertiesOwned)

        if(trade.receive === true){
            let other = players.filter(p => p._id === trade.playerId)[0]
            changeTradeOffererName(other.name)

            changePay(trade.moneyIncoming)
            changeReceive(trade.moneyOutgoing)
        }
    }, [])

    useEffect(()=>{
        if(trade.recipient === true){
            let other = players.filter(p => p._id === trade.playerId)[0]
            changeTradeOffererName(other.name)

            changePay(trade.moneyIncoming)
            changeReceive(trade.moneyOutgoing)
        }
    }, [trade])


    useEffect(()=>{
        if(tradeRecipient === null || tradeRecipient === ""){
            changeOtherProperties([])
            return
        } 
        
        let other = players.filter(p => p._id === tradeRecipient)[0]
        changeOtherProperties(other.propertiesOwned)
    }, [tradeRecipient])
    
    const handleIncrease = (bool) => {
        if(trade.receive === true) return;

        if(bool===true){
            const me = players.filter(p => p._id === player.id)[0]
            //Only increase money amount if you have that much money
            if(pay + 10 <= me.money)
                changePay(pay + 10)
        } else {
            const otherPlayer = players.filter(p => p._id === tradeRecipient)[0]
            //Only increase money amount if trade recipient has that much money
            if(receive + 10 <= otherPlayer.money)
                changeReceive(receive + 10)
        }
    }

    const handleDecrease = (bool) => {
        if(trade.receive === true) return;

        if(bool===true){
            if(pay - 10 >= 0)
                changePay(pay - 10)
        } else {
            if(receive - 10 >= 0)
            changeReceive(receive - 10)
        }
    }

    let handleClose = () => {
        dispatch({type: "CANCEL_TRADE"})
    }

    let handleTradeDecision = (decision) => {
        dispatch(tradeDecision(decision))
    }

    let handleMyProperties = (propertyNum) => {
        if(propertiesITrade.includes(propertyNum)){
            changeMyTradeProperties(l => l.filter(p => p !== propertyNum))
        } else {
            changeMyTradeProperties(l => [...l, propertyNum])
        }
    }

    let handleOtherProperties = (propertyNum) => {
        if(propertiesOtherTrade.includes(propertyNum)){
            changeOtherTradeProperties(l => l.filter(p => p !== propertyNum))
        } else {
            changeOtherTradeProperties(l => [...l, propertyNum])
        }
    }

    let handleOffer = () => {
        if(tradeRecipient === null) return;

        let obj = {
            propertiesOutgoing: propertiesITrade,
            propertiesIncoming: propertiesOtherTrade,
            moneyOutgoing: pay,
            moneyIncoming: receive,
            receivingPlayerId: tradeRecipient,
            playerId: player.id
        }
        dispatch({type: "OFFER_TRADE", obj})
    }

    return(
        <div style={{width: '100%', height: '100%'}}>
            <div className={classes.shadow}></div>
            <div className={classes.container}>
                <div className={classes.tradeText}>{trade.receive ? "TRADE OFFER" : "TRADE"}</div>
                {trade.receive ? <div className={classes.topBox}>{tradeOffererName} IS OFFERING A TRADE</div> : null}
                <div style={{display: 'flex', justifyContent: 'space-between', width: '482px', marginTop: '24px', marginBottom: '20px'}}>
                    <div className={classes.box}>
                        <div className={classes.colorBar}>{player.name}</div>
                        <div className={classes.money}>$ {pay}
                            {!trade.receive && <img src={arrow} className={classes.arrow} style={{transform: 'rotate(180deg)',bottom: '5px', right: '14px'}} alt="lower price"
                                onClick={()=>{handleDecrease(true)}}/>}
                            {!trade.receive && <img src={arrow} className={classes.arrow} style={{top: '5px', right: '14px'}} alt="raise price"
                                onClick={()=>{handleIncrease(true)}}/>}
                        </div>
                        <div className={classes.propertiesToTrade}>
                        {!trade.receive && myProperties.map((p, i) => {
                            return <div key={i} style={{backgroundColor: propertiesITrade.includes(p) ? "#e1e6e2" : 'white'}} 
                                onClick={()=> handleMyProperties(p)} className={classes.propertyBox}>
                                <div style={{backgroundColor: getColor(p)}} className={classes.typeBox}></div>
                                <p className={classes.text}>{PROPERTIES[p].name}</p>
                                <p className={classes.text}>${PROPERTIES[p].price}</p>
                                {properties[p].isMortgaged && <img src={mortgage} alt="mortgage" className={classes.mortgage}/>}
                            </div>
                        })}
                        {trade.receive && trade.propertiesIncoming.map((p,i)=>{
                            return <div key={i}
                                className={classes.propertyBox}>
                                <div style={{backgroundColor: getColor(p)}} className={classes.typeBox}></div>
                                <p className={classes.text}>{PROPERTIES[p].name}</p>
                                <p className={classes.text}>${PROPERTIES[p].price}</p>
                                {properties[p].isMortgaged && <img src={mortgage} alt="mortgage" className={classes.mortgage}/>}
                            </div>
                        })}
                        </div>
                    </div>
                    <div className={classes.box}>
                        {trade.receive===true ? 
                            (<div className={classes.colorBar}>{tradeOffererName}</div>) 
                        :   (<select onChange={(e)=>{changeRecipient(e.target.value)}} className={classes.colorBar} style={{textAlign: 'center'}}>
                                <option value={""}>Choose player</option>
                                {players.filter(p => p._id !== player.id).map((p, i) => {
                                    return <option key={i} value={p._id}>{p.name}</option>
                                })}
                            </select>) 
                        }
                        <div className={classes.money}>$ {receive}
                            {!trade.receive && <img src={arrow} className={classes.arrow} style={{transform: 'rotate(180deg)',bottom: '5px', right: '14px'}} alt="lower price"
                                onClick={()=>{handleDecrease(false)}}/>}
                            {!trade.receive && <img src={arrow} className={classes.arrow} style={{top: '5px', right: '14px'}} alt="raise price"
                                onClick={()=>{handleIncrease(false)}}/>}
                        </div>
                        <div className={classes.propertiesToTrade}>
                        {!trade.receive && otherProperties.map((p, i) => {
                            return <div key={i} style={{backgroundColor: propertiesOtherTrade.includes(p) ? "#e1e6e2" : 'white'}}
                                onClick={()=> handleOtherProperties(p)} className={classes.propertyBox}>
                                <div style={{backgroundColor: getColor(p)}} className={classes.typeBox}></div>
                                <p className={classes.text}>{PROPERTIES[p].name}</p>
                                <p className={classes.text}>${PROPERTIES[p].price}</p>
                                {properties[p].isMortgaged && <img src={mortgage} alt="mortgage" className={classes.mortgage}/>}
                            </div>
                        })}
                        {trade.receive && trade.propertiesOutgoing.map((p,i)=>{
                            return <div key={i} 
                                className={classes.propertyBox}>
                                <div style={{backgroundColor: getColor(p)}} className={classes.typeBox}></div>
                                <p className={classes.text}>{PROPERTIES[p].name}</p>
                                <p className={classes.text}>${PROPERTIES[p].price}</p>
                                {properties[p].isMortgaged && <img src={mortgage} alt="mortgage" className={classes.mortgage}/>}
                            </div>
                        })}
                        </div>
                    </div>
                </div>
                {trade.receive ? (
                    <div style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
                        <button onClick={()=>{handleTradeDecision("ACCEPT")}} className={classes.button} style={{width: '143px'}}>ACCEPT</button>
                        {/*<button className={classes.button} style={{width: '143px', cursor: 'default', backgroundColor: 'gray'}}>COUNTER</button>*/}
                        <button onClick={()=>{handleTradeDecision("REJECT")}}  className={classes.button} style={{width: '143px'}}>REJECT</button>
                    </div>)  : (<div style={{display: 'flex', justifyContent: 'space-around', width: '78%'}}>
                        <button onClick={handleOffer} className={classes.button} style={{width: '158px'}}>OFFER</button>
                        <button onClick={handleClose} className={classes.button} style={{width: '158px'}}>CANCEL</button>
                    </div> )  
                }
            </div>
        </div>
    )

}

const useStyles = makeStyles(() => ({
    container: {
        width: '524px',
        
        backgroundColor: '#C4B299',
        borderRadius: '10px',
        boxShadow: '4px 4px 13px rgba(0, 0, 0, 0.15)',
        position: 'absolute',
        top: '108px',
        left: '108px',
        zIndex: 5,
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    shadow: {
        width: '100%',
        height: '100%',
        zIndex: 2,
        backgroundColor: '#C4B299',
        opacity: 0.3,
        position: 'relative',
        borderRadius: '10px'
    },
    tradeText: {
        fontFamily: 'ChelseaMarket',
        color: '#A8DDD7',
        fontSize: '42px',
        textAlign: 'center',
        margin: 0,
        marginBottom: '-10px',
        textShadow: '2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff'
    },
    topBox: {
        marginTop: '19px',
        height: '60px',
        width: '482px',
        borderRadius: '10px',
        backgroundColor: '#EFE9DB',
        fontSize: '25px',
        fontFamily: 'VCR',
        color: '#7A6E5D',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        borderRadius: '10px',
        backgroundColor: '#F7F2E7',
        height: '370px',
        width: '227px',
        boxSizing: 'border-box',
    },
    colorBar: {
        height: '49px',
        backgroundColor: '#B6DAD6',
        width: '100%',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px',
        fontFamily: 'VCR',
        fontSize: '25px',
        lineHeight: '49px',
        textAlign: 'center',
        fontWeight: '400',
        color: '#433F36'
    },
    button: {
        color: 'white',
        borderRadius: '9px',
        fontSize: '22px',
        height: '35px',
        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'ChelseaMarket',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        backgroundColor: '#7A6E5D'
    },
    arrow: {
        height: '14px',
        position: 'absolute',
        highlight: 'none',
        userDrag: 'none',
        cursor: 'pointer'
    },
    money: {
        height: '42px',
        width: '110px',
        borderRadius: '50px',
        backgroundColor: '#DADADA',
        display: 'flex',
        boxSizing: 'border-box',
        paddingLeft: '30px',
        alignItems: 'center',
        position: 'relative',
        margin: 'auto',
        marginTop: '8px',
        marginBottom: '15px'
    },
    propertyBox: {
        cursor: 'pointer',
        height: '46px',
        width: '199px',
        margin: 'auto',
        backgroundColor: 'white',
        position: 'relative',
        paddingLeft: '30px',
        paddingTop: '7px',
        boxSizing: 'border-box',
        marginBottom: '10px'
    },
    typeBox: {
        height: '38px',
        width: '17px',
        backgroundColor: 'black',
        top: '4px',
        left: '5px',
        position: 'absolute',
    },
    propertiesToTrade: {
        overflow: 'scroll',
        height: '250px'
    },
    text: {
        fontSize: '13px',
        fontWeight: 400,
        color: '#433F36',
        textAlign: 'center',
        fontFamily: 'VCR',
        margin: 0,
        marginBottom: '6px',
        maxWidth: '175px'
    },
    mortgage: {
        height: '18px',
        position: 'absolute',
        right: '0px',
        top: '14px',
    }
}))