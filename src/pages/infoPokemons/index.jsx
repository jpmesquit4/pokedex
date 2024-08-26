import './index.scss';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import puxarPokemons from '../home/index.jsx'

export default function InfoPokemons() {
    
    const [info, setInfo] = useState([]);
    const [status, setStatus] = useState([]);
    const { idParam } = useParams();
    console.log(idParam);

    async function puxarStatus() {
        
        let url = "https://pokeapi.co/api/v2/pokemon/" + idParam;

        let response = await axios.get(url);

        let listaInfo = [];

        let porcentagem = '';
        
        for (let item of response.data.stats) {

            porcentagem = item.base_stat;

            listaInfo.push({
                nome: item.stat.name,
                hp: porcentagem + "%",
            })

        }

        setStatus(listaInfo);

    }

    useEffect(() => {
        puxarStatus();
        puxarPokemons();
    }, [])

    async function puxarPokemons() {
        
        let url = "https://pokeapi.co/api/v2/pokemon/" + idParam;

        let response = await axios.get(url);

        let listaPokemon = [];

        let tipos = '';
        let nome = '';
        let hexTipo = '';
        let id = response.data.order;

        for (let item of response.data.types) {
            tipos = item.type.name;
        }

        if (tipos === 'grass')
            hexTipo = '#95CEA5';
        else if (tipos === 'fire')
            hexTipo = '#FFA6A6';
        else if (tipos === 'water')
            hexTipo = '#A6D4FF';
        else if (tipos === 'normal')
            hexTipo = '#A1AEBB';
        else if (tipos === 'ghost')
            hexTipo = '#B18CFF';
        else if (tipos === 'ice')
            hexTipo = '#A6EFFF';
        else if (tipos === 'dragon')
            hexTipo = 'linear-gradient(173deg, rgba(255,140,140,1) 0%, rgba(166,212,255,1) 100%)';
        else if (tipos === 'flying')
            hexTipo = 'radial-gradient(circle, rgba(227,215,255,1) 0%, rgba(196,169,255,1) 100%)';
        else if (tipos === 'steel')
            hexTipo = 'linear-gradient(0deg, rgba(237,43,43,1) 0%, rgba(255,140,140,1) 100%)';
        else if (tipos === 'bug')
            hexTipo = '#C8FFA6';
        else if (tipos === 'poison')
            hexTipo = '#C2A6FF';
        else if (tipos === 'electria')
            hexTipo = '#FDFFA6';
        else if (tipos === 'ground')
            hexTipo = '#CEC595';
        else if (tipos === 'dark')
            hexTipo = '#B79563';
        else if (tipos === 'rock')
            hexTipo = '#CEAA95';
        else if (tipos === 'psychic')
            hexTipo = '#E2A6FF';
        else if (tipos === 'fighting')
            hexTipo = '#FF8C8C';
        else if (tipos === 'fairy')
            hexTipo = '#FFA6F1';
        else 
            hexTipo = 'white'   

        for (let item of response.data.forms) {
            nome += item.name;
        }
        
        let imagem = response.data.sprites.versions['generation-v']['black-white'].animated.front_default;

        listaPokemon.push({
            id: id,
            nome: nome,
            imagem: imagem,
            tipo: tipos,
            hex: hexTipo 
        })

        setInfo(listaPokemon)

    }
    

    return (
        <div className='pagina-InfoPokemon'>
            {info.map( item =>
                <div className="part-pokemon">
                    <p>ID: {idParam}</p>
                    <div><img src={item.imagem} alt="pokemon" /></div>
                    <h1>{item.nome}</h1>
                    <nav style={{background: item.hex}} >{item.tipo}</nav>    
                </div>
            )}

            
                <div className='part-status'>
                    <h3>Status Base</h3>

                    {status.map(item =>
                        <div className='principal'><div style={{ width: item.hp, backgroundColor: "lightblue" }}>{item.nome}</div></div>
                    )}

                </div>
            

        </div>  
    );

}