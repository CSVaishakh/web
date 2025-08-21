import React from "react";

export default function SideBar() {
  return (
    <section className="fixed left-0 top-0 h-full w-64 bg-sidebar border-r border-sidebar-border shadow-lg">
      <div className="flex flex-col h-full p-6">
        <h1 className="text-2xl font-bold text-sidebar-foreground mb-8">TaskStream</h1>
        <nav className="flex flex-col space-y-2">
          <button className="w-full px-4 py-3 text-left text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors duration-200 font-medium">Dashboard</button>
          <button className="w-full px-4 py-3 text-left text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors duration-200 font-medium">Tasks</button>
          <button className="w-full px-4 py-3 text-left text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-lg transition-colors duration-200 font-medium">Reports</button>
        </nav>
      </div>
    </section>
  );
}
