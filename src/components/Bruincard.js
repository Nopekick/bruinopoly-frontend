import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import roycehall from '../assets/Royce.png';
import blob1 from '../assets/blob2.png'
import murphy from '../assets/murphy.png'
import {playerDetails} from '../config'

export default function Bruincard(props){
    const classes = useStyles();
    const [id, changeID] = useState(0)

    useEffect(()=>{
        props.info[1].forEach((p,i) => {
            if(p._id === props.info[0]) 
                changeID(i)
            return
        })
    },[])

    return (
        <div className={classes.container}>
           {props.user.turnsInJail !== 0 && <span className={classes.jailText}>Turns in Jail: {props.user.turnsInJail}</span>}
           <img alt="royce hall" className={classes.royce} src={roycehall} />
           <img alt="token character" className={classes.bman} src={playerDetails[id].img} />
           <img alt="colored blob" className={classes.blob} src={blob1} />
           <div className={classes.box}>
                <p style={{marginTop: '10px', marginBottom: '5px'}} className={classes.text}>{props.user.name.toUpperCase()}</p>
                <p className={classes.text}>{`$${props.user.money}`}</p>
                {props.jailCards >= 1 && <JailCard top="5px" />}
                {props.jailCards > 1 && <JailCard top="40px" />}
           </div>
           <div className={classes.bluebox} style={{backgroundColor: playerDetails[id].color}}>
                <p className={classes.b1}>BRUINOPOLY</p>
                <p className={classes.b2}>BRUINCARD</p>
           </div>
        </div>
    )
}

function JailCard(props){
    const dispatch = useDispatch()

    let handleUse = () => {
        dispatch({type:"OPEN_JAIL_POPUP"})
    }

    return <div onClick={handleUse} style={{height: '30px', width: '62px', borderRadius: '5px', backgroundColor: '#F5D34D', 
    position: 'absolute', right: '168px', top: props.top, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
        <img style={{width: '21px'}} src={murphy} />
    </div>
}

const useStyles = makeStyles(() => ({
    container: {
        width: '416px',
        height: '227px',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '-5px 4px 31px rgba(0, 0, 0, 0.1)',
        position: 'relative'
    },
    jailText: {
        fontSize: '21px',
        fontFamily: 'VCR',
        color: 'black',
        margin: 0,
        position: 'absolute',
        top: '8px',
        right: '17px'
    },
    royce: {
        position: 'absolute',
        bottom: '83px',
        left: '25px',
        height: '120px',
        width: 'auto',
        zIndex: '2'
    },
    bman: {
        position: 'absolute',
        height: '105px',
        width: 'auto',
        right: '28px',
        bottom: '68px'
    },
    blob: {
        position: 'absolute',
        width: '180px',
        height: '229px',
        left: '40px',
        bottom: '0px',
        transform: 'rotate(90deg)'
    },
    bluebox: {
        position: 'absolute',
        bottom: '11px',
        right: '12px',
        height: '75px',
        width: '155px',
        backgroundColor: '#B6DAD6',
        borderRadius: '10px',
        zIndex: '4',
        paddingLeft: '6px'
    },
    box: {
        position: 'absolute',
        bottom: '11px',
        left: '12px',
        width: '392px',
        height: '75px',
        backgroundColor: '#EFE9DB',
        borderRadius: '10px',
        zIndex: '3',
        paddingLeft: '12px',
        boxSizing: 'border-box'
    },
    b1: {
        fontSize: '22px',
        color: 'white',
        fontFamily: 'ChelseaMarket',
        letterSpacing: '0.05em',
        margin: 0,
        marginTop: '9px',
        marginBottom: '7px'
    },
    b2: {
        fontSize: '21px',
        fontFamily: 'VCR',
        color: '#FBF072',
        margin: 0,
        letterSpacing: '0.2em'
    },
    text: {
        fontSize: '25px',
        fontFamily: 'VCR',
        color: '#7A6E5D',
        margin: 0
    }
}))
