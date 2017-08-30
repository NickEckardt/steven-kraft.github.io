function newTime() {
	do {
		minute = Math.floor(Math.random() * 60)
		hour = Math.floor(Math.random() * 12) + 1
	} while (lastminute == minute) // Prevents same minutes from appearing twice in a row

	lastminute = minute;
	answer = getAnswer(hour, minute)

	var minstr = minute.toString()
	if (minstr.length == 1) {minstr = "0" + minstr}

	$('#time').text(hour.toString() + ":" + minstr);
}

function checkAnswer(answer) {
	if (wait) {
		// Wait for enter key to be pressed again before continuing to next time
		$('#input-IME').val("")
		$('#input-IME').css({ backgroundColor: "white" });
		newTime();
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
		correct += 1;
		$('#correct-answer').text("");
		$('#correct-answer').hide();
	} else {
		$('#input-IME').css({ backgroundColor: "#eb4d4d" });
		if ($('#input-IME').val() == "いぬ") {$('#correct-answer').html("<img src='../img/dog.jpg'/>").fadeIn()}
		else {
			if (typeof answer == "string") {ansMessage = answer;}
			else {ansMessage = answer.join(" or ");}
			$('#correct-answer').text(`Last Answer: ${ansMessage}`).fadeIn();
			incorrect += 1;
		}
	}

	updateScore(correct, incorrect)
	wait = true;

	if ($("#fastsetting").is(':checked')) {
		setTimeout(function(){
			if (wait) {
				$('#input-IME').val("")
				$('#input-IME').css({ backgroundColor: "white" });
				newTime();
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

var correct = 0;
var incorrect = 0;
var answer;
var minute;
var hour;
var lastminute;
var wait = false;
var digits = 4;
$('#digits').value = digits

newTime();

$('#input-IME').keydown(function(e){
   if(e.which == 13) {checkAnswer(answer);} //React to Enter Key
});

//Always Focus Textbox
$("html").click(function() {
	$('#input-IME').val($('#input-IME').val()).focus();
});

//Required for Wanakana
(function(wk) {
	wk.bind(document.getElementById('input-IME'));
})(window.wanakana);
