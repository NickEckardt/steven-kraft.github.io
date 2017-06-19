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
	if (kanji) {
		$('#word').html(`<ruby>${word.kanji}<ruby>`);
		if (furi) {$("rt").show()}
	}
	else {$('#word').text(word.kana);}

	$('#english').text(word.eng);
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
			$('#correct-answer').text(`Last Answer: ${answer}`).fadeIn();
			incorrect += 1;
		}
	}

	if (lastmeaning) {
		$('#meaning').hide();
		if (typeof meaningPrefix !== 'undefined') {
			$('#meaning').text(`Last Meaning: ${meaningPrefix} ${word.eng}`)
		} else {$('#meaning').text(`Last Meaning: ${word.eng}`)}
		$('#meaning').fadeIn();
	} else {$('#meaning').hide();}

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
var furi = false;
var lastmeaning = true;
var answer;
var word;
var lastword;
var wait = false;

newWord();

$('#input-IME').keydown(function(e){
   if(e.which == 13) {checkAnswer(answer);} //React to Enter Key
});

$('#kanjisetting').change(function() {
	if (this.checked) {
		kanji = true;
		$('#word').html(`<ruby>${word.kanji}<ruby>`);
		if (furi) {$("rt").show()}
	} else {
		kanji = false;
		$('#word').text(word.kana);
	}
});

$('#furisetting').change(function() {
	if (this.checked) {
		$("rt").show();
		furi = true;
	} else {
		$("rt").hide();
		furi = false;
	}
});

$('#typesetting').change(function() {
	if (this.checked) {$('#type').hide()}
	else {$('#type').show()}
});

$('#english').hide()

$('#englishsetting').change(function() {
	if (this.checked) {
		lastmeaning = false;
		$('#english').show()
	}
	else {
		lastmeaning = true;
		$('#english').hide()
	}
});

//Always Focus Textbox
setInterval(function(){
 $('#input-IME').focus();
});

//Required for Wanakana
(function(wk) {
	wk.bind(document.getElementById('input-IME'));
})(window.wanakana);
