import { Link, useNavigate, useParams } from "react-router";
import NewsForm from "../components/NewsForm";

function EditNewsPage({ news, loading, onUpdateNews }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentNews = news.find((item) => item.id === Number(id));

  if (loading && !currentNews) {
    return (
      <main className="container section">
        <p>Загрузка...</p>
      </main>
    );
  }

  if (!currentNews) {
    return (
      <main className="container section">
        <h1>Новость не найдена</h1>

        <Link to="/news" className="button">
          Вернуться к новостям
        </Link>
      </main>
    );
  }

  function handleUpdate(formData) {
    const updatedNews = {
      ...currentNews,
      ...formData,

      image: formData.image || currentNews.image,
    };

    onUpdateNews(updatedNews);

    navigate(`/news/${currentNews.id}`);
  }

  return (
    <main className="container section">
      <h1>Редактировать новость</h1>

      <NewsForm
        initialData={currentNews}
        onSubmit={handleUpdate}
        submitText="Сохранить изменения"
      />
    </main>
  );
}

export default EditNewsPage;
