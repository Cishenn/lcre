"use client";

import { Box, Typography, List, ListItem, ListItemText, Divider, Paper } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import Flow3A1 from "./flow3a1";   // ← 新增
import Flow3A2 from "./flow3a2";
import Flow3C from "@/app/flow3c";   // ← 新增
import Flow1C from "./flow1c";   // ← 新增
import Flow1B from "./flow1b";
import Flow2A from "./flow2a";

// 定义类型，支持可选render属性
interface FlowContentItem {
  title: string;
  content?: string | null;
  render?: () => JSX.Element;
}

const courseFlow = [
  {
    title: "知识模型构建",
    items: [
      { label: "领域概念和关系抽取", color: "#4CAF50", href: "/flow1a" },
      { label: "图谱展示", color: "#4CAF50", href: "/flow1b" },
      { label: "指标展示", color: "#4CAF50", href: "/flow1c" },
    ],
  },
  {
    title: "课题二流程",
    items: [
      { label: "课题二流程", color: "#4CAF50", href: "/flow2a" },
      { label: "课题二流程", color: "#4CAF50", href: "/flow2b" },
      { label: "课题二流程", color: "#F44336", href: "/flow2c" },
    ],
  },
  {
    title: "课题三流程",
    items: [
      { label: "课题三-实体链接展示", color: "#F44336", href: "/flow3a1" },
      { label: "课题三-数据指标展示", color: "#F44336", href: "/flow3a2" },
      { label: "课题三流程", color: "#F44336", href: "/flow3b" },
      { label: "课题三流程", color: "#F44336", href: "/flow3c" },
    ],
  },
];

const datasets = ["数据集a", "数据集b", "数据集c"];

// 独立的上传卡片组件，Hooks只能在组件顶层调用
function Flow1aPanel() {
  const [fileName, setFileName] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(`${file.name} (${Math.round(file.size / 1024)}KB)`);
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = typeof evt.target?.result === 'string' ? evt.target.result : '';
        setFileContent(text);
        setShowTable(false); // 上传新文件时重置表格
        setLoading(false);
      };
      reader.readAsText(file, 'utf-8');
    } else {
      setFileName("");
      setFileContent("");
      setShowTable(false);
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleBuild = () => {
    setLoading(true);
    setShowTable(false);
    setTimeout(() => {
      setLoading(false);
      setShowTable(true);
    }, 2000);
  };

  const handleDownload = () => {
    // 静态表格数据
    const headers = ["领域概念", "上下位关系", "概念属性关系"];
    const rows = [
      [
        "Military Events",
        "<Equipment Deployment, Military Events>;<Deployment Systems, Military Events>",
        "<Military Events, duration>"
      ],
      [
        "Military Facilities",
        "<Communication Facilities, Military Facilities>;<Satellite Communications, Military Facilities>",
        "<Military Facilities, location>"
      ],
      [
        "Air Force",
        "<Bomber Corps, Air Force>;<Fighter Corps, Air Force>",
        "<Air Force, date of establishment>"
      ],
      [
        "Politicians",
        "<Leaders, Politicians>;<President, Politicians>",
        "<Politicians, gender>"
      ],
      [
        "Aircraft",
        "<Fighter Aircraft, Aircraft>;<Bombers, Aircraft>",
        "<Aircraft, type>"
      ],
      [
        "gun",
        "<submachine gun, gun>;<gun, Weapons>",
        "<gun, weight>"
      ],
    ];
    // 生成csv内容
    const csv = [headers.join(",")]
      .concat(
        rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(","))
      )
      .join("\r\n");
    // 创建blob并下载
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "知识模型构建结果.csv";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  // 右侧内容区静态表格
  const staticTable = (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Paper elevation={3} sx={{flex: 1, minWidth: 420, maxWidth: 600, height: 580, bgcolor: '#f8f6f6', p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1.5px solid #e0dada', boxShadow: '0 2px 12px #f3eaea', justifyContent: 'flex-start', overflow: 'hidden' }}>
        <Box sx={{ width: '100%', height: 522, p: 3, bgcolor: '#f8f6f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Box sx={{ width: '100%', maxHeight: 600, overflowY: 'auto', bgcolor: '#fff', borderRadius: 2, boxShadow: 'none', border: '1px solid #eee' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: 8, fontSize: 18, fontWeight: 700 }}>领域概念</th>
                  <th style={{ border: '1px solid #ccc', padding: 8, fontSize: 18, fontWeight: 700 }}>上下位关系</th>
                  <th style={{ border: '1px solid #ccc', padding: 8, fontSize: 18, fontWeight: 700 }}>概念属性关系</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>Military Events</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>&lt;Equipment Deployment, Military Events&gt;<br/>&lt;Deployment Systems, Military Events&gt;</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>&lt;Military Events, duration&gt;</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>Military Facilities</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>&lt;Communication Facilities, Military Facilities&gt;<br/>&lt;Satellite Communications, Military Facilities&gt;</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>&lt;Military Facilities, location&gt;</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>Air Force</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>&lt;Bomber Corps, Air Force&gt;<br/>&lt;Fighter Corps, Air Force&gt;</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>&lt;Air Force, date of establishment&gt;</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>Politicians</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>&lt;Leaders, Politicians&gt;<br/>&lt;President, Politicians&gt;</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>&lt;Politicians, gender&gt;</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>Aircraft</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>&lt;Fighter Aircraft, Aircraft&gt;<br/>&lt;Bombers, Aircraft&gt;</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>&lt;Aircraft, type&gt;</td>
                </tr>
                <tr>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>gun</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>&lt;submachine gun, gun&gt;<br/>&lt;gun, Weapons&gt;</td>
                  <td style={{ border: '1px solid #ccc', padding: 8 }}>&lt;gun, weight&gt;</td>
                </tr>
              </tbody>
            </table>
          </Box>
        </Box>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6, justifyContent: 'center', alignItems: 'center', p: 4, minHeight: 550 }}>
      {/* 左侧卡片：上传文档 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ flex: 1, minWidth: 420, maxWidth: 600, height: 580, bgcolor: '#f8f6f6', p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1.5px solid #e0dada', boxShadow: '0 2px 12px #f3eaea', justifyContent: 'flex-start', overflow: 'hidden' }}>
          <Box sx={{ width: '100%', height: 522, p: 3, bgcolor: '#f8f6f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
            {!(fileName || fileContent !== "") && (
              <Typography sx={{ color: '#ccc', fontSize: 32, textAlign: 'center', mb: 2, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                上传文档 ...
              </Typography>
            )}
            {(fileName || fileContent !== "") && (
              <>
                <Box sx={{
                  width: '100%',
                  maxHeight: 320,
                  overflowY: 'scroll',
                  bgcolor: '#fff',
                  borderRadius: 2,
                  p: 2,
                  mt: 1,
                  whiteSpace: 'pre-wrap',
                  color: '#444',
                  fontSize: 20,
                  border: '1px solid #eee',
                  fontFamily: 'inherit',
                  lineHeight: 1.7,
                  boxSizing: 'border-box',
                }}>
                  {fileContent}
                </Box>
                <Box sx={{ borderTop: '1px solid #e0e0e0', color: '#aaa', fontSize: 22, textAlign: 'center', pt: 2, mt: 2, width: '100%' }}>
                  {fileName}
                </Box>
              </>
            )}
          </Box>
        </Paper>
        {/* 按钮区 */}
        <Box sx={{ width: 300, display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 2, mt: 3 }}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".txt"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button
            style={{
              background: '#42a5f5',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 18,
              padding: '10px 24px',
              cursor: 'pointer',
              height: 44,
              transition: 'background 0.2s',
              flex: 1,
            }}
            onClick={handleUploadClick}
          >
            上传/更新
          </button>
        </Box>
      </Box>
      {/* 右侧卡片：结果展示/表格 */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {!showTable ? (
          <Paper elevation={3} sx={{ flex: 1, minWidth: 420, maxWidth: 600, height: 580, bgcolor: '#f8f6f6', p: 3, borderRadius: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1.5px solid #e0dada', boxShadow: '0 2px 12px #f3eaea', justifyContent: 'flex-start', overflow: 'hidden' }}>
            <Box sx={{ width: '100%', height: 522, p: 3, bgcolor: '#f8f6f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
              {loading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Box sx={{ width: 48, height: 48, border: '4px solid #90caf9', borderTop: '4px solid #fff', borderRadius: '50%', animation: 'spin 1s linear infinite', mb: 2 }} />
                  <Typography sx={{ color: '#90caf9', fontSize: 22 }}>正在构建，请稍候...</Typography>
                  <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                </Box>
              ) : (
                <Typography sx={{ color: '#ccc', fontSize: 32, textAlign: 'center', mb: 2, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {/* <Typography sx={{ color: '#ccc', fontSize: 28, textAlign: 'center' }}></Typography> */}
                  结果将展示在这 ...
                </Typography>
              )}
            </Box>
          </Paper>
        ) : (
          staticTable
        )}
        {/* 按钮区 */}
        <Box sx={{ width: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 3 }}>
          <button
            style={{
              background: '#42a5f5',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              fontSize: 20,
              padding: '10px 28px',
              cursor: 'pointer',
              height: 44,
              transition: 'background 0.2s',
            }}
            onClick={handleBuild}
            disabled={loading}
          >构建</button>
          <button style={{
            background: '#42a5f5',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: 20,
            padding: '10px 28px',
            cursor: 'pointer',
            height: 44,
            transition: 'background 0.2s',
          }} onClick={handleDownload}>下载</button>
        </Box>
      </Box>
    </Box>
  );
}

const flowContent: Record<string, FlowContentItem> = {
  flow1a: {
    title: "知识模型构建",
    content: null,
    render: () => <Flow1aPanel />,
  },
  flow1b: {
    title: "树状图展示",
    render: () => <Flow1B />,
  },
  flow1c: {
    title: "指标展示",
    render: () => <Flow1C />,
  },
  flow2a: {
    title: "课题二流程 a",
    render : () => <Flow2A />,
  },
  flow2b: {
    title: "课题二流程 b",
    content: "这里是课题二流程 b 的内容页面。",
  },
  flow2c: {
    title: "课题二流程 c",
    content: "这里是课题二流程 c 的内容页面。",
  },
  flow3a1: {
    title: "课题三-实体链接展示",
    render: () => <Flow3A1 />,      // ← 改这一行
  },
  flow3a2: {
    title: "课题三-数据指标展示",
    render: () => <Flow3A2 />,      // ← 改这一行
  },
  flow3b: {
    title: "课题三流程 b",
    content: "这里是课题三流程 b 的内容页面。",
  },
  flow3c: {
    title: "课题三流程 c",
    content: "这里是课题三流程 c 的内容页面。",
    render: () => <Flow3C />,
  },
};

type FlowKey = keyof typeof flowContent | null;

export default function Home() {
  const [selectedFlow, setSelectedFlow] = useState<FlowKey>('flow1a');

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f8f6f6" }}>
      {/* 左侧导航栏 */}
      <Box
        sx={{
          width: 320,
          bgcolor: "#fff",
          p: 3,
          boxShadow: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <Typography variant="h5" fontWeight={700} mb={2}>
          流程
        </Typography>
        <List disablePadding>
          {courseFlow.map((flow, idx) => (
            <Box key={flow.title} mb={1}>
              <Typography variant="subtitle1" fontWeight={700}>
                {idx + 1}. {flow.title}
              </Typography>
              <List disablePadding sx={{ pl: 2 }}>
                {flow.items.map((item, i) => (
                  <ListItem key={i} sx={{ py: 0.2 }} disableGutters>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{
                            color: item.color,
                            cursor: "pointer",
                            "&:hover": { textDecoration: "underline" },
                            fontWeight: selectedFlow === item.href.slice(1) ? 700 : 400,
                          }}
                          onClick={() => setSelectedFlow(item.href.slice(1) as FlowKey)}
                        >
                          {String.fromCharCode(97 + i)}. {item.label}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </List>
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" fontWeight={700} mb={1}>
          数据集
        </Typography>
        <List disablePadding>
          {datasets.map((ds, i) => (
            <ListItem key={ds} sx={{ py: 0.2 }}>
              <ListItemText
                primary={
                  <Typography variant="body2" color="text.primary">
                    {i + 1}. {ds}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      {/* 右侧内容区 */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#fbeaea",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minWidth: 0,
        }}
      >
        {selectedFlow && flowContent[selectedFlow] ? (
          <Paper
            elevation={4}
            sx={{
              width: "90%",
              maxWidth: 1200,
              minHeight: 500,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#fff",
              borderRadius: 4,
              p: 8,
            }}
          >
            {selectedFlow && flowContent[selectedFlow] && flowContent[selectedFlow].render ? (
              flowContent[selectedFlow].render!()
            ) : (
              <>
                <Typography variant="h4" fontWeight={700} mb={3}>
                  {flowContent[selectedFlow]?.title}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: 20 }}>
                  {flowContent[selectedFlow]?.content}
                </Typography>
              </>
            )}
          </Paper>
        ) : (
          <>
            <Typography variant="h5" fontWeight={700} mb={3}>
              知识原型
            </Typography>
            <Paper
              elevation={4}
              sx={{
                width: "95%",
                maxWidth: "none",
                height: "95vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#fff",
                borderRadius: 4,
              }}
            >
              {/* 气泡图占位，可替换为实际图表组件 */}
              <svg width="700" height="500">
                <circle cx="350" cy="250" r="120" fill="#4A90E2" opacity="0.7" />
                <circle cx="120" cy="180" r="60" fill="#4A90E2" opacity="0.6" />
                <circle cx="550" cy="120" r="80" fill="#4A90E2" opacity="0.5" />
                <circle cx="220" cy="400" r="45" fill="#4A90E2" opacity="0.5" />
                <circle cx="500" cy="400" r="70" fill="#4A90E2" opacity="0.6" />
                <line x1="350" y1="250" x2="120" y2="180" stroke="#90caf9" strokeWidth="8" />
                <line x1="350" y1="250" x2="550" y2="120" stroke="#90caf9" strokeWidth="8" />
                <line x1="350" y1="250" x2="220" y2="400" stroke="#90caf9" strokeWidth="8" />
                <line x1="350" y1="250" x2="500" y2="400" stroke="#90caf9" strokeWidth="8" />
              </svg>
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
}
