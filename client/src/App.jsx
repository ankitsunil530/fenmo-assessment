import { useEffect, useState } from "react";
import { getExpenses } from "./api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import FilterSort from "./components/FilterSort";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await getExpenses({
        category,
      });
      setExpenses(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, [category]);

  // 🔥 ALWAYS SORT (frontend safety)
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // 🔥 TOTAL based on sorted data
  const total = sortedExpenses.reduce(
    (sum, e) => sum + Number(e.amount || 0),
    0
  );

  return (
    <div className="app-container">
      <h1 className="title">Expense Tracker</h1>

      {/* Add Expense */}
      <ExpenseForm onAdd={fetchExpenses} />

      {/* Filter */}
      <FilterSort
        category={category}
        setCategory={setCategory}
      />

      {/* Total */}
      <div className="total">
        Total: ₹{total}
      </div>

      {/* List */}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : sortedExpenses.length === 0 ? (
        <p className="loading">No expenses found</p>
      ) : (
        <ExpenseList expenses={sortedExpenses} />
      )}
    </div>
  );
}

export default App;