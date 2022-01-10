solveInpr("1+sin(2)+9");
function solveInpr(equation, returnTarget){
    var foundTrig = [];
    let funcList = [
        "acsc",
        "asec",
        "acot",
        "asin",
        "acos",
        "atan",
        "sin",
        "cos",
        "tan",
        "csc",
        "sec",
        "cot",
        "ln",
        "log",
        "mod",
        "d→f"
      ];
      let subEquation = equation;
      let loopNum = 0;
      for (let i = 0; i < equation.length; i++) {
        if () {
          if (subEquation.indexOf(func) > -1) {
            let innerRAW = parEncap(subEquation.substring(subEquation.indexOf(func) + func.length));
            let inner = recrSolve(innerRAW.substring(1, innerRAW.length - 1));
            let funcTemp = findMethod(func);
            subEquation = subEquation.substring(0, subEquation.indexOf(func))+subEquation.substring(subEquation.indexOf(func) + func.length+innerRAW.length);
            let parsedFunc = assembly(funcTemp, inner);
            equation = equation.replace(func + innerRAW, parsedFunc);
            console.log("%c"+equation, "color: green");
          }
        }
      }
      foundTrig.sort(function (a, b) {
        let returnVal = -1;
        if (a.index > b.index) {
          returnVal = 1;
        }
        return returnVal;
      });
}
function findMethod(func){
  let funcTemp = [];
  let degRad = true;
  switch (func) {
    case "sin":
      if (degRad) {
        funcTemp = ["Math.sin(", "v", "*(Math.PI/180))"];
      } else {
        funcTemp = ["Math.sin(", "v", ")"];
      }
      break;
    case "cos":
      if (degRad) {
        funcTemp = ["Math.cos(", "v", "*(Math.PI/180))"];
      } else {
        funcTemp = ["Math.cos(", "v", ")"];
      }
      break;
    case "tan":
      if (degRad) {
        funcTemp = ["Math.tan(", "v", "*(Math.PI/180))"];
      } else {
        funcTemp = ["Math.tan(", "v", ")"];
      }
      break;
    case "asin":
      if (degRad) {
        funcTemp = ["Math.asin(", "v", ")*(180/Math.PI)"];
      } else {
        funcTemp = ["Math.asin(", "v", ")"];
      }
      break;
    case "acos":
      if (degRad) {
        funcTemp = ["Math.acos(", "v", ")*(180/Math.PI)"];
      } else {
        funcTemp = ["Math.acos(", "v", ")"];
      }
      break;
    case "atan":
      if (degRad) {
        funcTemp = ["Math.atan(", "v", ")*(180/Math.PI)"];
      } else {
        funcTemp = ["Math.atan(", "v", ")"];
      }
      break;
    case "csc":
      if (degRad) {
        funcTemp = ["1/Math.sin(", "v", "*(Math.PI/180))"];
      } else {
        funcTemp = ["1/Math.sin(", "v", ")"];
      }
      break;
    case "sec":
      if (degRad) {
        funcTemp = ["1/Math.cos(", "v", "*(Math.PI/180))"];
      } else {
        funcTemp = ["1/Math.cos(", "v", ")"];
      }
      break;
    case "cot":
      if (degRad) {
        funcTemp = ["1/Math.tan(", "v", "*(Math.PI/180))"];
      } else {
        funcTemp = ["1/Math.tan(", "v", ")"];
      }
      break;
    case "acsc":
      if (degRad) {
        funcTemp = ["Math.asin(1/", "v", ")*(180/Math.PI)"];
      } else {
        funcTemp = ["Math.asin(1/", "v", ")"];
      }
      break;
    case "asec":
      if (degRad) {
        funcTemp = ["Math.acos(1/", "v", ")*(180/Math.PI)"];
      } else {
        funcTemp = ["Math.acos(1/", "v", ")"];
      }
      break;
    case "acot":
      if (degRad) {
        funcTemp = ["Math.atan(1/", "v", ")*(180/Math.PI)"];
      } else {
        funcTemp = ["Math.atan(1/", "v", ")"];
      }
      break;
    case "ln":
      funcTemp = ["Math.log(", "v", ")"];
      break;
    case "log":
      funcTemp = ["Math.log10(", "v", ")"];
      break;
    case "mod":
      funcTemp = ["v", "%", "v"];
    break;
  }
  return funcTemp;
}
function assembly(array, inner){
  let returnString = "";
  for( let x of array){
    if(x == "v"){
      returnString += inner;
    }else{
      returnString += x;
    }
  }
  return returnString;
}
function recrSolve(equation){
  return equation;
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