import axios from "axios";
import { useEffect, useState } from "react";
const Data = (props) => {
  const [university, setuniversity] = useState([]);
  const fetchAlldata = () => {
    axios
      .get(`${process.env.REACT_APP_API}/finds`)
      .then((res) => {
        setuniversity(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  useEffect(() => {
    fetchAlldata();
  }, []);
  const uni = [
    { text: "จุฬาลงกรณ์มหาวิทยาลัย", values: [Number(0)] },
    { text: "มหาวิทยาลัยธรรมศาสตร์", values: [Number(0)] },
    { text: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี", values: [Number(0)] },
    { text: "มหาวิทยาลัยเกษตรศาสตร์", values: [Number(0)] },
    { text: "มหาวิทยาลัยมหิดล", values: [Number(0)] },
    { text: "มหาวิทยาลัยศรีนครินทรวิโรฒ", values: [Number(0)] },
    { text: "มหาวิทยาลัยศิลปากร", values: [Number(0)] },
    { text: "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง", values: [Number(0)] },
    { text: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ", values: [Number(0)] },
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
  var count = 0
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
    return b.values - a.values
  })
  return uni;
};

export default Data;
