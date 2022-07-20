import React from "react";

export default function Layout({ children }) {
  return (
    <div className="min-h-[calc(100vh-64px)] h-[20vh] p-0 m-0 mt-16">
      {children}
    </div>
  );
}
