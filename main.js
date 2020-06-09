let myLibrary = [];

function Book(book, author, pages, read, index) {
  this.book = book
  this.author = author
  this.pages = pages
  this.read = read
  this.index = index
}

const newBookFunc = () => {
  const title = document.getElementById('title-input');
  const author = document.getElementById('author-input');
  const pages = document.getElementById('pages-input');
  const read = document.getElementById('read');
  const notRead = document.getElementById('not-read');

  if (!title.value ||
    !author.value ||
    !pages.value ||
    (read.checked === false &&
      notRead.checked === false)) return;

  const readOrNot = read.checked ? read.value : notRead.value;
  const newBook = new Book(title.value, author.value, pages.value, readOrNot);
  addBookToLibrary(newBook);

  // Reset form inputs //
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
  notRead.checked = false;
};

// Event listener for 'Add Book' button //
document.getElementById('add-book').addEventListener('click', newBookFunc);

function addBookToLibrary(book) {
  myLibrary.unshift(book);
  render(myLibrary);
}

// Change read status //
const changeRead = (e) => {
  e.target.innerText = e.target.innerText === 'Yes' ? 'No' : 'Yes';
  const targetBook = e.path[2].cells[0].innerHTML;
  myLibrary.filter(index => {
    if (index.book === targetBook) {
      index.read = index.read === 'Yes' ? 'No' : 'Yes';
    }
  });
}

// Remove row from table //
const clearRow = (e) => {
  e.path[2].remove();
  const targetBook = e.path[2].cells[0].innerHTML;
  let bookIndex = myLibrary.findIndex(x => x.book === targetBook);
  myLibrary.splice(bookIndex, 1);
}

// Inserts book input data to new row //
const render = ((inputArr) => {
  const deleteBtn = document.createElement('BUTTON');
  deleteBtn.innerHTML = 'DEL';
  deleteBtn.id = 'delete-btn';

  const readBtn = document.createElement('BUTTON');
  readBtn.innerHTML = inputArr[0].read;
  readBtn.id = 'read-btn';

  const table = document.getElementById('table-body');
  let row;
  row = table.insertRow(0)
  row.insertCell(0).innerHTML = inputArr[0].book;
  row.insertCell(1).innerHTML = inputArr[0].author;
  row.insertCell(2).innerHTML = inputArr[0].pages + ' pages';

  row.insertCell(3).append(readBtn);
  document.getElementById('read-btn').addEventListener('click', changeRead);

  row.insertCell(4).append(deleteBtn);
  document.getElementById('delete-btn').addEventListener('click', clearRow);
});

// Clears entire table and myLibrary array //
const clearTable = () => {
  document.getElementById('table-body').innerHTML = '';
  myLibrary = [];
}

// Event listener for 'Reset' button //
document.getElementById('reset').addEventListener('click', clearTable);