document.addEventListener("DOMContentLoaded",()=>{
    //loadQuotes();

    const quotesdisp = document.getElementById('quoteDisplay');
    const button= document.getElementById('newQuote');
    const apiUrl = 'https://67a77c4f203008941f67bc6b.mockapi.io/posts/v1/quotes';
    //const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

     
    let quotes = [
        { text: "The only way to do great work is to love what you do.", category: "Inspiration" },
        { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", category: "Wisdom" },
        { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Self-Improvement" },
        { text: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.", category: "Love" },
        { text: "It does not matter how slowly you go as long as you do not stop.", category: "Perseverance" },
        { text: "The only true wisdom is in knowing you know nothing.", category: "Wisdom" },
        { text: "Life is what happens when you're busy making other plans.", category: "Life" },
        { text: "Happiness is not something ready-made. It comes from your own actions.", category: "Happiness" },
        { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
        { text: "Believe you can and you're halfway there.", category: "Motivation" },
        { text: "In three words I can sum up everything I've learned about life: it goes on.", category: "Life" },
        { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", category: "Self-Improvement" },
        { text: "To handle yourself, use your head; to handle others, use your heart.", category: "Leadership" },
        { text: "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", category: "Love" },
        { text: "Challenges are what make life interesting and overcoming them is what makes life meaningful.", category: "Perseverance" },
        { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", category: "Mindfulness" },
        { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
        { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Motivation" },
        { text: "The purpose of our lives is to be happy.", category: "Happiness" },
        { text: "To love and be loved is to feel the sun from both sides.", category: "Love" }
      
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
    
    function addQuote(quotes, newQuote, category ) {
      
            // Create a new quote object
           
            let quoteObject = {
                text: newQuote,
                category: category
            };
        
            // Add the new quote object to the quotes array
            quotes.push(quoteObject);
           
                
            saveQuotes(); 
            populateCategories();       
    
        
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
    //populate categoris to the selectionlist
    function populateCategories() {
         // Extract unique categories
         const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];

         // Populate the dropdown menu
         const dropdown = document.getElementById('categoryFilter');
         uniqueCategories.forEach(category => {
             const option = document.createElement('option');
             option.value = category;
             option.textContent = category;
             dropdown.appendChild(option);
         });
        
    }
    // Filter quotes based on selected category
    function filterQuotes() {
        const dropdown = document.getElementById('categoryFilter');
        const selectedCategory = dropdown.value;
        localStorage.setItem('lastviewed', selectedCategory);

        let filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
        quotesdisp.innerHTML = '';
        filteredQuotes.forEach(quote => {
            quotesdisp.innerHTML += `Quote: "${quote.text}"<br>Category: ${quote.category}<br><br>`;
        });
        //const filteredQuotes = selectedCategory === 'all' ? quotes : quotes.filter(quote => quote.category === selectedCategory);
        

        
        
    }
   
    // Function to load quotes from local storage
    function loadQuotes() {
        const storedQuotesString = localStorage.getItem('quotes');
        return storedQuotesString ? JSON.parse(storedQuotesString) : [];
    }

    // Function to fetch existing quotes from MockAPI
    async function fetchQuotesFromServer() {
        try {
            const response = await fetch(apiUrl);
            return response.ok ? await response.json() : [];
        } catch (error) {
            console.error('Error fetching quotes from MockAPI:', error);
            return [];
        }
    }

    // Function to sync new or changed quotes to MockAPI syncNewQuotesToMockAP
    async function syncQuotes(newQuotes) {
        for (const quote of newQuotes) {
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(quote)
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log('Quote synced:', data);
            } catch (error) {
                console.error('Error syncing quote:', error);
            }
        }
    }

    // Function to check for changes and sync quotes if necessary
    async function checkAndSyncQuotes() {
        const localQuotes = loadQuotes();
        const remoteQuotes = await fetchQuotesFromServer();

        const newQuotes = localQuotes.filter(localQuote => {
            return !remoteQuotes.some(remoteQuote => 
                remoteQuote.text === localQuote.text && 
                remoteQuote.category === localQuote.category
            );
        });

        if (newQuotes.length > 0) {
            await syncQuotes(newQuotes);
            alert('New quotes have been synced to MockAPI.');
        } else {
            console.log('No new quotes to sync.');
        }
    }
       
///////////////////////////////////////////////////////
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
    populateCategories();


    addingq.addEventListener('click',() =>{
       let newQuote= document.getElementById('newQuoteText').value;
        let category= document.getElementById('newQuoteCategory').value;
        addQuote(quotes,newQuote,category);
        populateCategories();
        checkAndSyncQuotes();

        
    });
    

    
    const  dropdownfil= document.getElementById('categoryFilter').addEventListener('change',filterQuotes);
    const filesimported= document.getElementById('importfile').addEventListener('change',importFromJsonFile);
    const exportfile =document.getElementById('export-btn').addEventListener('click',exportoJsonFile);
    
    
    const dropdown = document.getElementById('categoryFilter');

        const lastViewedCategory = localStorage.getItem('lastviewed');
        if (lastViewedCategory) {
            dropdown.value = lastViewedCategory;
            filterQuotes();
        }
   
    
 });
   
