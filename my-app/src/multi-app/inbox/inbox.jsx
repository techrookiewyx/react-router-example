import { Routes, Route, useParams, Link, Outlet } from "react-router-dom";
import { getMessageById, messages } from "./message";

export default function InBoxApp() { 
  return (
    <Routes>
      <Route path="/" element={<Layout />}> 
        <Route index element={<InBox />} />
        <Route path=":id" element={<Message />} />
      </Route>
    </Routes>
  )
}

function Layout() { 
  return (
    <div>
    <h1>Welcome to the Inbox app!</h1>
    <nav>
      <ul>
        <li>
          {/* Using a normal link here will cause the browser to reload the
              document when following this link, which is exactly what we want
              when navigating to the "Home" app so we execute its entry
              point (see home/main.jsx). */}
          <a href="/#/multi-app">Home</a>
        </li>
        <li>
          <a href="/#/multi-app/about">About</a>
        </li>
        <li>
          <Link to="">Inbox</Link>
        </li>
      </ul>
    </nav>
    <hr />
    <Outlet />
  </div>
  )
}

function InBox() {
  return (
    <div>
      <div style={{maxWidth: 800, margin: "0 auto"}}>
        {messages.map(ele =>
          <Link
            to={ele.id}
            key={ele.id}
            style={{
              display: "flex",
              borderBottom: "1px solid #ccc",
              padding: "10px",
              width: "100%",
              textDecoration: "none",
              color: "#000",
            }}
          >
            <span
              style={{
                flexBasis: 100,
                marginRight: "1rem",
              }}
            >
              {ele.from.name}
            </span>
            <div
              style={{
                flexGrow: 1,
                textOverflow: "ellipsis",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                marginRight: "1rem",
              }}
            >
               <span>{ele.subject}</span>
              <div style={{color: "#999", display: "inline" }}>
                <span>{" — "}</span>
                <span>{ele.body}</span>
               </div>
            </div>
            <span>
              {new Date(ele.date).toDateString()}
            </span>
          </Link>
        )}
      </div>
    </div>

  )
}

function Message() { 
  let { id } = useParams();
  let message = getMessageById(id + '');
  return (
    <div>
      <h2>{message.subject}</h2>
      <div>
        <h3 style={{ fontSize: 14 }}>
          <span>{message.from.name}</span>{" "}
          <span>&lt;{message.from.email}&gt;</span>
        </h3>
        <div>{message.body}</div>
      </div>
    </div>
  )
}