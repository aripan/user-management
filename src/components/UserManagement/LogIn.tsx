/* eslint-disable react-hooks/rules-of-hooks */
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import MailLockTwoToneIcon from "@mui/icons-material/MailLockTwoTone";
import VpnKeyTwoToneIcon from "@mui/icons-material/VpnKeyTwoTone";
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  InputAdornment,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { memo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  RESET_STATE,
  SET_EMAIL,
  SET_EMAIL_ERROR,
  SET_PASSWORD,
} from "../../reducers/loginReducer/action.types";
import {
  loginReducer,
  loginReducerInitialState,
} from "../../reducers/loginReducer/loginReducer";
import { useValidateEmail } from "../../shared-hooks/hooks";

export interface ILoginProps {}

const Login: React.FunctionComponent<ILoginProps> = () => {
  const [state, dispatch] = useReducer(loginReducer, loginReducerInitialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = useValidateEmail(state.email);

    if (!isEmailValid) {
      dispatch({ type: SET_EMAIL_ERROR, payload: true });
      return;
    } else {
      dispatch({ type: SET_EMAIL_ERROR, payload: false });
    }

    if (state.email && state.password && isEmailValid) {
      console.log(state);

      // clear data
      dispatch({ type: RESET_STATE, payload: {} });
    } else {
      alert("Something went wrong!");
    }
  };

  const theme = createTheme();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "80vh",
          marginTop: 5,
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#1565c0", width: 50, height: 50 }}>
            <AssignmentIndOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3, maxWidth: 450 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={state.email}
                  onChange={(e) => {
                    dispatch({ type: SET_EMAIL, payload: e.target.value });
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailLockTwoToneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {state.emailError && (
                  <Typography
                    component="p"
                    sx={{
                      color: "red",
                    }}
                  >
                    Invalid input
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={state.password}
                  onChange={(e) =>
                    dispatch({ type: SET_PASSWORD, payload: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyTwoToneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate("/forgotPassword", {
                      replace: true,
                    })
                  }
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate("/register", {
                      replace: true,
                    })
                  }
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default memo(Login);
