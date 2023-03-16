import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import PropertyInfoCard from './PropertyInfoCard';

export default function PropertyInfoPopup(props){
    const dispatch = useDispatch()
    const classes = useStyles();
   
    return(
        <div style={{width: '100%', height: '100%'}}>
            <div className={classes.shadow}></div>
            <div className={classes.container}>
                    <PropertyInfoCard property={props.property} />
                    <p className={classes.close} onClick={()=>{dispatch({type: 'CLOSE_PROPERTY_INFO'})}}>X</p>
            </div>
        </div>
    )
}

const useStyles = makeStyles(() => ({
    container: {
        width: '350px',
        height: '390px',
        backgroundColor: '#C4B299',
        borderRadius: '10px',
        boxShadow: '4px 4px 13px rgba(0, 0, 0, 0.15)',
        position: 'absolute',
        top: '150px',
        left: '190px',
        zIndex: 6,
        padding: '20px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    shadow: {
        width: '100%',
        height: '100%',
        zIndex: 5,
        backgroundColor: '#C4B299',
        opacity: 0.3,
        position: 'relative',
        borderRadius: '10px'
    },
    close: {
        position: 'absolute',
        top: '-4px',
        right: '20px',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '22px'
    }
}))