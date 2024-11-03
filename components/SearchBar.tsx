import React from "react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
const SearchBar = ({ query }: { query?: string }) => {
  return (
    <Form action={"/"} scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startup"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <Button className="search-btn" type="submit">
          <Search className="text-white size-5" />
        </Button>
      </div>
    </Form>
  );
};

export default SearchBar;
