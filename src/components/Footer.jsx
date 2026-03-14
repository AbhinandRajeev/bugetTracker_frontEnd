import React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { SiWhatsapp } from "react-icons/si";
import { FaInstagram, FaTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "#05001a",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        color: "rgba(255, 255, 255, 0.6)",
        py: 2.5,
      }}
    >
      <Container maxWidth="xl">
        <Box 
          display="flex" 
          flexDirection={{ xs: "column", sm: "row" }} 
          justifyContent="space-between" 
          alignItems="center"
          gap={2}
        >
          <Typography variant="body2" sx={{ fontSize: "0.875rem" }}>
            © {new Date().getFullYear()} Budget Tracker. All rights reserved.
          </Typography>

          <Box display="flex" gap={1}>
            <IconButton size="small" sx={{ color: "rgba(255, 255, 255, 0.6)", '&:hover': { color: "#1DA1F2" } }}>
              <FaTwitter size={18} />
            </IconButton>
            <IconButton size="small" sx={{ color: "rgba(255, 255, 255, 0.6)", '&:hover': { color: "#E1306C" } }}>
              <FaInstagram size={18} />
            </IconButton>
            <IconButton size="small" sx={{ color: "rgba(255, 255, 255, 0.6)", '&:hover': { color: "#0A66C2" } }}>
              <CiLinkedin size={18} />
            </IconButton>
            <IconButton size="small" sx={{ color: "rgba(255, 255, 255, 0.6)", '&:hover': { color: "#25D366" } }}>
              <SiWhatsapp size={18} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
