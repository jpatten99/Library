let myLibrary = [];
let globalindex = 0;

/* function Book(author, title, numOfPages, isRead) {
  // the constructor...
  this.author = author;
  this.title = title;
  this.numOfPages = numOfPages;
  this.isRead = isRead;
  this.index = globalindex;

} */

class Book{
  constructor(author, title, numOfPages, isRead, index) {
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
    this.index = index;
  }
}

const addBookToLibrary = (ev)=>{
  ev.preventDefault();
  cb = document.querySelector("#read");
  let book =  new Book(document.getElementById('author').value, document.getElementById('title').value, document.getElementById('numOfPages').value, cb.checked, globalindex)
  
  /*let book = {
    author: document.getElementById('author').value,
    title: document.getElementById('title').value,
    numOfPages: document.getElementById('numOfPages').value,
    read: cb.checked,
    index: globalindex
  } */
  globalindex++;
  myLibrary.push(book);
  document.forms[0].reset();
  displayAddBookButton();
  createDiv();
  console.log(myLibrary);
  console.log(cb.checked);
} 

function displayForm() {
  var form = document.getElementById('formNotVisible');
  form.setAttribute('id', 'formVisible');
  var addBookButton = document.getElementById('addBookButtonVisible')
  addBookButton.setAttribute('id', 'addBookButtonNotVisible')
}

function displayAddBookButton() {
  var form = document.getElementById('formVisible');
  form.setAttribute('id', 'formNotVisible');
  var addBookButton = document.getElementById('addBookButtonNotVisible')
  addBookButton.setAttribute('id', 'addBookButtonVisible')
}

document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('submitButton').addEventListener('click', addBookToLibrary);
});



function randomcolor() {
  return Math.floor(Math.random() * 255);
}

function styleDiv(input) {
  input.style.backgroundColor= 'rgba('+randomcolor()+','+randomcolor()+','+randomcolor()+'\)';
  input.style.width="fit-content";
  input.style.height="fit-content";
  input.style.border='1px';
  input.style.borderStyle='solid';
  input.style.borderColor='black';
}
function addButtons(input) {
  let delBtn = document.createElement('button');
  delBtn.innerText = "Delete Book";
  delBtn.classList.add('delBtn')
  input.appendChild(delBtn);
  delBtn.addEventListener('click', deleteBook, false);
  delBtn.myParam = delBtn.parentElement;

  let readBtn = document.createElement('button');
  readBtn.innerText = "Mark Read/Unread";
  readBtn.classList.add('readBtn')
  input.appendChild(readBtn);
  readBtn.addEventListener('click', readBook, false);
  readBtn.myParam2 = readBtn.parentElement;
}
//diplays book on screen when book is submitted
function createDiv() {
  let myObj = myLibrary[myLibrary.length-1];
  let author = myObj["author"];
  let title = myObj["title"];
  let numOfPages = myObj["numOfPages"];
  let read = myObj.isRead === true ? 'read' : 'unnnread';
  let index = myObj["index"];
  let div = document.createElement('div');
  div.setAttribute('id', (globalindex-1));
  div.setAttribute('class', myObj.isRead===true ? 'read' : 'unread');
  styleDiv(div);
  div.innerText = "author: " + author + "\n" + "title: " + title + "\n" + "Number of pages: " + numOfPages + "\n" + "Read/Unread: " + read + "\n"; 
  addButtons(div);
  document.body.appendChild(div);
}

function deleteBook(evt) {
  evt.currentTarget.myParam.remove();
}


function readBook(evt) {
  objIndex = parseInt(evt.currentTarget.myParam2.id);
  myObj = myLibrary[objIndex]
  if(evt.currentTarget.myParam2.className==='read') {
    evt.currentTarget.myParam2.innerText = "author: " + myObj["author"] + "\n" + "title: " + myObj["title"] + "\n" + "Number of pages: " + myObj["numOfPages"] + "\n" + "Read/Unread: unread" + "\n";
    evt.currentTarget.myParam2.setAttribute('class', 'unread');
    addButtons(evt.currentTarget.myParam2);
  }
  else {
    evt.currentTarget.myParam2.innerText = "author: " + myObj["author"] + "\n" + "title: " + myObj["title"] + "\n" + "Number of pages: " + myObj["numOfPages"] + "\n" + "Read/Unread: read" + "\n";
    evt.currentTarget.myParam2.setAttribute('class', 'read');
    addButtons(evt.currentTarget.myParam2);
  }
}
