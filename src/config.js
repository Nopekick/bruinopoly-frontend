import Property from './components/Board/Property.js';
import Corner from './components/Board/Corner.js';
import Exuse_Me_Blue from './assets/Exuse_Me_Blue.png';
import Dining from './assets/Dining1.png';
import Powell from './assets/POWELL.png';
import FinAid from './assets/Financial_Aid.png';
import Exuse_Me_Yellow from './assets/Exuse_Me_Yellow.png';
import Concert from './assets/Concert.png';
import USAC from './assets/USAC.png';
import Exuse_Me_Red from './assets/Exuse_Me_Red.png';
import Royce from './assets/Royce.png';
import Go from './assets/GO.png';
import Jail from './assets/JAIL.png';
import GoToJail from './assets/GO_TO_JAIL.png';
import NoFreeParking from './assets/FREE_PARKING.png';

import bman from './assets/bruinman.png'
import squirrel from './assets/squirrel.png'
import cat from './assets/powellcat.png'

import CHANCE from './data/chance'
import CHEST from './data/chest'
import {TILES, TileType} from './data/tiles'
import PROPERTIES from './data/properties'

let sleep = (sec) => {
    return new Promise((res, rej)=>{
        setTimeout(()=>{res()}, sec*1000)
    })
}

// let API_URL = "http://localhost:3000"
// let SOCKET_URL = "localhost:8080"
//let API_URL = "https://bruinopoly-backend.herokuapp.com"
//let SOCKET_URL = "bruinopoly-backend.herokuapp.com"
let API_URL = process.env.REACT_APP_API_URL;
let SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

let majors = ["Aerospace Engineering",
    "African American Studies",
    "African and Middle Eastern Studies",
    "American Indian Studies",
    "American Literature and Culture",
    "Ancient Near East and Egyptology",
    "Anthropology",
    "Applied Linguistics",
    "Applied Mathematics",
    "Arabic",
    "Architectural Studies",
    "Art",
    "Art History",
    "Asian American Studies",
    "Asian Humanities",
    "Asian Languages and Linguistics",
    "Asian Studies",
    "Asian Religions",
    "Atmospheric and Oceanic Sciences",
    "Atmospheric and Oceanic Sciences/Mathematics",
    "Astrophysics",
    "Biochemistry",
    "Bioengineering",
    "Biology",
    "Biophysics",
    "Business Economics",
    "Central and East European Languages and Cultures",
    "Chemical Engineering",
    "Chemistry",
    "Chemistry/Materials Science",
    "Chicana and Chicano Studies",
    "Chinese",
    "Classical Civilization",
    "Climate Science",
    "Civil Engineering",
    "Cognitive Science",
    "Communication",
    "Comparative Literature",
    "Computational and Systems Biology",
    "Computer Engineering",
    "Computer Science",
    "Computer Science and Engineering",
    "Computer Engineering",
    "Dance",
    "Data Theory",
    "Design | Media Arts",
    "Earth and Environmental Science",
    "Ecology, Behavior, and Evolution",
    "Economics",
    "Education and Social Transformation",
    "Electrical Engineering",
    "Engineering Geology",
    "English",
    "Environmental Science",
    "Ethnomusicology",
    "European Studies",
    "Film & Television",
    "Financial Actuarial Mathematics",
    "French",
    "French and Linguistics",
    "Gender Studies",
    "General Chemistry",
    "Geography",
    "Geography/Environmental Studies",
    "Geology",
    "Geophysics",
    "German",
    "Global Jazz Studies",
    "Global Studies",
    "Greek",
    "Greek and Latin",
    "History",
    "Human Biology and Society",
    "Individual Field BA Arts and Architecture",
    "Individual Field BA Theater, Film, and Television",
    "Individual Field of Concentration",
    "International Development Studies",
    "Iranian Studies",
    "Italian",
    "Italian and Special Fields",
    "Jewish Studies",
    "Korean",
    "Labor Studies",
    "Latin",
    "Latin American Studies",
    "Linguistics",
    "Linguistics and Anthropology",
    "Linguistics & Asian Languages & Cultures",
    "Linguistics and Computer Science",
    "Linguistics and English",
    "Linguistics and French",
    "Linguistics and Italian",
    "Linguistics and Philosophy",
    "Linguistics and Psychology",
    "Linguistics and Scandinavian Languages",
    "Linguistics and Spanish",
    "Manufacturing Engineering",
    "Marine Biology",
    "Materials Engineering",
    "Mathematics/Applied Science",
    "Mathematics/Economics",
    "Mathematics for Teaching",
    "Mathematics of Computation",
    "Mechanical Engineering",
    "Microbiology, Immunology, and Molecular Genetics",
    "Middle Eastern Studies",
    "Molecular, Cell, and Developmental Biology",
    "Music",
    "Music Composition",
    "Music Education",
    "Music History and Industry",
    "Music Performance",
    "Musicology",
    "Neuroscience",
    "Nordic Studies",
    "Nursing",
    "Philosophy",
    "Physics",
    "Physiological Science",
    "Political Science",
    "Portuguese and Brazilian Studies",
    "Psychobiology",
    "Psychology",
    "Public Affairs",
    "Religion, Study of Russian Studies", 
    "Scandinavian Languages and Cultures", 
    "Sociology",
    "Spanish",
    "Spanish and Community and Culture",
    "Spanish and Linguistics",
    "Spanish and Portuguese",
    "Statistics",
    "Theater",
    "Theater and Performance Studies",
    "World Arts and Cultures"
]
let times = ["1:00 PM PST", "1:30 PM PST", "1:00 AM PST", "1:30 AM PST", 
            "2:00 PM PST", "2:30 PM PST", "2:00 AM PST", "2:30 AM PST", 
            "3:00 PM PST", "3:30 PM PST", "3:00 AM PST", "3:30 AM PST", 
            "4:00 PM PST", "4:30 PM PST", "4:00 AM PST", "4:30 AM PST", 
            "5:00 PM PST", "5:30 PM PST", "5:00 AM PST", "5:30 AM PST", 
            "6:00 PM PST", "6:30 PM PST", "6:00 AM PST", "6:30 AM PST", 
            "7:00 PM PST", "7:30 PM PST", "7:00 AM PST", "7:30 AM PST", 
            "8:00 PM PST", "8:30 PM PST", "8:00 AM PST", "8:30 AM PST", 
            "9:00 PM PST", "9:30 PM PST", "9:00 AM PST", "9:30 AM PST", 
            "10:00 PM PST", "10:30 PM PST", "10:00 AM PST", "10:30 AM PST",
             "11:00 PM PST", "11:30 PM PST", "11:00 AM PST", "11:30 AM PST", 
             "12:00 PM PST", "12:30 PM PST", "12:00 AM PST", "12:30 AM PST"
        ]       

const minGameTime = 20

let positions = [
    //corner
    <Corner id={0} key={1} icon={Go} />,
    <Property id={1} key={2} color='#8E6A36' name='Kerckhoff' price='$60' />,
    <Property id={2} key={3} name='Financial Aid Office' icon={FinAid} />,
    <Property id={3} key={4} color='#8E6A36' name='Northern Lights' price='$60' />,
    <Property id={4} key={5} padding={true}name='USAC FEES' small={true} icon={USAC} price='PAY $200' />,
    <Property id={5} key={6} padding={true} name='Feast' price='$200' icon={Dining} />,
    <Property id={6} key={7} color='#A8DDD7' name='Math Sciences' price='$100' />,
    <Property id={7} key={8} name='Exuse Me Sir!' icon={Exuse_Me_Red} />,
    <Property id={8} key={9} color='#A8DDD7' name='Engr. IV' price='$100' />,
    <Property id={9} key={10} color='#A8DDD7' name='Boelter' price='$120' />,
    //corner
    <Corner id={10} key={11} icon={Jail} jail={true}></Corner>,
    <Property id={11} key={12} color='#EAACA3' name='Rolfe Hall' price='$140' />,
    <Property id={12} key={13} padding={true} name='Royce' icon={Royce} price='$150' />,
    <Property id={13} key={14} color='#EAACA3' name='Schoenberg Music Hall' price='$140' />,
    <Property id={14} key={15} color='#EAACA3' name='Dodd Hall' price='$160' />,
    <Property id={15} key={16} padding={true} name='De Neve' price='$200' icon={Dining} />,
    <Property id={16} key={17} color='#F6B611' name='La Kretz' price='$180' />,
    <Property id={17} key={18} name='Financial Aid Office' icon={FinAid} />,
    <Property id={18} key={19} color='#F6B611' name='LS' price='$180' />,
    <Property id={19} key={20} color='#F6B611' name='Young Hall' price='$200' />,
    //corner
    <Corner id={20} key={21} icon={NoFreeParking}></Corner>,
    <Property id={21} key={22} color='#F15B45' name='ACKERMAN' price='$220' />,
    <Property id={22} key={23} name='EXUSE ME SIR!' icon={Exuse_Me_Blue} />,
    <Property id={23} key={24} color='#F15B45' name='WOODEN' price='$220' />,
    <Property id={24} key={25} color='#F15B45' name='FRANZ' price='$240' />,
    <Property id={25} key={26} padding={true} name='BPLATE' price='$200' icon={Dining} />,
    <Property id={26} key={27} color='#FFF261' name='BUNCHE' price='$260' />,
    <Property id={27} key={28} color='#FFF261' name='KAPLAN' price='$260' />,
    <Property id={28} key={29} padding={true}  name='POWELL' price='$150' icon={Powell} />,
    <Property id={29} key={30} color='#FFF261' name='FRANZ' price='$280' />,
    //corner
    <Corner id={30} key={31} icon={GoToJail}></Corner>,
    <Property id={31} key={32} color='#A8DC96' name='SCI & ENGR. LIBRARY' price='$300' />,
    <Property id={32} key={33} color='#A8DC96' name='BIOMED LIBRARY' price='$300' />,
    <Property id={33} key={34} name='Financial Aid Office' icon={FinAid} />,
    <Property id={34} key={35} color='#A8DC96' name='YRL' price='$320' />,
    <Property id={35} key={36} padding={true} name='Covel' price='$200' icon={Dining} />,
    <Property id={36} key={37} name='Exuse Me Sir!' icon={Exuse_Me_Yellow} />,
    <Property id={37} key={38} color='#3F4CBB' name='Sculpture Garden' price='$350' />,
    <Property id={38} key={39} name='Bruinbash Fest' icon={Concert} />,
    <Property id={39} key={40} color='#3F4CBB' name='Fowler Museum' price='$400' />
]

let playerDetails = [
    {color: "#B6DAD6", img: bman}, 
    {color: "#A8DC96", img: cat},
    {color: "#F7B62A", img: squirrel}, 
    {color: "purple", img: bman}, 
    {color: "yellow", img: cat}, 
    {color: "green", img: squirrel}, 
    {color: "cyan", img: bman},
    {color: "orange", img: cat}
]

let getColor = (tile) => {
    if(tile === 12 || tile === 28){
        return "#C4B299"
    } else if(tile === 5 || tile === 15 || tile === 25 || tile === 35){
        return "#433F36"
    } else if(tile <= 3){
        return "#8E6A36"
    } else if(tile <= 9){
        return "#A8DDD7"
    } else if(tile <= 14){
        return "#EAACA3"
    } else if(tile <= 19){
        return "#F6B611"
    } else if(tile <= 24){
        return "#F15B45"
    } else if(tile <= 29){
        return "#FFF261"
    } else if(tile <= 34){
        return "#A8DC96"
    } else {
        return "#3F4CBB"
    }
}

let mapIdToName = (players, id) => {
    let other = players.filter(p => p._id === id)[0]
    console.log(other.name)
    return other.name
}

export {majors, API_URL, SOCKET_URL, times, minGameTime, positions, sleep, CHANCE, CHEST, PROPERTIES, TILES, TileType, playerDetails, getColor, mapIdToName}
