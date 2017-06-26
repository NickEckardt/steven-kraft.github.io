function getAnswer(word, type, polite=false) {
	if ($('#politesetting').is(':visible')) {polite = $('#politesetting').is(':checked')}

	if (polite) {
		var ending = "ましょう"
		var endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
	}
	else {
		var ending = "う"
		var endings = {く:"こ", す:"そ", う:"お", ぐ:"ご", ぶ:"ぼ", つ:"と", む:"も", ぬ:"の", る:"ろ"};
	}

	stem = /(.*)(?!$)/.exec(word)[0];

	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
	  return stem + endings[lastchar] + ending;
	}
	else if (type == "ru") {
		if (polite) {return stem + ending}
		return stem + "よう";
	} //Ru-verbs
	else {
		if (!polite) {
			ending = "よう"
			if (word == "くる") {return "こ" + ending;}
		}
		if (word == "する") {return "し" + ending;}
		else if (word == "くる") {return "き" + ending;}
	} // Irregular
}

$('#politesetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});
