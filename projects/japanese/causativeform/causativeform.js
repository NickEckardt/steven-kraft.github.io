function getAnswer(word, type, short=false, polite=false) {
  if ($('#shortsetting').is(':visible')) {short = $('#shortsetting').is(':checked')}
  if ($('#politesetting').is(':visible')) {polite = $('#politesetting').is(':checked')}
  var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
    if (short && polite) {return stem + endings[lastchar] + "します";}
    else if (short) {return stem + endings[lastchar] + "す";}
    else if (polite) {return stem + endings[lastchar] + "せます";}
	  else {return stem + endings[lastchar] + "せる";}
	}
	else if (type == "ru") {
    if (short && polite) {return stem + "さします";}
    if (short) {return stem + "さす";}
    else if (polite) {return stem + "させます";}
    else {return stem + "させる";}
  }
	else {
    var irrending = "せる";
    if (short && polite) {irrending = "します";}
    else if (short) {irrending = "す";}
    else if (polite) {irrending = "せます";}
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
