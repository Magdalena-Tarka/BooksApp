/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars
{
  'use strict';
    
  const select = {
    booksList: '.books-list',
    coverImage: '.book__image',
    filtersForm: '.filters',
  };

  const templates = {
    booksList: Handlebars.compile(document.querySelector('#template-book').innerHTML),
  };

  class BookList {
    constructor(data) {
      this.data = data;
      
      this.initBookList();
      this.getElements();
      this.initActions();
    }
    
    initBookList() {
      this.data = dataSource.books;
      console.log('this.data:', this.data);
    
      for(const bookId of this.data) {
      //console.log('1. bookId:', bookId);
        const generatedHTML = templates.booksList(bookId);
        //console.log('2.', generatedHTML);
        const element = utils.createDOMFromHTML(generatedHTML);
        //console.log('3.', element);
        const booksListContainer = document.querySelector(select.booksList);
        //console.log('4.', booksListContainer);
        booksListContainer.appendChild(element);
      }
    }
    
    getElements() {
      this.dom = {
        booksList: document.querySelector(select.booksList),
        coverImage: document.querySelector(select.coverImage),
        filtersForm: document.querySelector(select.filtersForm),
      };
    }
    
    initActions() {
      const favoriteBooks = [];
      const filters = [];
        
      this.dom.booksList.addEventListener('dblclick', function(event) {
        event.preventDefault();
        
        if(event.target.offsetParent.classList.contains('book__image')) {
          //console.log('nasłuchiwacz działa!', event.target.offsetParent);
        
          const clickedElem = event.target.offsetParent;
          const clickedBookId = clickedElem.getAttribute('data-id');
            
          if(clickedElem.classList.contains('favorite')) {
            clickedElem.classList.remove('favorite');
            favoriteBooks.splice(favoriteBooks.indexOf(clickedBookId), 1); // Dlaczego nie odejmujemy 1 od clickedElem, przecież jest wyższy o 1 od index w arr?
            //console.log('X. favoriteBooks:', favoriteBooks);
              
          } else {
            clickedElem.classList.add('favorite');
            favoriteBooks.push(clickedBookId);
            //console.log('XX. favoriteBooks:', favoriteBooks);
          }
        }
      });
        
      this.dom.filtersForm.addEventListener('click', function(event) {
        event.preventDefault();
        const clickedElem = event.target;
        console.log('1. clickedElem:',clickedElem);
          
        if(clickedElem.tagName === 'INPUT' && clickedElem.type === 'checkbox' && clickedElem.name === 'filter') console.log('2. clickedElem.value:', clickedElem.value);
          
        if(clickedElem.checked) {
          filters.push(clickedElem.value);
          console.log('X. filters:', filters);
        } else {
          filters.splice(filters.indexOf(clickedElem.value), 1);
          console.log('XX. filters:', filters);
        }
        //this.filterBooks();
      });    
    }
      
    filterBooks() {}
      
    determineRatingBgc() {}
      
  }
  const app = new BookList();
  console.log(app);
}
