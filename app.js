function fetchQuote() {
  fetch("https://type.fit/api/quotes")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    let quote = Math.floor(Math.random() * data.length);
    document.getElementById("quote").innerHTML = data[quote].text;
    document.getElementById("author").innerHTML = data[quote].author;
    });
}