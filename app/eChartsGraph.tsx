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
                data: ["2018-09", "2018-10"]
            },

            animationDurationUpdate: 1500,
            animationEasingUpdate: 'quinticInOut',
            graphic: [
                        {
                            type: 'group',
                            left: 'center',
                            top: 20,
                            children: [
                                {
                                    type: 'text',
                                    style: {
                                        text: 'Solid',
                                        fontSize: 12,
                                        fill: '#333'
                                    },
                                    position: [205, 0]
                                },
                                {
                                    type: 'line',
                                    shape: {
                                        x1: 130,
                                        y1: 10,
                                        x2: 170,
                                        y2: 10
                                    },
                                    style: {
                                        stroke: '#404040',
                                        lineWidth: 1,
                                        lineDash: [0, 0] // 实线
                                    },
                                    position: [30, 0]
                                },
                                {
                                    type: 'text',
                                    style: {
                                        text: 'Dashed',
                                        fontSize: 12,
                                        fill: '#333'
                                    },
                                    position: [300, 0]
                                },
                                {
                                    type: 'line',
                                    shape: {
                                        x1: 200,
                                        y1: 10,
                                        x2: 240,
                                        y2: 10
                                    },
                                    style: {
                                        stroke: '#404040',
                                        lineWidth: 1,
                                        lineDash: [5, 5] // 虚线
                                    },
                                    position: [55, 0]
                                }
                            ]
                        }
                    ],
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
                        formatter: function (params) {
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
                            name: '2018-09',
                            itemStyle: {
                                normal: {
                                    color: '#6ba93e' // 类别 0 的颜色

                                }
                            }
                        },
                        {
                            name: '2018-10',
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

      chart.setOption(option);
    }
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%', height: '600px' }} />;
};

export default EChartsGraph;