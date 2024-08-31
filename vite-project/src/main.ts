// main.ts

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import { fetchBooks, addBook, deleteBook } from "./bookService";

// Wait until the DOM content is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  const bookForm = document.getElementById("bookForm") as HTMLFormElement;
  const bookList = document.getElementById("bookList") as HTMLElement;
  const button = document.getElementById("button")!;

  // Function to display books in the list
  function displayBooks(books: any[]) {
    bookList.innerHTML = "";

    books.forEach((book) => {
      const li = document.createElement("li");
      li.classList.add("list-group-item");
      li.textContent = `${book.title} by ${book.author}, ${book.year}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "float-end");
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", async () => {
        await deleteBook(book.id);
        loadBooks();
      });

      li.appendChild(deleteBtn);
      bookList.appendChild(li);
    });
  }

  // Load books and display them
  async function loadBooks() {
    const books = await fetchBooks();
    displayBooks(books);
  }

  // Handle form submission to add a new book
  button.addEventListener("click", async (e: MouseEvent) => {
    e.preventDefault();
    const title = (document.getElementById("title") as HTMLInputElement).value;
    const author = (document.getElementById("author") as HTMLInputElement)
      .value;
    const year = (document.getElementById("year") as HTMLInputElement).value;

    await addBook(title, author, year);
    bookForm.reset();
    loadBooks();
  });

  // Initial fetch to load and display books when the page loads
  loadBooks();
});
