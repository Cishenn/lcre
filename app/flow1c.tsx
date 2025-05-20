import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
import { Bar, Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useState } from "react";

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
  labels: ["MyDataset"],
  datasets: [
    {
      label: "Accuracy",
      data: [0.86], // 86%
      backgroundColor: ["#ab47bc"],
      hoverOffset: 8,
    },
  ],
};

const doughnutOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  cutout: "70%",
  plugins: {
    legend: { display: false },
    datalabels: {
      formatter: (v: number) => (v * 100).toFixed(1) + "%",
      color: "#444",
      font: { weight: "bold", size: 18 },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => (ctx.parsed as number * 100).toFixed(2) + "%",
      },
    },
  },
};

export default function Flow1C() {
  return (
    <Box sx={{ p: 4, bgcolor: "#f8f6f6" }}>
      {/* 图表区域 */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={4}>
          篇章级概念、关系、属性识别平均准确率
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Paper
            elevation={2}
            sx={{
              p: 2,
              borderRadius: 3,
              width: 340,
              mb: 2,
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={1}>
              自建数据集
            </Typography>
            <Box sx={{ width: 220, height: 220, mx: "auto" }}>
              <Doughnut data={privateData} options={doughnutOptions} />
            </Box>
          </Paper>
        </Box>
      </Paper>

      {/* 评价指标说明 */}
      <Paper
        elevation={0}
        sx={{
          mt: 4,
          p: 3,
          bgcolor: "#ffffff",
          border: "1.5px dashed #ccc",
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={1}>
          评价指标说明
        </Typography>
        <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
          采用技术评测方式，在实验条件下，从测试数据集中抽取不少于10篇篇章级XX，利用人工方式提取概念、关系、属性，构成标准答案集。模型识别出的概念、关系、属性分别称为C、R、A，其中命中标准答案集的子集分别称为C’、R’、A’。平均正确率的计算公式如下，验证其是否不低于80%：
          <br />
          <strong>
            Acc=(|C^' |+|R^' |+|A^' |)/(|C|+|R|+|A| )
          </strong>
        </Typography>
      </Paper>
    </Box>
  );
}
