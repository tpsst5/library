let myLibrary = [];

function Book(book, author, pages, read, index) {
  this.book = book
  this.author = author
  this.pages = pages
  this.read = read
  this.index = index
}

// Variables for input information
let title = document.getElementById('titleInput');
let author = document.getElementById('authorInput');
let pages = document.getElementById('pagesInput');
let wasRead = document.getElementById('wasRead');
let notRead = document.getElementById('notRead');

let bookIndex = 0;

let newBookFunc = () => {
  if(!title.value || !author.value || !pages.value || (wasRead.checked === false && notRead.checked === false)) return;
  let readOrNot = wasRead.checked ? wasRead.value : notRead.value;
  let newBook = new Book(title.value, author.value, pages.value, readOrNot, bookIndex);
  bookIndex++;
  title.value = '';
  author.value = '';
  pages.value = '';
  wasRead.checked = false;
  notRead.checked = false;
  addBookToLibrary(newBook);
};

// Event listener for 'Add Book' button
document.getElementById('addBook').addEventListener('click', newBookFunc);

function addBookToLibrary(book) {
  myLibrary.unshift(book);
  render(myLibrary);
}

// Change read status
let changeRead = (e) => { 
  e.target.innerText = e.target.innerText === 'Yes' ? 'No' : 'Yes';
} 

// Remove row from table
let clearRow = (e) => e.path[2].remove();

// Inserts book input data to new row
let render = ((inputArr) => {
  let delBtn = document.createElement('BUTTON');
  delBtn.innerHTML = 'DEL';
  delBtn.id = 'delBtn';

  let readBtn = document.createElement('BUTTON');
  readBtn.innerHTML = inputArr[0].read;
  readBtn.id = 'readBtn';

  const table = document.getElementById('tableBody');
  let row;
  row = table.insertRow(0)
  row.insertCell(0).innerHTML = inputArr[0].book;
  row.insertCell(1).innerHTML = inputArr[0].author;
  row.insertCell(2).innerHTML = inputArr[0].pages;

  row.insertCell(3).append(readBtn);
  document.getElementById('readBtn').addEventListener('click', changeRead);

  row.insertCell(4).append(delBtn);
  document.getElementById('delBtn').addEventListener('click', clearRow);
});

// Clears entire table
let clearTable = () => document.getElementById('tableBody').innerHTML = '';

// Event listener for 'Reset' button
document.getElementById('reset').addEventListener('click', clearTable);