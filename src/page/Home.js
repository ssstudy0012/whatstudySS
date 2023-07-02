import Navbar from "./Navbar";
import Unichart from './unichart';
import Branchchart from './branchchart';
import Tablechart from './tablechart';
const Home = (props) => {
  
  return (
    <div className=" pt-4 container m-auto font-semibold">
      <Navbar />
      {/* <Unichart />
      <Branchchart/> */}
      <Tablechart />
    </div>
  );
};

export default Home;
