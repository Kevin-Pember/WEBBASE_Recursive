let funcList = [
  {
    'func': "acsc",
    'funcParse': ["Math.asin(1/", "v1", ")","toRad"],
    'inputs': 1,
    'funcRadDeg': true,
    'funcLength': 4,
  },
  {
    'func': "asec",
    'funcParse': ["Math.acos(1/", "v1", ")", "toRad"],
    'inputs': 1,
    'funcRadDeg': true,
    'funcLength': 4,
  },
  {
    'func': "acot",
    'funcParse': ["Math.atan(1/", "v1", ")", "toRad"],
    'inputs': 1,
    'funcRadDeg': true,
    'funcLength': 4,
  },
  {
    'func': "asin",
    'funcParse': ["Math.asin(", "v1", ")", "toRad"],
    'inputs': 1,
    'funcRadDeg': true,
    'funcLength': 4,
  },
  {
    'func': "acos",
    'funcParse': ["Math.acos(", "v1", ")", "toRad"],
    'inputs': 1,
    'funcRadDeg': true,
    'funcLength': 4,
  },
  {
    'func': "atan",
    'funcParse': ["Math.atan(", "v1", ")", "toRad"],
    'inputs': 1,
    'funcRadDeg': true,
    'funcLength': 4,
  },
  {
    'func': "sin",
    'funcParse': ["Math.sin(", "v1", ")", "toDeg"],
    'inputs': 1,
    'funcRadDeg': true,
    'funcLength': 3,
  },
  {
    'func': "cos",
    'funcParse': ["Math.cos(", "v1", ")", "toDeg"],
    'inputs': 1,
    'funcRadDeg': true,
    'funcLength': 3,
  },
  {
    'func': "tan",
    'funcParse': ["Math.tan(", "v1", ")", "toDeg"],
    'inputs': 1,
    'funcRadDeg': true,
    'funcLength': 3,
  },
  {
    'func': "csc",
    'funcParse': ["Math.asin(1/", "v1", ")", "toDeg"],
    'inputs': 1,
    'funcRadDeg': true,
    'funcLength': 3,
  },
  {
    'func': "sec",
    'funcParse': ["Math.acos(1/", "v1", ")", "toDeg"],
    'inputs': 1,
    'funcRadDeg': true,
    'funcLength': 3,
  },
  {
    'func': "cot",
    'funcParse': ["Math.atan(1/", "v1", ")", "toDeg"],
    'inputs': 1,
    'funcRadDeg': true,
    'funcLength': 3,
  },
  {
    'func': "ln",
    'funcParse': ["Math.log(", "v1", ")"],
    'inputs': 1,
    'funcRadDeg': false,
    'funcLength': 2,
  },
  {
    'func': "log",
    'funcParse': ["Math.log10(", "v1", ")"],
    'inputs': 1,
    'funcRadDeg': false,
    'funcLength': 3,
  },
  {
    'func': "mod",
    'funcParse': ["v1", "%", "v2"],
    'inputs': 2,
    'funcRadDeg': false,
    'funcLength': 3,
  },
];
console.log(solveInpr("1+sin(2)+9+mod(3,4)"));
//create an array full of object that contain name, equation, parse the equation, needs rad of deg, length, or  etc.
function solveInpr(equation) {
  equation = equation.replaceAll('‎','');
  equation
  console.log('Inpr ran');
  for (let i = 0; i < equation.length; i++) {
    console.log("Ran :" + i);
    if (funcMatch(equation.substring(i)) != "") {
      console.log("Found func is "+funcMatch(equation.substring(i)));
      let func = getByName(funcMatch(equation.substring(i)));
      console.log("func is ");
      console.log(func);
      let innerRAW = parEncap(
        equation.substring(i+func.funcLength)
      );
      console.log("innerRaw is ");
      console.log(innerRAW);
      let values = recrSolve(innerRAW.substring(1, innerRAW.length - 1),func);
      console.log("Values are ");
      console.log(values);
      let funcTemp = findMethod(func);
      console.log("funcTemp is ");
      console.log(funcTemp);
      let parsedFunc = assembly(func, funcTemp, values);
      console.log("Parsed is ");
      console.log(parsedFunc);
      equation = equation.substring(0, i)+parsedFunc+equation.substring(i+func.funcLength+innerRAW.length);
      i = i+parsedFunc.length-1;
    }
  }
  return equation;
}
function getByName(name) {
  for (let func of funcList) {
    if (func.func == name) {
      return func;
    }
  }
}
function funcMatch(equation) {
  for (let func of funcList) {
    let check = equation.substring(0, (func.funcLength));
    if (check == func.func) {
      return func.func;
    }
  }
  return "";
}
function findMethod(func) {
  let degRad = true;
  let array = func.funcParse;
  if (func.funcRadDeg) {
    if(degRad){
      if(array.includes("toDeg")){
        array.splice(func.funcParse.indexOf("toDeg"), 1, "*(Math.PI/180)");
      }else{
        array.splice(func.funcParse.indexOf("toRad"), 1, "*(180/Math.PI)");
      }
    }
  }
  return array;
}
function assembly(func, parsedFunc, values) {
  inputs = func.inputs;
  for (let i = 1; i <= inputs; i++) {
    let index = parsedFunc.indexOf("v" + i);
    parsedFunc[index] = values[i - 1];
  }
  let parsedString = parsedFunc.join("");
  return parsedString;
}
function recrSolve(equation,func) {
  let inputs = func.inputs;
  if(inputs == 1){
    return [equatInner(equation)];
  }else {
    let values = [];
    for(let i = 1; i <= inputs; i++){
      if(i != inputs){
        values.push(equatInner(equation.substring(0, equation.indexOf(","))));
        equation = equation.substring(equation.indexOf(",") + 1);
      }else {
        values.push(equatInner(equation));
        break;
      }
    }
      return values
  }
}
function equatInner(equation){
  equation = solveInpr(equation);
  //eval(equation)
  return equation;
}
function parComplete(input) {
  for (let i = 0; i < input.length; i++) {
    if (input.charAt(i) == "(") {
      if (
        i + parEncap(input.substring(i)).length >= input.length &&
        input.charAt(input.length - 1) != ")"
      ) {
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
function parEncap2(sub) {
	for (let i = sub.length - 2; i >= 0; i--) {
		if (sub.charAt(i) == ')') {
			i = i + parEncap2(sub.substring(0, i + 1)).length;
		} else if (sub.charAt(i) == '(') {
			sub = sub.substring(i);
			break;
		} else if (i == 0) {
			sub = "(" + sub;
			break;
		}
	}
	return sub;
}
function supEncap(sub) {
	for (let i = 5; i < sub.length; i++) {
		if (sub.substring(i, i + 5) == "<sup>") {
			i = i + supEncap(sub.substring(i)).length;
		} else if (sub.substring(i, i + 6) == "</sup>") {
			sub = sub.substring(0, i + 7);
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
      if (hasVal < funcList[i].index) {
        hasVal = funcList[i].index + funcList[i].func.length;
      }
    }
  }
  if (has) {
    return hasVal + equation.substring(hasVal).indexOf(func);
  } else {
    return equation.indexOf(func);
  }
}
function powMethod(equation){
  for(let i = 0; i < equation.length; i++){
    if(equation.substring(i, i + 5) == "<sup>"){
      let exponent = equatInner(supEncap(equation.substring(i)).substring(5,supEncap(equation.substring(i)).length-6));
      let exponentRAW = supEncap(equation.substring(i)).substring(5,supEncap(equation.substring(i)).length-6);
      if(equation.charAt(i-1) == ")"){

      }else{

      }
    }
  }
}
function backward(sub) {
	let outputSub = "";
	for (i = 0; i <= sub.length - 1; i++) {
		if (sub.charAt(i) != '×' && sub.charAt(i) != '*' && sub.charAt(i) != '÷' && sub.charAt(i) != '/' && sub.charAt(i) != '√' && sub.charAt(i) != '²' && sub.charAt(i) != '^' && sub.charAt(i) != '(' && sub.charAt(i) != ')' && sub.charAt(i) != '%' && sub.charAt(i) != '!' && sub.charAt(i) != 'π' && sub.charAt(i) != 'e' && sub.charAt(i) != ',' && sub.charAt(i) != '|') {
			if (i == sub.length - 1) {
				outputSub = sub.substring(0, i + 1);
				break;
			} else if (sub.charAt(i) == '+') {
				if (sub.charAt(i - 1) == 'E') {

				} else {
					outputSub = sub.substring(0, i);
					break;
				}
			} else if (sub.charAt(i) == '-') {
				if (i == 0) {

				} else if (sub.charAt(i - 1) == 'E') {

				} else {
					outputSub = sub.substring(0, i);
					break;
				}
			}
		} else if (i == 0) {
			outputSub = "";
			break;
		} else {
			outputSub = sub.substring(0, i);
			break;
		}
	}
	return outputSub;
}
function forward(sub) {
	let outputSub = "";
	for (let i = sub.length - 1; i >= 0; i--) {
		if (sub.charAt(i) != '×' && sub.charAt(i) != '*' && sub.charAt(i) != '÷' && sub.charAt(i) != '/' && sub.charAt(i) != '√' && sub.charAt(i) != '²' && sub.charAt(i) != '^' && sub.charAt(i) != '(' && sub.charAt(i) != ')' && sub.charAt(i) != '%' && sub.charAt(i) != '!' && sub.charAt(i) != 'π' && sub.charAt(i) != 'e' && sub.charAt(i) != ',' && sub.charAt(i) != '|') {
			if (i == 0) {
				outputSub = sub.substring(i);
				break;
			} else if (sub.charAt(i) == '+') {
				if (sub.charAt(i - 1) == 'E') {

				} else {
					outputSub = sub.substring(i + 1);
					break;
				}
			} else if (sub.charAt(i) == '-') {
				if (i == 0) {

				} else if (sub.charAt(i - 1) == 'E') {

				} else {
					outputSub = sub.substring(i + 1);
					break;
				}
			}
		} else if (i == sub.length - 1) {
			outputSub = "";
			break;
		} else {
			outputSub = sub.substring(i + 1);
			break;
		}
	}
	console.log("Outputsub is " + outputSub);
	return outputSub;
}
