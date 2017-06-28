function getAnswer(word, type) {
  var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
	  return stem + endings[lastchar] + "れる";
	}
	else if (type == "ru") {return stem + "られる";} //Ru-verbs
	else {
		if (word == "する") {return "される";}
		else if (word == "くる") {return "こられる";}
	} // Irregular
}
