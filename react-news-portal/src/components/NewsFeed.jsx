import { Link } from "react-router";

function NewsFeed({ news }) {
  const feedNews = news.slice(0, 15);

  return (
    <aside className="news-feed">
      <h2>Лента новостей</h2>

      <div className="news-feed-list">
        {feedNews.map((item) => (
          <Link
            key={item.id}
            to={`/news/${item.id}`}
            className="news-feed-item"
          >
            <div className="news-feed-content">
              <span className="news-feed-date">{item.date}</span>

              <strong>{item.title}</strong>
            </div>

            <img className="news-feed-image" src={item.image} alt="" />
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default NewsFeed;
