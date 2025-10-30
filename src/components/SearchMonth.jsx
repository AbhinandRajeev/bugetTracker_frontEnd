import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

function SearchMonth({ onSearch }) {
  const [month, setMonth] = useState("");

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
      <TextField label="Search Month" value={month} onChange={(e) => setMonth(e.target.value)} />
      <Button onClick={() => onSearch(month)} sx={{ ml: 2 }} variant="outlined">Search</Button>
    </Box>
  );
}
export default SearchMonth;
