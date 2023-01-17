import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'


export default function JailPopup(props){
    const classes = useStyles();
    const dispatch = useDispatch()

    let handleClose = () => {
        dispatch({type: "CLOSE_JAIL_POPUP"})
    }
    
    let handleUseJailCard = () => {
        dispatch({type: "USE_GET_OUT_OF_JAIL"})
    }


    return(
        <div className={classes.outer}>
            <div className={classes.shadow}></div>
            <div className={classes.container}>
                <div className={classes.topBox}>Use Get Out Of Jail Card</div>
                <div style={{display: 'flex', justifyContent: 'space-around', width: '78%'}}>
                    <button onClick={handleClose} className={classes.button} style={{width: '158px'}}>CANCEL</button>
                    <button onClick={handleUseJailCard} className={classes.button} style={{width: '158px'}}>USE CARD</button>
                </div>
            </div>
        </div>
    )

}

const useStyles = makeStyles(() => ({
    outer: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    container: {
        width: '524px',
        backgroundColor: '#C4B299',
        borderRadius: '10px',
        boxShadow: '4px 4px 13px rgba(0, 0, 0, 0.15)',
        top: '70px',
        position: 'absolute',
        top: '40%',
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
    propertyText: {
        fontFamily: 'ChelseaMarket',
        color: '#F15B45',
        fontSize: '42px',
        textAlign: 'center',
        margin: 0,
        marginBottom: '-10px',
        textShadow: '2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff'
    },
    topBox: {
        marginTop: '19px',
        height: '60px',
        width: '482px',
        borderRadius: '10px',
        backgroundColor: '#F7F2E7',
        fontSize: '25px',
        fontFamily: 'VCR',
        color: '#7A6E5D',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '40px'
    },
    wholeBox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        margin: 'auto',
        marginBottom: '15px',
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
        backgroundColor: '#7A6E5D'
    },
}))
