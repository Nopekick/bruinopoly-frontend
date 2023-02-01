import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export default function PlayerToken(props){
    const classes = useStyles(props);

    return(
        <div style={props.bankrupt ? {display: 'none'} : null} className={classes.outerToken}>
             <img alt="player token" className={classes.token} src={props.img} />
        </div>
    )
}

const useStyles = makeStyles({
    token: {
        height: '35px',
    },
    outerToken:  {
        backgroundColor: props => props.color,
        top: props => props.top,
        left: props => props.left,
        height: '43px',
        width: '43px',
        position: 'absolute',
        zIndex: 5,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black'
    }
})