let index = 0;
const parse = string => {
  switch (string[index]) {
    case "i":
      nextInt(string);
      return {
        type: "int"
      };
    case "s":
      nextString(string);
      return {
        type: "string"
      };
    case "b":
      nextBool(string);
      return {
        type: "bool"
      };
    case "A":
      nextArrayL(string);
      const res = parse(string);
      nextR(string);
      return {
        type: "Array",
        typeArgs: [res]
      };
    case "M":
      nextMapL(string);
      const key = parse(string);
      nextComma(string);
      const value = parse(string);
      nextR(string);
      return {
        type: "Array",
        typeArgs: [key, value]
      };
    default:
      break;
  }
};

nextInt = string => {
  if (string.slice(index, index + 3) === "int") index += 3;
  else throw new Error("invalid input");
};

nextString = string => {
  if (string.slice(index, index + 6) === "string") index += 6;
  else throw new Error("invalid input");
};

nextBool = string => {
  if (string.slice(index, index + 4) === "bool") index += 4;
  else throw new Error("invalid input");
};

nextArrayL = string => {
  if (string.slice(index, index + 6) === "Array<") index += 6;
  else throw new Error("invalid input");
};

nextR = string => {
  if (string.slice(index, index + 1) === ">") index += 1;
  else throw new Error("invalid input");
};

nextMapL = string => {
  if (string.slice(index, index + 4) === "Map<") index += 4;
  else throw new Error("invalid input");
};

nextComma = string => {
  if (string.slice(index, index + 1) === ",") index += 1;
  else throw new Error("invalid input");
  while (string[index] === " ") index += 1;
};

const input = "Map<string, Map<string, bool>>";
const result = parse(input);
console.log(JSON.stringify(result));
