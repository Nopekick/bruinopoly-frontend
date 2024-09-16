import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import bruin from '../../assets/bruinman.png'

export default function Winner(props){
    const classes = useStyles();
    const dispatch = useDispatch()

    let handleClose = () => {
        dispatch({type: "LEAVE_ROOM"})
    }

    return(
        <div className={classes.container}>
            <div className={classes.shadow}></div>
            <div className={classes.box}>
                <div className={classes.topBox}>
                    <div style={{marginBottom: '15px', fontSize: '40px'}}>GAME OVER!</div>
                    <div>The winner is <em>{props.winner.winner}</em> with ${props.winner.maxWealth}</div>
                    <img alt="bruinman" src={bruin} className={classes.bman1} />
                    <img alt="bruinman" src={bruin} className={classes.bman2} />
                </div>
                <button onClick={handleClose} className={classes.button}>Back to Lobby</button>
            </div>
        </div>
    )

}

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    bman1: {
        position: 'absolute',
        height: '80px',
        top: '20px',
        left: '30px',
        animation: '$bman 2s step-end infinite',
        userSelect: 'none'
    },
    bman2: {
        position: 'absolute',
        height: '80px',
        top: '20px',
        right: '37px',
        animation: '$bman 2s step-end infinite',
        userSelect: 'none'
    },
    box: {
        width: '524px',
        backgroundColor: '#C4B299',
        borderRadius: '10px',
        boxShadow: '4px 4px 13px rgba(0, 0, 0, 0.15)',
        position: 'absolute',
        top: '25%',
        left: '0',
        right: '0',
        margin: 'auto',
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
        opacity: 0.5,
        position: 'relative',
        borderRadius: '10px'
    },
    topBox: {
        marginTop: '25px',
        boxSizing: 'border-box',
        padding: '0px 35px 0px 35px',
        height: '200px',
        width: '482px',
        borderRadius: '10px',
        backgroundColor: '#F7F2E7',
        fontSize: '25px',
        fontFamily: 'VCR',
        color: '#7A6E5D',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '20px',
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
        backgroundColor: '#7A6E5D',
        padding: '20px'
    },
    text: {
        fontSize: '16px',
        fontWeight: 400,
        color: '#433F36',
        textAlign: 'center',
        fontFamily: 'VCR',
        margin: 0,
        maxWidth: '175px'
    },
    "@keyframes bman": {
        "0%": {
          transform: "rotate(25deg)"
        },
        "50%": {
          transform: "rotate(-25deg)"
        }
      },
}))