import React, { useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'

export default function CardPopup(props){
    const classes = useStyles();
    const wrapperRef = useRef(null);
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    useOutsideAlerter(wrapperRef);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if(props.chest) {
                dispatch({type: "CLOSE_CHEST"})
            } else if(props.chance) {
                dispatch({type: "CLOSE_CHANCE"})
            } else if(props.doubles) {
                dispatch({type: "CLOSE_DOUBLES"})
            }
        }, 5000)

        return () => { clearTimeout(timeout) }
    }, [])

    const doubleText = props.doubles && props.doubles.number === 3 ? "YOU ROLLED A DOUBLE THREE TIMES IN A ROW. GO TO MURPHY" : "YOU ROLLED A DOUBLE. ROLL AGAIN"
   
    return(
        <div  style={{width: '100%', height: '100%'}}>
            <div className={classes.shadow}></div>
            <div ref={wrapperRef} className={classes.container} style={{backgroundColor: props.chance ? "#F5D34D" : (props.chest ? "#A8DDD7" : "#7A6E5D")}}>
                <p className={classes.titleText}>
                    {props.chance ? "EXCUSE ME SIR" : (props.chest ? "FINANCIAL AID OFFICE" : (props.doubles && props.doubles.number === 3 ? "GO TO MURPHY" : "ROLL AGAIN!"))}
                </p>
                <div className={classes.subBox}>
                    <p className={classes.innerText} style={{color: '#433F36', marginBottom: '12px'}}>
                       {props.name}
                    </p>
                    <p className={classes.innerText} style={{color: '#7A6E5D'}}>{props.info ? props.info.text.toUpperCase() : doubleText}</p>
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
        fontSize: '38px',
        fontFamily: 'ChelseaMarket',
        fontWeight: 400,
        color: 'white',
        textShadow: '2.3341px 2.3341px 0px rgba(0, 0, 0, 0.25)',
        margin: 0,
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
        maxWidth: '90%'
    }
}))

function useOutsideAlerter(ref) {
    const dispatch = useDispatch()
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                dispatch({type: "CLOSE_CARDS"})
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}