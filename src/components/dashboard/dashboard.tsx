
import { Component } from "react";
import Chart from "react-apexcharts";
import RadialBarChart from "./circular-progress";
import FirebaseDataFetcher from "@/firebase/FirebaseDataFetcher";

// Define the interface for the chart options
interface ChartOptions {
  chart: {
    id: string;
  };
  xaxis: {
    categories: number[];
  };
  colors: string[];
}

// Define the interface for the series data
interface SeriesData {
  name: string;
  data: number[];
}

// Define the interface for the fetched data
interface FetchedData {
  correctNumbers: Record<string, number[]>;
}

// Define the state interface
interface DashboardState {
  options: ChartOptions;
  series: SeriesData[];
  fetchedData: FetchedData | null;
}

class DashboardLayout extends Component<{}, DashboardState> {
  constructor(props: {}) {
    super(props);
    const numbers = Array.from({ length: 30 }, (_, i) => i + 1);

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
          data: [] // Initially empty, will be filled with fetched data
        }
      ],
      fetchedData: null
    };
  }

  handleFetchData = (data: FetchedData) => {
    // Parse the fetched data to get the series data
    const seriesData = Object.values(data.correctNumbers).flat();

    // Update the state with fetched data
    this.setState({
      series: [
        {
          name: "series-1",
          data: seriesData
        }
      ],
      fetchedData: data
    });
  };

  render() {
    return (
      <div className="flex gap-10">
        <FirebaseDataFetcher onFetch={this.handleFetchData} />
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width="1300"
              height="500"
            />
          </div>
        </div>
        <div className="w-1/4 ms-2 p-2 rounded-md border border-slate-500/20">
          <RadialBarChart label="Words" progress={87} />
          <RadialBarChart label="Numbers" progress={76} />
          <RadialBarChart label="Cards" progress={68} />
        </div>
      </div>
    );
  }
}

export default DashboardLayout;
