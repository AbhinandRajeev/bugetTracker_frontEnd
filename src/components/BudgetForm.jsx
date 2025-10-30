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
import { Add, Delete } from "@mui/icons-material";
import { addBudgetAPI, getBudgetByMonthAPI, updateBudgetAPI } from "../services/allAPI";
import Swal from "sweetalert2";


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
    setFormData({
      ...formData,
      expenses: updated.length ? updated : [{ category: "", amount: "" }],
    });
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
        title: "Budget Updated!",
        text: `Your budget for ${formData.month} has been successfully updated.`,
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      } else {
        await addBudgetAPI(payload);
         Swal.fire({
        title: "Budget Added!",
        text: `Your budget for ${formData.month} has been successfully saved.`,
        icon: "success",
        confirmButtonColor: "#3085d6",
      });

      }
      if (onBudgetAdded) onBudgetAdded(formData.month);
      setFormData({ month: "", income: "", expenses: [{ category: "", amount: "" }] });
    } catch (err) {
      console.error("Error saving budget:", err);
      Swal.fire({
      title: "Error!",
      text: "Something went wrong while saving your budget.",
      icon: "error",
      confirmButtonColor: "#d33",
    });
    }
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={2}
      sx={{
        p: { xs: 2.5, sm: 3 },
        borderRadius: 2,
        maxWidth: 960,
        mx: "auto",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Enter Monthly Budget
      </Typography>

      <Grid
        container
        columns={12}
        columnSpacing={{ xs: 2, sm: 3 }}
        rowSpacing={2}
        alignItems="center"
      >
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Month (e.g., April)"
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
            
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Income"
            name="income"
            type="number"
            value={formData.income}
            onChange={handleChange}
            required
            inputProps={{ min: 0, inputMode: "decimal", style: { textAlign: "right" } }}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
            Expenses
          </Typography>
        </Grid>

        {formData.expenses.map((exp, idx) => (
          <Grid key={idx} item xs={12}>
            <Box
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 1.5,
                p: 1.5,
                backgroundColor: "background.default",
              }}
            >
              <Grid
                container
                columns={12}
                columnSpacing={{ xs: 2, sm: 3 }}
                rowSpacing={1.5}
                alignItems="center"
              >
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Category"
                    value={exp.category}
                    onChange={(e) => handleExpenseChange(idx, "category", e.target.value)}
                    required
                  />
                </Grid>

                <Grid item xs={10} md={5}>
                  <TextField
                    fullWidth
                    label="Amount"
                    type="number"
                    value={exp.amount}
                    onChange={(e) => handleExpenseChange(idx, "amount", e.target.value)}
                    required
                    inputProps={{ min: 0, inputMode: "decimal", style: { textAlign: "right" } }}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid
                  item
                  xs={2}
                  md={1}
                  sx={{ display: "flex", justifyContent: { xs: "flex-end", md: "center" } }}
                >
                  <IconButton color="error" onClick={() => removeExpenseRow(idx)} aria-label="remove">
                    <Delete />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Button variant="outlined" startIcon={<Add />} onClick={addExpenseRow}>
              Add Category
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default BudgetForm;
