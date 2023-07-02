import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../services/authorize";
import Bpklogo from './BPK LOGO 1.png';
const Navbar = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <img src={Bpklogo} className="w-28 m-auto" alt="" />
      <ul className="flex justify-around  md:text-xl xl:text-2xl transition-all font-semibold">
        <li>
          <Link
            to="/"
            className="  underline decoration-1 underline-offset-2 text-red-800"
          >
            Home
          </Link>
        </li>
        {getUser()&&(
          <li className=" md:ml-[55px] xl:ml-[60px]">
            <Link
              to="/form"
              className=" font-Prompt underline decoration-1 underline-offset-2 text-cyan-900"
            >
              Form
            </Link>
          </li>
        )}
        {getUser() === process.env.REACT_APP_USERNAME && (
          <li className=" md:ml-[55px] xl:ml-[60px]">
            <Link
              to="/find"
              className=" font-Prompt underline decoration-1 underline-offset-2 text-cyan-900"
            >
              ดูข้อมูล
            </Link>
          </li>
        )}
        
        {!getUser() && (
          <li className=" md:ml-[55px] xl:ml-[60px]">
            <Link
              to="/login"
              className=" font-Prompt underline decoration-1 underline-offset-2 text-cyan-900"
            >
              เข้าสู่ระบบ
            </Link>
          </li>
        )}
        {getUser() && (
          <li className=" md:ml-[55px] xl:ml-[60px]">
            <button
              onClick={()=>{logout(()=> navigate('/login'))}}
              className=" font-Prompt underline decoration-1 underline-offset-2 text-cyan-900"
            >
              ออกจากระบบ
            </button>
          </li>
        )}
      </ul>
      <hr className="h-[2px] w-4/5 m-auto  my-2 md:my-4 xl:my-6 bg-slate-300" />
    </div>
  );
};
export default Navbar;
