/*import { useEffect, useState } from 'react'


import {PokemonCard} from "./components/PokemonCard"
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg
function App() {
  const[pokemonData,setPokemonData] = useState([])
  const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/' 

  const fetchPokemons = async () =>{
    try{
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
      const data = await response.json()

      const details = await Promise.all(
          data.results.map(async (p) => {
            const res = await fetch(p.url);
            return await res.json();
          })
        );
        setPokemonData(details)

    }catch(error){
      console.error('Error con el fetch de pokemones',error)
    }
  }

  const fetchAllPokemons = () =>
  {
    for(let i = 1; i<=10; i++)
    {
      fetchPokemons(i)
    }
  }

  useEffect(() =>{
    fetchAllPokemons()
  }, [])

  return pokemonData 
}*/

import "./App.css";
import { useEffect, useState } from "react";
import PokemonCard from "./components/PokemonCard";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPokemons = async (
    url = "https://pokeapi.co/api/v2/pokemon?limit=24") => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const data = await res.json();

      setNextUrl(data.next);
      setPrevUrl(data.previous);

      const details = await Promise.all(
        data.results.map(async (p) => {
          const res = await fetch(p.url);
          return await res.json();
        })
      );

      setPokemons(details);
    } catch (err) {
      console.error("Error cargando pokemons:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons()
  }, []);
console.log(pokemons);
  return (
    <div className="app-container">
      <h1>CARATERISTICAS DE LOS POKEMON</h1>

      {loading ? (
        <p className="Carga"style={{ textAlign: "center"}}>Cargando...</p>
      ) : (
        <>
          <div className="pokemon-grid">
            {pokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemonData={pokemon} />
            ))}
          </div>

          <div className="pagination">
            {prevUrl && (
              <button onClick={() => fetchPokemons(prevUrl)}>Anterior</button>
            )}
            {nextUrl && (
              <button onClick={() => fetchPokemons(nextUrl)}>Siguiente</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
