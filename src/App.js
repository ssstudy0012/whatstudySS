import "./App.css";
import Navbar from "./page/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import $ from "jquery";
import { Link } from "react-router-dom";
import { getUser, getToken } from "./services/authorize";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
function App() {
  const [Allstd, setAllstd] = useState([]);
  const [filter, setfilter] = useState("All");
  const [oneData, setoneData] = useState("");

  const fetchAlldata = () => {
    axios
      .get(`${process.env.REACT_APP_API}/finds`)
      .then((res) => {
        setAllstd(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const fetchdata = (room) => {
    axios
      .get(`${process.env.REACT_APP_API}/find/${room}`)
      .then((res) => {
        setAllstd(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const fetchonedata = (stdid) => {
    axios
      .get(`${process.env.REACT_APP_API}/findone/${stdid}`)
      .then((res) => {
        setAllstd(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const inputdata = (e) => {
    setfilter(e.target.value);
  };

  const inputonedata = (e) => {
    setoneData(e.target.value);
    setfilter("none");
    $("#room").val("none").change();
  };

  useEffect(() => {
    if (filter === "All") {
      fetchAlldata();
      setoneData("");
    } else if (filter === "none") {
      if (oneData === "") {
        setfilter("All");
        $("#room").val("All").change();
      } else {
        fetchonedata(oneData);
      }
    } else {
      fetchdata(filter);
      setoneData("");
    }
  }, [filter, oneData]);

  const countstd = Allstd.length;

  Allstd.sort((a, b) => {
    return a.number - b.number;
  });
  Allstd.sort((a, b) => {
    return a.room - b.room;
  });

  //deleteone
  const confirmDelete = (slug) => {
    Swal.fire({
      title: "ต้องการลบใช่ไหม",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        remove(slug);
      }
    });
  };

  const remove = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/find/${slug}`)
      .then((res) => {
        Swal.fire({
          title: "ลบเรียบร้อย!",
          icon: "success",
        });
        fetchAlldata();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //deleteall
  const confirmDeleteAll = () => {
    Swal.fire({
      title: "ต้องการล้างข้อมูลใช่ไหม",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAll();
      }
    });
  };
  const deleteAll = () => {
    axios
      .delete(`${process.env.REACT_APP_API}/deleteAll`, {
        headers: {
          authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        Swal.fire({
          title: "ล้างข้อมูลทั้งหมดเรียบร้อย!",
          icon: "success",
        });
        fetchAlldata();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [university, setuniversity] = useState(Allstd);
  const uni = [
    { text: "จุฬาลงกรณ์มหาวิทยาลัย", values: [Number(0)] },
    { text: "มหาวิทยาลัยธรรมศาสตร์", values: [Number(0)] },
    { text: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี", values: [Number(0)] },
    { text: "มหาวิทยาลัยเกษตรศาสตร์", values: [Number(0)] },
    { text: "มหาวิทยาลัยมหิดล", values: [Number(0)] },
    { text: "มหาวิทยาลัยศรีนครินทรวิโรฒ", values: [Number(0)] },
    { text: "มหาวิทยาลัยศิลปากร", values: [Number(0)] },
    { text: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง", values: [Number(0)] },
    { text: "มหาวิทยาลัยพระจอมเกล้าพระนครเหนือ", values: [Number(0)] },
    { text: "วิทยาลัยเทคโนโลยีทางการแพทย์และสาธารณสุข", values: [Number(0)] },
    { text: "ราชวิทยาลัยจุฬาภรณ์", values: [Number(0)] },
    { text: "สถาบันศรีสวรินทิรา สภากาชาดไทย", values: [Number(0)] },
    { text: "วิทยาลัยพยาบาลบรมราชชนนี", values: [Number(0)] },
    { text: "มหาวิทยาลัยราชภัฎ (รวมทุกแห่ง)", values: [Number(0)] },
    {
      text: "มหาวิทยาลัยเทคโนโลยีราชมงคล (รวมทุกวิทยาเขต)",
      values: [Number(0)],
    },
    { text: "มหาวิทยาลัยเทคโนโลยีสุรนารี", values: [Number(0)] },
    { text: "มหาวิทยาลัยนวมินทราธิราช", values: [Number(0)] },
    { text: "มหาวิทยาลัยแม่ฟ้าหลวง", values: [Number(0)] },
    { text: "มหาวิทยาลัยขอนแก่น", values: [Number(0)] },
    { text: "มหาวิทยาลัยเชียงใหม่", values: [Number(0)] },
    { text: "มหาวิทยาลัยนเรศวร", values: [Number(0)] },
    { text: "มหาวิทยาลัยบูรพา", values: [Number(0)] },
    { text: "มหาวิทยาลัยมหาสารคาม", values: [Number(0)] },
    { text: "มหาวิทยาลัยแม่โจ้", values: [Number(0)] },
    { text: "มหาวิทยาลัยรามคำแหง", values: [Number(0)] },
    { text: "มหาวิทยาลัยกรุงเทพ", values: [Number(0)] },
    { text: "มหาวิทยาลัยสยาม", values: [Number(0)] },
    { text: "มหาวิทยาลัยหัวเฉียว", values: [Number(0)] },
    { text: "มหาวิทยาลัยสวนดุสิต", values: [Number(0)] },
    { text: "วิทยาลัยเทคโนโลยีตั้งตรงจิตรพณิชยการ", values: [Number(0)] },
    { text: "มหาวิทยาลัยศรีปทุม", values: [Number(0)] },
    { text: "มหาวิทยาลัยเอเชียอาคเนย์", values: [Number(0)] },
    { text: "สถาบันเทคโนโลยีไทย-ญี่ปุ่น", values: [Number(0)] },
    { text: "มหาวิทยาลัยเซนต์หลุยส์", values: [Number(0)] },
    { text: "มหาวิทยาลัยหอการค้าไทย", values: [Number(0)] },
    { text: "มหาวิทยาลัยรังสิต", values: [Number(0)] },
    { text: "มหาวิทยาลัยธุรกิจบัณฑิตย์", values: [Number(0)] },
    { text: "วิทยาลัยดุสิตธานี", values: [Number(0)] },
    { text: "สถาบันปัญญาภิวัฒน์", values: [Number(0)] },
    { text: "มหาวิทยาลัยรัตนบัณฑิต", values: [Number(0)] },
    { text: "สถาบินการบินพลเรือน", values: [Number(0)] },
    { text: "อื่น ๆ", values: [Number(0)] },
  ];
  var count = 0;
  university.map((data) => {
    uni.map((ele) => {
      if (data.university === ele.text) {
        ele.values[0] += Number(1);
        count += 1
      }
    });
  });

  uni[uni.length - 1].values[0] = university.length - count

  uni.sort((a, b) => {
    return b.values - a.values;
  });

  const [std, setstd] = useState(uni);

  const [branch, setbranch] = useState(Allstd);
  const bra = [
    { text: "แพทยศาสตร์", values: [Number(0)] },
    { text: "ทันตแพทย์ศาสตร์", values: [Number(0)] },
    { text: "สัตวแพทย์ศาสตร์", values: [Number(0)] },
    { text: "เภสัชศาสตร์", values: [Number(0)] },
    {
      text: "สหเวชศาสตร์/ รังสีเทคนิค/ เทคนิคการแพทย์/ กายภาพบำบัด/ เทคโนโลยีการแพทย์ /เวชนิทัศน์",
      values: [Number(0)],
    },
    { text: "พยาบาลศาสตร์", values: [Number(0)] },
    { text: "วิศวกรรมศาสตร์", values: [Number(0)] },
    { text: "สถาปัตยกรรมศาสตร์", values: [Number(0)] },
    { text: "วิทยาศาสตร์/ วิทยาศาสตร์และเทคโนโลยี", values: [Number(0)] },
    { text: "เทคนิคสัตวแพทย์", values: [Number(0)] },
    { text: "เทคโนโลยีสารสนเทศ/ ดิจิทัล", values: [Number(0)] },
    { text: "เกษตรศาสตร์", values: [Number(0)] },
    { text: "วนศาสตร์", values: [Number(0)] },
    { text: "อุตสาหกรรมเกษตร/ นวัตกรรมเกษตร", values: [Number(0)] },
    { text: "อุตสาหกรรมอาหาร", values: [Number(0)] },
    { text: "ประมง", values: [Number(0)] },
    {
      text: "การบัญชี/ บริหารธุรกิจ/ การจัดการ/ วิทยาการจัดการ",
      values: [Number(0)],
    },
    { text: "เศรษฐศาสตร์", values: [Number(0)] },
    { text: "นิเทศศาสตร์/ วารสารศาสตร์/ สื่อสารมวลชน", values: [Number(0)] },
    {
      text: "อักษรศาสตร์/ ศิลปศาสตร์/ มนุษยศาสตร์/ สังคมศาสตร์",
      values: [Number(0)],
    },
    { text: "โบราณคดี", values: [Number(0)] },
    { text: "จิตวิทยา", values: [Number(0)] },
    { text: "นิติศาสตร์", values: [Number(0)] },
    { text: "รัฐศาสตร์", values: [Number(0)] },
    { text: "ครุศาสตร์/ ศึกษาศาสตร์/ ครุอุตสาหกรรม", values: [Number(0)] },
    { text: "พลศึกษา", values: [Number(0)] },
    { text: "มัณฑนศิลป์", values: [Number(0)] },
    { text: "ศิลปกรรมศาสตร์/ จิตกรรม", values: [Number(0)] },
    { text: "โลจิสติกส์และซัพพลายเชน", values: [Number(0)] },
    { text: "วิทยาลัยนวัตกรรมการสื่อสาร", values: [Number(0)] },
    { text: "นวัตกรรมบูรณาการ", values: [Number(0)] },
    { text: "นายช่างภาคพื้นดิน", values: [Number(0)] },
    { text: "ศึกษาต่อต่างประเทศ", values: [Number(0)] },
    { text: "อื่น ๆ", values: [Number(0)] },
  ];
  var countBranch = 0;
  branch.map((data) => {
    bra.map((ele) => {
      if (data.branch === ele.text) {
        ele.values[0] += Number(1);
        countBranch += 1
      }
    });
  });
  bra[bra.length - 1].values[0] = branch.length - countBranch

  bra.sort((a, b) => {
    return b.values - a.values;
  });

  const [bran, setbran] = useState(bra);

  useEffect(() => {
    setbranch(Allstd);
    setuniversity(Allstd);

    setstd(uni);
    setbran(bra);
    !getUser() && navigator("/login");
  }, [filter, oneData, Allstd]);
  return (
    <div className=" pt-4 container m-auto font-semibold">
      <Navbar />
      <div className="overflow-x-auto relative">
        <h1 className=" text-center font-Prompt text-lg">มหาลัยที่ติด</h1>
        <table
          id="uni-table"
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                ชื่อมหาลัย
              </th>
              <th scope="col" className="py-3 px-6 w-1/5">
                จำนวน (คน)
              </th>
            </tr>
          </thead>
          <tbody>
            {uni.map((ele, index) => {
              if (ele.values[0] > 0) {
                return (
                  <tr className="bg-white border-b " key={index}>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {ele.text}
                    </th>
                    <td className="py-4 px-6">{ele.values[0]}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>

        <h1 className=" text-center font-Prompt text-lg mt-5">คณะที่ติด</h1>
        <table
          id="branch-table"
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                ชื่อคณะ
              </th>
              <th scope="col" className="py-3 px-6 w-1/5">
                จำนวน (คน)
              </th>
            </tr>
          </thead>
          <tbody>
            {bra.map((ele, index) => {
              let text = ele.text;
              const screen = window.screen.width;
              const checkscreen = screen < 426 ? "Yes" : "";
              const checklen = text.length > 44 ? "Yes" : "";
              if (ele.values[0] > 0) {
                return (
                  <tr className="bg-white border-b " key={index}>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {checkscreen && checklen && text.substring(0, 45) + "..."}
                      {!checkscreen && checklen && text}
                      {!checklen && text}
                    </th>
                    <td className="py-4 px-6">{ele.values[0]}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="w-[9rem] m-auto my-3 flex md:flex-row flex-col justify-around items-center">
        <div className="flex justify-center items-center">
          <label
            htmlFor="room"
            className="mr-3  font-Prompt text-xl text-htitle"
          >
            ห้อง
          </label>
          <select
            className="border-2 rounded p-2 w-20 font-Prompt cursor-pointer outline-none"
            id="room"
            onChange={inputdata}
            aria-label="room"
            defaultValue={"All"}
          >
            <option value={"none"}>---</option>
            <option value={"All"}>All</option>
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

        <div className="md:ml-5 text-center md:text-left mt-2 md:mt-0">
          <label className=" font-Prompt ml-1 text-htitle">
            ค้นหาเลขประจำตัว
          </label>
          <input
            placeholder="e.g.35128"
            onChange={inputonedata}
            value={oneData}
            type="text"
            className="border-2 w-48 rounded-lg p-1 font-Prompt font-medium outline-none"
          />
        </div>
      </div>
      <div className="text-center mb-3">
        <p className=" font-Prompt text-green-500">ผลการค้นหา: {countstd}</p>
      </div>
      <table
        id="std-table"
        className="m-auto w-5/6 md:w-full  text-sm text-left text-gray-500 "
      >
        <thead className="text-xs md:text-base text-gray-700 bg-gray-50 ">
          {getUser() === process.env.REACT_APP_USERNAME && (
            <tr>
              <th scope="col" className="font-Prompt py-3 px-3 md:px-6">
                เลขที่
              </th>
              <th scope="col" className="font-Prompt py-3 px-3 md:px-6">
                คำนำหน้า
              </th>
              <th scope="col" className="font-Prompt py-3 px-3 md:px-6">
                ชื่อ
              </th>
              <th scope="col" className="font-Prompt py-3 px-3 md:px-6">
                นามสกุล
              </th>
              <th
                scope="col"
                className="font-Prompt hidden md:table-cell py-3 px-3 md:px-6"
              >
                ห้อง
              </th>
              <th scope="col" className="font-Prompt py-3  md:px-6">
                มหาลัย
              </th>
              <th
                scope="col"
                className="font-Prompt py-3 hidden md:table-cell  md:px-6"
              >
                คณะ
              </th>
              <th
                scope="col"
                className="font-Prompt py-3 hidden md:table-cell  md:px-6"
              >
                สาขา
              </th>
              <th
                scope="col"
                className="font-Prompt py-3 hidden md:table-cell  md:px-6"
              >
                รอบ
              </th>
              <th scope="col" className="font-Prompt py-3 px-3  md:px-6">
                แก้ไข
                <br />
                /ลบ
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {Allstd.map((room, index) => {
            return (
              <tr className="bg-white border-b " key={index}>
                <th className="py-4 px-3 md:px-6">{room.number}</th>
                <th className="py-4 px-3 md:px-6 font-Prompt">{room.prefix}</th>
                <th className="py-4 px-3 md:px-6 font-Prompt">{room.name}</th>
                <th className="py-4 px-3 md:px-6 font-Prompt">
                  {room.lastname}
                </th>

                <th
                  scope="row"
                  className="py-4 px-3 md:px-6 font-medium hidden md:table-cell text-gray-900 whitespace-nowrap "
                >
                  {room.room}
                </th>

                <td className="py-4 md:px-6 font-Prompt">{room.university}</td>

                <td className="py-4 md:px-6 font-Prompt hidden md:table-cell">
                  {room.branch}
                </td>
                <td className="py-4 md:px-6 font-Prompt hidden md:table-cell">
                  {room.major}
                </td>
                <td className="py-4 md:px-6 font-Prompt hidden md:table-cell">
                  {room.round}
                </td>
                {getUser() === process.env.REACT_APP_USERNAME && (
                  <td className="py-4 md:px-6 font-Prompt px-3 ">
                    <Link className="text-orange-400" to={`/edit/${room.slug}`}>
                      แก้ไข
                    </Link>
                    <br />
                    <button
                      className="text-red-500"
                      onClick={() => confirmDelete(room.slug)}
                    >
                      ลบ
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
      {countstd !== 0 && (
        <div>
          <button
            onClick={confirmDeleteAll}
            className=" font-Prompt text-white rounded-xl ml-6 md:ml-16 lg:ml-24 xl:ml-28 p-1 my-5 border-2 border-red-500 bg-red-500"
          >
            ล้างข้อมูลทั้งหมด!
          </button>
          <ReactHtmlTableToExcel
            className=" font-Prompt text-white rounded-xl p-1 my-5 border-2 border-green-400 bg-green-400 ml-5"
            table="std-table"
            filename={`${filter}-std`}
            sheet="Sheet"
            buttonText="โหลดรายชื่อ"
          />
          <ReactHtmlTableToExcel
            className=" font-Prompt text-white rounded-xl p-1 my-5 border-2 border-green-400 bg-green-400 ml-5"
            table="uni-table"
            filename={`${filter}-university`}
            sheet="Sheet"
            buttonText="โหลดมหาลัย"
          />
          <ReactHtmlTableToExcel
            className=" font-Prompt text-white rounded-xl p-1 my-5 border-2 border-green-400 bg-green-400 ml-5"
            table="branch-table"
            filename={`${filter}-branch`}
            sheet="Sheet"
            buttonText="โหลดคณะ"
          />
        </div>
      )}
    </div>
  );
}

export default App;
