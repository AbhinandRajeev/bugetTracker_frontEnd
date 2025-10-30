import React from "react";
import { Box, Container, Typography, IconButton } from "@mui/material";
import { IoMailOpenOutline } from "react-icons/io5";
import { MdPhoneAndroid } from "react-icons/md";
import { SiWhatsapp } from "react-icons/si";
import { FaInstagram } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(90deg, #0a0033 40%, #35046a 100%)",
        borderTop: "2px solid #AF52DE",
        color: "white",
        py: { xs: 4, md: 6 },
        
        boxShadow: "0 -2px 24px 0 rgba(175,82,222,0.25)",
      }}
    >
      <Container maxWidth="md">
        {/* Contact Us Title */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            letterSpacing: 2,
            fontWeight: 700,
            color: "#AF52DE",
            textShadow: "0 2px 16px rgba(175,82,222,0.18)",
          }}
        >
          CONTACT US
        </Typography>

        {/* Email & Phone */}
        <Box display="flex" flexDirection={{ xs: "column", md: "row" }} justifyContent="center" alignItems="center" gap={2} mb={2}>
          <Typography
            variant="h6"
            align="center"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
              opacity: 0.85,
            }}
          >
            <IoMailOpenOutline style={{ marginRight: 10, color: "#AF52DE" }} />
            budgettracker@gmail.com
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "#fff",
              opacity: 0.85,
            }}
          >
            <MdPhoneAndroid style={{ marginRight: 10, color: "#AF52DE" }} />
            9898989898
          </Typography>
        </Box>

        {/* Social Media */}
        <Box textAlign="center" sx={{ mt: 3 }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#AF52DE",
              letterSpacing: 1,
              fontWeight: 700,
              mb: 1,
            }}
          >
            CONNECT WITH US
          </Typography>
          <Box>
            <IconButton href="#" sx={{ color: "#25D366", mx: 1 }}>
              <SiWhatsapp size={23} />
            </IconButton>
            <IconButton href="#" sx={{ color: "#E1306C", mx: 1 }}>
              <FaInstagram size={26} />
            </IconButton>
            <IconButton href="#" sx={{ color: "#0A66C2", mx: 1 }}>
              <CiLinkedin size={27} />
            </IconButton>
          </Box>
        </Box>

        {/* Copyright */}
        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 4,
            color: "#B5B5FF",
            fontSize: 16,
            letterSpacing: 1,
            fontWeight: 400,
            opacity: 0.8,
          }}
        >
          © Budget Tracker. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
