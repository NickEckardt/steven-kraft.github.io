function getAnswer(word, type, polite=false, neg=false) {
  if ($('#politesetting').is(':visible')) {polite = $('#politesetting').is(':checked')}
  if ($('#negsetting').is(':visible')) {neg = $('#negsetting').is(':checked')}
  if (polite && neg) {var ending = "ません";}
  else if (polite) {var ending = "ます";}
  else if (neg) {var ending = "ない";}
  else {var ending = "る"}
  var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
	  return stem + endings[lastchar] + "れ" + ending;
	}
	else if (type == "ru") {return stem + "られ" + ending;} //Ru-verbs
	else {
		if (word == "する") {return "され" + ending;}
		else if (word == "くる") {return "こられ" + ending;}
	} // Irregular
}

$('#politesetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});

$('#negsetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});
