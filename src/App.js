import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import ListBooks from './components/ListBooks';
import SearchBooks from './components/SearchBooks';
import * as BooksAPI from './utils/BooksAPI';

class App extends Component {

    state = {
        currentlyReading: [],
        wantToRead: [],
        read: []
    }

    componentDidMount() {
        console.log('componentDidMount')
        BooksAPI.getAll().then(res => {
            let currentlyReading = []
            let wantToRead = []
            let read = []
            res.forEach((book) => {
                if (book.shelf === 'currentlyReading') {
                    currentlyReading.push(book)
                }
                if (book.shelf === 'wantToRead') {
                    wantToRead.push(book)
                }
                if (book.shelf === 'read') {
                    read.push(book)
                }
            })
            this.setState({
                currentlyReading: currentlyReading,
                wantToRead: wantToRead,
                read: read
            })
        })
    }

    componentWillReceiveProps(){
        console.log('componentWillReceiveProps')
    }

    componentDidUpdate() {
        console.log('componentDidUpdate')
        BooksAPI.getAll().then(res => {
            let currentlyReading = this.state.currentlyReading.slice()
            let wantToRead = this.state.wantToRead.slice()
            let read = this.state.read.slice()
            if (res.length > (currentlyReading.length+wantToRead.length+read.length)) {
                //添加了图书
                console.log(res.length,currentlyReading.length+wantToRead.length+read.length)
                res.forEach((book) => {
                    if (book.shelf === 'currentlyReading') {
                        if (currentlyReading.indexOf(book) === -1) {
                            //如果本地不存在这本书
                            currentlyReading.push(book)
                        }
                    }
                    if (book.shelf === 'wantToRead') {
                        if (wantToRead.indexOf(book) === -1) {
                            //如果本地不存在这本书
                            wantToRead.push(book)
                        }
                    }
                    if (book.shelf === 'read') {
                        if (read.indexOf(book) === -1) {
                            //如果本地不存在这本书
                            read.push(book)
                        }
                    }
                })
            } else if (res.length < (currentlyReading.length+wantToRead.length+read.length)) {
                //删除了图书
            }
            // this.setState({
            //     currentlyReading: currentlyReading,
            //     wantToRead: wantToRead,
            //     read: read
            // })
        })
    }


    updateBookShelf = (book, targetShelf) => {
        let currentlyReading = this.state.currentlyReading.slice()
        let wantToRead = this.state.wantToRead.slice()
        let read = this.state.read.slice()
        if (book.shelf === 'currentlyReading') {
            currentlyReading.splice(currentlyReading.indexOf(book),1)
        }
        if (book.shelf === 'wantToRead') {
            wantToRead.splice(wantToRead.indexOf(book),1)
        }
        if (book.shelf === 'read') {
            read.splice(read.indexOf(book),1)
        }
        book.shelf = targetShelf
        if (targetShelf === 'currentlyReading') {
            currentlyReading.push(book)
        }
        if (targetShelf === 'wantToRead') {
            wantToRead.push(book)
        }
        if (targetShelf === 'read') {
            read.push(book)
        }
        BooksAPI.update(book,targetShelf).then(res => {
        })
        this.setState({
            currentlyReading: currentlyReading,
            wantToRead: wantToRead,
            read: read
        })
    }

  render() {
    return (
      <div className="app">
          <Route exact path='/' render={() => (
              <ListBooks
                  currentlyReading={this.state.currentlyReading}
                  wantToRead={this.state.wantToRead}
                  read={this.state.read}
                  updateBookShelf={(book,targetShelf) => {this.updateBookShelf(book,targetShelf)}}/>
          )}/>
          <Route path='/search' render={() => (
              <SearchBooks updateBookShelf={(book,targetShelf) => {this.updateBookShelf(book,targetShelf)}}/>
          )}/>
      </div>
    );
  }
}

export default App;
