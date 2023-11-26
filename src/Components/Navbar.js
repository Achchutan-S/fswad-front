import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
      }}
    >
      <h1>This is the Navbar</h1>
      <ul
        style={{
          listStyleType: "none",
          display: "flex",
          flexDirection: "row",
          gap: "200px",
        }}
      >
        <li>
          <NavLink to="/" exact>
            Title
          </NavLink>
        </li>
        <li>
          <NavLink to="/create">Create</NavLink>
        </li>
        <li>
          <NavLink to="/posts">Show</NavLink>
        </li>
        <li>
          <NavLink to="/search">Search </NavLink>
        </li>
        <li>
          <NavLink to="/delete">Delete </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
