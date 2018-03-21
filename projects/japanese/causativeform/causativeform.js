function getAnswer(word, type, opts = {short:false, neg:false, polite:false}) {
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
  if(opts.short) {randLabel = "Short " + randLabel}
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}
	if(opts.neg) {randLabel = "Negative " + randLabel}
	$('#random').text(randLabel);

  var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
    if (opts.short && opts.polite && opts.neg) {return stem + endings[lastchar] + "しません";}
    else if (opts.short && opts.polite) {return stem + endings[lastchar] + "します";}
    else if (opts.polite && opts.neg) {return stem + endings[lastchar] + "せません";}
    else if (opts.short && opts.neg) {return stem + endings[lastchar] + "さない";}
    else if (opts.short) {return stem + endings[lastchar] + "す";}
    else if (opts.polite) {return stem + endings[lastchar] + "せます";}
    else if (opts.neg) {return stem + endings[lastchar] + "せない";}
	  else {return stem + endings[lastchar] + "せる";}
	}
	else if (type == "ru") {
    var root = stem + "さ";
    if (opts.short && opts.polite && opts.neg) {return root + "しません";}
    else if (opts.short && opts.polite) {return root + "します";}
    else if (opts.polite && opts.neg) {return root + "せません";}
    else if (opts.short && opts.neg) {return root + "さない";}
    else if (opts.short) {return root + "す";}
    else if (opts.polite) {return root + "せます";}
    else if (opts.neg) {return root + "せない";}
    else {return root + "せる";}
  }
	else {
    var irrending = "せる";
    if (opts.short && opts.polite && opts.neg) {irrending = "しません";}
    else if (opts.short && opts.polite) {irrending = "します";}
    else if (opts.polite && opts.neg) {irrending = "せません";}
    else if (opts.short && opts.neg) {irrending = "さない";}
    else if (opts.short) {irrending = "す";}
    else if (opts.polite) {irrending = "せます";}
    else if (opts.neg) {irrending = "せない";}
		if (word == "する") {return "さ" + irrending;}
		else if (word == "くる") {return "こさ" + irrending;}
	}
}

$('.opt').change(function() {answer = getAnswer(word.kana, word.type);});
$('#randomsetting').change(function() {answer = getAnswer(word.kana, word.type);});
