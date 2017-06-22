function getAnswer(word, type, polite=false) {
  if ($('#politesetting').is(':visible')) {polite = $('#politesetting').is(':checked')}
  if (polite) {
    var endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
    var ending = "ません"
  } else {
    var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
    var ending = "ない"
  }
  stem = /(.*)(?!$)/.exec(word)[0];

	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
    if (word == "ある" && !polite) {
      $('#type').text("う-Verb (Godan) (Exception)");
      return "ない";
    }
	  return stem + endings[lastchar] + ending;
	}
	else if (type == "ru") {
    return stem + ending;
  } //Ru-verbs
	else {
		if (word == "する") {return "し" + ending;}
		else if (word == "くる") {
      if (polite) {return "き" + ending;}
      else {return "こ" + ending;}
	   } // Irregular
   }
}

$('#politesetting').change(function() {
  answer = getAnswer(word.kana, word.type, this.checked);
});
