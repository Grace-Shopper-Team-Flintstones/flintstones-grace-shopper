import React, { useState } from 'react'
import AllAlbums from './AllAlbums'

function AlbumFilter() {
    const [filterState, setFilterState] = useState([])

    const handleCheck = (event) => {
        console.log(event)

    }

    return (
        <>
            <div className='album-filter-container'>
                <div>
                    <input onChange={handleCheck} value='jazz' type='checkbox' />
                    <h3>Jazz</h3>
                </div>
                <div>
                    <input onChange={handleCheck} value='pop' type='checkbox' />
                    <h3>Pop</h3>
                </div>
                <div>
                    <input onChange={handleCheck} value='rap' type='checkbox' />
                    <h3>Rap</h3>
                </div>
                <div>
                    <input onChange={handleCheck} value='rock' type='checkbox' />
                    <h3>Rock</h3>
                </div>
            </div>
        </>
    )
}

export default AlbumFilter