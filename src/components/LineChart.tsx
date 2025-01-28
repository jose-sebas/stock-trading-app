import React from "react";
import { Line } from "react-chartjs-2";
import { ChartProps } from "../Interfaces";


const LineChart: React.FC<ChartProps> = ({chartData}: ChartProps) => {
  return (
    <div className="chart-container">
      <Line
        data={chartData}
        options={{
       
        }}
      />
    </div>
  );
}
export default LineChart;