import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux'
import {playerDetails} from '../../config'

import dorm from '../../assets/dorm.png'
import apt from '../../assets/apt.png'

export default function Property(props){
    const players = useSelector(state => state.lobbyReducer.game.players)
    const properties = useSelector(state => state.lobbyReducer.game.properties)

    const [ownerIndex, setOwner] = useState(0)
    const cssProps = {color: props.color}
    const classes = useStyles(cssProps);
    const [here, setHere] = useState(0)
    const [playerMap, setPlayerMap] = useState({})

    useEffect(()=>{
        let obj = {}
        for(let i = 0; i < players.length; i++){
            obj[players[i]._id] = i
        }
        setPlayerMap(obj)
    }, [])

    useEffect(()=>{
        if(properties[props.id].ownerId === null) setOwner(null)
        
        players.forEach((p, i)=>{
            if(p._id === properties[props.id].ownerId)
                setOwner(i)
        })
    }, [properties[props.id].ownerId])

    useEffect(()=>{
        let count = 0
        
        players.forEach((p)=>{
            if(p.currentTile === props.id)
                count++;
        })
        setHere(count);

    }, [players])

    return(
        <div className={classes.main}>
            {properties[props.id].ownerId !== null && ownerIndex !== null && <div className={classes.ownership} style={{backgroundColor: playerDetails[ownerIndex].color}}></div>}
            {props.color !== null && <div className={classes.colorBar}>
                {
                    properties[props.id].dormCount === 1 ? (<div className={classes.dormHolder}>
                        <img alt="dorm" src={dorm} className={classes.dorm} />
                    </div>) 
                    : (properties[props.id].dormCount === 2 ? (<div className={classes.dormHolder}>
                        <img alt="dorm" src={dorm} className={classes.dorm} />
                        <img alt="dorm" src={dorm} className={classes.dorm} />
                    </div>) 
                    : (properties[props.id].dormCount === 3 ? (<div className={classes.dormHolder}>
                        <img alt="dorm" src={dorm} className={classes.dorm} />
                        <img alt="dorm" src={dorm} className={classes.dorm} />
                        <img alt="dorm" src={dorm} className={classes.dorm} />
                    </div>) 
                    : (properties[props.id].dormCount === 4 ? (<div className={classes.dormHolder}>
                        <img alt="dorm" src={dorm} className={classes.dorm} />
                        <img alt="dorm" src={dorm} className={classes.dorm} />
                        <img alt="dorm" src={dorm} className={classes.dorm} />
                        <img alt="dorm" src={dorm} className={classes.dorm} />
                    </div>) 
                    : (properties[props.id].dormCount === 5 ? (<div className={classes.dormHolder} style={{justifyContent: 'center'}}>
                        <img alt="apt" src={apt} className={classes.apt} />
                    </div>) 
                    : null))))
                }
            </div>}
            <div className={classes.name}>{props.name.toUpperCase()}</div>
            {props.icon !== null && <img src={props.icon} style={{width: props.small ? '35px' : '90%', marginBottom: props.padding ? '20px': null}} className={classes.icon}/>}
            {props.price !== null && <div className={classes.price}>{props.price}</div>}
            {Object.keys(playerMap).length > 0 && players.filter(p => p.currentTile === props.id).map((player, i)=>{
                return <div key={i} style={{backgroundColor: playerDetails[playerMap[player._id]].color, top: i===0 ? "20px" : `${20+10*i}`}} className={classes.outerToken}>
                    <img className={classes.token} src={playerDetails[playerMap[player._id]].img} />
                 </div>
            })}
        </div>
    )

}

const useStyles = makeStyles(() => ({
    token: {
        height: '35px',
    },
    outerToken: {
        height: '43px',
        width: '43px',
        position: 'absolute',
        left: '10px',
        top: '20px',
        zIndex: 5,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid black'
    },
    dormHolder: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '99%'
    },
    dorm: {
        width: '23px',
        margin: 0,
        marginRight: '-8px',
        transform: 'rotate(270deg)',
    },
    apt: {
        width: '45px',
        margin: 0
    },
    ownership: {
        position: 'absolute',
        height: '25px',
        width: '60px',
        backgroundColor: 'purple',
        top: '100px',
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%'
    },
    main: props => ({
        height: '100px',
        width: '60px',
        backgroundColor: '#F7F2E7',
        outline: '1.5px solid #C4B299',
        fontFamily: 'ChelseaMarket',
        color: '#433F36',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
    }),
    colorBar: props => ({
        height: '20%',
        backgroundColor: props.color,
        width: '100%',
    }),
    name: {
        //height: '20%',
        width: '100%',
        fontSize: '9px',
        marginTop: '5px',
        marginBottom: '8px',
        transform: 'translate(0.5px, 0)'
    },
    icon: {
        width: '90%',
        alignSelf: 'center',
        //marginTop: '5px'
    },
    price:{
        fontSize: '9px',
        position: 'absolute',
        width: '90%',
        bottom: '5px',
        left: '50%',
        transform: 'translate(-50%, 0)'
    }
}))