import React from "react";

const PageContainer = ({ children }) => {
  return (
    <main className="pt-20 pb-24 min-h-screen bg-gray-50">{children}</main>
  );
};

export default PageContainer;
