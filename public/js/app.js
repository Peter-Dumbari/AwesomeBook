const menu = document.querySelectorAll('.item-menu');
const h1 = document.querySelector('h1');
const contain = document.querySelector('.contain');
const currentDate = document.querySelector('.current-date p');
let books = [];

/* eslint-disable no-unused-vars */
const menuActive = (menu, active) => {
  for (let i = 0; i < menu.length; i += 1) {
    menu[i].classList.remove('active');
  }
  active.classList.add('active');
};

const generateTable = () => {
  contain.innerHTML = 'List of book content';
};

const generateAddForm = () => {
  contain.innerHTML = 'Add new book content';
};

const generateContactForm = () => {
  contain.innerHTML = 'Contact content';
};

const removeBook = (index) => {
  books = books.filter((book) => book.title !== books[index].title);
  localStorage.setItem('books', JSON.stringify(books));
  generateTable();
};

const changeTitle = (itemMenu = '#page-0') => {
  let text = '';
  switch (itemMenu) {
    case '#page-0':
      text = 'All awesome books';
      generateTable();
      break;
    case '#page-1':
      text = 'Add a new book';
      generateAddForm();
      break;
    case '#page-2':
      text = 'Contact information';
      generateContactForm();
      break;
    default:
      text = 'Contact information';
      generateContactForm();
      break;
  }
  h1.innerHTML = text;
};

menu.forEach((x, i) => {
  menu[i].addEventListener('click', () => {
    changeTitle(menu[i].getAttribute('href'));
    menuActive(menu, menu[i]);
  });
});

const formatDate = () => {
  const today = new Date();
  const options = {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric',
  };
  return today.toLocaleDateString('en-US', options);
};

const generateCurrentDate = () => {
  currentDate.innerHTML = formatDate();
};

document.addEventListener('DOMContentLoaded', () => {
  setInterval(generateCurrentDate, 1000);
  changeTitle();
  menuActive(menu, menu[0]);

  if (localStorage.getItem('books')) {
    books = JSON.parse(localStorage.getItem('books'));
  }
  generateTable();
});

const validateForm = () => {
  const title = document.getElementById('title');
  const author = document.getElementById('author');

  const newBook = {
    title: title.value,
    author: author.value,
    created_at: formatDate(),
  };

  const success = books.push(newBook);
  localStorage.setItem('books', JSON.stringify(books));
  if (success >= books.length) {
    title.value = '';
    author.value = '';
    generateTable();
    return true;
  }
  return false;
};
