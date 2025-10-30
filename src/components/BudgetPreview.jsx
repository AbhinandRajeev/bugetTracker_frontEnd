import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import { Box, Typography, Table, TableBody, TableCell, TableRow, Button, Stack } from "@mui/material";
import { deleteBudgetAPI, getBudgetByMonthAPI } from "../services/allAPI";

function BudgetPreview({ data, onDeleted }) {
  if (!data) return null;

  const expenseList = data.expenses || [];
  const totalExpenses = data.totalExpenses ?? expenseList.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const savings = data.savings ?? (Number(data.income || 0) - totalExpenses);

  // PDF Download
  const downloadPDF = () => {
    const element = document.getElementById("preview-section");
    if (!element) return;

    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${data.month || "Budget"}_Report.pdf`);
    });
  };

  // Delete Function
  const handleDelete = async () => {
    try {
      const existing = await getBudgetByMonthAPI(data.month);
      if (existing && existing.length > 0) {
        const id = existing[0].id;
        await deleteBudgetAPI(id);

        Swal.fire({
          title: "Deleted!",
          text: `${data.month} budget has been removed.`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        if (onDeleted) onDeleted(); // to refresh list or clear preview
      }
    } catch (error) {
      console.error("Error deleting budget:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete budget.",
        icon: "error",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <Box
      id="preview-section"
      sx={{
        p: 4,
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 2,
        mt: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {data.month} Budget Summary
      </Typography>

      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Income</TableCell>
            <TableCell>₹{data.income}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Total Expenses</TableCell>
            <TableCell>₹{totalExpenses}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Savings</TableCell>
            <TableCell>₹{savings}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Expense Breakdown
      </Typography>
      <Table>
        <TableBody>
          {expenseList.map((item, idx) => (
            <TableRow key={idx}>
              <TableCell>{item.category}</TableCell>
              <TableCell>₹{Number(item.amount || 0)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="contained" onClick={downloadPDF}>
          Download PDF
        </Button>
        <Button variant="outlined" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Stack>
    </Box>
  );
}

export default BudgetPreview;
