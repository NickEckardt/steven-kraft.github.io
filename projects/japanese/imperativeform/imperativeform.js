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

  if (opts.neg && !opts.polite) {return word + "な";}
  var endings = {く:"け", す:"せ", う:"え", ぐ:"げ", ぶ:"べ", つ:"て", む:"め", ぬ:"ね", る:"れ"};
	stem = /(.*)(?!$)/.exec(word)[0];
  if (opts.polite && opts.neg) {ending = "なさるな";}
  else if (opts.polite) {ending = "なさい";}
  else {ending = "ろ"}

	if(type == "u") {
    lastchar = /(.$)/.exec(word)[0];

    if (opts.polite) {
      endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
      return stem + endings[lastchar] + ending;
    }

    return stem + endings[lastchar];
	}
	else if (type == "ru") {
    if (word == "くれる") {
      if (opts.polite) {return "くれなさるな"}
      $('#type').text("る-Verb (Ichidan) (Exception)");
      return ["くれ", "くれろ"];
    }
    return stem + ending;
  } //Ru-verbs
	else {
		if (word == "する") {return "し" + ending;}
		else if (word == "くる") {
      if (opts.polite) {return "き" + ending;}
      return "こい";
    }
	} // Irregular
}

$('.opt').change(function() {answer = getAnswer(word.kana, word.type);});
$('#randomsetting').change(function() {answer = getAnswer(word.kana, word.type);});
