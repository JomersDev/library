//Variables
let myLibrary = [];

//Constructor for the book object
class Book {
    constructor(Title, Author, Pages, Read) {
    this.Title = Title;
    this.Author = Author;
    this.Pages = Pages;
    this.Read = Read;
  }
}
//function that creates a new book and adds it to the library array
function addBookToLibrary(Title, Author, Pages, Read) {
    let book = new Book(Title, Author, Pages, Read);
    myLibrary.push(book);
    displayBookOnPage();
  }

//loops through the array and displays the book objects information in a "card" on screen
function displayBookOnPage() {
    const books = document.querySelector(".books");

    //remove the divs and reset the loop of the array so no double ups of book objects occur
    while (books.firstChild) {
        books.removeChild(books.firstChild);
    }

    //loop through the book object array and display the info on the screen
    let index = 0;
    myLibrary.forEach((myLibrarys) => { 
        const card = document.createElement("div");
        card.classList.add("card");
        books.appendChild(card);

        //loop through the object properties, turning them into paragraphs that display on the card
        for (let key in myLibrarys) {
            const paragraph = document.createElement("p");
            paragraph.textContent = `${myLibrarys[key]}`
            card.appendChild(paragraph);
          }

        let updateStatusBtn = document.createElement("button");
        updateStatusBtn.innerText = "Update Status";
        updateStatusBtn.classList.add("updateStatus");
        card.appendChild(updateStatusBtn);

        let deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("delete");
  
        deleteBtn.dataset.linkedArray = index;
        index++;
        card.appendChild(deleteBtn);
  
        deleteBtn.addEventListener('click', removeBook);
  
        function removeBook() {
            let bookToRemove = deleteBtn.dataset.linkedArray;
            myLibrary.splice(parseInt(bookToRemove), 1);
            card.remove();
            displayBookOnPage();
        }

        card.firstChild.classList.add("book-title-card");

        //assigning the read status of a book based on text content
        if(card.lastChild.previousSibling.previousSibling.textContent == "Has been read") {
            card.lastChild.previousSibling.previousSibling.classList.add("book-has-been-read");
        } else if (card.lastChild.previousSibling.previousSibling.textContent == "Not read"){
            card.lastChild.previousSibling.previousSibling.classList.add("book-not-read");
        }

        //adding eventListener for updateStatus button
        updateStatusBtn.addEventListener('click', updateReadStatus);

        function updateReadStatus() {
            if (card.lastChild.previousSibling.previousSibling.textContent == "Has been read") {
                card.lastChild.previousSibling.previousSibling.innerText = "Not read";
                card.lastChild.previousSibling.previousSibling.className = ("book-not-read");
            } else if (card.lastChild.previousSibling.previousSibling.textContent == "Not read") {
                card.lastChild.previousSibling.previousSibling.innerText = "Has been read";
                card.lastChild.previousSibling.previousSibling.className = ("book-has-been-read");
            }
        }
    })
}

//Grabbing user inputs and assigning them to variables
const addForm = document.forms["add-form"];

addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const bookTitle = addForm.querySelector('input[name="title"]').value;
    const bookAuthor = addForm.querySelector('input[name="author"]').value;
    const bookPages = addForm.querySelector('input[name="pages"]').value;
    let bookRead = "";
    if (document.getElementById("read").checked) {
        bookRead = "Has been read";   
    } else {
        bookRead = "Not read";
    }
    //const bookRead = addForm.querySelector('input[name="read"]').value;
    addBookToLibrary(bookTitle, bookAuthor, bookPages, bookRead);
});

//Javascript Form Validation
(function javascriptFormValidation() {
    //Book title validation
    const formTitle = document.getElementById("title");

    formTitle.addEventListener('input', () => {
        formTitle.setCustomValidity('');
        formTitle.checkValidity();
    });
    
    formTitle.addEventListener('invalid', () => {
        if (formTitle.value === '') {
            formTitle.setCustomValidity('Please enter a Book title');
        }
    });
    
    //Book Author validation
    const formAuthor = document.getElementById("author");
    
    formAuthor.addEventListener('input', () => {
        formAuthor.setCustomValidity('');
        formAuthor.checkValidity();
    });
    
    formAuthor.addEventListener('invalid', () => {
        if (formAuthor.value === '') {
            formAuthor.setCustomValidity('Please enter the Author');
        }
    });
})();

//testing that the addBookToLibrary function works correctly

addBookToLibrary("Sample Book", "John Smith", 101, "Has been read");