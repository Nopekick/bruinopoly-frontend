import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {PROPERTIES, getColor} from '../../config'
import {handlePurchase} from '../../reducers/lobby'
import { makeStyles } from '@material-ui/core/styles';
import PropertyInfoCard from './PropertyInfoCard';

export default function SalePopup(props){
    const [canAfford, changeAfford] = useState(true)
    const dispatch = useDispatch()
    const classes = useStyles();
    const property = PROPERTIES[props.property]
    const players = useSelector(state => state.lobbyReducer.game.players)
    const user = useSelector(state => state.lobbyReducer.userInfo)

    useEffect(()=>{
        let player = players.filter(p => p._id === user.id)[0]

        if(player.money < property.price){
            changeAfford(false)
        }
    },[])

    return(
        <div style={{width: '100%', height: '100%'}}>
            <div className={classes.shadow}></div>
            <div className={classes.container}>
                <div className={classes.saleText}>FOR SALE</div>
                <div className={classes.topBox}>${property.price}</div>
                <div style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between', width: '482px', marginTop: '24px'}}>
                    <div className={classes.box}>
                        <div className={classes.colorBar} style={{backgroundColor: getColor(props.property)}}></div>
                        <p className={classes.leftText} style={{marginBottom: '20px', marginTop: '15px'}}>{property.name}</p>
                        <button className={classes.button} style={{width: '158px', opacity: canAfford ? 1 : .5, cursor: canAfford ? 'pointer' : 'default'}} 
                            onClick={()=>{if(!canAfford) return; dispatch(handlePurchase({buy: true, property: props.property}))}}>BUY</button>
                        <button className={classes.button} style={{width: '158px'}}
                             onClick={()=>{dispatch(handlePurchase({buy: false, property: props.property}))}}>SKIP</button>
                        <p className={classes.leftText}>Price: ${property.price}</p>
                    </div>
                    <PropertyInfoCard property={props.property} />
                </div>
            </div>
        </div>
       
    )

}

const useStyles = makeStyles(() => ({
    container: {
        width: '524px',
        height: '526px',
        backgroundColor: '#C4B299',
        borderRadius: '10px',
        boxShadow: '4px 4px 13px rgba(0, 0, 0, 0.15)',
        position: 'absolute',
        top: '108px',
        left: '108px',
        zIndex: 6,
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        color: 'white',
        borderRadius: '5px',
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
        backgroundColor: '#7A6E5D',
        margin: 'auto',
        marginBottom: '21px'
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
    saleText: {
        fontFamily: 'ChelseaMarket',
        color: '#A8DDD7',
        fontSize: '42px',
        textAlign: 'center',
        margin: 0,
        marginBottom: '10px',
        textShadow: '2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff'
    },
    topBox: {
        height: '38px',
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
        height: '337px',
        width: '227px',
        boxSizing: 'border-box'
    },
    colorBar: {
        height: '49px',
        backgroundColor: '#EAACA3',
        width: '100%',
        borderTopLeftRadius: '10px',
        borderTopRightRadius: '10px'
    },
    leftText: {
        fontFamily: 'ChelseaMarket',
        fontSize: '26px',
        color: '#433F36',
        fontWeight: 400,
        textAlign: 'center'
    },
}))