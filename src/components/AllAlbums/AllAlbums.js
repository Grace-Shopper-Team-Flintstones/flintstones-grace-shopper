import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAlbumsThunk } from '../../store/reducers2/albumReducer';
import { Link } from 'react-router-dom';
import AlbumFilter from './AlbumFilter';
function AllAlbums() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const allAlbums = useSelector((state) => state.albums.albums);
  const [filterState, setFilterState] = useState([])

  const handleCheck = (event) => {
    // console.log(event.target.value, event.target.checked)
    if (event.target.checked) {
      if (!filterState.includes(event.target.value))
        filterState.push(event.target.value)
    }
    if (!event.target.checked) {
      if (filterState.includes(event.target.value))
        filterState.find((element, idx) => {
          if (element === event.target.value) {
            filterState.splice(idx, idx + 1)
            setFilterState(filterState)
          }
        })
    }

  }
  // dispatch thunk to get all albums
  useEffect(() => {
    dispatch(setAlbumsThunk());
  }, [dispatch]);

  // check if data has loaded
  useEffect(() => {
    if (allAlbums.length > 0) {
      setLoading(false);
    }

  }, [allAlbums]);

  var genreArr = allAlbums.reduce((accum, element, idx, arr) => {
    if (!accum.includes(element.genre)) {
      accum.push(element.genre)
    }

    return accum
  }, [])

  console.log(filterState)



  return loading ? (
    <div>Albums loading...</div>
  ) : (
    <>
      <>
        <div className='album-filter-container'>
          <button onClick={() => console.log(filterState)}>wefawef</button>
          {genreArr.map((genre) =>
            <>
              <div>
                <input onChange={handleCheck} value={genre} type='checkbox' />
                <h3>{`${genre.slice(0, 1).toUpperCase()}${genre.slice(1)}`}</h3>
              </div>
            </>
          )
          }
          {/* <div>
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
          </div> */}
        </div>
      </>
      <div className='all-product-container'>
        {allAlbums.map((album) => (
          <div key={album.id} >
            <Link id='link-style' to={'/products/' + album.id}>
              <img
                className="albumArt"
                src={album.image}
                alt=""
              />
              {/* TODO: move all styling to css file */}
              <div>
                <h4>{album.title}</h4>
                <p >${album.price}</p>
                <p>{album.stock} left in store</p>
                <p>{album.genre}</p>
              </div>
            </Link>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </>
  );
}
export default AllAlbums
