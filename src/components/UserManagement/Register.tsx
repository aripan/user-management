import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
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
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  ISecurityQuestionProps,
  securityQuestions,
} from "../../utilities/SecurityQuestions/SecurityQuestions";

// Define the Props interface
export interface IRegisterProps {}

// Define the State interface
interface IRegisterState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  selectedQuestion: ISecurityQuestionProps | undefined;
  answer: string;
  emailError: boolean;
  passwordError: boolean;
  confirmPasswordError: boolean;
}

const Register: React.FunctionComponent<IRegisterProps> = (props) => {
  const initialRegisterState: IRegisterState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    selectedQuestion: undefined,
    answer: "",
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
  };

  // all states
  const [state, setState] = useState<IRegisterState>(initialRegisterState);

  const theme = createTheme();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isEmailValid = validateEmail(state.email);
    const isStrongPassword = checkPasswordStrength(state.password);

    if (!isEmailValid) {
      setState({ ...state, emailError: true });
      return;
    }
    if (!isStrongPassword) {
      setState({ ...state, passwordError: true });
      return;
    }
    if (state.password !== state.confirmPassword) {
      setState({ ...state, confirmPasswordError: true });
      return;
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
      setState(initialRegisterState);
    } else {
      alert("Something went wrong!");
    }
  };

  const validateEmail = (email: string): boolean => {
    // regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const checkPasswordStrength = (password: string): boolean => {
    // regular expression for checking strong password validation
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return strongPasswordRegex.test(password);
  };

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
                    setState({ ...state, firstName: e.target.value })
                  }
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
                    setState({ ...state, lastName: e.target.value })
                  }
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
                    setState({ ...state, email: e.target.value });
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
                    setState({ ...state, password: e.target.value })
                  }
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
                    special character.
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
                    setState({ ...state, confirmPassword: e.target.value })
                  }
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
                    special character.
                  </Typography>
                )}
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
                      setState({ ...state, selectedQuestion: question });
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
                    setState({ ...state, answer: e.target.value })
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
export default Register;
