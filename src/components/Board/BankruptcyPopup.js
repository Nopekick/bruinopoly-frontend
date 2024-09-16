import React, { useRef, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { declareBankruptcy } from '../../reducers/lobby';

export default function BankruptcyPopup(props){
    const classes = useStyles();
    const wrapperRef = useRef(null);
    const dispatch = useDispatch();
    const bankruptcy = useSelector(state => state.lobbyReducer.bankruptcy)

    useEffect(()=>{
        const timeout = setTimeout(()=>{
            if(bankruptcy.impossible) {
                dispatch(declareBankruptcy())
            } 
            dispatch({type: "CLOSE_BANKRUPTCY"})
        }, 10000)

        return () => { clearTimeout(timeout)}
    }, [])

    return(
        <div  style={{width: '100%', height: '100%'}}>
            <div className={classes.shadow}></div>
            <div ref={wrapperRef} className={classes.container} style={{backgroundColor: "#7A6E5D"}}>
                <p className={classes.titleText}>{bankruptcy.impossible ? "BANKRUPTCY" : "ESCAPE BANKRUPTCY"}</p>
                <div className={classes.subBox}>
                    <p className={classes.innerText} style={{color: '#433F36', marginBottom: '12px'}}>
                       {props.name}
                    </p>
                    <p className={classes.innerText} style={{color: '#7A6E5D'}}>
                        {bankruptcy.impossible ? `Your money is currently negative, but your asset wealth is not high enough to escape bankruptcy. 
                            You are bankrupt. Your properties will be returned to the bank, and you will no longer be able to play.`
                         : `Your money is currently negative, but your asset wealth is high enough to escape bankruptcy. Sell your dorms, mortgage your properties, 
                            sell your Get Out Of Jail Cards, and if you're feeling lucky, trade with other players. When you have positive money, confirm to begin your turn.`}
                    </p>
                </div>
            </div>
        </div>
       
    )

}

//background color should depend on props
const useStyles = makeStyles(() => ({
    container: {
        width: '524px',
        height: '360px',
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
    titleText: {
        fontSize: '35px',
        fontFamily: 'ChelseaMarket',
        fontWeight: 400,
        color: 'white',
        textShadow: '2.3341px 2.3341px 0px rgba(0, 0, 0, 0.25)',
        margin: 0,
    },
    subBox: {
        width: '478px',
        height: '260px',
        backgroundColor: '#F7F2E7',
        borderRadius: '10px',
        marginTop: '15px',
        paddingTop: '7px',
        overflow: 'scroll',
        boxSizing: 'border-box'
    },
    innerText: {
        fontFamily: 'VCR',
        fontSize: '22px',
        fontWeight: 400,
        margin: 'auto',
        textAlign: 'center',
        lineHeight: '33px',
        maxWidth: '90%'
    }
}))