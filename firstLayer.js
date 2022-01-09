function translate(input,degRad) {
	console.log("input at Start "+input);
	input = absComplete(input);
	input = parComplete(input);
	for (let i = 0; i < input.length; i++) {
		if (input.charAt(i) == '‎') {
			input = input.substring(0, i) + input.substring(i + 1);
		}
	}
	for (let i = 0; i < input.length; i++) {
		if (input.charAt(i) == '%') {
			if (input.charAt(i + 1) == '(') {
				console.log("Par ptsd ran " + input.substring(i + 1, parEncap(input.substring(i + 1)).length + 2));
				input = input.substring(0, i) + "*" + "(" + input.substring(i + 1, parEncap(input.substring(i + 1)).length + 2) + "/100)" + input.substring(i + 1 + parEncap(input.substring(i + 1)).length + 2);
				break;
			} else {
				console.log("Par num ran")
				input = input.substring(0, i) + "*" + Number(backward(input.substring(i + 1))) / 100 + input.substring(i + 1 + backward(input.substring(i + 1)).length);
			}
		}
	}
	for (let i = 0; i < input.length; i++) {
		console.log("translate loop " + i);
		switch (input.charAt(i)) {
			case ('π'):
				console.log("π to pi");
				if(backward(input.substring(i+1)).length == 0){
					input = input.substring(0, i) + "pi" + input.substring(i + 1)
				}else {
					input = input.substring(0, i) + "pi*" + input.substring(i + 1);
				}
				break;
			case ('×'):
				console.log("× to *");
				console.log("switch "+input.substring(0, i) + "*" + input.substring(i + 1));
				input = input.substring(0, i) + "*" + input.substring(i + 1);
				break;
			case ('÷'):
				console.log("÷ to /");
				input = input.substring(0, i) + "/" + input.substring(i + 1)
				break;
			case ('√'):
				if (input.charAt(i + 1) == '(') {
					input = input.substring(0, i) + "sqrt" + input.substring(i + 1);
				} else {
					input = input.substring(0, i) + "sqrt(" + backward(input.substring(i + 1)) + ")" + input.substring(backward(input.substring(i + 1)).length + 1);
				}
				break;
			case ('m'):
				if (input.substring(i, i + 4) == 'mod(') {
					input = input.substring(0, i) + "(" + input.substring(i + 4, input.indexOf(",", i + 4)) + ")" + '%' + "(" + input.substring(input.indexOf(',', i + 4) + 1, i + 3 + parEncap(input.substring(i + 4)).length) + ")" + input.substring(i + 3 + parEncap(input.substring(i + 3)).length);
				}
				break;
			case ('<'):
				if (input.substring(i).length >= 11 && input.substring(i, i + 5) == "<sup>") {
					console.log("Found a sup");
					let subFront = 0, subLast = 0 ,base = "", exponent ="";
					if (input.charAt(i - 1) == ")") {
						subFront
					} else {
						subFront = i - backward(input.substring(0, i)).length;
						subLast = i + supEncap(input.substring(i)).length;
						base = forward(input.substring(0, i));
						exponent = supMethod(input.substring(i))[0];
					}
					input = input.substring(0, subFront) + "pow(" + base + "," + exponent + ")" + input.substring(subLast);
					i = subLast;
				}
				break;
			case ('^'):
				let base = "";
				let exponent = "";
				if (input.charAt(i - 1) == ")") {
					base = parEncap2(input.substring(0, i));
				} else {
					base = forward(input.substring(0, i));
				}
				if (input.charAt(i + 1) == "(") {
					exponent = parEncap(input.substring(i + 1))
				} else {
					exponent = backward(input.substring(i + 1))
				}
				console.log("base: " + base + " exponent: " + exponent)
				input = input.substring(0, i - base.length) + "pow(" + base + "," + exponent + ")" + input.substring(i + exponent.length-1);
				break;
			/*case ('|'):
				if (input.charAt(i - 1) == "(") {
					input = input.substring(0, i - 1) + "abs(" + absMethod(input.substring(i))[0] + ")" + input.substring(i + absEncap(input.substring(i)).length);
				} else {
					console.log("Returned End " + absEncap(input.substring(i)));
					input = input.substring(0, i) + "abs(" + absMethod(input.substring(i))[0] + ")" + input.substring(i + absEncap(input.substring(i)).length);
				}
				console.log("resulting input " + input);
				break;*/
			case ('l'):
				if (input.substring(i, i + 3) == 'ln(') {
					input = input.substring(0, i) + "log" + input.substring(i + 2, i + 2 + parEncap(input.substring(i + 2)).length) + "" + input.substring(i + 2 + parEncap(input.substring(i + 2)).length);
				} else if (input.substring(i, i + 6) == "log₁₀(") {
					input = input.substring(0, i) + "log(" + input.substring(i + 5, i + 5 + parEncap(input.substring(i + 5)).length) + ",10" + input.substring(i + 5 + parEncap(input.substring(i + 5)).length);
				}
				break;
		}
	}
	for (let i = 0; i < input.length; i++) {
		switch (input.charAt(i)) {
			case ('d'):
				if (input.substring(i).length >= 4 && input.substring(i, i + 4) == "d→f(") {
					console.log("d to f");
					let num = parMethod(input.substring(i + 3))[0];
					console.log("dec to frac end " + input.substring(i + 5 + parEncap(input.substring(i + 3))) + " Fraction " + math.fraction(num).n + "/" + math.fraction(num).d);
					input = input.substring(0, i) + math.fraction(num).n + "/" + math.fraction(num).d + input.substring(i + 3 + parEncap(input.substring(i + 3)).length);
					i = num + 5;
				}
				break;
		}
	}
	return input;
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
function parComplete(input) {
	for (let i = 0; i < input.length; i++) {
		if (input.charAt(i) == '(') {
			if (i + parEncap(input.substring(i)).length >= input.length && input.charAt(input.length - 1) != ')') {
				console.log("par coimplete complete par");
				input += ")";
			}
		}
	}
	return input;
}
function absComplete(input) {
	let matchedList = [];
	let listIndex = 0;
	for (let i = 0; i < input.length; i++) {
		if (input.charAt(i) == '|') {
			let type = "";
			if (input.charAt(i - 1) == '(') {
				type = "(|";
			} else if (input.charAt(i)) {
				if (input.charAt(i+1) != ')') {
					type = "|";
				}
			}
			for (let j = i+1; j < input.length; j++) {
				if(input.charAt(j) == "|"){
					if(type == "|"){
						if(input.charAt(j-1) != "(" && input.charAt(j+1) != ")"){
							matchedList[listIndex++] = [i,type,j,"|"];
						}
					}else if(type == "(|"){
						if(input.charAt(j+1) == ")"){
							matchedList[listIndex++] = [i,type,j,"|)"];
						}else{
							matchedList[listIndex++] = [i,type,j,"|"];
						}
					}
				}else if(j == input.length-1){
					matchedList[listIndex++] = [i,type,null,null];
				}
			}
		}
	}
	console.log(matchedList);
	for(let i = matchedList.length-1; i >= 0; i--){
		if(matchedList[i][2] == null){
			if(matchedList[i][1] == "(|"){
				input += "|)";
			}else if(matchedList[i][1] == "|"){
				input += "|";
				console.log("abs completed");
			}
		}
	}
	return input;
}
function parMethod(sub) {
	let resultValue = 0;
	let computedPar = "";
	for (let i = 1; i < sub.length; i++) {
		if (sub.charAt(i) == '(') {
			console.log("things that are returned " + parMethod(sub.substring(i))[1]);
			sub = sub.substring(0, i) + parMethod(sub.substring(i))[0] + sub.substring(i + parMethod(sub.substring(i))[1].length);
			i = 0;
		} else if (sub.charAt(i) == ')') {
			console.log("calculating " + sub.substring(1, i));
			resultValue = math.evaluate(sub.substring(1, i));
			computedPar = sub.substring(1, i);
			break;
		} else if (i == sub.length - 1) {
			console.log("calculating " + sub.substring(1, sub.length - 1));
			sub += ")";
			resultValue = math.evaluate(sub.substring(1, sub.length - 1));
			computedPar = sub.substring(1, sub.length - 1);
			break;
		}
	}
	console.log("final " + resultValue + " and " + computedPar)
	return [resultValue, "(" + computedPar + ")"];
}
function parEncap(sub) {
	for (let i = 1; i < sub.length; i++) {
		if (sub.charAt(i) == '(') {
			i = i + parEncap(sub.substring(i)).length;
		} else if (sub.charAt(i) == ')') {
			sub = sub.substring(0, i + 1);
			break;
		} else if (i == sub.length - 1) {
			sub = sub + ")";
			break;
		}
	}
	return sub;
}
function methodTest(input, charat){
	if(input.charAt(input.charCodeAt(charat) > 92 && input.charCodeAt(charat) < 123)){

	}
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
function supMethod(input) {
	let computedSup = "";
	let resultValue = "";
	for (let i = 5; i < input.length; i++) {
		if (input.substring(i, i + 5) == "<sup>") {
			input = input.substring(0, i) + supMethod(input.substring(i))[0] + input.substring(i + supMethod(input.substring(i))[1].length);
			i = 0;
		} else if (input.substring(i, i + 6) == "</sup>") {
			resultValue = input.substring(5, i);
			computedSup = input.substring(0, i + 6);
		}
	}
	return [resultValue, computedSup];
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
function absMethod(input) {
	let computedSup = "";
	let resultValue = "";
	for (let i = 1; i < input.length; i++) {
		if (input.substring(i, i + 2) == "(|") {
			input = input.substring(0, i) + "abs(" + absMethod(input.substring(i + 1))[0] + ")" + input.substring(i + absMethod(input.substring(i + 1))[1].length);
			console.log("Middle lyer " + input);
			i = 0;
		} else if (input.substring(i, i + 2) == "|)" || input.charAt(i) == '|') {
			resultValue = input.substring(1, i);
			if (input.substring(i, i + 2) == "|)") {
				computedSup = input.substring(0, i + 3);
			} else {
				computedSup = input.substring(0, i);
			}
			break;
		}
	}
	console.log("Result is " + resultValue);
	return [resultValue, computedSup];
}
function absEncap(sub) {
	console.log("At Beging " + sub);
	for (let i = 1; i < sub.length; i++) {
		if (sub.substring(i, i + 2) == "(|") {
			i = i + absEncap(sub.substring(i + 1)).length;
			console.log("i is now " + i)
		} else if (sub.substring(i, i + 2) == "|)" || sub.charAt(i) == '|') {
			console.log("found one")
			if (sub.substring(i, i + 2) == "|)") {

				sub = sub.substring(0, i + 2);
			} else {
				sub = sub.substring(0, i + 1);
			}
			break;
		} else if (i == sub.length) {

		}
	}
	console.log("at end " + sub)
	return sub;
}