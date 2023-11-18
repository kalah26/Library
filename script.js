class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = '0',
        isRead = false
    ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    toggleRead() {
        this.classList.toggle('read')
    }
}

class Library {
    constructor() {
        this.bookShelf = []
    }

    addNewBook(newBook) {
        this.bookShelf.push(newBook);
    }

    removeBook(title) {  
        this.bookShelf.splice(this.bookShelf.findIndex(book => book.title === title), 1);
    }
}

const library = new Library;

const booksContainer = document.querySelector(".books-container");

//user interface

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const addBook = document.querySelector(".addBook");
const registerBook = document.querySelector("#registerBook");
const bookForm = document.querySelector("#bookForm");
const removeButton = document.querySelector(".removeButton")
const statusTButton = document.querySelector(".statusButton")

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
    const bookControls = document.createElement('div');
    const removeButton = document.createElement('button');
    const statusButton = document.createElement('button');

    bookCard.classList.add("book");
    bookControls.classList.add("bookControl");
    removeButton.classList.add("removeButton");
    statusButton.classList.add("statusButton");

    bookTitle.textContent = `Title: ${book.title}`
    bookAuthor.textContent = `Author: ${book.author}`
    bookPages.textContent = `Pages: ${book.pages}`
    removeButton.textContent = `Remove`
    if (book.isRead) {
        statusButton.textContent = `Read`
        statusButton.classList.add("read")
    } else {
        statusButton.textContent = `not read`
    }

    bookControls.appendChild(removeButton);
    bookControls.appendChild(statusButton);

    bookCard.appendChild(bookTitle);
    bookCard.appendChild(bookAuthor);
    bookCard.appendChild(bookPages);
    bookCard.appendChild(bookControls);
    booksContainer.appendChild(bookCard);

    statusButton.addEventListener('click', ()=> {
        if(statusButton.textContent == `not read`) {
            book.isRead = true;
            statusButton.classList.add('read');
            statusButton.textContent = `read`;
        } else {
            book.isRead = false;
            statusButton.classList.remove('read');
            statusButton.textContent = `not read`
        }
    })

    removeButton.addEventListener('click', (e) => {
        console.log(e.target.parentNode.parentNode.firstChild.textContent)
        library.removeBook(e.target.parentNode.parentNode.firstChild.textContent)
        updateBookshelf();
    })
}

function resetBookshelf() {
    booksContainer.innerHTML = '';
}

function updateBookshelf() {
    resetBookshelf();
    for (let i = 1; i < library.bookShelf.length; i++) {
        createNewBook(library.bookShelf[i])
    }
}

function addNewBook(e) {
    // e.preventDefault();
    const newBook = getNewBookInfo();
    createNewBook(newBook);
    library.addNewBook(newBook)
    updateBookshelf();
    removeModal()
}

function activateModal() {
    overlay.classList.add("active")
    modal.classList.add("active")
}

function removeModal() {
    overlay.classList.remove("active")
    modal.classList.remove("active")
}

function resetForm() {
    bookForm.reset();
}

const escKeyRemoveModal = (e) => {
    if (e.key === "Escape") removeModal()
}

addBook.addEventListener("click", () => {
    activateModal()
    resetForm()
})
registerBook.addEventListener("click", ()=> {
    addNewBook()
})

bookForm.onsubmit = addNewBook()
window.onkeydown = escKeyRemoveModal