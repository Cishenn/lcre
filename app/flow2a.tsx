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
    const [fileType, setFileType] = React.useState('train');

    return (
        <Box sx={{ p: 6, minHeight: '100vh', bgcolor: '#f8f6f6' }}>
            {/* 左上角下拉框 */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <FormControl sx={{ mb: 2, minWidth: 150 }}>
                    <FormLabel>文件类型</FormLabel>
                    <CustomSelect
                        value={fileType}
                        displayEmpty
                        inputProps={{ 'aria-label': '选择文件类型' }}
                    >
                        <MenuItem value="train">训练集</MenuItem>
                        <MenuItem value="validation">验证集</MenuItem>
                        <MenuItem value="test">测试集</MenuItem>
                    </CustomSelect>
                </FormControl>
            </Box>

            {/* 顶部标题
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                    课题二流程 a
                </Typography>
                <Typography variant="body1">这里是课题二流程 a 的内容页面。</Typography>
            </Box> */}

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

                {/* 数据输入区域 */}
                <Grid container spacing={2} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <FormLabel>实体数</FormLabel>
                            <Input type="number" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <FormLabel>关系数</FormLabel>
                            <Input type="number" />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormControl fullWidth>
                            <FormLabel>属性数</FormLabel>
                            <Input type="number" />
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>

            {/* 指标计算区域 */}
            <Box sx={{ mt: 4, p: 3, bgcolor: '#fff', borderRadius: 2 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                    指标区
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Typography variant="body1">最终指标计算公式：</Typography>
                    <Typography variant="body1" sx={{ ml: 1 }}>xxxxx</Typography>
                </Box>
                <Button variant="contained" fullWidth>
                    带入数值计算
                </Button>
            </Box>
        </Box>
    );
}
