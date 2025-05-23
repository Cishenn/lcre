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
  FormControl,
  FormLabel,
  Select, 
  MenuItem, 
  styled
} from "@mui/material";
import React from 'react';

const CustomSelect = styled(Select)({
    '& .MuiOutlinedInput-root': {
        border: '1px solid #ccc',
        borderRadius: 4,
        backgroundColor: '#fff',
    },
});

  type FileStructure = {
    h1: string;
    r1: string;
    t1: string;
    h2: string;
    r2: string;
    t2: string;
    relation_type: string
  };
  type ConflictMapping = {[Conflict: string]: FileStructure;};
  const Conflict_MAPPING: ConflictMapping = {
    "冲突示例1": {
      h1: "Oreshnik Missile",
      r1: "is_type_of",
      t1: "Hypersonic Ballistic Missile",
      h2: "Oreshnik Missile",
      r2: "is_type_of",
      t2: "Cruise Missile",
      relation_type: "Fact Conflict"
    },
    "冲突示例2": {
      h1: "Alexander Dugin",
      r1: "is_known_as",
      t1: "Putin's brain",
      h2: "Alexander Dugin",
      r2: "is_known_as",
      t2: "Russia's Foreign Minister",
      relation_type: "Fact Conflict"
    },
    "冲突示例3": {
      h1: "European leaders",
      r1: "gathered_in",
      t1: "Kyiv",
      h2: "European leaders",
      r2: "gathered_in",
      t2: "Moscow",
      relation_type: "Fact Conflict"
    },
    "冲突示例4": {
      h1: "Fareed Zakaria",
      r1: "interviews",
      t1: "Alexander Dugin",
      h2: "Fareed Zakaria",
      r2: "interviews",
      t2: "Volodymyr Zelensky",
      relation_type: "Fact Conflict"
    }
    
    // 可以继续添加其他冲突案例...
  };

export default function Flow3B1() {
  const [Conflict, setConflict] = React.useState('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [answer, setAnswer] = React.useState('');
  const [reason, setReason] = React.useState('');


  const getFileStructure = (Conflict: string) => {
    return Conflict_MAPPING[Conflict] || {};
  };

  const selectedFileStructure = getFileStructure(Conflict);


    // 提交给后端
  const handleConflictResolve = async () => {
    if (!Conflict.trim()) return;
    setLoading(true);
    setAnswer('');
    setReason('');
    try {
      const resp = await fetch("http://localhost:5000/Conflict_resolve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          h1: selectedFileStructure.h1 ,
          r1: selectedFileStructure.r1 ,
          t1: selectedFileStructure.t1 ,
          h2: selectedFileStructure.h2 ,
          r2: selectedFileStructure.r2 ,
          t2: selectedFileStructure.t2 ,
          relation_type: selectedFileStructure.relation_type
        }),
      });
      const data = await resp.json();
      setAnswer(data.answer || '')
      setReason(data.reason || '');
    } catch (err) {
      alert("实体链接服务异常，请检查后端服务！");
    }
    setLoading(false);
  };
  return (
    <Box sx={{ p: 4, bgcolor: "#f8f6f6" ,width: 1100}}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          冲突消解在线演示
        </Typography>
            {/* 左上角下拉框 */}
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center' }}>
                <FormControl sx={{ mb: 2, minWidth: 150 }}>
                    <FormLabel>冲突三元组对</FormLabel>
                    <CustomSelect
                        value={Conflict}
                        displayEmpty
                        inputProps={{ 'aria-label': '选择冲突' }}
                        onChange={(event) => {
                        // @ts-ignore: 跳过下一行类型检查
                          setConflict(event.target.value);
                          setAnswer('');
                          setReason('');
                        }}
                    >
                        <MenuItem value="">请选择冲突三元组对</MenuItem>
                        <MenuItem value="冲突示例1">冲突示例1</MenuItem>
                        <MenuItem value="冲突示例2">冲突示例2</MenuItem>
                        <MenuItem value="冲突示例3">冲突示例3</MenuItem>
                        <MenuItem value="冲突示例4">冲突示例4</MenuItem>
                    </CustomSelect>
                </FormControl>
            </Box>
        <Grid container spacing={4}>
          {/* 冲突三元组对内容展示 */}
          <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={700} mb={1}>
                正确三元组：
              </Typography>
              <Typography variant="body1" fontWeight={700} mb={1}>
                {Conflict ? `<${selectedFileStructure.h1},${selectedFileStructure.r1},${selectedFileStructure.t1}>` : "\n"}
              </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" fontWeight={700} mb={1}>
                异常三元组：
              </Typography>
              <Typography variant="body1" fontWeight={700} mb={1}>
                {Conflict ? `<${selectedFileStructure.h2},${selectedFileStructure.r2},${selectedFileStructure.t2}>` : "\n"}
              </Typography>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          onClick={handleConflictResolve}
          disabled={loading || !Conflict.trim()}
        >
          {loading ? "正在消解..." : "冲突消解"}
        </Button>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            minHeight: 100,
            mt: 3,
            bgcolor: "#fff",
          }}
        >
          <Typography fontWeight={700} mb={1}>消解结果</Typography>
          <Typography sx={{ fontSize: 17, lineHeight: 1.6 }}>
            {!answer ? "" : (
              answer === "Triple1" 
              ? `<${selectedFileStructure.h1},${selectedFileStructure.r1},${selectedFileStructure.t1}>✅ 正确`
              : `<${selectedFileStructure.h2},${selectedFileStructure.r2},${selectedFileStructure.t2}>❌ 错误`
            )}
        </Typography>
        </Paper>
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            minHeight: 100,
            mt: 3,
            bgcolor: "#fff",
          }}
        >
          <Typography fontWeight={700} mb={1}>消解理由</Typography>
          <Typography sx={{ fontSize: 17, lineHeight: 1.6 }}>
            {reason}
        </Typography>
        </Paper>
      </Paper>
    </Box>
  );
}
