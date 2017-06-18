function getAnswer(word, type, short=false) {
  if ($('#shortsetting').show()) {short = $('#shortsetting').is(':checked')}
  var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
    if (short) {return stem + endings[lastchar] + "す";}
	  else {return stem + endings[lastchar] + "せる";}
	}
	else if (type == "ru") {
    if (short) {return stem + "さす";}
    else {return stem + "させる";}
  } //Ru-verbs
	else {
    var irrending = "せる";
    if (short) {irrending = "す"}
		if (word == "する") {return "さ" + irrending;}
		else if (word == "くる") {return "こさ" + irrending;}
	} // Irregular
}

$('#shortsetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});
