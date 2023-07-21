import {
  isRouteErrorResponse,
  json,
  Link,
  Outlet,
  useLoaderData,
  useRouteError,
} from "react-router-dom";

export function Fallback() {
  return <p>Performing initial data "load"</p>;
}

export default function ErrorBoundCase() { 
  return (
    <>
      <nav>
        <Link to="/error-bound/projects/authorized">Authorized Project</Link>
        &nbsp;|&nbsp;
        <Link to="/error-bound/projects/unauthorized">Unauthorized Project</Link>
        &nbsp;|&nbsp;
        <Link to="/error-bound/projects/broken">Broken Project</Link>
      </nav>
      <p>
        此示例显示了<code>&lt;Route errorElement&gt;</code>的灵活性
      </p>
      <ul>
        <li>单击“Authorized Project”链接将带您进入我们成功加载和呈现项目详细信息的幸福路径。</li>
        <li>
          单击“Unauthorized Project”链接将模拟用户无权访问给定项目的情况，因此我们的加载程序可以抛出由<code>&lt;ProjectErrorBoundary&gt;</code>在上下文中传递的 401 响应。
        </li>
        <li>
          单击“Broken Project”链接将返回一些格式错误的数据，从而导致渲染错误。 这超出了<code>&lt;ProjectErrorBoundary&gt;</code>可以处理的范围，因此它会重新抛出错误并由<code>&lt;RootErrorBoundary&gt;</code>来处理。
        </li>
      </ul>
      <Outlet/>
    </>
  )
}

export function RootErrorBoundary() { 
  let error = useRouteError(); 
  return (
    <div>
    <h1>Uh oh, something went terribly wrong 😩</h1>
    <pre>{error.message || JSON.stringify(error)}</pre>
    <button onClick={() => (window.location.href = "/#/error-bound")}>
      Click here to reload the app
    </button>
    </div>
  )
}
export function projectLoader({params}) {
  if (params.projectId === "unauthorized") { 
    throw json({ contactEmail: "administrator@fake.com" },
      { status: 401 })
  }
  if (params.projectId === "broken") {
    return json({
      id: params.projectId,
      name: "Break Some Stuff",
      owner: "The Joker",
      deadline: "June 2022",
      cost: "FREE",
    })
  }
  return json({
    project: {
      id: params.projectId,
      name: "Build Some Stuff",
      owner: "Joe",
      deadline: "June 2022",
      cost: "$5,000 USD",
    },
  });
}

export function Project() { 
  let { project } = useLoaderData();
  return (
    <>
      <h1>Project Name:{project.name}</h1>
      <p>Owner: {project.owner}</p>
      <p>Deadline: {project.deadline}</p>
      <p>Cost: {project.cost}</p>
    </>
  )
}

export function ProjectErrorBoundary() {
  let error = useRouteError();
  if (!isRouteErrorResponse(error) || error.status !== 401) {
    throw error;
  }
  return (
    <>
      <h1>You do not have access to this project</h1>
      <p>
        Please reach out to{" "}
        <a href={`mailto:${error.data.contactEmail}`}>
          {error.data.contactEmail}
        </a>{" "}
        to obtain access.
      </p>
    </>
  );
}