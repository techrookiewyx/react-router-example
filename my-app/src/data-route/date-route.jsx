import {
  Await,
  defer,
  Form,
  Link,
  Outlet,
  useAsyncError,
  useAsyncValue,
  useFetcher,
  useFetchers,
  useLoaderData,
  useNavigation,
  useParams,
  useRevalidator,
  useRouteError,
} from "react-router-dom";
import { addTodo, deleteTodo, getTodos } from "./todo";
import { Suspense, useEffect, useRef, useState } from "react";

export function sleep(n = 500) {
  return new Promise((r) => setTimeout(r, n));
}
export default function RouteDateCase() {
  let navigation = useNavigation();
  let revalidator = useRevalidator();
  let fetchers = useFetchers();
  let fetcherInProgress = fetchers.some((f) =>
    ["loading", "submitting"].includes(f.state)
  );
  return (
    <>
      <h1>数据路由案例</h1>
      <p>
        此示例演示了 React Router 的一些核心功能，
        包括嵌套&lt;Route&gt;s, &lt;Outlet&gt;s, &lt;Link&gt;s，
        以及当有人访问无法识别的 URL 时使用“*”路由（又名“splat 路由”）呈现“未找到”页面。
      </p>
      <nav>
        <ul>
          <li><Link to=''>Home</Link></li>
          <li><Link to='todos'>Todos</Link> </li>
          <li><Link to="deferred">Deferred</Link></li>
          <li><Link to="404">404 Link</Link></li>
          <li>
            <button onClick={()=>revalidator.revalidate()}>
              重新验证数据
            </button>
          </li>
        </ul>
      </nav>
      <div style={{ position: "fixed", top: 0, right: 0 }}>
        {navigation.state !== "idle" && <p>Navigation in progress...</p>}
        {revalidator.state !== "idle" && <p>Revalidation in progress...</p>}
        {fetcherInProgress && <p>Fetcher in progress...</p>}
      </div>
      <p>
        点击<Link to="todos">/todos</Link>并查看这些数据加载 API！
      </p>
      <p>
        或者，查看 <Link to="deferred">/deferred</Link>以了解如何在加载器中分离关键数据和延迟加载的数据。
      </p>
      <p>
        我们在这里引入了一些虚假的路由异步方面，因此请留意右上角以查看我们何时正在主动导航。
      </p>
      <hr />
      <Outlet/>
    </>
  )
}

//Home
export async function homeLoader() {
  await sleep();
  return {
    date: new Date().toISOString(),
  }
}

export function Home() { 
  const data = useLoaderData();
  return (
    <>
      <h2>Home</h2>
      <p>Date from loader: {data.date}</p>
    </>
  )
}

//Todos
export async function todosAction({request}) {
  await sleep();
  let formData = await request.formData();
  if (formData.get("action") === "delete") {
    let id = formData.get("todoId");
    if (typeof id === "string") {
        deleteTodo(id);
        return { ok: true };
    }
  }
  let todo = formData.get("todo");
    if (typeof todo === "string") {
        addTodo(todo);
  }
  return new Response(null, {
    status: 302,
    headers: { Location: "/todos" },
  });
}

export async function todosLoader(){
  await sleep();
  return getTodos();
}

export function TodosList() { 
  let todos = useLoaderData();
  let navigation = useNavigation();
  let formRef = useRef(null);
  //如果我们添加然后删除-这将保持 isAddtrue直到fetcher完成它的重新验证
  let [isAdd, setIsAdd] = useState(false);
  useEffect(() => {
    if (navigation.formData?.get("action") === "add") {
      setIsAdd(true);
    } else if (navigation.state === "idle") {
      setIsAdd(false);
      formRef.current?.reset();
    }
  }, [navigation]);
  return (
    <>
      <h2>Todos</h2>
      <p>
      此待办事项应用程序使用&lt;Form&gt;提交新待办事项，并使用&lt;fetcher.form&gt;删除待办事项。 单击待办事项可导航至 /todos/:id 路线。
      </p>
      <ul>
        <li>
          <Link to="junk">单击此链接可强制加载程序出错</Link>
        </li>
        {Object.entries(todos).map(([id, todo]) => (
          <li key={id}>
            <TodoItem id={id} todo={todo} />
          </li>
        ))}
      </ul>
      <Form method="post" ref={formRef}>
        <input type="hidden" name="action" value="add" />
        <input name="todo"></input>
        <button type="submit" disabled={isAdd}>
          {isAdd ? "Adding..." : "Add"}
        </button>
      </Form>
      <Outlet />
    </>
  )
}
export function TodosBoundary() {
  let error = useRouteError();
  return (
    <>
      <h2>Error 💥</h2>
      <p>{error.message}</p>
    </>
  );
}
export function TodoItem({id,todo}) { 
  let fetcher = useFetcher();
  let isDeleting = fetcher.formData != null;
  return (
    <>
      <Link to={`/route-date/todos/${id}`}>{todo}</Link>
      &nbsp;
      <fetcher.Form method="post" style={{ display: "inline" }}>
        <input type="hidden" name="action" value="delete" />
        <button type="submit" name="todoId" value={id} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </fetcher.Form>
    </>
  )
}

//Todo
export async function todoLoader({params}) {
  await sleep();
  let todos = getTodos();
  if (!params.id) {
    throw new Error("Expected params.id");
  }
  let todo = todos[params.id];
  if (!todo) {
    throw new Error(`Uh oh, I couldn't find a todo with id "${params.id}"`);
  }
  return todo;
}

export function Todo() {
  let params = useParams();
  let todo = useLoaderData();
  return (
    <>
      <h2>Nested Todo Route:</h2>
      <p>id: {params.id}</p>
      <p>todo: {todo}</p>
    </>
  );
}

const rand = () => Math.round(Math.random() * 100);
const resolve = (d, ms) => new Promise((r) => setTimeout(() => r(`${d} - ${rand()}`), ms));
const reject = (d, ms) => new Promise((_, r) => setTimeout(() => {
    if (d instanceof Error) {
        d.message += ` - ${rand()}`;
    }
    else {
        d += ` - ${rand()}`;
    }
    r(d);
}, ms));


export async function deferredLoader() {
  return defer({
    critical1: await resolve("Critical 1", 250),
    critical2: await resolve("Critical 2", 500),
    lazyResolved: Promise.resolve("Lazy Data immediately resolved - " + rand()),
    lazy1: resolve("Lazy 1", 1000),
    lazy2: resolve("Lazy 2", 1500),
    lazy3: resolve("Lazy 3", 2000),
    lazyError: reject(new Error("Kaboom!"), 2500),
  });
}
export function DeferredPage() {
  let data = useLoaderData();
  return (
    <div>
      {/* 关键数据立即渲染 */}
      <p>{data.critical1}</p>
      <p>{data.critical2}</p>

      {/* 预先解析的延迟数据永远不会触发回退 */}
      <Suspense fallback={<p>should not see me!</p>}>
        <Await resolve={data.lazyResolved}>
          <RenderAwaitedData />
        </Await>
      </Suspense>
      {/* 可以使用组件 + useAsyncValue() 挂钩来呈现延迟数据 */}
      <Suspense fallback={<p>loading 1...</p>}>
        <Await resolve={data.lazy1}>
          <RenderAwaitedData />
        </Await>
      </Suspense>

      <Suspense fallback={<p>loading 2...</p>}>
        <Await resolve={data.lazy2}>
          <RenderAwaitedData />
        </Await>
      </Suspense>

      {/* 或者你可以绕过钩子并使用渲染函数 */}
      <Suspense fallback={<p>loading 3...</p>}>
        <Await resolve={data.lazy3}>{(data) => <p>{data}</p>}</Await>
      </Suspense>
      {/* 使用 useAsyncError 钩子渲染延迟拒绝 */}
      <Suspense fallback={<p>loading (error)...</p>}>
        <Await resolve={data.lazyError} errorElement={<RenderAwaitedError />}>
          <RenderAwaitedData />
        </Await>
      </Suspense>
    </div>
  );
}


export function RenderAwaitedData() {
  let data = useAsyncValue();
  return <p>{data}</p>;
}

export function RenderAwaitedError() {
  let error = useAsyncError();
  return (
    <p style={{ color: "red" }}>
      Error (errorElement)!
      <br />
      {error.message} {error.stack}
    </p>
  );
}
