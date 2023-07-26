import React from 'react';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const SearchComponent = ({ label, onSearch }) => {
    const [searchTerm, setSearchTerm] = React.useState('');
  
    const onChangeSearchTerm = (event) => {
      setSearchTerm(event.target.value);
    }
  
    return (
      <TextField
        id="search"
        label={label}
        value={searchTerm}
        onChange={(event) => onChangeSearchTerm(event)}
        variant="standard"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => onSearch(searchTerm)}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    )
};
export default SearchComponent;