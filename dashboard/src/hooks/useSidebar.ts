"use client";
import { useState } from "react";

export function useSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen((prev) => !prev);
  return { isOpen, toggle };
}
