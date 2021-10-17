import React, { useState, useEffect } from 'react';
import api from './services/api';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';

//React usa JSX (Javascript + XML)

/**Pilares do React:
Componentes - Uma função que retorna algum conteúdo HTML/CSS/Conteúdo de JS pra Interface gráfica.
              Sendo assim, ele é um bloco isolado que não interfere no restante da aplicação.
              Nos padrões de convenção, a primeira letra sempre será maiúscula para denominar um componente.
              Preferencialmente manter um componente por arquivo.
Estados - Uma informação mantida pelo componente, advindo do conceito de imutabilidade.
          Você cria um estado seja pra uma variável, etc, aplicando o {useState} que altera um estado através de funções auxiliares.
Propriedades - Informações que um componente PAI, passa para um componente FILHO.
               São os atributos do componente, que podem ser pegos por paramêtro através do 'props' (Ex.: {props.title}).
***/
function App() {
  //mais um estado pra lista de Devs
  const [devs, setDevs] = useState([]);
  //criar os outros estados pros campos
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  //criar estados pra receber latitude e longitude
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  //geolocalizacao do navegador
  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  //function pra carregar os Devs salvos
  useEffect(() =>{
    async function loadDevs(){
      const response = await api.get('/devs');

      setDevs(response.data);
    }
    //chamar a function
    loadDevs();
  }, []);

  //function addDev(*lembrar de add no form onSubmit)
  async function addDev(e){
    //retirando o comportamento padrao
    e.preventDefault();

    //passando dados pra rota post da api
    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    })

    console.log(response.data);

    setGithubUsername('');
    setTechs('');
    //preciso passar a response ao final se eu quiser ver algum dev listado após o primeiro carregamento
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={addDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do Github</label>
            <input name="github_username" id="github_username" required value={github_username} onChange={e => setGithubUsername(e.target.value)}/>
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required value={techs} onChange={e => setTechs(e.target.value)}/>
          </div>
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input type="number" name="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)}/>
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input type="number" name="longitude" id="longitude" required value={longitude} onChange={e => setLongitude(e.target.value)}/>
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <div className="user-info">
                <strong>Parei em: 01:37:03</strong>
                <span>No segundo Vídeo</span>
              </div>
            </header>
              <p>Segundo vídeo se chama "Construindo a interface web"</p>
          </li>
          {devs.map(dev => (
            <DevItem key={dev._id}  dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
