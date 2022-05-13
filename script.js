let myLibrary = [];

/* Selectors & Events */

const form = document.querySelector("#form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const isRead = document.querySelector("#read-checker");
const addBtn = document.querySelector("#add-btn");
const booksGrid = document.querySelector("#books-grid");

addBtn.addEventListener("click", addBookToLibrary);

/* Main Script */

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

function addBookToLibrary(event) {
    event.preventDefault();
   let newBook = new Book(title.value, author.value, pages.value, isRead.checked);
   if(!title.value || !author.value || !pages.value) {
       alert("Please, fill all the fields :)");
       return;
   } else {
    myLibrary.push(newBook);
   }

   updateLocalStorage();
   renderBooks();
   form.reset();
}

function createBook(item) {
    const bookDiv = document.createElement("div");
    const titleDiv = document.createElement("div");
    const authorDiv = document.createElement("div");
    const pagesDiv = document.createElement("div");
    const isReadDiv = document.createElement("div");
    const removeBtn = document.createElement("button");

    bookDiv.classList.add("book");

    titleDiv.textContent = `«${item.title}»`;
    titleDiv.classList.add("book-title");
    bookDiv.appendChild(titleDiv);

    authorDiv.textContent = item.author;
    authorDiv.classList.add("book-author");
    bookDiv.appendChild(authorDiv);

    pagesDiv.textContent = `${item.pages} pages`;
    pagesDiv.classList.add("book-pages");
    bookDiv.appendChild(pagesDiv);

    isReadDiv.classList.add("is-book-read");
    bookDiv.appendChild(isReadDiv);
    if(item.isRead) {
        isReadDiv.textContent = "✔"
        isReadDiv.style.backgroundColor = "#52BE80";
    } else {
        isReadDiv.textContent = "✘"
        isReadDiv.style.backgroundColor = "#F1948A";
    }
    isReadDiv.addEventListener("click", () => {
        item.isRead = !item.isRead; 
        updateLocalStorage(); 
        renderBooks();
    })
    
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    bookDiv.appendChild(removeBtn);
    removeBtn.addEventListener("click", () => {        
        myLibrary.splice(myLibrary.indexOf(item), 1);
        updateLocalStorage();
        renderBooks();
    })

    booksGrid.appendChild(bookDiv);
}

function renderBooks() {
    const display = document.querySelector(".books-grid");
    const books = document.querySelectorAll(".book");
    books.forEach(book => display.removeChild(book));

    for (let i = 0; i < myLibrary.length; i++) {
        createBook(myLibrary[i]);
    }
}

/* Local Storage */

function updateLocalStorage() {
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function restoreLibrary() {
    if(!localStorage.myLibrary) {
        renderBooks();
    } else {
        let objects = localStorage.getItem("myLibrary") 
        objects = JSON.parse(objects);
        myLibrary = objects;
        renderBooks();
    }
}

restoreLibrary();



