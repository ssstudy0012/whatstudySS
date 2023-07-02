import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { authorize, getUser } from "../services/authorize";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const [state, setstate] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;

  const inputValue = (name) => (e) => {
    setstate({ ...state, [name]: e.target.value });
  };
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then((res) => {
        if (username === process.env.REACT_APP_USERNAME) {
          authorize(res, () => navigate("/find"));
        } else {
          authorize(res, () => navigate("/"));
        }
      })
      .catch((err) => {
        Swal.fire(err.response.data.error, "", "error");
      });
  };

  useEffect(()=>{
    if(getUser() === process.env.REACT_APP_USERNAME){
      getUser() && navigate('/find')
    }else{
      getUser() && navigate('/form')
    }
  },[])
  
  return (
    <div className=" pt-4 container m-auto font-semibold">
      <Navbar />
      <form onSubmit={submitForm} className="flex flex-col items-center mt-5">
        <div className="mt-5 w-54 flex flex-col items-center justify-center">
          <label className=" font-Prompt text-xl text-pink-500">
            เข้าสู่ระบบ
          </label>

          <div className="flex flex-col mt-2">
            <input
              placeholder="รหัสประจำตัวนร. เช่น 35128"
              onChange={inputValue("username")}
              value={username}
              type="text"
              className="border-2 rounded p-1 font-Prompt font-semibold  outline-none"
            />
          </div>
        </div>

        <div className="mt-4 w-54 flex flex-col items-center justify-center">
          <label className=" font-Prompt text-xl text-orange-500">
            รหัสผ่าน
          </label>
          <div className="flex flex-col mt-2">
            <input
              onChange={inputValue("password")}
              autoComplete="true"
              value={password}
              type="password"
              className="border-2 rounded p-1 font-Prompt font-semibold outline-none"
            />
          </div>
        </div>

        <div className=" flex flex-col justify-around w-60 items-center mb-10">
          <input
            type="submit"
            className=" transition-all font-Prompt text-xl text-green-500 border-2 p-2 rounded-lg border-green-500 cursor-pointer hover:bg-pink-500 hover:text-white mt-10 "
            value={"เข้าสู่ระบบ"}
          />
        </div>
      </form>
    </div>
  );
};
export default Login;
