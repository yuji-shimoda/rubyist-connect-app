import * as React from 'react';
import Top from './components/Top';
import NotFound from './components/NotFound';
import { ProvideAuth } from './auth.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import { CssBaseline, Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <ProvideAuth>
          <Router>
            <Routes>
              <Route element={<Top />} path="/" />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Router>
        </ProvideAuth>
        <CssBaseline />
      </Grid>
    </ThemeProvider>
  );
}
