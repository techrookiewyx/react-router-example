import { useCallback, useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import {
  Form,
  Link,
  Outlet,
  unstable_useBlocker as useBlocker,
  useLocation,
} from "react-router-dom";
export default function NavigationCase() {
  //window.history.state.idx可以理解为在点前url页面中点击导航的次数
  let [historyIndex, setHistoryIndex] = useState(window.history.state?.idx);
  let location = useLocation();
  useEffect(() => { 
    setHistoryIndex(window.history.state?.idx)
  },[location]);
  useEffect(() => { 
    document.title = location.pathname;
  },[location])
  return (
    <>
      <h1>Navigation Blocking Example</h1>
      <nav>
        <Link to=''>Index</Link>&nbsp;&nbsp;
        <Link to='one'>One</Link>&nbsp;&nbsp;
        <Link to="two">Two</Link>&nbsp;&nbsp;
        <Link to="three">Three (Form with blocker)</Link>&nbsp;&nbsp;
        <Link to="four">Four</Link>&nbsp;&nbsp;
        <Link to="five">Five</Link>&nbsp;&nbsp;
      </nav>
      <p> Current location (index): {location.pathname} ({historyIndex})</p>
      <Outlet/>
    </>
  )
}

export function ImportantForm() { 
  let actionData = useActionData();
  let [value, setValue] = useState('');
  //该函数用于判断为true条件当前表单不为空，下一个要跳转url和当前url不一样，表示需要拦截
  let shouldBlock = useCallback(
    ({currentLocation,nextLocation})=> value!== ''&&currentLocation.pathname !== nextLocation.pathname
  ,[value]);
  let blocker = useBlocker(shouldBlock);
  useEffect(() => {
    if (actionData?.ok) { 
      setValue('');
    }
  },[actionData]);
  useEffect(() => {
    if (blocker.state === "blocked" && value === "") {
      blocker.reset();
    }
  }, [blocker, value]);

  return (
    <>
      <p>
      表格内是否有内容？{" "}
      {value !== '' ? (
        <span style={{ color: "red" }}>Yes</span>
      ): (
        <span style={{ color: "green" }}>No</span>
      )}
      </p>
      <Form method="post">
      <label>
          输入一些重要数据:
          <input
            name="data"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
      </Form>
      {blocker ? <ConfirmNavigation blocker={blocker} /> : null}  
    </>
  )
}

function ConfirmNavigation({ blocker }) {
  if (blocker.state === 'blocked') { 
    return (
      <>
        <p style={{ color: "red" }}>
          阻止最后一次导航到 {blocker.location.pathname}
        </p>
        <button onClick={() => blocker.proceed?.()}>让我通过</button>
        <button onClick={() => blocker.reset?.()}>让我留在这</button>
      </>
    )
  }
  if (blocker.state === "proceeding") {
    return (
      <p style={{ color: "orange" }}>继续通过受阻的导航</p>
    );
  }
  return <p style={{ color: "green" }}>拦截器目前已解除拦截</p>;
}