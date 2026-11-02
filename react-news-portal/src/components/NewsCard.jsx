import { Link } from "react-router";

function NewsCard({ news }) {
  return (
    <article className="news-card">
      <img className="news-card-image" src={news.image} alt={news.title} />

      <div className="news-card-content">
        <div className="news-meta">
          <div className="categories">
            {news.categories.map((category) => (
              <span className="category" key={category}>
                {category}
              </span>
            ))}
          </div>

          <span className="news-date">{news.date}</span>
        </div>

        <h2>{news.title}</h2>

        <p>{news.shortDescription}</p>

        <Link to={`/news/${news.id}`} className="button">
          Читать полностью
        </Link>
      </div>
    </article>
  );
}

export default NewsCard;
