import axios from "axios";
import { useEffect, useState } from "react";
const Databranch = (props) => {
  const [branch, setbranch] = useState([]);
  const fetchAlldata = () => {
    axios
      .get(`${process.env.REACT_APP_API}/finds`)
      .then((res) => {
        setbranch(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    fetchAlldata();
  }, []);

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
  var count = 0;
  branch.map((data) => {
    bra.map((ele) => {
      if (data.branch === ele.text) {
        ele.values[0] += Number(1);
        count += 1
      }
    });
  });


  bra[bra.length - 1].values[0] = branch.length - count;
  bra.sort((a, b) => {
    return b.values - a.values;
  });
  return bra;
};

export default Databranch;
