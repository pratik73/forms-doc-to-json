const nodeList = [];

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
      },
      parentIndex: parentIndex,
    });
    if (node && node.childNodes) {
      for (let i = 0; i < node.childNodes.length; i++) {
        getContentNodes(node.childNodes[i], index + i + 1, index);
      }
    }
  } else {
    const ele = {
      node: node,
      text: node.nodeValue,
      index: index,
      parentIndex: parentIndex,
      location: nodeList[nodeList.length - 1]["0"],
      styles: nodeList[nodeList.length - 1].styles,
    };
    console.log(ele, nodeList[nodeList.length - 1]["0"]);
    nodeList.push(ele);
  }
};

/* Async/Await Syntax */
const startParsing = () => {
  try {
    getContentNodes(document.querySelector(".WordSection1"), 0, 0);
    console.log(nodeList.filter((x) => x.location));
  } catch (err) {
    console.log(err);
  }
};
