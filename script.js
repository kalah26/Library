class Book {
    constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    }
}

class Library {
    constructor () {
        this.bookShelf = []
    }
    addNewBook(newBook) {
        this.bookShelf.push(newBook)
    }
}

const library = new Library;

const booksContainer = document.querySelector("books-container");

//user interface

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal")
const addBook = document.querySelector(".addBook")
const registerBook = document.querySelector("#registerBook")

//getting input from user
function getNewBookInfo() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const isRead = document.querySelector("#status").checked;
    return new Book (title, author, pages, isRead)
}

function createNewBook(book) {
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('span');
    const bookAuthor = document.createElement('span');
    const bookPages = document.createElement('span');
    const bookStatus = document.createElement('button')

    bookCard.classList.add("book")

    bookTitle.textContent = `Title: ${book.title}`
    bookAuthor.textContent = `Author: ${book.author}`
    bookPages.textContent = `Pages: ${book.pages}`
    bookStatus.textContent = book.isRead;

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookStatus);
    booksContainer.appendChild(bookCard);
}

function activateModal() {
    overlay.classList.add("active")
    modal.classList.add("active")
}

function removeModal() {
    overlay.classList.remove("active")
    modal.classList.remove("active")
}

const escKeyRemoveModal = (e) => {
    if (e.key === "Escape") removeModal()
}

addBook.addEventListener("click", () => activateModal())
window.onkeydown = escKeyRemoveModal