var algebra = require("algebra.js");
var Solver = require("js-solver");
parseForCust("acot(1)+cos(2)+cos(2)+7+sin(5)=y", "thins", "x");
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;
{
  var degRad = true;
}
//Parses the equation for a target or variable
function parseForCust(equation, varGrid, target) {
  degRad = false;
  if (target == "y") {
  } else {
    let containsTrig = false;
    let foundTrig = [];
    let functionList = [];
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
    ];
    let subEquation = equation;
    for (let func of funcList) {
      while (subEquation.includes(func)) {
        if (subEquation.indexOf(func) > -1) {
          containsTrig = true;
          let contains = false;
          if (
            parEncap(
              subEquation.substring(subEquation.indexOf(func) + func.length)
            ).includes(target)
          ) {
            contains = true;
          }
          let inner = parEncap(
            subEquation.substring(subEquation.indexOf(func) + func.length)
          );
          foundTrig.push(
            JSON.parse(
              '{"func":"' +
              func +
              '", "index":' +
              equation.indexOf(func) +
              ',"inner":"' +
              inner.substring(1, inner.length - 1) +
              '", "contains":' +
              contains +
              "}"
            )
          );
          subEquation =
            subEquation.substring(0, subEquation.indexOf(func)) +
            subEquation.substring(
              subEquation.indexOf(func) + func.length + inner.length
            );
          console.log("Sub Equation " + subEquation);
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
    if (containsTrig) {
      console.log(foundTrig);
      console.log(degRad);
      for (let trig of foundTrig) {
        if (!trig.contains) {
          {
            let computed = 0.0;
            switch (trig.func) {
              case "sin":
                if (degRad) {
                  computed = eval("Math.sin(" + trig.inner + "*(Math.PI/180))");
                  console.log("Sin computed " + computed);
                } else {
                  computed = eval("Math.sin(" + trig.inner + ")");
                }
                break;
              case "cos":
                if (degRad) {
                  computed = eval("Math.cos(" + trig.inner + "*(Math.PI/180))");
                } else {
                  computed = eval("Math.cos(" + trig.inner + ")");
                }
                break;
              case "tan":
                if (degRad) {
                  computed = eval("Math.tan(" + trig.inner + "*(Math.PI/180))");
                } else {
                  computed = eval("Math.tan(" + trig.inner + ")");
                }
                break;
              case "asin":
                if (degRad) {
                  computed = eval(
                    "Math.asin(" + trig.inner + ")*(180/Math.PI)"
                  );
                } else {
                  computed = eval("Math.asin(" + trig.inner + ")");
                }
                break;
              case "acos":
                if (degRad) {
                  computed = eval(
                    "Math.acos(" + trig.inner + ")*(180/Math.PI)"
                  );
                } else {
                  computed = eval("Math.acos(" + trig.inner + ")");
                }
                break;
              case "atan":
                if (degRad) {
                  computed = eval(
                    "Math.atan(" + trig.inner + ")*(180/Math.PI)"
                  );
                } else {
                  computed = eval("Math.atan(" + trig.inner + ")");
                }
                break;
              case "csc":
                if (degRad) {
                  computed = eval(
                    "1/(Math.sin(" + trig.inner + "*(Math.PI/180)))"
                  );
                } else {
                  computed = eval("1/(Math.sin(" + trig.inner + "))");
                }
                break;
              case "sec":
                if (degRad) {
                  computed = eval(
                    "1/(Math.cos(" + trig.inner + "*(Math.PI/180)))"
                  );
                } else {
                  computed = eval("1/(Math.cos(" + trig.inner + "))");
                }
                break;
              case "cot":
                if (degRad) {
                  computed = eval(
                    "1/(Math.tan(" + trig.inner + "*(Math.PI/180)))"
                  );
                } else {
                  computed = eval("1/(Math.tan(" + trig.inner + "))");
                }
                break;
              case "acsc":
                if (degRad) {
                  computed = eval(
                    "Math.asin(1/" + trig.inner + ")*(180/Math.PI)"
                  );
                } else {
                  computed = eval("Math.asin(1/" + trig.inner + ")");
                }
                break;
              case "asec":
                if (degRad) {
                  computed = eval(
                    "Math.acos(1/" + trig.inner + ")*(180/Math.PI)"
                  );
                } else {
                  computed = eval("Math.acos(1/" + trig.inner + ")");
                }
                break;
              case "acot":
                if (degRad) {
                  computed = eval(
                    "Math.atan(1/" + trig.inner + ")*(180/Math.PI)"
                  );
                } else {
                  computed = eval("Math.atan(1/" + trig.inner + ")");
                }
                break;
            }
            equation =
              equation.substring(0, trig.index) +
              computed +
              equation.substring(
                trig.index + trig.inner.length + trig.func.length + 2
              );
            foundTrig.splice(foundTrig.indexOf(trig), 1);
            console.log("Found Trig post");
            console.log(foundTrig);
          }
        }
      }
      console.log("Trig loop done");
      console.log(foundTrig);
      let sideOne = 0;
      let sideTwo = 0;
      //determines Which side to solve first in order to isolate the target
      for (let innerTrig of foundTrig) {
        if (innerTrig.contains && innerTrig.index < indexEquals) {
          sideOne++;
        } else {
          sideTwo++;
        }
      }
      let indexEquals = equation.indexOf("=");
      let solveSide = "";
      let equatSide = "";
      if (sideOne > sideTwo) {
        solveSide = equation.substring(0, indexEquals);
        equatSide = equation.substring(indexEquals + 1);
      } else {
        solveSide = equation.substring(indexEquals + 1);
        equatSide = equation.substring(0, indexEquals);
      }
      for (let trig of foundTrig) {
        let openVariable = findSafeVar(equation);
        solveSide = solveSide.replace(
          trig.func + "(" + trig.inner + ")",
          openVariable
        );
        var expr = algebra.Expression("x");
        expr = expr.subtract(3);
        expr = expr.add("x");

        console.log(expr.toString());
      }
    } else {
    }
  }
}
//Long Form
function findSafeVar(equation) {
  let posiableVar = [
    "a",
    "b",
    "c",
    "d",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "z",
  ];
  for (let i = 0; i < posiableVar.length; i++) {
    if (!equation.includes(posiableVar[i])) {
      return posiableVar[i];
    }
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
