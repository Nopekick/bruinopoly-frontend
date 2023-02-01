import {connect} from 'react-redux';
import {
    getRooms, 
    createRoom,
    joinRoom
    } from '../reducers/lobby';
import Lobby from '../components/Lobby';

// import {withRouter} from 'react-router-dom';

const mapStateToProps = state => ({
    rooms: state.lobbyReducer.rooms,
    user: state.lobbyReducer.userInfo,
    redirect: state.lobbyReducer.redirectTo,
    id: state.lobbyReducer.gameID,
    token: state.lobbyReducer.token,
    error: state.lobbyReducer.error,
});

const mapDispatchToProps = dispatch => ({
    getRooms: () => {
        dispatch(getRooms());
    },
    createRoom: (data) => {
        dispatch(createRoom(data));
    },
    joinRoom: (data) =>{
        dispatch(joinRoom(data))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);