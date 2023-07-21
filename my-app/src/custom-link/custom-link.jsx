import { Link, Outlet, Route, Routes, useMatch, useResolvedPath } from "react-router-dom";

export default function CustomLinkCase(){
  return (
    <div>
      <h1>自定义链接示例</h1>
      <p>
        此示例演示如何使用低级<code>useResolvedPath()</code> and{" "}
        <code>useMatch()</code> 挂钩创建知道其是否“活动”的自定义<code>&lt;Link&gt;</code>组件.
      </p>
      <Routes>
        <Route path="" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}

function CustomLink({ children, to }) {
  //获取传递的to的location信息
  let resolved = useResolvedPath(to);
  //判断当前页面的path与resolved的path是否一致
  let match = useMatch({ path: resolved.pathname });
  return (
    <div>
      <Link
        style={{ textDecoration: match ? "underline" : "none" }}
        to={to}
      >
        {children}
      </Link>
      {match && " (active)"}
    </div>
  )
}
function Layout() { 
  return (
    <div>
      <nav>
        <ul>
          <li><CustomLink to="">Home</CustomLink></li>
          <li><CustomLink to="about">About</CustomLink></li>
        </ul>
      </nav>
      <hr />
      <Outlet/>
    </div>
  )
}

function Home() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}

function NoMatch() { 
  return (
    <div>
      <h1>Nothing to see here!</h1>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}