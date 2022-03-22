import { useCallback, useState } from 'react';
import './App.css';

import CardsService from '../../services/card';
import curinga from '../../assets/curinga.png';

function App() {
  const [cards, setCards] = useState([]);

  const startGame = useCallback(async function() {
    let deck_id = prompt("Código do Deck?");
    if(!deck_id) return;

    let cardsLoaded = await CardsService.load(deck_id);
    setCards(cardsLoaded);
  }, []);

  const onCardClick = useCallback(function(card) {
    setCards(function(oldCards) {
      let indexOldCard = oldCards.indexOf(card);
      let newCards = oldCards
        .map(card => ({...card, open: false}));

      newCards.splice(indexOldCard, 1, {...card, open: !card.open});
      return newCards;
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bem vindo ao Jogo</h1>
        <p><a href="#" onClick={startGame}>Clique aqui</a> para {cards.length ? "reiniciar" : "iniciar"} o Jogo!</p>
        <hr />
      </header>
      <main className="App-main">
        {
          cards.length ? 
          <ul>
            {
              cards.map((card, index) => 
                <li key={index} className={card.open ? "active" : null} onClick={() => onCardClick(card)}>
                  <h2>{`${card.value} ${card.suit}`}</h2>
                  <div>
                    <img className="card" src={card.image} />
                    <img className="curinga" src={curinga} />
                  </div>
                </li>
              )
            }
          </ul> : 
          <span className="no-cards">Sem cartas carregadas</span>
        }
      </main>
    </div>
  );
}

export default App;
