console.log(navigator);
let TextColorGlobal = "";
if (document.getElementById("mainBody") != null) {
  console.log(localStorage.getItem('textColor'));
  let rootCss = document.querySelector(':root');
  if (localStorage.getItem('displayColor') != null) {
    rootCss.style.setProperty('--displayColor', localStorage.getItem('displayColor'));
    rootCss.style.setProperty('--numbersColor', localStorage.getItem('numsColor'));
    rootCss.style.setProperty('--functionsColor', localStorage.getItem('funcColor'));
    rootCss.style.setProperty('--textColor', localStorage.getItem('textColor'));
    TextColorGlobal = localStorage.getItem('textColor');
  } else {
    localStorage.setItem('displayColor', "#d9d9d9");
    localStorage.setItem('numsColor', "#a3a3a3");
    localStorage.setItem('funcColor', "#919191");
    localStorage.setItem('textColor', "#000000");
    rootCss.style.setProperty('--displayColor', localStorage.getItem('displayColor'));
    rootCss.style.setProperty('--numbersColor', localStorage.getItem('numsColor'));
    rootCss.style.setProperty('--functionsColor', localStorage.getItem('funcColor'));
    rootCss.style.setProperty('--textColor', localStorage.getItem('textColor'));
    TextColorGlobal = localStorage.getItem('textColor');
  }
  if (localStorage.getItem('textColor') == "#000000") {
    document.getElementById('settingsCogIcon').src = "Images/SettingsCog.svg";
    document.getElementById('backspcaeIcon').src = "Images/backIcon.png";
    let helpIcons = document.getElementsByClassName("helpIcon");
    for (let item of helpIcons) {
      item.src = "Images/help.png";
    }
    let historyIcons = document.getElementsByClassName('historyIcon');
    for (let item of historyIcons) {
      item.src = "Images/historyIcon.svg";
    }
    let addIcons = document.getElementsByClassName('addIcon');
    for (let item of addIcons) {
      item.src = "Images/addObject.svg";
    }
    let minusIcons = document.getElementsByClassName('minusIcon');
    for (let item of minusIcons) {
      item.src = "Images/minusIcon.svg";
    }
    let arrowIcons = document.getElementsByClassName('arrows');
    for (let item of arrowIcons) {
      item.src = "Images/MoreFuncArrow.svg";
    }
  }
  for (let i = 0; i < numOfSaved(); i++) {
    let savedVal = localStorage.getItem(("Func" + i))
    let funcname = savedVal.substring(0, savedVal.indexOf('»'))
    savedVal = savedVal.substring(savedVal.indexOf('»') + 1);
    let funcEquation = savedVal.substring(0, savedVal.indexOf('»'));
    custButton(funcEquation, funcname, ['customFuncDisplayGrid', 'custFuncGridPopup']);
  }
  console.log(document.getElementById("mainBody").style.height);

  document.getElementById('uifCalculator').addEventListener("click", function (e) {
    if (e.target != document.getElementById('enterHeader')) {
      console.log("uifCalculator clicked")
      console.log(e.target.childNodes[1]);
      let enterheader = document.getElementById('enterHeader');
      let range = document.createRange();
      let sel = window.getSelection();
      console.log(enterheader.innerHTML.length)
      if (enterheader.innerHTML.length == 0) {
        console.log("IF complete")
        let textNode = document.createTextNode("‎");
        enterheader.appendChild(textNode);
      }
      range.setStart(enterheader.lastChild, enterheader.firstChild.data.length);
      console.log(range)
      range.collapse(true);
      sel.removeAllRanges()
      sel.addRange(range);
      document.getElementById("uifCalculator").scrollTop = document.getElementById("uifCalculator").scrollHeight;
    }
  });
  document.getElementById('historyHeader').innerHTML = localStorage.getItem("historyOut");
  document.getElementById("uifCalculator").scrollTop = document.getElementById("uifCalculator").scrollHeight;
  document.getElementById('mainTab').addEventListener("click", function (e) { openElement(document.getElementById('mainTab')) });
  document.getElementById('settingsCogIcon').addEventListener("click", function () { document.location = 'Settings.html' });
  document.getElementById('MRCOverlay').addEventListener("click", function () { 
    let enteredText = document.getElementById('enterHeader').innerHTML
    let mrmText = document.getElementById('memoryText').innerHTML;
    console.log("Targeted Section: " +enteredText.substring(enteredText.length - mrmText.length))
    if (mrmText == enteredText.substring(enteredText.length - mrmText.length)) { 
    document.getElementById('memoryText').innerHTML = "" 
    document.getElementById('memoryTextBoarder').style = undefined;
  } else {
    document.getElementById('enterHeader').innerHTML = document.getElementById('enterHeader').innerHTML + document.getElementById('memoryText').innerHTML;
  }
  });
  document.getElementById('MAddOverlay').addEventListener("click", function () { 
    document.getElementById('memoryTextBoarder').style.visibility = "visible"; 
    let enteredText = document.getElementById('enterHeader').innerHTML;
    var mySolver = new Solver({
      s: solveInpr(enteredText),
    })
    document.getElementById('memoryText').innerHTML = mySolver.solve({})["s"]; 
  });
  document.getElementById('leftOverlayNav').addEventListener("click", function () { navigateButtons(false) });
  document.getElementById('rightOverlayNav').addEventListener("click", function () { navigateButtons(true) });
  document.getElementById('num1').addEventListener("click", function () { frontButtonPressed('1'); });
  document.getElementById('num2').addEventListener("click", function () { frontButtonPressed('2'); });
  document.getElementById('num3').addEventListener("click", function () { frontButtonPressed('3'); });
  document.getElementById('moreFunctionsButton').addEventListener("click", function () { document.location = 'moreFunctions.html'; });
  document.getElementById('arrowIcon').addEventListener("click", function () { popup(); preventFocus(); });
  document.getElementById('num4').addEventListener("click", function () { frontButtonPressed('4'); });
  document.getElementById('num5').addEventListener("click", function () { frontButtonPressed('5'); });
  document.getElementById('num6').addEventListener("click", function () { frontButtonPressed('6'); });
  document.getElementById('backspace').addEventListener("click", function () { backPressed(); });
  document.getElementById('ac').addEventListener("click", function () { clearMain(); document.getElementById('uifCalculator').scrollTop = document.getElementById('uifCalculator').scrollHeight;});
  document.getElementById('num7').addEventListener("click", function () { frontButtonPressed('7'); });
  document.getElementById('num8').addEventListener("click", function () { frontButtonPressed('8'); });
  document.getElementById('num9').addEventListener("click", function () { frontButtonPressed('9'); });
  document.getElementById('plus').addEventListener("click", function () { frontButtonPressed('+'); });
  document.getElementById('piButton').addEventListener("click", function () { frontButtonPressed('π'); });
  document.getElementById('num0').addEventListener("click", function () { frontButtonPressed('0'); });
  document.getElementById('pointButton').addEventListener("click", function () { frontButtonPressed('.'); });
  document.getElementById('minus').addEventListener("click", function () { frontButtonPressed('-'); });
  document.getElementById('percent').addEventListener("click", function () { frontButtonPressed('%'); });
  document.getElementById('pars').addEventListener("click", function () { parsMethod(); });
  document.getElementById('pow').addEventListener("click", function () { pow('1'); });
  document.getElementById('mutiplication').addEventListener("click", function () { frontButtonPressed('×'); });
  document.getElementById('enter').addEventListener("click", function () { console.log(solveInpr(document.getElementById('enterHeader').innerHTML)); enterPressed(document.getElementById('enterHeader').innerHTML)});
  document.getElementById('pow2').addEventListener("click", function () { pow('2'); });
  document.getElementById('sqrt').addEventListener("click", function () { frontButtonPressed('√'); });
  document.getElementById('divison').addEventListener("click", function () { frontButtonPressed('÷'); });
  document.getElementById('helpEx').addEventListener("click", function () { document.location = 'help.html'; });
  document.getElementById('functionEx').addEventListener("click", function () { 
    if(window.innerWidth / window.innerHeight > 3 / 4 && window.innerWidth / window.innerHeight < 2 / 1){
    document.getElementById('extendedFuncGrid').style.animation = "0.15s ease-in 0s 1 reverse forwards running fadeEffect";
    setTimeout(function () { document.getElementById('extendedFuncGrid').style.visibility = "hidden"; document.getElementById('extendedFuncGrid').style.animation = null; }, 150);
    document.getElementById('customFuncDisplay').style.animation = "0.15s ease-in 0s 1 normal forwards running slideFromSide";
    }
   });
  document.getElementById('historyEx').addEventListener("click", function () { deleteHistory(); });
  document.getElementById('deciToFracEx').addEventListener("click", function () { frontButtonPressed('d→f('); });
  document.getElementById('absEx').addEventListener("click", function () { frontButtonPressed('|'); });
  document.getElementById('modEx').addEventListener("click", function () { frontButtonPressed('mod('); });
  document.getElementById('arcEx').addEventListener("click", function () { arcSwitch(); });
  document.getElementById('sinSide').addEventListener("click", function () { trigPressed('sin('); });
  document.getElementById('cscEx').addEventListener("click", function () { trigPressed('csc('); });
  document.getElementById('cosEx').addEventListener("click", function () { trigPressed('cos('); });
  document.getElementById('secEx').addEventListener("click", function () { trigPressed('sec('); });
  document.getElementById('tanEx').addEventListener("click", function () { trigPressed('tan('); });
  document.getElementById('cotEx').addEventListener("click", function () { trigPressed('cot('); });
  document.getElementById('factorialEx').addEventListener("click", function () { frontButtonPressed('!'); });
  document.getElementById('eEx').addEventListener("click", function () { frontButtonPressed('e'); });
  document.getElementById('log10Ex').addEventListener("click", function () { frontButtonPressed('log₁₀('); });
  document.getElementById('lnEx').addEventListener("click", function () { frontButtonPressed('ln('); });
  document.getElementById('backExMini').addEventListener("click", function () {
    document.getElementById('customFuncDisplay').style.animation = null;
    document.getElementById('customFuncDisplay').style.animation = "0.15s ease-in 0s 1 normal reverse running slideFromSide";
    setTimeout(function(){
      document.getElementById('customFuncDisplay').style = undefined;
      document.getElementById('extendedFuncGrid').style = undefined;

    }, 150);
    document.getElementById('extendedFuncGrid').style.animation = "0.15s ease-in 0s 1 normal reverse running slideFromSide";
  });
  document.getElementById('addFunctionEx').addEventListener("click", function () {
    if (!custFuncExisting(document.getElementById('enterHeader').innerHTML, 'New Function', false)) {
      console.log("Custom Function Button Created")
      custButton(document.getElementById('enterHeader').innerHTML, 'New Function', ['customFuncDisplayGrid', 'custFuncGridPopup']);
      localStorage.setItem(('Func' + numOfSaved()), 'New Function' + "»" + document.getElementById('enterHeader').innerHTML + "»");
    }
  });
  document.getElementById('minusFunctionEx').addEventListener("click", function () { console.log("Things" + document.getElementById("enterHeader").value); });
  document.getElementById('addIconPopup').addEventListener("click", function () {
    if (!custFuncExisting(document.getElementById('enterHeader').innerHTML, 'New Function', false)) {
      console.log("Custom Function Button Created")
      custButton(document.getElementById('enterHeader').innerHTML, 'New Function', ['customFuncDisplayGrid', 'custFuncGridPopup']);
      localStorage.setItem(('Func' + numOfSaved()), 'New Function' + "»" + document.getElementById('enterHeader').innerHTML + "»");
    }
  });
  document.getElementById('minusIconPopup').addEventListener("click", function () {});
  document.getElementById('functionPopup').addEventListener("click", function () { console.log("Things"); });
  document.getElementById('historyPopup').addEventListener("click", function () { deleteHistory(); });
  document.getElementById('deciToFracPopup').addEventListener("click", function () { frontButtonPressed('d→f('); });
  document.getElementById('helpPopup').addEventListener("click", function () { document.location = 'help.html'; });
  document.getElementById('log10Popup').addEventListener("click", function () { frontButtonPressed('log₁₀('); });
  document.getElementById('lnPopup').addEventListener("click", function () { frontButtonPressed('ln('); });
  document.getElementById('ePopup').addEventListener("click", function () { frontButtonPressed('e'); });
  document.getElementById('factorialPopup').addEventListener("click", function () { frontButtonPressed('!'); });
  document.getElementById('arcPopup').addEventListener("click", function () { arcSwitch(); });
  document.getElementById('sinPopup').addEventListener("click", function () { trigPressed('sin('); });
  document.getElementById('cosPopup').addEventListener("click", function () { trigPressed('cos('); });
  document.getElementById('tanPopup').addEventListener("click", function () { trigPressed('tan('); });
  document.getElementById('absPopup').addEventListener("click", function () { frontButtonPressed('|'); });
  document.getElementById('cscPopup').addEventListener("click", function () { trigPressed('csc('); });
  document.getElementById('secPopup').addEventListener("click", function () { trigPressed('sec('); });
  document.getElementById('cotPopup').addEventListener("click", function () { trigPressed('cot('); });
  document.getElementById('modPopup').addEventListener("click", function () { frontButtonPressed('mod(') });

  const elem = document.getElementById("memoryTextBoarder");
  let isDown = false;
  let startX;
  let scrollLeft;

  elem.addEventListener('mousedown', (e) => {
    isDown = true;
    elem.classList.add('active');
    startX = e.pageX - elem.offsetLeft;
    scrollLeft = elem.scrollLeft;
  });
  elem.addEventListener('mouseleave', () => {
    isDown = false;
    elem.classList.remove('active');
  });
  elem.addEventListener('mouseup', () => {
    isDown = false;
    elem.classList.remove('active');
  });
  elem.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - elem.offsetLeft;
    const walk = (x - startX) * 3;
    elem.scrollLeft = scrollLeft - walk;
    console.log(walk);
  });
} else if (document.getElementById("settingsBody") != null) {
  let rootCss = document.querySelector(':root');
  rootCss.style.setProperty('--displayColor', localStorage.getItem('displayColor'));
  rootCss.style.setProperty('--numbersColor', localStorage.getItem('numsColor'));
  rootCss.style.setProperty('--functionsColor', localStorage.getItem('funcColor'));
  rootCss.style.setProperty('--textColor', localStorage.getItem('textColor'));
  document.getElementById('DisplayColorPicker').addEventListener("input", updatePreview, false)
  document.getElementById('NumbersColorPicker').addEventListener("input", updatePreview, false)
  document.getElementById('FunctionsColorPicker').addEventListener("input", updatePreview, false);
  document.getElementById('DisplayColorPicker').value = localStorage.getItem('displayColor');
  document.getElementById('NumbersColorPicker').value = localStorage.getItem('numsColor');
  document.getElementById('FunctionsColorPicker').value = localStorage.getItem('funcColor');
  createTheme("#D9D9D9", "#A3A3A3", "#919191", "#000000", "Cityscape", false);
  createTheme("#383838","#525252","#292929","#ffffff","Backstreet", false);
  createTheme("#6CB999","#88BDA7","#538E76","#000000","Seafoam",false);
  createTheme("#ec8888", "#ce9797", "#291e1e", "#FFFFFF", "Salmon", false);
  if (localStorage.getItem('textColor') == "#000000") {
    document.getElementById('dropbtn').innerHTML = "Black <h3 id='displayText' style='color: black;'>t</h3>";
    document.getElementById('addIcon').src = "Images/addObject.svg";
    document.getElementById('minusIcon').src = "Images/minusIcon.svg";
    document.getElementById('ColorsIcon').src = "Images/Colors.svg";
    document.getElementById('PreferencesIcon').src = "Images/Calipiers.svg";
    document.getElementById('AboutIcon').src = "Images/aboutUS.svg";
    let backIcons = document.getElementsByClassName('backIcon');
    for (let item of backIcons) {
      item.src = "Images/MoreFuncArrow.svg";
    }
  } else {
    document.getElementById('dropbtn').innerHTML = "White <h3 id='displayText' style='color: white;'>t</h3>";
  }
  var i = 1;
  let themeRaw;
  while (i != -1) {
    try {
      console.log('theme' + i);
      themeRaw = localStorage.getItem('theme' + i);
      let displayColor = themeRaw.substring(0, themeRaw.indexOf("»"));
      themeRaw = themeRaw.substring(themeRaw.indexOf("»") + 1);
      let numsColor = themeRaw.substring(0, themeRaw.indexOf("»"));
      themeRaw = themeRaw.substring(themeRaw.indexOf("»") + 1);
      let funcColor = themeRaw.substring(0, themeRaw.indexOf("»"));
      themeRaw = themeRaw.substring(themeRaw.indexOf("»") + 1);
      let textColor = themeRaw.substring(0, themeRaw.indexOf("»"));
      themeRaw = themeRaw.substring(themeRaw.indexOf("»") + 1);
      let themeName = themeRaw.substring(0, themeRaw.indexOf("»"));
      createTheme(displayColor, numsColor, funcColor, textColor, themeName, true);
      i++;
    } catch (err) {
      console.log(err);
      break;
    }
  }
  let themes = document.getElementsByClassName("displayBaseThemeType");
  for (i = 0; i < themes.length; i++) {
    if (rgbToHex(themes[i].style.backgroundColor) == localStorage.getItem('displayColor') && rgbToHex(themes[i].childNodes[3].style.backgroundColor) == localStorage.getItem('numsColor') && rgbToHex(themes[i].childNodes[5].style.backgroundColor) == localStorage.getItem('funcColor') && rgbToHex(themes[i].childNodes[1].style.color) == localStorage.getItem('textColor')) {
      themes[i].parentNode.querySelector('label').querySelector('input').checked = true;
      break;
    }
  }
  document.getElementById('backButton').addEventListener("click", function(){settingExit()});
  document.getElementById('LooknFeel').addEventListener("click", function(){settingsTabChange('colorsTab')});
  document.getElementById('Preferences').addEventListener("click", function(){settingsTabChange('PreferencesTab')});
  document.getElementById('About').addEventListener("click", function(){settingsTabChange('AboutTab')});
  document.getElementById('colorsBack').addEventListener("click", function(){SettingsBack('colorsTab')});
  document.getElementById('selectorBlack').addEventListener("click", function(){dropPressed('Black')});
  document.getElementById('selectorWhite').addEventListener("click", function(){dropPressed('White')});
  document.getElementById('addIcon').addEventListener("click", function(){newTheme()});
  document.getElementById('minusIcon').addEventListener("click", function(){console.log("Remove pressed");removeThemes()});
  document.getElementById('PreferencesBack').addEventListener("click", function(){SettingsBack('PreferencesTab')});
  document.getElementById('AboutBack').addEventListener("click", function(){SettingsBack('AboutTab')});
} else if (document.getElementById('helpBody') != null) {
  let rootCss = document.querySelector(':root');
  rootCss.style.setProperty('--displayColor', localStorage.getItem('displayColor'));
  rootCss.style.setProperty('--numbersColor', localStorage.getItem('numsColor'));
  rootCss.style.setProperty('--functionsColor', localStorage.getItem('funcColor'));
  rootCss.style.setProperty('--textColor', localStorage.getItem('textColor'));
  console.log("Help Started");
}
function frontButtonPressed(input) {
  let display = document.getElementById('enterHeader');
  let sel = window.getSelection();
  let range = document.createRange();
  let index = 0;
  let higher = 0;
  let lower = 0;
  if (sel.anchorOffset > sel.focusOffset) {
    higher = sel.anchorOffset;
    lower = sel.focusOffset;
  } else {
    higher = sel.focusOffset;
    lower = sel.anchorOffset;
  }
  console.log(sel);
  if (sel.anchorNode != null) {
    let appendString = sel.focusNode.nodeValue.substring(0, lower) + input;
    sel.focusNode.nodeValue = appendString + sel.focusNode.nodeValue.substring(higher);
    range.setStart(sel.focusNode, appendString.length);
  } else {
    display.innerHTML = input;
    range.setStart(display.childNodes[0], input.length)
  }
  range.collapse(true);
  sel.removeAllRanges()
  sel.addRange(range);
  document.getElementById('uifCalculator').scrollTop = document.getElementById('uifCalculator').scrollHeight;
}
function preventFocus() {
  var ae = document.activeElement;
  setTimeout(function () { ae.focus() }, 1);
}
function universalBack(type) {
  if (type == "colorsTab") {
    document.getElementById("colorsBack").style.visibility = "hidden";
    if (window.innerWidth / window.innerHeight > 3 / 4) {
      document.getElementById("colorsTab").style.animation = null;
    } else {
      document.getElementById("colorsTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideRight";
      setTimeout(function () { document.getElementById("colorsTab").style.animation = null; document.getElementById("colorsTab").style.width = null; }, 150);
    }
    document.getElementById("navColumn").style.visibility = "visible";
  } else if (type == "PreferencesTab") {
    document.getElementById("PreferencesBack").style.visibility = "hidden";
    if (window.innerWidth / window.innerHeight > 3 / 4) {
      document.getElementById("PreferencesTab").style.animation = null;
    } else {
      document.getElementById("PreferencesTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideRight";
      setTimeout(function () { document.getElementById("PreferencesTab").style.animation = null; document.getElementById("PreferencesTab").style.width = null; }, 150);
    }
    document.getElementById("navColumn").style.visibility = "visible";
  } else if (type == "AboutTab") {
    document.getElementById("AboutBack").style.visibility = "hidden";
    if (window.innerWidth / window.innerHeight > 3 / 4) {
      document.getElementById("AboutTab").style.animation = null;
    } else {
      document.getElementById("AboutTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideRight";
      setTimeout(function () { document.getElementById("AboutTab").style.animation = null; document.getElementById("AboutTab").style.width = null; }, 150);
    }
    document.getElementById("navColumn").style.visibility = "visible";
  }else if(type == "backButton"){

  }
}
function backPressed() {
  let uifCalculator = document.getElementById('enterHeader');
  let sel = window.getSelection();
  let range = document.createRange();
  let index = 0;
  let higher = 0;
  let lower = 0;
  if (sel.anchorOffset > sel.focusOffset) {
    higher = sel.anchorOffset;
    lower = sel.focusOffset;
  } else {
    higher = sel.focusOffset;
    lower = sel.anchorOffset;
  }
  if (!(plainSup(sel) && sel.focusNode.nodeValue.length <= 1)) {
    if (sel.anchorOffset == sel.focusOffset) {
      console.log(sel.focusNode.nodeValue);
      if (sel.focusNode.nodeValue.charAt(sel.anchorOffset - 1) != '‎' && uifCalculator.childNodes[1] != sel.focusNode) {
        let short = sel.focusNode.nodeValue.substring(0, sel.anchorOffset - 1);
        sel.focusNode.nodeValue = short + sel.focusNode.nodeValue.substring(sel.focusOffset);
        range.setStart(sel.focusNode, short.length);
        range.collapse(true);
        sel.removeAllRanges()
        sel.addRange(range);
      } else {
        let childNodes = document.getElementById('enterHeader').childNodes;
        for (let i = 0; i < childNodes.length; i++) {
          if (childNodes[i] == sel.focusNode) {
            range.setStart(childNodes[i - 1].childNodes[0], childNodes[i - 1].childNodes[0].nodeValue.length)
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            console.log(document.getElementById('enterHeader').childNodes);
          }
        }
      }
    } else {
      let short = sel.focusNode.nodeValue.substring(0, lower);
      sel.focusNode.nodeValue = short + sel.focusNode.nodeValue.substring(higher);
      range.setStart(sel.focusNode, short.length);
      range.collapse(true);
      sel.removeAllRanges()
      sel.addRange(range);
    }
  } else {
    console.log(sel.focusNode.parentNode.parentNode.childNodes);
    let childNodes = sel.focusNode.parentNode.parentNode.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      if (childNodes[i] == sel.focusNode.parentNode) {
        range.setStart(childNodes[i - 1], childNodes[i - 1].nodeValue.length)
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        console.log(sel.focusNode.parentNode);
        childNodes[i + 1].nodeValue = childNodes[i + 1].nodeValue.substring(1)
        document.getElementById('uifCalculator').childNodes[1].removeChild(childNodes[i]);
      }
    }
  }
  document.getElementById('uifCalculator').scrollTop = document.getElementById('uifCalculator').scrollHeight;
}
function plainSup(sel) {
  if (sel.focusNode.parentElement.tagName == "SUP") {
    return true;
  } else {
    return false;
  }
}
function diagnostic() {
  let sel = window.getSelection();
  console.log(sel.focusNode);
}
function pow(type) {
  let display = document.getElementById('enterHeader');
  console.log("pow " + type + " ran");
  let sel = window.getSelection();
  let range = document.createRange();
  let index = 0;
  let higher = 0;
  let lower = 0;
  if (sel.anchorOffset > sel.focusOffset) {
    higher = sel.anchorOffset;
    lower = sel.focusOffset;
  } else {
    higher = sel.focusOffset;
    lower = sel.anchorOffset;
  }
  for (let i = 0; i < display.childNodes.length; i++) {
    if (sel.focusNode == display.childNodes[i]) {
      index = i;
      break;
    }
  }
  let backend = sel.focusNode.nodeValue.substring(higher);
  sel.focusNode.nodeValue = sel.focusNode.nodeValue.substring(0, lower);
  console.log(backend);
  let superSr = document.createElement("sup");
  if (type == "2") {
    superSr.appendChild(document.createTextNode('‎2'));
  } else {
    superSr.appendChild(document.createTextNode('‎'));
  }
  if (backend == '') {
    backend = '‎';
  }
  if (index == display.childNodes.length) {
    display.appendChild(document.createTextNode(backend));
  } else {
    display.insertBefore(document.createTextNode(backend), display.childNodes[index + 1]);
  }
  console.log(display.childNodes[index + 1])
  window.addEventListener('keydown', keepBlank);
  display.insertBefore(superSr, display.childNodes[index + 1]);
  console.log(display.childNodes);
  if (type == "2") {
    range.setStart(display.childNodes[index + 2], 1);
  } else {
    range.setStart(superSr.childNodes[0], 1);
  }
  range.collapse(true);
  sel.removeAllRanges()
  sel.addRange(range);
}
function keepBlank(eve) {
  console.log("keepBlank Ran");
  let sel = window.getSelection();
  let range = document.createRange();
  let higher = 0;
  let lower = 0;
  if (sel.anchorOffset > sel.focusOffset) {
    higher = sel.anchorOffset;
    lower = sel.focusOffset;
  } else {
    higher = sel.focusOffset;
    lower = sel.anchorOffset;
  }
  console.log(sel.focusNode.nodeValue + "Things");
  if (eve.keyCode == 8 && (sel.focusNode.nodeValue.substring(lower, higher).includes('‎') || sel.focusNode.nodeValue == '‎') && sel.focusNode.parentNode == document.getElementById('enterHeader')) {
    console.log("Event Consumed");
    eve.preventDefault();
    let childNodes = document.getElementById('enterHeader').childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      if (childNodes[i] == sel.focusNode) {
        range.setStart(childNodes[i - 1].childNodes[0], childNodes[i - 1].childNodes[0].nodeValue.length)
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        console.log(document.getElementById('enterHeader').childNodes);
      }
    }
  }
}
function navigateButtons(direction) {
  let parentElement;
  let sel = window.getSelection();
  let isSup = false;
  let range = document.createRange();
  let higher = 0;
  let lower = 0;
  if (sel.anchorOffset > sel.focusOffset) {
    higher = sel.anchorOffset;
    lower = sel.focusOffset;
  } else {
    higher = sel.focusOffset;
    lower = sel.anchorOffset;
  }
  console.log(sel.focusNode.parentNode.tagName == 'SUP');
  if (sel.focusNode.parentNode.tagName == 'SUP') {
    console.log("is SUP");
    parentElement = sel.focusNode.parentNode.parentNode;
    isSup = true;
  } else {
    console.log("is normal");
    parentElement = sel.focusNode.parentNode;
  }
  let childNodes = parentElement.childNodes;
  if (!direction) {
    console.log(parentElement);
    if (lower == 0 || sel.focusNode.nodeValue.charAt(lower - 1) == '‎') {
      console.log(childNodes);
      for (let i = 0; i < childNodes.length; i++) {
        if ((isSup && sel.focusNode.parentNode == childNodes[i]) || sel.focusNode == childNodes[i]) {
          console.log(childNodes[i - 1]);
          if (childNodes[i - 1].tagName != 'SUP') {
            range.setStart(childNodes[i - 1], childNodes[i - 1].nodeValue.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            break;
          } else {
            range.setStart(childNodes[i - 1].childNodes[0], childNodes[i - 1].childNodes[0].nodeValue.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
            break;
          }

        }
      }
    } else {
      range.setStart(sel.focusNode, lower - 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  } else {
    if (lower == sel.focusNode.nodeValue.length) {
      for (let i = 0; i < childNodes.length; i++) {
        if ((isSup && sel.focusNode.parentNode == childNodes[i]) || sel.focusNode == childNodes[i]) {
          console.log(sel.focusNode);
          if (childNodes[i + 1].tagName != 'SUP') {
            range.setStart(childNodes[i + 1], 1);
          } else {
            range.setStart(childNodes[i + 1].childNodes[0], 1);
          }
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
          break;
        }
      }
    } else {
      range.setStart(sel.focusNode, lower + 1);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
}
function clearMain() {
  let enterHeader = document.getElementById("enterHeader");
  let range = document.createRange();
  let sel = document.getSelection();
  enterHeader.innerHTML = '‎';
  range.setStart(enterHeader.lastChild, enterHeader.firstChild.data.length);
  console.log(range)
  range.collapse(true);
  sel.removeAllRanges()
  sel.addRange(range);
}
function parsMethod() {
  let badIdea = document.getElementById("enterHeader").selectionStart;
  let lazyAfterthought = 0;
  for (let i = 0; i < document.getElementById("enterHeader").innerHTML.length; i++) {
    if (document.getElementById("enterHeader").innerHTML.charAt(i) == '(') {
      lazyAfterthought = lazyAfterthought + 1;
    }
    if (document.getElementById("enterHeader").innerHTML.charAt(i) == ')') {
      lazyAfterthought = lazyAfterthought - 1;
    }
  }
  if (lazyAfterthought >= 1 && document.getElementById("enterHeader").innerHTML.charAt(badIdea - 1) != '(') {
    frontButtonPressed(')');
  } else {
    frontButtonPressed('(');
  }
}
function custFuncExisting(equation, name, duplicates) {
  let exist = false, existing = document.getElementsByClassName("customFuncLinks");
  for (i = 0; i < existing.length; i++) {
    if (existing[i].innerHTML == "<h2>" + equation + "</h2>" + name && !duplicates) {
      exist = true;
      break;
    }
  }
  return exist;
}
function custButton(equation, name, target) {
  console.log(document);
  let temp = document.getElementsByClassName("customFuncTemplate")[0], clon = temp.content.cloneNode(true);
  clon.getElementById("customFuncButton").innerHTML = "<h2>" + equation + "</h2>" + name;
  for (let i = 0; i < target.length; i++) {
    let clonClone = clon.cloneNode(true);
    let buttonNode = clonClone.getElementById("customFuncButton");
    buttonNode.addEventListener('click', function (e) {
      console.log("CustButtonPressed");
      console.log(buttonNode.innerHTML);
      let equation = buttonNode.querySelector('h2').innerHTML;
      let Name = buttonNode.childNodes[1].innerHTML;
      if (!tabOpen(name + "»" + equation + "»")) {
        let tabs = document.getElementsByClassName('tabcontent');
        for (let i = 0; i < tabs.length; i++) {
          tabs[i].style.visibility = 'hidden';
        }
        newCustFuncTab(name + "»" + equation + "»");
        document.getElementById('extraFuncPopUp').visibility = 'hidden';
        document.getElementById('arrowIcon').style.animation = "0s ease-in 0s 1 normal forwards running toDown";
        document.getElementById('extraFuncPopUp').style.animation = "0s ease-in 0s 1 normal forwards running toSlideDown";
        document.getElementById('arrowIcon').style.transform = 'rotate(90deg);';
        document.getElementById('customFuncDisplay').style.visibility = "hidden";
        let tabClon = document.getElementsByClassName('newTab')[0].content.cloneNode(true);
        tabClon.getElementById('tabButton').innerHTML = "<h3>" + name + "</h3><img id='tabRemove' src='Images/xIconWhite.png' width='31.5px'>";
        tabClon.getElementById('tabButton').dataset.tabmap = name + "»" + equation + "»";
        if(TextColorGlobal == "#000000"){
          tabClon.getElementById('tabRemove').src = "Images/xIcon.png";
        }
        let highlight = tabClon.getElementById('tabButton');
        tabClon.getElementById('tabButton').addEventListener("click", function (e) {
          if (e.target != highlight.querySelector("IMG")) {
            openElement(highlight)
          }
        });
        tabClon.getElementById('tabRemove').addEventListener('click', function (e) {
          console.log("Remove Tab")
          removeCustFunc(e);
        })
        document.getElementById('tab').appendChild(tabClon);
        highlightTab(highlight);
      }
    });
    console.log(clonClone)
    document.getElementById(target[i]).appendChild(clonClone);
  }

}
function numOfSaved() {
  for (let i = 0; i != -1; i++) {
    if (localStorage.getItem(("Func" + i)) == undefined) {
      return i;
    }
  }
}
function removeCustFunc(event) {
  tabLink = event.target.parentElement;
  console.log(event.target);
  document.getElementById('mainBody').removeChild(matchTab(tabLink.dataset.tabmap, false));
  document.getElementById('tab').removeChild(tabLink);
  console.log('Switching to main');
  openElement(document.getElementById('mainTab'));
}
function tabOpen(intialize) {
  let tabs = document.getElementsByClassName('tablinks')

  for (let i = 1; i < tabs.length; i++) {

    if (intialize == tabs[i].dataset.tabmap) {
      return true;
    }
  }
  console.log("returned False")
  return false;
}
function enterPressed(input) {
  let display = document.getElementById('enterHeader');
  historyMethod(input);
  input = solveInpr(input);
  console.log('Fresh out of the input ' + input);
  var mySolver = new Solver({
    s: input,
  })
  display.innerHTML = mySolver.solve({})["s"];
  console.log(mySolver.solve({})["s"]);
  document.getElementById('uifCalculator').scrollTop = document.getElementById('uifCalculator').scrollHeight;
  setSelect(display.childNodes[display.childNodes.length - 1], display.childNodes[display.childNodes.length - 1].length);
}
function historyMethod(equation) {
  let historyHeader = document.getElementById('historyHeader');
  var mySolver = new Solver({
    s: solveInpr(equation),
  })
  let exportedValue = "<h3 id='historyTimeSubHeader'>" + getTime() + "</h3>" + equation + "=" + mySolver.solve({})["s"] + "<br> <br> ";
  let dates = document.getElementsByClassName('historyDateHeader');
  if (dates.length == 0) {
    exportedValue = "<h3 class='historyDateHeader'>" + getDate() + "</h3> <br>" + exportedValue;
  } else if (dates[dates.length - 1].innerHTML != getDate()) {
    exportedValue = "<h3 class='historyDateHeader'>" + getDate() + "</h3> <br>" + exportedValue;
  }
  historyHeader.innerHTML = historyHeader.innerHTML + exportedValue;
  localStorage.setItem("historyOut", historyHeader.innerHTML);
}
function getTime() {
  const d = new Date();
  let hours = d.getHours();
  if (hours > 12) {
    hours -= 12;
  }
  var minutes = d.getMinutes()
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return hours + ":" + minutes;
}
function getDate() {
  const d = new Date();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}
function deleteHistory() {
  document.getElementById('historyHeader').innerHTML = "";
  localStorage.setItem("historyOut", "");
}
function setSelect(node, index) {
  let sel = window.getSelection();
  let range = document.createRange();
  let higher = 0;
  let lower = 0;
  range.setStart(node.lastChild, index);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}
function openElement(evt) {
  console.log("element is ")
  console.log(evt)
  let evtElement = evt;
  console.log(evtElement.dataset.tabmap)
  let match;
  let tabs = document.getElementsByClassName('tabcontent');
  if (evtElement.dataset.tabmap != "mainTab") {
    if (document.getElementById('arrowIcon').style.animation == "0.25s ease-in 0s 1 normal forwards running toUp") {
      document.getElementById('arrowIcon').style.animation = "0.0 ease-in 0s 1 normal forwards running toDown";
      document.getElementById('extraFuncPopUp').style.animation = "0.0s ease-in 0s 1 normal forwards running toSlideDown";
      setTimeout(donothing, 500);
      document.getElementById('extraFuncPopUp').style.visibility = "hidden";
    }
    document.getElementById('customFuncDisplay').style.visibility = "hidden";
  } else {
    document.getElementById('customFuncDisplay').style.visibility = "";
  }
  match = matchTab(evtElement.dataset.tabmap, false);
  console.log(evtElement.dataset.tabmap);
  for (let i = 0; i < tabs.length; i++) {
    if (matchTab != tabs[i]) {
      tabs[i].style.visibility = 'hidden';
    }
  }
  highlightTab(evtElement);
  match.style.visibility = 'visible';
}
function highlightTab(element) {
  let activeTabs = document.getElementsByClassName('tablinks active')
  for (let i = 0; i < activeTabs.length; i++) {
    activeTabs[i].className = activeTabs[i].className.replace(" active", "");
  }
  element.className += " active"
}
function arcSwitch() {
  if (document.getElementsByClassName('trigButton')[0].innerHTML.charAt(0) == 'a') {
    for (let i = 0; i < document.getElementsByClassName('arcText').length; i++) {
      document.getElementsByClassName('arcText')[i].innerHTML = 'arc';
    }
    for (let i = 0; i < document.getElementsByClassName('trigButton').length; i++) {
      document.getElementsByClassName('trigButton')[i].innerHTML = document.getElementsByClassName('trigButton')[i].innerHTML.substring(1);
    }
  } else {
    for (let i = 0; i < document.getElementsByClassName('arcText').length; i++) {
      document.getElementsByClassName('arcText')[i].innerHTML = 'reg';
    }
    for (let i = 0; i < document.getElementsByClassName('trigButton').length; i++) {
      document.getElementsByClassName('trigButton')[i].innerHTML = "a" + document.getElementsByClassName('trigButton')[i].innerHTML;
    }
  }
}
function trigPressed(input) {
  if (document.getElementsByClassName('trigButton')[0].innerHTML.charAt(0) == 'a') {
    frontButtonPressed("a" + input);
  } else {
    frontButtonPressed(input);
  }
}
function popup() {
  if (document.getElementById('arrowIcon').style.animation == "0.25s ease-in 0s 1 normal forwards running toUp") {
    console.log("To down");
    document.getElementById('arrowIcon').style.animation = "0.25s ease-in 0s 1 normal forwards running toDown";
    document.getElementById('extraFuncPopUp').style.animation = "0.25s ease-in 0s 1 normal forwards running toSlideDown";
    setTimeout(donothing, 500);
    document.getElementById('arrowIcon').style.transform = 'rotate(90deg);';
  } else {
    document.getElementById('arrowIcon').style.animation = "0.25s ease-in 0s 1 normal forwards running toUp";
    console.log("To up");
    document.getElementById('extraFuncPopUp').style.animation = "0.25s ease-in 0s 1 normal forwards running toSlideUp";
    setTimeout(donothing, 500);
    document.getElementById('arrowIcon').style.transform = 'rotate(270deg);';
  }

}
function donothing() { }
function settingsTabChange(name) {
  var tabs = document.getElementsByClassName("settingTabContent");
  if (window.innerWidth / window.innerHeight > 3 / 4) {
    for (i = 0; i < tabs.length; i++) {
      tabs[i].style.visibility = "hidden";
    }
    if (name == 'colorsTab') {
      document.getElementById("colorsTab").style.visibility = "visible";
      console.log("lookn ran");
    } else if (name == 'PreferencesTab') {
      document.getElementById('PreferencesTab').style.visibility = "visible";
    } else if (name == 'AboutTab') {
      document.getElementById('AboutTab').style.visibility = "visible";
    } else {
      console.log("nothing")
    }
  } else {
    for (i = 0; i < tabs.length; i++) {
      tabs[i].style.visibility = "hidden";
    }
    if (name == 'colorsTab') {
      document.getElementById("colorsTab").style.visibility = "visible";
      document.getElementById("colorsTab").style.width = "100%";
      document.getElementById("colorsBack").style.visibility = "visible";
      document.getElementById("colorsTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideLeft";
      setTimeout(function () { document.getElementById("navColumn").style.visibility = "hidden"; }, 150);
      console.log("lookn ran");
    } else if (name == 'PreferencesTab') {
      document.getElementById("PreferencesTab").style.visibility = "visible";
      document.getElementById("PreferencesTab").style.width = "100%";
      document.getElementById("PreferencesBack").style.visibility = "visible";
      document.getElementById("PreferencesTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideLeft";
      setTimeout(function () { document.getElementById("navColumn").style.visibility = "hidden"; }, 150);
    } else if (name == 'AboutTab') {
      document.getElementById("AboutTab").style.visibility = "visible";
      document.getElementById("AboutTab").style.width = "100%";
      document.getElementById("AboutBack").style.visibility = "visible";
      document.getElementById("AboutTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideLeft";
      setTimeout(function () { document.getElementById("navColumn").style.visibility = "hidden"; }, 150);
    } else {
      console.log("nothing")
    }
  }
}
function SettingsBack(tab) {
  if (tab == "colorsTab") {
    document.getElementById("colorsBack").style.visibility = "hidden";
    if (window.innerWidth / window.innerHeight > 3 / 4) {
      document.getElementById("colorsTab").style.animation = null;
    } else {
      document.getElementById("colorsTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideRight";
      setTimeout(function () { document.getElementById("colorsTab").style.animation = null; document.getElementById("colorsTab").style.width = null; }, 150);
    }
    document.getElementById("navColumn").style.visibility = "visible";
  } else if (tab == "PreferencesTab") {
    document.getElementById("PreferencesBack").style.visibility = "hidden";
    if (window.innerWidth / window.innerHeight > 3 / 4) {
      document.getElementById("PreferencesTab").style.animation = null;
    } else {
      document.getElementById("PreferencesTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideRight";
      setTimeout(function () { document.getElementById("PreferencesTab").style.animation = null; document.getElementById("PreferencesTab").style.width = null; }, 150);
    }
    document.getElementById("navColumn").style.visibility = "visible";
  } else if (tab == "AboutTab") {
    document.getElementById("AboutBack").style.visibility = "hidden";
    if (window.innerWidth / window.innerHeight > 3 / 4) {
      document.getElementById("AboutTab").style.animation = null;
    } else {
      document.getElementById("AboutTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideRight";
      setTimeout(function () { document.getElementById("AboutTab").style.animation = null; document.getElementById("AboutTab").style.width = null; }, 150);
    }
    document.getElementById("navColumn").style.visibility = "visible";
  }
}
function settingExit() {
  localStorage.setItem('displayColor', document.getElementById("DisplayColorPicker").value);
  localStorage.setItem('funcColor', document.getElementById("FunctionsColorPicker").value);
  localStorage.setItem('numsColor', document.getElementById("NumbersColorPicker").value);
  if (document.getElementById('dropbtn').childNodes[0].nodeValue === "Black ") {
    localStorage.setItem('textColor', "#000000");
  } else {
    console.log('else ran');
    localStorage.setItem('textColor', "#FFFFFF");
  }
  document.location = 'Recursive.html';
}
function helpLoad() {
  
}
function openNewFunc() {
  if (document.getElementById('newFunctionsPage').style.animation == "0.25s ease-in 0s 1 normal forwards running toSlideLeft") {
    document.getElementById('newFunctionsPage').style.animation = "0.25s ease-in 0s 1 normal forwards running toSlideRight";
  } else {
    document.getElementById('newFunctionsPage').style.animation = "0.25s ease-in 0s 1 normal forwards running toSlideLeft";
    document.getElementById('newFunctionsPage').style.visibility = "visible";
  }
}
function backMoreFunction() {
  if (document.getElementById('newFunctionsPage').style.animation == "0.25s ease-in 0s 1 normal forwards running toSlideLeft") {
    document.getElementById('newFunctionsPage').style.animation = "0.25s ease-in 0s 1 normal forwards running toSlideRight";
    setTimeout(function () { document.getElementById('nameArea').value = ""; document.getElementById('equationArea').value = ""; document.getElementById('newFunctionsPage').style.visibility = "hidden"; }, 250);
  } else {
    document.location = 'Recursive.html';
  }
}
function updatePreview(event) {
  console.log(event.target.id)
  if (event.target.id == "DisplayColorPicker") {
    document.getElementById("displayPreview").style.backgroundColor = event.target.value;
  } else if (event.target.id == "NumbersColorPicker") {
    document.getElementById("numsPreview").style.backgroundColor = event.target.value;
  } else {
    document.getElementById("funcPreview").style.backgroundColor = event.target.value;
  }
}
function customFunctionPress() {
  document.getElementById('newFunctionsPage').style.animation = "0.25s ease-in 0s 1 normal forwards running toSlideRight";
  custButton(document.getElementById('equationArea').value, document.getElementById('nameArea').value, 'funcGrid', false);
  setTimeout(function () { document.getElementById('nameArea').value = ""; document.getElementById('equationArea').value = ""; document.getElementById('newFunctionsPage').style.visibility = "hidden"; }, 250);
}
function dropPressed(color) {
  console.log(document.getElementById('dropbtn').innerHTML);
  if (color == "Black") {
    document.getElementById("showcaseTextColor").style.color = "#000000";
    document.getElementById('dropbtn').innerHTML = "Black <h3 id='displayText' style='color: black;'>t</h3>";
  } else {
    document.getElementById("showcaseTextColor").style.color = "#FFFFFF";
    document.getElementById('dropbtn').innerHTML = "White <h3 id='displayText' style='color: white;'>t</h3>";
  }
}
//Method that creates the tab page
function newCustFuncTab(text) {
  let temp = document.getElementsByClassName("custFuncTabTemp")[0], clon = temp.content.cloneNode(true), exist = false, existing = document.getElementsByClassName("tabcontent");
  for (i = 1; i < existing.length; i++) {
    if (existing[i].querySelector('h3').innerHTML === text) {
      exist = true;
      break;
    }
  }
  if (!exist) {
    console.log(text)
    clon.getElementById('customFuncTab').dataset.tab = text;
    clon.getElementById("customValue").innerHTML = text;
    clon.getElementById("nameFunc").value = text.substring(0, text.indexOf("»"));
    let tab = clon.getElementById('customFuncTab');
    
    let currentTab = clon.getElementById('customFuncTab').dataset.tab;
    clon.getElementById('nameFunc').addEventListener("input", function (e) {
      console.log("Input")
      let tabsElements = document.getElementsByClassName('tablinks')
      let liveTab = e.target.parentNode;
      let currentTab = e.target.parentNode.dataset.tab;
      let matchPage = matchTab(currentTab, true);
      matchPage.innerHTML = "<h3>" + e.target.value + "</h3><img id='tabRemove' src='Images/xIcon.png' width='31.5px'>";
      matchPage.querySelector("IMG").addEventListener('click', function (e) { removeCustFunc(e); });
      localStorage.setItem(matchData(currentTab), e.target.value + currentTab.substring(currentTab.indexOf("»")));
      updateCustomButtons(currentTab, e.target.value + currentTab.substring(currentTab.indexOf("»")));
      matchPage.dataset.tabmap = e.target.value + currentTab.substring(currentTab.indexOf("»"));
      liveTab.dataset.tab = e.target.value + currentTab.substring(currentTab.indexOf("»"))
    });
    text = text.substring(text.indexOf("»") + 1).substring(0,text.indexOf("»"));
    text = text.substring(0,text.indexOf("»"));
    console.log("text is "+text);
    let varGrid = clon.getElementById("varGrid");
    let equationDIV = clon.getElementById("EquationFunc");
    let resultPane = clon.getElementById("modeSwitcher");
    let movable = clon.getElementById("selectorUnder");
    let funcTabs = [clon.getElementById('resultDiv'), clon.getElementById('graphDiv'), clon.getElementById('tableDiv')];
    movable.dataset.pos = 0;
    let backupClon = clon;
    clon.getElementById("EquationFunc").innerHTML = text;
    varGrid.addEventListener("change", function (e) {
      console.log("%c Vargid Changed", "color: red;");
    });
    clon.getElementById('functionMode').addEventListener("click", function () {
      console.log("function pressed");
      funcTabs[0].style.visibility = "inherit";
      hidModes(parseInt(movable.dataset.pos),funcTabs);
      animateModes(parseInt(movable.dataset.pos),0,movable);
    });
    clon.getElementById("graphMode").addEventListener("click", function () {
      console.log("graph pressed");
      console.log("Mode Changed  pos: " + movable.dataset.pos+" futPos: "+ 75);
      funcTabs[1].style.visibility = "inherit";
      hidModes(parseInt(movable.dataset.pos),funcTabs);
      animateModes(parseInt(movable.dataset.pos),75,movable);
    });
    clon.getElementById("tableMode").addEventListener("click", function () {
      console.log("table pressed");
      console.log("Mode Changed  pos: " + movable.dataset.pos+" futPos: "+ 150);
      funcTabs[2].style.visibility = "inherit";
      hidModes(parseInt(movable.dataset.pos),funcTabs);
      animateModes(parseInt(movable.dataset.pos),150,movable);
    });
    clon.getElementById("EquationFunc").addEventListener("focus", function (e) {
      let initEquation = e.target.parentNode.parentNode.dataset.tab;
      initEquation = initEquation.substring(initEquation.indexOf("»") + 1);
      initEquation = initEquation.substring(0, initEquation.indexOf("»"));
      console.log("Changed to initEquation "+initEquation);
      equationDIV.innerHTML = initEquation;
      setSelect(equationDIV, equationDIV.innerHTML.length);
    });
    clon.getElementById('EquationFunc').addEventListener("input", function (e) {
      console.log("Equation equals "+e.target.innerHTML)
      checkVar(e.target.innerHTML, varGrid, equationDIV);
      let liveTab = e.target.parentNode.parentNode;
      let currentTab = liveTab.dataset.tab;
      let matchPage = matchTab(currentTab, true);
      localStorage.setItem(matchData(currentTab), currentTab.substring(0, currentTab.indexOf("»") + 1) + e.target.innerHTML + "»");
      updateCustomButtons(currentTab, currentTab.substring(0, currentTab.indexOf("»") + 1) + e.target.innerHTML + "»");
      matchPage.dataset.tabmap = currentTab.substring(0, currentTab.indexOf("»") + 1) + e.target.innerHTML + "»";
      liveTab.dataset.tab = currentTab.substring(0, currentTab.indexOf("»") + 1) + e.target.innerHTML + "»";
    });
    let equation = text; 
    let equationArea = clon.getElementById('EquationFunc');
    document.getElementById("mainBody").appendChild(clon);
    findVar(equation, backupClon, varGrid, equationArea);
  }
}
function hidModes(num,tabs){
  if(num == 0){
    tabs[0].style.visibility = "hidden";
  }else if(num == 75){
    tabs[1].style.visibility = "hidden";
  }else if(num == 150){
    tabs[2].style.visibility = "hidden";
  }
}
function animateModes(from,to,element){
  console.log("Anmiate modes ran");
  if(from == 0 && to == 75){
    //0 to 75
    console.log("0 to 75")
    element.style.animation = undefined;
    element.style.animation = "0.15s ease-in 0s 0.5 normal forwards running modeSwitch";
    setTimeout(function () { element.style.left = "75px"; element.style.animation = undefined}, 150);
    element.dataset.pos = 75;
  }else if(from == 0 && to == 150){
    //0 to 150
    console.log("0 to 150")
    element.style.animation = undefined;
    element.style.animation = "0.15s ease-in 0s 1 normal forwards running modeSwitch"
    setTimeout(function () { element.style.left = "150px"; element.style.animation = undefined}, 150);
    element.dataset.pos = 150;
  }else if(from == 75 && to == 150){
    //75 to 150
    element.style.animation = undefined;
    element.style.animation = "0.15s ease-in 0s 1 normal forwards running sveBacSwitch"
    setTimeout(function () { element.style.left = "150px"; element.style.animation = undefined}, 150);
    element.dataset.pos = 150;
  }else if(from == 75 && to == 0){
    //75 to 0
    element.style.animation = undefined;
    element.style.animation = "0.15s ease-in 0s 1 normal forwards running sveForSwitch"
    setTimeout(function () { element.style.left = "0px"; element.style.animation = undefined}, 150);
    element.dataset.pos = 0;
  }else if(from == 150 && to == 75){
    //150 to 75
    element.style.animation = undefined;
    element.style.animation = "0.15s ease-in 0s 0.5 reverse forwards running modeSwitch"
    setTimeout(function () { element.style.left = "75px"; element.style.animation = undefined}, 150);
    element.dataset.pos = 75;
  }else if(from == 150 && to == 0){
    //150 to 0
    element.style.animation = undefined;
    element.style.animation = "0.15s ease-in 0s 1 reverse forwards running modeSwitch"
    setTimeout(function () { element.style.left = "0px"; element.style.animation = undefined}, 150);
    element.dataset.pos = 0;
  }else {
    console.log(same)
  }
}
//Takes a tab element and returns the variables in the tab with their data in json format
function parseVariables(element,parsedEquation){
  console.log("Parse Variables ran");
  let variables = element.getElementsByClassName("variableContainer");
  console.log(variables[0].querySelector('label'));
  let varData = "";
  for(i = 0; i < variables.length; i++){
    if(i != variables.length-1){
      varData += '"'+variables[i].querySelector('label').querySelector('h3').innerHTML+'":"'+variables[i].querySelector('label').querySelector('input').value+'",';
    }else{
      varData += '"'+variables[i].querySelector('label').querySelector('h3').innerHTML+'":"'+variables[i].querySelector('label').querySelector('input').value+'"';
    }
  }
  console.log(JSON.parse("{"+varData+"}"));
  return varData;
}
function parseEquation(element,parsedEquation){
  console.log("Parse Equation ran");
  let variables = element.getElementsByClassName("variableContainer");
  let varData = '"f":"'+parsedEquation+'",';
  for(i = 0; i < variables.length; i++){
    if(i != variables.length-1){
      varData += '"'+variables[i].querySelector('label').querySelector('h3').innerHTML+'":"'+variables[i].querySelector('label').querySelector('h3').innerHTML+'",';
    }else{
      varData += '"'+variables[i].querySelector('label').querySelector('h3').innerHTML+'":"'+variables[i].querySelector('label').querySelector('h3').innerHTML+'"';
    }
  }
  console.log(JSON.parse("{"+varData+"}"));
  return varData;
}
//Method that finds all instances of the defined function value in buttons and 
function updateCustomButtons(oldVal, newValue) {
  console.log('Old Val is ' + oldVal + " New Value is " + newValue);
  let functionLinks = document.getElementsByClassName('customFuncLinks');
  let Name = oldVal.substring(0, oldVal.indexOf('»'));
  oldVal = oldVal.substring(oldVal.indexOf('»') + 1);
  let Function = oldVal.substring(0, oldVal.indexOf('»'));
  let newName = newValue.substring(0, newValue.indexOf('»'));
  newValue = newValue.substring(newValue.indexOf('»') + 1);
  let newFunction = newValue.substring(0, newValue.indexOf('»'));
  console.log(newName + " and " + newFunction);
  for (let i = 0; i < functionLinks.length; i++) {
    console.log("Checking " + functionLinks[i].childNodes[1].data + " and " + functionLinks[i].childNodes[0].innerHTML);
    console.log(functionLinks[i].childNodes);
    if (functionLinks[i].childNodes[1].data == Name && functionLinks[i].childNodes[0].innerHTML == Function) {
      console.log("Matching Found");
      functionLinks[i].innerHTML = "<h2>" + newFunction + "</h2>" + newName;
      //functionLinks[i].data.
    }
  }
}
//Method To Match a tab button in the tab directory to its tab page
function matchTab(info, type) {
  let elements = [];
  if (type) {
    elements = document.getElementsByClassName('tablinks');
  } else {
    elements = document.getElementsByClassName('tabcontent');
  }
  for (let i = 0; i < elements.length; i++) {
    if (type) {
      if (elements[i].dataset.tabmap == info) {
        return elements[i];
      }
    } else {
      if (elements[i].dataset.tab == info) {
        return elements[i];
      }
    }
  }
}
//Matches Data of a tab with the recorded value then returns name of the recorded value
function matchData(info) {
  for (let i = 0; localStorage.getItem("Func" + i) != null; i++) {
    if (localStorage.getItem("Func" + i) == info) {
      console.log()
      return ("Func" + i);
    }
  }
  return null;
}
function checkVar(equation, varGrid,equationArea) {
  existingVars = varGrid.getElementsByClassName("variableContainer");
  console.log("Check Var Start");
  console.log('given equation '+equation)
  console.log(existingVars);
  let textValues = [];
  for (let j = 0; j < equation.length; j++) {
    if (equation.charCodeAt(j) > 92 && equation.charCodeAt(j) < 123) {
      if (isVar(equation.charAt(j), j, equation) == 0) {
        let exist = false;
        console.log("Index of Variable " + equation.charAt(j) + " : " + equation.indexOf(equation.charAt(j)));
        if (j != equation.indexOf(equation.charAt(j))) {
          exist = true;
        }
        if (!exist) {
          console.log(equation.charAt(j));
          textValues.push(equation.charAt(j));
        }
      } else {
        j += isVar(equation.charAt(j), j, equation) - 1;
      }
    }
  }
  let elementValues = [];
  for (let i = 0; i < existingVars.length; i++) {
    elementValues.push(existingVars[i].querySelector('h3').innerHTML);
  }
  sortedList = [];
  const duplatcated = textValues.slice();
  for (let i = 0; i < textValues.length; i++) {
    let matched = false;
    for (let j = 0; j < elementValues.length; j++) {
      if (textValues[i] == elementValues[j]) {
        textValues.splice(i, i + 1);
        elementValues.splice(j, j + 1)
        matched = true;
        i--;
        break;
      }
    }
    if (!matched) {
      let resulted = duplatcated.indexOf(textValues[i]);
      sortedList.push({ func: true, value: textValues[i], indexOf: resulted })
  }
  elementValues.forEach(function (value, index, array) {
    sortedList.push({ func: false, value: value, indexOf: index })
  });
  sortedList.forEach(function (valueList, index, array) {
    if (valueList.func == true) {
      let tempvar = document.getElementsByClassName("variableTemplate")[0];
      let varClon = tempvar.content.cloneNode(true);
      varClon.getElementById('variableName').innerHTML = valueList.value;
      varClon.getElementById('variableEntry').addEventListener('input', function (e) {
        if(varClon.getElementById('variableEntry') != ''){
            equationArea.innerHTML = equation;
            for(let i =0; i < varGrid.getElementsByClassName('variableContainer').length; i++){
              if(varGrid.getElementsByClassName('variableContainer')[i].querySelector('input').value != ''){
                equationArea.innerHTML = setVar(varGrid.getElementsByClassName('variableContainer')[i].querySelector('h3').innerHTML,varGrid.getElementsByClassName('variableContainer')[i].querySelector('input').value, equation);
              }
            }
            parseVariables(varGrid, equation);
          }
      });
      if (valueList.indexOf < varGrid.getElementsByClassName("variableContainer").length) {
        varGrid.insertBefore(varClon, varGrid.getElementsByClassName("variableContainer")[i - 1]);
      } else {
        varGrid.appendChild(varClon);
      }
    } else {
      let varElements = varGrid.getElementsByClassName('variableContainer');
      for (let i = 0; i < varElements.length; i++) {
        if (varElements[i].querySelector('h3').innerHTML == valueList.value) {
          varGrid.removeChild(varElements[i])
          break;
        }
      }
    }
  });
}
}
function findVar(equation, clon, varGrid, equationArea) {
  for (let i = 0; i < equation.length; i++) {
    if (equation.charCodeAt(i) > 92 && equation.charCodeAt(i) < 123) {
      if (isVar(equation.charAt(i), i, equation) === 0) {
        existingVars = varGrid.getElementsByClassName("variableContainer")
        varExists = false;
        for (var j = 0; j < existingVars.length; j++) {
          if (existingVars[j].querySelector('h3').innerHTML == equation.charAt(i)) {
            varExists = true;
          }
        }
        if (!varExists) {
          let tempvar = document.getElementsByClassName("variableTemplate")[0];
          let varClon = tempvar.content.cloneNode(true);
          varClon.getElementById('variableName').innerHTML = equation.charAt(i);
          varClon.getElementById('variableEntry').addEventListener('input', function (e) {
            equationArea.innerHTML = equation;
            let count = 0;
            let variableContainers = varGrid.getElementsByClassName('variableContainer');
            for(let i =0; i < variableContainers.length; i++){
              if(variableContainers[i].querySelector('input').value != ''){
                count++;
                equationArea.innerHTML = setVar(variableContainers[i].querySelector('h3').innerHTML,variableContainers[i].querySelector('input').value, equationArea.innerHTML);
              }
            }
            if(variableContainers.length -1 - count == 1){
              
            }
          });
          varGrid.appendChild(varClon)
        }
      } else {
        i += isVar(equation.charAt(i), i, equation) - 1;
      }
    }
  }
}
function isVar(entry, charPos, fullInput) {
  if (entry === 'e') {
    return 1;
  } else if (entry === 's') {
    if (containsValue(fullInput, "sin", charPos, charPos + 3)) {
      return 3;
    } else if (containsValue(fullInput, "sec", charPos, charPos + 3)) {
      return 3;
    }
  } else if (entry === 'c') {
    if (containsValue(fullInput, "cos", charPos, charPos + 3)) {
      return 3;
    } else if (containsValue(fullInput, "csc", charPos, charPos + 3)) {
      return 3;
    } else if (containsValue(fullInput, "cot", charPos, charPos + 3)) {
      return 3;
    }
  } else if (entry === 't') {
    if (containsValue(fullInput, "tan", charPos, charPos + 3)) {
      return 3;
    }
  } else if (entry === 'a') {
    if (containsValue(fullInput, "arcsin", charPos, charPos + 6)) {
      return 6;
    } else if (containsValue(fullInput, "arccos", charPos, charPos + 6)) {
      return 6;
    } else if (containsValue(fullInput, "arctan", charPos, charPos + 6)) {
      return 6;
    }
  } else if (entry === 'l') {
    if (containsValue(fullInput, "ln", charPos, charPos + 2)) {
      return 2;
    } else if (containsValue(fullInput, "log₁₀", charPos, charPos + 5)) {
      return 5;
    }
  }
  return 0;

}
function setVar(name,value, equation) {
  let varName = name;
  let varValue = value;
  for(let i = 0; i < equation.length; i++){
    if(equation.charAt(i) == varName){
      equation = equation.substring(0, i) + "(" + varValue + ")" + equation.substring(i + 1);
      break;
    }
  }
  return equation;
}
function containsValue(fullInput, checkValue, parPos, contain) {
  if (fullInput.length - 1 > contain - parPos && parPos >= 0) {
    if (fullInput.substring(parPos, contain) == checkValue) {
      return true;
    } else {
      return false;
    }

  } else {
    return false;
  }
}
function newTheme() {
  let numThemes = document.getElementsByClassName('theme').length - 3;
  let textColor;
  if (document.getElementById("dropbtn").innerHTML == "White <h3 id='displayText' style='color: white;'>t</h3>") {
    textColor = "#ffffff";
  } else {
    textColor = "#000000";
  }
  createTheme(document.getElementById("DisplayColorPicker").value, document.getElementById("NumbersColorPicker").value, document.getElementById("FunctionsColorPicker").value, textColor, "New Theme", true);
  let h3 = document.getElementsByClassName('theme')[document.getElementsByClassName('theme').length - 1].querySelector('h3');
  if (h3 != null) {
    let sel = window.getSelection();
    let range = document.createRange();
    range.setStart(h3.childNodes[0], h3.childNodes[0].nodeValue.length);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }
  document.getElementById('ThemesDiv').scrollLeft = document.getElementById('ThemesDiv').scrollWidth;
  localStorage.setItem('theme' + numThemes, document.getElementById("DisplayColorPicker").value + "»" + document.getElementById("NumbersColorPicker").value + "»" + document.getElementById("FunctionsColorPicker").value + "»" + textColor + "»" + "New Theme" + "»");
  numThemes++;
}
function createTheme(displayColor, numbersColor, functionsColor, textColor, themeName, editable) {
  let temp = document.getElementsByClassName("themeTemplate")[0];
  let clon = temp.content.cloneNode(true);
  let exist = false;
  let existing = document.getElementsByClassName("displayBaseThemeType");
  for (i = 0; i < existing.length; i++) {
    if (rgbToHex(existing[i].style.backgroundColor) == displayColor && rgbToHex(existing[i].getElementById("numsDisplayBase").style.backgroundColor) == numbersColor && rgbToHex(existing[i].getElementById("functionsDisplayBase").style.backgroundColor) == functionsColor && rgbToHex(existing[i].getElementById("textDisplayBase").style.color) == textColor) {
      exist = true;
      break;
    }
  }
  if (!exist) {
    clon.getElementById("themesDisplayBase").style.backgroundColor = displayColor;
    clon.getElementById("numsDisplayBase").style.backgroundColor = numbersColor;
    clon.getElementById("functionsDisplayBase").style.backgroundColor = functionsColor;
    clon.getElementById("textDisplayBase").style.color = textColor;
    clon.getElementById("themeName").innerHTML = themeName;
    clon.getElementById('themeRadio').addEventListener("click", function(e){themeRadioPressed(e.target)})
    clon.getElementById('removeButton').addEventListener("click", function(e){removeStoredTheme(e.target)});
    if (localStorage.getItem('textColor') == "#000000") {
      clon.getElementById("removeButton").src = "Images/xIcon.png";
    }
    let themes = document.getElementsByClassName('theme');
    if (themes.length > 4 && themes[4].querySelector('img').style.visibility == "visible") {
      clon.getElementById("removeButton").style.visibility = "visible";
    }
    clon.getElementById("themeName").setAttribute("contenteditable", editable);
    if (editable) {
      clon.getElementById("themeName").addEventListener('keyup', titleEdit);
    }
    document.getElementById("ThemesDiv").appendChild(clon);
  }
}
function themeRadioPressed(elem) {
  let tempRadio = document.getElementsByClassName('radio')
  for (let i = 0; i < tempRadio.length; i++) {
    if (tempRadio[i] != elem) {
      tempRadio[i].checked = false;
    }
  }
  let displayBase = elem.parentNode.parentNode.querySelector("div");
  let textBase = displayBase.childNodes[1];
  let numsBase = displayBase.childNodes[3];
  let funcsBase = displayBase.childNodes[5];
  console.log(displayBase.style.backgroundColor + " , " + textBase.style.color + " , " + numsBase.style.backgroundColor + " , " + funcsBase.style.backgroundColor);
  document.getElementById('DisplayColorPicker').value = rgbToHex(displayBase.style.backgroundColor);
  document.getElementById('displayPreview').style.backgroundColor = displayBase.style.backgroundColor;
  document.getElementById('NumbersColorPicker').value = rgbToHex(numsBase.style.backgroundColor);
  document.getElementById('numsPreview').style.backgroundColor = numsBase.style.backgroundColor;
  document.getElementById('FunctionsColorPicker').value = rgbToHex(funcsBase.style.backgroundColor);
  document.getElementById('funcPreview').style.backgroundColor = funcsBase.style.backgroundColor;
  if (rgbToHex(textBase.style.color) == "#000000") {
    document.getElementById('dropbtn').innerHTML = "Black <h3 id='displayText' style='color: black;'>t</h3>";
  } else {
    document.getElementById('dropbtn').innerHTML = "White <h3 id='displayText' style='color: white;'>t</h3>";
  }
  document.getElementById("showcaseTextColor").style.color = textBase.style.color;
}
function removeThemes() {
  let themes = document.getElementsByClassName('theme');
  if (themes[4].querySelector('img').style.visibility != "visible") {
    for (let i = 4; i < themes.length; i++) {
      themes[i].querySelector('img').style.visibility = "visible";
    }
  } else {
    for (let i = 4; i < themes.length; i++) {
      themes[i].querySelector('img').style.visibility = "hidden";
    }
  }
}
function removeStoredTheme(elem) {
  let nameBase = elem.parentNode.querySelector("h3");
  let displayBase = elem.parentNode.querySelector("div");
  let textBase = displayBase.childNodes[1];
  let numsBase = displayBase.childNodes[3];
  let funcsBase = displayBase.childNodes[5];
  let rawThemes = storedThemes();
  for (let j = 0; j < rawThemes.length; j++) {
    let found = true;
    try {
      console.log('theme' + (j + 1) + " vs. " + nameBase.innerHTML);
      themeRaw = rawThemes[j];
      let displayColor = themeRaw.substring(0, themeRaw.indexOf("»"));
      if (rgbToHex(displayBase.style.backgroundColor) != displayColor) {
        console.log("breaking at " + rgbToHex(displayBase.style.backgroundColor) + " vs " + displayColor);
        found = false;
      }
      themeRaw = themeRaw.substring(themeRaw.indexOf("»") + 1);
      let numsColor = themeRaw.substring(0, themeRaw.indexOf("»"));
      if (rgbToHex(numsBase.style.backgroundColor) != numsColor) {
        console.log("breaking at " + rgbToHex(numsBase.style.backgroundColor) + " vs " + numsColor);
        found = false;
      }
      themeRaw = themeRaw.substring(themeRaw.indexOf("»") + 1);
      let funcColor = themeRaw.substring(0, themeRaw.indexOf("»"));
      if (rgbToHex(funcsBase.style.backgroundColor) != funcColor) {
        console.log("breaking at " + rgbToHex(funcsBase.style.backgroundColor) + " vs " + funcColor);
        found = false;
      }
      themeRaw = themeRaw.substring(themeRaw.indexOf("»") + 1);
      let textColor = themeRaw.substring(0, themeRaw.indexOf("»"));
      if (rgbToHex(textBase.style.color) != textColor) {
        console.log("breaking at " + rgbToHex(textBase.style.color) + " vs " + textColor);
        found = false;
      }
      themeRaw = themeRaw.substring(themeRaw.indexOf("»") + 1);
      let themeName = themeRaw.substring(0, themeRaw.indexOf("»"));
      if (nameBase.innerHTML != themeName) {
        console.log("breaking at " + themeName);
        found = false;
      }
    } catch (err) {
      console.log(err);
      break;
    }
    if (found) {
      let rawextThemes = storedThemes();
      localStorage.removeItem("theme" + (j + 1));
      if (localStorage.getItem("theme" + (j + 2)) != null) {
        for (let k = j + 2; k != -1; k++) {
          if (localStorage.getItem("theme" + (k)) != null) {
            localStorage.setItem("theme" + (k - 1), localStorage.getItem("theme" + k));
            localStorage.removeItem("theme" + k);
          } else {
            break;
          }
        }
      }
      let themeContainer = elem.parentNode.parentNode;
      themeContainer.removeChild(elem.parentNode);
    }
  }

}
function titleEdit(e) {
  let rawThemes = storedThemes();
  console.log(e.target.parentNode);
  let displayBase = e.target.parentNode.querySelector("div");
  let textBase = displayBase.childNodes[1];
  let numsBase = displayBase.childNodes[3];
  let funcsBase = displayBase.childNodes[5];
  for (let j = 0; j < rawThemes.length; j++) {
    let found = true;
    try {
      themeRaw = rawThemes[j];
      let displayColor = themeRaw.substring(0, themeRaw.indexOf("»"));
      if (rgbToHex(displayBase.style.backgroundColor) != displayColor) {
        console.log("breaking at " + displayColor);
        found = false;
      }
      themeRaw = themeRaw.substring(themeRaw.indexOf("»") + 1);
      let numsColor = themeRaw.substring(0, themeRaw.indexOf("»"));
      if (rgbToHex(numsBase.style.backgroundColor) != numsColor) {
        console.log("breaking at " + numsColor);
        found = false;
      }
      themeRaw = themeRaw.substring(themeRaw.indexOf("»") + 1);
      let funcColor = themeRaw.substring(0, themeRaw.indexOf("»"));
      if (rgbToHex(funcsBase.style.backgroundColor) != funcColor) {
        console.log("breaking at " + funcColor);
        found = false;
      }
      themeRaw = themeRaw.substring(themeRaw.indexOf("»") + 1);
      let textColor = themeRaw.substring(0, themeRaw.indexOf("»"));
      if (rgbToHex(textBase.style.color) != textColor) {
        console.log("breaking at " + rgbToHex(textBase.style.color));
        found = false;
      }
    } catch (err) {
      console.log(err);
      break;
    }
    if (found) {
      let rawextThemes = storedThemes();
      let beforeValue = localStorage.getItem("theme" + (j + 1));
      let afterValue;
      for (let i = beforeValue.length - 1; i > 0; i--) {
        if (i == beforeValue.length - 1 && beforeValue.charAt(i) == "»") {
          console.log("This is start of parse " + beforeValue.substring(0, i))
        } else if (beforeValue.charAt(i) == "»") {
          afterValue = beforeValue.substring(0, i + 1) + e.target.innerHTML + "»";
          break;
        }
      }
      console.log(afterValue);
      localStorage.setItem("theme" + (j + 1), afterValue)
    }
  }
}
function storedThemes() {
  let custThemesRaw = [];
  for (let i = 1; i != -1; i++) {
    if (localStorage.getItem('theme' + i) != null) {
      custThemesRaw[i - 1] = localStorage.getItem('theme' + i);
    } else {
      break;
    }
  }
  console.log("Stored Themes are " + custThemesRaw);
  return custThemesRaw;
}
function helpTabChange(name) {
  var tabs = document.getElementsByClassName("settingTabContent");
  if (window.innerWidth / window.innerHeight > 3 / 4) {
    for (i = 0; i < tabs.length; i++) {
      tabs[i].style.visibility = "hidden";
    }
    if (name == 'mainCalculatorHelp') {
      document.getElementById("mainCalculatorHelp").style.visibility = "visible";
      console.log("lookn ran");
    } else if (name == 'customFuncHelp') {
      document.getElementById('customFuncHelp').style.visibility = "visible";
    } else if (name == 'settingsHelp') {
      document.getElementById('settingsHelp').style.visibility = "visible";
    } else {
      console.log("nothing")
    }
  } else {
    for (i = 0; i < tabs.length; i++) {
      tabs[i].style.visibility = "hidden";
    }
    if (name == 'mainCalculatorHelp') {
      document.getElementById("mainCalculatorHelp").style.visibility = "visible";
      document.getElementById("mainCalculatorHelp").style.width = "100%";
      document.getElementById("mainCalBack").style.visibility = "visible";
      document.getElementById("mainCalculatorHelp").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideLeft";
      setTimeout(function () { document.getElementById("navColumn").style.visibility = "hidden"; }, 150);
      console.log("lookn ran");
    } else if (name == 'customFuncHelp') {
      document.getElementById("customFuncHelp").style.visibility = "visible";
      document.getElementById("customFuncHelp").style.width = "100%";
      document.getElementById("customFuncBack").style.visibility = "visible";
      document.getElementById("customFuncHelp").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideLeft";
      setTimeout(function () { document.getElementById("navColumn").style.visibility = "hidden"; }, 150);
    } else if (name == 'settingsHelp') {
      document.getElementById("settingsHelp").style.visibility = "visible";
      document.getElementById("settingsHelp").style.width = "100%";
      document.getElementById("settingsBack").style.visibility = "visible";
      document.getElementById("settingsHelp").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideLeft";
      setTimeout(function () { document.getElementById("navColumn").style.visibility = "hidden"; }, 150);
    } else {
      console.log("nothing")
    }
  }
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(rgb) {
  let first = rgb.substring(rgb.indexOf('(') + 1, rgb.indexOf(','));
  console.log(first);
  rgb = rgb.substring(rgb.indexOf(', ') + 2);
  let second = rgb.substring(0, rgb.indexOf(','));
  rgb = rgb.substring(rgb.indexOf(', ') + 2);
  let thrid = rgb.substring(0, rgb.indexOf(')'));
  return "#" + componentToHex(Number(first)) + componentToHex(Number(second)) + componentToHex(Number(thrid));
}
