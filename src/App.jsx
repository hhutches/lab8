// App.jsx
import { useState } from "react";

import Header from "./components/Header.jsx";
import Homepage from "./components/Homepage.jsx";
import Introduction from "./components/Introduction.jsx";
import Card from "./components/Card.jsx";
import Section from "./components/Section.jsx";

import "./App.css";

import henryPhoto from "./assets/henry.jpeg";
import dogsPhoto from "./assets/dogs.jpeg";

export default function App() {
  const cards = [
    {
      id: "henry",
      title: "Me",
      description: "A photo of me for my Lab 3 About Me site.",
      image: henryPhoto,
      featured: true,
    },
    {
      id: "dogs",
      title: "My Dogs",
      description: "A photo of my dogs.",
      image: dogsPhoto,
      featured: false,
    },
  ];

  const [spinningId, setSpinningId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  function handleCardClick(id) {
    setSpinningId(id);

    window.setTimeout(() => {
      setSpinningId(null);
      setSelectedId(id);
    }, 600); // must match CSS animation duration
  }

  return (
    <div className="page">
      <Header />

      <main className="content">
        <Homepage />
        <Introduction />

        <Section id="cards" title="Cards">
          <div className="cardGrid">
            {cards.map((card) => {
              const isSelected = selectedId === card.id;
              const isSpinning = spinningId === card.id;

              return (
                <Card
                  key={card.id}
                  title={card.title}
                  description={card.description}
                  image={card.image}
                  featured={card.featured}
                  isSelected={isSelected}
                  isSpinning={isSpinning}
                  onClick={() => handleCardClick(card.id)}
                />
              );
            })}
          </div>
        </Section>
      </main>
    </div>
  );
}