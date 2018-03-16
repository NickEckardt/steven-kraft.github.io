function getAnswer(word, type, polite=false, neg=false) {
	var pol_endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
	var neg_endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	if ($('#politesetting').is(':visible')) {polite = $('#politesetting').is(':checked')}
	if ($('#negsetting').is(':visible')) {neg = $('#negsetting').is(':checked')}

	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
		if (polite && neg) {return stem + pol_endings[lastchar] + "ませんでしたら";}
		if (neg) {return stem + neg_endings[lastchar] + "なかったら";}
		if (polite) {return stem + pol_endings[lastchar] + "ましたら";}
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
		if (polite && neg) {return stem + "ませんでしたら";}
		if (neg) {return stem + "なかったら";}
		if (polite) {return stem + "ましたら";}
		return stem + "たら";
	} //Ru-verbs
	else {
		if (polite && neg) {
			if (word == "する") {return "しませんでしたら";}
			else if (word == "くる") {return "きませんでしたら";}
		}
		if (polite) {
			if (word == "する") {return "しましたら";}
			else if (word == "くる") {return "きましたら";}
		}
		if (neg) {
			if (word == "する") {return "しなかったら";}
			else if (word == "くる") {return "こなかったら";}
		}
		if (word == "する") {return "したら";}
		else if (word == "くる") {return "きたら";}
	} // Irregular
}

$('#politesetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});

$('#negsetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});
