import './index.scss';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'


export default function Home() {

    const [pokemon, setPokemon] = useState([]);
    const [nomePokemon, setNomePokemon] = useState('');

    function editarTipo(tipo) {
        
        let final = tipo.length;
        let tipo2 = tipo.substring(0, final - 2)

        return tipo2;
    }
    
    const navigate = useNavigate();
    const {idParam} = useParams();
    
    function abrirPokemonInfo(id) {
        navigate(`/pokemon/info/${id}`)
    }
    
    async function puxarPokemons() {
        
        let url = "https://pokeapi.co/api/v2/pokemon/" + nomePokemon;
        
        let response = await axios.get(url);
        

        let listaPokemon = [];

        let tipos = '';
        let nome = '';
        let id = response.data.id;

        for (let item of response.data.types) {
            tipos += item.type.name + ', ';
        }

        for (let item of response.data.forms) {
            nome += item.name;
        }
        
        let imagem = response.data.sprites.versions['generation-v']['black-white'].animated.front_default;

        listaPokemon.push({
            id: id,
            nome: nome,
            imagem: imagem,
            tipo: editarTipo(tipos)
        })

        setPokemon(listaPokemon)

    }

  return (
    <div className="pagina-Home">
        <div className='seccao1'>
            <img src="/assets/images/pika.png" alt="pika" />
            <div>
              <img src="/assets/images/lupa.png" onClick={puxarPokemons}></img>
              <input type="text" placeholder='Informe o nome do Pokêmon' value={nomePokemon} onChange={e => setNomePokemon(e.target.value)}></input>
            </div>
        </div>

      <div className='seccao2'>

            {pokemon.map(item =>
                <div onClick={() => abrirPokemonInfo(item.id)} className='card'>
                    <span><img src={item.imagem} alt="" /></span>
                    <h1>{item.nome}</h1>
                    <p> {item.tipo} </p>
                </div>
            )}
        
          </div>
    </div>
  );

}

