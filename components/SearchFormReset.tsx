"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { X } from "lucide-react";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
  };
  return (
    <Button type="reset" onClick={reset} className="search-btn" asChild>
      <Link href={"/"}>
        <X className="text-white size-5" />
      </Link>
    </Button>
  );
};

export default SearchFormReset;
