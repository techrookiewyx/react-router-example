import { Routes, Route, Outlet, Link } from "react-router-dom";
import { NoMatch } from "./no-match";

export default function MultiApp() { 
  return (
    <Routes>
      <Route path='' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="*" element={<NoMatch/>} />
      </Route>
    </Routes>
  )
}

function Layout() {
  return (
    <div>
      <h1>这里是主应用</h1>
      <p>
        此示例演示了如何使用<code>`BrowserRouter`</code>和<code>`StaticRouter`</code>上的<code>`basename`</code>属性将两个 React Router 应用程序拼接在一起。
      </p>
      <nav>
      <ul>
          <li>
            <Link to="">Home</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            {/* 链接到“Inbox”应用程序时使用普通的 <a> ，以便浏览器重新加载完整文档，
              这正是我们退出此应用程序并进入另一个应用程序时所需的，
              因此我们在 inbox/main.jsx 中执行其入口点。 */}
            <a href="/inbox">Inbox</a>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}

function Home() {
  return (
    <div>
      <p>This is the home page.</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <p>This is the about page.</p>
    </div>
  );
}
