import {
  Box,
  Paper,
  Typography,
  Grid,
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const privateData = {
  labels: ["自建数据集"],
  datasets: [
    {
      label: "平均准确率",
      data: [0.86],
      backgroundColor: ["#ab47bc"],
      borderRadius: 8,
      barThickness: 48,
    },
  ],
};

const barOptions: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  plugins: {
    legend: { display: false },
    datalabels: {
      anchor: "end" as const,
      align: "end" as const,
      formatter: (v: number) => (v * 100).toFixed(1) + "%",
      color: "#333",
      font: { weight: "bold", size: 18 },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => (ctx.parsed.x * 100).toFixed(2) + "%",
      },
    },
  },
  scales: {
    x: {
      beginAtZero: true,
      max: 1,
      ticks: {
        callback: (v: number | string) =>
          typeof v === "number" ? v * 100 + "%" : v,
      },
      grid: { display: false },
    },
    y: { grid: { display: false } },
  },
};

export default function Flow1CChart() {
  return (
    <Box sx={{ p: 4, bgcolor: "#f8f6f6" }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={4}>
          篇章级概念、关系、属性识别平均准确率
        </Typography>
        <Paper elevation={2} sx={{ p: 2, borderRadius: 3, width: 340, mb: 2, mx: "auto", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h6" fontWeight={700} mb={1}>
            自建数据集
          </Typography>
          <Box sx={{ width: 220, height: 80, mx: "auto" }}>
            <Bar data={privateData} options={barOptions} height={80} />
          </Box>
        </Paper>
      </Paper>
    </Box>
  );
}
