import {React, useEffect, useState,useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchNextWeek, fetchPrevWeek, firstFetch } from "./actions";
import moment from "moment";
import "./App.css";

const timing = [
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
];

function App() {
  const timeZones = [
    "[UTC-5] Eastern Standard Time",
    "[UTC-0] Western European time",
  ];
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [timezone, setTimeZone] = useState(timeZones[0]);
  const dispatch = useDispatch();
  const { weekAction } = useSelector((state) => state);
  const today = moment().format("llll").toString();

  const handleZoneChange = (e) => {
    const value = e.target.value;
    setTimeZone(value);
  };

  useEffect(() => {
    dispatch(firstFetch());
    forceUpdate();
    console.log(weekAction["firstDate"]);
  },[]);

  return (
    <div className="App">
      <header className="m-5">
        <div className="flex justify-between items-center ">
          <button
            onClick={() => {dispatch(fetchPrevWeek()) ;forceUpdate()}}
            className="flex items-center gap-3 border-[1px] border-black px-10 py-3 rounded-lg"
          >
            <i className="fa-solid fa-caret-left"></i>
            <span>Previous</span>
          </button>
          <div className="date">
            <h6>{weekAction["firstDate"]}</h6>
          </div>
          <button
            onClick={() => {dispatch(fetchNextWeek());forceUpdate()}}
            className="flex items-center gap-3 border-[1px] border-black px-16 py-3 rounded-lg"
          >
            <span>Next</span>
            <i className="fa-solid fa-caret-right"></i>
          </button>
        </div>
        <br />
        <h6>Timezone:</h6>
        <select
          onChange={(e) => handleZoneChange(e)}
          className="border-[1px] w-[100%] outline-none cursor-pointer rounded-md py-2 mt-2"
        >
          {timeZones.map((zone, idx) => {
            return (
              <option key={idx} value={zone}>
                {zone}
              </option>
            );
          })}
        </select>
      </header>
      <main>
        {weekAction["oldWeekData"] != weekAction["weekData"] ? (
          weekAction["weekData"].map((eachDay, idx) => {
            return (
              <div id={idx} className="flex items-center ju stify-start">
                <div className="flex-1 px-7 py-7 bg-gray-100">
                  <h4 className="text-lg text-red-700 font-semibold">
                    {eachDay["day"]}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {eachDay["month"]}/{eachDay["date"]}
                  </p>
                </div>
                <div className="flex flex-[25] flex-wrap gap-3 pl-10 pr-32">
                  {moment(
                    eachDay["day"] +
                      " " +
                      eachDay["month"] +
                      " " +
                      eachDay["date"] +
                      " " +
                      eachDay["year"] +
                      " " +
                      eachDay["time"] +
                      " " +
                      eachDay["type"]
                  ).isBefore(today) ? (
                    <p>Past</p>
                  ) : (
                    timing.map((time) => {
                      return (
                        <div key={time} className="flex items-center">
                          <input
                            type="checkbox"
                            value={time}
                            id={time}
                            className={time}
                          />
                          &nbsp;
                          <label
                            className="text-sm text-gray-400"
                            htmlFor={time}
                          >
                            {time}
                          </label>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <h1>Not Updated</h1>
        )}
      </main>
    </div>
  );
}

export default App;
