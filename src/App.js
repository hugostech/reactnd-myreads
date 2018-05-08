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
  updateBook = ()=>{
    BooksAPI.getAll().then((books)=>{
        this.setState({
            books
        })
    })
  }
  componentDidMount(){
      EventEmitter.on('bookMove',this.updateBook)
      this.updateBook()
  }
  componentWillUnmount(){
      EventEmitter.removeListener('bookMove',this.updateBook)
  }
  render() {
    return (
      <div className="app">
          <Route path="/search" exact component={SearchBook} />
          <Route path="/" exact render={()=>(<ListBook books={this.state.books}/>)} />
      </div>
    )
  }
}

export default BooksApp
