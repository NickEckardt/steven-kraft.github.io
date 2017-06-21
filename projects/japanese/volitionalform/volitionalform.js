function getAnswer(word, type) {
	var endings = {く:"こ", す:"そ", う:"お", ぐ:"ご", ぶ:"ぼ", つ:"と", む:"も", ぬ:"の", る:"ろ"};
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
	  return stem + endings[lastchar] + "う";
	}
	else if (type == "ru") {return stem + "よう";} //Ru-verbs
	else {
		if (word == "する") {return "しよう";}
		else if (word == "くる") {return "こよう";}
	} // Irregular
}
