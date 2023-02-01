import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import {PROPERTIES, getColor} from '../../config';

import mortgageImg from '../../assets/mortgage_red.png'

export default function MortgagePopup(props){
    const player = useSelector(state => state.lobbyReducer.userInfo)
    const properties = useSelector(state => state.lobbyReducer.game.properties)
    const me = useSelector(state => state.lobbyReducer.game.players.find((p)=> p._id === player.id))
    const classes = useStyles();
    const dispatch = useDispatch()

    let handleClose = () => {
        dispatch({type: "CLOSE_MORTGAGE"})
    }
    

    let handleMortgage = (propertyNum, actionType) => {
        if(actionType === "MORTGAGE" && (properties[propertyNum].dormCount !== 0))
            return
        if(actionType === "LIFT MORTGAGE" && (me.money < PROPERTIES[propertyNum].mortgage * 1.1))
            return

        dispatch({type: "MORTGAGE", propertyNum, actionType, playerId: player.id, send: true})
    }


    return(
        <div style={{width: '100%', height: '100%'}}>
            <div className={classes.shadow}></div>
            <div className={classes.container}>
                <div className={classes.propertyText}>Mortgage</div>
                <div className={classes.topBox}>MORTGAGE YOUR PROPERTIES</div>

                <div className={classes.box}>
                    <div className={classes.colorBar}>{player.name}</div>
                    <div style={{height: '300px', overflow: 'scroll'}}>
                    {me.propertiesOwned.filter((p) => properties[p].dormCount === 0).map((p, i)=>{
                            if(properties[p].isMortgaged)
                                return <div className={classes.wholeBox} key={i}>
                                            <div key={i} className={classes.propertyBox}>
                                                <div style={{backgroundColor: getColor(p)}} className={classes.typeBox}></div>
                                                <p className={classes.text}>{PROPERTIES[p].name}</p>
                                            </div>
                                            <div className={classes.mortgageBox} key={i}> 
                                                <img src={mortgageImg} alt="mortgage" className={classes.mortgagePic}/>
                                            </div>
                                            <button onClick={()=>{handleMortgage(p, "LIFT MORTGAGE")}} className={classes.transactionButton}
                                                style={(me.money < PROPERTIES[p].mortgage * 1.1) ? {opacity: '0.4', cursor: 'default'} : null}>
                                                UN-MORTGAGE
                                            </button>
                                    </div>
                                
                            else 
                            return <div className={classes.wholeBox} key={i}>
                                <div key={i} className={classes.propertyBox}>
                                    <div style={{backgroundColor: getColor(p)}} className={classes.typeBox}></div>
                                    <p className={classes.text}>{PROPERTIES[p].name}</p>
                                </div>
                                <div className={classes.boxOfBoxes}>
                                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                        <div className={classes.fillInBox} style={{backgroundColor: properties[p].dormCount >= 1 ? "#72E7DA" : 'none'}}>{properties[p].dormCount}</div>
                                        <div className={classes.fillInBox} style={{backgroundColor: properties[p].dormCount >= 2 ? "#72E7DA" : 'none'}}></div>
                                        <div className={classes.fillInBox} style={{backgroundColor: properties[p].dormCount >= 3 ? "#72E7DA" : 'none'}}></div>
                                        <div className={classes.fillInBox} style={{backgroundColor: properties[p].dormCount >= 4 ? "#72E7DA" : 'none'}}></div>
                                    </div>
                                    <div className={classes.bigFillInBox} style={{backgroundColor: properties[p].dormCount === 5 ? "#72E7DA" : 'none'}}></div>
                                </div>
                                <button onClick={()=>{handleMortgage(p, "MORTGAGE")}} className={classes.transactionButton}
                                    style={(properties[p].dormCount !== 0) ? {opacity: '0.4', cursor: 'default'} : null}>
                                       MORTGAGE
                                </button>
                            </div>
                    })}
                    </div>
                </div>
                <button onClick={handleClose} className={classes.button} style={{width: '143px'}}>CONFIRM</button>
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
        top: '70px',
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
    propertyText: {
        fontFamily: 'ChelseaMarket',
        color: '#F15B45',
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
        backgroundColor: '#F7F2E7',
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
        width: '482px',
        marginTop: '19px',
        marginBottom: '16px',
        boxSizing: 'border-box',
    },
    wholeBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        margin: 'auto',
        marginBottom: '15px',
    },
    mortgageBox: {
        width: '113px',
        height: '45px',
        border: '0.5px dashed #F15B45',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    mortgagePic: {
        width: '75px'
    },
    boxOfBoxes: {
        width: '115px',
        height: '47px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    fillInBox: {
        height: '20px',
        width: '20px',
        border: '0.5px dashed #000000'
    },
    bigFillInBox: {
        border: '0.5px dashed #000000',
        height: '20px',
        width: '113px'
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
        color: '#433F36',
        marginBottom: '15px'
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
    transactionButton: {
        width: '111px',
        height: '42px',
        backgroundColor: '#DADADA',
        borderRadius: '5px',
        color: '#433F36',
        fontSize: '20px',
        fontFamily: 'VCR',
        cursor: 'pointer',
        border: 'none'
    },
    propertyBox: {
        height: '46px',
        width: '199px',
        backgroundColor: 'white',
        position: 'relative',
        paddingLeft: '30px',
        paddingTop: '7px',
        boxSizing: 'border-box',
    },
    typeBox: {
        height: '38px',
        width: '17px',
        backgroundColor: 'black',
        top: '4px',
        left: '5px',
        position: 'absolute',
    },
    text: {
        fontSize: '16px',
        fontWeight: 400,
        color: '#433F36',
        textAlign: 'center',
        fontFamily: 'VCR',
        margin: 0,
        maxWidth: '175px'
    }
}))
