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
  labels: ["fb15k-237", "wn18rr"],
  datasets: [
    {
      label: "Accuracy",
      data: [0.9244, 0.842],
      backgroundColor: ["#42a5f5", "#66bb6a"],
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
      data: [0.8718],
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

export default function Flow3B2() {
  const [dialogType, setDialogType] = useState<"correct" | "wrong" | null>(null);

  return (
    <Box sx={{ p: 4, bgcolor: "#f8f6f6" }}>
      {/* 图表区域 */}
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={4}>
          不同数据集上的冲突消解正确率
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
          消解正确案例
        </Button>
        <Button variant="contained" color="error" onClick={() => setDialogType("wrong")}>
          消解错误案例
        </Button>
      </Box>

      {/* 案例弹窗 */}
      <Dialog open={dialogType !== null} onClose={() => setDialogType(null)} maxWidth="md" fullWidth>
        <DialogTitle>{dialogType === "correct" ? "消解正确案例" : "消解错误案例"}</DialogTitle>
        <DialogContent dividers sx={{ whiteSpace: "pre-wrap", fontSize: 16 }}>
          {dialogType === "correct" ? (
            <>
              冲突三元组对：&lt;<strong>Russia</strong>,conducted_strike_on_residential_building_in,Poltava&gt; {"\n"} 
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&lt;<strong>NATO</strong>,conducted_strike_on_residential_building_in,Poltava&gt;{"\n"}
              冲突消解依据：The primary reason foThe rationale for this decision lies in the identity and current geopolitical context of the entities involved. As stated, Russia is currently engaged in a war against Ukraine, making it plausible that they could be responsible for strikes within Ukrainian territory, such as Poltava. NATO, on the other hand, is an intergovernmental military alliance primarily focused on the defense of its member states, and it does not have troops deployed within Ukraine without explicit authorization from the respective member countries. The current lack of involvement in military action in Ukraine supports that Statement 1 is more plausible than Statement 2.{"\n"}
              消解得到的三元组：&lt;Russia,conducted_strike_on_residential_building_in,Poltava&gt;{"\n"}
              正确三元组：&lt;Russia,conducted_strike_on_residential_building_in,Poltava&gt;{"\n"}
              链接结果：✅ 正确
            </>
          ) : (
            <>
              冲突三元组对：&lt;<strong>Ukraine</strong>,claimed_strike_on,Taneco Refinery&gt; {"\n"}
              &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&lt;<strong>Russia</strong>,claimed_strike_on,Taneco Refinery&gt;{"\n"}
              冲突消解依据：The primary reason for this decision lies in the current geopolitical context and military activities between Ukraine and Russia. Given that Russia is the aggressor in the ongoing conflict, it would be unlikely for Ukraine to have the capability or motive to launch a military strike on a major Russian infrastructure target like the Taneco Refinery. Therefore, based on the provided information, it is more plausible that Russia claimed responsibility for striking the Taneco Refinery than Ukraine.{"\n"}
              消解得到的三元组：&lt;Russia,claimed_strike_on,Taneco Refinery&gt;{"\n"}
              正确三元组：&lt;Ukraine,claimed_strike_on,Taneco Refinery&gt;{"\n"}
              冲突消解结果：❌ 错误
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
          本子课题采用的核心指标为<strong>冲突消解平均正确率</strong>（Accuracy, Acc）。其计算公式为：
          <br />
          <strong>Acc<sub>CDR</sub> = |CON′| / |CON|</strong>
          ，其中 CON 表示冲突知识集合（集合中每个元素为一组冲突三元组），CON′ 表示在模型冲突消解后标准答案集一致的子集。
        </Typography>
      </Paper>
    </Box>
  );
}
