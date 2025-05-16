import { Box, Typography } from "@mui/material";

export default function Flow2A() {
  return (
    <Box sx={{ p: 6, minHeight: '100vh', bgcolor: '#f8f6f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h4" fontWeight={700} mb={3}>
        课题二流程 a
      </Typography>
      <Typography variant="body1">这里是课题二流程 a 的内容页面。</Typography>
    </Box>
  );
}
