import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from '../utils/BooksAPI'
import Book from "./Book";

class SearchBooks extends Component {

    state = {
        query: '',
        cacheHistory: new Map(),
        resultDom: null
    };

    updateDom = (key, resultDom) => {
        if (key && key === this.state.query) {
            //防止用户输入过快导致最后输入完整内容的搜索结果被只有前面一部分内容的搜索结果覆盖，比如完整内容是he，显示的却是h的搜索结果（原因是请求he返回数据的速度比请求h返回数据的速度快）
            let val = this.state.cacheHistory.get(key)
            this.setState({
                resultDom: val
            })
        } else {
            //显示空内容和正在搜索的页面
            this.setState({
                resultDom: resultDom
            })
        }
    };

    searchBook = (content) => {
        let cacheHistory = this.state.cacheHistory;
        let query = content.trim();
        let resultDom;
        //将实时搜索内容保存到status中
        this.setState({
            query: query
        })
        if (!query) {
            //搜索内容为空，什么都不显示
            this.updateDom(null,null);
        } else {
            //只要输入内容就提示用户正在搜索
            resultDom = (<div className="searching">searching...</div>);
            this.updateDom(null,resultDom);
            //发送请求
            BooksAPI.search(query).then((data) => {
                if (data.error) {
                    //搜索失败,将搜索内容和DOM以键值对的形式添加到map中
                    cacheHistory.set(query,(<div className="no-book vertical-center text-center">
                        <div>
                            <h2>Sorry!</h2>
                            <p>Can't find the Book.</p>
                        </div>
                    </div>))
                } else {
                    //成功返回数据
                    cacheHistory.set(query,(<div className="search-books-results">
                        <ol className="books-grid">
                            {data.map((book, index) => {
                                let dom;
                                //有些数据没有图片链接
                                if (book.imageLinks) {
                                    dom = (<li key={index}>
                                        <Book url={book.imageLinks.thumbnail} title={book.title} authors={book.authors}/>
                                    </li>)
                                } else {
                                    console.log(book)
                                }
                                return dom
                            })}
                        </ol>
                    </div>))
                }
                this.updateDom(query,null)
            })
        }

    }

    render() {

        const {query,resultDom} = this.state;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                  注意: BooksAPI的搜索仅限于一些特定的词汇。
                  你可以在此找到它们:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  然而，请记住，BooksAPI.search方法可以通过标题或者作者搜索。所以，如果你没有找到一个具体的作者或者头衔也不用担心。每次搜索都受到 SEARCH_TERMS 的限制。
                */}
                        <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchBook(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    {resultDom}
                </div>

            </div>
        )
    }
}

export default SearchBooks;