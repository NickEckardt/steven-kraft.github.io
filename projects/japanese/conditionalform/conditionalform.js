function getAnswer(word, type, polite=false) {
	var pol_endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
	if ($('#politesetting').is(':visible')) {polite = $('#politesetting').is(':checked')}

	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
		if (polite) {return stem + pol_endings[lastchar] + "ましたら"}
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
		if (polite) {return stem + "ましたら"}
		return stem + "たら";
	} //Ru-verbs
	else {
		if (polite) {
			if (word == "する") {return "しましたら";}
			else if (word == "くる") {return "きましたら";}
		}
		if (word == "する") {return "したら";}
		else if (word == "くる") {return "きたら";}
	} // Irregular
}

$('#politesetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});
