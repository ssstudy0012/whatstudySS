import "zingchart/es6";
import ZingChart from "zingchart-react";
// EXPLICITLY IMPORT MODULE
import "zingchart/modules-es6/zingchart-depth.min.js";
import Data from "./configPiechartbranch";
const Branchchart = () => {
  var myConfig = {
    type: "pie",
    plot: {
      valueBox: {
        placement: "out",
        text: "%t\n%npv%",
        fontFamily: "Prompt",
        fontSize: 12,
        rules: [
          {
            rule: "%v < 1",
            visible: "false",
          },
          {
            rule: "%v > 0",
            visible: "true",
          },
        ],
      },

      animation: {
        effect: 2,
        method: 5,
        speed: 2000,
        sequence: 1,
      },
    },
    plotarea: {
      margin: "0",
    },
    series: Data(),
  };
  return (
    <div className=" m-auto mt-5 w-full lg:block hidden">
      <h1 className=" text-center font-Prompt text-lg">คณะที่ติด</h1>
      <ZingChart data={myConfig} />
    </div>
  );
};
export default Branchchart;
