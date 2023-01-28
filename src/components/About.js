import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

export default function About(props){
    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
        <div className={classes.main}>
            <div className={classes.lobbyBox}>
                <div className={classes.lobbyText}>
                    <span style={{transform: 'rotate(-7.11deg) translate(0px, 8px)'}}>A</span>
                    <span style={{transform: 'rotate(-0.78deg) translate(0px, 2px)'}}>B</span>
                    <span style={{transform: 'rotate(0.16deg)'}}>O</span>
                    <span style={{transform: 'rotate(4.48deg) translate(0px, 2px)'}}>U</span>
                    <span style={{transform: 'rotate(5.99deg) translate(0px, 8px)'}}>T</span>
                </div>
                <div className={classes.roomsText} style={{backgroundColor: '#A8DDD7', cursor: 'pointer'}} onClick={()=> props.history.push("/")}><div>Back to Lobby</div></div>
                <div className={classes.roomsText} style={{backgroundColor: '#DC9F96'}}><div>Overview:</div></div>
                <div className={classes.text}>Bruinopoly, a UCLA-themed monopoly game, was initially a DevX project that aimed to bring together UCLA students during the pandemic and 
                    make it easier for people to meet new people and make friends. The project was never finished, but now it's been resurrected.</div>
                <div className={classes.roomsText} style={{backgroundColor: '#DC9F96'}}><div>Current State of Bruinopoly:</div></div>
                <div className={classes.text}>I acknowledge the game may be buggy. 
                </div>
                <div className={classes.text}>IMPORTANT (Read this)
                    <ul>
                        <li>Various bugs may cause the game to be unplayable. In order to reset the website, open the Javascript console (option-command-J on Macs) and 
                            type in 'localStorage.clear()', then press 'Enter'. You should be taken back to the welcome page.</li>
                    </ul> 
                </div>
                <div className={classes.text}>Known Issues:
                    <ul>
                        <li>Notification of duplicates overlaps with drawn card</li>
                        <li>No handling of bankrupty: money can go negative</li>
                        <li>No handling of players leaving a game once it has started</li>
                    </ul> 
                </div>
            </div>
        </div>
        </div>
    )
}

const useStyles = makeStyles(() => ({
    wrapper: {
        position: 'relative',
        width: '100vw'
    },
    text: {
        marginTop: '12px',
        marginBottom: '12px',
        width: '90%',
        fontSize: '20px',
    },
    main: {
        position: 'absolute',
        top: '0',
        left: '50%',
        width: '100vw',
        transform: 'translate(-50%, 0)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'ChelseaMarket',
    },
    bruinopolyText: {
        margin: '20px',
        fontSize: '100px',
        lineHeight: '127px',
        textAlign: 'center',
        color: '#A8DDD7',
        //border: '7px solid #FFFFFF',
        //textShadow: '10px 10px 0px rgba(0, 0, 0, 0.25)',
        textShadow: '3px 0 0 #fff, -3px 0 0 #fff, 0 3px 0 #fff, 0 -3px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 7px 7px 0px rgba(0, 0, 0, 0.25)',
    },
    lobbyBox: {
        marginTop: '20px',
        marginBottom: '40px',
        width: '71%',
        maxWidth: '875px',
        backgroundColor: '#F7F2E7',
        border: '3px solid #C4B299',
        boxSizing: 'border-box',
        boxShadow: '10px 10px 0px #C4B299',
        borderRadius: '30px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    lobbyText: {
        color: '#F6C811',
        fontFamily: 'ChelseaMarket',
        fontSize: '80px',
        textShadow: '1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 5px 5px 0px #DC9F96, 0px 3px 3px rgba(0, 0, 0, 0.25)',
        lineHeight: '108px',
        display: 'flex',
        margin: '15px'
    },
    roomsText: {
        margin: '8px',
        width: '90%',
        height: '70px',
        borderRadius: '17.7303px',
        fontSize: '40px',
        color: '#FFFFFF',
        textShadow: '1px 0 0 #000, -1px 0 0 #000, 0 1px 0 #000, 0 -1px 0 #000, 1px 1px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 4px 4px 0px #433F36',
        //textShadow: '4px 4px 0px #433F36',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
}))