var endings = {く:"け", す:"せ", う:"え", ぐ:"げ", ぶ:"べ", つ:"て", む:"め", ぬ:"ね", る:"れ"};

function getAnswer(word, type) {
	stem = /(.*)(?!$)/.exec(word)[0];
	lastchar = /(.$)/.exec(word)[0];
	return stem + endings[lastchar] + "ば";
}
