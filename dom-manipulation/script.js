document.addEventListener("DOMContentLoaded",()=>{
    //loadQuotes();

    const quotesdisp = document.getElementById('quoteDisplay');
    const button= document.getElementById('newQuote');
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
    
    
    function showRandomQuote() {
        // Generate a random index within the range of the quotes array length
        let randomIndex = Math.floor(Math.random() * quotes.length);
    
        // Select a random quote based on the generated index
        let randomQuote = quotes[randomIndex];
    
        // Return the random quote
        quotesdisp.innerHTML= `Quote: "${randomQuote.text}"<br>Category: ${randomQuote.category}`;
        //return `Quote: "${randomQuote.quote}"\nCategory: ${randomQuote.category}`;
    }
    
    // saving new quotes to local storage 
    function saveQuotes() {
      
        try {
            localStorage.setItem('quotes', JSON.stringify(quotes));
            let newQuote= document.getElementById('newQuoteText');
            let category= document.getElementById('newQuoteCategory');
            newQuote.value="";
            category.value="";

            alert("Quotes saved successfully!");
        } catch (e) {
            alert("Failed to save quotes.");
            console.error("Error saving quotes: ", e);
        }
       

    }
    function loadQuotes() {
        let storedQuotesString = localStorage.getItem('quotes');
        let storedQuotes = JSON.parse(storedQuotesString);
    
          
    
        
    }
    
    function addQuote(quotes, newQuote, category ) {
      
            // Create a new quote object
           
            let quoteObject = {
                text: newQuote,
                category: category
            };
        
            // Add the new quote object to the quotes array
            quotes.push(quoteObject);
           
                
            saveQuotes();        
    
        
    }
    function importFromJsonFile(event){
        // Logic to import json file.
        console.log('importFromJsonFile function called')
      }
    button.addEventListener("click",showRandomQuote);

    let addingq= document.getElementById('add');

    addingq.addEventListener('click',() =>{
       let newQuote= document.getElementById('newQuoteText').value;
        let category= document.getElementById('newQuoteCategory').value;
        addQuote(quotes,newQuote,category);
    });
    
    
    
    
    });








    // script.js
    /*

    function addQuote() {
        // Your code to add a new quote goes here
        console.log("addQuote function called!");
        const newQuoteText = document.getElementById("newQuoteText").value;
        const newQuoteCategory = document.getElementById("newQuoteCategory").value;
        
        if (newQuoteText.trim() && newQuoteCategory.trim()){
          // Logic to save the quote. For now let's just display it
          const quoteDisplay = document.getElementById("quoteDisplay");
          const quoteElement = document.createElement('p');
          quoteElement.textContent = `"${newQuoteText}" - ${newQuoteCategory}`;
          quoteDisplay.appendChild(quoteElement);

          //Clear fields.
           document.getElementById("newQuoteText").value = "";
           document.getElementById("newQuoteCategory").value = "";
        } else{
          alert('Please enter a quote and a category');
        }
    }

     function importFromJsonFile(event){
       // Logic to import json file.
       console.log('importFromJsonFile function called')
     }

    //Other js code
    */
    
    
    
    
    
    
    
    
    
    
    
    
    
    