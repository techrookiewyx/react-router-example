import { Outlet, createHashRouter , useLoaderData} from "react-router-dom";
import ExpList from "./ExpList";
import Basic from "./basic/basic";
import AuthCase from "./auth/auth";
import CustomLinkCase from "./custom-link/custom-link";
import FilterLink from "./custom-filter-link/custom-filer-link";
import QueryParse from "./custom-query-parse/custom-query";
import ErrorBoundCase, { Project, ProjectErrorBoundary, RootErrorBoundary, projectLoader } from "./error-boundaries/error-boundaries";

export const routerR = createHashRouter([
  {
    path: "/",
    element: <ExpList />
  },
  {
    path:'basic/*',
    element: <Basic/>
  }
  ,
  {
    path:'basic-data',
    loader: () => ({ message: 'Hello Router Data!' }),
    Component() {
      let data = useLoaderData();
      return <h1>{data.message}</h1>
    }
  },
  {
    path: 'auth/*',
    element: <AuthCase/>
  },
  {
    path: 'custom-link/*',
    Component: CustomLinkCase
  },
  {
    path: 'filter-link/*',
    Component: FilterLink
  },
  {
    path: 'query-parse',
    Component: QueryParse
  },
  {
    path: 'error-bound',
    element: <ErrorBoundCase />,
    children: [
      {
        path:'',
        element: <Outlet/>,
        errorElement: <RootErrorBoundary />,
        children: [
          {
            path: 'projects/:projectId',
            element: <Project/>,
            errorElement: <ProjectErrorBoundary/>,
            loader: projectLoader,
          }
        ]
      }
    ]
  }
])