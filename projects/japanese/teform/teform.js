function getAnswer(word, type) {
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
		if (['う', 'つ', 'る'].includes(lastchar)) {return stem + "って";}
		else if (['む', 'ぶ', 'ぬ'].includes(lastchar)) {return stem + "んで";}
		else if (['く'].includes(lastchar)) {
			if (word == "いく" || word == "もっていく") {
        $('#type').text("う-Verb (Godan) (Exception)");
        return stem + "って"
      }
			else {return stem + "いて";}
		}
		else if (['ぐ'].includes(lastchar)) {return stem + "いで";}
		else if (["す"].includes(lastchar)) {return stem + "して";}
		else {return "Error";}
	}
	else if (type == "ru") {return stem + "て";} //Ru-verbs
	else {
		if (word == "する") {return "して";}
		else if (word == "くる") {return "きて";}
	} // Irregular
}
