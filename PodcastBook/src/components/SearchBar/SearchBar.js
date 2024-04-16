import React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = ({searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <Searchbar
        placeholder="Search podcasts"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        
        style={{ marginHorizontal: 10, marginBottom: 10 }}
        
    />
  );
};

export default SearchBar;