import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import NewsDetailsPage from "./pages/NewsDetailsPage";
import AddNewsPage from "./pages/AddNewsPage";
import EditNewsPage from "./pages/EditNewsPage";

import { initialNews } from "./data/news";
import { getNews } from "./api/newsApi";

function App() {
  const [addedNews, setAddedNews] = useState(() => {
    const saved = localStorage.getItem("addedNews");

    return saved ? JSON.parse(saved) : [];
  });

  const [editedNews, setEditedNews] = useState(() => {
    const saved = localStorage.getItem("editedNews");

    return saved ? JSON.parse(saved) : [];
  });

  const [deletedIds, setDeletedIds] = useState(() => {
    const saved = localStorage.getItem("deletedIds");

    return saved ? JSON.parse(saved) : [];
  });

  const [news, setNews] = useState(() => [
    ...addedNews,

    ...initialNews
      .filter((item) => !deletedIds.includes(item.id))
      .map((item) => {
        const edited = editedNews.find(
          (editedItem) => editedItem.id === item.id,
        );

        return edited || item;
      }),
  ]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    localStorage.setItem("addedNews", JSON.stringify(addedNews));
  }, [addedNews]);

  useEffect(() => {
    localStorage.setItem("editedNews", JSON.stringify(editedNews));
  }, [editedNews]);

  useEffect(() => {
    localStorage.setItem("deletedIds", JSON.stringify(deletedIds));
  }, [deletedIds]);

  useEffect(() => {
    let ignore = false;

    async function loadNews() {
      try {
        setLoading(true);
        setError("");

        const apiNews = await getNews();

        if (!ignore) {
          const availableApiNews = apiNews
            .filter((item) => !deletedIds.includes(item.id))
            .map((item) => {
              const edited = editedNews.find(
                (editedItem) => editedItem.id === item.id,
              );

              return edited || item;
            });

          setNews((previousNews) => [...previousNews, ...availableApiNews]);

          setIsLoaded(true);
        }
      } catch (error) {
        if (!ignore) setError(error.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadNews();

    return () => {
      ignore = true;
    };
  }, []);

  function addNews(newNews) {
    setAddedNews((previousNews) => [newNews, ...previousNews]);

    setNews((previousNews) => [newNews, ...previousNews]);
  }

  function updateNews(updatedNews) {
    setNews((previousNews) =>
      previousNews.map((item) =>
        item.id === updatedNews.id ? updatedNews : item,
      ),
    );

    const isAddedNews = addedNews.some((item) => item.id === updatedNews.id);

    if (isAddedNews) {
      setAddedNews((previousNews) =>
        previousNews.map((item) =>
          item.id === updatedNews.id ? updatedNews : item,
        ),
      );

      return;
    }

    setEditedNews((previousNews) => {
      const alreadyEdited = previousNews.some(
        (item) => item.id === updatedNews.id,
      );

      if (alreadyEdited) {
        return previousNews.map((item) =>
          item.id === updatedNews.id ? updatedNews : item,
        );
      }

      return [...previousNews, updatedNews];
    });
  }

  function deleteNews(id) {
    setNews((previousNews) => previousNews.filter((item) => item.id !== id));

    setAddedNews((previousNews) =>
      previousNews.filter((item) => item.id !== id),
    );

    setEditedNews((previousNews) =>
      previousNews.filter((item) => item.id !== id),
    );

    setDeletedIds((previousIds) => {
      if (previousIds.includes(id)) {
        return previousIds;
      }

      return [...previousIds, id];
    });
  }

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage news={news} />} />

        <Route
          path="/news"
          element={
            <NewsPage
              news={news}
              loading={loading}
              error={error}
              isLoaded={isLoaded}
            />
          }
        />

        <Route
          path="/news/:id"
          element={
            <NewsDetailsPage
              news={news}
              loading={loading}
              onDeleteNews={deleteNews}
            />
          }
        />

        <Route
          path="/news/:id/edit"
          element={
            <EditNewsPage
              news={news}
              loading={loading}
              onUpdateNews={updateNews}
            />
          }
        />

        <Route path="/add-news" element={<AddNewsPage onAddNews={addNews} />} />

        <Route
          path="*"
          element={
            <main className="container section">
              <h1>404</h1>
              <p>Страница не найдена.</p>
            </main>
          }
        />
      </Routes>
    </>
  );
}

export default App;
