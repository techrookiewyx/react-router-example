import { useCallback } from "react";
import {
  createHashRouter,
  Link,
  Outlet,
  RouterProvider,
  ScrollRestoration,
  useLoaderData,
  useLocation,
  useNavigation,
} from "react-router-dom";
const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <h2>Home</h2>
      },
      {
        path: "restore-by-key",
        loader: getArrayLoader,
        element: <LongPage/>
      },
      {
        path: "restore-by-pathname",
        loader: getArrayLoader,
        element: <LongPage />,
        handle: { scrollMode: "pathname" },
      },
      {
        path: "link-to-hash",
        loader: getArrayLoader,
        element: <LongPage />,
      }
    ]
  }
]);
export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Loading...</p>}/>
  );
}

function Layout() {
  let navigation = useNavigation();
  let getKey = useCallback((location,matches) => { 
    let match = matches.find((m) => m.handle?.scrollMode);
    if (match?.handle?.scrollMode === "pathname") { 
      return location.pathname;
    }
    return location.key
  }, [])
  return (
    <>
      <style>{`
        .wapper{
          display: grid;
          grid-template-columns: 1fr 2fr;
          padding: 1rem;
        }
        .fixed {
          position: fixed;
          max-width: 20%;
          height: 100%;
          padding: 1rem;
        }
        .navitem {
          margin: 1rem 0;
        }
        .spinner {
          position: fixed;
          top: 0;
          right: 0;
          padding: 5px;
          background-color: lightgreen;
        }
      `}</style>
      <div className="spinner"
        style={{
          display: navigation.state === "idle" ? "none" : "block"
        }}
      >
        Navigating...
      </div>
      <div className="wapper">
        <div className="left">
          <div className="fixed">
            <nav>
              <ul>
                <li className="navitem">
                  <Link to='/'>Home</Link>
                </li>
                <li className="navitem">
                  <Link to="/restore-by-key">
                    This page restores by location.key
                  </Link>
                </li>
                <li className="navitem">
                  <Link to="/restore-by-pathname">
                    {" "}
                    This page restores by location.pathname
                  </Link>
                </li>
                <li className="navitem">
                  <Link to="/link-to-hash#heading">
                    This link will link to a nested heading via hash
                  </Link>
                </li>
                <li className="navitem">
                  <Link to="/restore-by-key" preventScrollReset>
                    This link will not scroll to the top
                  </Link>
                </li>
                <li className="navitem">
                  <a href="https://www.google.com">
                    This links to an external site (google)
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="right">
          <Outlet />
        </div>
        <ScrollRestoration getKey={getKey} />
      </div>
    </>
  )
}

async function getArrayLoader() { 
  await new Promise((r) => setTimeout(r, 1000));
  return {
    arr: new Array(100).fill(null).map((_, i) => i)
  };
}

function LongPage() { 
  let data = useLoaderData();
  let location = useLocation();
  return (
    <>
      <h2>Long Page</h2>
      {data.arr.map((n) =>
        <p>Item {n} on {location.pathname}</p>
      )}
      <h3 id='heading'>
        This is a linkable heading
      </h3>
      {data.arr.map((n) => (
        <p key={n}>
          Item {n + 100} on {location.pathname}
        </p>
      ))}
    </>
  )
}