import { createContext, useContext, useState } from "react"
import { fakeAuthProvider } from "./auth1";
import { Outlet, Route, Routes, useLocation, useNavigate ,Link, Navigate } from "react-router-dom";
let AuthContext = createContext(null); //提供共享数据对象
//最外层组件数据提供者
function AuthProvider({ children }) { 
  const [user, setUser] = useState(null);
  let signin = (newUser, callback) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    })
  };
  let signout = (callback) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    })
  };
  let value = {user,signin,signout}
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default function AuthCase() { 
  return (
    <AuthProvider>
      <h1>授权路由案例</h1>
      <p>此示例演示了一个包含三个页面的简单登录流程：公共页面、受保护页面和登录页面。 为了查看受保护的页面，您必须首先登录。</p>

      <p>首先，访问公共页面。然后，访问受保护的页面。您尚未登录，因此您将被重定向到登录页面。登录后，您将被重定向回受保护的页面。</p>

      <p>请注意 URL 每次都会发生变化。如果此时单击后退按钮，您希望返回登录页面吗？不！您已经登录了。尝试一下，您会看到您返回到登录之前访问的页面，即公共页面。</p>
      <Routes>
        <Route element={<Layout/>}>
          <Route path='' element={<PublicPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path='protected'
            element={
              <RequireAuth>
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  )
}
//公共内容
function Layout() {
  return (
    <div>
      <AuthStatus />
      <ul>
        <li>
          <Link to="">Public Page</Link>
        </li>
        <li>
          <Link to="protected">Protected Page</Link>
        </li>
      </ul>
      <Outlet/>
    </div>
  )
}
//登录页
function LoginPage() { 
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  let from = location.state?.from?.pathname || "/";
  function handleSubmit(e) {
    e.preventDefault();
    //创建一个表单数据对象，e.currentTarget表示当前触发事件的元素
    let formData = new FormData(e.currentTarget); 
    let username = formData.get("username");
    auth.signin(username, () => { 
    // 将他们发送回他们被重定向到登录页面时尝试访问的页面。 
    // 使用 {replace: true } 这样我们就不会创建登录页面历史堆栈中的另一个条目。 
    // 这意味着当他们到达受保护的页面并单击后退按钮时
    // 他们不会最终回到登录页面，这是很好用户体验。
      navigate(from, { replace: true });
    })
  }
  return (
    <div>
      <p>你需要先登录才能查看该内容</p>
      <form onSubmit={handleSubmit}>
        <label>
          用户名：<input type='text' name='username'/>
        </label>{" "}
        <button type="submit">登录</button>
      </form>
    </div>
  )
}
//自定义hook获取context
function useAuth() { 
  return useContext(AuthContext)
}
//公共页登录状态判断
function AuthStatus() {
  const auth = useAuth();
  let navigate = useNavigate();
  if(!auth.user){
    return <p>你还未登录</p>
  }
  return (
    <p>
      欢迎 {auth.user}
      <button onClick={() => {
        auth.signout(() => { navigate('') });
      }}>登出</button>
    </p>
  )
}
//保护页登录判断
function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) { 
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }
  return children;
}
//登不登录都能访问的公用页
function PublicPage() {
  return <h3>公共内容</h3>;
}
//保护页
function ProtectedPage() {
  return <h3>保护内容</h3>;
}