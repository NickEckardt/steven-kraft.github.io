function getAnswer(word, type, opts = {short:false, neg:false, polite:false, passive:false}) {
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
  if(opts.passive) {randLabel = "Passive " + randLabel}
  if(opts.short) {randLabel = "Short " + randLabel}
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}
	if(opts.neg) {randLabel = "Negative " + randLabel}
	$('#random').text(randLabel);

  var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
    var presuff = opts.short ? "し" : "せ";
    if (opts.passive) {presuff = "せられ";}
    if (opts.passive && opts.short) {presuff = "され"}
    var short_end = opts.passive ? "される" : "す";
    var short_neg_end = opts.passive ? "されない" : "さない";

    if (opts.short && opts.polite && opts.neg) {answer = stem + endings[lastchar] + presuff + "ません";}
    else if (opts.short && opts.polite) {answer = stem + endings[lastchar] + presuff + "ます";}
    else if (opts.polite && opts.neg) {answer = stem + endings[lastchar] + presuff + "ません";}
    else if (opts.short && opts.neg) {answer = stem + endings[lastchar] + short_neg_end;}
    else if (opts.short) {answer = stem + endings[lastchar] + short_end;}
    else if (opts.polite) {answer = stem + endings[lastchar] + presuff + "ます";}
    else if (opts.neg) {answer = stem + endings[lastchar] + presuff + "ない";}
	  else {answer = stem + endings[lastchar] + presuff + "る";}

    return answer;
	}
	else if (type == "ru") {
    if (opts.passive && opts.short) {
      newWord();
      return ""
    }
    var root = stem + "さ";
    if(opts.passive){
      if (opts.polite && opts.neg) {return root + "せられません";}
      else if (opts.polite) {return root + "せられます";}
      else if (opts.neg) {return root + "せられない";}
      else {return root + "せられる";}
    }
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
    if (opts.passive && opts.short) {
      newWord();
      return ""
    }
    var irrending = "せる";

    if (opts.short && opts.polite && opts.neg) {irrending = "しません";}
    else if (opts.short && opts.polite) {irrending = "します";}
    else if (opts.polite && opts.neg) {irrending = "せません";}
    else if (opts.short && opts.neg) {irrending = "さない";}
    else if (opts.short) {irrending = "す";}
    else if (opts.polite) {irrending = "せます";}
    else if (opts.neg) {irrending = "せない";}

    if(opts.passive){
      if (opts.polite && opts.neg) {irrending = "せられません";}
      else if (opts.polite) {irrending = "せられます";}
      else if (opts.neg) {irrending = "せられない";}
      else {irrending = "せられる";}
    }

		if (word == "する") {return "さ" + irrending;}
		else if (word == "くる") {return "こさ" + irrending;}
	}
}

$('.opt').change(function() {answer = getAnswer(word.kana, word.type);});
$('#randomsetting').change(function() {answer = getAnswer(word.kana, word.type);});
