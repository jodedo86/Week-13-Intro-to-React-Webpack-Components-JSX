// bookService.ts

const apiUrl = "http://localhost:3000/books";

// Fetch all books from the API
export async function fetchBooks() {
  try {
    const response = await fetch(apiUrl);
    const books = await response.json();
    return books;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}

// Add a new book
export async function addBook(title: string, author: string, year: string) {
  try {
    await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, year }),
    });
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
}

// Delete a book by ID
export async function deleteBook(id: number) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
}
