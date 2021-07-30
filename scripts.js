let myLibrary = [];
let tempHolder;
function Book(title, author, readStatus){
    this.title = title
    this.author = author
    this.readStatus = readStatus
    this.delete = 'delete';
    this.edit = 'edit';
    
}

function addBookToLibrary (book) {
    if(myLibrary.some(item => item.title === book.title)){
        alert('error! duplicate attempt detected')
        return;

    }  else {
        myLibrary.push(book);
        clearTable();
        createTable();
    }
    
}

const submitBookInfo = document.querySelector('#submit');
submitBookInfo.addEventListener('click', (ev)=>{
        ev.preventDefault();
        tempHolder = new Book(
        document.querySelector('#title').value, 
        document.querySelector('#author').value, 
        document.querySelector('input[name="readStatus"]:checked').value, 
     );
     addBookToLibrary(tempHolder);
     document.forms[0].reset();
     
    
})

//creating and appending html table elements, for the library collection
const divWrappingTable = document.querySelector('#table')
const table = document.createElement('table');
divWrappingTable.appendChild(table);
const headerRow = document.createElement('tr');
table.appendChild(headerRow);

const header = ['Title', 'Author', 'Status'];
header.forEach((heading)=>{
    const cell = document.createElement('th');
    const textNode = document.createTextNode(heading);
    cell.appendChild(textNode);
    headerRow.appendChild(cell);

})

function createTable (){
    myLibrary.forEach(book=>{
        const row = document.createElement('tr');
        Object.values(book).forEach((property, index) =>{
            const cell = document.createElement('td');
            cell.setAttribute('data-row',`${index}`);
            const textInCell = document.createTextNode(property);

            cell.appendChild(textInCell);
            row.appendChild(cell);
        })  
        table.appendChild(row);
        selectAllRemoveButtons();
    })
}

function clearTable(){
    const allRows = document.querySelectorAll('tr');
    allRows.forEach(row=>{
        row.remove();
    })
}


function selectAllRemoveButtons(){
   let removeBtn = document.querySelectorAll(`[data-row="3"]`);
   assignRemoveButtonDataSet(removeBtn);
   assignRemoveButtonEvent(removeBtn);
   styleRemoveIcons(removeBtn);
}

function assignRemoveButtonDataSet(elements){
    elements.forEach((item, index)=>{
        item.setAttribute('data-remove', `${index}`)
    })
}

function assignRemoveButtonEvent(elements) {
    elements.forEach(element => {
        element.addEventListener('click', (ev)=>{
           const whichRowToRemove = ev.target.getAttribute('data-remove');
           console.log(whichRowToRemove);
        })
    });
}

function styleRemoveIcons(removeBtn){
    removeBtn.forEach(item=>{
        item.classList.add("material-icons")
    })
}


// header.reduce((cell, heading)=>{
//     cell = document.createElement('th');
//     const textNode = document.createTextNode(heading);
//     cell.appendChild(textNode);
//     headerRow.appendChild(cell);
// },0)

// table.appendChild(headerRow);

//table body


// function displayBooks (){
//     myLibrary.reduce((accumulator, currentBook => {
//         const tableElement = document.createElement
//     })
//  )}
