import { Outlet, createHashRouter , useLoaderData} from "react-router-dom";
import ExpList from "./ExpList";
import Basic from "./basic/basic";
import AuthCase from "./auth/auth";
import CustomLinkCase from "./custom-link/custom-link";
import FilterLink from "./custom-filter-link/custom-filer-link";
import QueryParse from "./custom-query-parse/custom-query";
import ErrorBoundCase, { Project, ProjectErrorBoundary, RootErrorBoundary, projectLoader } from "./error-boundaries/error-boundaries";
import RouteDateCase, { DeferredPage, Home, Todo, TodosBoundary, TodosList, deferredLoader, homeLoader, todoLoader, todosAction, todosLoader } from "./data-route/date-route";
import LazyLoad from "./lazy-loading/lazy-loading";
import RouterProviderLazy, { HomeLa, NoMatch } from "./lazyprovider/route-provider-lazy";
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
  },
  {
    path: 'route-date',
    Component: RouteDateCase,
    children: [
      {
        index: true,
        loader: homeLoader,
        Component: Home
      },
      {
        path: "todos",
        loader: todosLoader,
        action: todosAction,
        Component: TodosList,
        ErrorBoundary: TodosBoundary,
        children: [
          {
            path: ":id",
            loader: todoLoader,
            Component: Todo,
          }
        ]
      },
      {
        path: "deferred",
        loader: deferredLoader,
        Component: DeferredPage,
      }
    ]
  },
  {
    path: "lazy-load/*",
    Component : LazyLoad
  },
  {
    path: "router-provider-lazy",
    Component: RouterProviderLazy,
    children: [
      {
        index: true,
        Component: HomeLa,
      },
      {
        path: 'about',
        lazy: () => import("./lazyprovider/pages/About")
      },
      {
        path: 'dashboard',
        async lazy() {
          let { DashboardLayout } =
            await import("./lazyprovider/pages/Dashboard");
          return { Component: DashboardLayout }
        },
        children:[
          {
            index: true,
            async lazy(){
              let {DashboardIndex} = await import("./lazyprovider/pages/Dashboard");
              return {Component: DashboardIndex}
            }
          },
          {
            path: 'messages',
            async lazy() { 
              let {dashboardMessagesLoader,Messages} = await import("./lazyprovider/pages/Dashboard");
              return {
                Component: Messages,
                loader: dashboardMessagesLoader
              }
            }
          }
        ]
      },
      {
        path: '*',
        Component: NoMatch
      }
    ]
  },
])