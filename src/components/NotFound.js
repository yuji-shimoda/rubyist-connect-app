import { Grid } from '@mui/material';

function NotFound() {
  return (
    <Grid
      container
      sx={{
        height: '100vh',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${process.env.PUBLIC_URL}/404.png)`,
        backgroundColor: (t) =>
          t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        backgroundSize: '50%',
        backgroundPosition: 'center',
      }}></Grid>
  );
}

export default NotFound;
