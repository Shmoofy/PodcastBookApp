import React from 'react';
import { Searchbar } from 'react-native-paper';
import plusminusLogo from "../../../assets/images/acctplusandminus.png";



const SearchFriendBar = ({searchQuery, setSearchQuery, handleSearch, onIconPress }) => {
  return (
    <Searchbar
        placeholder="Follow/Unfollow User"
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        icon = {plusminusLogo}
        onIconPress={onIconPress}
        style={{ marginHorizontal: 10, marginBottom: 10 }}
        
    />
  );
};

export default SearchFriendBar;