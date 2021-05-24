import {CommonActions, StackActions} from '@react-navigation/native';

export default class RootNavigator {

  static setTopLevelNavigator = (ref) => {
    this.navigationRef = ref;
  };

  /**
   * Navigate will pop back to earlier in the stack if a route of the given name is already present.
   *
   * Example:  NavigationService.navigate('ProfileScreen', { username: 'buyer1@prostylee.vn' });
   *
   * @param routeName The route name
   * @param params The param
   */
  static navigate = (routeName, params) => {
    this.navigationRef?.navigate(routeName, params);
  };

  /**
   * Push will always add on top, so a route can be present multiple times
   */
  static push = (routeName, params) => {
    const pushAction = StackActions.push(routeName, params);
    this.navigationRef?.dispatch(pushAction);
  };

  /**
   * Back to a previous screen in the stack
   */
  static pop = () => {
    const popAction = StackActions.pop(1);
    this.navigationRef?.dispatch(popAction);
  };

  /**
   * Takes a back to the first screen in the stack, dismissing all the others
   */
  static popToTop = () => {
    this.navigationRef?.dispatch(StackActions.popToTop());
  };

  /**
   * Go back to the previous route in history.
   *
   * The same with pop()
   */
  static goBack = () => {
    this.navigationRef?.dispatch(CommonActions.goBack());
  };

  /**
   * Clear all screens in stack and navigate to the given screen
   */
  static reset = (routeName, params) => {
    this.navigationRef?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: routeName,
            params: params,
          },
        ],
      })
    );
  };

  /**
   * Clear all screens in stack and navigate to the given sub screen of route screen
   */
  static resetToSubAction = (routeName, subRouteName, params) => {
    this.navigationRef?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: routeName,
            params: {
              name: subRouteName,
              params: params,
            },
          },
        ],
      })
    );
  }
}