import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import {playerDetails, jailPosNoJail, jailPosJail} from '../../config'

export default function Jail(props){
    const players = useSelector(state => state.lobbyReducer.game.players)
    const [playerMap, setPlayerMap] = useState({})
    const classes = useStyles();

    //TODO: move this out of Corner.js, redundant work
    useEffect(()=>{
        let obj = {}
        for(let i = 0; i < players.length; i++){
            obj[players[i]._id] = i
        }
        setPlayerMap(obj)
    }, [])

    return(
        <div className={classes.main}>
            <img alt="corner type" src={props.icon} className={classes.icon}/>
            {Object.keys(playerMap).length > 0 && players.filter(p => p.currentTile === props.id && p.turnsInJail !== 0).map((player, i)=>{
                return <div key={i} style={{backgroundColor:playerDetails[playerMap[player._id]].color, top: jailPosJail[i].top, left: jailPosJail[i].left}}
                    className={classes.outerToken}>
                    <img alt="token" className={classes.token} src={playerDetails[playerMap[player._id]].img} />
                </div>
            })}
            {Object.keys(playerMap).length > 0 && players.filter(p => p.currentTile === props.id && p.turnsInJail === 0).map((player, i)=>{
                return <div key={i} style={{backgroundColor: playerDetails[playerMap[player._id]].color, top: jailPosNoJail[i].top, left: jailPosNoJail[i].left}} 
                    className={classes.outerToken}>
                    <img alt="token" className={classes.token} src={playerDetails[playerMap[player._id]].img} />
                </div>
            })}
        </div>
    )

    // {players.map((player, i)=>{
    //     if(player.currentTile === props.id)
    //         if(player.turnsInJail === 0)
    //             return <div key={i} style={{backgroundColor: playerDetails[i].color, left: '-10px', top: '10px'}} className={classes.outerToken}>
    //                 <img alt="token" className={classes.token} src={playerDetails[i].img} />
    //             </div>
    //         else 
    //             return <div key={i}  style={{backgroundColor: playerDetails[i].color, left: '40px', top: '10px'}} className={classes.outerToken}>
    //                 <img alt="token" className={classes.token} src={playerDetails[i].img} />
    //             </div>
    //     else
    //         return null
    // })}
}

const useStyles = makeStyles(() => ({
    main: {
        height: '100px',
        width: '100px',
        position: 'relative'
    },
    icon: {
        height: '100%',
    },
    token: {
        height: '35px',
    },
    outerToken: {
        height: '43px',
        width: '43px',
        position: 'absolute',
        left: '10px',
        top: '10px',
        zIndex: 5,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black'
    }
}))