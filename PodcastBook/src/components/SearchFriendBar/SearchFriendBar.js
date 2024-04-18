import React from 'react';
import { Searchbar } from 'react-native-paper';


const SearchFriendBar = ({searchQuery, setSearchQuery, handleSearch, onIconPress }) => {
  return (
    <Searchbar
        placeholder="Follow/Unfollow User"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        icon = "account-multiple-plus"
        onIconPress={onIconPress}
        style={{ marginHorizontal: 10, marginBottom: 10 }}
        
    />
  );
};

export default SearchFriendBar;