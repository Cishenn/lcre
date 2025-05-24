/*
 * @Author: Cishenn Lee
 * @Date: 2025-05-20 21:13:47
 * @LastEditTime: 2025-05-20 21:51:41
 * @FilePath: \lcre\app\eChartsGraph.tsx
 * @Description: 
 */
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface EChartsGraphProps {
  data: {
    nodes: Array<{ name: string; symbolSize: number; itemStyle: { normal: { color: string } } }>;
    links: Array<{ source: string; target: string; value: number }>;
  };
}

const EChartsGraph: React.FC<EChartsGraphProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option = {
            legend: {
                left: 'center',
                show: true,
                data: ["2025-02", "2025-03"]
            },

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
                        repulsion: 250,
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
                            name: '2025-02',
                            itemStyle: {
                                normal: {
                                    color: '#6ba93e' // 类别 0 的颜色

                                }
                            }
                        },
                        {
                            name: '2025-03',
                            itemStyle: {
                                normal: {
                                    color: '#70a0b9' // 类别 1 的颜色

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

  return <div ref={chartRef} style={{ width: '100%', height: '600px' }} />;
};

export default EChartsGraph;