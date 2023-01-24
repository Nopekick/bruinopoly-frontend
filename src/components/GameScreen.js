import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {Redirect} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import decode from 'jwt-decode'
import { mapIdToName, ENV } from '../config';
import { checkSocket } from '../reducers/lobby';

import Board from '../containers/Board';
import Sidebar from './Sidebar';
import WinPopup from './Board/WinPopup'
import JailPopup from './Board/JailPopup';
import Chat from './Chat';

import paw from '../assets/loadingpaw.png';

export default function GameScreen(props){
    const classes = useStyles();
    const dispatch = useDispatch();
    const token = useSelector(state => state.lobbyReducer.token)
    const socket = useSelector(state => state.lobbyReducer.socket)
    const heightMatch = useMediaQuery('(max-height:800px)');

    useEffect(() => {
        dispatch(checkSocket())
    }, [socket])

    let handleStart = () => {
        props.requestStart()
    }

    let handleLeave = () => {
        props.leaveLobby()
        props.history.push("/")
    }

    let checkDecode = () => {
        if(token === null) return false;

        let decoded = decode(token)
        return decoded.game_id === props.game._id
    }

    if(props.game === null)
        return <Redirect to={{ pathname: '/'}} />

    return(
        <div className={classes.main}>
            {props.jailPopup && <JailPopup />}
            {props.winPopup && <WinPopup winner={props.winPopup}/>}
            <div className={classes.topBar}>
                {ENV !== "PROD" && <p className={classes.testingLeave} onClick={handleLeave}>Leave Lobby (Testing)</p>}
                {props.game.hasStarted && props.game.currentTurn && <p className={classes.currentTurn}>Current Turn: {mapIdToName(props.game.players, props.game.currentTurn)}</p>}
            </div>
            <Sidebar user={props.user} started={props.game.hasStarted} game={props.game} players={props.players}/>
            {!props.game.hasStarted && <div className={classes.loadingContainer}>
                <img alt="paw" className={classes.paw} src={paw}/>
                <div className={classes.loadingText}>{`GAME CAN START AFTER ${props.game.startTime}`}</div>
                {props.host && checkDecode() && 
                    <button className={classes.startButton} style={{display: 'flex', flexDirection: 'column'}} onClick={handleStart}>
                        <div>Start Game</div>
                        <div style={{fontSize: '10px'}}>(you are the lobby leader)</div>
                    </button>
                }
                <button className={classes.startButton} onClick={handleLeave} style={{display: 'flex', flexDirection: 'column'}} >
                        <div>Leave Lobby</div>
                        {props.host && checkDecode() && <div style={{fontSize: '10px'}}>(forfeit lobby leader)</div>}
                </button>
            </div>}
            {props.game.hasStarted && <div className={classes.board} style={heightMatch ? {transform: 'scale(.88)', top: '50px'} : null}>
                <Board />
            </div>}
            <Chat playersList={props.players}/>
        </div>
    )

}

const useStyles = makeStyles(() => ({
    main: {
        backgroundColor: '#F2F2F2',
        boxShadow: '0px 32.4707px 106.268px -61.9895px rgba(0, 0, 0, 0.25);',
        height: '100vh',
        width: '100vw',
        boxSizing: 'border-box',
        overflow: 'hidden'
    },
    testingLeave: {
        display: 'inline-block', 
        margin: 0,
        padding: 0, 
        paddingLeft: '30px', 
        fontSize: 23, 
        color: 'purple', 
        cursor: 'pointer', 
        paddingTop: '12px'
    },
    currentTurn: {
        display: 'inline-block', 
        margin: 0,
        padding: 0, 
        paddingRight: '120px', 
        float: 'right',
        paddingTop: '12px',
        fontFamily: 'ChelseaMarket',
        fontSize: '25px',
        color: '#433F36',
    },
    board: {
        position: 'absolute',
        left: '600px',
        top: '100px',
        // transform: 'scale(.9)'
    },
    startButton: {
        color: 'white',
        width: '220px',
        padding: '12px',
        backgroundColor: '#7A6E5D',
        borderRadius: '9px',
        fontSize: '30px',
        textShadow: '2px 2px 0px rgba(0, 0, 0, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'ChelseaMarket',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        marginTop: '20px'
    },
    topBar: {
        height: '52px',
        backgroundColor: '#B6DAD6'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        height: '94vh'
    },
    loadingContainer: {
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        minWidth: '300px'
    },
    paw: {
        height: "168px",
        zIndex: "-3"
    },
    loadingText: {
        marginTop: '50px',
        fontFamily: 'ChelseaMarket',
        fontSize: '46px',
        color: '#7A6E5D',
        textAlign: 'center'
    }
}))