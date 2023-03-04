import CableOutlinedIcon from "@mui/icons-material/CableOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useCallback, useReducer } from "react";
import {
  ENABLE_SET_PASSWORD,
  RESET_STATE,
  SET_ANSWER,
  SET_CONFIRM_PASSWORD,
  SET_CONFIRM_PASSWORD_ERROR,
  SET_EMAIL,
  SET_EMAIL_ERROR,
  SET_PASSWORD,
  SET_PASSWORD_ERROR,
  SET_SELECTED_QUESTION,
} from "../../reducers/forgotPasswordReducer/action.types";
import {
  forgotPasswordReducer,
  forgotPasswordReducerInitialState,
} from "../../reducers/forgotPasswordReducer/forgotPasswordReducer";
import { securityQuestions } from "../../utilities/SecurityQuestions/SecurityQuestions";
// Define the Props interface
export interface IForgotPasswordProps {}

const ForgotPassword: React.FunctionComponent<IForgotPasswordProps> = () => {
  // Declare the state using useState
  const [state, dispatch] = useReducer(
    forgotPasswordReducer,
    forgotPasswordReducerInitialState
  );

  const handleOldSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = validateEmail(state.email);

    if (!isEmailValid) {
      dispatch({ type: SET_EMAIL_ERROR, payload: true });
      return;
    } else {
      dispatch({ type: SET_EMAIL_ERROR, payload: false });
    }

    if (state.email && state.selectedQuestion && state.answer && isEmailValid) {
      console.log(state);
      setTimeout(() => {
        dispatch({ type: ENABLE_SET_PASSWORD, payload: true });
      }, 500);
    } else {
      alert("Something went wrong!");
    }
  };
  const handleNewSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = validateEmail(state.email);
    const isStrongPassword = checkPasswordStrength(state.password);

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
      state.email &&
      state.password &&
      state.confirmPassword &&
      isEmailValid &&
      isStrongPassword
    ) {
      console.log(state);

      // clear data
      dispatch({ type: RESET_STATE, payload: {} });
    } else {
      alert("Something went wrong!");
    }
  };

  const validateEmail = useCallback((email: string): boolean => {
    // regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }, []);

  const checkPasswordStrength = useCallback((password: string): boolean => {
    // regular expression for checking strong password validation
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#+?&])[A-Za-z\d@$!%*#+?&]{8,}$/;
    return strongPasswordRegex.test(password);
  }, []);

  const theme = createTheme();
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
            {state.enableSetPassword ? (
              <CableOutlinedIcon fontSize="large" />
            ) : (
              <PermIdentityOutlinedIcon fontSize="large" />
            )}
          </Avatar>
          <Typography component="h1" variant="h5">
            {state.enableSetPassword
              ? "Set your password"
              : "Confirm your identity"}
          </Typography>
          <Box
            component="form"
            onSubmit={
              state.enableSetPassword ? handleNewSubmit : handleOldSubmit
            }
            noValidate
            sx={{ mt: 3, maxWidth: 450 }}
          >
            {state.enableSetPassword ? (
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
                  />
                  {state.passwordError && (
                    <Typography
                      component="p"
                      sx={{
                        color: "red",
                      }}
                    >
                      Password must be at least 8 characters, contain at least
                      one uppercase letter, one lowercase letter, one number and
                      one special character(@$!%*#+?&).
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
              </Grid>
            ) : (
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

                <Grid item xs={12} sm={8}>
                  <FormControl fullWidth required>
                    <InputLabel id="security-question-label">
                      Security Question
                    </InputLabel>
                    <Select
                      labelId="security-question-label"
                      id="security-question"
                      value={state.selectedQuestion?.id ?? ""}
                      label="Security Question"
                      onChange={(event) => {
                        const selectedId = parseInt(
                          event.target.value as string
                        );
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
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    required
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
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default ForgotPassword;
