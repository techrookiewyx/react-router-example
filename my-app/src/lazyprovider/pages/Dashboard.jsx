import { Outlet, Link, useLoaderData } from "react-router-dom";

 
export function DashboardLayout(){
  return(
    <div>
      <nav>
        <ul>
          <li><Link to=''>Dashboard Home</Link></li>
          <li>
            <Link to="messages">Messages</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet/>
    </div>
  )
}

export function DashboardIndex() {
  return (
    <div>
      <h2>Dashboard Index</h2>
    </div>
  );
}

export async function dashboardMessagesLoader() {
  await new Promise((r) => setTimeout(r, 500));
  return  ["Message 1 from Dashboard.tsx loader","Message 2 from Dashboard.tsx loader","Message 3 from Dashboard.tsx loader"]
}
export function Messages() {
  const messages = useLoaderData();
  return (
    <div>
      <h2>Messages</h2>
      <ul>
        {messages.map(e =>
          <li key={e}>{e}</li>
        )}
      </ul>
    </div>
  );
}
 