var conj = {
  "Causative" : causativeform,
  "Conditional" : conditionalform,
  "Imperative" : imperativeform,
  "Negative" : negativeform,
  "Passive" : passiveform,
  "Past" : pastform,
  "Polite" : politeform,
  "Potential" : potentialform,
  "Provisional" : provisionalform,
  "て-Form" : teform,
  "Volitional" : volitionalform
};

var count = 0
for (var c in conj) {
  var item = "<li class=\"tg-list-item\"><h4>" + c + "</h4>\n"
  item += "<input class=\"tgl tgl-light form\" id=\"" + c + "\" type=\"checkbox\" checked/>";
  item += "\n<label class=\"tgl-btn\" for=\"" + c + "\"></label></li>";
  if(count == 3){
    item += "<div></div>";
    count = 0;
  } else {count++;}
  $("#formsettings").append(item);
}

var randLabel = "";
var form = "";
var checked_forms = []
updateCheckedForms()

function getAnswer(word, type){
  form = checked_forms[Math.floor(Math.random()*checked_forms.length)];
  var answer = conj[form](word, type);
  $('#form').text(form + " " + randLabel);
  return answer;
}

function updateCheckedForms(){
  checked_forms = []
  for (var prop in conj){
    if ($("#" + prop).is(':checked')){checked_forms.push(prop);}
  }
  if(checked_forms.length == 0) {checked_forms = Object.keys(conj);}
}

$('.form').change(function() {
  updateCheckedForms()
  if(!checked_forms.includes(form)) {answer = getAnswer(word.kana, word.type);}
});

function causativeform(word, type, opts = {short:false, neg:false, polite:false, passive:false}) {
	for (opt in opts) {opts[opt] = Math.random() >= 0.5;}

	randLabel = "Form"
  if(opts.passive) {randLabel = "Passive " + randLabel}
  if(opts.short) {randLabel = "Short " + randLabel}
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}
	if(opts.neg) {randLabel = "Negative " + randLabel}

  var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
    var presuff = opts.short ? "し" : "せ";
    if (opts.passive) {presuff = "せられ";}
    if (opts.passive && opts.short) {presuff = "され"}
    var short_end = opts.passive ? "される" : "す";
    var short_neg_end = opts.passive ? "されない" : "さない";

    if (opts.short && opts.polite && opts.neg) {answer = stem + endings[lastchar] + presuff + "ません";}
    else if (opts.short && opts.polite) {answer = stem + endings[lastchar] + presuff + "ます";}
    else if (opts.polite && opts.neg) {answer = stem + endings[lastchar] + presuff + "ません";}
    else if (opts.short && opts.neg) {answer = stem + endings[lastchar] + short_neg_end;}
    else if (opts.short) {answer = stem + endings[lastchar] + short_end;}
    else if (opts.polite) {answer = stem + endings[lastchar] + presuff + "ます";}
    else if (opts.neg) {answer = stem + endings[lastchar] + presuff + "ない";}
	  else {answer = stem + endings[lastchar] + presuff + "る";}

    return answer;
	}
	else if (type == "ru") {
    if (opts.passive && opts.short) {
      newWord();
      return ""
    }
    var root = stem + "さ";
    if(opts.passive){
      if (opts.polite && opts.neg) {return root + "せられません";}
      else if (opts.polite) {return root + "せられます";}
      else if (opts.neg) {return root + "せられない";}
      else {return root + "せられる";}
    }
    if (opts.short && opts.polite && opts.neg) {return root + "しません";}
    else if (opts.short && opts.polite) {return root + "します";}
    else if (opts.polite && opts.neg) {return root + "せません";}
    else if (opts.short && opts.neg) {return root + "さない";}
    else if (opts.short) {return root + "す";}
    else if (opts.polite) {return root + "せます";}
    else if (opts.neg) {return root + "せない";}
    else {return root + "せる";}
  }
	else {
    if (opts.passive && opts.short) {
      newWord();
      return ""
    }
    var irrending = "せる";

    if (opts.short && opts.polite && opts.neg) {irrending = "しません";}
    else if (opts.short && opts.polite) {irrending = "します";}
    else if (opts.polite && opts.neg) {irrending = "せません";}
    else if (opts.short && opts.neg) {irrending = "さない";}
    else if (opts.short) {irrending = "す";}
    else if (opts.polite) {irrending = "せます";}
    else if (opts.neg) {irrending = "せない";}

    if(opts.passive){
      if (opts.polite && opts.neg) {irrending = "せられません";}
      else if (opts.polite) {irrending = "せられます";}
      else if (opts.neg) {irrending = "せられない";}
      else {irrending = "せられる";}
    }

		if (word == "する") {return "さ" + irrending;}
		else if (word == "くる") {return "こさ" + irrending;}
	}
}

function conditionalform(word, type, opts = {neg:false, polite:false}) {
	for (opt in opts) {opts[opt] = Math.random() >= 0.5;}

	randLabel = "Form"
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}
	if(opts.neg) {randLabel = "Negative " + randLabel}

	var pol_endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
	var neg_endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};

	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
		if (opts.polite && opts.neg) {return stem + pol_endings[lastchar] + "ませんでしたら";}
		if (opts.neg) {return stem + neg_endings[lastchar] + "なかったら";}
		if (opts.polite) {return stem + pol_endings[lastchar] + "ましたら";}
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
	else if (type == "ru") {
		if (opts.polite && opts.neg) {return stem + "ませんでしたら";}
		if (opts.neg) {return stem + "なかったら";}
		if (opts.polite) {return stem + "ましたら";}
		return stem + "たら";
	} //Ru-verbs
	else {
		if (opts.polite && opts.neg) {
			if (word == "する") {return "しませんでしたら";}
			else if (word == "くる") {return "きませんでしたら";}
		}
		if (opts.polite) {
			if (word == "する") {return "しましたら";}
			else if (word == "くる") {return "きましたら";}
		}
		if (opts.neg) {
			if (word == "する") {return "しなかったら";}
			else if (word == "くる") {return "こなかったら";}
		}
		if (word == "する") {return "したら";}
		else if (word == "くる") {return "きたら";}
	} // Irregular
}

function imperativeform(word, type, opts = {neg:false, polite:false}) {
	for (opt in opts) {opts[opt] = Math.random() >= 0.5;}

	randLabel = "Form"
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}
	if(opts.neg) {randLabel = "Negative " + randLabel}

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

function negativeform(word, type, opts = {polite:false}) {
	for (opt in opts) {opts[opt] = Math.random() >= 0.5;}

	randLabel = "Form"
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}

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

function passiveform(word, type, opts = {neg:false, polite:false}) {
	for (opt in opts) {opts[opt] = Math.random() >= 0.5;}

	randLabel = "Form"
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}
	if(opts.neg) {randLabel = "Negative " + randLabel}

  if (opts.polite && opts.neg) {var ending = "ません";}
  else if (opts.polite) {var ending = "ます";}
  else if (opts.neg) {var ending = "ない";}
  else {var ending = "る"}
  var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
	  return stem + endings[lastchar] + "れ" + ending;
	}
	else if (type == "ru") {return stem + "られ" + ending;} //Ru-verbs
	else {
		if (word == "する") {return "され" + ending;}
		else if (word == "くる") {return "こられ" + ending;}
	} // Irregular
}

function pastform(word, type, opts = {neg:false, polite:false}) {
	for (opt in opts) {opts[opt] = Math.random() >= 0.5;}

	randLabel = "Form"
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}
	if(opts.neg) {randLabel = "Negative " + randLabel}

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

function politeform(word, type, opts = {neg:false}) {
	for (opt in opts) {opts[opt] = Math.random() >= 0.5;}

	randLabel = "Form"
	if(opts.neg) {randLabel = "Negative " + randLabel}

	var endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
	stem = /(.*)(?!$)/.exec(word)[0];
  if (opts.neg) {ending = "ません";}
  else {ending = "ます"}

	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
    return stem + endings[lastchar] + ending;
	}
	else if (type == "ru") {return stem + ending;} //Ru-verbs
	else {
    if (word == "する") {return "し" + ending;}
  	else if (word == "くる") {return "き" + ending;}
	} // Irregular
}

function potentialform(word, type, opts = {neg:false, polite:false}) {
	for (opt in opts) {opts[opt] = Math.random() >= 0.5;}

	randLabel = "Form"
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}
	if(opts.neg) {randLabel = "Negative " + randLabel}

	var endings = {く:"け", す:"せ", う:"え", ぐ:"げ", ぶ:"べ", つ:"て", む:"め", ぬ:"ね", る:"れ"};
	var meaningPrefix = "can"
	if (opts.polite && opts.neg) {ending = "ません"}
	else if (opts.polite) {ending = "ます"}
	else if (opts.neg) {ending = "ない"}
	else {ending = "る"}
	stem = /(.*)(?!$)/.exec(word)[0];
	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
	  return stem + endings[lastchar] + ending;
	}
	else if (type == "ru") {return stem + "られ" + ending;} //Ru-verbs
	else {
		if (word == "する") {return "でき" + ending;}
		else if (word == "くる") {return "こられ" + ending;}
	} // Irregular
}

function provisionalform(word, type, opts = {neg:false, polite:false}) {
	for (opt in opts) {opts[opt] = Math.random() >= 0.5;}

	randLabel = "Form"
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}
	if(opts.neg) {randLabel = "Negative " + randLabel}

	stem = /(.*)(?!$)/.exec(word)[0];
	lastchar = /(.$)/.exec(word)[0];

	if (opts.polite && opts.neg) {ending = "ませんなら"}
	else if (opts.polite) {ending = "ますなら"}
	else if (opts.neg) {
		ending = "なければ"
		endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	}
	else {
		if (type == "u") {ending = "ば";}
		else {ending = "れば";}
		endings = {く:"け", す:"せ", う:"え", ぐ:"げ", ぶ:"べ", つ:"て", む:"め", ぬ:"ね", る:"れ"};
	}

	if (opts.polite) {endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};}

	if (type == "u") {return stem + endings[lastchar] + ending;}
	else if (type == "ru") {return stem + ending;}
	else {
		if (opts.neg && !opts.polite && word == "くる") {return "こなければ";}
		else if (opts.polite || opts.neg){
			if (word == "する") {return "し" + ending;}
			else if (word == "くる") {return "き" + ending;}
		}
		else {return stem + ending}
	}
}

function teform(word, type, opts = {neg:false, polite:false}) {
	for (opt in opts) {opts[opt] = Math.random() >= 0.5;}

	randLabel = "Form"
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}
	if(opts.neg) {randLabel = "Negative " + randLabel}

	stem = /(.*)(?!$)/.exec(word)[0];
	var endings = {く:"か", す:"さ", う:"わ", ぐ:"が", ぶ:"ば", つ:"た", む:"ま", ぬ:"な", る:"ら"};
	var pol_endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};

	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
		if (opts.neg && opts.polite) {return stem + pol_endings[lastchar] + "ませんで"}
		else if (opts.neg) {
			neg_stem = stem + endings[lastchar] + "な"
			return [neg_stem + "くて", neg_stem + "いで"]
		}
		else if (opts.polite) {return stem + pol_endings[lastchar] + "まして"}
		else {
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
	}
	else if (type == "ru") {
		if (opts.neg && opts.polite) {return stem + "ませんで";}
		else if (opts.neg) {return [stem + "なくて", stem + "ないで"]}
		else if (opts.polite) {return stem + "まして";}
		else {return stem + "て";}
	} //Ru-verbs
	else {
		if (opts.neg && opts.polite) {
			if (word == "する") {return "しませんで";}
			else if (word == "くる") {return "きませんで";}
		}
		else if (opts.neg) {
			if (word == "する") {return ["しなくて", "しないで"];}
			else if (word == "くる") {return ["こなくて", "こないで"];}
		}
		else if (opts.polite) {
			if (word == "する") {return "しまして";}
			else if (word == "くる") {return "きまして";}
		}
		else {
			if (word == "する") {return "して";}
			else if (word == "くる") {return "きて";}
		}
	} // Irregular
}

function volitionalform(word, type, opts = {polite:false}) {
	for (opt in opts) {opts[opt] = Math.random() >= 0.5;}

	randLabel = "Form"
	if(opts.polite) {randLabel = "Polite " + randLabel}
	else {randLabel = "Plain " + randLabel}

	if (opts.polite) {
		var ending = "ましょう"
		var endings = {く:"き", す:"し", う:"い", ぐ:"ぎ", ぶ:"び", つ:"ち", む:"み", ぬ:"に", る:"り"};
	}
	else {
		var ending = "う"
		var endings = {く:"こ", す:"そ", う:"お", ぐ:"ご", ぶ:"ぼ", つ:"と", む:"も", ぬ:"の", る:"ろ"};
	}

	stem = /(.*)(?!$)/.exec(word)[0];

	if(type == "u") {
		lastchar = /(.$)/.exec(word)[0];
	  return stem + endings[lastchar] + ending;
	}
	else if (type == "ru") {
		if (opts.polite) {return stem + ending}
		return stem + "よう";
	} //Ru-verbs
	else {
		if (!opts.polite) {
			ending = "よう"
			if (word == "くる") {return "こ" + ending;}
		}
		if (word == "する") {return "し" + ending;}
		else if (word == "くる") {return "き" + ending;}
	} // Irregular
}
