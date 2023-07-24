import { useLoaderData, Link, Outlet } from "react-router-dom";
import { getNotes } from "./note";

export async function loader() {
  return getNotes();
}

export function NotesCase() { 
  const notes = useLoaderData();
  return (
    <div style={{display:'flex'}}>
      <div style={{ padding: "0 2rem", borderRight: "solid 1px #ccc" }}>
        <h1>Notes</h1>
        <p>
          <Link to="new">Create Note</Link>
        </p>
        <ul>
          {notes.map(ele =>
            <li key={ele.id}>
              <Link to={`/notes/note/${ele.id}`}>{ele.title}</Link>
            </li>
          )}
        </ul>
      </div>
      <div style={{ flex: 1, padding: "0 2rem" }}>
        <Outlet/>      
      </div>
    </div>
  )
}