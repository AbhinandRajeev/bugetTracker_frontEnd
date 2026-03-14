import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';

function Header() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: "#05001a",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: "64px", justifyContent: "space-between" }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccountBalanceWalletIcon 
              sx={{ 
                color: "#AF52DE", 
                fontSize: 28, 
                mr: 1.5, 
              }} 
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#"
              sx={{
                fontWeight: 700,
                letterSpacing: 0.5,
                color: "#fff",
                textDecoration: "none",
              }}
            >
              BudgetTracker
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Tooltip title="Learn more about Budget Tracker">
              <Button
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  display: { xs: 'none', sm: 'block' },
                  '&:hover': { color: "#fff", background: "rgba(255,255,255,0.05)" }
                }}
              >
                About
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
