function fetchQuote() {
  // fetch("p4_myQuotes.json")
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    let quote = Math.floor(Math.random() * data.length);
    document.getElementById("quote").innerHTML = data[quote].text;
    document.getElementById("author").innerHTML = data[quote].author;
    let div = document.createElement("div");
    div.innerHTML = data[quote].text;
    div.classList.add("my-4");
    document.getElementById("modal-body").appendChild(div);
    })
}
