import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Book from './Book';
// import * as BooksAPI from '../utils/BooksAPI';

class ListBooks extends Component {


    updateBookShelf = (book, targetShelf) => {
        this.props.updateBookShelf(book, targetShelf)
    }

    render() {
        const currentlyReading =this.props.currentlyReading
        const wantToRead =this.props.wantToRead
        const read =this.props.read
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {currentlyReading.map((book) => (
                                    <li key={book.id}>
                                        <Book book={book} updateBookShelf={this.updateBookShelf}/>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {wantToRead.map((book) => (
                                    <li key={book.id}>
                                        <Book book={book} updateBookShelf={this.updateBookShelf}/>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                    <div className="bookshelf">
                        <h2 className="bookshelf-title">Read</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {read.map((book) => (
                                    <li key={book.id}>
                                        <Book book={book} updateBookShelf={this.updateBookShelf}/>
                                    </li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to="/search" >Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks;