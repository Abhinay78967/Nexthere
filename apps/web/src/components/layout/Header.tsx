import React from "react";
import { fetchCategories } from "../../lib/api";
import { HeaderNav } from "./HeaderNav";

export async function Header() {
  let categories: any[] = [];
  try {
    const res = await fetchCategories();
    if (res && res.success) {
      categories = res.data;
    }
  } catch (error) {
    console.error('Failed to load categories for header');
  }

  return <HeaderNav categories={categories} />;
}
