import { Link } from "react-router";

function CategorySection({ title, news }) {
  const categoryNews = news
    .filter((item) => item.categories.includes(title))
    .slice(0, 6);

  if (categoryNews.length === 0) {
    return null;
  }

  const featuredNews = categoryNews.slice(0, 2);
  const otherNews = categoryNews.slice(2, 6);

  return (
    <section className="category-section">
      <div className="category-section-header">
        <h2>{title}</h2>

        <Link to="/news">Все новости →</Link>
      </div>

      <div className="featured-news-grid">
        {featuredNews.map((item) => (
          <Link key={item.id} to={`/news/${item.id}`} className="featured-news">
            <img src={item.image} alt={item.title} />

            <div className="featured-news-content">
              <span className="news-date">{item.date}</span>

              <h3>{item.title}</h3>

              <p>{item.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="compact-news-grid">
        {otherNews.map((item) => (
          <Link key={item.id} to={`/news/${item.id}`} className="compact-news">
            <span className="news-date">{item.date}</span>

            <h3>{item.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategorySection;
