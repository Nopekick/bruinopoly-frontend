import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import {playerDetails, cornerPos} from '../../config'

export default function Corner(props){
    const players = useSelector(state => state.lobbyReducer.game.players)
    const classes = useStyles();

    const [playerMap, setPlayerMap] = useState({})

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
            {Object.keys(playerMap).length > 0 && players.filter(p => p.currentTile === props.id).map((player, i)=>{
                return <div key={i} style={{backgroundColor: playerDetails[playerMap[player._id]].color, top: cornerPos[i].top, left: cornerPos[i].left}} 
                className={classes.outerToken}>
                    <img alt="token" className={classes.token} src={playerDetails[playerMap[player._id]].img} />
                </div>
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