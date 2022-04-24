import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { app } from "./firebase";
import { getAuth, signInWithRedirect, GithubAuthProvider } from "firebase/auth";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Rubyist Connect
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignInSide() {
  const handleSubmit = (event) => {
    console.log("handleSubmit");
    const auth = getAuth();
    const provider = new GithubAuthProvider();
    provider.addScope("user");
    signInWithRedirect(auth, provider)
      .then((result) => {})
      .catch((error) => {});
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/coding.png)`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "50%",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
              Rubyist Connect
            </Typography>
            <img
              src="https://rubyist.co/assets/user-count-icon-4b7905677bc612a9f200e410a2a292756fa726e9b6c319e99dadf6ab5febfe62.png"
              alt="Ruby Icon"
              width="50%"
            ></img>
            <Typography variant="body2" sx={{ mt: 2 }}>
              身近で趣味の近い Rubyist を探すことができます。
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              魅力的な Rubyist とつながってみませんか。
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In with GitHub
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
