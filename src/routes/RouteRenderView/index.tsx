import React from "react";
import { Route, Switch } from "react-router-dom";
import { AppSuspense } from "../../@crema/index";
import {
  anonymousStructure,
  authorizedStructure,
  unAuthorizedStructure,
} from "../routeConfig";
import AppFooter from "../../@crema/core/AppLayout/components/AppFooter";
import AppErrorBoundary from "../../@crema/core/AppErrorBoundary";
import generateRoutes from "../../@crema/utility/RouteGenerator";
import { useAuthUser } from "../../@crema/utility/AuthHooks";
import Error404 from "../../pages/errorPages/Error404";
import Box from "@mui/material/Box";
import RouteRenderViewWrapper from "./RouteRenderViewWrapper";
import { SxProps } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";

interface AppContentViewProps {
  sxStyle?: SxProps;
}

const AppContentView: React.FC<AppContentViewProps> = ({ sxStyle }) => {
  // console.log("here")
  // const auth = useSelector((state: any) => state.auth.user);
  // console.log(auth);
  // // const isAuthenticated = useSelector((state: any) => state.auth.user);
  // var isAuthenticated: boolean = false;
  // if (auth) {
  //   isAuthenticated = true;
  // }
  const { user, isAuthenticated } = useAuthUser();
  // console.log("isAuth", isAuthenticated);
  return (
    <RouteRenderViewWrapper>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          p: { xs: 5, md: 7.5, xl: 12.5 },
          ...sxStyle,
        }}
        className="app-content"
      >
        <AppSuspense>
          <AppErrorBoundary>
            <Switch>
              {generateRoutes({
                isAuthenticated: isAuthenticated,
                userRole: "user",
                unAuthorizedStructure,
                authorizedStructure,
                anonymousStructure,
              })}
              <Route path="/">
                <Error404 />
              </Route>
            </Switch>
          </AppErrorBoundary>
        </AppSuspense>
      </Box>
      <AppFooter />
    </RouteRenderViewWrapper>
  );
};

export default AppContentView;
