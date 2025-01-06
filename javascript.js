let section = document.querySelector('section');
let bookGrid = document.querySelector('.bookGrid');
let tooltip = document.querySelector('.tooltip');

const newButton = document.querySelector('.new-book');
const newBookForm = document.querySelector('.newBookForm');
const submitButton = document.querySelector('.submitButton');
const cancelButton = document.querySelector('.cancelButton');






let myLibrary = [{title:'Woods', image:'https://i.ibb.co/vPXFgCk/4.png', read : true}, {title:'The Whispering Throne', image:'https://i.ibb.co/ncgGhVm/2.png', read : false}, {title:'Hide And Seek', image:'https://i.ibb.co/F05DKH1/3.jpg', read : true}];

function Book(title, image, read){ //construcor
    this.title = title,
    this.image = image,
    this.read = read
};

function curator(title, image, read){ //construct then push
    let nBook = new Book(title, image, read);
    myLibrary.push(nBook);
};

let cardCreator = function(){ //render the books

    if(myLibrary.length > 0){
        myLibrary.forEach((book, index) => {
            
            
            let newBook = document.createElement('div'); //child 
                newBook.classList.add("card");

            let bookTitle = document.createElement('div'); //grand-child
            let bookImage = document.createElement('img'); //grand-child
            let crossButton = document.createElement('div'); //grand-child
            let readStatus = document.createElement('div'); //grand-child
            
            bookTitle.innerHTML = (myLibrary[`${index}`]).title ; 
            //--------------------------------------------------------
            bookImage.src = (myLibrary[`${index}`]).image ;
            //--------------------------------------------------------
            crossButton.classList.add('cardCross');
            crossButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2c5.53 0 10 4.47 10 10s-4.47 10-10 10S2 17.53 2 12S6.47 2 12 2m3.59 5L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41z"/></svg>';
            crossButton.addEventListener('click', function(event){ //deletes book array item and card
            
            if(confirm('Delete the Book?')){
                // const currentChild = bookGrid.children[index];
            const currentChild = crossButton.parentElement;
            const childrenArray = bookGrid.children;
            const rank = Array.prototype.indexOf.call(childrenArray, currentChild);

            myLibrary.splice(rank, 1); //remove from the array
            bookGrid.removeChild(currentChild); //remove from the dom parent
                    };
            });
            // 
            //--------------------------------------------------------
            readStatus.classList.add('readStatus');
            readStatus.innerHTML ='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m9 20.42l-6.21-6.21l2.83-2.83L9 14.77l9.88-9.89l2.83 2.83z"/></svg>';
            readStatus.style.color = myLibrary[index].read ? 'green' : 'red';
            
            readStatus.addEventListener('click', function(){

                const currentCard = readStatus.parentElement;
                const arrayOfCards = bookGrid.children;
                const rank = Array.prototype.indexOf.call(arrayOfCards, currentCard);

                console.log(rank);
                
                // readStatus.style.color = 'green' ? 'red' : 'green';

                if(readStatus.style.color == 'red'){
                    readStatus.style.color = 'green';
                    (myLibrary[rank]).read = true;
                    console.log(myLibrary[rank].read);
                }else{
                    readStatus.style.color = 'red';
                    (myLibrary[rank]).read = false;
                    console.log(myLibrary[rank].read);
                }

                tooltip.innerHTML = (readStatus.style.color == 'red') ? 'Not read' : 'Read';
            });

            readStatus.addEventListener('mouseover', function(){

                let rect = readStatus.getBoundingClientRect();

                tooltip.style.top = rect.top + 'px';
                tooltip.style.left = rect.left - 90 +  'px';
                tooltip.innerHTML = (readStatus.style.color == 'red' )? 'Not read' : 'Read';
                
                tooltip.style.visibility = 'visible';
            });

            readStatus.addEventListener('mouseleave', function(){
                tooltip.style.visibility = 'hidden';
            });
            //--------------------------------------------------------
            newBook.appendChild(bookImage);
            newBook.appendChild(bookTitle);
            newBook.appendChild(crossButton);
            newBook.appendChild(readStatus);
            //--------------------------------------------------------

            newBook.addEventListener('mouseover', function(){
                let cardCross = newBook.querySelector('.cardCross');
                let readStatus = newBook.querySelector('.readStatus');

                cardCross.style.visibility = 'visible';
                readStatus.style.visibility = 'visible';
            });
            newBook.addEventListener('mouseleave', function(){
                let cardCross = newBook.querySelector('.cardCross');
                let readStatus = newBook.querySelector('.readStatus');

                cardCross.style.visibility = 'hidden';
                readStatus.style.visibility = 'hidden';
            });
            //--------------------------------------------------------
            bookGrid.appendChild(newBook); //parent
            }
        );
    }
}

cardCreator();

// ////////////////////////////////////////////////////////////////////////////
// ///////////////////////////FORM EVENTS/////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////
newButton.addEventListener('click', function(){
    section.style.filter = 'blur(10px)';
    newBookForm.style.visibility = 'visible';

    newButton.classList.add('nav-Button-click');
    setTimeout(() => {
    newButton.classList.remove('nav-Button-click');
        
    }, 50);
});

function hideForm(){
    let sliderBox = newBookForm.querySelector('.slider');
    let switchBox = newBookForm.querySelector('.switch');

    sliderBox.style.display = 'none';
    switchBox.style.display = 'none';

    setTimeout(() => {
        sliderBox.style.display = 'block';
    switchBox.style.display = 'block';
    }, 25);

    section.style.filter = 'none';
    newBookForm.style.visibility = 'hidden';
}

cancelButton.addEventListener('click', function(){
    hideForm();
});

document.addEventListener('keydown', function(e){
    if(e.key === "Escape"){
        hideForm();
    };
});

// document.addEventListener('click', function(event){
//     if(!event.target.closest('.newBookForm') && !newBookForm.checkVisibility()){
//             section.style.filter = 'none';
//             newBookForm.style.visibility = 'hidden';
//     };
// });


newBookForm.addEventListener('submit', function(e){
    
    //clear cards
    e.preventDefault();
    if(myLibrary.length > 0 && bookGrid.hasChildNodes){
        myLibrary.forEach(function(){
        bookGrid.lastChild.remove();
    });
};
    
    //create a new book + add it to the array
    let form = document.querySelector('form');
    let formData = new FormData(form);
    // console.log(formData);
    const title = formData.get('title');
    const url = formData.get('url');
    const read = (formData.get('read') == 'on')? true : false;

    console.log(read);
    curator(title, url, read);

    //refill cards
    cardCreator();
    
    //hide the form
    newBookForm.style.visibility = 'hidden';
    section.style.filter = 'none';

    console.log(myLibrary);

});
// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////

let xqc = 1;