function getAnswer(word, type, opts = {polite:false}) {
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
	$('#random').text(randLabel);

  if (opts.polite) {
    var endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
    var ending = "ません"
  } else {
    var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
    var ending = "ない"
  }
  stem = /(.*)(?!$)/.exec(word)[0];

	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
    if (word == "ある" && !opts.polite) {
      $('#type').text("う-Verb (Godan) (Exception)");
      return "ない";
    }
	  return stem + endings[lastchar] + ending;
	}
	else if (type == "ru") {
    return stem + ending;
  } //Ru-verbs
	else {
		if (word == "する") {return "し" + ending;}
		else if (word == "くる") {
      if (opts.polite) {return "き" + ending;}
      else {return "こ" + ending;}
	   } // Irregular
   }
}

$('.opt').change(function() {answer = getAnswer(word.kana, word.type);});
$('#randomsetting').change(function() {answer = getAnswer(word.kana, word.type);});
