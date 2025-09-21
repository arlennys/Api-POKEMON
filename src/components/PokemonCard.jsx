import "./pokemon.Card.css";
import { useState } from "react";

export default function PokemonCard({ pokemonData }) {
  const [mostrarInfo, setMostrarInfo] = useState(false);
  const toggleInfo = () => setMostrarInfo((prev) => !prev);

  return (
    <div className="pokemon-card">
      <h2 className="pokemon-name">
        {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
      </h2>

      <img
        src={pokemonData?.sprites?.front_default}
        alt={pokemonData.name}
        className="pokemon-img"
      />

      {/* Metadatos: usar divs y luego un ul sólo para los tipos */}
      <div className="pokemon-meta">
        <p className="pokemon-id">ID: {pokemonData.id}</p>

        <div className="pokemon-type">
          <p>TIPO</p>
          <ul>
            {pokemonData.types.map((t) => (
              // usar nombre como key (más estable que el índice)
              <li key={t.type.name}>{t.type.name}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        className="pokemon-datos"
        onClick={toggleInfo}
        aria-expanded={mostrarInfo}
        aria-controls={`pokemon-info-${pokemonData.id}`}
      >
        {mostrarInfo ? "Ocultar" : "Mostrar"}
      </button>

      {/* render condicionado por estado (sin manipular DOM directamente) */}
      {mostrarInfo && (
        <div
          id={`pokemon-info-${pokemonData.id}`}
          className={`info ${mostrarInfo ? "show" : ""}`}
        >
          <ul>
                <p className="pokemon-estadis">Estadistica</p>
                  {pokemonData.stats.map((s, i) => (
                    <li key={i}>
                      {s.stat.name}: {s.base_stat}
                    </li>
                  ))}
            </ul>
        </div>
      )}
    </div>
  )
}
