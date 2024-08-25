import './index.scss';
import { useState } from 'react';
import axios from 'axios'


export default function Home() {

    const [pokemon, setPokemon] = useState([]);

    async function puxarPokemons() {
        
        let url = "https://pokeapi.co/api/v2/pokemon?offset=20&limit=8";

        let response = await axios.get(url);

        let listaPokemon = [];

        for (let item of response.data.results) {
            let pokemonResp = await axios.get(item.url);

            let imagem = pokemonResp.data.sprites.versions['generation-v']['black-white'].animated.front_default;

            let tipos = '';
            for (let t of pokemonResp.data.types) {
                tipos = tipos + t.type.name + ', ';
            }

            listaPokemon.push({
                nome: item.name,
                imagem: imagem,
                tipos: tipos
            })

        }

        setPokemon(listaPokemon)

    }

  return (
    <div className="pagina-Home">
      <div className='seccao1'>
        <img src="/assets/images/pika.png" alt="pika" />
        <button onClick={puxarPokemons}>Encontrar Pokêmons</button>
      </div>

      <div className='seccao2'>

            {pokemon.map(item =>
                <div className='card'>
                    <span><img src={item.imagem} alt="" /></span>
                    <h1>{item.nome}</h1>
                    <p> {item.tipos} </p>
                </div>
            )}
        
          </div>
          
          <div className='seccao3'>
            <button>Encontrar mais</button>
          </div>
    </div>
  );

}

