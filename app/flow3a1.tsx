"use client";

import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useState } from "react";

// 后端返回的实体接口类型
interface Entity {
  mention: string;
  start: number;
  end: number;
  entity_name: string | null;
  entity_id: number | null;
  description: string;
}

const palette = [
  "#ffd54f", "#aed581", "#ffab91", "#90caf9",
  "#ce93d8", "#ffe082", "#80cbc4",
];

export default function Flow3A1() {
  const [inputText, setInputText] = useState<string>("");
  const [entities, setEntities] = useState<Entity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 高亮文本渲染
  const renderHighlightedText = (text: string, entities: Entity[]) => {
    if (entities.length === 0) return text;
    let lastIdx = 0;
    let spans: JSX.Element[] = [];
    // 保证从前往后
    entities
      .sort((a, b) => a.start - b.start)
      .forEach((e, i) => {
        if (e.start > lastIdx)
          spans.push(<span key={lastIdx + "-plain"}>{text.slice(lastIdx, e.start)}</span>);
        spans.push(
          <span
            key={e.start + "-entity"}
            style={{
              backgroundColor: palette[i % palette.length],
              borderRadius: "4px",
              fontWeight: 600,
              padding: "2px 4px",
              marginRight: "2px",
            }}
          >
            {text.slice(e.start, e.end)}
          </span>
        );
        lastIdx = e.end;
      });
    if (lastIdx < text.length)
      spans.push(<span key={lastIdx + "-plain"}>{text.slice(lastIdx)}</span>);
    return spans;
  };

  // 提交给后端
  const handleLinkEntities = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setEntities([]);
    try {
      const resp = await fetch("http://localhost:5000/link_entities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await resp.json();
      setEntities(data.entities || []);
    } catch (err) {
      alert("实体链接服务异常，请检查后端服务！");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        p: 6,
        minHeight: "100vh",
        bgcolor: "#f8f6f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper elevation={4} sx={{ maxWidth: 1150, width: "100%", p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          实体链接在线演示
        </Typography>
        <Grid container spacing={4}>
          {/* 左侧：输入框 */}
          <Grid item xs={12} md={6}>
            <Typography mb={1} fontWeight={500}>输入文本</Typography>
            <TextField
              multiline
              minRows={6}
              fullWidth
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="请输入英文文本，点击实体链接"
              variant="outlined"
              sx={{ mb: 2, bgcolor: "#fff" }}
            />
            <Button
              variant="contained"
              onClick={handleLinkEntities}
              disabled={loading || !inputText.trim()}
            >
              {loading ? "正在链接..." : "实体链接"}
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
              <Typography fontWeight={700} mb={1}>高亮显示识别的实体</Typography>
              <Typography sx={{ fontSize: 17, lineHeight: 1.6 }}>
                {renderHighlightedText(inputText, entities)}
              </Typography>
            </Paper>
          </Grid>
          {/* 右侧：实体详情 */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight={700} mb={1}>
              链接结果详情
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
              <strong>原始提及</strong> | <strong>实体名称</strong> (ID) <br />简介
            </Typography>
            <Paper variant="outlined" sx={{ p: 0, bgcolor: "#fafafa" }}>
              <List dense disablePadding>
                {entities.length === 0 && (
                  <ListItem>
                    <ListItemText primary="暂无识别结果" />
                  </ListItem>
                )}
                {entities.map((e, idx) => (
                  <ListItem key={idx} alignItems="flex-start">
                    <ListItemText
                      primary={
                        <span>
                          <span style={{ background: palette[idx % palette.length], borderRadius: 3, padding: "1px 4px" }}>
                            {e.mention}
                          </span>
                          &nbsp;|&nbsp;
                          <span style={{ fontWeight: 600 }}>{e.entity_name || "无"}</span>
                          {e.entity_id !== null ? <> (ID: {e.entity_id})</> : ""}
                        </span>
                      }
                      secondary={e.description}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
