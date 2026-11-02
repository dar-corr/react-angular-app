import { useNavigate } from "react-router";
import NewsForm from "../components/NewsForm";

function AddNewsPage({ onAddNews }) {
  const navigate = useNavigate();

  function handleAdd(formData) {
    const newNews = {
      ...formData,

      id: Date.now(),

      image:
        formData.image || `https://picsum.photos/seed/${Date.now()}/800/450`,

      date: new Date().toLocaleDateString("ru-RU"),
    };

    onAddNews(newNews);

    navigate("/news");
  }

  return (
    <main className="container section">
      <h1>Добавить новость</h1>

      <NewsForm onSubmit={handleAdd} submitText="Добавить новость" />
    </main>
  );
}

export default AddNewsPage;
