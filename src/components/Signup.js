import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {majors} from '../config'

import blob1 from '../assets/blueblob1.png'
import blob2 from '../assets/blueblob2.png'

import bruin from '../assets/bruinman.png'
import paw from '../assets/paw.png'
import bruinopoly from '../assets/bruinopoly-lettering.png'
import dropdown from '../assets/dropdown.png'
import diamonds from '../assets/diamonds.png'


export default function Signup(props){
    const classes = useStyles();
    const [major, setMajor] = useState("")
    const [year, setYear] = useState("Freshman")
    const [name, setName] = useState("")
    const [error, setError] = useState(null)

    //redirect to lobby page if info is already stored in cookies
    if(props.redirect && props.redirect !== "null"){
        return <Redirect to={{ pathname: '/' }} />
    }

    let handleSubmit = () => {
        const maxLength = 15 //Move to config :) 
        if(name.length > maxLength){
            setError(`Your name must be less than ${maxLength+1} characters long`)
            return
        }
        setError(null)
        props.signup({name, major, year})
    }

    let majorsList = majors.map((major, i)=>{
        return (
            <option key={i} value={major}>{major}</option>
        )
    })

    return (
        <div>
            <div className={classes.container}>
                <img alt="background" className={classes.blob1} src={blob1}></img>
                <img alt="background" className={classes.blob2} src={blob2}></img>
                <div className={classes.contentBox}>
                    <img alt="title" src={bruinopoly} className={classes.titleImage}/>
                    <img alt="bruin" src={bruin} className={classes.bruin} />
                    <img alt="paw" src={paw} className={classes.paw} />
                    <h2 className={classes.subtitle}>SIGN UP</h2>
                    <div className={classes.diamondBox}> 
                        <div className={classes.subBox}>
                            <span className={classes.text}>Name</span>
                            <input className={classes.input} type="text" style={{width: '360px'}} 
                                value={name} onChange={(e)=>{setName(e.target.value)}}/>
                            {error && <p className={classes.error}>{error}</p>}
                        </div>
                        <div  className={classes.subBox}>
                            <span className={classes.text}>Major</span>
                            <select className={`${classes.input} ${classes.select}`} style={{width: '360px'}}
                                value={major} onChange={(e)=>{setMajor(e.target.value)}}
                            >
                                {majorsList}
                            </select>
                        </div>
                        <div  className={classes.subBox}>
                            <span className={classes.text}>Year</span>
                            <select className={`${classes.input} ${classes.select}`} style={{width: '270px'}}
                                value={year} onChange={(e)=>{setYear(e.target.value)}}
                            >
                                <option value="freshman">Freshman</option>
                                <option value="sophomore">Sophomore</option>
                                <option value="junior">Junior</option>
                                <option value="senior">Senior</option>
                            </select>
                        </div>
                    </div>
                    <button className={classes.button} onClick={handleSubmit}>ENTER</button>
                </div>
            </div>
        </div>
    )
}

const useStyles = makeStyles(() => ({
    error: {
        position: 'absolute',
        top: '90px',
        left: '245px',
        color: 'red',
        fontSize: '14px',
        fontFamily: 'ChelseaMarket',
    },
    container : {
        
    },
    blob1: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: -1
    },
    blob2: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: '58%',
        zIndex: -1
    },
    titleImage: {
        height: 'auto',
        width: 'auto',
        maxWidth: '500px',
        maxHeight: '200px',
        position: 'absolute',
        top: '-110px',
        left: '20px'
    },
    bruin: {
        height: '200px',
        width: 'auto',
        position: 'absolute',
        top: '-194px',
        right: '0px',
        zIndex: 2
    },
    paw: {
        height: '86px',
        width: '86px',
        position: 'absolute',
        left: '15px',
        top: '30px',
        zIndex: 2
    },
    diamondBox: {
        height: '354px',
        borderBottomLeftRadius: '26px',
        borderBottomRightRadius: '28px',
        width: '100%',
        position: 'relative',
        backgroundImage: `url(${diamonds})`,
        backgroundSize: '684px 414px',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '50% 50%',
        overflow: 'hidden'
    },
    contentBox: {
        margin: '200px auto 0px auto',
        backgroundColor: '#F1EEDE',
        width: '675px',
        height: '450px',
        boxSizing: 'border-box',
        boxShadow: '7px 7px 0px #32312D',
        position: 'relative',
        borderRadius: '30px',
        border: '3px solid #32312D',
    },
    subtitle: {
        fontFamily: 'ChelseaMarket',
        textAlign: 'center',
        fontSize: '46px',
        fontWeight: '400',
        marginTop: '15px',
        marginBottom: '0',
        paddingBottom: '15px',
        borderBottom: '2px solid #32312D'
    },
    button: {
        fontFamily: 'ChelseaMarket',
        fontSize: '35px',
        boxSizing: 'border-box',
        height: '75px',
        width:' 330px',
        borderRadius: '17px',
        border: '3px solid #32312D',
        outline: 'none',
        boxShadow: '3.5px 6px 1.2px #32312D',
        backgroundColor: '#F1EEDE',
        position: 'absolute',
        bottom: '-122px',
        left: '160px',
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '1px 2px .5px #32312D',
        },
        '&:active': {
            boxShadow: '8px 8px 1px #32312D',
        }
    },
    subBox: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: '57px'
    },
    text: {
        fontFamily: 'ChelseaMarket',
        fontWeight: '400',
        width: '140px',
        fontSize: '36px',
        marginLeft: '60px',
        marginRight: '40px',
        zIndex: 2
    },
    input: {
        fontFamily: 'ChelseaMarket',
        fontSize: '20px',
        paddingLeft: '13px',
        boxSizing: 'border-box',
        fontWeight: '400',
        backgroundColor: '#F1EEDE',
        height: '43px',
        border: '1.5px solid #32312D',
        outline: 'none',
        borderRadius: '10px',
        zIndex: 2
    },
    select: {
        webkitAppearance: 'none',
        mozAppearance: 'none',
        appearance: 'none',
        backgroundImage: `url(${dropdown})`,
        backgroundPosition: '97% 52%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '22px 22px'
    }
}))