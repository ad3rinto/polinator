//Example fetch using https://api.tomorrow.io

const dateToday = new Date().toDateString()
document.querySelector('#dateOfDay').innerHTML = `<h1>${dateToday}</h1>`;
document.querySelector('button').addEventListener('click', getFetch)


function importText(textFile) {
  "use strict";
  var rawFile = new XMLHttpRequest();
  var allText = "";
  rawFile.open("Get", textFile, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allText = rawFile.responseText;
      }
    }
  }
  rawFile.send(null);
  return allText;
}

const key = importText("key.txt")





function getFetch() {
  const location = document.querySelector('#pCode').value

  console.log(location)
  const API_KEY = key
  const url = `https://api.tomorrow.io/v4/timelines?location=${location}&timesteps=1d&units=metric&apikey=${API_KEY}&fields=treeIndex,grassIndex,weedIndex`

  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      const pollenData = data.data.timelines[0].intervals[0].values
      if (pollenData.treeIndex >= 3) {
        document.querySelector("h3" + ".tree").innerHTML = "HIGH"
        document.querySelector("h3" + ".tree").classList.add("high")
      } else if (pollenData.treeIndex > 1) {
        document.querySelector("h3" + ".tree").innerHTML = "MEDIUM"
        document.querySelector("h3" + ".tree").classList.add("medium")
      } else {
        document.querySelector("h3" + ".tree").innerHTML = "LOW"
        document.querySelector("h3" + ".tree").classList.add("low")
      }


      if (pollenData.grassIndex >= 3) {
        document.querySelector("h3" + ".grass").innerHTML = "HIGH"
        document.querySelector("h3" + ".grass").classList.add("high")
      } else if (pollenData.grassIndex > 1) {
        document.querySelector("h3" + ".grass").innerHTML = "MEDIUM"
        document.querySelector("h3" + ".grass").classList.add("medium")
      } else {
        document.querySelector("h3" + ".grass").innerHTML = "LOW"
        document.querySelector("h3" + ".grass").classList.add("low")
      }


      if (pollenData.weedIndex >= 3) {
        document.querySelector("h3" + ".weed").innerHTML = "HIGH"
        document.querySelector("h3" + ".weed").classList.add("high")
      } else if (pollenData.weedIndex > 1) {
        document.querySelector("h3" + ".weed").innerHTML = "MEDIUM"
        document.querySelector("h3" + ".weed").classList.add("medium")
      } else {
        document.querySelector("h3" + ".weed").innerHTML = "LOW"
        document.querySelector("h3" + ".weed").classList.add("low")
      }


    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}