import { NavLink } from "react-router";

function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <NavLink to="/" className="logo">
          NewsHub
        </NavLink>

        <nav className="nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Главная
          </NavLink>

          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Новости
          </NavLink>

          <NavLink
            to="/add-news"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Добавить новость
          </NavLink>

          <a href="http://localhost:4200/saved" className="nav-link">
            Сохранённые новости
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
