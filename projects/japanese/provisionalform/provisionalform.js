function getAnswer(word, type, opts = {neg:false, polite:false}) {
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
	if(opts.neg) {randLabel = "Negative " + randLabel}
	$('#random').text(randLabel);

	stem = /(.*)(?!$)/.exec(word)[0];
	lastchar = /(.$)/.exec(word)[0];

	if (opts.polite && opts.neg) {ending = "ませんなら"}
	else if (opts.polite) {ending = "ますなら"}
	else if (opts.neg) {
		ending = "なければ"
		endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	}
	else {
		if (type == "u") {ending = "ば";}
		else {ending = "れば";}
		endings = {く:"け", す:"せ", う:"え", ぐ:"げ", ぶ:"べ", つ:"て", む:"め", ぬ:"ね", る:"れ"};
	}

	if (opts.polite) {endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};}

	if (type == "u") {return stem + endings[lastchar] + ending;}
	else if (type == "ru") {return stem + ending;}
	else {
		if (opts.neg && !opts.polite && word == "くる") {return "こなければ";}
		else if (opts.polite || opts.neg){
			if (word == "する") {return "し" + ending;}
			else if (word == "くる") {return "き" + ending;}
		}
		else {return stem + ending}
	}
}

$('.opt').change(function() {answer = getAnswer(word.kana, word.type);});
$('#randomsetting').change(function() {answer = getAnswer(word.kana, word.type);});
