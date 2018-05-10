import React, { Component } from 'react';

class Book extends Component {
    render() {

        let authors = this.props.authors;
        if (authors) {
            authors = authors.join()
        }
        return (
            <div className="book">
                <div className="book-top">
                    <div>
                        <img className="book-cover" style={{ width: 128}} src={this.props.url} alt=""/>
                    </div>
                    <div className="book-shelf-changer">
                        {/*<ul className="as">*/}
                            {/*<li><i className="fa fa-check check-icon"></i><span>Currently Reading</span></li>*/}
                            {/*<li><i className="fa fa-check"></i><span>Want to Read</span></li>*/}
                            {/*<li><i className="fa fa-check"></i><span>Read</span></li>*/}
                            {/*<li><i className="fa fa-check"></i><span>None</span></li>*/}
                        {/*</ul>*/}
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        )
    }
}

export default Book;