function getAnswer(number, issen = true, multiple = true) {
  numbers = {
    "0":[""], "1":["いち"], "2":["に"], "3":["さん"], "4":["よん", "し"],
    "5":["ご"], "6":["ろく"], "7":["なな","しち"], "8":["はち"], "9":["きゅう", "く"],
  }

  if (number.length > 1) {
    number = number.replace(/^0+/, '');
  }

  if (number.length == 0) {answer = [""]}
  if (number.length == 1) {
    if (multiple && number == "0") {
      answer = ["れい", "ぜろ"]
    }
    else {
      answer = numbers[number]
      if (!multiple && answer.length > 1) {answer = answer[0]}
    }
  }
  if (number.length == 2) {
    temp = number.substring(0,1);
    if (temp == "1") {tens = [""];}
    else {tens = getAnswer(temp, true, false);}
    ones = getAnswer(number.substring(1,2), true, false)
    answer = tens + "じゅう" + ones
  }
  if (number.length == 3) {
    hundred_nums = {
      "1":"ひゃく", "2":"にひゃく", "3":"さんびゃく", "4":"よんひゃく",
      "5":"ごひゃく", "6":"ろっぴゃく", "7":"ななひゃく", "8":"はっぴゃく",
      "9":"きゅうひゃく",
    }
    hundreds = hundred_nums[number.substring(0,1)]
    suffix = getAnswer(number.substring(1,3))
    answer = hundreds + suffix
  }
  if (number.length == 4) {
    thousand_nums = {
      "1":"せん", "2":"にせん", "3":"さんぜん", "4":"よんせん",　"5":"ごせん",
      "6":"ろくせん", "7":"ななせん", "8":"はっせん", "9":"きゅうせん",
    }
    thousands = thousand_nums[number.substring(0,1)]
    if (thousands == "せん" && issen) {thousands = "いっせん"}
    suffix = getAnswer(number.substring(1,4))
    answer = thousands + suffix
  }
  if (number.length >= 5 && number.length <= 8) {
    prefix = getAnswer(number.substring(0,number.length-4))
    suffix = getAnswer(number.substring(number.length-4, number.length))
    answer = prefix + "まん" + suffix
  }

  return answer;
}
