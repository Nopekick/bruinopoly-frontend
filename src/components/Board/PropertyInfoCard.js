import {PROPERTIES, getColor} from '../../config'
import { makeStyles } from '@material-ui/core/styles';

export default function PropertyInfoCard(props){
    const classes = useStyles();
    const property = PROPERTIES[props.property]

    return(
                    <div style={{padding: '13px'}} className={classes.box}>
                        <div className={classes.colorBox} style={{backgroundColor: getColor(props.property)}}>{property.name}</div>
                        <p className={classes.rent} style={{marginBottom: '8px', marginTop: '13px'}}>
                            Rent: {property.utility === false && "$"}{property.rent}
                        </p>
                        {property.railroad === false && property.utility === false && <div>
                            <div className={classes.detailBox}> 
                                <p className={classes.rent} style={{fontSize: '16px'}}>With 1 Dorm</p>
                                <p className={classes.rent} style={{fontSize: '16px'}}>${property.rent1}</p>
                            </div>
                            <div className={classes.detailBox}> 
                                <p className={classes.rent} style={{fontSize: '16px'}}>With 2 Dorms</p>
                                <p className={classes.rent} style={{fontSize: '16px'}}>${property.rent2}</p>
                            </div>
                            <div className={classes.detailBox}> 
                                <p className={classes.rent} style={{fontSize: '16px'}}>With 3 Dorms</p>
                                <p className={classes.rent} style={{fontSize: '16px'}}>${property.rent3}</p>
                            </div>
                            <div className={classes.detailBox} style={{marginBottom: '2px'}}> 
                                <p className={classes.rent} style={{fontSize: '16px'}}>With 4 Dorms</p>
                                <p className={classes.rent} style={{fontSize: '16px'}}>${property.rent4}</p>
                            </div>
                            <p className={classes.rent2}>WITH APT ${property.rent5}</p>
                            <p className={classes.rent2}>MORTGAGE VALUE ${property.mortgage}</p>
                            <p className={classes.rent2}>DORMS COST ${property.dormCost}</p>
                            <p className={classes.rent2}>APT, ${property.dormCost} + 4 DORMS</p>
                        </div>}
                    </div>
    )

}

const useStyles = makeStyles(() => ({
    box: {
        borderRadius: '10px',
        backgroundColor: '#F7F2E7',
        height: '337px',
        width: '227px',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
    },
    colorBox: {
        backgroundColor: '#EAACA3',
        width: '203px',
        height: '75px',
        color: '#433F36',
        fontSize: '25px',
        fontFamily: 'VCR',
        boxSizing: 'border-box',
        padding: '15px',
        textAlign: 'center'
    },
    rent: {
        fontFamily: 'VCR',
        fontSize: '22px',
        color: '#433F36',
        fontWeight: 400,
        textAlign: 'center',
    },
    rent2: {
        fontFamily: 'VCR',
        fontSize: '16px',
        color: '#7A6E5D',
        fontWeight: 400,
        textAlign: 'center',
        margin: 0,
        marginBottom: '6px'
    },
    detailBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '202px',
        height: '28px',
    },
}))