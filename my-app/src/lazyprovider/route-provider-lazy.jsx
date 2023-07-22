import {
  Outlet,
  Link,
  useNavigation,
} from "react-router-dom";
export default function RouterProviderLazy() {
  const nav = useNavigation();
  return (
    <div>
      <h1>使用RouterProvider的懒加载案例</h1>
      <p>
        此示例演示如何使用<code>route.lazy()</code>延迟加载路由定义。 为了获得此演示的完整效果，请务必打开“网络”选项卡并在浏览时观察新捆绑包的动态加载。
      </p>
      <p>
        在您单击链接之前，不会加载"About"和"Dashboard"页面。 当您这样做时，代码会在导航的加载阶段通过动态<code>import()</code>语句加载。 代码加载后，路由加载器就会执行，然后元素会使用加载器提供的数据进行渲染
      </p>
      <p>
        这适用于路由的所有数据加载/渲染相关属性，包括 <code>action</code>, <code>loader</code>, <code>element</code>
        , <code>errorElement</code>, 和 <code>shouldRevalidate</code>。您不能从<code>lazy()</code> 返回路径匹配属性，例如<code>path</code>, <code>index</code>, <code>children</code>, 和{" "}
        <code>caseSensitive</code>。
      </p>
      <div style={{ position: "fixed", top: 0, right: 0 }}>
        {nav.state !== "idle" && <p>Navigation in progress...</p>}
      </div>
      <nav>
        <ul>
          <li>
            <Link to=''>Home</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="dashboard/messages">Messages (Dashboard)</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet/>
    </div>
  )
}

export function HomeLa() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

export function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}