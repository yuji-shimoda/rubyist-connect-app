import * as React from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Toolbar,
  Typography,
  Container,
  Pagination,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import { useAuth } from '../auth';
import { usePagination } from './Pagination';

export default function Users() {
  const { user, rubyists, logout } = useAuth();
  const [page, setPage] = React.useState(1);
  const DISPLAY_COUNT = 8;
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const count = Math.ceil(rubyists.length / DISPLAY_COUNT);
  const _DATA = usePagination(rubyists, DISPLAY_COUNT);
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      <AppBar position="relative" color="error">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Rubyist Connect
          </Typography>
          <div style={{ flexGrow: 1 }}></div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ mr: '10px' }}>
                <Avatar alt={user?.displayName} src={user?.photoURL} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ height: '100vh', mt: '50px', mb: '50px' }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ mb: '10px' }}>
          {rubyists
            ? _DATA.currentData().map((rubyist) => (
                <Grid item key={rubyist.id} xs={8} sm={5} md={3} lg={3} xl={3}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={rubyist.image}
                      alt={rubyist.nickname}
                      sx={{ mt: '30' }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {rubyist.nickname}
                      </Typography>
                      <Typography>{rubyist.introduction.slice(0, 10) + ' ...'}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : ''}
        </Grid>
        <Grid container justifyContent="center" sx={{ mt: '30px', mb: '30px' }}>
          <Pagination
            count={count}
            page={page}
            onChange={handleChange}
            color="error"
            sx={{ mb: '30px' }}
          />
        </Grid>
      </Container>
    </>
  );
}
