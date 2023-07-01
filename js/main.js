//Example fetch using https://api.tomorrow.io

const dateToday = new Date().toDateString()
document.querySelector('#dateOfDay').innerHTML = `<h1>${dateToday}</h1>`;
document.querySelector('button').addEventListener('click', getFetch)

function getFetch() {
  const location = document.querySelector('#pCode').value

  console.log(location)
  const API_KEY = ''
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
      document.querySelector("h3" + ".grass").innerHTML = pollenData.grassIndex
      document.querySelector("h3" + ".weed").innerHTML = pollenData.weedIndex

    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}