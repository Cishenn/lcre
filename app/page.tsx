"use client"; // Add this line

import Image from "next/image";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import SendIcon from "@mui/icons-material/Send";
import { use, useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { Graph, treeToGraphData } from "@antv/g6";

export default function Home() {
  const [inputConcept, setInputConcept] = useState(
    "The Army is the parent branch of the military, with the Navy serving as one of its main divisions. Within the Navy, there are several specialized groups, including those who operate Surface Ships and those who serve in the Marines, a force designed to provide power projection from the sea utilizing the mobility of the naval fleet. Additionally, the Navy is also home to Submarine Soldiers, trained to carry out missions beneath the waves. Meanwhile, the Army itself has a number of elite groups, including Special Forces, highly trained operatives capable of conducting a variety of missions, often behind enemy lines."
  );
  const [outputConcept, setOutputConcept] = useState("");

  const [inputRE, setInputRE] = useState(
    `"Wilfried \" Willi \" Schneider ( born 13 March 1963 in Mediaș , Transylvania ) is a German skeleton racer who competed from 1992 to 2002 . He won two medals in the men 's skeleton event at the FIBT World Championships with a gold in 1998 and a bronze in 1999 . Schneider also finish ninth in the men 's skeleton event at the 2002 Winter Olympics in Salt Lake City . He won the men 's overall Skeleton World Cup title in 1997 - 8 . After retiring from competition Schneider became a coach , leading the Canadian skeleton team to three medals at the 2006 Winter Olympics in Turin ( a gold for Duff Gibson , a silver for Jeff Pain and a bronze for Melissa Hollingsworth ) , and coaching Jon Montgomery to victory in the 2010 Winter Olympics in Vancouver , British Columbia , Canada . In July 2012 Schneider agreed a two - year contract to coach the Russian skeleton team ."`
  );
  const [outputRE, setOutputRE] = useState("");

  const [inputKnowledge, setInputKnowledge] = useState(
    "Russia prepares to resume major missile strikes on Ukraine’s energy infrastructure after the winter heating season starts, the Secretary of the National Security and Defense Council of Ukraine said.Russian forces have advanced in the city of Toretsk in Donetsk region.Ukrainian military said the Russian forces used seven S-300/400 missiles to strike the region."
  );
  const [outputKnowledge, setOutputKnowledge] = useState("");

  const [inputConflict, setInputConflict] = useState(
    "(UNIFIL, will continue to stay, southern Lebanon)和(UNIFIL, will withdraw, southern Lebanon)"
  );
  const [outputConflict, setOutputConflict] = useState("");
  const clickConcept = () => {
    // 请求：
    setOutputConcept(
      "Army, navy\nArmy, navy, surface ships\nArmy, navy, marines\nArmy, navy, submarine soldiers\nArmy, special forces"
    );
  };
  const clickRE = () => {
    // 请求：
    setOutputRE(`
      [["2002 Winter Olympics", "P580", "2002"], ["2002 Winter Olympics", "P582", "2002"], ["2002 Winter Olympics", "P276", "Salt Lake City"], ["2006 Winter Olympics", "P276", "Turin"], ["Duff Gibson", "P1344", "2006 Winter Olympics"], ["Duff Gibson", "P27", "Canadian"], ["Jeff Pain", "P1344", "2006 Winter Olympics"], ["Jeff Pain", "P27", "Canadian"], ["Melissa Hollingsworth", "P1344", "2006 Winter Olympics"], ["Melissa Hollingsworth", "P27", "Canadian"], ["Jon Montgomery", "P27", "Canadian"], ["Vancouver", "P17", "Canada"], ["British Columbia", "P17", "Canada"], ["British Columbia", "P131", "Canada"], ["Canada", "P150", "British Columbia"], ["Wilfried \" Willi \" Schneider", "P569", "13 March 1963"], ["Wilfried \" Willi \" Schneider", "P1344", "2002 Winter Olympics"], ["Wilfried \" Willi \" Schneider", "P19", "Mediaș"], ["Wilfried \" Willi \" Schneider", "P27", "German"], ["Canadian", "P150", "British Columbia"], ["Mediaș", "P131", "Transylvania"], ["Melissa Hollingsworth", "P27", "Canada"], ["Jon Montgomery", "P27", "Canada"], ["British Columbia", "P131", "Canadian"], ["Vancouver", "P17", "Canadian"]] 
      `);
  };
  const clickKnowledge = () => {
    // 请求：
    setOutputKnowledge(`
      fast (biencoder) predictions:

russia
id:12594
title:Russia
text: Russia (), or the Russian Federation (), is a transcontinental country in Eastern Europe and North Asia. At , Russia is by a considerable margin the largest country in the world by area, covering more than one-eighth of the Earth's inhabited land area, an

ukraine
id:15756
title:Ukraine
text: Ukraine (; ), sometimes called the Ukraine, is a country in Eastern Europe. Excluding Crimea, Ukraine has a population of about 42.5 million, making it the 32nd most populous country in the world. Its capital and largest city is Kiev. Ukrainian is the off

national security and defense council of ukraine
id:2172665
title:National Security and Defense Council of Ukraine
text: The National Security and Defense Council of Ukraine () or NSDC (), is an advisory state body to the President of Ukraine.  It is a state agency tasked with developing a policy of national security on domestic and international matters in advising the Pre

said.russian
id:1354005
title:Declaration of State Sovereignty of Ukraine
text: The Declaration of State Sovereignty of Ukraine () was adopted on July 16, 1990 by the recently elected parliament of Ukrainian SSR by a vote of 355 for and four against.  The document decreed that Ukrainian SSR laws took precedence over the laws of the U

toretsk
id:1220295
title:Toretsk
text: Toretsk (; ), formerly Dzerzhynsk (; ), is a city of oblast significance in Donetsk Oblast (province) of Ukraine. Population: . 

donetsk
id:220576
title:Donetsk
text: Donetsk ( ; ; former names: Aleksandrovka, Hughesovka, Yuzovka, Stalino (see also: )) is an industrial city in Eastern Ukraine and the capital city of the unrecognized Donetsk People's Republic, located on the Kalmius River. The population was estimated a

region.ukrainian
id:15756
title:Ukraine
text: Ukraine (; ), sometimes called the Ukraine, is a country in Eastern Europe. Excluding Crimea, Ukraine has a population of about 42.5 million, making it the 32nd most populous country in the world. Its capital and largest city is Kiev. Ukrainian is the off

russian
id:12594
title:Russia
text: Russia (), or the Russian Federation (), is a transcontinental country in Eastern Europe and North Asia. At , Russia is by a considerable margin the largest country in the world by area, covering more than one-eighth of the Earth's inhabited land area, an

s-300
id:216202
title:S-300 missile system
text: The S-300 (NATO reporting name SA-10 Grumble) is a series of initially Soviet and later Russian long range surface-to-air missile systems produced by NPO Almaz, based on the initial S-300P version. The S-300 system was developed to defend against aircraft
      `);
  };
  const clickConflict = () => {
    // 请求：
    setOutputConflict(
      "该冲突为关系冲突，保留(UNIFIL, will continue to stay, southern Lebanon)三元组"
    );
  };

  const convertToTree = (input) => {
    // 解析输入，按行分割并将每行的节点解析成数组
    const lines = input
      .split("\n")
      .map((line) => line.split(",").map((node) => node.trim()));

    // 构建根节点
    const root = {};

    // 构建树的递归函数
    const addNode = (path, tree) => {
      const [current, ...rest] = path;
      if (!tree[current]) {
        tree[current] = { id: current, children: {} };
      }
      if (rest.length > 0) {
        addNode(rest, tree[current].children);
      }
    };

    // 遍历每行数据构建树
    lines.forEach((path) => addNode(path, root));

    // 将树从对象形式转换为数组形式
    const convertToArray = (node) => {
      const result = { id: node.id };
      if (Object.keys(node.children).length > 0) {
        result.children = Object.values(node.children).map(convertToArray);
      }
      return result;
    };

    // 返回最终的树结构
    return convertToArray(Object.values(root)[0]);
  };

  /**
   * If the node is a leaf node
   * @param {*} d - node data
   * @returns {boolean} - whether the node is a leaf node
   */
  function isLeafNode(d) {
    return !d.children || d.children.length === 0;
  }

  useEffect(() => {
    // fetch(
    //   "https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json"
    // )
    //   .then((res) => res.json())
    new Promise((resolve) => {
      resolve(
        //         JSON.parse(`
        // {
        //   "id": "Modeling Methods",
        //   "children": [
        //     {
        //       "id": "Classification",
        //       "children": [
        //         { "id": "Logistic regression" },
        //         { "id": "Linear discriminant analysis" },
        //         { "id": "Rules" },
        //         { "id": "Decision trees" },
        //         { "id": "Naive Bayes" },
        //         { "id": "K nearest neighbor" },
        //         { "id": "Probabilistic neural network" },
        //         { "id": "Support vector machine" }
        //       ]
        //     },
        //     {
        //       "id": "Consensus",
        //       "children": [
        //         {
        //           "id": "Models diversity",
        //           "children": [
        //             { "id": "Different initializations" },
        //             { "id": "Different parameter choices" },
        //             { "id": "Different architectures" },
        //             { "id": "Different modeling methods" },
        //             { "id": "Different training sets" },
        //             { "id": "Different feature sets" }
        //           ]
        //         },
        //         {
        //           "id": "Methods",
        //           "children": [
        //             { "id": "Classifier selection" },
        //             { "id": "Classifier fusion" }
        //           ]
        //         },
        //         {
        //           "id": "Common",
        //           "children": [
        //             { "id": "Bagging" },
        //             { "id": "Boosting" },
        //             { "id": "AdaBoost" }
        //           ]
        //         }
        //       ]
        //     },
        //     {
        //       "id": "Regression",
        //       "children": [
        //         { "id": "Multiple linear regression" },
        //         { "id": "Partial least squares" },
        //         { "id": "Multi-layer feedforward neural network" },
        //         { "id": "General regression neural network" },
        //         { "id": "Support vector regression" }
        //       ]
        //     }
        //   ]
        // }`)
        JSON.parse(JSON.stringify(convertToTree(outputConcept), null, 2))
      );
    }).then((data) => {
      // FIXME: Hack
      window.document.querySelector("#container").innerHTML = "";
      const graph = new Graph({
        container: "container",
        autoFit: "view",
        data: treeToGraphData(data),
        behaviors: [
          "drag-canvas",
          "zoom-canvas",
          "drag-element",
          "collapse-expand",
        ],
        node: {
          style: {
            labelText: (d) => d.id,
            labelPlacement: (d) => (isLeafNode(d) ? "right" : "left"),
            labelBackground: true,
            ports: [{ placement: "right" }, { placement: "left" }],
          },
          animation: {
            enter: false,
          },
        },
        edge: {
          type: "cubic-horizontal",
          animation: {
            enter: false,
          },
        },
        layout: {
          type: "compact-box",
          direction: "LR",
          getHeight: function getHeight() {
            return 32;
          },
          getWidth: function getWidth() {
            return 32;
          },
          getVGap: function getVGap() {
            return 10;
          },
          getHGap: function getHGap() {
            return 100;
          },
        },
      });

      graph.render();
    });
    // fetch('https://assets.antv.antgroup.com/g6/graph.json')
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const graph = new Graph({
    //       container: 'container',
    //       autoFit: 'view',
    //       data,
    //       node: {
    //         style: {
    //           size: 10,
    //         },
    //         palette: {
    //           field: 'group',
    //           color: 'tableau',
    //         },
    //       },
    //       layout: {
    //         type: 'd3-force',
    //         manyBody: {},
    //         x: {},
    //         y: {},
    //       },
    //       behaviors: ['drag-canvas', 'zoom-canvas', 'drag-element'],
    //     });

    //     graph.render();
    //   });
  }, [outputConcept]);
  return (
    <div className="flex flex-col justify-center">
      <main className="flex flex-col justify-center mt-5">
        <div className="flex flex-row justify-center pr-10 pl-10">
          <TextField
            fullWidth
            id="filled-multiline-static"
            label="输入"
            value={inputConcept}
            onChange={(event) => setInputConcept(event.target.value)}
            multiline
            rows={8}
            variant="filled"
          />
          <div className="mr-5 ml-5 mt-20 w-1/6">
            <Button
              color="error"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={clickConcept}
            >
              概念抽取
            </Button>
          </div>
          <TextField
            fullWidth
            id="filled-multiline-static"
            label="输出"
            multiline
            disabled
            rows={8}
            value={outputConcept}
            variant="filled"
          />
        </div>
        <div className="mt-2 mb-2">
          <Divider />
        </div>

        <div className="flex flex-row justify-center pr-10 pl-10">
          <TextField
            fullWidth
            id="filled-multiline-static"
            label="输入"
            value={inputRE}
            onChange={(event) => setInputRE(event.target.value)}
            multiline
            rows={8}
            variant="filled"
          />
          <div className="mr-5 ml-5 mt-20 w-1/6">
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              onClick={clickRE}
            >
              关系抽取
            </Button>
          </div>
          <TextField
            fullWidth
            id="filled-multiline-static"
            label="输出"
            multiline
            disabled
            rows={8}
            value={outputRE}
            variant="filled"
          />
        </div>
        <div className="mt-2 mb-2">
          <Divider />
        </div>

        <div className="flex flex-row justify-center pr-10 pl-10">
          <TextField
            fullWidth
            id="filled-multiline-static"
            label="输入"
            multiline
            value={inputKnowledge}
            onChange={(event) => setInputKnowledge(event.target.value)}
            rows={8}
            variant="filled"
          />
          <div className="mr-5 ml-5 mt-20 w-1/6">
            <Button
              color="warning"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={clickKnowledge}
            >
              知识消歧
            </Button>
          </div>
          <TextField
            fullWidth
            id="filled-multiline-static"
            label="输出"
            multiline
            disabled
            rows={8}
            value={outputKnowledge}
            variant="filled"
          />
        </div>
        <div className="mt-2 mb-2 ">
          <Divider />
        </div>

        <div className="flex flex-row justify-center pr-10 pl-10">
          <TextField
            fullWidth
            id="filled-multiline-static"
            label="输入"
            multiline
            value={inputConflict}
            onChange={(event) => setInputConflict(event.target.value)}
            rows={8}
            variant="filled"
          />
          <div className="mr-5 ml-5 mt-20 w-1/6">
            <Button
              color="success"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={clickConflict}
            >
              冲突消解
            </Button>
          </div>
          <TextField
            fullWidth
            id="filled-multiline-static"
            label="输出"
            multiline
            disabled
            rows={8}
            value={outputConflict}
            variant="filled"
          />
        </div>
      </main>
      {/* style={{ border: "2px solid grey" }} */}
      <div id="container"></div>

      <footer className="mt-20 row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/SEU.svg"
            alt="SEU icon"
            width={16}
            height={16}
          />
          SEU
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          173
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          WDS →
        </a>
      </footer>
    </div>
  );
}
