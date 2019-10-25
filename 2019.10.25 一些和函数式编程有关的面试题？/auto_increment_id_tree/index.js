const tree = {
  id: "1",
  type: "View",
  name: "view",
  children: [
    { id: "2", type: "Button", name: "button" },
    {
      id: "3",
      type: "View",
      name: "view_1",
      children: [
        { id: "4", type: "Button", name: "button_1" },
        { id: "5", type: "View", name: "view_3" }
      ]
    }
  ]
};

Array.prototype.flatMap = function(lambda) {
  return Array.prototype.concat.apply([], this.map(lambda));
};

const check_conflict = (name, srcName) =>
  name === srcName ||
  name
    .split("_")
    .slice(0, -1)
    .join("_") === srcName;

// 返回名字冲突的节点的后缀，如果名字完全相同，返回空串，否则返回'_n'
const get_conflict_node_names_suffix = (tree, srcName) => {
  const children_names =
    (tree.children &&
      tree.children.flatMap(child =>
        get_conflict_node_names_suffix(child, srcName)
      )) ||
    [];
  if (check_conflict(tree.name, srcName))
    return children_names.concat([tree.name.replace(srcName, "")]);
  return children_names;
};

const getIncName = (srcName, tree) => {
  const conflict_names = get_conflict_node_names_suffix(tree, srcName);
  // 如果没有空串，说明srcName重名节点已经被删，直接用原名即可
  if (!conflict_names.includes("")) return srcName;
  // 否则则需要对重名的序号进行排序，找到最小的空隙
  else {
    const sortedNameSuffix = conflict_names
      .filter(each => each)
      .map(each => Number(each.replace("_", "")))
      .sort((a, b) => (a > b ? 1 : -1));
    // 遍历一遍，找到间断的点，为空的情况则返回初始值1，全部连续的情况则自然增长
    const targetSuffix = sortedNameSuffix.reduce((res, cur) => {
      if (res !== cur) return res;
      else res += 1;
      return res;
    }, 1);
    return `${srcName}_${targetSuffix}`;
  }
};
