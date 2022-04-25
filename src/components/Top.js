import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../auth';
import Copyright from './Copyright';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Top() {
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      await auth.login();
      navigate('/nnect');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8}
          sx={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/coding.png)`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: '50%',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minWidth: '320px',
              minHeight: '480px',
            }}>
            <img
              src="https://rubyist.co/assets/user-count-icon-4b7905677bc612a9f200e410a2a292756fa726e9b6c319e99dadf6ab5febfe62.png"
              alt="Ruby Icon"
              width="30%"></img>
            <Typography component="h4" variant="h4" sx={{ mb: 2, mt: 2 }}>
              Rubyist Connect
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {t('serviceDescription')}
            </Typography>
            <Button onClick={handleSubmit} variant="contained" color="error" sx={{ mt: 3, mb: 2 }}>
              Sign In with GitHub
            </Button>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
