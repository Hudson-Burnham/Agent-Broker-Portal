import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ScriptableContext,
  registerables,
} from "chart.js/auto";
import { useEffect } from "react";

function DealsGraph() {
  useEffect(() => {
    ChartJS.register(...registerables);
  }, []);
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: "start",
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);

          gradient.addColorStop(0, "rgba(27, 187, 255, 1)");
          gradient.addColorStop(0.5, "rgba(31, 119, 170, 0.3)");
          gradient.addColorStop(1, "rgba(35, 57, 93, 0)");
          return gradient;
        },
        border: "none",
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.35,
      },
      point: {
        radius: 0,
      },
    },
  };
  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}

export default DealsGraph;
