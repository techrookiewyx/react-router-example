import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
export default function App() {
  let routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        {
          path: 'courses',
          element: <Courses />,
          children: [
            { index: true, element: <CoursesIndex /> },
            { path: '/courses/:id', element: <Course /> },
          ],
        },
        {
          path: '*',
          element: <NoMatch />
        }
      ]
    }
  ];
  let element = useRoutes(routes);
  return (
    <div>
      <h1>路由对象示例</h1>
      <p>此示例演示如何使用 React Router 的“路由对象”API 而不是 JSX API 来配置路由。 这两个 API 都是一流的。 事实上，React Router 实际上通过从 <code>&lt;Route&gt;</code> 元素创建路由对象来在内部使用基于对象的 API。</p>
      <p>React Router 公开了一个 <code>useRoutes()</code> 挂钩，它允许您挂钩 <code>&lt;Routes&gt;</code>{" "} 内部使用的相同匹配算法来决定渲染哪个 <code>&lt;Route&gt;</code>。 当您使用此钩子时，您将返回一个将呈现整个路由层次结构的元素。</p>
      {element}
    </div>
  );
}

function Layout() {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='courses'>Courses</Link></li>
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

function Courses() { 
  return (
    <div>
      <h2>Courses</h2>
      <Outlet/>
    </div>
  )
}

function CoursesIndex() {
  return (
    <div>
      <p>请选择一门课程</p>
      <nav>
        <ul>
          <li>
            <Link to='react-fundamentals'>React Fundamentals</Link>
          </li>
          <li>
            <Link to='advanced-react'>Advanced React</Link>
          </li>
          <li>
            <Link to="react-router">React Router</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

function Course() { 
  const { id } = useParams();
  return (
    <div>
       <h2>
        Welcome to the {id} course!
      </h2>
      <p>This is a great course. You're gonna love it!</p>
      <Link to='/courses'>See all courses</Link>
    </div>
  )
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
