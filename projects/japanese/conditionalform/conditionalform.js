function getAnswer(word, type) {
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
		if (['う', 'つ', 'る'].includes(lastchar)) {return stem + "ったら";}
		else if (['む', 'ぶ', 'ぬ'].includes(lastchar)) {return stem + "んだら";}
		else if (['く'].includes(lastchar)) {
			if (word == "いく" || word == "もっていく") {
        $('#type').text("う-Verb (Exception)");
        return stem + "ったら"
      }
			else {return stem + "いたら";}
		}
		else if (['ぐ'].includes(lastchar)) {return stem + "いだら";}
		else if (["す"].includes(lastchar)) {return stem + "したら";}
		else {return "Error";}
	}
	else if (type == "ru") {return stem + "たら";} //Ru-verbs
	else {
		if (word == "する") {return "したら";}
		else if (word == "くる") {return "きたら";}
	} // Irregular
}
