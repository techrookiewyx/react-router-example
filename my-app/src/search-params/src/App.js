import { useEffect, useState } from "react";
import { Link, Route, Routes, useSearchParams } from "react-router-dom";
export default function App() {
  return (
    <div>
      <h1>搜索参数示例</h1>
      <p>此示例演示了一个简单的搜索页面，该页面向 GitHub API 发出用户数据请求并在页面上显示该用户的信息。 该示例使用 <code>useSearchParams()</code> 挂钩来读取和写入 URL 查询字符串。</p>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}
function randomUser() { 
  let users = ["chaance", "jacob-ebey", "mcansh", "mjackson", "ryanflorence"];
  return users[Math.floor(Math.random()*users.length)]
}

function Home() { 
  let [searchParams, setSearchParams] = useSearchParams();
  let [userDate, setUserDate] = useState(null);
  let user = searchParams.get('user');
  useEffect(() => {
    let abortController = new AbortController();
    async function getGitHubUser() {
      let response = await fetch(`https://api.github.com/users/${user}`, {
        signal: abortController.signal,
      })
      if (!abortController.signal.aborted) {
        let data = await response.json();
        setUserDate(data);
      }
    }
    if (user) {
      getGitHubUser();
    }
    return () => {
      abortController.abort();
    };
  }, [user]);
  function handleSubmit(e){
    e.preventDefault();
    let formData = new FormData(e.currentTarget);
    let newUser = formData.get('user');
    if (!newUser) return;
    setSearchParams({ user: newUser });
  }
  function handleRandomSubmie(e) {
    e.preventDefault();
    let newUser = randomUser();
    if (newUser === user) {
      handleRandomSubmie(e);
    } else { 
      setSearchParams({user:newUser});
    }
  }
  return (
    <div>
      <div style={{display: "flex"}}>
        <form onSubmit={handleSubmit}>
          <label>
            <input defaultValue={user ?? undefined} type="text" name="user" />
          </label>
          <button type='submit'>Search</button>
        </form>
        <form onSubmit={handleRandomSubmie}>
          <input type='hidden' name='random' />
          <button type="submit">Random</button>
        </form>
      </div>
      {userDate && (
        <div style={{
          padding: "24px",
          margin: "24px 0",
          borderTop: "1px solid #eaeaea",
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}> 
           <img
            style={{ borderRadius: "50%" }}
            width={200}
            height={200}
            src={userDate.avatar_url}
            alt={userDate.login}
          />
          <div>
            <h2>{userDate.name}</h2>
            <p>{userDate.bio}</p>
          </div>
        </div>
      )}
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
