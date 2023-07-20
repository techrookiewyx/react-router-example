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
    </ul>
  )
}