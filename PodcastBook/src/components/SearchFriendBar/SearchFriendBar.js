import React from 'react';
import { Searchbar } from 'react-native-paper';


const SearchFriendBar = ({searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <Searchbar
        placeholder="Follow a friend by username"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        icon = "account-multiple-plus"
        
        style={{ marginHorizontal: 10, marginBottom: 10 }}
        
    />
  );
};

export default SearchFriendBar;