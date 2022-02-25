let TextColorGlobal = "";
let BackgroundColorGlobal = "";
console.log(window.innerHeight/window.innerWidth);
if(localStorage.getItem('funcColor') != undefined){
  BackgroundColorGlobal = localStorage.getItem('funcColor');
}else{
  BackgroundColorGlobal = "#000000";
}
var allMetaElements = document.getElementsByTagName('meta');
for (var i=0; i<allMetaElements.length; i++) { 
  if (allMetaElements[i].getAttribute("name") == "theme-color") { 
     allMetaElements[i].setAttribute('content', BackgroundColorGlobal); 
     break;
  } 
} 
if (document.getElementById("mainBody") != null) {
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
    document.getElementById('backspcaeIcon').src = "Images/backIcon.svg";
    let helpIcons = document.getElementsByClassName("helpIcon");
    for (let item of helpIcons) {
      item.src = "Images/help.svg";
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

  document.getElementById('uifCalculator').addEventListener("click", function (e) {
    if (e.target != document.getElementById('enterHeader')) {
      let enterheader = document.getElementById('enterHeader');
      let range = document.createRange();
      let sel = window.getSelection();
      if (enterheader.innerHTML.length == 0) {
        let textNode = document.createTextNode("‎");
        enterheader.appendChild(textNode);
      }
      range.setStart(enterheader.lastChild, enterheader.firstChild.data.length);
      range.collapse(true);
      sel.removeAllRanges()
      sel.addRange(range);
      document.getElementById("uifCalculator").scrollTop = document.getElementById("uifCalculator").scrollHeight;
    }
  });
  document.getElementById('historyHeader').innerHTML = localStorage.getItem("historyOut");
  document.getElementById("uifCalculator").scrollTop = document.getElementById("uifCalculator").scrollHeight;
  document.getElementById('mainTab').addEventListener("click", function (e) { openElement(document.getElementById('mainTab')) });
  document.getElementById('mobileTabs').addEventListener("click", function (e) { mobileTabMethod() });
  document.getElementById('settingsCogIcon').addEventListener("click", function () { sessionStorage.setItem("facing","settingsOut"); document.location = 'Settings.html' });
  document.getElementById('MRCOverlay').addEventListener("click", function () { 
    let enteredText = document.getElementById('enterHeader').innerHTML
    let mrmText = document.getElementById('memoryText').innerHTML;
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
      s: solveInpr(enteredText,true),
    })
    document.getElementById('memoryText').innerHTML = mySolver.solve({})["s"]; 
  });
  document.getElementById('leftOverlayNav').addEventListener("click", function () { navigateButtons(false) });
  document.getElementById('rightOverlayNav').addEventListener("click", function () { navigateButtons(true) });
  document.getElementById('num1').addEventListener("click", function () { frontButtonPressed('1'); console.log(window.devicePixelRatio);});
  document.getElementById('num2').addEventListener("click", function () { frontButtonPressed('2'); });
  document.getElementById('num3').addEventListener("click", function () { frontButtonPressed('3'); });
  document.getElementById('moreFunctionsButton').addEventListener("click", function () { document.location = 'moreFunctions.html'; });
  document.getElementById('arrowIcon').addEventListener("click", function () { popup(); preventFocus(); sessionStorage.setItem("facing", "mainPopup")});
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
  document.getElementById('enter').addEventListener("click", function () {enterPressed(document.getElementById('enterHeader').innerHTML)});
  document.getElementById('pow2').addEventListener("click", function () { pow('2'); });
  document.getElementById('sqrt').addEventListener("click", function () { frontButtonPressed('√'); });
  document.getElementById('divison').addEventListener("click", function () { frontButtonPressed('÷'); });
  document.getElementById('helpEx').addEventListener("click", function () { document.location = 'help.html'; sessionStorage.setItem("facing", "helpOut");});
  document.getElementById('functionEx').addEventListener("click", function () { 
    if(window.innerWidth / window.innerHeight > 3 / 4 && window.innerWidth / window.innerHeight < 2 / 1){
    document.getElementById('extendedFuncGrid').style.animation = "0.15s ease-in 0s 1 reverse forwards running fadeEffect";
    setTimeout(function () { document.getElementById('extendedFuncGrid').style.visibility = "hidden"; document.getElementById('extendedFuncGrid').style.animation = null; }, 150);
    document.getElementById('customFuncDisplay').style.animation = "0.15s ease-in 0s 1 normal forwards running slideFromSide";
    sessionStorage.setItem("facing", "mainFlip")
    }
   });
  document.getElementById('historyEx').addEventListener("click", function () { deleteHistory(); });
  document.getElementById('deciToFracEx').addEventListener("click", function () { frontButtonPressed('d→f('); });
  document.getElementById('absEx').addEventListener("click", function () { frontButtonPressed('|'); });
  document.getElementById('modEx').addEventListener("click", function () { frontButtonPressed('mod('); });
  document.getElementById('arcEx').addEventListener("click", function () { arcSwitch(); });
  document.getElementById('sinEx').addEventListener("click", function () { trigPressed('sin('); });
  document.getElementById('cosEx').addEventListener("click", function () { trigPressed('cos('); });
  document.getElementById('tanEx').addEventListener("click", function () { trigPressed('tan('); });
  document.getElementById('factorialEx').addEventListener("click", function () { frontButtonPressed('!'); });
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
    openPopup();
  });
  document.getElementById('minusFunctionEx').addEventListener("click", function () { console.log("Things" + document.getElementById("enterHeader").value); });
  document.getElementById('addIconPopup').addEventListener("click", function () {
    console.log("Icon Popup")
    openPopup();
  });
  document.getElementById('minusIconPopup').addEventListener("click", function () {});
  document.getElementById('functionPopup').addEventListener("click", function () { console.log("variables Fill In"); });
  document.getElementById('historyPopup').addEventListener("click", function () { deleteHistory(); });
  document.getElementById('deciToFracPopup').addEventListener("click", function () { frontButtonPressed('d→f('); });
  document.getElementById('helpPopup').addEventListener("click", function () { document.location = 'help.html'; sessionStorage.setItem("facing", "helpOut"); });
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

  document.getElementById('confirmNameEntry').addEventListener("click", function () {
    createFunc();
    document.getElementById('nameEntry').style.visibility = "hidden";
  });
  document.getElementById('exitNameEntry').addEventListener("click", function () {
    console.log("things");
    document.getElementById('nameEntry').style.visibility = "hidden";
    document.getElementById('nameEntry').style.animation = null;
    document.getElementById('nameEntryArea').value = "";
  });

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
  document.getElementById('minusIcon').addEventListener("click", function(){removeThemes()});
  document.getElementById('PreferencesBack').addEventListener("click", function(){SettingsBack('PreferencesTab')});
  document.getElementById('AboutBack').addEventListener("click", function(){SettingsBack('AboutTab')});
} else if (document.getElementById('helpBody') != null) {
  let rootCss = document.querySelector(':root');
  rootCss.style.setProperty('--displayColor', localStorage.getItem('displayColor'));
  rootCss.style.setProperty('--numbersColor', localStorage.getItem('numsColor'));
  rootCss.style.setProperty('--functionsColor', localStorage.getItem('funcColor'));
  rootCss.style.setProperty('--textColor', localStorage.getItem('textColor'));
  if(localStorage.getItem('textColor') == "#000000"){
    let addIcons = document.getElementsByClassName('backIcon');
    for (let item of addIcons) {
      item.src = "Images/MoreFuncArrow.svg";
    }
    document.getElementById('calcIcon').src = "Images/CalculatorIconWhite.svg";

    document.getElementById('funcsIcon').src = "Images/customFunctionIconWhite.svg";

    document.getElementById('setIcon').src = "Images/settingsPageIconWhite.svg";
  }
  document.getElementById('backButton').addEventListener("click", function(){document.location = 'Recursive.html';});
  document.getElementById('LooknFeel').addEventListener("click", function(){helpTabChange('mainCalculatorHelp')});
  document.getElementById('Preferences').addEventListener("click", function(){helpTabChange('customFuncHelp')});
  document.getElementById('About').addEventListener("click", function(){helpTabChange('settingsHelp')});
  document.getElementById('mainCalBack').addEventListener("click", function(){helpBack('mainCalculatorHelp');});
  document.getElementById('customFuncBack').addEventListener("click", function(){helpBack('customFuncHelp')});
  document.getElementById('settingsBack').addEventListener("click", function(){helpBack('settingsHelp')});
}
function createFunc(){
  let name = document.getElementById('nameEntryArea').value;
  let func = document.getElementById('enterHeader').innerHTML;
  if (!custFuncExisting(func, name, false)) {
    custButton(func, name, ['customFuncDisplayGrid', 'custFuncGridPopup']);
    localStorage.setItem(('Func' + numOfSaved()), name + "»" + func + "»");
  }
}
function openPopup(){
  console.log("open popup ran")
  sessionStorage.setItem("facing", "createNaming");
  document.getElementById('nameEntry').style.visibility = "visible";
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
let facingBack = [
  {
    "elm": "custFunc",
    "backElm": "",
    "prtCont": 'main',
    "mth": function(){
      openElement(document.getElementById('mainTab'))
    },
  },
  {
    "elm": "mainFlip",
    "backElm": "",
    "prtCont": 'main',
    "mth": function(){
      document.getElementById('customFuncDisplay').style.animation = null;
      document.getElementById('customFuncDisplay').style.animation = "0.15s ease-in 0s 1 normal reverse running slideFromSide";
      setTimeout(function(){
        document.getElementById('customFuncDisplay').style = undefined;
        document.getElementById('extendedFuncGrid').style = undefined;

      }, 150);
      document.getElementById('extendedFuncGrid').style.animation = "0.15s ease-in 0s 1 normal reverse running slideFromSide";
    },
  },
  {
    "elm": "mainPopup",
    "backElm": "",
    "prtCont": 'main',
    "mth": function(){
      popup(); preventFocus();
    },
  },
  {
    "elm": "createNaming",
    "backElm": "",
    "prtCont": 'main',
    "mth": function(){
      document.getElementById('nameEntry').style.visibility = "hidden";
      document.getElementById('nameEntry').style.animation = null;
      document.getElementById('nameEntryArea').value = "";
    }
  },
  {
    "elm": "settingsOut",
    "backElm": "",
    "prtCont": 'settings',
    "mth": function(){
      settingExit()
    }
  },
  {
    "elm": "themePageOut",
    "backElm": "settingsOut",
    "prtCont": 'settings',
    "mth": function(){
      SettingsBack('colorsTab');
    }
  },
  {
    "elm": "prefPageOut",
    "backElm": "settingsOut",
    "prtCont": 'settings',
    "mth": function(){
      SettingsBack('PreferencesTab');
    }
  },
  {
    "elm": "aboutPageOut",
    "backElm": "settingsOut",
    "prtCont": 'settings',
    "mth": function(){
      SettingsBack('AboutTab');
    }
  },
  {
    "elm": "helpOut",
    "backElm": "",
    "prtCont": 'help',
    "mth": function(){
      document.location = 'Recursive.html';
    }
  },
  {
    "elm": "mainCalculatorHelp",
    "backElm": "helpOut",
    "prtCont": 'help',
    "mth": function(){
      helpBack('mainCalculatorHelp')
    }
  },
  {
    "elm": "customFuncHelp",
    "backElm": "helpOut",
    "prtCont": 'help',
    "mth": function(){
      helpBack('customFuncHelp')
    }
  },
  {
    "elm": "settingsHelp",
    "backElm": "helpOut",
    "prtCont": 'help',
    "mth": function(){
      helpBack('settingsHelp')
    }
  }
];
function universalBack() {
  let page = document.getElementById('body').id;
  let currentElement = sessionStorage.getItem("facing");
  for(let elem of facingBack) {
    if (elem.elm == currentElement) {
      elem.mth();
      sessionStorage.setItem("facing", elem.backElm);
      break;
    }
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
    let childNodes = sel.focusNode.parentNode.parentNode.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      if (childNodes[i] == sel.focusNode.parentNode) {
        range.setStart(childNodes[i - 1], childNodes[i - 1].nodeValue.length)
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
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
}
function pow(type) {
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
  for (let i = 0; i < display.childNodes.length; i++) {
    if (sel.focusNode == display.childNodes[i]) {
      index = i;
      break;
    }
  }
  let backend = sel.focusNode.nodeValue.substring(higher);
  sel.focusNode.nodeValue = sel.focusNode.nodeValue.substring(0, lower);
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
  window.addEventListener('keydown', keepBlank);
  display.insertBefore(superSr, display.childNodes[index + 1]);
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
  if (eve.keyCode == 8 && (sel.focusNode.nodeValue.substring(lower, higher).includes('‎') || sel.focusNode.nodeValue == '‎') && sel.focusNode.parentNode == document.getElementById('enterHeader')) {
    eve.preventDefault();
    let childNodes = document.getElementById('enterHeader').childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      if (childNodes[i] == sel.focusNode) {
        range.setStart(childNodes[i - 1].childNodes[0], childNodes[i - 1].childNodes[0].nodeValue.length)
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
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
  if (sel.focusNode.parentNode.tagName == 'SUP') {
    parentElement = sel.focusNode.parentNode.parentNode;
    isSup = true;
  } else {
    parentElement = sel.focusNode.parentNode;
  }
  let childNodes = parentElement.childNodes;
  if (!direction) {
    if (lower == 0 || sel.focusNode.nodeValue.charAt(lower - 1) == '‎') {
      for (let i = 0; i < childNodes.length; i++) {
        if ((isSup && sel.focusNode.parentNode == childNodes[i]) || sel.focusNode == childNodes[i]) {
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
  let temp = document.getElementsByClassName("customFuncTemplate")[0], clon = temp.content.cloneNode(true);
  clon.getElementById("customFuncButton").innerHTML = "<h2>" + equation + "</h2>" + name;
  for (let i = 0; i < target.length; i++) {
    let clonClone = clon.cloneNode(true);
    let buttonNode = clonClone.getElementById("customFuncButton");
    buttonNode.addEventListener('click', function (e) {
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
        tabClon.getElementById('newTabName').innerHTML =   name;
        tabClon.getElementById('tabButton').dataset.tabmap = name + "»" + equation + "»";
        if(TextColorGlobal == "#000000"){
          tabClon.getElementById('tabRemove').src = "Images/xIcon.svg";
        }
        let highlight = tabClon.getElementById('tabButton');
        tabClon.getElementById('tabButton').addEventListener("click", function (e) {
          if(window.innerWidth / window.innerHeight > 3/4){
            if (e.target != highlight.querySelector("IMG")) {
              openElement(highlight)
              sessionStorage.setItem("facing", "custFunc");
            }
          }else {
            
          }
        });
        tabClon.getElementById('tabRemove').addEventListener('click', function (e) {
          removeCustFunc(e);
        })
        document.getElementById('tabContainer').appendChild(tabClon);
        highlightTab(highlight);
      }
    });
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
  let tabLink = event.target.parentNode;
  console.log(tabLink.parentNode);
  document.getElementById('mainBody').removeChild(matchTab(tabLink.dataset.tabmap, false));
  document.getElementById('tabContainer').removeChild(tabLink);
  openElement(document.getElementById('mainTab'));
}
function tabOpen(intialize) {
  let tabs = document.getElementsByClassName('tablinks')

  for (let i = 1; i < tabs.length; i++) {

    if (intialize == tabs[i].dataset.tabmap) {
      return true;
    }
  }
  return false;
}
function enterPressed(input) {
  let display = document.getElementById('enterHeader');
  historyMethod(input);
  input = solveInpr(input,true);
  console.log("Equation after interpeter " + input);
  var mySolver = new Solver({
    s: input,
  })
  display.innerHTML = mySolver.solve({})["s"];
  document.getElementById('uifCalculator').scrollTop = document.getElementById('uifCalculator').scrollHeight;
  setSelect(display.childNodes[display.childNodes.length - 1], display.childNodes[display.childNodes.length - 1].length);
}
function historyMethod(equation) {
  let historyHeader = document.getElementById('historyHeader');
  let interpetedEquat = solveInpr(equation,true);
  console.log("%cEquation after interpeter " + interpetedEquat, "color: #00ff00");
  var mySolver = new Solver({
    s: interpetedEquat,
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
  let evtElement = evt;
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
    document.getElementById('arrowIcon').style.animation = "0.25s ease-in 0s 1 normal forwards running toDown";
    document.getElementById('extraFuncPopUp').style.animation = "0.25s ease-in 0s 1 normal forwards running toSlideDown";
    setTimeout(donothing, 500);
    document.getElementById('arrowIcon').style.transform = 'rotate(90deg);';
  } else {
    document.getElementById('arrowIcon').style.animation = "0.25s ease-in 0s 1 normal forwards running toUp";
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
      sessionStorage.setItem("facing", "themePageOut"); 
    } else if (name == 'PreferencesTab') {
      document.getElementById("PreferencesTab").style.visibility = "visible";
      document.getElementById("PreferencesTab").style.width = "100%";
      document.getElementById("PreferencesBack").style.visibility = "visible";
      document.getElementById("PreferencesTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideLeft";
      setTimeout(function () { document.getElementById("navColumn").style.visibility = "hidden"; }, 150);
      sessionStorage.setItem("facing", "prefPageOut");
    } else if (name == 'AboutTab') {
      document.getElementById("AboutTab").style.visibility = "visible";
      document.getElementById("AboutTab").style.width = "100%";
      document.getElementById("AboutBack").style.visibility = "visible";
      document.getElementById("AboutTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideLeft";
      setTimeout(function () { document.getElementById("navColumn").style.visibility = "hidden"; }, 150);
      sessionStorage.setItem("facing", "aboutPageOut");
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
      document.getElementById('colorsTab').style.width = undefined;
    } else {
      document.getElementById("colorsTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideRight";
      setTimeout(function () { document.getElementById("colorsTab").style = undefined; }, 150);
    }
    document.getElementById("navColumn").style.visibility = "visible";
  } else if (tab == "PreferencesTab") {
    document.getElementById("PreferencesBack").style.visibility = "hidden";
    if (window.innerWidth / window.innerHeight > 3 / 4) {
      document.getElementById("PreferencesTab").style.animation = null;
    } else {
      document.getElementById("PreferencesTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideRight";
      setTimeout(function () { document.getElementById("PreferencesTab").style = undefined; }, 150);
    }
    document.getElementById("navColumn").style.visibility = "visible";
  } else if (tab == "AboutTab") {
    document.getElementById("AboutBack").style.visibility = "hidden";
    if (window.innerWidth / window.innerHeight > 3 / 4) {
      document.getElementById("AboutTab").style.animation = null;
    } else {
      document.getElementById("AboutTab").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideRight";
      setTimeout(function () { document.getElementById("AboutTab").style = undefined; }, 150);
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
    let funcINIT = text;
    let name = text.substring(0, text.indexOf("»"));
    text = text.substring(text.indexOf("»") + 1);
    equation = text.substring(0,text.indexOf("»"));
    clon.getElementById('customFuncTab').dataset.tab = funcINIT;
    clon.getElementById("customValue").innerHTML = funcINIT;
    clon.getElementById("nameFunc").value = name;
    let tab = clon.getElementById('customFuncTab');
    
    let currentTab = clon.getElementById('customFuncTab').dataset.tab;
    clon.getElementById('nameFunc').addEventListener("input", function (e) {
      let tabsElements = document.getElementsByClassName('tablinks')
      let liveTab = e.target.parentNode;
      let currentTab = e.target.parentNode.dataset.tab;
      let matchPage = matchTab(currentTab, true);
      matchPage.innerHTML = "<h3>" + e.target.value + "</h3><img id='tabRemove' src='Images/xIcon.svg' width='31.5px'>";
      matchPage.querySelector("IMG").addEventListener('click', function (e) { removeCustFunc(e); });
      localStorage.setItem(matchData(currentTab), e.target.value + currentTab.substring(currentTab.indexOf("»")));
      updateCustomButtons(currentTab, e.target.value + currentTab.substring(currentTab.indexOf("»")));
      matchPage.dataset.tabmap = e.target.value + currentTab.substring(currentTab.indexOf("»"));
      liveTab.dataset.tab = e.target.value + currentTab.substring(currentTab.indexOf("»"))
    });
    let varGrid = clon.getElementById("varGrid");
    let equationDIV = clon.getElementById("EquationFunc");
    let movable = clon.getElementById("selectorUnder");
    let funcTabs = [clon.getElementById('resultDiv'), clon.getElementById('graphDiv'), clon.getElementById('tableDiv')];
    movable.dataset.pos = 0;
    let backupClon = clon;
    console.log("Equation given to the function: " + equation);
    clon.getElementById("EquationFunc").innerHTML = equation;
    clon.getElementById("EquationFunc").dataset.baseE = equation;
    varGrid.addEventListener("change", function (e) {
      console.log("%c Vargid Changed", "color: red;");
    });
    clon.getElementById('functionMode').addEventListener("click", function () {
      funcTabs[0].style.visibility = "inherit";
      hidModes(parseInt(movable.dataset.pos),funcTabs);
      animateModes(parseInt(movable.dataset.pos),0,movable);
    });
    clon.getElementById("graphMode").addEventListener("click", function () {
      console.log("Mode Changed  pos: " + movable.dataset.pos+" futPos: "+ 75);
      funcTabs[1].style.visibility = "inherit";
      hidModes(parseInt(movable.dataset.pos),funcTabs);
      animateModes(parseInt(movable.dataset.pos),75,movable);
    });
    clon.getElementById("tableMode").addEventListener("click", function () {
      console.log("Mode Changed  pos: " + movable.dataset.pos+" futPos: "+ 150);
      funcTabs[2].style.visibility = "inherit";
      hidModes(parseInt(movable.dataset.pos),funcTabs);
      animateModes(parseInt(movable.dataset.pos),150,movable);
    });
    clon.getElementById("EquationFunc").addEventListener("focus", function (e) {
      let initEquation = e.target.parentNode.parentNode.dataset.tab;
      initEquation = initEquation.substring(initEquation.indexOf("»") + 1);
      initEquation = initEquation.substring(0, initEquation.indexOf("»"));
      equationDIV.innerHTML = initEquation;
      setSelect(equationDIV, equationDIV.innerHTML.length);
    });
    clon.getElementById('EquationFunc').addEventListener("input", function (e) {
      checkVar(varGrid, equationDIV,funcTabs);
      let liveTab = e.target.parentNode.parentNode;
      let currentTab = liveTab.dataset.tab;
      let matchPage = matchTab(currentTab, true);
      equationDIV.dataset.baseE = equationDIV.innerHTML;
      localStorage.setItem(matchData(currentTab), currentTab.substring(0, currentTab.indexOf("»") + 1) + e.target.innerHTML + "»");
      updateCustomButtons(currentTab, currentTab.substring(0, currentTab.indexOf("»") + 1) + e.target.innerHTML + "»");
      matchPage.dataset.tabmap = currentTab.substring(0, currentTab.indexOf("»") + 1) + e.target.innerHTML + "»";
      liveTab.dataset.tab = currentTab.substring(0, currentTab.indexOf("»") + 1) + e.target.innerHTML + "»";
    });
    let equationArea = clon.getElementById('EquationFunc');
    document.getElementById("mainBody").appendChild(clon);
    checkVar(varGrid, equationDIV,funcTabs);
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
  if(from == 0 && to == 75){
    //0 to 75
    element.style.animation = undefined;
    element.style.animation = "0.15s ease-in 0s 0.5 normal forwards running modeSwitch";
    setTimeout(function () { element.style.left = "75px"; element.style.animation = undefined}, 150);
    element.dataset.pos = 75;
  }else if(from == 0 && to == 150){
    //0 to 150
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
function varListAssbely(element){
  let variables = element.getElementsByClassName("variableContainer");
  let varData = [];
  for(i = 0; i < variables.length; i++){
    let temp = {
      "Name": variables[i].querySelector('h3').innerHTML,
      "Value":variables[i].querySelector('input').value
  };
    varData.push(temp);
  }
  console.log("retruned Variable list")
  console.log(varData)
  return varData;
}
//Takes a tab element and returns the variables in the tab with their data in json format
function parseVariables(element,equationDIV, funcTabs){
  console.log("Parse Variables ran");
  let varData = varListAssbely(element);
  let parsedEquation = equationDIV.dataset.baseE
  console.log("%c parsedEquation: "+parsedEquation,"color:red");
  let all = true;
  for(let Vars of varData){
    if(Vars.Value == ''){
      all = false;
    }
  }
  if(all){
    for(let data of varData){
      for(let i = 0; i < parsedEquation.length; i++){
        if(funcMatch(parsedEquation.substring(i)) != ""){
          i += funcMatch(parsedEquation.substring(i)).length;
        }else if(parsedEquation.charAt(i) == data.Name){
          parsedEquation = parsedEquation.substring(0,i) + "("+data.Value+")" + parsedEquation.substring(i+1);
        }
      }
    }
    let fullyParsed = solveInpr(parsedEquation,true);
    console.log("%c parsedEquation post op: "+fullyParsed,"color:green");
    var mySolver = new Solver({
      s: fullyParsed,
    })
    let result = "="+mySolver.solve({})["s"];
    console.log("%c result: "+result,"color:green");
    funcTabs[0].childNodes[1].innerHTML = result; 
    console.log(funcTabs[0].childNodes[1]);
  }
}
/*function parseEquation(element,parsedEquation){
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
}*/
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
function checkVar(varGrid,equationArea,funcTabs) {
  let tabVarContainers = varGrid.getElementsByClassName("variableContainer");
  let varExisting = [];
  let equation = equationArea.innerHTML;
  for(let cont of tabVarContainers){
    let name = cont.querySelector('h3').innerHTML;
    varExisting.push({
      "name":name,
      "element":cont
    });
  }
  let varEquation = varInEquat(equationArea.innerHTML);
  let newVars = [];
  for(let eVar of varEquation){
    matching = false;
    for(let cVar of varExisting){
      if(eVar == cVar.name){
        let indexOfVar = varExisting.indexOf(cVar);
        varExisting.splice(indexOfVar, 1);
        matching = true;
        break;
      }
    }
    if(!matching){
      newVars.push(eVar);
    }
  }
  for(let oldVar of varExisting){
    varGrid.removeChild(oldVar.element);
  }
  for(let newVar of newVars){
    newVariable(newVar,varGrid,equationArea,funcTabs,equation);
  }
}
function newVariable(name, varGrid,equationArea,funcTabs,equation){
  let tempvar = document.getElementsByClassName("variableTemplate")[0];
  let varClon = tempvar.content.cloneNode(true);
  varClon.getElementById('variableName').innerHTML = name;
  varClon.getElementById('variableEntry').addEventListener('input', function (e) {
  if(varClon.getElementById('variableEntry') != ''){
    equationArea.innerHTML = setVar(varGrid, equationArea.dataset.baseE);
    parseVariables(varGrid, equationArea,funcTabs);
  }
  });
  varGrid.appendChild(varClon)
}
function varInEquat(equation){
  let varArray = [];
  for(let i = 0; i < equation.length; i++){
    if (equation.charCodeAt(i) > 92 && equation.charCodeAt(i) < 123) {
      if(isVar(equation.substring(i)) === 0){
        if(!varArray.includes(equation.substring(i,i+1))){
          varArray.push(equation.substring(i,i+1));
        }
      }else {
        i += isVar(equation.substring(i));
      }
    }
  }
  console.log("VarInEquat equtaion: " + equation);

  console.log(varArray);
  return varArray;
}
/*function findVar(equation, clon, varGrid, equationArea,funcTabs) {
  console.log("Find Var Start");
  for (let i = 0; i < equation.length; i++) {
    if (equation.charCodeAt(i) > 92 && equation.charCodeAt(i) < 123) {
      if (isVar(equation.substring(i)) === 0) {
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
            if(varClon.getElementById('variableEntry') != ''){
              clon.getElementById('EquationFunc').innerHTML = setVar(varGrid, equation);
              parseVariables(varGrid, equation,funcTabs);
            }
          });
          varGrid.appendChild(varClon)
        }
      } else {
        i += isVar(equation.substring(i)) - 1;
      }
    }
  }
}*/
function isVar(entry) {
  console.log("%cIs Var Start", "color: green");
  let func = funcMatch(entry);
  if(func != ""){
    if(getByName(func) != null){
      let object = getByName(func);
      console.log("Object: " + object.name);
      return object.funcLength;
    }else {
      console.log(func)
      return func.length
    }
  }else{
    return 0;
  }
}
function setVar(element, equation) {
  console.log("Parse Variables ran");
  let varData = varListAssbely(element);
  console.log("%c parsedEquation: "+equation,"color:red");
  for(let data of varData){
    for(let i = 0; i < equation.length; i++){
      if(funcMatch(equation.substring(i)) != ""){
          i += funcMatch(equation.substring(i)).length;
      }else if(equation.charAt(i) == data.Name){
        if(data.Value != ""){
          equation = equation.substring(0,i) + "("+data.Value+")" + equation.substring(i+1);
        }
      }
    }
  }
  
  console.log(varData)
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
      clon.getElementById("removeButton").src = "Images/xIcon.svg";
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
      sessionStorage.setItem("facing", "mainCalculatorHelp");
      console.log("lookn ran");
    } else if (name == 'customFuncHelp') {
      document.getElementById("customFuncHelp").style.visibility = "visible";
      document.getElementById("customFuncHelp").style.width = "100%";
      document.getElementById("customFuncBack").style.visibility = "visible";
      document.getElementById("customFuncHelp").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideLeft";
      setTimeout(function () { document.getElementById("navColumn").style.visibility = "hidden"; }, 150);
      sessionStorage.setItem("facing", "customFuncHelp");
    } else if (name == 'settingsHelp') {
      document.getElementById("settingsHelp").style.visibility = "visible";
      document.getElementById("settingsHelp").style.width = "100%";
      document.getElementById("settingsBack").style.visibility = "visible";
      document.getElementById("settingsHelp").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideLeft";
      setTimeout(function () { document.getElementById("navColumn").style.visibility = "hidden"; }, 150);
      sessionStorage.setItem("facing", "settingsHelp");
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
function helpBack(tab) {
  if (tab == "mainCalculatorHelp") {
    document.getElementById("mainCalBack").style.visibility = "hidden";
    if (window.innerWidth / window.innerHeight > 3 / 4) {
      document.getElementById("mainCalculatorHelp").style.animation = null;
    } else {
      document.getElementById("mainCalculatorHelp").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideRight";
      setTimeout(function () { document.getElementById("mainCalculatorHelp").style.animation = null; document.getElementById("mainCalculatorHelp").style.width = null; }, 150);
    }
    document.getElementById("navColumn").style.visibility = "visible";
  } else if (tab == "customFuncHelp") {
    document.getElementById("customFuncBack").style.visibility = "hidden";
    if (window.innerWidth / window.innerHeight > 3 / 4) {
      document.getElementById("customFuncHelp").style.animation = null;
    } else {
      document.getElementById("customFuncHelp").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideRight";
      setTimeout(function () { document.getElementById("customFuncHelp").style.animation = null; document.getElementById("customFuncHelp").style.width = null; }, 150);
    }
    document.getElementById("navColumn").style.visibility = "visible";
  } else if (tab == "settingsHelp") {
    document.getElementById("settingsBack").style.visibility = "hidden";
    if (window.innerWidth / window.innerHeight > 3 / 4) {
      document.getElementById("settingsHelp").style.animation = null;
    } else {
      document.getElementById("settingsHelp").style.animation = "0.15s ease-in 0s 1 normal forwards running toSlideRight";
      setTimeout(function () { document.getElementById("settingsHelp").style.animation = null; document.getElementById("settingsHelp").style.width = null; }, 150);
    }
    document.getElementById("navColumn").style.visibility = "visible";
  }
}
function mobileTabMethod(){
  document.getElementById("tab").style = "display: block; height:100%;";
  let tabs = document.getElementsByClassName('tabcontent');
  let tablinks = document.getElementsByClassName('tablinks');
  for(let tab of tabs){
    tab.style.visibility = "hidden";
  }
  for(let tablink of tablinks){
    tablink.style = "visibility: visible; left: 5%; width: 90%; height: 90%; border-radius: 20px; text-align: center;";
    var clon;
    if(tablink.dataset.tabmap == "mainTab"){
      
    }else{
      console.log("Tabmap is "+ tablink.dataset.tabmap);
      let parse = tablink.dataset.tabmap;
      parse = parse.substring(parse.indexOf('»') + 1);
      parse = parse.substring(0, parse.indexOf('»'));
      
    }
    
  }
  document.getElementById('tabContainer').style = "display: grid; grid-template-columns: 50% 50%; grid-auto-rows: 300px; position: absolute; visibility: visible; top: 50px; bottom: 0; width: 100%; height: 100%; background-color: var(--translucent); border-radius: 25px 25px 0 0;";
}