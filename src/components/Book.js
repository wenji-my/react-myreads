import React, { Component } from 'react';

class Book extends Component {

    state = {
        selectName: this.props.book.shelf
    }

    changeSelect = (e) => {
        this.setState({ selectName: e.target.value });
        this.props.updateBookShelf(this.props.book,e.target.value)
    }

    render() {

        let book = this.props.book;
        let authors = book.authors;
        if (authors) {
            authors = authors.join()
        }
        return (
            <div className="book">
                <div className="book-top">
                    <div>
                        <img className="book-cover" style={{ width: 128}} src={book.imageLinks ? book.imageLinks.thumbnail:''} alt=""/>
                    </div>
                    <div className="book-shelf-changer">
                        <select value={this.state.selectName} onChange={(e) => {this.changeSelect(e)}}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">{this.state.selectName === 'currentlyReading'?' √ ':''}Currently Reading</option>
                            <option value="wantToRead">{this.state.selectName === 'wantToRead'?' √ ':''}Want to Read</option>
                            <option value="read">{this.state.selectName === 'read'?' √ ':''}Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        )
    }
}

export default Book;