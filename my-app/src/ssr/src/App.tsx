import { Routes, Route, Outlet, Link } from "react-router-dom";
export default function App() {
  return (
    <div>
      <h1>服务器渲染示例</h1>
      <p>如果您查看此页面的 HTML 源代码，您会发现它已经包含从服务器发送的应用程序的 HTML 标记！</p>
      <p>这对于需要索引此页面的搜索引擎来说非常有用。 这对用户来说也很棒，因为服务器渲染的页面往往在移动设备和慢速网络上加载得更快。</p>
      <p>另一件需要注意的事情是，当您单击下面的一个链接并导航到不同的 URL，然后点击浏览器上的刷新按钮时，服务器也能够为该页面生成 HTML 标记，因为您在服务器上使用 React Router。 这为您的网站导航用户和团队中在两个地方使用相同路由库的开发人员创造了无缝体验。</p>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='about'>About</Link></li>
          <li><Link to='dashboard'>Dashboard</Link></li>
          <li><Link to='nothing-here'>Nothing Here</Link></li>
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
      <h2>Home</h2>
    </div>
  );
}

function About() { 
  return (
    <div>
      <h2>About</h2>
    </div>
  )
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>It looks like you're lost...</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
