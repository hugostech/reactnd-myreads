import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBook from './SearchBook'
import ListBook from './ListBook'
import {Route} from 'react-router-dom'
import EventEmitter from "./EventEmitter";


class BooksApp extends React.Component {
  state = {
    books:[]
  }
  isInShelf = (book,booksInShelf)=>{
      return booksInShelf.find((booksInShelf)=>(book.id === booksInShelf.id))
  }
  updateBook = (book,shelf)=>{
      book.shelf = shelf
      this.setState((prevState)=>{
        const findedBook = this.isInShelf(book,prevState.books)
        if (findedBook){
            findedBook.shelf = shelf
            return {
                books:prevState.books
            }
        }else{
            return {
                books:prevState.books.concat([book])
            }
        }
      })
  }
  componentDidMount(){
      EventEmitter.on('bookMove',this.updateBook)
      BooksAPI.getAll().then((books)=>{
          this.setState({
              books
          })
      })
  }
  componentWillUnmount(){
      EventEmitter.removeListener('bookMove',this.updateBook)
  }
  render() {
    return (
      <div className="app">
          <Route path="/search" exact render={()=><SearchBook books={this.state.books}/>} />
          <Route path="/" exact render={()=>(<ListBook books={this.state.books}/>)} />
      </div>
    )
  }
}

export default BooksApp
