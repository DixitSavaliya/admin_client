import PropTypes from 'prop-types';
import React from 'react';

const SearchResultMenuItem = ({item}) => (
    console.log("item",item)
//     <div>
       
//         <span>{item.original_title}</span>
//   </div>
);

SearchResultMenuItem.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
    }).isRequired,
};

export default SearchResultMenuItem;