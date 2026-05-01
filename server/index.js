const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const { expenses } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Helper: normalize values to avoid mismatch
 */
const normalize = (val) => (val === undefined || val === null ? "" : String(val).trim());

/**
 * POST /expenses
 */
app.post("/expenses", (req, res) => {
  let { id, amount, category, description, date } = req.body;

  // Normalize inputs
  amount = Number(amount);
  category = normalize(category);
  description = normalize(description);
  date = normalize(date);

  // Validation
  if (!amount || !category || !date) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (amount < 0) {
    return res.status(400).json({ message: "Amount cannot be negative" });
  }

  // 🔥 STEP 1: Idempotency using ID
  if (id) {
    const existing = expenses.find((e) => e.id === id);
    if (existing) {
      return res.status(200).json({
        message: "Duplicate request (same id), returning existing expense",
        data: existing,
      });
    }
  }

  // 🔥 STEP 2: Fallback duplicate detection (payload-based)
  const duplicate = expenses.find(
    (e) =>
      Number(e.amount) === amount &&
      normalize(e.category) === category &&
      normalize(e.date) === date &&
      normalize(e.description) === description
  );

  if (duplicate) {
    return res.status(200).json({
      message: "Duplicate request (same data), returning existing expense",
      data: duplicate,
    });
  }

  // Create new expense
  const newExpense = {
    id: id || uuidv4(),
    amount,
    category,
    description,
    date,
    created_at: new Date().toISOString(),
  };

  expenses.push(newExpense);

  return res.status(201).json({
    message: "Expense created successfully",
    data: newExpense,
  });
});

/**
 * GET /expenses
 */
app.get("/", (req, res) => {
    res.send("Welcome to the Expense Tracker API");
})

app.get("/expenses", (req, res) => {
  let result = [...expenses];

  const { category, sort } = req.query;

  // Filter
  if (category) {
    result = result.filter(
      (e) => normalize(e.category) === normalize(category)
    );
  }

  // Sort
  
  result.sort((a, b) => new Date(b.date) - new Date(a.date));
  

  return res.status(200).json({
    count: result.length,
    data: result,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});