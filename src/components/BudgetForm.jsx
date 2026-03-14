import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  IconButton,
  Paper,
  Divider,
  Stack,
  InputAdornment,
} from "@mui/material";
import { Add, Delete, Check } from "@mui/icons-material";
import { addBudgetAPI, getBudgetByMonthAPI, updateBudgetAPI } from "../services/allAPI";
import Swal from "sweetalert2";

// Standard dark theme input styles
const textFieldSx = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: "#1c182b",
    borderRadius: 1,
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.15)" },
    "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
    "&.Mui-focused fieldset": { borderColor: "#AF52DE", borderWidth: "1px" },
  },
  "& .MuiInputLabel-root": { color: "rgba(255, 255, 255, 0.5)" },
  "& .MuiInputLabel-root.Mui-focused": { color: "#AF52DE" },
  "& .MuiInputAdornment-root p": { color: "rgba(255, 255, 255, 0.5)" },
  "& input": { color: "#fff" }
};

function BudgetForm({ onBudgetAdded }) {
  const [formData, setFormData] = useState({
    month: "",
    income: "",
    expenses: [{ category: "", amount: "" }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleExpenseChange = (index, field, value) => {
    const updated = [...formData.expenses];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, expenses: updated });
  };

  const addExpenseRow = () => {
    setFormData({
      ...formData,
      expenses: [...formData.expenses, { category: "", amount: "" }],
    });
  };

  const removeExpenseRow = (index) => {
    const updated = formData.expenses.filter((_, i) => i !== index);
    setFormData({ ...formData, expenses: updated.length ? updated : [{ category: "", amount: "" }] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedExpenses = formData.expenses
      .map((it) => ({ category: (it.category || "").trim(), amount: Number(it.amount || 0) }))
      .filter((it) => it.category !== "" && !isNaN(it.amount) && it.amount >= 0);

    const totalExpenses = normalizedExpenses.reduce((sum, it) => sum + it.amount, 0);
    const incomeNum = Number(formData.income || 0);
    const savings = incomeNum - totalExpenses;

    const payload = {
      month: formData.month,
      income: incomeNum,
      expenses: normalizedExpenses,
      totalExpenses,
      savings,
    };

    try {
      const existing = await getBudgetByMonthAPI(formData.month);
      if (existing && existing.length > 0) {
        const id = existing[0].id;
        await updateBudgetAPI(id, payload);

        Swal.fire({
          title: "Budget Updated",
          text: `Modified budget for ${formData.month}.`,
          icon: "success",
          confirmButtonColor: "#AF52DE",
          background: "#1c182b",
          color: "#fff",
        });
      } else {
        await addBudgetAPI(payload);
        Swal.fire({
          title: "Budget Saved",
          text: `Created budget for ${formData.month}.`,
          icon: "success",
          confirmButtonColor: "#AF52DE",
          background: "#1c182b",
          color: "#fff",
        });
      }
      if (onBudgetAdded) onBudgetAdded(formData.month);
      setFormData({ month: "", income: "", expenses: [{ category: "", amount: "" }] });
    } catch (err) {
      console.error("Error saving budget:", err);
      Swal.fire({
        title: "Error",
        text: "Failed to save budget data.",
        icon: "error",
        confirmButtonColor: "#d33",
        background: "#1c182b",
        color: "#fff",
      });
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={0}
      sx={{
        p: { xs: 3, sm: 4 },
        borderRadius: 2,
        maxWidth: 800,
        background: "#130f26", // Solid dark gray-purple surface
        border: "1px solid rgba(255, 255, 255, 0.08)",
        color: "#fff",
      }}
    >
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: "#fff" }}>
        Budget Details
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Month"
            name="month"
            placeholder="e.g., April 2024"
            value={formData.month}
            onChange={handleChange}
            required
            sx={textFieldSx}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Total Income"
            name="income"
            type="number"
            value={formData.income}
            onChange={handleChange}
            required
            inputProps={{ min: 0, inputMode: "decimal" }}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
            sx={textFieldSx}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.08)" }} />
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="subtitle1" sx={{ color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
              Expenses
            </Typography>
            <Button 
              size="small"
              startIcon={<Add fontSize="small" />} 
              onClick={addExpenseRow}
              sx={{ color: "#AF52DE", textTransform: "none" }}
            >
              Add Row
            </Button>
          </Box>

          <Stack spacing={2}>
            {formData.expenses.map((exp, idx) => (
              <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={7}>
                      <TextField
                        fullWidth
                        label="Category"
                        placeholder="e.g., Groceries"
                        value={exp.category}
                        onChange={(e) => handleExpenseChange(idx, "category", e.target.value)}
                        required
                        sx={textFieldSx}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        fullWidth
                        label="Amount"
                        type="number"
                        value={exp.amount}
                        onChange={(e) => handleExpenseChange(idx, "amount", e.target.value)}
                        required
                        inputProps={{ min: 0, inputMode: "decimal" }}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                        }}
                        sx={textFieldSx}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                </Box>
                <IconButton 
                  onClick={() => removeExpenseRow(idx)} 
                  sx={{ 
                    mt: 0.5,
                    color: "rgba(255,255,255,0.3)", 
                    "&:hover": { color: "#ff4d4d", background: "rgba(255, 77, 77, 0.1)" } 
                  }}
                  title="Remove expense"
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12} sx={{ mt: 2 }}>
          <Box display="flex" justifyContent="flex-end">
            <Button 
              type="submit" 
              variant="contained"
              startIcon={<Check fontSize="small" />}
              sx={{
                background: "#AF52DE",
                color: "#fff",
                borderRadius: 1,
                textTransform: "none",
                fontWeight: 500,
                boxShadow: "none",
                "&:hover": {
                  background: "#9b42c9",
                  boxShadow: "none"
                }
              }}
            >
              Save Budget
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default BudgetForm;
