/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
    
  const select = {
    booksList: '.books-list',
    coverImage: '.book__image',
    filtersForm: '.filters',
    book: '.book__image',
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  class BookList {
    constructor() {
      this.data = dataSource.books;
      this.favoriteBooks = [];
      this.filters = [];
        
      this.renderBookList();
      this.getElements();
      this.initActions();
    }
    
    renderBookList() {
    
      for(const bookId of this.data) {
        //console.log('0. bookId:', bookId);
          
        this.rating = bookId.rating;
        //console.log('1. this.rating:', this.rating);
          
        bookId.ratingBgc = this.determineRatingBgc(this.rating);  // bookId. poprostu dodaje właściwośc DONT FORGET!!
        bookId.ratingWidth = this.rating * 10;
        //console.log('2. ratingBgc:', bookId.ratingBgc);
          
        const generatedHTML = templates.booksList(bookId);
        //console.log('4.', generatedHTML);
        const element = utils.createDOMFromHTML(generatedHTML);
        //console.log('3.', element);
        const booksListContainer = document.querySelector(select.booksList);
        booksListContainer.appendChild(element);
      }
    }
    
    getElements() {
      this.dom = {
        booksList: document.querySelector(select.booksList),
        coverImage: document.querySelector(select.coverImage),
        filtersForm: document.querySelector(select.filtersForm),
        book: document.querySelector(select.book),
      };
    }
    
    initActions() {
      const thisBookList = this;
        
      this.dom.booksList.addEventListener('dblclick', function(event) {
        event.preventDefault();
        
        if(event.target.offsetParent.classList.contains('book__image')) {
        
          const clickedElem = event.target.offsetParent;
          const clickedBookId = clickedElem.getAttribute('data-id');
            
          if(clickedElem.classList.contains('favorite')) {
            clickedElem.classList.remove('favorite');
            thisBookList.favoriteBooks.splice(thisBookList.favoriteBooks.indexOf(clickedBookId), 1); // Kamil dlaczego nie odejmujemy 1 od clickedElem, przecież jest wyższy o 1 od index w arr?
            //console.log('X. favoriteBooks:', thisBookList.favoriteBooks);
              
          } else {
            clickedElem.classList.add('favorite');
            thisBookList.favoriteBooks.push(clickedBookId);
            //console.log('XX. favoriteBooks:', thisBookList.favoriteBooks);
          }
        }
      });
        
      this.dom.filtersForm.addEventListener('click', function() {
        thisBookList.clickedElem = event.target;
        //console.log('1. clickedElem:',thisBookList.clickedElem);
          
        if(thisBookList.clickedElem.checked !== undefined) {
          //console.log('2. clickedElem.value:', thisBookList.clickedElem.value);
          
          if(thisBookList.clickedElem.checked) {
            thisBookList.filters.push(thisBookList.clickedElem.value);
            //console.log('X. filters:', thisBookList.filters);
              
          } else {
            thisBookList.filters.splice(thisBookList.filters.indexOf(thisBookList.clickedElem.value), 1);
            //console.log('XX. filters:', thisBookList.filters);
          }
          thisBookList.filterBooks();
        }
      });    
    }
      
    filterBooks() {
      console.log(this.data);
        
      for(const book of this.data) {
        let shouldBeHidden = false;
          
        for(const filter of this.filters) {
          if(!book.details[filter]) {
            shouldBeHidden = true;
            break;
          }
        }
        if(shouldBeHidden) {    // DONT FORGET!! wystarczy wpisać zmienną-wynik true or false
          document.querySelector('.book__image[data-id="' + book.id + '"]').classList.add('hidden');   // jezeli byłby element dom to referencja prowadzi tylko tylko do szabonu w html, dlatego musi być id konkretnej book
        } else {      // ZAPAMIĘTAJ TEN PRZYKŁAD!!
          document.querySelector('.book__image[data-id="' + book.id + '"]').classList.remove('hidden');
        }
      }
    }
      
    determineRatingBgc() {
      let background = '';
      if(this.rating <= 6) {
        background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(this.rating > 6 && this.rating <= 8) {
        background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(this.rating > 8 && this.rating <= 9) {
        background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (this.rating > 9) {
        background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return background;
    }
      
  }
  const app = new BookList(dataSource.books);
  console.log(app);
    
  /*const app = {
    initializeProject: function(){
      new BookList();
    }
  };
  app.initializeProject();*/
  // Może być jeszcze w ten sposób zapisane, Kamil który sposób jest lepszy?
}
