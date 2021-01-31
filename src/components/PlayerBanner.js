import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import bruin from '../assets/bruinman.png'

export default function PlayerBanner(props){
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.circle}>
                <img alt="bruin man" className={classes.bman} src={bruin} />
            </div>
            <div className={classes.triangle}></div>
            <div className={classes.bar}>{props.name.toUpperCase()}</div>
            <div className={classes.money}>{`$${props.money}`}</div>
        </div>
    )
}

const useStyles = makeStyles(() => ({
    container: {
        width: '417px',
        height: '113px',
        position: 'relative'
    },
    circle: {
        position: 'absolute',
        height: '108px',
        width: '108px',
        backgroundColor: 'white',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '2'
    },
    bman: {
        height: '80px',
    },
    bar: {
        height: '51px',
        width: '337px',
        backgroundColor: '#B6DAD6',
        position: 'absolute',
        top: '14px',
        left: '65px',
        fontFamily: 'VCR',
        color: '#7A6E5D',
        fontSize: '25px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '60px',
        boxSizing: 'border-box'
    },
    money: {
        height: '44px',
        width: '223px',
        backgroundColor: '#FBF072',
        borderRadius: '0px 0px 5px 5px',
        position: 'absolute',
        top: '65px',
        left: '114px',
        fontFamily: 'VCR',
        color: '#7A6E5D',
        fontSize: '25px',
        boxSizing: 'border-box',
        paddingTop: '10px',
        paddingLeft: '15px'
    },
    triangle: {
        height: '0px',
        width: '0px',
        border: '25px solid transparent',
        borderRight: '30px solid #F2F2F2',
        position: 'absolute',
        right: '15px',
        top: '14px',
        zIndex: '2'
    }
}))
