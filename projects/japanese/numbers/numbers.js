function getAnswer(number) {
  numbers = {
    "0":[""], "1":["いち"], "2":["に"], "3":["さん"], "4":["よん", "し"],
    "5":["ご"], "6":["ろく"], "7":["なな","しち"], "8":["はち"], "9":["く", "きゅう"],
  }

  number = number.replace(/^0+/, '');

  if (number.length == 0) {answer = [""]}
  if (number.length == 1) {answer = numbers[number]}
  if (number.length == 2) {
    var answer = []

    temp = number.substring(0,1);
    if (temp == "1") {tens = [""];}
    else {tens = getAnswer(temp);}

    temp = number.substring(1,2)
    if (temp == "9") {ones = ["きゅう"]}
    else {ones = getAnswer(temp)}

    for (var i = 0; i < tens.length; i++) {
      for (var n = 0; n < ones.length; n++) {
        answer.push(tens[i] + "じゅう" + ones[n]);
      }
    }
  }
  if (number.length == 3) {
    var answer = []

    hundred_nums = {
      "1":"ひゃく", "2":"にひゃく", "3":"さんびゃく", "4":"よんひゃく",
      "5":"ごひゃく", "6":"ろっぴゃく", "7":"ななひゃく", "8":"はっぴゃく",
      "9":"きゅうひゃく",
    }
    hundreds = hundred_nums[number.substring(0,1)]
    suffix = getAnswer(number.substring(1,3))
    for (var i = 0; i < suffix.length; i++) {
      answer.push(hundreds + suffix[i])
    }
  }

  if (number.length == 4) {
    var answer = []

    thousand_nums = {
      "1":"せん", "2":"にせん", "3":"さんぜん", "4":"よんせん",　"5":"ごせん",
      "6":"ろくせん", "7":"ななせん", "8":"はっせん", "9":"きゅうせん",
    }
    thousands = thousand_nums[number.substring(0,1)]
    suffix = getAnswer(number.substring(1,4))
    for (var i = 0; i < suffix.length; i++) {
      answer.push(thousands + suffix[i])
    }
  }

  return answer;
}
