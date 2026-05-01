import { useState } from "react";
import { createExpense } from "../api";
import { v4 as uuidv4 } from "uuid";
import "../App.css";

export default function ExpenseForm({ onAdd }) {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createExpense({
        ...form,
        id: uuidv4(),
      });

      setForm({
        amount: "",
        category: "",
        description: "",
        date: "",
      });

      onAdd();
    } catch (err) {
      alert("Error adding expense");
    }

    setLoading(false);
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Add New Expense</h2>

      <form onSubmit={handleSubmit}>
        <label>Amount</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          required
        />

        <label>Category</label>
        <input
          type="text"
          placeholder="e.g. Food, Travel"
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          required
        />

        <label>Description</label>
        <input
          type="text"
          placeholder="Optional note"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
        />

        <label>Date</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>
    </div>
  );
}