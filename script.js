let myLibrary = []; //This holds all the books of the library
let globalindex = 0;

//Defines a book's structure
class Book{
  constructor(author, title, numOfPages, isRead, index) {
    this.author = author;
    this.title = title;
    this.numOfPages = numOfPages;
    this.isRead = isRead;
    this.index = index;
  }
}

const validate = () => {
  let flag = true;
  if(!document.getElementById('author').value){
    document.getElementById('author-error').innerText = "required";
    document.getElementById('author').classList.add('error-border');
    flag = false;
  }
  else{
    document.getElementById('author-error').innerText = "";
    document.getElementById('author').classList.remove('error-border');
  }
  if(!document.getElementById('title').value){
    document.getElementById('title-error').innerText = "required";
    document.getElementById('title').classList.add('error-border');
    flag = false;
  }
  else{
    document.getElementById('title-error').innerText = "";
    document.getElementById('title').classList.remove('error-border');
  }
  if(!document.getElementById('numOfPages').value){
    document.getElementById('numOfPages-error').innerText = "required";
    document.getElementById('numOfPages').classList.add('error-border');
    flag = false;
  }
  else{
    document.getElementById('numOfPages-error').innerText = "";
    document.getElementById('numOfPages').classList.remove('error-border');
  }
  return flag;
}

//Function to add the book to the array once the submit button is clicked
const addBookToLibrary = (ev)=>{
  ev.preventDefault();
  if(!validate()){
    console.log("here");
    return;
  }
  
  cb = document.querySelector("#read");
  let book =  new Book(document.getElementById('author').value, document.getElementById('title').value, document.getElementById('numOfPages').value, cb.checked, globalindex)
  globalindex++;
  myLibrary.push(book);
  document.forms[0].reset();
  displayAddBookButton();
  createDiv();
  document.getElementById('author-error').innerText = "";
  document.getElementById('title-error').innerText = "";
  document.getElementById('numOfPages-error').innerText = "";
  document.getElementById('author').classList.remove('error-border');
  document.getElementById('title').classList.remove('error-border');
  document.getElementById('numOfPages').classList.remove('error-border');
} 

//Make form visible in order to be able to add a book
function displayForm() {
  var form = document.getElementById('formNotVisible');
  form.setAttribute('id', 'formVisible');
  var addBookButton = document.getElementById('addBookButtonVisible')
  addBookButton.setAttribute('id', 'addBookButtonNotVisible')
}

//After a book is submitted, display the button again to add a book
function displayAddBookButton() {
  var form = document.getElementById('formVisible');
  form.setAttribute('id', 'formNotVisible');
  var addBookButton = document.getElementById('addBookButtonNotVisible')
  addBookButton.setAttribute('id', 'addBookButtonVisible')
}

//After everything is loaded, link submit button to addBook function
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('submitButton').addEventListener('click', addBookToLibrary);
});


//Used to generate background background colors for books
function randomcolor() {
  return Math.floor(Math.random() * 255);
}

//This creates the visual part of the book
function styleDiv(input) {
  input.style.backgroundColor= 'rgba('+randomcolor()+','+randomcolor()+','+randomcolor()+'\)';
  input.style.width="fit-content";
  input.style.height="fit-content";
  input.style.border='1px';
  input.style.borderStyle='solid';
  input.style.borderColor='black';
}

//Add delete and mark read buttons to a book passed into this function
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

//Deletes book passed into this function
function deleteBook(evt) {
  evt.currentTarget.myParam.remove();
}

//This is the functionality behind marking a book as read or unread
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
