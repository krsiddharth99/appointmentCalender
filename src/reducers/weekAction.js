import moment from "moment";

const weekDays = {
  firstDate: "",
  lastDate: "",
  oldWeekData:[],
  weekData: [],
};

const fetchWeeklyData = (state = weekDays, action) => {
  switch (action.type) {
    case "FIRSTFETCH": {
      for (let i = 1; i <= 7; i++) {
        const fullDay = moment().add(i, "d").format("llll");
        state["weekData"].push({
          day: fullDay.split(" ")[0],
          date: fullDay.split(" ")[2],
          month: fullDay.split(" ")[1],
          year: fullDay.split(" ")[3],
          time: fullDay.split(" ")[4],
          type: fullDay.split(" ")[5],
        });
      }
      state["oldWeekData"] = [{}];
      let firstDate = moment().format("llll").toString()
      let lDate = moment().add(7, "d").format("llll").toString();
      state["firstDate"] = firstDate;
      state["lastDate"] = lDate;
      return state;
    }
    case "FETCHNEXTWEEK": {
      for (let i = 1; i <= 7; i++) {
        const fullDay = moment(state["lastDate"]).add(i, "d").format("llll");
        state["weekData"].push({
          day: fullDay.split(" ")[0],
          date: fullDay.split(" ")[2],
          month: fullDay.split(" ")[1],
          year: fullDay.split(" ")[3],
          time: fullDay.split(" ")[4],
          type: fullDay.split(" ")[5],
        });
      }
      let oldWeekData = state["weekData"].splice(0, 7);
      let newWeekDays = state["weekData"].reverse().splice(0, 7).reverse();
      state["oldWeekData"] = oldWeekData;
      state["weekData"] = newWeekDays;
      let firstDate =
        state["weekData"][0].day +
        " " +
        state["weekData"][0].month +
        " " +
        state["weekData"][0].date +
        " " +
        state["weekData"][0].year +
        " " +
        state["weekData"][0].time +
        " " +
        state["weekData"][0].type;

      let lDate =
        state["weekData"][6].day +
        " " +
        state["weekData"][6].month +
        " " +
        state["weekData"][6].date +
        " " +
        state["weekData"][6].year +
        " " +
        state["weekData"][6].time +
        " " +
        state["weekData"][6].type;
      state["firstDate"] = firstDate;
      state["lastDate"] = lDate;
      return state;
    }
    case "FETCHPREVWEEK": {
      for (let i = 1; i <= 7; i++) {
        const fullDay = moment(state["firstDate"])
          .subtract(i, "d")
          .format("llll");
        state["weekData"].push({
          day: fullDay.split(" ")[0],
          date: fullDay.split(" ")[2],
          month: fullDay.split(" ")[1],
          year: fullDay.split(" ")[3],
          time: fullDay.split(" ")[4],
          type: fullDay.split(" ")[5],
        });
      }
      let oldWeekData = state["weekData"].splice(0, 7);
      state["oldWeekData"] = oldWeekData;
      let newWeekDays = state["weekData"].reverse().splice(0, 7);
      state["weekData"] = newWeekDays;
      let firstDate =
        state["weekData"][0].day +
        " " +
        state["weekData"][0].month +
        " " +
        state["weekData"][0].date +
        " " +
        state["weekData"][0].year +
        " " +
        state["weekData"][0].time +
        " " +
        state["weekData"][0].type;

      let lDate =
        state["weekData"][6].day +
        " " +
        state["weekData"][6].month +
        " " +
        state["weekData"][6].date +
        " " +
        state["weekData"][6].year +
        " " +
        state["weekData"][6].time +
        " " +
        state["weekData"][6].type;
      state["firstDate"] = firstDate;
      state["lastDate"] = lDate;
      return state;
    }
    default:
      return state;
  }
};

export default fetchWeeklyData;
