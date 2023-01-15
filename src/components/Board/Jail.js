import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import {playerDetails} from '../../config'

export default function Jail(props){
    const players = useSelector(state => state.lobbyReducer.game.players)
    const classes = useStyles();

    return(
        <div className={classes.main}>
            <img alt="corner type" src={props.icon} className={classes.icon}/>
            {players.map((player, i)=>{
                if(player.currentTile === props.id)
                    if(player.turnsInJail === 0)
                        return <div key={i} style={{backgroundColor: playerDetails[i].color, left: '-10px', top: '10px'}} className={classes.outerToken}>
                            <img alt="token" className={classes.token} src={playerDetails[i].img} />
                        </div>
                    else 
                        return <div key={i}  style={{backgroundColor: playerDetails[i].color, left: '40px', top: '10px'}} className={classes.outerToken}>
                            <img alt="token" className={classes.token} src={playerDetails[i].img} />
                        </div>
                else
                    return null
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