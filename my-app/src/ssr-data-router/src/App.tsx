import type { RouteObject } from "react-router-dom";
import { Outlet, Link, useLoaderData, redirect } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        loader: homeLoader,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "dashboard",
        loader: dashboardLoader,
        element: <Dashboard />,
      },
      {
        path: "lazy",
        lazy: () => import("./lazy"),
      },
      {
        path: "redirect",
        loader: redirectLoader,
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
];

function Layout() {
  return (
    <div>
      <h1>数据路由器服务器渲染示例</h1>
      <p>如果您查看此页面的 HTML 源代码，您会发现它已经包含从服务器发送的应用程序的 HTML 标记，并且所有加载器数据都已预先获取！</p>
      <p>这对于需要索引此页面的搜索引擎来说非常有用。这对用户来说也很棒，因为服务器渲染的页面往往在移动设备和慢速网络上加载得更快。</p>
      <p>另一件需要注意的事情是，当您单击下面的一个链接并导航到不同的 URL，然后点击浏览器上的刷新按钮时，服务器也能够为该页面生成 HTML 标记，因为您在服务器上使用 React Router。这为您的网站导航用户和团队中在两个地方使用相同路由库的开发人员创造了无缝体验。</p>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/lazy">Lazy</Link>
          </li>
          <li>
            <Link to="/redirect">Redirect to Home</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet/>
    </div>
  )
}

const sleep = (n = 500) => new Promise(r => setTimeout(r, n));
const rand = () => Math.round(Math.random() * 100);
async function homeLoader() {
  await sleep();
  return {data: `Home loader - random value ${rand()}`}
}

function Home() {
  let data = useLoaderData();
  return (
    <div>
      <h2>Home</h2>
      <p>Loader Data:{data.data}</p>
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

async function dashboardLoader() {
  await sleep();
  return { data: `Dashboard loader - random value ${rand()}`}
}

function Dashboard() {
  let data = useLoaderData();
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Loader Data: {data.data}</p>
    </div>
  );
}

async function redirectLoader(){
  await sleep();
  return redirect('/');
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
