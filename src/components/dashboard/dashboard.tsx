import { Component } from "react";
import Chart from "react-apexcharts";
import RadialBarChart from "./circular-progress";

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    const numbers = Array.from({length: 30}, (_, i) => i + 1);
    console.log(numbers);

    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: numbers,
        },
        colors: ['#FE9010', '#FF4560', '#775DD0']
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 32, 44, 76, 84, 91, 65, 44, 76, 84, 60, 70, 91, 32, ]
        }
      ]
    };
  }

  render() {
    return (
      <div className="flex gap-10">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="1300"
              height='500'
            />
          </div>
        </div>
        <div className="w-1/4 ms-2 p-2 rounded-md border border-slate-500/20 ">
            <RadialBarChart label="Words" progress={87}/>
            <RadialBarChart label="Numbers" progress={76}/>
            <RadialBarChart label="Cards" progress={68}/>
        </div>
      </div>
    );
  }
}

export default DashboardLayout;
