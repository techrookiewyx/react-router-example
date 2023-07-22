import { Suspense, lazy } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(()=>import("./pages/Dashboard")) 
export default function LazyLoad() { 
  return (
    <div>
      <h1>懒加载案例</h1>
      <p>
        此示例演示了如何按需延迟加载路由元素甚至路由层次结构的整个部分。 为了获得此演示的完整效果，请务必打开“网络”选项卡并在浏览时观察新捆绑包的动态加载。
      </p>
      <p>
      在您单击链接之前，不会加载“About”页面。 当您这样做时，会在通过动态 import() 语句加载代码时呈现<code>&lt;React.Suspense fallback&gt;</code>。 代码加载后，后备将被该页面的实际代码替换。
      </p>
      <p>
        “Dashboard”页面执行相同的操作，但通过在页面加载后动态定义其他路由，更进一步！ 由于 React Router 允许您将路由声明为<code>&lt;Route&gt;</code>元素，因此您可以通过在元素树的任何位置放置额外的<code>&lt;Routes&gt;</code>元素来轻松定义更多路由。 只需确保父路由以 * 结尾，如本例中的 <code>*</code> like <code>&lt;Route path="dashboard/*"&gt;</code> 。
      </p>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={
            <Suspense fallback={<>...</>}>
              <About/>
            </Suspense>
           } />
          <Route path="dashboard/*" element={ 
            <Suspense fallback={<>...</>}>
              <Dashboard/>
            </Suspense>
          } />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}

function Layout(){
  return (
    <div>
      <nav>
        <ul>
          <li><Link to=''>Home</Link></li>
          <li><Link to='about'>About</Link></li>
          <li><Link to="dashboard/messages">Messages (Dashboard)</Link></li>
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

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="">Go to the home page</Link>
      </p>
    </div>
  );
}