import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaWallet, FaChartLine, FaMobileAlt, FaShieldAlt } from 'react-icons/fa';

function LandingPage() {
  return (
    <>
      <Box
        component="section"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%",
          backgroundImage: `url(/images/banner.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          px: { xs: 2, md: 8 },
          textAlign: "left",
          color: '#fff',
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.3)',
            zIndex: 1,
          }}
        />
        {/* Content and Image Container */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: 1200,
            mx: "auto"
          }}
        >
          {/* Left */}
          <Box sx={{ flex: 1, pr: { md: 8 }, mb: { xs: 8, md: 0 } }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 900,
                letterSpacing: 2,
                mb: 1,
                color: "#fff",
                textShadow: "0 2px 8px rgba(0,0,0,0.18)",
                lineHeight: 1.1
              }}
            >
              <span style={{ borderBottom: "2px solid #fff", paddingBottom: 2 }}>BUDGET</span><br />
              <span style={{
                WebkitTextStroke: "1px #fff", color: "transparent"
              }}>TRACKER</span>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 4,
                fontSize: 18,
                color: "#eee",
                fontWeight: 400,
                letterSpacing: 0.5,
                maxWidth: 400,
                textShadow: "0 1px 4px rgba(0,0,0,0.22)"
              }}
            >
              The right app makes it easy to manage your expenses on the go.<br />
              Personal Capital ·
            </Typography>
            <Link to={'/homepage'}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  background: '#fff',
                  color: '#2d2d2d',
                  borderRadius: '32px',
                  fontWeight: 700,
                  fontSize: 18,
                  px: 6,
                  py: 2,
                  boxShadow: '0 4px 20px 0 rgba(74,144,226,0.13)',
                  letterSpacing: 1,
                  '&:hover': { background: '#ececec' },
                }}
              >
                Plan Now
              </Button>
            </Link>
          </Box>
          {/* Right */}
          <Box
            sx={{
              flex: 1.2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src="/images/debit.png"
              alt="Card"
              sx={{
                width: { xs: "95vw", md: "550px" },
                maxWidth: "100%",
                boxShadow: '0 16px 48px rgba(0,0,0,0.32)',
                borderRadius: '24px',
                transform: { xs: "none", md: "rotate(-12deg)" },
                transition: "transform 0.2s ease"
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box component="section" sx={{ py: 8, bgcolor: "grey.100" }}>
      <Typography
        variant="h3"
        align="center"
        fontWeight="bold"
        gutterBottom
        sx={{ mb: 6 }}
      >
        What We Do
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          px: { xs: 2, md: 8 },
        }}
      >
        {/* Left side - Features */}
        <Box flex={1}>
          <Box display="flex" flexDirection="column" gap={4}>
            {/* Expense Tracking */}
            <Box display="flex" gap={2} alignItems="flex-start">
              <FaWallet size={28} color="#1976d2" />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Expense Tracking
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Easily log your daily expenses and get clear insights into your spending habits.
                </Typography>
              </Box>
            </Box>

            {/* Budget Planning */}
            <Box display="flex" gap={2} alignItems="flex-start">
              <FaChartLine size={28} color="#d32f2f" />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Budget Planning
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create and customize budgets to keep your finances on track and save more effectively.
                </Typography>
              </Box>
            </Box>

            {/* Mobile Access */}
            <Box display="flex" gap={2} alignItems="flex-start">
              <FaMobileAlt size={28} color="#2e7d32" />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Mobile Access
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage your finances on the go with our fully responsive mobile-friendly app.
                </Typography>
              </Box>
            </Box>

            {/* Security */}
            <Box display="flex" gap={2} alignItems="flex-start">
              <FaShieldAlt size={28} color="#ed6c02" />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Security
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We prioritize your data security with encrypted transactions and secure authentication.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Right side - Image */}
        <Box flex={1} textAlign="center">
          <Box
            component="img"
            src="/images/budget.jpg" // Replace with your budget tracker image path
            alt="Budget Tracker Example"
            sx={{
              maxWidth: "75%",
              height: "auto",
              borderRadius: 4,
              boxShadow: 6,
            }}
          />
        </Box>
      </Box>
    </Box>
    </>
  );
}

export default LandingPage;
