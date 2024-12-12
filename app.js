import { API_KEY, UNSPLASH_ACCESS_KEY } from "./config.js";

async function fetchQuote() {
  // fetch("p4_myQuotes.json")
  // fetch("https://type.fit/api/quotes")
  try {
    const result = await fetch("https://api.api-ninjas.com/v1/quotes", {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
      },
    });
    if (result.ok) {
      const [quoteData] = await result.json();
      document.getElementById("quote").innerText = quoteData?.quote;
      document.getElementById("author").innerText = quoteData?.author;
      await fetchUnsplashImage(quoteData?.category);

      //prev quote
      let div = document.createElement("div");
      div.innerText = quoteData?.quote;
      div.classList.add("my-4");
      document.getElementById("modal-body").appendChild(div);
    } else {
      console.log("No response. Status: ", result?.status);
    }
  } catch (error) {
    console.log("Sorry! Some glitch at our end : ", error);
  }
}

//unsplash api call
async function fetchUnsplashImage(category) {
  try {
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${category}&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!unsplashResponse.ok) {
      throw new Error("Failed to fetch image from Unsplash");
    }

    const unsplashData = await unsplashResponse.json();

    if (unsplashData.results.length > 0) {
      // Get the first image from the search results
      const imageUrl = unsplashData.results[0].urls.full;
      console.log("Image URL:", imageUrl);

      // Set the background image of the body
      document.body.style.backgroundImage = `url(${imageUrl})`;
    } else {
      console.log("No image found for the category:", category);
    }
  } catch (error) {
    console.log("Error fetching image from Unsplash:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const fetchQuoteBtn = document.getElementById("fetch_quote");
  fetchQuoteBtn.addEventListener("click", fetchQuote);
});
