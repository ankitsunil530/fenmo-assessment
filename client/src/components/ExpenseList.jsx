export default function ExpenseList({ expenses }) {
  return (
    <div className="mt-4">
      {expenses.map((e) => (
        <div key={e.id} className="border p-2 mb-2">
          <p><b>₹{e.amount}</b> - {e.category}</p>
          <p>{e.description}</p>
          <p className="text-sm text-gray-500">{e.date}</p>
        </div>
      ))}
    </div>
  );
}