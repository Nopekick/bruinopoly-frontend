import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux'
import {addMessage} from '../reducers/lobby.js'
import {playerDetails} from '../config'

import Plus from '@material-ui/icons/Add';
import KReturn from '@material-ui/icons/KeyboardReturn';
// import MicNone from '@material-ui/icons/MicNone';
import MicOff from '@material-ui/icons/MicOff';
import Remove from '@material-ui/icons/Remove';

export default function About(props){
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [muted, setMute] = useState(true)
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()
    const messages = useSelector(state => state.lobbyReducer.messages)
    const user = useSelector(state => state.lobbyReducer.userInfo)

    let toggle = () => setOpen(!open);
    let toggleMute = () => setMute(!muted);

    let handleMessage = () => {
        if(message === "") return

        dispatch(addMessage({name: user.name, content: message}))
        setMessage("")
    }

    return (
        <div className={classes.container}>
            <div className={classes.topBox}>
                <p className={classes.chat}>CHAT</p>
                { !open ? <Plus className={classes.toggleIcon} onClick={toggle}/> : <Remove className={classes.toggleIcon} onClick={toggle}/> }
            </div>
            {open && <div className={classes.body}>
                <div className={classes.users}>
                    {/* { !muted ? <MicNone className={classes.mic} onClick={toggleMute}/> : <MicOff className={classes.mic} onClick={toggleMute}/> } */}
                    <MicOff className={classes.mic} onClick={toggleMute}/>
                    {
                        props.playersList && props.playersList.map((user, i)=>{
                            return <Bubble key={i} color={playerDetails[i].color} name={user.name} />
                        })
                    }
                </div>
                <div className={classes.rightBox}>
                    <div className={classes.messages}>
                        {
                            messages && messages.map((message, i)=>{
                                let id = 0;
                                props.playersList.forEach((p,i) => {
                                    if(p.name === message.name) id = i;
                                })
                                return <div key={i} style={{display: 'flex', alignItems: 'center', paddingLeft: '15px', marginBottom: '7px'}}>
                                    <Bubble color={playerDetails[id].color} name={message.name} />
                                    <span className={classes.messageText}>{message.content}</span>
                                </div>
                            })
                        }
                    </div>
                    <div className={classes.inputBox}>
                        <form style={{margin: 0, padding: 0, display: 'inline'}} onSubmit={(e)=>{e.preventDefault(); handleMessage();}}>
                        <input type="text" placeholder="Send a message..." className={classes.input} value={message} 
                            onChange={(e)=>{setMessage(e.target.value)}} />
                        <KReturn onClick={handleMessage} className={classes.sendIcon}/>
                        </form>
                    </div>
                </div>
            </div>}
        </div>
    )
}

const useStyles = makeStyles(() => ({
    container: {
        position: 'absolute',
        bottom: 0,
        left: '60px',
        width: '315px',
        borderTopLeftRadius: '25px',
        borderTopRightRadius: '25px',
        boxSizing: 'border-box',
        padding: 0,
        boxShadow: '20.7958px -14.8542px 44.5625px -17.825px rgba(0, 0, 0, 0.09)',
        zIndex: 10
    },
    topBox: {
        position: 'relative',
        height: '45px',
        width: '100%',
        backgroundColor: '#DC9F96',
        borderTopLeftRadius: '13px',
        borderTopRightRadius: '13px',
        border: '1px solid #7A6E5D',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    toggleIcon: {
        position: 'absolute',
        height: '40px',
        width: '40px',
        top: '5px',
        right: '10px',
        cursor: 'pointer',
        color: '#7A6E5D',
    },
    chat: {
        color: 'white',
        fontFamily: 'VCR',
        fontSize: '30px',
        margin: '0 0 0 18px',
    },
    body: {
        height: '330px',
        width: '100%',
        backgroundColor: 'white',
        border: '1px solid #7A6E5D',
        borderTop: 'none',
        display: 'flex',
    },
    users: {
        borderRight: '1px solid #7A6E5D',
        width: '15%',
        backgroundColor: '#F0F0F0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
    mic: {
        color: '#7A6E5D',
        height: '25px',
        width: '25px',
        cursor: 'pointer',
        position: 'absolute',
        right: '10px',
        bottom: '6px'
    },
    input: {
        height: '97%',
        width: '97%',
        outline: 'none',
        fontFamily: 'Avenir',
        fontSize: '14px',
        border: 'none',
        background: 'none',
        paddingLeft: '8px',
        '&::placeholder': {
            color: 'black'
        }
    },
    messageText: {
        fontFamily: 'Avenir',
        fontSize: '16px',
        paddingLeft: '10px',
        marginTop: '7px'
    },
    rightBox: {
        display: 'flex',
        flexDirection: 'column',
        width: '85%'
    },
    messages: {
        height: '90%',
        width: '100%',
        backgroundColor: 'white',
        overflow: 'scroll'
    },
    inputBox: {
        borderTop: '1px solid #7A6E5D',
        width: '100%',
        height: '10%',
        backgroundColor: '#F0F0F0',
        overflow: 'hidden',
    },
    sendIcon: {
        position: 'absolute',
        bottom: '3px',
        right: '5px',
        height: '25px',
        width: '22px',
        color: '#7A6E5D'
    }
}))

const Bubble = ({name, color}) => {
    return (
        <div style={{borderRadius: '50%', height: '28px', width: '28px', backgroundColor: `${color}`, 
        fontSize: '18px', marginTop: '7px', display: 'flex', justifyContent: 'center', alignItems: 'center', 
        fontFamily: 'Avenir', fontWeight: '500'}}>{name[0].toUpperCase()}</div>
    )
}