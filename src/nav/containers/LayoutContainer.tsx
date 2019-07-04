import { connect } from 'react-redux';
import Layout from '../components/Layout';
import { ActionCreators } from '@auth/user';

// tslint:disable-next-line:no-any
const mapStateToProps = (state: any) => ({
  isLoggined: state.auth.loginStatus === 'LOGIN_SUCCESS',
  currentUser: state.auth.currentUser,
});

// tslint:disable-next-line:no-any
const mapDispatchToProps = (dispatch: any) => ({
  // tslint:disable-next-line:no-any
  onRequestFresh: (user: any) => dispatch(ActionCreators.loginSuccess(user)),
  onLogout: () => dispatch(ActionCreators.logoutSuccess()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Layout);
