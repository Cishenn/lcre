/*
 * @Author: Cishenn Lee
 * @Date: 2025-05-16 10:25:35
 * @LastEditTime: 2025-05-16 15:15:49
 * @FilePath: \lcre\app\flow1b.tsx
 * @Description: 
 */
import { Box, Typography } from "@mui/material";

export default function Flow1B() {
  return (
    <Box sx={{ p: 6, minHeight: '100vh', bgcolor: '#f8f6f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        树状图展示
      </Typography>
      <Typography variant="body1">这里是课题一流程 b 的内容页面。</Typography>
    </Box>
  );
}
