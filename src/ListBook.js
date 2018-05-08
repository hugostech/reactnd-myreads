import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Shelf extends React.Component{
    render(){
        const { shelf, books } = this.props
        let showBooks = books.filter((book)=>(book['shelf']===shelf))
        return <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf}</h2>
            {showBooks.length===0?<p>Loading...</p>:(
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {showBooks.map((book)=>(
                            <li key={book['id']}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover"
                                         style={{ width: 128, height: 193, backgroundImage: `url("${book['imageLinks']['smallThumbnail']}")` }}></div>
                                    <div className="book-shelf-changer">
                                        <select>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{book['title']}</div>
                                <div className="book-authors">{book['authors'].join(' and ')}</div>
                            </div>
                        </li>))}
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

    render(){
        const { books } = this.props
        return (
            <div className="list-books">
                <Shelf books={books} shelf="currentlyReading"/>
                <Shelf books={books} shelf="wantToRead"/>
                <Shelf books={books} shelf="read"/>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}