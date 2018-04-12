function getAnswer(word, type, opts = {neg:false}) {
	if($('#randomsetting').length > 0 && $('#randomsetting').is(':checked')) {
		for (opt in opts) {opts[opt] = Math.random() >= 0.5;}
	}
	else {
		$(".opt").each(function( index ) {
			opts[$(this).prop("name")] = $(this).is(':checked')
		});
	}

	var randLabel = "Polite Form"
	if(opts.neg) {randLabel = "Negative " + randLabel}
	$('#random').text(randLabel);

	var endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
	stem = /(.*)(?!$)/.exec(word)[0];
  if (opts.neg) {ending = "ません";}
  else {ending = "ます"}

	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
    return stem + endings[lastchar] + ending;
	}
	else if (type == "ru") {return stem + ending;} //Ru-verbs
	else {
    if (word == "する") {return "し" + ending;}
  	else if (word == "くる") {return "き" + ending;}
	} // Irregular
}

$('.opt').change(function() {answer = getAnswer(word.kana, word.type);});
$('#randomsetting').change(function() {answer = getAnswer(word.kana, word.type);});
