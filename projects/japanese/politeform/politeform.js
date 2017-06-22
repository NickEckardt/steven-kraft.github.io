function getAnswer(word, type, neg=false) {
	if ($('#negsetting').is(':visible')) {neg = $('#negsetting').is(':checked')}
	var endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
	stem = /(.*)(?!$)/.exec(word)[0];
  if (neg) {ending = "ません";}
  else {ending = "ます"}

	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
    return stem + endings[lastchar] + ending;
	}
	else if (type == "ru") {return stem + ending;} //Ru-verbs
	else {
    if (word == "する") {return "し" + ending;}
  	else if (word == "くる") {return "き" + ending;}
	} // Irregular
}

$('#negsetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});
