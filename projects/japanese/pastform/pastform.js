var endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
var a_endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
var neg = false;
var polite = false;

function getAnswer(word, type) {
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
    lastchar = /(.$)/.exec(word)[0];
    ending = endings[lastchar];
    a_ending = a_endings[lastchar];

    if (polite && neg) {return stem + ending + "ませんでした";}
    else if (polite) {return stem + ending + "ました";}
    else if (neg) {
      if (word == "ある") {
        $('#type').text("う-Verb (Exception)");
        return "なかった"
      }
      return stem + a_ending + "なかった";
    }

		if (['う', 'つ', 'る'].includes(lastchar)) {return stem + "った";}
		else if (['む', 'ぶ', 'ぬ'].includes(lastchar)) {return stem + "んだ";}
		else if (['く'].includes(lastchar)) {
			if (word == "いく" || word == "もっていく") {
        $('#type').text("う-Verb (Exception)");
        return stem + "った"
      }
			else {return stem + "いた";}
		}
		else if (['ぐ'].includes(lastchar)) {return stem + "いだ";}
		else if (["す"].includes(lastchar)) {return stem + "した";}
		else {return "Error";}
	}
	else if (type == "ru") {
    if (polite && neg) {return stem + "ませんでした";}
    else if (polite) {return stem + "ました";}
    else if (neg) {return stem　+ "なかった";}
    return stem + "た"; //Ru-verbs
  }
	else {
		if (word == "する") {
      if (polite && neg) {return "しませんでした";}
      else if (polite) {return "しました";}
      else if (neg) {return "しなかった";}
      return "した";
    }
		else if (word == "くる") {
      if (polite && neg) {return "きませんでした";}
      else if (polite) {return "きました";}
      else if (neg) {return "こなかった";}
      return "きた";
    }
	} // Irregular
}

$('#negsetting').change(function() {
  if (this.checked) {neg = true;}
  else {neg = false;}
  answer = getAnswer(word.kana, word.type);
});

$('#politesetting').change(function() {
  if (this.checked) {polite = true;}
  else {polite = false;}
  answer = getAnswer(word.kana, word.type);
});
