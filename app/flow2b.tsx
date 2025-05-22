import { Box, Typography, Button, Input, FormControl, FormLabel, Grid, Select, MenuItem, styled, TextField, InputLabel } from '@mui/material';
import React from 'react';

const CustomSelect = styled(Select)({
    '& .MuiOutlinedInput-root': {
        border: '1px solid #ccc',
        borderRadius: 4,
        backgroundColor: '#fff',
    },
});

export default function Flow2B() {
    const [A, setA] = React.useState(5);
    const [B, setB] = React.useState(6);    
    const [C, setC] = React.useState(7);
    const [A1, setA1] = React.useState(4);
    const [B1, setB1] = React.useState(5);
    const [C1, setC1] = React.useState(6);
    const [inputExample, setInputExample] = React.useState('Wilfried \" Willi \" Schneider ( born 13 March 1963 in Mediaș , Transylvania ) is a German skeleton racer who competed from 1992 to 2002 . He won two medals in the men \'s skeleton event at the FIBT World Championships with a gold in 1998 and a bronze in 1999 . Schneider also finish ninth in the men \'s skeleton event at the 2002 Winter Olympics in Salt Lake City . He won the men \'s overall Skeleton World Cup title in 1997 - 8 . After retiring from competition Schneider became a coach , leading the Canadian skeleton team to three medals at the 2006 Winter Olympics in Turin ( a gold for Duff Gibson , a silver for Jeff Pain and a bronze for Melissa Hollingsworth ) , and coaching Jon Montgomery to victory in the 2010 Winter Olympics in Vancouver , British Columbia , Canada . In July 2012 Schneider agreed a two - year contract to coach the Russian skeleton team .');
    const [fileType, setFileType] =  React.useState(''); 
  const [extractedEntities, setExtractedEntities] =  React.useState('["2002 Winter Olympics","2002", "Salt Lake City", "Turin","Duff Gibson", "2006 Winter Olympics", "Canadian","Jeff Pain","Melissa Hollingsworth","British Columbia", "Canada"]'); // 抽出的实体
  const [extractedTriples, setExtractedTriples] =  React.useState('[["2002 Winter Olympics", "P580", "2002"], ["2002 Winter Olympics", "P582", "2002"], ["2002 Winter Olympics", "P276", "Salt Lake City"], ["2006 Winter Olympics", "P276", "Turin"], ["Duff Gibson", "P1344", "2006 Winter Olympics"], ["Duff Gibson", "P27", "Canadian"], ["Jeff Pain", "P1344", "2006 Winter Olympics"], ["Jeff Pain", "P27", "Canadian"], ["Melissa Hollingsworth", "P1344", "2006 Winter Olympics"], ["Melissa Hollingsworth", "P27", "Canadian"], ["Jon Montgomery", "P27", "Canadian"], ["Vancouver", "P17", "Canada"], ["British Columbia", "P17", "Canada"], ["British Columbia", "P131", "Canada"], ["Canada", "P150", "British Columbia"], ["Wilfried \" Willi \" Schneider", "P569", "13 March 1963"], ["Wilfried \" Willi \" Schneider", "P1344", "2002 Winter Olympics"], ["Wilfried \" Willi \" Schneider", "P19", "Mediaș"], ["Wilfried \" Willi \" Schneider", "P27", "German"], ["Canadian", "P150", "British Columbia"], ["Mediaș", "P131", "Transylvania"], ["Melissa Hollingsworth", "P27", "Canada"], ["Jon Montgomery", "P27", "Canada"], ["British Columbia", "P131", "Canadian"], ["Vancouver", "P17", "Canadian"]] ');
    const calculateMetric = () => {
    if (A + B + C === 0) return 0; // 防止除以零
    return (A1 + B1 + C1) / (A + B + C);
  };
  const metric = calculateMetric().toFixed(2);
    return (
        <Box sx={{ p: 6, minHeight: '80vh', bgcolor: '#f8f6f6' }}>
            {/* 左上角下拉框 */}

            {/* 下载区域 */}
           <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center' }}>
       <TextField
          variant="outlined"
          sx={{ width: '300px', height: '150px' }}
          value={inputExample}
          onChange={(e) => setInputExample(e.target.value)}
          multiline 
          InputProps={{
              sx: {
                maxHeight: '150px', // 设置最大高度
                overflowY: 'auto', // 超出部分显示垂直滚动条
              },
            }}// 允许多行输入
        />
        <TextField
          variant="outlined"
          sx={{ width: '300px', height: '150px' }}
          value={extractedEntities}
          onChange={(e) => setExtractedEntities(e.target.value)}
          multiline // 允许多行输入
          InputProps={{
              sx: {
                maxHeight: '150px', // 设置最大高度
                overflowY: 'auto', // 超出部分显示垂直滚动条
              },
            }}
        />
        <TextField
          variant="outlined"
          sx={{ width: '300px', height: '150px' }}
          value={extractedTriples}
          onChange={(e) => setExtractedTriples(e.target.value)}
          multiline 
          InputProps={{
              sx: {
                maxHeight: '150px', // 设置最大高度
                overflowY: 'auto', // 超出部分显示垂直滚动条
              },
            }}// 允许多行输入
        />
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

    );
}
