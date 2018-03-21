function getAnswer(word, type, opts = {neg:false, polite:false}) {
	rand = $('#randomsetting').is(':visible')
	if(rand && $('#randomsetting').is(':checked')) {
		for (opt in opts) {opts[opt] = Math.random() >= 0.5;}
	}
	else {
		$(".opt").each(function( index ) {
			opts[$(this).prop("name")] = $(this).is(':checked')
		});
	}

	var randLabel = "Form"
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}
	if(opts.neg) {randLabel = "Negative " + randLabel}
	$('#random').text(randLabel);

	var endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
	var a_endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};

	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
    lastchar = /(.$)/.exec(word)[0];
    ending = endings[lastchar];
    a_ending = a_endings[lastchar];

    if (opts.polite && opts.neg) {return stem + ending + "ませんでした";}
    else if (opts.polite) {return stem + ending + "ました";}
    else if (opts.neg) {
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
    if (opts.polite && opts.neg) {return stem + "ませんでした";}
    else if (opts.polite) {return stem + "ました";}
    else if (opts.neg) {return stem　+ "なかった";}
    return stem + "た"; //Ru-verbs
  }
	else {
		if (word == "する") {
      if (opts.polite && opts.neg) {return "しませんでした";}
      else if (opts.polite) {return "しました";}
      else if (opts.neg) {return "しなかった";}
      return "した";
    }
		else if (word == "くる") {
      if (opts.polite && opts.neg) {return "きませんでした";}
      else if (opts.polite) {return "きました";}
      else if (opts.neg) {return "こなかった";}
      return "きた";
    }
	} // Irregular
}

$('.opt').change(function() {answer = getAnswer(word.kana, word.type);});
$('#randomsetting').change(function() {answer = getAnswer(word.kana, word.type);});
