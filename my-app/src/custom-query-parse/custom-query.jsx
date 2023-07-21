import { Routes, Route, Link, useSearchParams } from "react-router-dom";
import * as JSURL from "jsurl";
import { useCallback, useMemo } from "react";
export default function QueryParse() { 
  return (
    <div>
      <h1>自定义查询解析示例</h1>
      <p>此示例演示如何在URL查询参数中存储复杂的数据。</p>
      <p>每次下面表单中的字段发生更改时，URL都会更新为
         表单值的序列化版本。要查看其效果，
         操作表单中的某些字段。然后，复制地址中的URL
         栏并将其粘贴到浏览器的新选项卡中以查看表单
        与离开时的状态一模一样！</p>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  )
}
function useQueryParam(key) {
  //获取当前页面url参数
  const [searchParams, setSearchParams] = useSearchParams();
  //获取以key为键的参数值
  const paramValue = searchParams.get(key);
  //转化为JSON对象缓存
  const value = useMemo(() => JSURL.parse(paramValue), [paramValue]);
  const setValue = useCallback((newValue,options) => {
    let newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, JSURL.stringify(newValue));
    setSearchParams(newSearchParams, options);
  },[key, searchParams, setSearchParams])
  return [value, setValue];
}

function Home() { 
  let [pizza, setPizza] = useQueryParam('pizza');
  if (!pizza) { 
    pizza = { toppings: [], crust: "regular", extraSauce: false };
  }
  function handleChange(e) { 
    let form = e.currentTarget;
    let formData = new FormData(form);
    let pizza = {
      toppings: formData.getAll("toppings"),
      crust: formData.get("crust"),
      extraSauce: formData.get("extraSauce") === "on",
    }
    setPizza(pizza, { replace: true });
  }
  return (
    <div>
      <form onChange={handleChange}>
        <p>你想在你的披萨上放些什么</p>
        <p>
          <label>
            <input
              defaultChecked={pizza.toppings.includes("pepperoni")}
              type="checkbox"
              name="toppings"
              value='pepperoni'
            />{" "}
            Pepperoni
          </label><br />
          <label>
            <input
              defaultChecked={pizza.toppings.includes("bell-peppers")}
              type="checkbox"
              name="toppings"
              value="bell-peppers"
            />{" "}
            Bell Peppers
          </label><br />
          <label>
            <input
              type="checkbox"
              name="toppings"
              value="olives"
              defaultChecked={pizza.toppings.includes("olives")}
            />{" "}
            Olives
          </label>
        </p>
        <p>
        <label>
            <input
              type="radio"
              name="crust"
              value="regular"
              defaultChecked={pizza.crust === "regular"}
            />{" "}
            Regular Crust
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="crust"
              value="thin"
              defaultChecked={pizza.crust === "thin"}
            />{" "}
            Thin Crust
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="crust"
              value="deep-dish"
              defaultChecked={pizza.crust === "deep-dish"}
            />{" "}
            Deep Dish
          </label>
        </p>
        <p>
          <label>
            <input
              type="checkbox"
              name="extraSauce"
              defaultChecked={pizza.extraSauce}
            />{" "}
            Extra Sauce
          </label>
        </p>
      </form>
      <hr />
      <p>当前的表单值为：</p>
      <pre>{JSON.stringify(pizza || {}, null, 2)}</pre>
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
