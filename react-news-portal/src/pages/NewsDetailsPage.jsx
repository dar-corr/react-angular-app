import { Link, useNavigate, useParams } from "react-router";

function NewsDetailsPage({ news, loading, onDeleteNews }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentNews = news.find((item) => item.id === Number(id));

  function handleDelete() {
    const confirmed = window.confirm("Удалить эту новость?");

    if (!confirmed) {
      return;
    }

    onDeleteNews(currentNews.id);
    navigate("/news");
  }

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

  return (
    <main className="container section">
      <article className="news-details">
        <img
          className="news-details-image"
          src={currentNews.image}
          alt={currentNews.title}
        />

        <div className="news-meta">
          <div className="categories">
            {currentNews.categories?.map((category) => (
              <span className="category" key={category}>
                {category}
              </span>
            ))}
          </div>

          <span className="news-date">
            {currentNews.date ?? "Дата не указана"}
          </span>
        </div>

        <h1>{currentNews.title}</h1>

        <p className="news-full-text">{currentNews.fullText}</p>

        <div className="news-actions">
          <Link to="/news" className="button secondary-button">
            ← Назад к новостям
          </Link>

          <Link to={`/news/${currentNews.id}/edit`} className="button">
            Редактировать
          </Link>

          <button className="button danger-button" onClick={handleDelete}>
            Удалить новость
          </button>
        </div>
        
      </article>
    </main>
  );
}

export default NewsDetailsPage;
