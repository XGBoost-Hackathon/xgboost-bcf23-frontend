import React from 'react';
import '../styles/filehandler.css';
import UilSearch from '@iconscout/react-unicons/icons/uil-search'

function Search({ isSearching, setIsSearching }) {

    const toggle = () => {
        setIsSearching(!isSearching)
    };

  return (
    <div onClick={toggle}>
      <label className="custom-file-upload"><UilSearch size={20}/></label>
      {/* <button onClick={()=>handleFileUpload(file)}>Upload</button> */}
    </div>
  )
}

export default Search;