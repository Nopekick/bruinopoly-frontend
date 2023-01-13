import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import paw from '../assets/palepaw.png'


export default function Room(props){
    const classes = useStyles();
    var playerDots = []

    for(var i=0; i<props.numberOfPlayers; i++){
        var leftPercent = 50 - (50*Math.cos(i*(Math.PI/4)))
        var topPercent = 50 - (50*Math.sin(i*(Math.PI/4)))
        playerDots.push(
            <div className={classes.dot} key={i}
                style={{
                    left: leftPercent + '%',
                    top: topPercent + '%',
                    transform: 'translate(-50%, -50%)',
                }}>
            </div> 
        )
    }

    return (
        <button onClick={props.onClick} className={classes.main}>
            <div className={classes.roomNumberHolder}>
                <p className={classes.roomNumber}>{props.name}</p>
            </div>
            <div className={classes.table}> 
                <img alt="paw" className={classes.paw} src={paw}></img>
                <p className={classes.numberOfPlayers}>{props.numberOfPlayers}/8</p>
                {playerDots}
            </div>
            <div className={classes.gameTimeHolder}>
                <p style={{margin: '5px'}}>GAME TIME</p>
                <p className={classes.gameTime}>{props.gameTime}</p>
            </div>
        </button>
    )
}

const useStyles = makeStyles(() => ({
    main: {
        margin: '5px',
        fontFamily: 'VCR',
        height: '245px',
        width: '184px',
        backgroundColor: '#DED3C1',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        overflow: 'hidden'

    },
    roomNumberHolder: {
        margin: "5px",
        width: '135px',
        height: '28px',
        textAlign: 'center',
        zIndex: '100'
    },
    roomNumber: {
        margin: '0',
        wordBreak: 'break-all',
        maxHeight: '100px',
        color: "#FFFFFF",
        //border: '1px solid #433F36',
        textShadow: '2px 2px 0px #433F36',
        fontSize: '25px',
    },
    table: {
        height: "116px",
        width: "116px",
        backgroundColor: '#EFE9DB',
        margin: '10px',
        borderRadius: '50%',
        position: 'relative',
    },
    paw: {
        position: 'absolute',
        height: '61px',
        width: '61px',
        color: 'DED3C1',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    numberOfPlayers: {
        color: '#7A6E5D',
        margin: '0px',
        fontFamily: 'ChelseaMarket',
        fontSize: '30px',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
    dot: {
        backgroundColor: '#C4B299',
        height: '20px',
        width: '20px',
        borderRadius: '50%',
        margin: '0px',
        position: 'absolute'
    },
    gameTimeHolder: {
        height: '57px',
        width: '166px',
        backgroundColor: '#EFE9DB',
        borderRadius: '10px',
        margin: '5px',
        display: 'flex',
        color: '#FFFFFF',
        fontSize: '16px',
        textShadow: '2px 2px 0px #433F36',
        flexDirection: 'column',
        alignItems: 'center'
    },
    gameTime: {
        color: '#7A6E5D',
        fontSize: '20px',
        textShadow: 'none',
        margin: '5px'
    }
}))