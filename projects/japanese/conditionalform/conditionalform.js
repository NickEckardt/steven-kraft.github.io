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

	var pol_endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
	var neg_endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};

	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
		if (opts.polite && opts.neg) {return stem + pol_endings[lastchar] + "ませんでしたら";}
		if (opts.neg) {return stem + neg_endings[lastchar] + "なかったら";}
		if (opts.polite) {return stem + pol_endings[lastchar] + "ましたら";}
		if (['う', 'つ', 'る'].includes(lastchar)) {return stem + "ったら";}
		else if (['む', 'ぶ', 'ぬ'].includes(lastchar)) {return stem + "んだら";}
		else if (['く'].includes(lastchar)) {
			if (word == "いく" || word == "もっていく") {
        $('#type').text("う-Verb (Exception)");
        return stem + "ったら"
      }
			else {return stem + "いたら";}
		}
		else if (['ぐ'].includes(lastchar)) {return stem + "いだら";}
		else if (["す"].includes(lastchar)) {return stem + "したら";}
		else {return "Error";}
	}
	else if (type == "ru") {
		if (opts.polite && opts.neg) {return stem + "ませんでしたら";}
		if (opts.neg) {return stem + "なかったら";}
		if (opts.polite) {return stem + "ましたら";}
		return stem + "たら";
	} //Ru-verbs
	else {
		if (opts.polite && opts.neg) {
			if (word == "する") {return "しませんでしたら";}
			else if (word == "くる") {return "きませんでしたら";}
		}
		if (opts.polite) {
			if (word == "する") {return "しましたら";}
			else if (word == "くる") {return "きましたら";}
		}
		if (opts.neg) {
			if (word == "する") {return "しなかったら";}
			else if (word == "くる") {return "こなかったら";}
		}
		if (word == "する") {return "したら";}
		else if (word == "くる") {return "きたら";}
	} // Irregular
}

$('.opt').change(function() {answer = getAnswer(word.kana, word.type);});
$('#randomsetting').change(function() {answer = getAnswer(word.kana, word.type);});
