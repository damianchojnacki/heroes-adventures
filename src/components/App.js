import React from 'react';
import Main from "./Main";
import Sidebar from "./Sidebar";

function App() {
  return (
    <main className="flex h-screen">
      <div className="w-3/4 h-full">
        <Main/>
      </div>
      <div className="w-1/4 h-full bg-gray-200 shadow-2xl">
        <Sidebar/>
      </div>
    </main>
  );
}

export default App;
