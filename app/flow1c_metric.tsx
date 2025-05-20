import { Paper, Typography, Box } from "@mui/material";

export default function Flow1CMetric() {
  return (
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
        本子课题采用的核心指标为<strong>知识消歧准确度</strong>（Accuracy, Acc）。其计算公式为：<br />
        <strong>Acc<sub>ED</sub> = |AM′| / |AM|</strong>
        ，其中 AM 表示模型识别出的实体集合，AM′ 表示标准答案中与模型输出一致的实体子集。
      </Typography>
    </Paper>
  );
}
