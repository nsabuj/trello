import React, { Component } from 'react'

export class Header extends Component {
    render() {
        return (
            <header className="masthead">
            
                <div className="boards-menu">
            
                    <button className="boards-btn btn">Boards</button>
            
                    <div className="board-search">
                        <input type="search" className="board-search-input" aria-label="Board Search"/>
                        
                    </div>
            
                </div>
            
                <div className="logo">
            
                    <h1>Trello</h1>
            
                </div>
            

            
            </header>
        )
    }
}

export default Header
