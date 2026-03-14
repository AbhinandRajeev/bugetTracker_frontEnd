import React, { useState } from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
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
    setFormSubmitted(false); // Reset to show form if desired, or keep search view
  };

  return (
    <Box sx={{ minHeight: "calc(100vh - 130px)", background: "#05001a", py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        {!formSubmitted ? (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ color: "#fff", fontWeight: 600, mb: 1 }}>
              Monthly Budget Tracker
            </Typography>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", mb: 4 }}>
              Enter your income and expenses to track your financial health.
            </Typography>
            <BudgetForm onBudgetAdded={handleBudgetAdded} />
          </Box>
        ) : (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
              <Typography variant="h5" sx={{ color: "#fff", fontWeight: 600 }}>
                Budget Overview
              </Typography>
              <SearchMonth onSearch={fetchBudgetData} />
            </Box>

            {budgetData ? (
              <BudgetPreview data={budgetData} onDeleted={handleDeleted} />
            ) : (
              <Paper 
                elevation={0}
                sx={{ 
                  p: 6, 
                  textAlign: "center", 
                  background: "#130f26", // Solid dark gray-purple surface
                  borderRadius: 2,
                  border: "1px solid rgba(255,255,255,0.08)"
                }}
              >
                <Typography variant="h6" sx={{ color: "rgba(255,255,255,0.7)" }}>
                  No budget data found for this month.
                </Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.5)", mt: 1 }}>
                  Try searching for a different month or go back to add a new budget.
                </Typography>
              </Paper>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default HomePage;
