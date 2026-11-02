import { Link } from "react-router";

import CategorySection from "../components/CategorySection";
import NewsFeed from "../components/NewsFeed";

function HomePage({ news }) {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>NewsHub</h1>

          <p>
            Учебный новостной портал на React. Здесь публикуются последние
            новости.
          </p>

          <Link to="/news" className="button">
            Все новости
          </Link>
        </div>
      </section>

      <div className="container home-layout">
        <main className="home-main">
          <CategorySection title="Политика" news={news} />
          <CategorySection title="Общество" news={news} />
          <CategorySection title="Наука" news={news} />
        </main>

        <NewsFeed news={news} />
      </div>
    </>
  );
}

export default HomePage;
