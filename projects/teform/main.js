var uverbs = [["いく", "行く"], ["きく", "聞く"], ["かく", "書く"], ["はく", "はく"], ["もっていく", "持って行く"], ["ひく", "弾く"], ["はたらく", "働く"], ["あるく", "歩く"], ["なく", "泣く"], ["みがく", "磨く"], ["かえる", "帰る"], ["ある", "ある"], ["とる", "撮る"], ["わかる", "わかる"], ["のる", "乗る"], ["やる", "やる"], ["すわる", "座る"], ["はいる", "入る"], ["かぶる", "かぶる"], ["しる", "知る"], ["のむ", "飲む"], ["よむ", "読む"], ["やすむ", "休む"], ["すむ", "住む"], ["あむ", "編む"], ["おちこむ", "落ち込む"], ["たのむ", "頼む"], ["つつむ", "包む"], ["ぬすむ", "盗む"], ["ふむ", "踏む"], ["はなす", "話す"], ["かえす", "返す"], ["けす", "消す"], ["なくす", "なくす"], ["かす", "貸す"], ["おろす", "下ろす"], ["さがす", "探す"], ["おこす", "起こす"], ["だす", "出す"], ["なおす", "直す"], ["あう", "会う"], ["かう", "買う"], ["すう", "吸う"], ["つかう", "使う"], ["てつだう", "手伝う"], ["うたう", "歌う"], ["あらう", "洗う"], ["いう", "言う"], ["おもう", "思う"], ["もらう", "もらう"], ["まつ", "待つ"], ["たつ", "立つ"], ["もつ", "持つ"], ["かつ", "勝つ"], ["うつ", "打つ"], ["そだつ", "育つ"], ["めだつ", "目立つ"], ["うけもつ", "受け持つ"], ["およぐ", "泳ぐ"], ["いそぐ", "急ぐ"], ["ぬぐ", "脱ぐ"], ["さわぐ", "騒ぐ"], ["そそぐ", "注ぐ"], ["かせぐ", "稼ぐ"], ["つなぐ", "繋ぐ"], ["ふせぐ", "防ぐ"], ["あそぶ", "遊ぶ"], ["えらぶ", "選ぶ"], ["ころぶ", "転ぶ"], ["はこぶ", "運ぶ"], ["よぶ", "呼ぶ"], ["とぶ", "飛ぶ"], ["ならぶ", "並ぶ"], ["よろこぶ", "喜ぶ"], ["むすぶ", "結ぶ"], ["まなぶ", "学ぶ"], ["しぬ", "死ぬ"]]
var ruverbs = [["おきる", "起きる"], ["たべる", "食べる"], ["ねる", "寝る"], ["みる", "見る"], ["いる", "いる"], ["でかける", "出かける"], ["あける", "開ける"], ["おしえる", "教える"], ["おりる", "おりる"], ["かりる", "借りる"]];
var irrverbs = [["する", "する"], ["くる", "来る"]];

function newWord() {
	do {
		randNum = Math.floor(Math.random() * (uCount + ruCount + irrCount));
		if (randNum < uCount) {
			type = "u";
			var word = uverbs[randNum];
		} else if (randNum >= uCount && randNum < (uCount + ruCount)) {
			type = "ru";
			var word = ruverbs[randNum - uCount];
		} else {
			type = "irr";
			var word = irrverbs[randNum - uCount - ruCount];
		}
	} while (lastword == word) // Prevents same word from appearing twice in a row

	lastword = word;

	if (type == "u") {
		typeElem.innerHTML = "う-Verb";
		if (word[0] == "いく") {
			typeElem.innerHTML += " (Exception)";
		}
	}
	else if (type == "ru") {typeElem.innerHTML = "る-Verb";}
	else {typeElem.innerHTML = "Irregular";}

	answer = teForm(word[0], type)

	// Show Kanji if Setting is Checked
	if (kanji) {wordElem.innerHTML = word[1];}
	else {wordElem.innerHTML = word[0];}

	kanjiSetting.onchange = function() {
		if (kanjiSetting.checked) {
			kanji = true;
			wordElem.innerHTML = word[1];
		} else {
			kanji = false;
			wordElem.innerHTML = word[0];
		}
	}
}

function teForm(word, type) {
	stem = word.substring(0, word.length - 1);
	if(type == "u") {
		lastchar = word[word.length - 1];
		switch (lastchar) {
		    case "う":
		    case "つ":
		    case "る":
				return stem += "って";
			case "む":
			case "ぶ":
			case "ぬ":
				return stem += "んで";
			case "く":
				if (word == "いく") {return "いって"}
				if (word == "もっていく") {return "もっていって"}
				return stem += "いて";
			case "ぐ":
				return stem += "いで";
			case "す":
				return stem += "して";
			default:
				return "Error";
		}
	}
	else if (type == "ru") {return stem += "て";} //Ru-verbs
	else {
		console.log(word);
		if (word == "する") {return "して";}
		else if (word == "くる") {return "きて";}
	}
}

function checkAnswer(answer) {
	if (userInput.value == "" || !wanakana.isHiragana(userInput.value) || wait) {
		if ($("#input-IME").is(':animated') == false) {
			$("#input-IME").effect("shake");
		}
		return; // Only accept Hiragana answer
	}
	if (userInput.value == answer) {
		userInput.style.backgroundColor = "#82e082";
		correct += 1;
		correctAnswerElem.innerHTML = "";
		correctAnswerElem.style.opacity = 0;
	} else {
		userInput.style.backgroundColor = "#eb4d4d";
		if (userInput.value == "いぬ") {correctAnswerElem.innerHTML = "<img src='dog.jpg'/>"}
		else {
			correctAnswerElem.innerHTML = "Last Answer: " + answer;
			incorrect += 1;
		}
		fadein(correctAnswerElem);
	}
	updateScore(correct, incorrect)
	wait = true;
	setTimeout(function(){
		userInput.value = ""
		userInput.style.backgroundColor = "white";
		newWord();
		wait = false;
	}, 500);
}

function updateScore(correct, incorrect) {
	document.getElementById("correct").innerHTML = correct;
	document.getElementById("incorrect").innerHTML = incorrect;
	percent = Math.ceil((correct / (correct + incorrect))*100);
	document.getElementById("percent").innerHTML = percent.toString() + "%";
}

function fadein(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

var correct = 0;
var incorrect = 0;
var uCount = uverbs.length;
var ruCount = ruverbs.length;
var irrCount = irrverbs.length;
var kanji = false;
var answer;
var word
var lastword
var wait = false;

var correctAnswerElem = document.getElementById("correct-answer");
var typeElem = document.getElementById("type");
var wordElem = document.getElementById("word");
var userInput = document.getElementById("input-IME");
var kanjiSetting = document.getElementById("kanjisetting")
var typesetting = document.getElementById("typesetting")

correctAnswerElem.style.opacity = 0;

newWord();

userInput.onkeydown = function(e){
   if(e.keyCode == 13){
     checkAnswer(answer);
   }
};

typesetting.onchange = function() {
	if (typesetting.checked) {typeElem.style.display = 'none';}
	else {typeElem.style.display = 'block';}
}

//Always Focus Textbox
setInterval(function(){
 userInput.focus();
});
