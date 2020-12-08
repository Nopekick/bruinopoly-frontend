import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clock from '../assets/Groupclock.png'

export default function Sidebar(props){

    const classes = useStyles();

    var playersList = props.playersList

    var players =[]

    for(var i = 0; i < playersList.length; i++){
        players.push(
            <div className={classes.playersNames}>{playersList[i].toUpperCase()}</div>
        )
    }

    return(
        <div className={classes.container}>
            <div className={classes.bruinopoly}>BRUINOPOLY</div>
            <div className={classes.name}>{props.name.toUpperCase()}</div>
            <div className={classes.timeLeft}>
                <img src={clock} className={classes.clock}></img>
                <div>0:00 left</div>
            </div>
            <div className={classes.playersText}>PLAYERS</div>
            {players}
        </div>
    )

}

const useStyles = makeStyles(() => ({
    container: {
        margin: '50px 0px 0px 50px',
        fontFamily: 'VCR',
        width: '25%'
    },
    bruinopoly: {
        fontFamily: 'ChelseaMarket',
        fontSize: '46px',
        lineHeight: '59px',
        color: '#433F36'
    },
    name: {
        fontSize: '32px',
        lineHeight: '46px',
        color: '#433F36'
    },
    timeLeft: {
        margin: '40px 0px 40px 0px',
        backgroundColor: '#7A6E5D',
        borderRadius: '12px',
        height: '61px',
        width: '267px',
        color: 'white',
        fontSize: '32px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    clock: {
        height: '80%',
    },
    playersText: {
        margin: '25px 0px 25px 0px',
        color: '#433F36',
        fontSize: '29px',
        lineHeight: '28px'
    },
    playersNames: {
        margin: '15px 0px 15px 0px',
        color: '#7A6E5D',
        fontSize: '29px',
        lineHeight: '28px'
    }
}))