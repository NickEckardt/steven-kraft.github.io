function getAnswer(word, type, polite=false, neg=false) {
	if ($('#politesetting').is(':visible')) {polite = $('#politesetting').is(':checked')}
	if ($('#negsetting').is(':visible')) {neg = $('#negsetting').is(':checked')}
	var endings = {く:"け", す:"せ", う:"え", ぐ:"げ", ぶ:"べ", つ:"て", む:"め", ぬ:"ね", る:"れ"};
	var meaningPrefix = "can"
	if (polite && neg) {ending = "ません"}
	else if (polite) {ending = "ます"}
	else if (neg) {ending = "ない"}
	else {ending = "る"}
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
	  return stem + endings[lastchar] + ending;
	}
	else if (type == "ru") {return stem + "られ" + ending;} //Ru-verbs
	else {
		if (word == "する") {return "でき" + ending;}
		else if (word == "くる") {return "こられ" + ending;}
	} // Irregular
}

$('#politesetting').change(function() {
  answer = getAnswer(word.kana, word.type);
});

$('#negsetting').change(function() {
  answer = getAnswer(word.kana, word.type);
});
