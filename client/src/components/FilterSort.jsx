export default function FilterSort({ category, setCategory, setSort }) {
  return (
    <div className="flex gap-2 mt-4">
      <input
        type="text"
        placeholder="Filter by category"
        className="border p-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
    </div>
  );
}