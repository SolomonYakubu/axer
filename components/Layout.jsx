import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-[calc(100vh-64px)] h-[calc(100vh-62px)]  p-0 m-0 mt-16">
      {children}
    </div>
  );
}
