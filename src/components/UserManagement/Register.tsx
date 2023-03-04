/* eslint-disable react-hooks/rules-of-hooks */
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import BadgeTwoToneIcon from "@mui/icons-material/BadgeTwoTone";
import MailLockTwoToneIcon from "@mui/icons-material/MailLockTwoTone";
import VpnKeyTwoToneIcon from "@mui/icons-material/VpnKeyTwoTone";
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { memo, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  RESET_STATE,
  SET_ANSWER,
  SET_CONFIRM_PASSWORD,
  SET_CONFIRM_PASSWORD_ERROR,
  SET_EMAIL,
  SET_EMAIL_ERROR,
  SET_FIRST_NAME,
  SET_LAST_NAME,
  SET_PASSWORD,
  SET_PASSWORD_ERROR,
  SET_SELECTED_QUESTION,
} from "../../reducers/registerReducer/action.types";
import {
  registerReducer,
  registerReducerInitialState,
} from "../../reducers/registerReducer/registerReducer";
import {
  useCheckPasswordStrength,
  useValidateEmail,
} from "../../shared-hooks/hooks";
import { securityQuestions } from "../../utilities/SecurityQuestions/SecurityQuestions";

export interface IRegisterProps {}

const Register: React.FunctionComponent<IRegisterProps> = () => {
  const [state, dispatch] = useReducer(
    registerReducer,
    registerReducerInitialState
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = useValidateEmail(state.email);
    const isStrongPassword = useCheckPasswordStrength(state.password);

    if (!isEmailValid) {
      dispatch({ type: SET_EMAIL_ERROR, payload: true });
      return;
    } else {
      dispatch({ type: SET_EMAIL_ERROR, payload: false });
    }

    if (!isStrongPassword) {
      dispatch({ type: SET_PASSWORD_ERROR, payload: true });
      return;
    } else {
      dispatch({ type: SET_PASSWORD_ERROR, payload: false });
    }

    if (state.password !== state.confirmPassword) {
      dispatch({ type: SET_CONFIRM_PASSWORD_ERROR, payload: true });
      return;
    } else {
      dispatch({ type: SET_CONFIRM_PASSWORD_ERROR, payload: false });
    }

    if (
      state.firstName &&
      state.lastName &&
      state.email &&
      state.password &&
      state.confirmPassword &&
      isEmailValid &&
      state.password === state.confirmPassword
    ) {
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
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3, maxWidth: 450 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={state.firstName}
                  onChange={(e) =>
                    dispatch({ type: SET_FIRST_NAME, payload: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeTwoToneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={state.lastName}
                  onChange={(e) =>
                    dispatch({ type: SET_LAST_NAME, payload: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeTwoToneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
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
                {state.passwordError && (
                  <Typography
                    component="p"
                    sx={{
                      color: "red",
                    }}
                  >
                    Password must be at least 8 characters, contain at least one
                    uppercase letter, one lowercase letter, one number and one
                    special character(@$!%*#+?&).
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="new-password"
                  value={state.confirmPassword}
                  onChange={(e) =>
                    dispatch({
                      type: SET_CONFIRM_PASSWORD,
                      payload: e.target.value,
                    })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyTwoToneIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                {state.confirmPasswordError && (
                  <Typography
                    component="p"
                    sx={{
                      color: "red",
                    }}
                  >
                    Passwords do not match
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sm={8}>
                <FormControl fullWidth>
                  <InputLabel id="security-question-label">
                    Security Question
                  </InputLabel>
                  <Select
                    labelId="security-question-label"
                    id="security-question"
                    value={state.selectedQuestion?.id ?? ""}
                    label="Security Question"
                    onChange={(event) => {
                      const selectedId = parseInt(event.target.value as string);
                      const question = securityQuestions.find(
                        (q) => q.id === selectedId
                      );
                      dispatch({
                        type: SET_SELECTED_QUESTION,
                        payload: question,
                      });
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {securityQuestions.map((question) => (
                      <MenuItem key={question.id} value={question.id}>
                        {question.question}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormHelperText id="helper-text">
                  You will need to answer one of the security questions if you
                  have forgotten your password.
                </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  name="answer"
                  label="Answer"
                  type="text"
                  id="answer"
                  autoComplete="off"
                  value={state.answer}
                  onChange={(e) =>
                    dispatch({ type: SET_ANSWER, payload: e.target.value })
                  }
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  variant="body2"
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    navigate("/login", {
                      replace: true,
                    })
                  }
                >
                  {"Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default memo(Register);
