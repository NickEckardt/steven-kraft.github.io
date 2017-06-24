function getAnswer(word, type, polite=false) {
  if ($('#politesetting').is(':visible')) {polite = $('#politesetting').is(':checked')}

  var endings = {く:"け", す:"せ", う:"え", ぐ:"げ", ぶ:"べ", つ:"て", む:"め", ぬ:"ね", る:"れ"};
	stem = /(.*)(?!$)/.exec(word)[0];
  if (polite) {ending = "なさい";}
  else {ending = "ろ"}

	if(type == "u") {
    lastchar = /(.$)/.exec(word)[0];

    if (polite) {
      endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
      return stem + endings[lastchar] + ending;
    }

    return stem + endings[lastchar];
	}
	else if (type == "ru") {
    if (word == "くれる") {
      if (polite) {return "くれなさるな"}
      $('#type').text("る-Verb (Ichidan) (Exception)");
      return ["くれ", "くれろ"];
    }
    return stem + ending;
  } //Ru-verbs
	else {
		if (word == "する") {return "し" + ending;}
		else if (word == "くる") {
      if (polite) {return "き" + ending;}
      return "こい";
    }
	} // Irregular
}

$('#politesetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});
