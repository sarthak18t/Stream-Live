"use client";
import React from "react";
import { SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import qs from "query-string";
import { useState } from "react";
import { useRouter } from "next/navigation";
const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) return;
    const url = qs.stringifyUrl({
        url : "/search",
        query : {term : value},
    },{skipEmptyString: true})
    router.push(url);
  };

  const onClear = () => {
      setValue("");
  }
  return (
    <form
      className="flex items-center lg:w-[370px] w-full relative"
      onSubmit={(e) => onSubmitForm(e)}
    >
      <Input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        placeholder="Search"
        className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
      />
      {value && (
      <X className=" absolute top-3 right-14 cursor-pointer text-muted-foreground hover:opacity-75 transition h-4 w-5" onClick={() => onClear()}/>
      )}
      <Button
        className="rounded-l-none"
        variant="secondary"
        size="sm"
        type="submit"
      >
        <SearchIcon className="text-muted-foreground h-4 w-5" />
      </Button>
    </form>
  );
};

export default Search;
