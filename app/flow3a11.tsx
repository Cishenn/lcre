"use client";

import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useMemo, useState } from "react";

/* ---------- 1. 样例数据（静态） ---------- */
interface Entity {
  mention: string;
  name: string;
  id: string;
  intro: string;
}
interface Sample {
  id: number;
  text: string;
  entities: Entity[];
}
const samples: Sample[] = [
  {
    id: 1,
    text:
      "Kremlin spokesperson Dmitry Peskov stated that the Russian delegation would await Ukraine's in Istanbul but refrained from naming attendees.",
    entities: [
      {
        mention: "Kremlin",
        name: "Moscow Kremlin",
        id: "164713",
        intro:
          "The Moscow Kremlin is a fortified complex in the centre of Moscow, overlooking the Moskva River to the south.",
      },
      {
        mention: "Dmitry Peskov",
        name: "Dmitry Peskov",
        id: "1448144",
        intro:
          "Dmitry Sergeyevich Peskov (born 17 October 1967) is a Russian diplomat and presidential spokesperson.",
      },
      {
        mention: "Russian",
        name: "Russia",
        id: "12594",
        intro:
          "Russia, or the Russian Federation, is a trans-continental country in Eastern Europe and Northern Asia.",
      },
      {
        mention: "Ukraine",
        name: "Ukraine",
        id: "15756",
        intro:
          "Ukraine is a country in Eastern Europe. Excluding Crimea, Ukraine has a population of about 42.5 million.",
      },
      {
        mention: "Istanbul",
        name: "Istanbul",
        id: "778259",
        intro:
          "Istanbul, formerly Byzantium and Constantinople, is Turkey's economic, cultural and historic centre.",
      },
    ],
  },
  {
    id: 2,
    text:
      "Ukraine's Defense Intelligence (GUR) has analyzed a newly deployed Russian cruise missile, the S8000 'Banderol'.",
    entities: [
      {
        mention: "Ukraine",
        name: "Ukraine",
        id: "15756",
        intro:
          "Ukraine is a country in Eastern Europe. Excluding Crimea, Ukraine has a population of about 42.5 million.",
      },
      {
        mention: "Defense Intelligence",
        name: "Defense Intelligence Agency",
        id: "48083",
        intro:
          "The Defense Intelligence Agency (DIA) is an external intelligence service of the United States federal government.",
      },
      {
        mention: "GUR",
        name: "Foreign Intelligence Service of Ukraine",
        id: "417376",
        intro:
          "The Foreign Intelligence Service of Ukraine (SZR) carries out intelligence in political, economic and military spheres.",
      },
      {
        mention: "Russian",
        name: "Russia",
        id: "12594",
        intro:
          "Russia, or the Russian Federation, is a trans-continental country in Eastern Europe and Northern Asia.",
      },
    ],
  },
  {
    id: 3,
    text:
      "Units from Ukraine's 60th Mechanized Brigade deployed the drone in Kharkiv, targeting Russian bunkers and fortified positions.",
    entities: [
      {
        mention: "Ukraine",
        name: "Ukraine",
        id: "15756",
        intro:
          "Ukraine is a country in Eastern Europe. Excluding Crimea, Ukraine has a population of about 42.5 million.",
      },
      {
        mention: "Mechanized Brigade",
        name: "14th Mechanized Brigade (Ukraine)",
        id: "4992890",
        intro:
          "The 14th Mechanized Brigade is a formation of the Ukrainian Ground Forces, formed in 2014.",
      },
      {
        mention: "Kharkiv",
        name: "Kharkiv",
        id: "679733",
        intro:
          "Kharkiv is the second-largest city in Ukraine and the largest city of the Slobozhanshchyna region.",
      },
      {
        mention: "Russian",
        name: "Russia",
        id: "12594",
        intro:
          "Russia, or the Russian Federation, is a trans-continental country in Eastern Europe and Northern Asia.",
      },
    ],
  },
];

/* ---------- 2. 颜色调色板 ---------- */
const palette = [
  "#ffd54f",
  "#aed581",
  "#ffab91",
  "#90caf9",
  "#ce93d8",
  "#ffe082",
  "#80cbc4",
];

export default function Flow3A1() {
  const [selId, setSelId] = useState<number>(1);
  const current = useMemo(
    () => samples.find((s) => s.id === selId)!,
    [selId]
  );

  /* ---------- 3. 构造 mention→color 映射 ---------- */
  const colorMap = useMemo(() => {
    const map: Record<string, string> = {};
    current.entities.forEach(
      (e, i) => (map[e.mention.toLowerCase()] = palette[i % palette.length])
    );
    return map;
  }, [current]);
/** 把特殊正则字符转义 */
function escapeRegExp(str: string) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /* ---------- 4. 高亮文本渲染 ---------- */
    const renderSentence = (text: string) => {
        const spans: { start: number; end: number; mention: string }[] = [];
      
        current.entities.forEach((e) => {
          // ① 转义 ② 加 \b 单词边界 ③ 只用 'g'（大小写敏感）
          const pattern = `\\b${escapeRegExp(e.mention)}\\b`;
          const regex = new RegExp(pattern, "g");
      
          let match;
          while ((match = regex.exec(text)) !== null) {
            spans.push({
              start: match.index,
              end: match.index + match[0].length,
              mention: match[0],
            });
          }
        });

    const nodes: (string | JSX.Element)[] = [];
    let cursor = 0;
    spans.forEach((sp, idx) => {
      if (sp.start > cursor) nodes.push(text.slice(cursor, sp.start));
      nodes.push(
        <span
          key={idx}
          style={{
            backgroundColor: colorMap[sp.mention.toLowerCase()],
            fontWeight: 600,
            paddingInline: "2px",
            borderRadius: "4px",
          }}
        >
          {text.slice(sp.start, sp.end)}
        </span>
      );
      cursor = sp.end;
    });
    if (cursor < text.length) nodes.push(text.slice(cursor));
    return nodes;
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
      <Paper
        elevation={4}
        sx={{ maxWidth: 1150, width: "100%", p: 4, borderRadius: 3 }}
      >
        <Typography variant="h5" fontWeight={700} mb={3}>
          实体链接结果展示
        </Typography>

        <Grid container spacing={4}>
          {/* ------ 左侧：下拉 + 文本 ------ */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="sel-label">选择样例文本</InputLabel>
              <Select
                labelId="sel-label"
                value={selId}
                label="选择样例文本"
                onChange={(e) => setSelId(Number(e.target.value))}
              >
                {samples.map((s) => (
                  <MenuItem key={s.id} value={s.id}>
                    样例 {s.id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Paper
              variant="outlined"
              sx={{
                p: 2,
                minHeight: 220,
                bgcolor: "#ffffff",
                overflowY: "auto",
                fontSize: 18,
                lineHeight: 1.6,
              }}
            >
              {renderSentence(current.text)}
            </Paper>
          </Grid>

          {/* ------ 右侧：实体详情 ------ */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" fontWeight={700} mb={1}>
              链接结果详情
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>
            <strong>提及名称</strong><br />
            <strong>知识库中实体名称</strong>&nbsp;|&nbsp;ID<br />
            实体描述简介
            </Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 0,
                bgcolor: "#fafafa",
              }}
            >
              <List dense disablePadding>
                {current.entities.map((e, idx) => (
                  <ListItem key={idx} alignItems="flex-start">
                    <ListItemText
                      primary={
                        <span
                          style={{
                            backgroundColor:
                              palette[idx % palette.length] + "55",
                            padding: "2px 4px",
                            borderRadius: 4,
                          }}
                        >
                          {e.mention}
                        </span>
                      }
                      secondary={
                        <>
                          <Typography component="span" fontWeight={700}>
                            {e.name}
                          </Typography>
                          &nbsp;|&nbsp;ID {e.id}
                          <br />
                          {e.intro}
                        </>
                      }
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
