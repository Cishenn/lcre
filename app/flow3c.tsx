import { Box, Select, MenuItem, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import EChartsGraph from "./eChartsGraph"; // 引入 ECharts 图表组件

export default function Flow3C() {
  const [knowledgeGraphData, setKnowledgeGraphData] = useState(null); // 存储知识图的数据
  const [isKnowledgeGraphVisible, setIsKnowledgeGraphVisible] = useState(false); // 控制知识图的显示状态
  const [selectedDataset, setSelectedDataset] = useState("graph_data.json"); // 当前选择的数据集
// @ts-ignore: 跳过下一行类型检查
  const loadKnowledgeGraph = async (filePath) => {
    try {
      // 从指定文件路径加载数据
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // 为每条边设置样式
      // @ts-ignore: 跳过下一行类型检查
      data.links.forEach(link => {
        if (link.value === "") {
          // 如果 value 为空字符串，则设置为虚线
          link.lineStyle = {
            type: "dashed", // 虚线
            width: 1
          };
        } else {
          // 其他边保持默认样式
          link.lineStyle = {
            type: "solid", // 实线
            width: 1
          };
        }
      });

      setKnowledgeGraphData(data);
      setIsKnowledgeGraphVisible(true); // 显示知识图
    } catch (error) {
      console.error('Failed to load graph data:', error);
      alert('Failed to load graph data. Please check the file path and content.');
    }
  };

  useEffect(() => {
    // 根据当前选择的数据集加载知识图数据
    loadKnowledgeGraph(selectedDataset);
  }, [selectedDataset]); // 依赖项包括 selectedDataset，当其变化时重新加载数据

  return (
    <Box sx={{ p: 0, minHeight: '100vh', bgcolor: '#f8f6f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', maxWidth: '1200px' }}>
      {/* 知识图显示区域 */}
      {isKnowledgeGraphVisible&& knowledgeGraphData && (
        <Box sx={{ position: 'relative', width: '100%', height: '600px', p: 0, m: 0 }}>
          {/* 数据集选择框 */}
          <Box sx={{ position: 'absolute', top: 0, left: 0, p: 1, zIndex: 1000 }}>
            <FormControl sx={{ width: '110px' }}>
              <Select
                value={selectedDataset}
                onChange={(e) => setSelectedDataset(e.target.value)}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                sx={{ height: '40px' }}
              >
                <MenuItem value="graph_data.json">数据集 1</MenuItem>
                <MenuItem value="graph_data2.json">数据集 2</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* 知识图组件 */}
          <EChartsGraph data={knowledgeGraphData} />
        </Box>
      )}
    </Box>
  );
}