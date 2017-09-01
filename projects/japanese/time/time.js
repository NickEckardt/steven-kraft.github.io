function getAnswer(hour, minute, ampm = 0) {
  hours = ["", "いち", "に", "さん", "よ", "ご", "ろく", "しち", "はち", "く", "じゅう", "じゅういち", "じゅうに"]
  minutes = ["", "いっ", "に", "さん", "よん", "ご", "ろっ", "しち", "はっ", "きゅう"]
  tens = ["", "", "に", "さん", "よん", "ご"]
  ampms = ["", "ごぜん", "ごご"]

  answers = []

  if (minute == 0) {minkana = ""}
  else if (minute < 10) {minkana = minutes[minute]}
  else if (minute % 10 == 0) {minkana = tens[Math.floor(minute/10)] + "じゅっ"}
  else {minkana = tens[Math.floor(minute/10)] + "じゅう" + minutes[minute % 10]}

  if (minkana == "") {mincounter = ""}
  else if (minkana.slice(-1) == "っ" || minkana.slice(-1) == "ん") {mincounter = "ぷん"}
  else {mincounter = "ふん"}



  answers.push(ampms[ampm] + hours[hour] + "じ" + minkana + mincounter)
  if (minute == 30) {answers.push(ampms[ampm] + hours[hour] + "じはん")}
  return answers
}
