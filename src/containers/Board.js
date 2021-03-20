import {connect} from 'react-redux';
import Board from '../components/Board/Board';

// import {withRouter} from 'react-router-dom';

const mapStateToProps = state => ({
    turn: state.lobbyReducer.yourTurn,
    salePopup: state.lobbyReducer.salePopup,
    chestPopup: state.lobbyReducer.chestPopup,
    chancePopup: state.lobbyReducer.chancePopup,
    doubles: state.lobbyReducer.doubles,
    name: state.lobbyReducer.userInfo.name
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);