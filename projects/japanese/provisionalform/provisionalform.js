function getAnswer(word, type, polite=false) {
	if ($('#politesetting').is(':visible')) {polite = $('#politesetting').is(':checked')}
	var endings = {く:"け", す:"せ", う:"え", ぐ:"げ", ぶ:"べ", つ:"て", む:"め", ぬ:"ね", る:"れ"};
	var pol_endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
	stem = /(.*)(?!$)/.exec(word)[0];
	lastchar = /(.$)/.exec(word)[0];
	if (polite) {
		if (type=="ru") {return stem + "ますなら"}
		else if (type=="irr") {
			if (word == "する") {return "しますなら";}
			else if (word == "くる") {return "きますなら";}
		}
		else {return stem + pol_endings[lastchar] + "ますなら";}
	}
	return stem + endings[lastchar] + "ば";
}


$('#politesetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});
