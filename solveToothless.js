let funcList = [
  {
    func: "acsc",
    funcParse: ["Math.asin(1/", "v1", ")","toRad"],
    inputs: 1,
    funcRadDeg: true,
    funcLength: 4,
  },
  {
    func: "asec",
    funcParse: ["Math.acos(1/", "v1", ")", "toRad"],
    inputs: 1,
    funcRadDeg: true,
    funcLength: 4,
  },
  {
    func: "acot",
    funcParse: ["Math.atan(1/", "v1", ")", "toRad"],
    inputs: 1,
    funcRadDeg: true,
    funcLength: 4,
  },
  {
    func: "asin",
    funcParse: ["Math.asin(", "v1", ")", "toRad"],
    inputs: 1,
    funcRadDeg: true,
    funcLength: 4,
  },
  {
    func: "acos",
    funcParse: ["Math.acos(", "v1", ")", "toRad"],
    inputs: 1,
    funcRadDeg: true,
    funcLength: 4,
  },
  {
    func: "atan",
    funcParse: ["Math.atan(", "v1", ")", "toRad"],
    inputs: 1,
    funcRadDeg: true,
    funcLength: 4,
  },
  {
    func: "sin",
    funcParse: ["Math.sin(", "v1", ")", "toDeg"],
    inputs: 1,
    funcRadDeg: true,
    funcLength: 3,
  },
  {
    func: "cos",
    funcParse: ["Math.cos(", "v1", ")", "toDeg"],
    inputs: 1,
    funcRadDeg: true,
    funcLength: 3,
  },
  {
    func: "tan",
    funcParse: ["Math.tan(", "v1", ")", "toDeg"],
    inputs: 1,
    funcRadDeg: true,
    funcLength: 3,
  },
  {
    func: "csc",
    funcParse: ["Math.asin(1/", "v1", ")", "toDeg"],
    inputs: 1,
    funcRadDeg: true,
    funcLength: 3,
  },
  {
    func: "sec",
    funcParse: ["Math.acos(1/", "v1", ")", "toDeg"],
    inputs: 1,
    funcRadDeg: true,
    funcLength: 3,
  },
  {
    func: "cot",
    funcParse: ["Math.atan(1/", "v1", ")", "toDeg"],
    inputs: 1,
    funcRadDeg: true,
    funcLength: 3,
  },
  {
    func: "ln",
    funcParse: ["Math.log(", "v1", ")"],
    inputs: 1,
    funcRadDeg: false,
    funcLength: 2,
  },
  {
    func: "log",
    funcParse: ["Math.log10(", "v1", ")"],
    inputs: 1,
    funcRadDeg: false,
    funcLength: 3,
  },
  {
    func: "mod",
    funcParse: ["v1 % v2"],
    inputs: 2,
    funcRadDeg: false,
    funcLength: 3,
  },
];
console.log(solveInpr("1+sin(2)+9"));
//create an array full of object that contain name, equation, parse the equation, needs rad of deg, length, or  etc.
function solveInpr(equation, returnTarget) {
  console.log('Inpr ran');
  let subEquation = equation;
  for (let i = 0; i < equation.length; i++) {
    console.log("Ran :" + i);
    if (funcMatch(subEquation.substring(i)) != "") {
      let func = getByName(funcMatch(subEquation));
      console.log("func is ");
      console.log(func);
      let innerRAW = parEncap(
        subEquation.substring(func.funcLength)
      );
      console.log("innerRaw is ");
      console.log(innerRAW);
      let values = recrSolve(innerRAW.substring(1, innerRAW.length - 1),func);
      console.log("Values are ");
      console.log(values);
      let funcTemp = findMethod(func);
      console.log("funcTemp is ");
      console.log(funcTemp);
      /*subEquation =
        subEquation.substring(0, subEquation.indexOf(func)) +
        subEquation.substring(
          subEquation.indexOf(func) + func.length + innerRAW.length
        );*/
      let parsedFunc = assembly(func, funcTemp, values);
      console.log("Parsed is ");
      console.log(parsedFunc);
      equation = equation.substring(0, i)+parsedFunc+equation.substring(i+func.funcLength+innerRAW.length);
      subEquation = equation.substring(i+func.funcLength+innerRAW.length);
    }
  }
  return equation;
}
function getByName(name) {
  for (let func in funcList) {
    if (func.name == name) {
      return func;
    }
  }
}
function funcMatch(equation) {
  for (let func in funcList) {
    let check = equation.substring(0, func.funcLength + 1);
    if (check == func.name) {
      return func.name;
    }
  }
  return "";
}
function findMethod(func) {
  let degRad = true;
  if (func.funcRadDeg) {
    if(degRad){
      if(func.funcParse.includes("toDeg")){
        return func.funcParse.splice(func.funcParse.indexOf("toDeg"), 1, "*(Math.PI/180)");
      }else{
        return func.funcParse.splice(func.funcParse.indexOf("toRad"), 1, "*(180/Math.PI)");
      }
    }else {
      return func.funcParse;
    }
  }else{
    return func.funcParse;
  }
}
function assembly(func, parsedFunc, values) {
  inputs = func.inputs;
  for (let i = 1; i <= inputs; i++) {
    parsedFunc = parsedFunc.replace("v" + i, values[i - 1]);
  }
  return parsedFunc;
  /*let returnString = "";
  for (let x of array) {
    if (x == "v") {
      returnString += inner;
    } else {
      returnString += x;
    }
  }
  return returnString;*/
}
function recrSolve(equation,func) {
  let inputs = func.inputs;
  if(inputs == 1){
    return [equation];
  }else {
    let values = [];
    for(let i = 1; i <= inputs; i++){
      if(i != inputs){
        values.push(equation.substring(0, equation.indexOf(",")));
        equation = equation.substring(equation.indexOf(",") + 1);
      }else {
        values.push(equation.substring(0, equation.indexOf(")")));
      }
    }
      return values
  }
}
function parComplete(input) {
  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i) == "(") {
      if (
        i + parEncap(input.substring(i)).length >= input.length &&
        input.charAt(input.length - 1) != ")"
      ) {
        console.log("par coimplete complete par");
        input += ")";
      }
    }
  }
  return input;
}
function parEncap(sub) {
  for (let i = 1; i < sub.length; i++) {
    if (sub.charAt(i) == "(") {
      i = i + parEncap(sub.substring(i)).length;
    } else if (sub.charAt(i) == ")") {
      sub = sub.substring(0, i + 1);
      break;
    } else if (i == sub.length - 1) {
      sub = sub + ")";
      break;
    }
  }
  return sub;
}
function funcIndex(func, equation, funcList) {
  let has = false;
  var hasVal = -1;
  for (let i = funcList.length - 1; i >= 0; i--) {
    if (funcList[i].func == func) {
      has = true;
      console.log(funcList[i].index);
      if (hasVal < funcList[i].index) {
        hasVal = funcList[i].index + funcList[i].func.length;
      }
    }
  }
  console.log("Has is " + has + " hasVal index is " + hasVal);
  if (has) {
    return hasVal + equation.substring(hasVal).indexOf(func);
  } else {
    return equation.indexOf(func);
  }
}
