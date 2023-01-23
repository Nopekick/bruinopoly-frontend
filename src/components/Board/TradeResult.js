import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'

export default function TradeResult(){
    const classes = useStyles();
    const trade = useSelector(state => state.lobbyReducer.tradePopup) 
    const dispatch = useDispatch()

    let handleClose = () => {
        dispatch({type: "CANCEL_TRADE"})
    }
   
    return(
        <div style={{width: '100%', height: '100%'}}>
            <div className={classes.shadow}></div>
            <div className={classes.container}>
                <div className={classes.subBox}>
                    <p className={classes.innerText}>
                        {(trade.decision && trade.decision === "ACCEPTED") ? `${trade.sentTo} has accepted your trade offer!`
                        : ((trade.decision && trade.decision === "REJECTED") ? `${trade.sentTo} has rejected your trade offer.` 
                            : `Trade offer sent to ${trade.sentTo}. Awaiting their decision...`)}
                    </p>
                    {trade.decision !== "AWAITING" && <button onClick={handleClose} className={classes.button}>Close</button>}
                </div>
            </div>
        </div>
       
    )

}

//background color should depend on props
const useStyles = makeStyles(() => ({
    container: {
        width: '524px',
        height: '305px',
        borderRadius: '10px',
        boxShadow: '4px 4px 13px rgba(0, 0, 0, 0.15)',
        position: 'absolute',
        top: '220px',
        left: '108px',
        zIndex: 5,
        padding: '22px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#7A6E5D'
    },
    shadow: {
        width: '100%',
        height: '100%',
        zIndex: 2,
        backgroundColor: '#C4B299',
        opacity: 0.3,
        position: 'relative',
        borderRadius: '10px'
    },
    subBox: {
        width: '478px',
        height: '203px',
        backgroundColor: '#F7F2E7',
        borderRadius: '10px',
        marginTop: '15px',
        paddingTop: '10px',
        overflow: 'scroll',
        boxSizing: 'border-box'
    },
    innerText: {
        fontFamily: 'VCR',
        fontSize: '25px',
        fontWeight: 400,
        margin: 'auto',
        textAlign: 'center',
        lineHeight: '34px',
        maxWidth: '85%',
        color: '#433F36',
        marginTop: '30px',
        marginBottom: '30px'
    },
    button: {
        color: 'white',
        width: '130px',
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
        margin: 'auto'
    }
}))