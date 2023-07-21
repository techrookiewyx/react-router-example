import {
  Routes,
  Route,
  Outlet,
  Link,
  useSearchParams,
  useParams,
} from "react-router-dom";
import { brands, filterByBrand, getSneakerById, SNEAKERS } from "./snacks";
import { useMemo } from "react";
export default function FilterLink() { 
  return (
    <div>
      <h1>自定义过滤器链接示例</h1>
      <p>此示例演示如何创建“过滤器链接”，就像通常用于过滤电子商务网站上的产品列表的链接一样。
        <code>&lt;BrandLink&gt;</code>组件是一个自定义
        <code>&lt;Link&gt;</code>，它通过 URL 查询字符串中的内容了解当前是否“活动”。</p>
      <Routes>
        <Route path='' element={<Layout />}>
          <Route index element={<SneakerGrid />} />
          <Route path="sneakers/:id" element={<SneakerView />}/>
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </div>
  )
}

function Layout() {
  return (
    <div>
      <nav>
        <h3>通过品牌过滤</h3>
        <ul>
          <li><Link to=''>全部</Link></li>
          {/* 以列表形式显示全部品牌 */}
          {brands.map(ele =>
            <li key={ele}>
              <BrandLink brand={ele}>{ele}</BrandLink>
            </li>
          )}
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}
function BrandLink({ brand, children }) {
  //查询url参数，判断是否点击了某个品牌
  let [searchParams] = useSearchParams();
  //判断url参数中的brand字段的值和哪个props的brand值一致
  let isActive = searchParams.get('brand') === brand;
  return (
    <Link
      to={`/filter-link/?brand=${brand}`}
      style={{color: isActive ? "red" : "black"}}
    >
      {children}
    </Link>
  )
}
function SneakerGrid() {
  let [searchParams] = useSearchParams();
  //通过url参数获取选中的品牌
  let brand = searchParams.get("brand");
  const sneakers = useMemo(() => {
    //如果未点击返回未过滤的商品内容
    if (!brand) return SNEAKERS;
    return filterByBrand(brand);
  }, [brand]);
  return (
    <main>
      <h2>Sneakers</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "12px 24px",
        }}
      >
        {sneakers.map(snkr => {
          let name = `${snkr.brand} ${snkr.model} ${snkr.colorway}`;
          return (
            <div
              key={snkr.id} style={{position: "relative"}}
            >
              <img
                 width={200}
                 height={200}
                 src={snkr.imageUrl}
                 alt={name}
                 style={{
                   borderRadius: "8px",
                   width: "100%",
                   height: "auto",
                   aspectRatio: "1 / 1",
                 }}
              />
              <Link
                style={{ position: "absolute", inset: 0 }}
                to={`sneakers/${snkr.id}`}
              >
              </Link>
              <div>
                <p>{name}</p>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
function SneakerView() { 
  let {id} = useParams();
  if (!id) {
    return <NoMatch/>
  }
  let snkr = getSneakerById(id);
  if (!snkr) { 
    return <NoMatch />;
  }
  let name = `${snkr.brand} ${snkr.model} ${snkr.colorway}`;
  return (
    <div>
      <h2>{name}</h2>
      <img
        width={400}
        height={400}
        style={{
          borderRadius: "8px",
          maxWidth: "100%",
          aspectRatio: "1 / 1",
        }}
        src={snkr.imageUrl}
        alt={name}
      />
    </div>
  )
}
function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}