function getAnswer(word, type, opts = {polite:false}) {
	rand = $('#randomsetting').is(':visible')
	if(rand && $('#randomsetting').is(':checked')) {
		for (opt in opts) {opts[opt] = Math.random() >= 0.5;}
	}
	else {
		$(".opt").each(function( index ) {
			opts[$(this).prop("name")] = $(this).is(':checked')
		});
	}

	var randLabel = "Form"
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}
	$('#random').text(randLabel);

	if (opts.polite) {
		var ending = "ましょう"
		var endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
	}
	else {
		var ending = "う"
		var endings = {く:"こ", す:"そ", う:"お", ぐ:"ご", ぶ:"ぼ", つ:"と", む:"も", ぬ:"の", る:"ろ"};
	}

	stem = /(.*)(?!$)/.exec(word)[0];

	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
	  return stem + endings[lastchar] + ending;
	}
	else if (type == "ru") {
		if (opts.polite) {return stem + ending}
		return stem + "よう";
	} //Ru-verbs
	else {
		if (!opts.polite) {
			ending = "よう"
			if (word == "くる") {return "こ" + ending;}
		}
		if (word == "する") {return "し" + ending;}
		else if (word == "くる") {return "き" + ending;}
	} // Irregular
}

$('.opt').change(function() {answer = getAnswer(word.kana, word.type);});
$('#randomsetting').change(function() {answer = getAnswer(word.kana, word.type);});
