import NewsCard from "./NewsCard";

function NewsList({ news }) {
  if (news.length === 0) {
    return <p className="empty-message">Новости не найдены.</p>;
  }

  return (
    <div className="news-grid">
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}

export default NewsList;
