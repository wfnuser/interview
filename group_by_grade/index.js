// 成绩等级分为A、B和C三级
function getGrade(score) {
  return score < 60 ? "C" : score < 80 ? "B" : "A";
}

// 学⽣及其成绩
const students = [
  { name: "张三", score: 84 },
  { name: "李四", score: 58 },
  { name: "王五", score: 99 },
  { name: "赵六", score: 69 }
];

const groupBy = students =>
  students.reduce((res, cur) => {
    const grade = getGrade(cur.score);
    if (!res[grade]) res[grade] = [];
    res[grade].push(cur);
    return res;
  }, {});

