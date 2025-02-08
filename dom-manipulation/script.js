document.addEventListener("DOMContentLoaded",()=>{
    //loadQuotes();

    const quotesdisp = document.getElementById('quoteDisplay');
    const button= document.getElementById('newQuote');
    let quotes = [
        { text: "The only way to do great work is to love what you do.", category: "Inspirational" },
       
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
    function exportoJsonFile() {
        //document.getElementById('export-btn').addEventListener('click', function() {
            // Replace this with your array of quotes
           

            // Create a Blob from the quotes array
            const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });

            // Create a link element
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'quotes.json';

            // Append the link to the body (required for Firefox)
            document.body.appendChild(link);

            // Programmatically click the link to trigger the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
       // });
        
    }

    function importFromJsonFile(event) {
         const fileReader = new FileReader();
        fileReader.onload = function(event) {
            try {
                const importedQuotes = JSON.parse(event.target.result);
                quotes.push(...importedQuotes);
                saveQuotes();
                alert('Quotes imported successfully!');
            } catch (error) {
                alert('Failed to import quotes. Please ensure the file is in the correct format.');
                console.error('Import error:', error);
            }
    };
    fileReader.readAsText(event.target.files[0]);
  }
    button.addEventListener("click",showRandomQuote);

    let addingq= document.getElementById('add');

    addingq.addEventListener('click',() =>{
       let newQuote= document.getElementById('newQuoteText').value;
        let category= document.getElementById('newQuoteCategory').value;
        addQuote(quotes,newQuote,category);
    });
    const filesimported= document.getElementById('importfile').addEventListener('change',importFromJsonFile);
    const exportfile =document.getElementById('export-btn').addEventListener('click',exportoJsonFile);
    
    
    
    
    });








    // script.js
    /*

   

    <script>
        document.getElementById('export-btn').addEventListener('click', function() {
            // Replace this with your array of quotes
            const quotes = [
                { author: "Albert Einstein", quote: "Life is like riding a bicycle. To keep your balance you must keep moving." },
                { author: "Isaac Newton", quote: "If I have seen further it is by standing on the shoulders of Giants." }
            ];

            // Create a Blob from the quotes array
            const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });

            // Create a link element
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'quotes.json';

            // Append the link to the body (required for Firefox)
            document.body.appendChild(link);

            // Programmatically click the link to trigger the download
            link.click();

            // Remove the link from the document
            document.body.removeChild(link);
        });
    */
    
    
    
    
    
    
    
    
    
    
    
    
    
    