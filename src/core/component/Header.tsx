
import "../css/header.css"
import "../../App.css"
import React from "react"
export default function Header() {
  return (
    <header>
      <div className="headerElement">
        <button
          //onClick= retour page accueil
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <img
            className="welcomeIcon"
            src="/asset/picture/icons/classeur.png"
            alt="classeurs"
          />
        </button>
      </div>
      <div className="headerElement">
        <div className="welcomeMessage">
          <h1>Ma renkell</h1>
          <h2>Outils pour la classe</h2>
        </div>
      </div>
    </header>
  )
}
