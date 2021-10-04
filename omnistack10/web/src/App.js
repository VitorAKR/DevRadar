import React, { useState, useEffect } from 'react';
import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

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
  //criar os outros estados
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

  //function addDev(*lembrar de add no form)
  async function addDev(e){
    //retirando o comportamento padrao
    e.preventDefault();


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
              <img src="https://avatars.githubusercontent.com/u/13102131?v=4" alt="Vítor Reiter" />
              <div className="user-info">
                <strong>Parei em: 01:21:07</strong>
                <span>No segundo Vídeo</span>
              </div>
            </header>
              <p>Tell me... do you bleed? Because I have a Band-Aid if you need one.. :)</p>
              <a href="https://github.com/VitorAKR">Acessar perfil no Github</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars.githubusercontent.com/u/13102131?v=4" alt="Vítor Reiter" />
              <div className="user-info">
                <strong>Vítor Reiter</strong>
                <span>Javascript, VBA, Python</span>
              </div>
            </header>
              <p>Tell me... do you bleed? Because I have a Band-Aid if you need one.. :)</p>
              <a href="https://github.com/VitorAKR">Acessar perfil no Github</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars.githubusercontent.com/u/13102131?v=4" alt="Vítor Reiter" />
              <div className="user-info">
                <strong>Vítor Reiter</strong>
                <span>Javascript, VBA, Python</span>
              </div>
            </header>
              <p>Tell me... do you bleed? Because I have a Band-Aid if you need one.. :)</p>
              <a href="https://github.com/VitorAKR">Acessar perfil no Github</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars.githubusercontent.com/u/13102131?v=4" alt="Vítor Reiter" />
              <div className="user-info">
                <strong>Vítor Reiter</strong>
                <span>Javascript, VBA, Python</span>
              </div>
            </header>
              <p>Tell me... do you bleed? Because I have a Band-Aid if you need one.. :)</p>
              <a href="https://github.com/VitorAKR">Acessar perfil no Github</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars.githubusercontent.com/u/13102131?v=4" alt="Vítor Reiter" />
              <div className="user-info">
                <strong>Vítor Reiter</strong>
                <span>Javascript, VBA, Python</span>
              </div>
            </header>
              <p>Tell me... do you bleed? Because I have a Band-Aid if you need one.. :)</p>
              <a href="https://github.com/VitorAKR">Acessar perfil no Github</a>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default App;
