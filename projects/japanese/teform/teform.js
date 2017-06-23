function getAnswer(word, type, neg=false) {
	if ($('#negsetting').is(':visible')) {neg = $('#negsetting').is(':checked')}
	stem = /(.*)(?!$)/.exec(word)[0];
	var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};

	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
		if (neg) {
			neg_stem = stem + endings[lastchar] + "な"
			return [neg_stem + "くて", neg_stem + "いで"]
		}
		if (['う', 'つ', 'る'].includes(lastchar)) {return stem + "って";}
		else if (['む', 'ぶ', 'ぬ'].includes(lastchar)) {return stem + "んで";}
		else if (['く'].includes(lastchar)) {
			if (word == "いく" || word == "もっていく") {
        $('#type').text("う-Verb (Godan) (Exception)");
        return stem + "って"
      }
			else {return stem + "いて";}
		}
		else if (['ぐ'].includes(lastchar)) {return stem + "いで";}
		else if (["す"].includes(lastchar)) {return stem + "して";}
		else {return "Error";}
	}
	else if (type == "ru") {
		if (neg) {return [stem + "なくて", stem + "ないで"]}
		return stem + "て";
	} //Ru-verbs
	else {
		if (neg) {
			if (word == "する") {return ["しなくて", "しないで"];}
			else if (word == "くる") {return ["こなくて", "こないで"];}
		}
		if (word == "する") {return "して";}
		else if (word == "くる") {return "きて";}
	} // Irregular
}

$('#negsetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});
