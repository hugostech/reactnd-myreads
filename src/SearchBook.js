import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {search} from './BooksAPI'
import {Book} from './ListBook'


export default class SearchBook extends Component{
    constructor(props){
        super(props)
        this.state = {
            query: '',
            books: []
        }

    }
    findBook = ()=>{
        const {query} = this.state
        if (query){
            search(query).then((books)=>{
                if (books['error']){
                    books = []
                }
                this.setState({
                    books
                })

            })
        }

    }
    handleSearch = (event)=>{
        clearTimeout(this.timer)
        const query = event.target.value
        if (query){
            this.timer = setTimeout(this.findBook,300)

        }
        this.setState({
            query
        })

    }

    render(){
        const {query,books} = this.state
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">

                        <input type="text" value={query} onChange={this.handleSearch} placeholder="Search by title or author"/>

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {/*{console.log(books.length)}*/}
                        { books.length>0 && books.map((book)=>(<Book shelf='none' key={book['id']} book={book}/>))}
                        { query && books.length===0 && <p>There is no available book found</p>}
                    </ol>
                </div>
            </div>
        )
    }
}