import { Box, Typography } from "@mui/material";
import { useState } from 'react';

function Flow2B() {
  // 状态管理
  const [fileContent, setFileContent] = useState('');
  const [extractedEntities, setExtractedEntities] = useState([]);
  const [entityRelations, setEntityRelations] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [finalFormula, setFinalFormula] = useState('');
  const [calculationResult, setCalculationResult] = useState('');

  // 计算指标
  const calculateMetrics = () => {
    // 这里可以添加计算逻辑
    // 模拟计算结果
    setCalculationResult('计算结果: 12345');
  };

  return (
    <Box sx={{ p: 6, minHeight: '100vh', bgcolor: '#f8f6f6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

      
<Box sx={{ width: '100%', display: 'flex', gap: 4, mb: 4, p: 3, bgcolor: 'white', borderRadius: 2 }}>
  {/* 文件上传区 */}
  <Box sx={{ maxWidth: 250, flex: 1 }}>
    <Typography variant="h6" gutterBottom>
      输入/上传例子
    </Typography>
    <Box sx={{ mb: 2 }}>
      <textarea
        value={fileContent}
        onChange={(e) => setFileContent(e.target.value)}
        placeholder="粘贴文本或上传文件..."
        style={{ width: '100%', height: 150, padding: 10, borderRadius: 4, border: '1px solid #ddd' }}
      />
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <label htmlFor="file-upload" style={{ cursor: 'pointer', padding: 10, backgroundColor: '#f0f0f0', borderRadius: 4 }}>
        选择文件上传
        <input
          id="file-upload"
          type="file"
          style={{ display: 'none' }}
        />
      </label>
    </Box>
  </Box>

  {/* 实体抽取区 */}
  <Box sx={{ maxWidth: 250, flex: 1 }}>
    <Typography variant="h6" gutterBottom>
      抽取出来的实体
    </Typography>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {extractedEntities.map(entity => (
        <Box key={entity} sx={{ p: 1, bgcolor: '#e3f2fd', borderRadius: 1 }}>
          {entity}
        </Box>
      ))}
    </Box>
  </Box>

  {/* 关系三元组区 */}
  <Box sx={{ maxWidth: 250, flex: 1 }}>
    <Typography variant="h6" gutterBottom>
      抽取出来的实体关系三元组
    </Typography>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, bgcolor: '#f5f5f5', p: 1, borderRadius: 1 }}>
        <Typography fontWeight="bold">实体1</Typography>
        <Typography fontWeight="bold">关系</Typography>
        <Typography fontWeight="bold">实体2</Typography>
      </Box>
      {entityRelations.map((relation, index) => (
        <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, p: 1, borderRadius: 1 }}>
        </Box>
      ))}
    </Box>
  </Box>
</Box>

      {/* 指标计算区 */}
      <Box sx={{ width: '100%', maxWidth: 800, p: 3, bgcolor: 'white', borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>指标区</Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
          {metrics.map(metric => (
            <Box key={metric.id} sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ mr: 1 }}>指标 {metrics.indexOf(metric) + 1}:</Box>
              <input
                type="number"
                value={metric.value}
                onChange={(e) => handleMetricChange(e, metric.id)}
                placeholder="输入数值"
                style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd' }}
              />
              {metrics.length > 1 && (
                <Box sx={{ ml: 1, cursor: 'pointer', color: '#ea4335' }} onClick={() => deleteMetric(metric.id)}>
                  删除
                </Box>
              )}
            </Box>
          ))}
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography>最终指标计算公式:</Typography>
          <input
            type="text"
            value={finalFormula}
            onChange={(e) => setFinalFormula(e.target.value)}
            placeholder="输入计算公式，如:指标1 + 指标2 * 指标3"
            style={{ padding: 8, borderRadius: 4, border: '1px solid #ddd', flexGrow: 1, ml: 1 }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <button
            onClick={addMetric}
            style={{ padding: '8px 16px', backgroundColor: '#4285f4', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer', mr: 2 }}
          >
            添加指标
          </button>
          <button
            onClick={calculateMetrics}
            style={{ padding: '8px 16px', backgroundColor: '#4285f4', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            带入数值计算
          </button>
        </Box>
        
        {calculationResult && (
          <Box sx={{ mt: 2, p: 2, bgcolor: '#e8f0fe', borderRadius: 2 }}>
            {calculationResult}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Flow2B;