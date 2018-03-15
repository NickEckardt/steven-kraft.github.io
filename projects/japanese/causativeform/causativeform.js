function getAnswer(word, type, short=false, polite=false, neg=false) {
  if ($('#shortsetting').is(':visible')) {short = $('#shortsetting').is(':checked')}
  if ($('#politesetting').is(':visible')) {polite = $('#politesetting').is(':checked')}
  if ($('#negsetting').is(':visible')) {neg = $('#negsetting').is(':checked')}
  var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
    if (short && polite && neg) {return stem + endings[lastchar] + "しません";}
    else if (short && polite) {return stem + endings[lastchar] + "します";}
    else if (polite && neg) {return stem + endings[lastchar] + "せません";}
    else if (short && neg) {return stem + endings[lastchar] + "さない";}
    else if (short) {return stem + endings[lastchar] + "す";}
    else if (polite) {return stem + endings[lastchar] + "せます";}
    else if (neg) {return stem + endings[lastchar] + "せない";}
	  else {return stem + endings[lastchar] + "せる";}
	}
	else if (type == "ru") {
    var root = stem + "さ";
    if (short && polite && neg) {return root + "しません";}
    else if (short && polite) {return root + "します";}
    else if (polite && neg) {return root + "せません";}
    else if (short && neg) {return root + "さない";}
    else if (short) {return root + "す";}
    else if (polite) {return root + "せます";}
    else if (neg) {return root + "せない";}
    else {return root + "せる";}
  }
	else {
    var irrending = "せる";
    if (short && polite && neg) {irrending = "しません";}
    else if (short && polite) {irrending = "します";}
    else if (polite && neg) {irrending = "せません";}
    else if (short && neg) {irrending = "さない";}
    else if (short) {irrending = "す";}
    else if (polite) {irrending = "せます";}
    else if (neg) {irrending = "せない";}
		if (word == "する") {return "さ" + irrending;}
		else if (word == "くる") {return "こさ" + irrending;}
	}
}

$('#shortsetting').change(function() {
  answer = getAnswer(word.kana, word.type);
});

$('#politesetting').change(function() {
  answer = getAnswer(word.kana, word.type);
});

$('#negsetting').change(function() {
  answer = getAnswer(word.kana, word.type);
});
