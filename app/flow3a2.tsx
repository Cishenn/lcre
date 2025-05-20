"use client";

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

/* ---------- 数据 ---------- */
const publicData = {
  labels: ["AIDA-YAGO2 testa", "AIDA-YAGO2 testb", "ACE2004"],
  datasets: [
    {
      label: "Accuracy",
      data: [0.845, 0.842, 0.874],
      backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726"],
      borderRadius: 8,
      barThickness: 24,
    },
  ],
};

const privateData = {
  labels: ["MyDataset"],
  datasets: [
    {
      label: "Accuracy",
      data: [0.9],
      backgroundColor: ["#ab47bc"],
      hoverOffset: 8,
    },
  ],
};

/* ---------- 通用选项 ---------- */
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
      font: { weight: "bold" },
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
    },
    y: { grid: { display: false } },
  },
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

export default function Flow3A2() {
  const [dialogType, setDialogType] = useState<"correct" | "wrong" | null>(null);

  return (
    <Box sx={{ p: 4, bgcolor: "#f8f6f6" }}>
      {/* 图表区域 */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={4}>
          不同数据集上的实体链接准确率
        </Typography>

        <Grid container spacing={4}>
          {/* 横向条形图 */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 3, width: "100%", mb: 2 }}>
              <Typography variant="h6" fontWeight={700} mb={1}>
                公开数据集
              </Typography>
              <Bar data={publicData} options={barOptions} height={220} />
            </Paper>
          </Grid>

          {/* 圆环图 */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, borderRadius: 3, width: "100%", mb: 2 }}>
              <Typography variant="h6" fontWeight={700} mb={1}>
                自建数据集
              </Typography>
              <Doughnut data={privateData} options={doughnutOptions} height={220} />
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* 按钮区域 */}
      <Box sx={{ mb: 4, display: "flex", gap: 2 }}>
        <Button variant="contained" color="success" onClick={() => setDialogType("correct")}>
          链接正确案例
        </Button>
        <Button variant="contained" color="error" onClick={() => setDialogType("wrong")}>
          链接错误案例
        </Button>
      </Box>

      {/* 案例弹窗 */}
      <Dialog open={dialogType !== null} onClose={() => setDialogType(null)} maxWidth="md" fullWidth>
        <DialogTitle>{dialogType === "correct" ? "链接正确案例" : "链接错误案例"}</DialogTitle>
        <DialogContent dividers sx={{ whiteSpace: "pre-wrap", fontSize: 16 }}>
          {dialogType === "correct" ? (
            <>
              文本：Units from Ukraine's 60th Mechanized Brigade deployed the drone in Kharkiv, targeting Russian bunkers and fortified positions.{"\n"}
              目标消歧提及：<strong>Mechanized Brigade</strong>{"\n"}
              链接到的实体及ID：14th Mechanized Brigade (Ukraine) | 4992890{"\n"}
              标签ID：4992890{"\n"}
              链接结果：✅ 正确
            </>
          ) : (
            <>
              文本：Russian forces have taken control of the settlement of Bahatyr in Ukraine's eastern Donetsk region, Russia's Ministry of Defence said.{"\n"}
              目标消歧提及：<strong>Donetsk</strong>{"\n"}
              链接到的实体及ID：Donetsk | 105433{"\n"}
              标签ID：2012050{"\n"}
              链接结果：❌ 正确
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogType(null)}>关闭</Button>
        </DialogActions>
      </Dialog>

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
          本子课题采用的核心指标为<strong>知识消歧准确度</strong>（Accuracy, Acc）。其计算公式为：
          <br />
          <strong>Acc<sub>ED</sub> = |AM′| / |AM|</strong>
          ，其中 AM 表示模型识别出的实体集合，AM′ 表示标准答案中与模型输出一致的实体子集。
        </Typography>
      </Paper>
    </Box>
  );
}
