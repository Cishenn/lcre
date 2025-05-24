/*
 * @Author: Cishenn Lee
 * @Date: 2025-05-16 10:26:46
 * @LastEditTime: 2025-05-24 22:29:49
 * @FilePath: \lcre\app\flow3c.tsx
 * @Description: 
 */
import { Box, FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import EChartsGraph from "./eChartsGraph";

export default function Flow3C() {
  const [knowledgeGraphData, setKnowledgeGraphData] = useState(null);
  const [isKnowledgeGraphVisible, setIsKnowledgeGraphVisible] = useState(false);
  const fixedDataset = "graph_data.json";

                        // @ts-ignore: 跳过下一行类型检查
  const loadKnowledgeGraph = async (filePath) => {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setKnowledgeGraphData(data);
      setIsKnowledgeGraphVisible(true);
    } catch (error) {
      console.error("Failed to load graph data:", error);
      alert("Failed to load graph data. Please check the file path and content.");
    }
  };

  useEffect(() => {

    loadKnowledgeGraph(fixedDataset);
  }, []);

  return (
    <Box
      sx={{
        p: 0,
        minHeight: "100vh",
        bgcolor: "#f8f6f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "1200px"
      }}
    >
      {/* 知识图显示区域 */}
      {isKnowledgeGraphVisible && knowledgeGraphData && (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "600px",
            p: 0,
            m: 0
          }}
        >
          {/* 知识图组件 */}
          <EChartsGraph data={knowledgeGraphData} />
        </Box>
      )}
    </Box>
  );
}