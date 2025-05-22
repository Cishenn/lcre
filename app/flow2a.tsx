import { Box, Typography, Button, Input, FormControl, FormLabel, Grid, Select, MenuItem, styled } from '@mui/material';
import React from 'react';

const CustomSelect = styled(Select)({
    '& .MuiOutlinedInput-root': {
        border: '1px solid #ccc',
        borderRadius: 4,
        backgroundColor: '#fff',
    },
});

export default function Flow2A() {
    const [A, setA] = React.useState(5);
    const [B, setB] = React.useState(6);    
    const [C, setC] = React.useState(7);
    const [A1, setA1] = React.useState(4);
    const [B1, setB1] = React.useState(5);
    const [C1, setC1] = React.useState(6);
    const [fileType, setFileType] = React.useState('');
    const calculateMetric = () => {
    if (A + B + C === 0) return 0; // 防止除以零
    return (A1 + B1 + C1) / (A + B + C);
  };
  const metric = calculateMetric().toFixed(2);
    return (
        <Box sx={{ p: 6, minHeight: '80vh', bgcolor: '#f8f6f6' }}>
            {/* 左上角下拉框 */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <FormControl sx={{ mb: 2, minWidth: 150 }}>
                    <FormLabel>数据集</FormLabel>
                    <CustomSelect
                        value={fileType}
                        displayEmpty
                        inputProps={{ 'aria-label': '选择数据集' }}
                        onChange={(event) => setFileType(event.target.value)}
                    >
                        <MenuItem value="">请选择数据集</MenuItem>
                        <MenuItem value="数据集a">数据集a</MenuItem>
                        <MenuItem value="数据集b">数据集b</MenuItem>
                    </CustomSelect>
                </FormControl>
            </Box>


            {/* 下载区域 */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
                    <Button variant="outlined">
                        点击下载训练集
                    </Button>
                    <Button variant="outlined">
                        点击下载验证集
                    </Button>
                    <Button variant="outlined">
                        点击下载测试集
                    </Button>
                </Box>


            {/* 指标计算区域 */}
            <Box sx={{ mt: 4, p: 3, bgcolor: '#fff', borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                    指标区
                </Typography>
                {/* 数据输入区域 */}
                <Grid container spacing={2} sx={{ mt: 4 }}>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormLabel component="span" sx={{ mr: 1, minWidth: 48 }}>标注实体数A</FormLabel>
                            <Input type="number" sx={{ flex: 1 , textAlign: 'center' }} value={A} 
        readOnly={true}/>
                    </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                             <FormControl fullWidth sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormLabel component="span" sx={{ mr: 1, minWidth: 48 }}>标注关系数B</FormLabel>
                            <Input type="number" sx={{ flex: 1 , textAlign: 'center' }} value={B} 
        readOnly={true}/>
                    </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                             <FormControl fullWidth sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormLabel component="span" sx={{ mr: 1, minWidth: 48 }}>标注属性数C</FormLabel>
                            <Input type="number" sx={{ flex: 1 , textAlign: 'center' }} value={C} 
        readOnly={true}/>
                    </FormControl>
                        </Grid>
                        </Grid>
                <Grid container spacing={2} sx={{ mt: 4 }}>
                        <Grid item xs={12} md={4}>
                            <FormControl fullWidth sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormLabel component="span" sx={{ mr: 1, minWidth: 48 }}>计算实体数A'</FormLabel>
                            <Input type="number" sx={{ flex: 1 , textAlign: 'center' }} value={A1} 
        readOnly={true}/>
                    </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                             <FormControl fullWidth sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormLabel component="span" sx={{ mr: 1, minWidth: 48 }}>计算关系数B'</FormLabel>
                            <Input type="number" sx={{ flex: 1 , textAlign: 'center' }} value={B1} 
        readOnly={true}/>
                    </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                             <FormControl fullWidth sx={{ display: 'flex', alignItems: 'center' }}>
                            <FormLabel component="span" sx={{ mr: 1, minWidth: 48 }}>计算属性数C'</FormLabel>
                            <Input type="number" sx={{ flex: 1 , textAlign: 'center' }} value={C1} 
        readOnly={true}/>
                    </FormControl>
                        </Grid>
                        </Grid>        
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, justifyContent: 'center' }}>
  <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
    最终指标计算公式：准确率 = (A' + B' + C') / (A + B + C) = {metric}
  </Typography>
</Box>
         </Box>
        </Box>
    );
}
