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
	kanjimode(kanji);

	$('#english').text(word.eng);
}

function checkAnswer(answer) {
	if (wait) {
		// Wait for enter key to be pressed again before continuing to next word
		$('#input-IME').val("")
		$('#input-IME').css({ backgroundColor: "white" });
		$('#feedback').removeClass();
		newWord();
		wait = false;
		return;
	}
	if ($('#input-IME').val() == "" || !wanakana.isHiragana($('#input-IME').val()) || wait) {
		if ($('#input-IME').is(':animated') == false && wait == false) {
			$('#input-IME').effect("shake");
		}
		return; // Only accept Hiragana answer
	}
	else if ((answer.includes($('#input-IME').val()) && Array.isArray(answer)) || answer == $('#input-IME').val()) {
		$('#input-IME').css({ backgroundColor: "#82e082" });
		$('#feedback').addClass("correct")
		correct += 1;
		$('#correct-answer').text("");
		$('#correct-answer').hide();
	} else {
		$('#input-IME').css({ backgroundColor: "#eb4d4d" });
		$('#feedback').addClass("incorrect")
		if (typeof answer == "string") {ansMessage = answer;}
		else {ansMessage = answer.join(" or ");}
		$('#correct-answer').text(`Last Answer: ${ansMessage}`).fadeIn();
		incorrect += 1;
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

	if ($("#fastsetting").is(':checked')) {
		setTimeout(function(){
			if (wait) {
				$('#input-IME').val("")
				$('#input-IME').css({ backgroundColor: "white" });
				newWord();
				wait = false;
			}
		}, 500);
	}
}

function updateScore(correct, incorrect) {
	$('#correct').text(correct);
	$('#incorrect').text(incorrect);
	percent = Math.ceil((correct / (correct + incorrect))*100);
	$('#percent').text(percent.toString() + "%");
}

function kanjimode(active) {
	if (active) {
		$('#kanjisetting').prop('checked', true);
		kanji = true;
		var furi_word = word.kanji.replace("<rt>", "<rp>(</rp><rt>").replace("</rt>", "</rt><rp>)</rp>")
		$('#word').html(`<ruby>${furi_word}<ruby>`);
		furimode(furi);
	} else {
		$('#kanjisetting').prop('checked', false);
		kanji = false;
		$('#word').text(word.kana);
		furimode(false);
	}
}

function furimode(active) {
	if (active) {
		$('#furisetting').prop('checked', true);
		furi = true;
		if (!kanji) {kanjimode(true);}
		$("rt").show();
	} else {
		$('#furisetting').prop('checked', false);
		furi = false;
		$("rt").hide();
	}
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
	 else if(e.which == 16 && kanji) {furimode(!furi);} //React to Space Key
});

$('#kanjisetting').change(function() {
	kanjimode(this.checked);
});

//$("rt").hide(); // Start With Furigana Turned Off

$('#furisetting').change(function() {
	furimode(this.checked);
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

$('#random').hide()

$('#randomsetting').change(function() {
	if (this.checked) {
		$('#random').show()
		$(".opt").attr("disabled", true);
	}
	else {
		$('#random').hide()
		$(".opt").removeAttr("disabled");
	}
});

//Always Focus Textbox
$("html").click(function() {
	$('#input-IME').val($('#input-IME').val()).focus();
});

//Required for Wanakana
(function(wk) {
	wk.bind(document.getElementById('input-IME'));
})(window.wanakana);
