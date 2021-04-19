import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import history from './helpers/history';
import alertActions from './actions/alert.actions';
import PrivateRoute from './components/PrivateRoute';
import LoginPage from './containers/LoginPage/LoginPage';
import TestPage from './containers/TestPage/TestPage';
import DashboardPage from './containers/DashboardPage/DashboardPage';
import CreatePermissionPage from './containers/AdminPage/PermissionManagePage/CreatePermissionPage';
import PermissionManagePage from './containers/AdminPage/PermissionManagePage/PermissionManagePage';
import RoleManagePage from './containers/AdminPage/RoleManagePage/RoleManagePage';
import CreateRolePage from './containers/AdminPage/RoleManagePage/CreateRolePage';
import ShopManagePage from './containers/AdminPage/ShopManagePage/ShopManagePage';
import APIKeyManagePage from './containers/AdminPage/APIKeyManagePage/APIKeyManagePage';
import CreateAPIKeyPage from './containers/AdminPage/APIKeyManagePage/CreateAPIKeyPage';
import UserManagePage from './containers/AdminPage/UserManagePage/UserManagePage';
import CreateUserPage from './containers/AdminPage/UserManagePage/CreateUserPage';
import DefaultDurationWorkstation from './containers/DurationWorkstation/Default/DefaultDurationWorkstation';
import DailyDurationWorkstation from './containers/DurationWorkstation/Daily/DailyDurationWorkstation';
import CreateReservationPage from './containers/ReservationPage/CreateReservationPage';
import ListReservationPage from './containers/ReservationPage/ListReservationPage';
import PersonalSettingPage from './containers/PersonalSetting/PersonalSettingPage';
import ResetPasswordPage from './containers/PersonalSetting/ResetPasswordPage';
import WeekSchedulePage from './containers/WeekSchedulePage/WeekSchedulePage';
import ProductPage from './containers/ProductPage/ProductPage';
import InventoryPage from './containers/InventoryPage/InventoryPage';
import InventoryRecordPage from './containers/InventoryRecordPage/InventoryRecordPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen(() => {
      // clear alert on location change
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;

    return (
      <div>
        {alert.message
                && <Alert severity={`${alert.type}`}>{alert.message}</Alert>}
        <Router history={history}>
          <Switch>
            <Route path="/reservation/login" component={LoginPage} />
            <PrivateRoute path="/test" component={TestPage} />

            <PrivateRoute path="/:band/product" component={ProductPage} />
            <PrivateRoute path="/:band/inventory" component={InventoryPage} />
            <PrivateRoute path="/:band/inventory_record" component={InventoryRecordPage} />

            <PrivateRoute path="/reservation/dashboard" component={DashboardPage} />
            <PrivateRoute path="/reservation/personal_setting" component={PersonalSettingPage} />
            <PrivateRoute path="/reservation/reset_password" component={ResetPasswordPage} />

            <PrivateRoute path="/reservation/admin/permission_manage/show" component={PermissionManagePage} />
            <PrivateRoute path="/reservation/admin/permission_manage/create" component={CreatePermissionPage} />
            <PrivateRoute
              path="/reservation/admin/permission_manage/edit/:permissionId"
              component={CreatePermissionPage}
            />

            <PrivateRoute path="/reservation/admin/role_manage/show" component={RoleManagePage} />
            <PrivateRoute path="/reservation/admin/role_manage/create" component={CreateRolePage} />
            <PrivateRoute path="/reservation/admin/role_manage/edit/:roleId" component={CreateRolePage} />

            <PrivateRoute path="/reservation/admin/shop_manage/show" component={ShopManagePage} />

            <PrivateRoute path="/reservation/admin/api_key_manage/show" component={APIKeyManagePage} />
            <PrivateRoute path="/reservation/admin/api_key_manage/create" component={CreateAPIKeyPage} />
            <PrivateRoute path="/reservation/admin/api_key_manage/edit/:apiKeyId" component={CreateAPIKeyPage} />

            <PrivateRoute path="/reservation/admin/user_manage/show" component={UserManagePage} />
            <PrivateRoute path="/reservation/admin/user_manage/create" component={CreateUserPage} />

            <PrivateRoute
              path="/reservation/duration_workstation/default/setting"
              component={DefaultDurationWorkstation}
            />
            <PrivateRoute
              path="/reservation/duration_workstation/daily/:pageType"
              component={DailyDurationWorkstation}
            />

            <PrivateRoute
              path="/reservation/reservation_order/create/:selectedDate/:selectedStartTime"
              component={CreateReservationPage}
            />
            <PrivateRoute path="/reservation/reservation_order/create" component={CreateReservationPage} />
            <PrivateRoute path="/reservation/reservation_order/edit/:reservationId" component={CreateReservationPage} />
            <PrivateRoute path="/reservation/reservation_order/list" component={ListReservationPage} />

            <PrivateRoute path="/reservation/week_schedule/show" component={WeekSchedulePage} />

            <PrivateRoute path="/reservation" component={DashboardPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert,
  };
}

export default connect(mapStateToProps)(App);
