/*
 * @Description: 专用于 b. 图谱展示 页的 EChartsGraph 组件，互不影响其它页面
 */

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface EChartsGraphProps {
  data: {
    nodes: Array<{ name: string; symbolSize: number; itemStyle: { normal: { color: string } } }>;
    links: Array<{ source: string; target: string; value: string; lineStyle?: { type: string; width: number } }>;
  };
}

const EChartsGraph: React.FC<EChartsGraphProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option = {
            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            series: [
                {
                    type: 'graph',
                    layout: 'force',
                    symbolSize: 35,
                    edgeSymbol: ['circle', 'arrow'],
                    edgeSymbolSize: [4, 4],
                    edgeLabel: {
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 10,
                                color: '#000000'
                            },
                            formatter: "{c}"
                        }
                    },

                    focusNodeAdjacency: true,
                    draggable: true,
                    roam: true,
                    force: {
                        repulsion: 450,
                        edgeLength: 150
                    },
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: '#000000',
                                fontSize: 12
                            },
                        }
                    },

                    tooltip: {
                        // @ts-ignore: 跳过下一行类型检查
                        formatter: function (params: any) {
                            if (params.dataType === 'edge') {
                                // 如果是边，返回边的 name 和 timestamp
                                return `${params.data.name}: ${params.data.timestamp}`;
                            } else if (params.dataType === 'node') {
                                // 如果是节点，返回节点的 name
                                return params.data.name;
                            }
                        }
                    },
                    lineStyle: {
                        normal: {
                            opacity: 0.9,
                            width: 1,
                            curveness: 0.3
                        }
                    },
                    categories: [
                        {
                            name: '概念',
                            itemStyle: {
                                normal: {
                                    color: '#70a0b9' // 类别 0 的颜色
                                }
                            }
                        },
                        {
                            name: '属性',
                            itemStyle: {
                                normal: {
                                    color: '#6ba93e' // 类别 1 的颜色
                                }
                            }
                        }
                    ],

                    nodes: data.nodes,
                    links: data.links,
                }
            ]
        };
// @ts-ignore: 跳过下一行类型检查
      chart.setOption(option);
    }
  }, [data]);

  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      {/* 左上角图例说明区 */}
      <div style={{ position: 'absolute', left: 16, top: 16, zIndex: 10, background: 'rgba(255,255,255,0.92)', borderRadius: 8, boxShadow: '0 2px 8px #eee', padding: '10px 18px 10px 12px', display: 'flex', alignItems: 'center', gap: 18, fontSize: 14 }}>
        {/* 概念色块 */}
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 18, height: 12, background: '#1976d2', borderRadius: 3, display: 'inline-block', marginRight: 4 }} />
          概念
        </span>
        {/* 属性色块 */}
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ width: 18, height: 12, background: '#43a047', borderRadius: 3, display: 'inline-block', marginRight: 4 }} />
          属性
        </span>
        {/* 实线/虚线说明 */}
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg width="24" height="8" style={{ marginRight: 2 }}>
            <line x1="0" y1="4" x2="24" y2="4" stroke="#404040" strokeWidth="2" />
          </svg>
          上位词
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg width="24" height="8" style={{ marginRight: 2 }}>
            <line x1="0" y1="4" x2="24" y2="4" stroke="#404040" strokeWidth="2" strokeDasharray="6,4" />
          </svg>
          属性
        </span>
      </div>
      {/* 图谱主体 */}
      <div ref={chartRef} style={{ width: '100%', height: '600px' }} />
    </div>
  );
};

export default EChartsGraph;
