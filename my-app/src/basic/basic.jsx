import { Routes, Route, Outlet, Link } from "react-router-dom";
export default function Basic() {
  return (
    <div>
      <h1>路由基本案例</h1>
      <p>该案例展示了一些路由的核心功能包括路由嵌套<code>&lt;Route&gt;</code>s,{" "}
        <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s，并使用"*"表示在所有路由路径
        不匹配时显示什么内容
      </p>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="about" element={<About/>} />
          <Route path="dashboard" element={<Dashboard/>} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}

function Layout() { 
  return (
    <div>
      <nav>
      <ul>
          <li>
            <Link to=''>Home</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="nothing-here">Nothing Here</Link>
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
      <h2>Home</h2>
    </div>
  )
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch(){
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <Link to=''>Go to Home Page</Link>
    </div>
  )
}