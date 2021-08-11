let myLibrary = [];
function Book(title, author, readStatus){
    this.title = title
    this.author = author
    this.readStatus = readStatus
    this.edit = 'edit'
    this.delete = 'delete'
}

function addBookToLibrary (book) {
    if(myLibrary.some(item => item.title === book.title)){
        alert('error! duplicate attempt detected');
    }  else {
        createHeader();
        myLibrary.push(book);
        clearTable();
        createTable();
    }   
}

const submitBookInfo = document.querySelector('#submit');
submitBookInfo.addEventListener('click', (ev)=>{
    ev.preventDefault();
    addBookToLibrary(new Book(
        document.querySelector('#title').value, 
        document.querySelector('#author').value, 
        document.querySelector('input[name="readStatus"]:checked').value, ));
    document.forms[0].reset();
     
    
})

//creating and appending html table elements, for the library collection
const divWrappingTable = document.querySelector('#table')
const table = document.createElement('table');
divWrappingTable.appendChild(table);
let headerVisibility = false;


function createHeader (){
    if (headerVisibility === false){
        headerVisibility = true;
        const headerRow = document.createElement('tr');
        headerRow.setAttribute('data-visibility', 'visible')
        table.appendChild(headerRow);
        const header = ['Title', 'Author', 'Status', 'Options'];
        header.forEach((heading)=>{
            const cell = document.createElement('th');
            const textNode = document.createTextNode(heading);
            cell.appendChild(textNode);
            headerRow.appendChild(cell);
        }) 
    }
}


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
        selectAllEditBtns();
        selectAllRemoveButtons();
    })
}

function clearTable(){
    const allRows = document.querySelectorAll('tr');
    allRows.forEach(row=>{
        if(!row.hasAttribute('data-visibility')){
            row.remove();
        }
        if (myLibrary.length === 0){
            //set visibility back to original value (false)
            headerVisibility = false;
            //delete the data-visibility row
            row.remove();
        }
    })
}


function selectAllRemoveButtons(){
   let removeBtn = document.querySelectorAll(`[data-row="4"]`);
   assignRemoveButtonEvent(removeBtn);
   assignRemoveButtonDataSet(removeBtn);
   styleIcons (removeBtn);
}

function assignRemoveButtonDataSet(elements){
    elements.forEach((item, index)=>{
        item.setAttribute('data-remove', `${index}`)
    })
}

function assignRemoveButtonEvent(elements) {
    elements.forEach(element => {
        const hasClass = element.classList.contains('material-icons');
        //prevents duplicate event listeners being added, which would result in multiple entries being deleted per click
        if(!hasClass){
            element.addEventListener('click', (ev)=>{
                const whichRowToRemove = Number(ev.target.getAttribute('data-remove'));
                myLibrary.splice(whichRowToRemove, 1);
                clearTable();
                createTable();
            })
        } 
        
    });
}

function styleIcons (btnList){
    btnList.forEach(item=>{
        item.classList.add("material-icons")
    })
}

function selectAllEditBtns(){
    let editBtn = document.querySelectorAll(`[data-row="3"]`);
    assignEditBtnEvent(editBtn);
    assignEditBtnDataSet(editBtn);
    styleIcons(editBtn);
}

function assignEditBtnDataSet(elements){
    elements.forEach((item, index)=>{
        item.setAttribute('data-edit', `${index}`)
    })
}

function assignEditBtnEvent (elements){
    elements.forEach(element => {
        const hasClass = element.classList.contains('material-icons');
        //checking hasClass prevents duplicate event listeners being added(bc exisiting elements already have that class),which would result in multiple entries being deleted per click. 
        if(!hasClass){
            element.addEventListener('click', (ev)=>{
                const whichRowToEdit = Number(ev.target.getAttribute('data-edit'));
                if (myLibrary[whichRowToEdit].readStatus === "completed"){
                    myLibrary[whichRowToEdit].readStatus = 'not-read';

                } else if (myLibrary[whichRowToEdit].readStatus === "currently-reading"){
                    myLibrary[whichRowToEdit].readStatus = 'completed';

                }
                else if (myLibrary[whichRowToEdit].readStatus === "not-read"){
                    myLibrary[whichRowToEdit].readStatus = 'currently-reading';
                }
        
                clearTable();
                createTable();
            })
        } 
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
