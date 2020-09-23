const nodeList = [];
const dpi = 220;

const pageStyles = {
  margins: {
    left: 220 * (3 / 4),
    right: 220 * (3 / 4),
    top: 220 * (3 / 4),
    bottom: 220 * (3 / 4),
  },
  highlights: {
    "rgb(255, 0, 0)": {
      justify: "left",
      fontFamily: "Albany AMT",
      fontSize: "8pt",
      letterCasing: "Title",
    },
    "rgb(255, 255, 0)": {
      justify: "center",
      fontFamily: "Albany AMT",
      fontSize: "12pt",
      fontWeight: "Bold",
      letterCasing: "Capital",
    },
    lightGray: {
      justify: "justify",
      fontFamily: "Albany AMT",
      fontSize: "10pt",
      fontWeight: "Bold",
      letterCasing: "Capital",
    },
    "rgb(0, 0, 255)": {
      fontWeight: "bold",
    },
    "rgb(0, 255, 0)": {
      justify: "justify",
      fontFamily: "Albany AMT",
      fontSize: "10pt",
      fontWeight: "Bold",
      letterCasing: "Title",
    },
    darkYellow: {
      justify: "justify",
      fontFamily: "Albany AMT",
      fontSize: "10pt",
      fontWeight: "Bold",
      letterCasing: "Capital",
    },
    pink: {
      marginRight: "10pt",
    },
    turquoise: {
      marginRight: "12pt",
    },
  },
};

const getContentNodes = (node, index, parentIndex) => {
  if (node.nodeType !== Node.TEXT_NODE) {
    const rect = node.getClientRects();
    const styles = getComputedStyle(node);
    nodeList.push({
      id: "",
      node: node,
      ...rect,
      index: index,
      styles: {
        fontFamily: styles.fontFamily,
        fontWeight: styles.fontWeight,
        fontSize: styles.fontSize,
        backgroundColor: styles.backgroundColor,
      },
      parentIndex: parentIndex,
    });
    if (node && node.childNodes) {
      for (let i = 0; i < node.childNodes.length; i++) {
        getContentNodes(node.childNodes[i], index + i + 1, index);
      }
    }
  } else {
    const style = nodeList[nodeList.length - 1].styles;
    const ele = {
      node: node,
      text: node.nodeValue,
      index: index,
      parentIndex: parentIndex,
      location: nodeList[nodeList.length - 1]["0"],
      styles: nodeList[nodeList.length - 1].styles,
      metaSyles: pageStyles.highlights[style.backgroundColor],
    };
    nodeList.push(ele);
  }
};

/* Async/Await Syntax */
const startParsing = () => {
  try {
    getContentNodes(document.querySelector(".WordSection1"), 0, 0);
    console.log(
      nodeList
        .filter((x) => x.location)
        .map((x) => {
          return {
            text: x.text,
            location: x.location,
            styles: x.styles,
            metaSyles: x.metaSyles,
          };
        })
    );
  } catch (err) {
    console.log(err);
  }
};
