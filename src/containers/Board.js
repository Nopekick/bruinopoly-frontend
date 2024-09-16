import {connect} from 'react-redux';
import Board from '../components/Board/Board';

// import {withRouter} from 'react-router-dom';

const mapStateToProps = state => ({
    turn: state.lobbyReducer.yourTurn,
    salePopup: state.lobbyReducer.salePopup,
    chestPopup: state.lobbyReducer.chestPopup,
    chancePopup: state.lobbyReducer.chancePopup,
    tradePopup: state.lobbyReducer.tradePopup,
    propertyPopup: state.lobbyReducer.propertyPopup,
    doubles: state.lobbyReducer.doubles,
    name: state.lobbyReducer.userInfo.name,
    mortgagePopup: state.lobbyReducer.mortgagePopup,
    winPopup: state.lobbyReducer.winPopup,
    bankruptcy: state.lobbyReducer.bankruptcy,
    propertyInfoPopup: state.lobbyReducer.infoPopup
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Board);