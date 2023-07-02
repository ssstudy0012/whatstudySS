import Data from "./configPiechartuni";
import Databranch from "./configPiechartbranch";
const Tabelchart = () => {
  return (
    <div className="overflow-x-auto relative">
      <h1 className=" text-center font-Prompt text-lg">มหาลัยที่ติด</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">
              ชื่อมหาลัย
            </th>
            <th scope="col" className="py-3 px-6 w-1/4">
              จำนวน (คน)
            </th>
          </tr>
        </thead>
        <tbody>
          {Data().map((ele, index) => {
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
            {/*  */}
      <h1 className=" text-center font-Prompt text-lg mt-5">คณะที่ติด</h1>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6 ">
              ชื่อคณะ
            </th>
            <th scope="col" className="py-3 px-6 w-1/4">
              จำนวน (คน)
            </th>
          </tr>
        </thead>
        <tbody>
          {Databranch().map((ele, index) => {
            if (ele.values[0] > 0) {
              let text = ele.text;
              const screen = window.screen.width;
              const checkscreen = screen < 426 ? "Yes" : "";
              const checklen = text.length > 44 ? "Yes" : "";

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
  );
};
export default Tabelchart;
