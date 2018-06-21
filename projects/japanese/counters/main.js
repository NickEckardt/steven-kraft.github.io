function newCounter() {
  counter = counters[Math.floor(Math.random() * counters.length)]
	do {
		number = Math.floor(Math.random() * counter.readings.length)
	} while (lastnumber == number) // Prevents same counter from appearing twice in a row

	answer = [counter.readings[number]];
	lastnumber = number;
  meaning = counter.meaning[Math.floor(number / (number - 0.1))]
  $('#counter').text((number + 1).toString() + " " + meaning);
}

function checkAnswer(answer) {
	if (wait) {
		// Wait for enter key to be pressed again before continuing to next counter
		$('#input-IME').val("")
		$('#input-IME').css({ backgroundColor: "white" });
		$('#feedback').removeClass();
		newCounter();
		wait = false;
		return;
	}
	if ($('#input-IME').val() == "" || (!wanakana.isHiragana($('#input-IME').val()) && !reverse) || wait) {
		if ($('#input-IME').is(':animated') == false && wait == false) {
			$('#input-IME').effect("shake");
		}
		return; // Only accept Hiragana answer
	}
	else if ((answer.includes($('#input-IME').val()) && Array.isArray(answer)) || answer == $('#input-IME').val()) {
		$('#input-IME').css({ backgroundColor: "#82e082" });
		//$('#feedback').addClass("correct")
		correct += 1;
		$('#correct-answer').text("");
		$('#correct-answer').hide();
	} else {
		$('#input-IME').css({ backgroundColor: "#eb4d4d" });
		$('#feedback').addClass("incorrect")
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
				newCounter();
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
var counter;
var meaning;
var lastnumber;
var wait = false;

newCounter();

$('#digits').change(function() {
	digits = $('#digits').val()
	$('#digits-label').text(digits)
	if (wait) {checkAnswer(answer)}
	else {newCounter();}
});

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

//Dark Mode
function darkMode(){
	if($("#dn").is(':checked')) {$("body").addClass("dark");}
	else {$("body").removeClass("dark");}
}
$("#dn").change(darkMode)
darkMode();
