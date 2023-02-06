import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import {PROPERTIES, getColor} from '../../config';

export default function PropertyPopup(){
    const player = useSelector(state => state.lobbyReducer.userInfo)
    const thisPopup = useSelector(state => state.lobbyReducer.propertyPopup)
    const properties = useSelector(state => state.lobbyReducer.game.properties)
    const me = useSelector(state => state.lobbyReducer.game.players.find((p)=> p._id === player.id))
    const classes = useStyles();
    const dispatch = useDispatch()

    let handleClose = () => {
        dispatch({type: "CLOSE_DORM"})
    }
    
    // useEffect(()=>{
    //     console.log("properties has changed", properties)
    // }, [properties])

    let handleDormTransaction = (propertyNum) => {
        if(thisPopup.buy === true && properties[propertyNum].dormCount < 5 && me.money > PROPERTIES[propertyNum].dormCost 
            && checkProposedDormTransaction(properties[propertyNum].dormCount + 1, propertyNum, properties)){

            dispatch({type: "BUY_DORM", propertyId: propertyNum, playerId: player.id, send: true})
        } else if(thisPopup.sell === true && properties[propertyNum].dormCount > 0 
            && checkProposedDormTransaction(properties[propertyNum].dormCount - 1, propertyNum, properties)){

            dispatch({type: "SELL_DORM", propertyId: propertyNum, playerId: player.id, send: true})
        }
    }


    return(
        <div style={{width: '100%', height: '100%'}}>
            <div className={classes.shadow}></div>
            <div className={classes.container}>
                <div className={classes.propertyText}>{thisPopup.buy === true ? "BUY" : "SELL"}</div>
                <div className={classes.topBox}>{thisPopup.buy === true ? "BUY" : "SELL"} DORMS/APTS</div>

                <div className={classes.box}>
                    <div className={classes.colorBar}>{player.name}</div>
                    <div style={{height: '300px', overflow: 'scroll'}}>
                    {me.propertiesOwned.filter(p => properties[p].isMortgaged === false).map((p, i)=>{
                        if(ownAll(p, me.propertiesOwned)){
                            return <div className={classes.wholeBox} key={i}>
                                <div className={classes.propertyBox}>
                                    <div style={{backgroundColor: getColor(p)}} className={classes.typeBox}></div>
                                    <p className={classes.text}>{PROPERTIES[p].name}</p>
                                </div>
                                <div className={classes.boxOfBoxes}>
                                    {/*  Below (good) code was buggy and did not correctly show the box colors when selling dorms. Bad code (copy/paste) works */
                                    /* <div className={classes.boxOfBoxes}>
                                        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                            <div className={classes.fillInBox} style={{backgroundColor: properties[p].dormCount >= 1 ? "#72E7DA" : 'none'}}>{properties[p].dormCount}</div>
                                            <div className={classes.fillInBox} style={{backgroundColor: properties[p].dormCount >= 2 ? "#72E7DA" : 'none'}}></div>
                                            <div className={classes.fillInBox} style={{backgroundColor: properties[p].dormCount >= 3 ? "#72E7DA" : 'none'}}></div>
                                            <div className={classes.fillInBox} style={{backgroundColor: properties[p].dormCount >= 4 ? "#72E7DA" : 'none'}}></div>
                                        </div>
                                        <div className={classes.bigFillInBox} style={{backgroundColor: properties[p].dormCount === 5 ? "#72E7DA" : 'none'}}></div>
                                    </div>
                                    */}
                                    {
                                        properties[p].dormCount === 0 && <Fragment>
                                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <div className={classes.fillInBox} style={{backgroundColor: 'none'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: 'none'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: 'none'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: 'none'}}></div>
                                            </div>
                                            <div className={classes.bigFillInBox} style={{backgroundColor: 'none'}}></div>
                                        </Fragment>
                                    }
                                    {
                                        properties[p].dormCount === 1 && <Fragment>
                                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: 'none'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: 'none'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: 'none'}}></div>
                                            </div>
                                            <div className={classes.bigFillInBox} style={{backgroundColor: 'none'}}></div>
                                        </Fragment>
                                    }
                                    {
                                        properties[p].dormCount === 2 && <Fragment>
                                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: 'none'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: 'none'}}></div>
                                            </div>
                                            <div className={classes.bigFillInBox} style={{backgroundColor:'none'}}></div>
                                        </Fragment>
                                    }
                                    {
                                        properties[p].dormCount === 3 && <Fragment>
                                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: 'none'}}></div>
                                            </div>
                                            <div className={classes.bigFillInBox} style={{backgroundColor:'none'}}></div>
                                        </Fragment>
                                    }
                                    {
                                        properties[p].dormCount === 4 && <Fragment>
                                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                            </div>
                                            <div className={classes.bigFillInBox} style={{backgroundColor:'none'}}></div>
                                        </Fragment>
                                    }
                                    {
                                        properties[p].dormCount === 5 && <Fragment>
                                            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                                <div className={classes.fillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                            </div>
                                            <div className={classes.bigFillInBox} style={{backgroundColor: '#72E7DA'}}></div>
                                        </Fragment>
                                    }
                                </div>
                                <button onClick={()=>{handleDormTransaction(p)}} className={classes.transactionButton}
                                    style={(thisPopup.sell === true && properties[p].dormCount === 0) || 
                                        (thisPopup.buy === true && me.money < PROPERTIES[p].dormCost) ||
                                         (thisPopup.buy === true && properties[p].dormCount === 5) ? {opacity: '0.4', cursor: 'default'} : null}>
                                       {thisPopup.buy === true ? "BUY" : "SELL"}
                                </button>
                            </div>
                        } else {
                            return null
                        }
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

let ownAll = (propertyNum, ownedProperties) => {
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
    } else {
        return false
    }
}

let checkProposedDormTransaction = (proposedDormCount, propertyNum, properties) => {
    if(propertyNum === 1 && Math.abs(properties[1].dormCount - proposedDormCount) === 1 && Math.abs(properties[3].dormCount - proposedDormCount) === 1){
        return true;
    } else if(propertyNum === 3 && Math.abs(properties[1].dormCount - proposedDormCount) <= 1 && Math.abs(properties[3].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 6 && Math.abs(properties[6].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[8].dormCount - proposedDormCount) <= 1 && Math.abs(properties[9].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 8 && Math.abs(properties[6].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[8].dormCount - proposedDormCount) <= 1 && Math.abs(properties[9].dormCount - proposedDormCount) <=1 ){
        return true;
    } else if(propertyNum === 9 && Math.abs(properties[6].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[8].dormCount - proposedDormCount) <= 1 && Math.abs(properties[9].dormCount - proposedDormCount) <=1){
        return true;
    } else if(propertyNum === 11 && Math.abs(properties[11].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[13].dormCount - proposedDormCount) <= 1 && Math.abs(properties[14].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 13 && Math.abs(properties[11].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[13].dormCount - proposedDormCount) <= 1 && Math.abs(properties[14].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 14 && Math.abs(properties[11].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[13].dormCount - proposedDormCount) <= 1 && Math.abs(properties[14].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 16 && Math.abs(properties[16].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[18].dormCount - proposedDormCount) <= 1 && Math.abs(properties[19].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 18 && Math.abs(properties[16].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[18].dormCount - proposedDormCount) <= 1 && Math.abs(properties[19].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 19 && Math.abs(properties[16].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[18].dormCount - proposedDormCount) <= 1 && Math.abs(properties[19].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 21 && Math.abs(properties[21].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[23].dormCount - proposedDormCount) <= 1 && Math.abs(properties[24].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 23 && Math.abs(properties[21].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[23].dormCount - proposedDormCount) <= 1 && Math.abs(properties[24].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 24 && Math.abs(properties[21].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[23].dormCount - proposedDormCount) <= 1 && Math.abs(properties[24].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 26 && Math.abs(properties[26].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[27].dormCount - proposedDormCount) <= 1 && Math.abs(properties[29].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 27 && Math.abs(properties[26].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[27].dormCount - proposedDormCount) <= 1 && Math.abs(properties[29].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 29 && Math.abs(properties[26].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[27].dormCount - proposedDormCount) <= 1 && Math.abs(properties[29].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 31 && Math.abs(properties[31].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[32].dormCount - proposedDormCount) <= 1 && Math.abs(properties[34].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 32 && Math.abs(properties[31].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[32].dormCount - proposedDormCount) <= 1 && Math.abs(properties[34].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 34 && Math.abs(properties[31].dormCount - proposedDormCount) <= 1 
        && Math.abs(properties[32].dormCount - proposedDormCount) <= 1 && Math.abs(properties[34].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 37 && Math.abs(properties[37].dormCount - proposedDormCount) <= 1 && Math.abs(properties[39].dormCount - proposedDormCount) <= 1){
        return true;
    } else if(propertyNum === 39 && Math.abs(properties[37].dormCount - proposedDormCount) <= 1 && Math.abs(properties[39].dormCount - proposedDormCount) <= 1){
        return true;
    } else {
        return false
    }
}