const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show loading 
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading 
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
//Show New Quote 
function newQuote() {
    loading();
    // Pick a random quote from api quotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if Author field is blank and replace with unknown 
    if (!quote.author) {
        authorText.textContent = 'unknown';
    } else {
        authorText.textContent = quote.author;
    }

    //Check quote length for styling 
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //authorText.textContent = quote.author;
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API 
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here
    }
}

// Tweet quote 
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load 
getQuotes();