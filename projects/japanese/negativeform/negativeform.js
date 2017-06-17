function getAnswer(word, type) {
  var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
	  return stem + endings[lastchar] + "ない";
	}
	else if (type == "ru") {return stem + "ない";} //Ru-verbs
	else {
		if (word == "する") {return "しない";}
		else if (word == "くる") {return "こない";}
	} // Irregular
}
