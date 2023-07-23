import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { IMAGES, getImageById } from "./images";
import { useRef } from "react";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
export default function ModalCase() {
  let location = useLocation();
  console.log(location);
  let state = location.state;
  return (
    <div>
      <h1>模态示例</h1>
      <p>这是一个如何使用 React Router 创建上下文模态导航的示例，其中用户采用的导航路径决定页面是否以模态方式呈现（在 2010 年代由 pinterest、instagram 和其他人流行）。 这种类型的模式通常用作一种“详细”视图，以专注于集合中的特定对象（例如 pinterest 板），同时不会使您完全脱离父页面的上下文。 但是，当直接访问相同的 URL（而不是从集合页面）时，它会呈现为自己的完整页面而不是模式。</p>
      <p>在此示例中，请注意当模式打开时 URL 如何更新。 即使 URL 更新为模式中的特定项目，背景页面仍然显示在其后面。</p>
      <p>接下来，将 URL 复制并粘贴到新的浏览器选项卡，您会发现它显示的特定项目不是在模式中，而是直接在页面上。 这是当您打开模式时，如果有人单击您发送给他们的链接，他们会看到的视图。 他们没有您打开模式时所做的上下文，因此他们在背景页面的上下文中看不到它。</p>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="img/:id" element={<ImageView />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
      {/* backgroundLocation指我们手动附加的一个属性代表我们点击图片时所处的位置。 
        如果存在，请将其用作 <Routes> 的位置，以便我们在modal后面的背景中显示图库。 */}
      {state?.backgroundLocation && (
        <Routes>
          <Route path="img/:id" element={<Modal />} />
        </Routes>
      )}
    </div>
  )
}

function Layout() { 
  return (
    <div>
    <nav>
      <ul>
        <li>
          <Link to="">Home</Link>
        </li>
        <li>
          <Link to="gallery">Gallery</Link>
        </li>
      </ul>
    </nav>
    <hr />
    <Outlet />
  </div>
  )
}

function Gallery() { 
  let location = useLocation();
  return (
    <div style={{ padding: "0 24px" }}>
      <h2>Gallery</h2>
      <div style={{
         display: "grid",
         gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
         gap: "24px",
      }}>
        {IMAGES.map(ele=>
          <Link
            key={ele.id}
            to={`/modal-example/img/${ele.id}`}
            // 手动添加只有当我们通过点击链接的方式附加backgroundLocation时，才可以打开modal，我们仍然可以在后台看到当前页面。
            state={{ backgroundLocation: location }}
          >
            <img
              width={200}
              height={200}
              style={{
                width: "100%",
                aspectRatio: "1 / 1",
                height: "auto",
                borderRadius: "8px",
              }}
              src={ele.src}
              alt={ele.title}
            />
          </Link>  
        )}
      </div>
    </div>
  )
}

function ImageView() { 
  const { id } = useParams();
  let image = getImageById(+id);
  if(!image) return <div>图片没有找到</div>
  return (
    <div>
      <h1>{image.title}</h1>
      <img width={400} height={400} src={image.src} alt="" />
    </div>
  )
}
function Modal() { 
  let navigate = useNavigate();
  let { id } = useParams();
  let image = getImageById(+id);
  let buttonRef = useRef(null);
  function onDismiss() {
    navigate(-1);
  }
  if (!image) return null;
  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={onDismiss}
      initialFocusRef={buttonRef}
    >
    <div
      style={{
        display: "grid",
        justifyContent: "center",
        padding: "8px 8px",
      }}
    >
      <h1 id="label" style={{ margin: 0 }}>
        {image.title}
      </h1>
      <img
        style={{
          margin: "16px 0",
          borderRadius: "8px",
          width: "100%",
          height: "auto",
        }}
        width={400}
        height={400}
        src={image.src}
        alt=""
      />
      <button
        style={{ display: "block" }}
        ref={buttonRef}
        onClick={onDismiss}
      >
        Close
      </button>
      </div>
    </Dialog>
  )
}

function Home() { 
  return (
    <div>
      <h2>Home</h2>

      <h3>Featured Images</h3>
      <ul>
        <li>
          <Link to="img/1">Image 1</Link>
        </li>
        <li>
          <Link to="img/2">Image 2</Link>
        </li>
      </ul>
    </div>
  )
}


function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="">Go to the home page</Link>
      </p>
    </div>
  );
}