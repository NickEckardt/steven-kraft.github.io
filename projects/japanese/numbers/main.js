function newNumber() {
	do {
		number = Math.floor(Math.random() * Math.pow(10, digits)).toString()
	} while (lastnumber == number) // Prevents same number from appearing twice in a row

	answer = getAnswer(number)
	lastnumber = number;

	if (reverse) {
		var tempnum = number;
		if (tempnum < 10) {
			if (answer.length == 1) {number = answer[0];}
			else {number = answer[Math.floor(Math.random() * 2)];}
		}
		else {number = answer;}
		answer = tempnum;
	}

	$('#number').text(number);
}

function checkAnswer(answer) {
	if (wait) {
		// Wait for enter key to be pressed again before continuing to next number
		$('#input-IME').val("")
		$('#input-IME').css({ backgroundColor: "white" });
		newNumber();
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
				newNumber();
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
var number;
var lastnumber;
var wait = false;
var reverse = $("#reversesetting").is(':checked');
var digits = 4;
$('#digits').val(4);

newNumber();

$('#digits').change(function() {
	digits = $('#digits').val()
	$('#digits-label').text(digits)
	if (wait) {checkAnswer(answer)}
	else {newNumber();}
});

$('#reversesetting').change(function() {
	reverse = $("#reversesetting").is(':checked');
	newNumber();
})

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
