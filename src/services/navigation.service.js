import 'react-native-gesture-handler';
import {NavigationActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function getNavigator() {
  return _navigator;
}

function getRouteByNav(nav) {
  if (Array.isArray(nav.routes) && nav.routes.length > 0) {
    return getRouteByNav(nav.routes[nav.index]);
  } else {
    return nav.routeName;
  }
}

function getCurrentRoute() {
  return getRouteByNav(_navigator.state.nav);
}

function navigate(routeName, params) {
  const act = NavigationActions.navigate({
    routeName,
    params,
  });

  _navigator.dispatch(act);
}

function goBack() {
  _navigator.dispatch(NavigationActions.back());
}

// add other navigation functions that you need and export them

export default {
  goBack,
  navigate,
  setTopLevelNavigator,
  getNavigator,
  getRouteByNav,
  getCurrentRoute,
};
