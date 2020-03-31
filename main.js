let myLibrary = [
  {
    book: 'Catcher and the Rye',
    author: 'That guy',
    pages: 243,
    read: 'yes'
  },
  {
    book: 'The Bible',
    author: 'Unknown',
    pages: 1034,
    read: 'no'
  }
];

function Book(book, author, pages, read) {
  this.book = book
  this.author = author
  this.pages = pages
  this.read = read
}

// Variables for input information
let title = document.getElementById('titleInput');
let author = document.getElementById('authorInput');
let pages = document.getElementById('pagesInput');
let wasRead = document.getElementById('wasRead');
let notRead = document.getElementById('notRead');

let newBookFunc = () => {
  let readOrNot = wasRead.checked ? wasRead.value : notRead.value;
  let newBook = new Book(title.value, author.value, pages.value, readOrNot);
  title.value = '';
  author.value = '';
  pages.value = '';
  addBookToLibrary(newBook);
};

// Event listener for 'Add Book' button
document.getElementById('addBook').addEventListener('click', newBookFunc);


function addBookToLibrary(book) {
  myLibrary.unshift(book);
  render(myLibrary);
}

// Inserts book input data to new row
let render = ((inputArr) => {
  const table = document.getElementById('tableBody');
  let row;
  row = table.insertRow(0)
  row.insertCell(0).innerHTML = inputArr[0].book;
  row.insertCell(1).innerHTML = inputArr[0].author;
  row.insertCell(2).innerHTML = inputArr[0].pages;
  row.insertCell(3).innerHTML = inputArr[0].read;
});