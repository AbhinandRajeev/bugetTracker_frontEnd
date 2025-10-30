import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';

function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "linear-gradient(90deg, #0a0033 40%, #35046a 100%)",
          borderBottom: "2px solid #AF52DE",
          boxShadow: "0 2px 24px 0 rgba(175,82,222,0.20)"
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              color: "#AF52DE",
              '&:hover': { color: "#fff", background: "rgba(175,82,222,0.14)" }
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 800,
              letterSpacing: 2,
              color: "#fff",
              textTransform: "uppercase",
              textShadow: "0 2px 18px #af52de77"
            }}
          >
            BUDGET TRACKER
          </Typography>
          <Tooltip title="Expense Tracker: manage your spending with ease.">
            <Button
              sx={{
                color: "#fff",
                fontWeight: 600,
                letterSpacing: 1,
                border: "1.4px solid #AF52DE",
                borderRadius: "22px",
                px: 3,
                py: 1,
                ml: 2,
                background: "rgba(175,82,222,0.10)",
                boxShadow: "0 1px 12px 0 #AF52DE44",
                
              }}
            >
              About Us
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
