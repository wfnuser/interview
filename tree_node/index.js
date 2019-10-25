const tree = {
  id: "1",
  label: "first",
  children: [
    {
      id: "2",
      label: "second"
    },
    {
      id: "3",
      label: "third",
      children: [{ id: "4", label: "fourth" }, { id: "5", label: "fifth" }]
    }
  ]
};

const findNodeById = (root, id) => {
  if (root.id === id) {
    return root;
  } else if (root.children) {
    return root.children.reduce((res, cur) => {
      if (findNodeById(cur, id)) {
        return findNodeById(cur, id);
      } else return res;
    }, null);
  } else {
    return null;
  }
};

console.log(findNodeById(tree, "5"));
