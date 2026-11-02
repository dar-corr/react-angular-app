export async function getNews() {
  const response = await fetch(
    "https://dummyjson.com/posts?limit=6"
  );

  if (!response.ok) {
    throw new Error(`Ошибка HTTP: ${response.status}`);
  }

  const data = await response.json();

  return data.posts.map((post) => ({
    // чтобы id из API не пересекались с локальными 1, 2, 3, 4
    id: 1000 + post.id,

    title: post.title,

    categories: post.tags,

    // в DummyJSON у постов нет нормальной даты, для учебного проекта создаём демо
    date: `2026-09-${String(
      1 + (post.id % 27)
    ).padStart(2, "0")}`,

    shortDescription:
      post.body.length > 130
        ? post.body.slice(0, 130) + "..."
        : post.body,

    fullText: post.body,

    // у постов также нет изображения
    image: `https://picsum.photos/seed/api-news-${post.id}/800/450`,
  }));
}