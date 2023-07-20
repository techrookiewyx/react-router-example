import { createHashRouter,RouterProvider,useLoaderData } from "react-router-dom";
let router = createHashRouter([
  {
    path: '/',
    loader: () => ({message:'Hello Date Router!'}),
    Component() {
      let data = useLoaderData();
      return <h1>{data.message}</h1>
    }
  },
])
export default function BasicDateRouter() { 
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>}/>
}
