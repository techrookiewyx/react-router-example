import { Form, redirect } from "react-router-dom";
import { createNote } from "./note";

export function NewNote() {
  return (
    <Form method="post">
      <p>
        <label>
          Title
          <br />
          <input type="text" name="title" />
        </label>
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <br />
        <textarea name="content" rows="10" cols="30" id="content" />
      </p>
      <p>
        <button type="submit">Save</button>
      </p>
    </Form>
  )
}

export async function action({ request }) { 
  const formDate = await request.formData();
  const note = await createNote({
    title: formDate.get('title'),
    content: formDate.get('content')
  });
  return redirect(`/notes/note/${note.id}`)
}