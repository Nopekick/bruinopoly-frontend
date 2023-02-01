import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import {playerDetails, cornerPos} from '../../config'
import PlayerToken from '../PlayerToken';

export default function Corner(props){
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
            {Object.keys(playerMap).length > 0 && players.filter(p => p.currentTile === props.id && !p.isBankrupt).map((player, i)=>{
                return <PlayerToken key={i} color={playerDetails[playerMap[player._id]].color} img={playerDetails[playerMap[player._id]].img} 
                        top={cornerPos[i].top} left={cornerPos[i].left} bankrupt={player.isBankrupt}/>
            })}
        </div>
    )

}

const useStyles = makeStyles(() => ({
    main: {
        height: '100px',
        width: '100px',
        position: 'relative'
    },
    icon: {
        height: '100%',
    }
}))