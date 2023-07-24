import { Outlet, createHashRouter , json, useLoaderData} from "react-router-dom";
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
import ModalCase from "./modal-example/modal";
import ModalRoute, { GalleryMr, HomeMr, ImageView } from "./modal-route-with-outlet/modal-route";
import MultiApp from "./multi-app/home/multi-app";
import NavigationCase, { ImportantForm } from "./navigation-blocking/navigation";
import { NotesCase, loader as notesLoader } from "./notes/notes";
import { NewNote, action as newAction } from "./notes/new";
import Note, { loader as noteLoader, action as noteAction } from "./notes/noteIt";
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
  {
    path: 'modal-example/*',
    Component: ModalCase,
  },
  {
    path: 'modal-route',
    Component: ModalRoute,
    children: [
      {
        path: '',
        Component: HomeMr
      },
      {
        path: 'gallery',
        Component: GalleryMr,
        children: [
          {
            path: 'img/:id',
            Component: ImageView
          }
        ]
      }
    ]
  },
  {
    path: 'multi-app/*',
    Component: MultiApp
  },
  {
    path: 'navigation-block',
    Component: NavigationCase,
    children: [
      {
        index: true,
        Component() {
          return <h2>Index</h2>
        }
      },
      {
        path: 'one',
        Component(){
          return <h2>One</h2>
        }
      },
      {
        path: 'two',
        Component(){
          return <h2>Two</h2>
        }
      },
      {
        path: 'three',
        action: () => json({ok:true}),
        Component(){
          return (
            <>
              <h2>Three</h2>
              <ImportantForm/>
            </>
          )
        }
      },
      {
        path: 'four',
        Component(){
          return <h2>Four</h2>
        }
      },
      {
        path: 'five',
        Component(){
          return <h2>Five</h2>
        }
      }
    ]
  },
  {
    path: 'notes',
    loader: notesLoader,
    Component: NotesCase,
    children: [
      {
        path: 'new',
        action: newAction,
        Component: NewNote
      },
      {
        path: 'note/:noteId',
        action: noteAction,
        loader: noteLoader,
        Component: Note
      }
    ]
  }
])