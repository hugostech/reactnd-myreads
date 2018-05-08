import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import EventEmitter from './EventEmitter'
import * as BooksAPI from './BooksAPI'

const shelves = {
    currentlyReading:"Currently Reading",
    wantToRead:"Want To Read",
    read:"Read",
}

export class Book extends React.Component{
    state = {
        shelf:this.props.shelf
    }

    handleMove = (event)=>{
        BooksAPI.update(this.props.book,event.target.value)
        EventEmitter.emit('bookMove')
    }

    render(){
        const {book} = this.props
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover"
                             style={{ width: 128, height: 193, backgroundImage: `url("${book['imageLinks']['smallThumbnail']}")` }}></div>
                        <div className="book-shelf-changer">
                            <select value={this.state.shelf} onChange={this.handleMove}>
                                <option disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{book['title']}</div>
                    {book['authors'] && <div className="book-authors">{book['authors'].join(' and ')}</div>}

                </div>
            </li>
        )
    }
}

class Shelf extends React.Component{
    render(){
        const { shelf, books } = this.props
        let showBooks = books.filter((book)=>(book['shelf']===shelf))
        return <div className="bookshelf">
            <h2 className="bookshelf-title">{shelves[shelf]}</h2>
            {showBooks.length===0?<p>Loading...</p>:(
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {showBooks.map((book)=><Book shelf={shelf} key={book['id']} book={book}/>)}
                    </ol>
                </div>
            )}

        </div>
    }
}
Shelf.propTypes = {
    books : PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
}
export default class ListBook extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            books: this.props.books
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            books: nextProps.books
        })
    }

    render(){
        const { books } = this.state
        return (
            <div className="list-books">
                {Object.keys(shelves).map((shelf)=><Shelf key={shelf} books={books} shelf={shelf}/>)}
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}
