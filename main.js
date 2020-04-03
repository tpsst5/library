let myLibrary = [];

function Book(book, author, pages, read, index) {
  this.book = book
  this.author = author
  this.pages = pages
  this.read = read
  this.index = index
}

const newBookFunc = () => {
  const title = document.getElementById('titleInput');
  const author = document.getElementById('authorInput');
  const pages = document.getElementById('pagesInput');
  const wasRead = document.getElementById('wasRead');
  const notRead = document.getElementById('notRead');

  if(!title.value || 
    !author.value || 
    !pages.value || 
    (wasRead.checked === false && 
    notRead.checked === false)) return;

  const readOrNot = wasRead.checked ? wasRead.value : notRead.value;
  const newBook = new Book(title.value, author.value, pages.value, readOrNot);
  addBookToLibrary(newBook);

  // Reset required alerts
  // window.alert = '';

  // Reset form inputs 
  title.value = '';
  author.value = '';
  pages.value = '';
  wasRead.checked = false;
  notRead.checked = false;
};

// Event listener for 'Add Book' button
document.getElementById('addBook').addEventListener('click', newBookFunc);

function addBookToLibrary(book) {
  myLibrary.unshift(book);
  render(myLibrary);
}

// Change read status
const changeRead = (e) => { 
  e.target.innerText = e.target.innerText === 'Yes' ? 'No' : 'Yes';
  const targetBook = e.path[2].cells[0].innerHTML;
  myLibrary.filter(index => {
    if (index.book === targetBook) {
      index.read = index.read === 'Yes' ? 'No' : 'Yes';
    } 
  });
} 

// Remove row from table
const clearRow = (e) => {
  e.path[2].remove();
  const targetBook = e.path[2].cells[0].innerHTML;
  let bookIndex = myLibrary.findIndex(x => x.book === targetBook);
  myLibrary.splice(bookIndex, 1);
}

// Inserts book input data to new row
const render = ((inputArr) => {
  const delBtn = document.createElement('BUTTON');
  delBtn.innerHTML = 'DEL';
  delBtn.id = 'delBtn';

  const readBtn = document.createElement('BUTTON');
  readBtn.innerHTML = inputArr[0].read;
  readBtn.id = 'readBtn';

  const table = document.getElementById('tableBody');
  let row;
  row = table.insertRow(0)
  row.insertCell(0).innerHTML = inputArr[0].book;
  row.insertCell(1).innerHTML = inputArr[0].author;
  row.insertCell(2).innerHTML = inputArr[0].pages + ' pages';

  row.insertCell(3).append(readBtn);
  document.getElementById('readBtn').addEventListener('click', changeRead);

  row.insertCell(4).append(delBtn);
  document.getElementById('delBtn').addEventListener('click', clearRow);
});

// Clears entire table and myLibrary array
const clearTable = () => {
  document.getElementById('tableBody').innerHTML = ''; 
  myLibrary = [];
}

// Event listener for 'Reset' button
document.getElementById('reset').addEventListener('click', clearTable);