import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import BudgetForm from "../components/BudgetForm";
import BudgetPreview from "../components/BudgetPreview";
import SearchMonth from "../components/SearchMonth";
import { getBudgetByMonthAPI } from "../services/allAPI";

function HomePage() {
  const [budgetData, setBudgetData] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Fetch data by month
  const fetchBudgetData = async (month) => {
    const response = await getBudgetByMonthAPI(month);
    if (response && response.length > 0) {
      setBudgetData(response[0]);
    } else {
      setBudgetData(null);
    }
  };

  // Called when form is submitted
  const handleBudgetAdded = async (month) => {
    setFormSubmitted(true); 
    await fetchBudgetData(month); 
  };

  // Called when a budget is deleted
  const handleDeleted = () => {
    setBudgetData(null); 
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Monthly Budget Tracker
      </Typography>

      {/* Show Form only until submitted */}
      {!formSubmitted ? (
        <BudgetForm onBudgetAdded={handleBudgetAdded} />
      ) : (
        <>
          {/* Search Bar */}
          <Box sx={{ mt: 4 }}>
            <SearchMonth onSearch={fetchBudgetData} />
          </Box>

          {/* Preview Section */}
          {budgetData ? (
            <Box sx={{ mt: 4 }}>
              
              <BudgetPreview data={budgetData} onDeleted={handleDeleted} />
            </Box>
          ) : (
            <Typography sx={{ mt: 2, color: "gray" }}>
              No budget data found for this month.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}

export default HomePage;
