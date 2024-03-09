// Random Quotes generator 
let QuotesText = document.getElementById('paragraph');
let authorName = document.getElementById('authorName');
let button = document.getElementById('btn');
let copyButton = document.getElementById('copyButton');

async function getData() {
    try {
        let response = await fetch('https://dummyjson.com/quotes');

        if (!response.ok) {
            throw new Error("Does not get any data!");
        }

        else {
            var data = await response.json();
            // Event listener to increment the Quotes by clicking on it.
            let currentIndex = 0;
            button.addEventListener('click', () => {
                QuotesText.textContent = data.quotes[currentIndex].quote;
                authorName.textContent = data.quotes[currentIndex].author;
                currentIndex = (currentIndex + 1) % data.quotes.length;
            })

            // Button to copy the Quotes to the clipboard
            copyButton.addEventListener('click', () => {
                let quoteTextCopy = QuotesText.textContent;
                let authorTextCopy = authorName.textContent;
                let TextToCopy = quoteTextCopy + authorTextCopy;

                //It gets only a string not an element
                navigator.clipboard.writeText(TextToCopy);

                copyButton.style.color = "yellow";
                setTimeout(() => {
                    copyButton.style.color = "white";
                }, 2000);
            })
        }
    }

    catch (err) {
        console.log("An error has been occurred!", err.message);
    }
}

getData();