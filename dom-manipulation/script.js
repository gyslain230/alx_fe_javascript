const quotesdisp = document.getElementById('quoteDisplay');



function showRandomQuote(quotes) {
    // Generate a random index within the range of the quotes array length
    let randomIndex = Math.floor(Math.random() * quotes.length);

    // Select a random quote based on the generated index
    let randomQuote = quotes[randomIndex];

    // Return the random quote
    quotesdisp.innerHTML= `Quote: "${randomQuote.quote}"\nCategory: ${randomQuote.category}`;
    //return `Quote: "${randomQuote.quote}"\nCategory: ${randomQuote.category}`;
}
function createAddQuoteForm(quotes, newQuote, category ) {
  
        // Create a new quote object
        let quoteObject = {
            text: newQuote,
            category: category
        };
    
        // Add the new quote object to the quotes array
        quotes.push(quoteObject);
       
            let listItem = document.createElement("li");
            listItem.textContent = `Quote: "${quoteObject.quote}" - Category: ${quoteObject.category}`;
            quotesdisp.appendChild(listItem);

    
}









let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Inspirational" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", category: "Inspirational" },
    { text: "Happiness is not something ready-made. It comes from your own actions.", category: "Happiness" },
    { text: "The purpose of our lives is to be happy.", category: "Happiness" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" },
    { text: "The road to success and the road to failure are almost exactly the same.", category: "Success" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom" },
    { text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.", category: "Wisdom" },
    { text: "Where there is love there is life.", category: "Love" },
    { text: "Love is composed of a single soul inhabiting two bodies.", category: "Love" }
];


