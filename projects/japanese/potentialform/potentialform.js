var endings = {く:"け", す:"せ", う:"え", ぐ:"げ", ぶ:"べ", つ:"て", む:"め", ぬ:"ね", る:"れ"};
var meaningPrefix = "can"

function getAnswer(word, type) {
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
	  return stem + endings[lastchar] + "る";
	}
	else if (type == "ru") {return stem + "られる";} //Ru-verbs
	else {
		if (word == "する") {return "できる";}
		else if (word == "くる") {return "こられる";}
	} // Irregular
}
