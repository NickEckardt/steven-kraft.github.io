function getAnswer(word, type) {
  var endings = {く:"け", す:"せ", う:"え", ぐ:"げ", ぶ:"べ", つ:"て", む:"め", ぬ:"ね", る:"れ"};
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
	  return stem + endings[lastchar];
	}
	else if (type == "ru") {
    if (word == "くれる") {return ["くれ", "くれろ"];}
    return stem + "ろ";
  } //Ru-verbs
	else {
		if (word == "する") {return "しろ";}
		else if (word == "くる") {return "こい";}
	} // Irregular
}
