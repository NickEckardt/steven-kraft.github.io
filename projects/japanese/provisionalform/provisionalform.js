function getAnswer(word, type, polite=false, neg=false) {
	if ($('#politesetting').is(':visible')) {polite = $('#politesetting').is(':checked')}
	if ($('#negsetting').is(':visible')) {neg = $('#negsetting').is(':checked')}

	stem = /(.*)(?!$)/.exec(word)[0];
	lastchar = /(.$)/.exec(word)[0];

	if (polite && neg) {ending = "ませんなら"}
	else if (polite) {ending = "ますなら"}
	else if (neg) {
		ending = "なければ"
		endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	}
	else {
		if (type == "u") {ending = "ば";}
		else {ending = "れば";}
		endings = {く:"け", す:"せ", う:"え", ぐ:"げ", ぶ:"べ", つ:"て", む:"め", ぬ:"ね", る:"れ"};
	}

	if (polite) {endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};}

	if (type == "u") {return stem + endings[lastchar] + ending;}
	else if (type == "ru") {return stem + ending;}
	else {
		if (neg && !polite && word == "くる") {return "こなければ";}
		else if (polite || neg){
			if (word == "する") {return "し" + ending;}
			else if (word == "くる") {return "き" + ending;}
		}
		else {return stem + ending}
	}
}

$('#politesetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});

$('#negsetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});
