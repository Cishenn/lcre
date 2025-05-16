/*
 * @Author: Cishenn Lee
 * @Date: 2025-05-16 10:25:29
 * @LastEditTime: 2025-05-16 10:53:46
 * @FilePath: \lcre\app\flow1a.tsx
 * @Description: 
 */
import { Box, Typography } from "@mui/material";

export default function Flow1A() {
  return (
    <Box sx={{ p: 6, minHeight: '100vh', bgcolor: '#f8f6f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        课题一流程 a
      </Typography>
      <Typography variant="body1">这里是课题一流程 a 的内容页面。</Typography>
    </Box>
  );
}
