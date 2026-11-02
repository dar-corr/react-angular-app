function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <select
      className="category-select"
      value={selectedCategory}
      onChange={(event) => onCategoryChange(event.target.value)}
    >
      <option value="Все">Все категории</option>

      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;
