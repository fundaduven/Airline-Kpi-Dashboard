import React, { useState } from "react";

interface searchBoxProps {
  onChange: (query: string) => void;
}

const SearchBox = ({ onChange }: searchBoxProps) => {
  return (
    <div>
      <input
        type="search"
        placeholder="Filter passengers"
        onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
          if (ev.target.value.length >= 3) {
            onChange(ev.target.value);
          }
        }}
      />
    </div>
  );
};

export default SearchBox;
