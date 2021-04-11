import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import authSelectors from '../selectors/auth.selectors';

const check = (permissions, perform) => {
  if (!permissions) {
    return false;
  }
  return permissions.filter((permission) => permission.includes(perform)).length;
};

const VerifyPermission = ({
  user, perform, yes, no,
}) => (check(user.permissions, perform) ? yes() : no());

const mapStateToProps = (state) => ({
  user: authSelectors.getUser(state),
});

const withPropsVerifyPermission = connect(mapStateToProps)(VerifyPermission);

withPropsVerifyPermission.propTypes = {
  perform: PropTypes.string.isRequired,
  yes: PropTypes.func,
  no: PropTypes.func,
};

withPropsVerifyPermission.defaultProps = {
  yes: () => null,
  no: () => null,
};

export default withPropsVerifyPermission;
