function newWord() {
	do {
		word = verbs[Math.floor(Math.random() * verbs.length)]
	} while (lastword == word) // Prevents same word from appearing twice in a row

	lastword = word;

	if (word.type == "u") {$('#type').text("う-Verb (Godan)")}
	else if (word.type == "ru") {$('#type').text("る-Verb (Ichidan)");}
	else {$('#type').text("Irregular");}

	answer = getAnswer(word.kana, word.type)

	// Show Kanji if Setting is Checked
	if (kanji) {$('#word').text(word.kanji);}
	else {$('#word').text(word.kana);}

	// Show Kanji if Setting is Checked
	if (kanji) {$('#word').text(word.kanji);}
	else {$('#word').text(word.kana);}

	$('#english').text(word.eng);
}

function teForm(word, type) {
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
		if (['う', 'つ', 'る'].includes(lastchar)) {return stem += "って";}
		else if (['む', 'ぶ', 'ぬ'].includes(lastchar)) {return stem += "んで";}
		else if (['く'].includes(lastchar)) {
			if (word == "いく") {return "いって";}
			if (word == "もっていく") {return "もっていって";}
			return stem += "いて";
		}
		else if (['ぐ'].includes(lastchar)) {return stem += "いで";}
		else if (["す"].includes(lastchar)) {return stem += "して";}
		else {return "Error";}
	}
	else if (type == "ru") {return stem += "て";} //Ru-verbs
	else {
		if (word == "する") {return "して";}
		else if (word == "くる") {return "きて";}
	} // Irregular
}

function checkAnswer(answer) {
	if ($('#input-IME').val() == "" || !wanakana.isHiragana($('#input-IME').val()) || wait) {
		if ($('#input-IME').is(':animated') == false && wait == false) {
			$('#input-IME').effect("shake");
		}
		return; // Only accept Hiragana answer
	}
	else if ($('#input-IME').val() == answer) {
		$('#input-IME').css({ backgroundColor: "#82e082" });
		correct += 1;
		$('#correct-answer').text("");
		$('#correct-answer').hide();
	} else {
		$('#input-IME').css({ backgroundColor: "#eb4d4d" });
		if ($('#input-IME').val() == "いぬ") {$('#correct-answer').html("<img src='../img/dog.jpg'/>").fadeIn()}
		else {
			$('#correct-answer').text("Last Answer: " + answer).fadeIn();
			incorrect += 1;
		}
	}
	updateScore(correct, incorrect)
	wait = true;
	setTimeout(function(){
		$('#input-IME').val("")
		$('#input-IME').css({ backgroundColor: "white" });
		newWord();
		wait = false;
	}, 500);
}

function updateScore(correct, incorrect) {
	$('#correct').text(correct);
	$('#incorrect').text(incorrect);
	percent = Math.ceil((correct / (correct + incorrect))*100);
	$('#percent').text(percent.toString() + "%");
}

var correct = 0;
var incorrect = 0;
var kanji = false;
var answer;
var word
var lastword
var wait = false;
$('#english').hide()

newWord();

$('#input-IME').keydown(function(e){
   if(e.which == 13) {checkAnswer(answer);} //React to Enter Key
});

$('#kanjisetting').change(function() {
	if (this.checked) {
		kanji = true;
		$('#word').text(word.kanji);
	} else {
		kanji = false;
		$('#word').text(word.kana);
	}
});

$('#typesetting').change(function() {
	if (this.checked) {$('#type').hide()}
	else {$('#type').show()}
});

$('#englishsetting').change(function() {
	if (this.checked) {$('#english').show()}
	else {$('#english').hide()}
});

//Always Focus Textbox
setInterval(function(){
 $('#input-IME').focus();
});

//Required for Wanakana
(function(wk) {
	wk.bind(document.getElementById('input-IME'));
})(window.wanakana);
