import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import { useParams, useNavigate } from "react-router-dom";
import $ from "jquery";
import { getToken, getUser } from "../services/authorize";
import branchselec from "./selectbranch";
import univer from "./selectuni";
const Edit = (props) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [state, setstate] = useState({
    name: "",
    lastname: "",
    room: "",
    number: 0,
    stdid: "",
    branchinput: "",
    major: "",
    universityinput: "",
    round: "",
    prefix: "",
  });
  const [otherbranch, setotherbranch] = useState("");
  const [otheruni, setotheruni] = useState("");
  const inputotheruni = (e) => {
    setotheruni(e.target.value);
  };
  const inputotherbranch = (e) => {
    setotherbranch(e.target.value);
  };

  const {
    name,
    lastname,
    room,
    number,
    round,
    stdid,
    branchinput,
    major,
    universityinput,
    prefix,
  } = state;

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/findslug/${slug}`)
      .then((res) => {
        const {
          name,
          lastname,
          room,
          number,
          round,
          stdid,
          branch,
          major,
          university,
          prefix,
          slug,
        } = res.data;
        univer.map((data) => {});
        $("#room").val(room).change();
        $("#number").val(number).change();
        $("#round").val(round).change();
        $("#prefix").val(prefix).change();
        setstate({
          ...state,
          name,
          lastname,
          room,
          number,
          round,
          stdid,
          branchinput,
          major,
          universityinput,
          prefix,
          slug,
        });
      })
      .catch((err) => {
        Swal.fire(err.response.data.error, "", "warning");
      });
  }, [slug]);

  const inputValue = (name) => (e) => {
    setstate({ ...state, [name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    var university = "";
    if (universityinput === "อื่น ๆ") {
      university = otheruni;
    } else if (universityinput !== "other") {
      university = universityinput;
    }

    var branch = "";
    if (branchinput === "อื่น ๆ") {
      branch = otherbranch;
    } else if (branchinput !== "อื่น ๆ") {
      branch = branchinput;
    }
    axios
      .put(
        `${process.env.REACT_APP_API}/edit/${slug}`,
        {
          name,
          lastname,
          room,
          number,
          round,
          stdid,
          branch,
          major,
          university,
          prefix,
        },
        {
          headers: {
            authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((res) => {
        Swal.fire("Edit Success", "แก้ไขสำเร็จแล้ว", "success");
        const {
          name,
          lastname,
          room,
          number,
          round,
          stdid,
          branch,
          major,
          university,
          prefix,
          slug,
        } = res.data;
        setstate({
          ...state,
          name,
          lastname,
          room,
          number,
          round,
          stdid,
          branch,
          major,
          university,
          prefix,
          slug,
        });
        navigate(`/find`);
      })
      .catch((err) => {
        Swal.fire(err.response.data.error, "", "warning");
      });
  };
  useEffect(() => {}, []);
  return (
    <div className=" pt-4 container m-auto font-semibold">
      <Navbar />
      <h1 className=" text-hform text-center my-5 text-2xl font-Prompt underline underline-offset-2 decoration-dashed">
        แก้ไขข้อมูลของ {room + "-" + number}
      </h1>
      <form onSubmit={submitForm} className="flex flex-col items-center mt-5">
        <div className="flex flex-col mt-3 mb-2 justify-center items-center">
          <label
            htmlFor="number"
            className=" font-Prompt text-xl text-htitle text-center"
          >
            เลขประจำตัวนักเรียน
          </label>
          <input
            onChange={inputValue("stdid")}
            title="stdid"
            type="text"
            pattern="[0-9\.]+"
            value={stdid}
            placeholder="e.g.35128"
            className="border-2 w-2/4 rounded-lg p-1 font-Prompt font-medium outline-none"
          />
        </div>
        <div className="mt-2 w-[10rem] flex justify-around items-center">
          <label htmlFor="prefix" className="font-Prompt text-xl text-htitle">
            คำนำหน้า
          </label>
          <select
            className="border-2 rounded p-2 w-18 font-Prompt cursor-pointer  outline-none"
            onChange={inputValue("prefix")}
            id="prefix"
            aria-label="prefix"
          >
            <option value={""}>--</option>
            <option value={"นาย"}>นาย</option>
            <option value={"น.ส."}>น.ส.</option>
          </select>
        </div>
        <div className="flex flex-col mt-3 mb-2 justify-center items-center">
          <label
            htmlFor="name"
            className=" font-Prompt text-xl text-htitle text-center"
          >
            ชื่อจริง
          </label>
          <input
            onChange={inputValue("name")}
            title="name"
            type="text"
            value={name}
            placeholder="e.g.สมชาย"
            className="border-2 w-3/4 rounded-lg p-1 font-Prompt font-medium outline-none"
          />
        </div>
        <div className="flex flex-col mt-3 mb-2 justify-center items-center">
          <label
            htmlFor="number"
            className=" font-Prompt text-xl text-htitle text-center"
          >
            นามสกุล
          </label>
          <input
            onChange={inputValue("lastname")}
            title="lastname"
            type="text"
            value={lastname}
            placeholder="e.g.ใจเกเร"
            className="border-2 w-3/4 rounded-lg p-1 font-Prompt font-medium outline-none"
          />
        </div>
        <div className="w-[9rem] flex justify-between items-center">
          <label
            htmlFor="room"
            className="mr-3 font-Prompt text-xl text-htitle"
          >
            ห้อง
          </label>
          <select
            className="border-2 rounded p-2 w-20 font-Prompt cursor-pointer outline-none"
            onChange={inputValue("room")}
            id="room"
            aria-label="room"
          >
            <option value={""}>---</option>
            <option value={"601"}>601</option>
            <option value={"602"}>602</option>
            <option value={"603"}>603</option>
            <option value={"604"}>604</option>
            <option value={"605"}>605</option>
            <option value={"606"}>606</option>
            <option value={"607"}>607</option>
            <option value={"608"}>608</option>
            <option value={"609"}>609</option>
            <option value={"610"}>610</option>
            <option value={"611"}>611</option>
            <option value={"612"}>612</option>
            <option value={"613"}>613</option>
            <option value={"614"}>614</option>
          </select>
        </div>

        <div className="mt-2 w-[9rem] flex justify-between items-center">
          <label
            htmlFor="number"
            className="mr-3 font-Prompt text-xl text-htitle"
          >
            เลขที่
          </label>
          <select
            className="border-2 rounded p-2 w-20 font-Prompt cursor-pointer  outline-none"
            onChange={inputValue("number")}
            id="number"
            aria-label="number"
          >
            <option value={""}>--</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
            <option value={11}>11</option>
            <option value={12}>12</option>
            <option value={13}>13</option>
            <option value={14}>14</option>
            <option value={15}>15</option>
            <option value={16}>16</option>
            <option value={17}>17</option>
            <option value={18}>18</option>
            <option value={19}>19</option>
            <option value={20}>20</option>
            <option value={21}>21</option>
            <option value={22}>22</option>
            <option value={23}>23</option>
            <option value={24}>24</option>
            <option value={25}>25</option>
            <option value={26}>26</option>
            <option value={27}>27</option>
            <option value={28}>28</option>
            <option value={29}>29</option>
            <option value={30}>30</option>
            <option value={31}>31</option>
            <option value={32}>32</option>
            <option value={33}>33</option>
            <option value={34}>34</option>
            <option value={35}>35</option>
            <option value={36}>36</option>
            <option value={37}>37</option>
            <option value={38}>38</option>
            <option value={39}>39</option>
            <option value={40}>40</option>
            <option value={41}>41</option>
            <option value={42}>42</option>
            <option value={43}>43</option>
            <option value={44}>44</option>
            <option value={45}>45</option>
            <option value={46}>46</option>
            <option value={47}>47</option>
            <option value={48}>48</option>
            <option value={49}>49</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="mt-5 w-54 flex flex-col items-center justify-center">
          <label
            htmlFor="universityinput"
            className="font-Prompt text-xl text-green-500"
          >
            มหาลัยที่ติด
          </label>
          <select
            className="border-2 rounded p-2 w-48 font-Prompt cursor-pointer  outline-none"
            onChange={inputValue("universityinput")}
            id="universityinput"
            aria-label="universityinput"
          >
            <option value={""}>--</option>
            {univer.map((ele, index) => {
              return (
                <option value={ele} key={index}>
                  {ele}
                </option>
              );
            })}
          </select>
          <input
            onChange={inputotheruni}
            title="universityinput"
            type="text"
            value={otheruni}
            placeholder="e.g.พระจอมเกล้าธนบุรี"
            id="otheruni"
            className="border-2 mt-5 rounded p-1 font-Prompt font-semibold  outline-none"
          />
        </div>

        <div className="mt-4 w-54 flex flex-col items-center justify-center">
          <label
            htmlFor="branch"
            className="font-Prompt text-xl text-orange-500"
          >
            คณะที่ติด
          </label>
          <select
            className="border-2 rounded p-2 w-48 font-Prompt cursor-pointer  outline-none"
            onChange={inputValue("branchinput")}
            id="branchinput"
            aria-label="branch"
          >
            <option value={""}>--</option>
            {branchselec.map((ele, index) => {
              return (
                <option value={ele} key={index}>
                  {ele}
                </option>
              );
            })}
          </select>
          <input
            onChange={inputotherbranch}
            title="branchinput"
            type="text"
            value={otherbranch}
            placeholder="e.g.พระจอมเกล้าธนบุรี"
            id="otherbranch"
            className="border-2 mt-5 rounded p-1 font-Prompt font-semibold  outline-none"
          />
        </div>
        <div className="mt-4 w-54 flex flex-col items-center justify-center">
          <label className=" font-Prompt text-xl text-red-500">
            สาขา/วิชาเอกที่ติด
          </label>
          <div className="flex flex-col mt-2">
            <input
              onChange={inputValue("major")}
              placeholder="e.g.วิทยาศาสตร์คอมพิวเตอร์"
              value={major}
              title="major"
              type="text"
              className="border-2 rounded p-1 font-Prompt font-semibold outline-none"
            />
          </div>
        </div>

        <div className="mt-2 w-[10rem] flex justify-around items-center">
          <label htmlFor="round" className="font-Prompt text-xl text-red-700">
            รอบที่ติด
          </label>
          <select
            className="border-2 rounded p-2 w-14 font-Prompt cursor-pointer  outline-none"
            onChange={inputValue("round")}
            id="round"
            aria-label="round"
          >
            <option value={""}>-</option>
            <option value={1}>1 Portfolio</option>
            <option value={2}>2 Quota</option>
            <option value={3}>3 Admission</option>
            <option value={4}>4 Direct Admission</option>
          </select>
        </div>

        <div className=" flex flex-col justify-around w-60 items-center mb-10">
          <input
            type="submit"
            className=" transition-all font-Prompt text-xl text-pink-500 border-2 p-2 rounded-lg border-pink-500 cursor-pointer hover:bg-pink-500 hover:text-white mt-10 "
            value={"บันทึกข้อมูล"}
          />
          <input
            type="reset"
            className=" transition-all text-sm font-Prompt text-blue-500 border-2 p-1 rounded-lg border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white mt-2 "
            value={"ล้างข้อมูล"}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
