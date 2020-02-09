import React from 'react';
import Main from "./Main";
import Sidebar from "./Sidebar";

function App() {
  return (
      <main className="xl:flex xl:h-screen">
          <div className="xl:w-2/3 xl:h-full relative">
              <Main/>
          </div>
          <aside className="xl:w-1/3 xl:h-full bg-gray-200 shadow-2xl pt-8 relative">
              <Sidebar/>
          </aside>
      </main>
  );
}

export default App;
