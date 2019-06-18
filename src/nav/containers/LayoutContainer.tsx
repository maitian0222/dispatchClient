import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { ActionCreators } from '@auth/user';

const mapStateToProps = (state, props) => ({
  isLoggined: state.auth.loginStatus === 'LOGIN_SUCCESS',
  currentUser: state.auth.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  onRequestFresh: (user) => dispatch(ActionCreators.loginSuccess(user)),
  onLogout: () => dispatch(ActionCreators.logoutSuccess()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
