import React from 'react';
import Main from "./Main";
import Sidebar from "./Sidebar";

function App() {
  return (
      <main className="lg:flex lg:h-screen">
          <div className="lg:w-3/5 lg:h-full xl:w-2/3 relative">
              <Main/>
          </div>
          <aside className="lg:w-2/5 lg:h-full xl:w-1/3 bg-gray-200 shadow-2xl pt-8 relative">
              <Sidebar/>
          </aside>
      </main>
  );
}

export default App;
