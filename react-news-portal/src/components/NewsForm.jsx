import { useState } from "react";

const emptyNews = {
  title: "",
  categories: "",
  shortDescription: "",
  fullText: "",
  image: "",
};

function NewsForm({ initialData = emptyNews, onSubmit, submitText }) {
  const [formData, setFormData] = useState(() => ({
    ...emptyNews,
    ...initialData,

    categories: Array.isArray(initialData.categories)
      ? initialData.categories.join(", ")
      : initialData.categories || "",
  }));

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const preparedData = {
      ...formData,

      categories: formData.categories
        .split(",")
        .map((category) => category.trim())
        .filter((category) => category !== ""),
    };

    onSubmit(preparedData);
  }

  return (
    <form className="news-form" onSubmit={handleSubmit}>
      <label>
        Заголовок
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Категории
        <input
          type="text"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          placeholder="Например: Наука, Общество"
          required
        />
      </label>

      <label>
        Ссылка на изображение
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="https://..."
        />
      </label>

      <label>
        Краткое описание
        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          rows="3"
          required
        />
      </label>

      <label>
        Полный текст
        <textarea
          name="fullText"
          value={formData.fullText}
          onChange={handleChange}
          rows="8"
          required
        />
      </label>

      <button type="submit" className="button">
        {submitText}
      </button>
    </form>
  );
}

export default NewsForm;
