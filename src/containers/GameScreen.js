import {connect} from 'react-redux';
import {requestStart, leaveLobby} from '../reducers/lobby'
import GameScreen from '../components/GameScreen';

// import {withRouter} from 'react-router-dom';

const mapStateToProps = state => ({
    players: state.lobbyReducer.players,
    user: state.lobbyReducer.userInfo,
    game: state.lobbyReducer.game,
    host: state.lobbyReducer.isHost,
    winPopup: state.lobbyReducer.winPopup,
    jailPopup: state.lobbyReducer.jailPopup,
    error: state.lobbyReducer.error
});

const mapDispatchToProps = dispatch => ({
    requestStart: () => {
        dispatch(requestStart())
    },
    leaveLobby: () => {
        dispatch(leaveLobby())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);