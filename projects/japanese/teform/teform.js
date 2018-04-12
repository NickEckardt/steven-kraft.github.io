function getAnswer(word, type, opts = {neg:false, polite:false}) {
	if($('#randomsetting').length > 0 && $('#randomsetting').is(':checked')) {
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
	if(opts.neg) {randLabel = "Negative " + randLabel}
	$('#random').text(randLabel);

	stem = /(.*)(?!$)/.exec(word)[0];
	var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	var pol_endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};

	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
		if (opts.neg && opts.polite) {return stem + pol_endings[lastchar] + "ませんで"}
		else if (opts.neg) {
			neg_stem = stem + endings[lastchar] + "な"
			return [neg_stem + "くて", neg_stem + "いで"]
		}
		else if (opts.polite) {return stem + pol_endings[lastchar] + "まして"}
		else {
			if (['う', 'つ', 'る'].includes(lastchar)) {return stem + "って";}
			else if (['む', 'ぶ', 'ぬ'].includes(lastchar)) {return stem + "んで";}
			else if (['く'].includes(lastchar)) {
				if (word == "いく" || word == "もっていく") {
	        $('#type').text("う-Verb (Godan) (Exception)");
	        return stem + "って"
	      }
				else {return stem + "いて";}
			}
			else if (['ぐ'].includes(lastchar)) {return stem + "いで";}
			else if (["す"].includes(lastchar)) {return stem + "して";}
			else {return "Error";}
		}
	}
	else if (type == "ru") {
		if (opts.neg && opts.polite) {return stem + "ませんで";}
		else if (opts.neg) {return [stem + "なくて", stem + "ないで"]}
		else if (opts.polite) {return stem + "まして";}
		else {return stem + "て";}
	} //Ru-verbs
	else {
		if (opts.neg && opts.polite) {
			if (word == "する") {return "しませんで";}
			else if (word == "くる") {return "きませんで";}
		}
		else if (opts.neg) {
			if (word == "する") {return ["しなくて", "しないで"];}
			else if (word == "くる") {return ["こなくて", "こないで"];}
		}
		else if (opts.polite) {
			if (word == "する") {return "しまして";}
			else if (word == "くる") {return "きまして";}
		}
		else {
			if (word == "する") {return "して";}
			else if (word == "くる") {return "きて";}
		}
	} // Irregular
}

$('.opt').change(function() {answer = getAnswer(word.kana, word.type);});
$('#randomsetting').change(function() {answer = getAnswer(word.kana, word.type);});
