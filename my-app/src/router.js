import { createBrowserRouter , useLoaderData} from "react-router-dom";
import ExpList from "./ExpList";
import Basic from "./basic/basic";
import AuthCase from "./auth/auth";

export const routerR = createBrowserRouter([
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
  }
])