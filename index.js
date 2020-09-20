const nodeList = [];

const getContentNodes = (node) => {
  if (node.nodeType !== Node.TEXT_NODE) {
    const rect = node.getClientRects();
    nodeList.push({ id: '', node: node, ...rect });
    if (node && node.childNodes) {
      for (let i = 0; i < node.childNodes.length; i++) {
        getContentNodes(node.childNodes[i]);
      }
    }
  } else {
    nodeList.push({ node: node, text: node.nodeValue });
  }
};

/* Async/Await Syntax */
const startParsing = () => {
  try {
    getContentNodes(document.querySelector(".WordSection1"));
    console.log(nodeList);
  } catch (err) {
    console.log(err);
  }
};
