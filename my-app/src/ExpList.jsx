import { Link } from "react-router-dom";

export default function ExpList() { 
  return (
    <ul>
      <li>
        <Link to='basic'>案例一</Link>
      </li>
      <li>
        <Link to='basic-data'>案例二</Link>
      </li>
      <li>
        <Link to='auth'>案例三</Link>
      </li>
      <li>
        <Link to='custom-link'>案例四</Link>
      </li>
      <li>
        <Link to='filter-link'>案例五</Link>
      </li>
      <li>
        <Link to='query-parse'>案例六</Link>
      </li>
      <li>
        <Link to='error-bound'>案例七</Link>
      </li>
    </ul>
  )
}