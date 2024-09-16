import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'

export default function ErrorPopup(props){
    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch({type: "CLEAR_ERRORS"})
        }, 3500)

        return () => { clearTimeout(timeout) }
    }, [])
    
    return(
        <div className={classes.outer}>
            <div className={classes.shadow}></div>
            <div className={classes.container}>
                <div className={classes.topBox}>
                    <div style={{fontSize: '40', marginBottom: '20px'}}>Error</div>
                    {props.message}
                </div>
            </div>
        </div>
    )

}

const useStyles = makeStyles(() => ({
    outer: {
        width: '100vw',
        height: '100vh',
        position: 'absolute'
    },
    container: {
        width: '524px',
        backgroundColor: '#C4B299',
        borderRadius: '10px',
        boxShadow: '4px 4px 13px rgba(0, 0, 0, 0.15)',
        position: 'absolute',
        top: '40%',
        left: '0',
        right: '0',
        margin: 'auto',
        zIndex: 5,
        padding: '40px',
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
        borderRadius: '10px',
        backgroundColor: '#F7F2E7',
        fontSize: '27px',
        fontFamily: 'VCR',
        color: '#7A6E5D',
        padding: '30px',
        lineHeight: '30px',
        textAlign: 'center'
    },
}))
