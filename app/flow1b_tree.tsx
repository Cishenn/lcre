import { Box } from "@mui/material";
import EChartsGraphB from "./eChartsGraphB"; // 专用于b.图谱展示

export default function Flow1BTree() {
  // 直接用静态数据，无需异步加载
  const staticGraphData = {
    nodes: [
      { name: 'Military Events', symbolSize: 60, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'Equipment Deployment', symbolSize: 48, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'Deployment Systems', symbolSize: 48, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'duration', symbolSize: 40, itemStyle: { normal: { color: '#43a047' } } }, // 绿色
      // Military Facilities 相关
      { name: 'Military Facilities', symbolSize: 54, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'Communication Facilities', symbolSize: 40, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'Satellite Communications', symbolSize: 40, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'location', symbolSize: 36, itemStyle: { normal: { color: '#43a047' } } }, // 绿色属性
      // Air Force 相关
      { name: 'Air Force', symbolSize: 54, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'Bomber Corps', symbolSize: 40, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'Fighter Corps', symbolSize: 40, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'date of establishment', symbolSize: 36, itemStyle: { normal: { color: '#43a047' } } }, // 绿色属性
      // Politicians 相关
      { name: 'Politicians', symbolSize: 54, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'Leaders', symbolSize: 40, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'President', symbolSize: 40, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'gender', symbolSize: 36, itemStyle: { normal: { color: '#43a047' } } }, // 绿色属性
      // Aircraft 相关
      { name: 'Aircraft', symbolSize: 54, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'Fighter Aircraft', symbolSize: 40, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'Bombers', symbolSize: 40, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'type', symbolSize: 36, itemStyle: { normal: { color: '#43a047' } } }, // 绿色属性
      // gun 相关
      { name: 'gun', symbolSize: 48, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'submachine gun', symbolSize: 40, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'Weapons', symbolSize: 54, itemStyle: { normal: { color: '#1976d2' } } },
      { name: 'weight', symbolSize: 36, itemStyle: { normal: { color: '#43a047' } } }, // 绿色属性
    ],
    links: [
      { source: 'Equipment Deployment', target: 'Military Events', value: '上位词', lineStyle: { type: 'solid', width: 2 } },
      { source: 'Deployment Systems', target: 'Military Events', value: '上位词', lineStyle: { type: 'solid', width: 2 } },
      { source: 'Military Events', target: 'duration', value: '属性', lineStyle: { type: 'dashed', width: 2 } },
      // Military Facilities 相关
      { source: 'Communication Facilities', target: 'Military Facilities', value: '上位词', lineStyle: { type: 'solid', width: 2 } },
      { source: 'Satellite Communications', target: 'Military Facilities', value: '上位词', lineStyle: { type: 'solid', width: 2 } },
      { source: 'Military Facilities', target: 'location', value: '属性', lineStyle: { type: 'dashed', width: 2 } },
      // Air Force 相关
      { source: 'Bomber Corps', target: 'Air Force', value: '上位词', lineStyle: { type: 'solid', width: 2 } },
      { source: 'Fighter Corps', target: 'Air Force', value: '上位词', lineStyle: { type: 'solid', width: 2 } },
      { source: 'Air Force', target: 'date of establishment', value: '属性', lineStyle: { type: 'dashed', width: 2 } },
      // Politicians 相关
      { source: 'Leaders', target: 'Politicians', value: '上位词', lineStyle: { type: 'solid', width: 2 } },
      { source: 'President', target: 'Politicians', value: '上位词', lineStyle: { type: 'solid', width: 2 } },
      { source: 'Politicians', target: 'gender', value: '属性', lineStyle: { type: 'dashed', width: 2 } },
      // Aircraft 相关
      { source: 'Fighter Aircraft', target: 'Aircraft', value: '上位词', lineStyle: { type: 'solid', width: 2 } },
      { source: 'Bombers', target: 'Aircraft', value: '上位词', lineStyle: { type: 'solid', width: 2 } },
      { source: 'Aircraft', target: 'type', value: '属性', lineStyle: { type: 'dashed', width: 2 } },
      // gun 相关
      { source: 'submachine gun', target: 'gun', value: '上位词', lineStyle: { type: 'solid', width: 2 } },
      { source: 'gun', target: 'Weapons', value: '上位词', lineStyle: { type: 'solid', width: 2 } },
      { source: 'gun', target: 'weight', value: '属性', lineStyle: { type: 'dashed', width: 2 } },
    ],
  };

  return (
    <Box sx={{ p: 0, minHeight: '100vh', bgcolor: '#f8f6f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '1200px' }}>
      {/* 顶部主标题 */}
      <Box sx={{ width: '100%', textAlign: 'center', fontSize: 22, fontWeight: 600, letterSpacing: 2, color: '#222', mt: 2, mb: 1 }}>
        概念关系图谱
      </Box>
      {/* 知识图显示区域 */}
      <Box sx={{ position: 'relative', width: '100%', height: '600px', p: 0, m: 0 }}>
        <EChartsGraphB data={staticGraphData} />
      </Box>
    </Box>
  );
}
