import React from 'react';
import Redirect from 'umi/redirect';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import Authorized from '@/utils/Authorized';
import { getAuthority } from '@/utils/authority';
import Exception403 from '@/pages/Exception/403';

function AuthComponent({ children, location, routerData, currentUser }) {
  const auth = getAuthority();
  // const islogin1 = currentuser && currentuser[0] !== null;
  const isLogin = auth && auth[0] !== 'guest';
  // if (currentUser.name == null) {
  //   return <Redirect to="/user/login" />;
  // }
  const getRouteAuthority = (path, routeData) => {
    let authorities;
    routeData.forEach(route => {
      // match prefix
      if (pathToRegexp(`${route.path}(.*)`).test(path)) {
        authorities = route.authority || authorities;

        // get children authority recursively
        if (route.routes) {
          authorities = getRouteAuthority(path, route.routes) || authorities;
        }
      }
    });
    return authorities;
  };
  return (
    <Authorized
      authority={getRouteAuthority(location.pathname, routerData)}
      noMatch={isLogin ? <Exception403 /> : <Redirect to="/user/login" />}
    >
      {children}
    </Authorized>
  );
}
export default connect(({ menu: menuModel, user }) => ({
  currentUser: user.currentUser,
  routerData: menuModel.routerData,
}))(AuthComponent);
