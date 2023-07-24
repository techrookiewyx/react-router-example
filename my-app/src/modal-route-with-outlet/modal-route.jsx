import {
  Outlet,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";
import { IMAGES, getImageById } from "../modal-example/images";
// import { Dialog } from "@reach/dialog";
// import "@reach/dialog/styles.css";
import { useRef } from "react";
export default function ModalRoute() {
  return (
    <div>
      <h1>Outlet 模态示例</h1>
      <p>这是一个使用 createBrowserRouter 的模态示例，通过 URL 段驱动模态显示。 模态框是其父级路由的子级路由，并在 Outlet 中呈现。</p>
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
        <hr/>
      </div>
      <Outlet/>
    </div>
  )
}

export function HomeMr() { 
  return (
    <div>
      <h2>Home</h2>
      <p>点击<Link to="gallery">Gallery</Link>路线查看行动中的模态</p>
      <Outlet/>
    </div>
  )
}

export function GalleryMr() { 
  return (
    <div style={{ padding: "0 24px" }}>
      <h2>Gallery</h2>
      <p>单击图像，您会发现您仍然在模式后面看到这条路线。
        该URL也会更改为 {" "}<pre style={{ display: "inline" }}>/gallery</pre>{" "}的子路由
      </p>
      <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
      }}>
        {IMAGES.map(ele=>
          <Link key={ele.id} to={`img/${ele.id}`}>
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
        <Outlet/>
      </div>
    </div>
  )
}

export function ImageView() { 
  let navigate = useNavigate();
  let { id } = useParams();
  let image = getImageById(Number(id));
  let buttonRef = useRef(null);
  function onDismiss() {
    navigate(-1);
  };
  if (!image) {
    throw new Error(`No image found with id: ${id}`);
  }
  return (
    // <Dialog
    //   aria-labelledby="label"
    //   onDismiss={onDismiss}
    //   initialFocusRef={buttonRef}
    // >
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
    // </Dialog>
  )
}