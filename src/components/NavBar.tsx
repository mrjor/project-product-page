import { useState, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

// Array of pages to be displayed in the navigation menu
const pages = [
  {
    name: 'Products',
    path: '/'
  },
  {
    name: 'Wishlists',
    path: '/wishlists'
  }
];

/**
 * The `NavBar` component renders a responsive navigation bar using Material-UI components.
 * 
 * The navigation bar displays different menu items depending on the screen size:
 * - For larger screens, it shows a horizontal list of navigation buttons.
 * - For smaller screens, it shows a menu icon that opens a dropdown menu with navigation options.
 * 
 * It uses React hooks for managing state and navigation:
 * - `useState` to handle the open/closed state of the mobile menu.
 * - `useNavigate` from `react-router-dom` to handle client-side navigation.
 * 
 * @returns {JSX.Element} The rendered `NavBar` component.
 */
function NavBar() {
  // Hook to manage the open/closed state of the mobile menu
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();

  /**
   * Handles opening the mobile navigation menu.
   * 
   * @param {MouseEvent<HTMLElement>} event - The event object from the click event.
   */
  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  /**
   * Handles clicking a menu item and navigates to the corresponding path.
   * 
   * @param {MouseEvent<HTMLElement>} event - The event object from the click event.
   */
  const handleOnClickNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  /**
   * Closes the mobile navigation menu.
   */
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* App logo/icon for larger screens */}
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          
          {/* App title for larger screens */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            APP
          </Typography>

          {/* Mobile menu icon and dropdown menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              disableScrollLock={true}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={e => {
                  handleOnClickNavMenu(e);
                  navigate(page.path);
                }}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* App logo/icon for smaller screens */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          
          {/* App title for smaller screens */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            APP
          </Typography>

          {/* Navigation buttons for larger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={e => {
                  handleOnClickNavMenu(e);
                  navigate(page.path);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
