import React from "react";
import Box from "@mui/material/Box";
import AuthWrapper from "../AuthWrapper";
import LoginPage from "./Login";
import AppLogo from "@crema/core/AppLayout/components/AppLogo";
import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
import { Fonts } from "../../../shared/constants/AppEnums";

const Signin = () => {
  const history = useHistory();

  return (
    <AuthWrapper>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: { xs: 6, xl: 8 } }}>
          <Box
            sx={{
              mb: 5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 30,
                mb: 4,
              }}
            >
              Arkad
            </Typography>

            {/* <AppLogo /> */}
          </Box>
        </Box>

        <LoginPage />
      </Box>
    </AuthWrapper>
  );
};

export default Signin;
