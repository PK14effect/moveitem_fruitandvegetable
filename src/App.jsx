import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', type: 'fruit' },
    { id: 2, name: 'Broccoli', type: 'vegetable' },
    { id: 3, name: 'Mushroom', type: 'vegetable' },
    { id: 4, name: 'Banana', type: 'fruit' },
    { id: 5, name: 'Tomato', type: 'vegetable' },
    { id: 6, name: 'Orange', type: 'fruit' },
    { id: 7, name: 'Mango', type: 'fruit' },
    { id: 8, name: 'Pineapple', type: 'fruit' },
    { id: 9, name: 'Cucumber', type: 'vegetable' },
    { id: 10, name: 'Watermelon', type: 'fruit' },
    { id: 11, name: 'Carrot', type: 'vegetable' }
  ]);

  const [fruits, setFruits] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const itemTimeouts = useRef({});

  const moveItem = (itemId, type) => {
    const itemToMove = items.find(item => item.id === itemId);
    if (type === 'fruit') {
      setFruits(prevFruits => [...prevFruits, itemToMove]);
    } else {
      setVegetables(prevVegetables => [...prevVegetables, itemToMove]);
    }
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
    if (itemTimeouts.current[itemId]) {
      clearTimeout(itemTimeouts.current[itemId]);
    }
    itemTimeouts.current[itemId] = setTimeout(() => {
      if (type === 'fruit') {
        setFruits(prevFruits => prevFruits.filter(item => item.id !== itemId));
      } else {
        setVegetables(prevVegetables => prevVegetables.filter(item => item.id !== itemId));
      }
      setItems(prevItems => [...prevItems, itemToMove]);
      delete itemTimeouts.current[itemId];
    }, 5000);
  };

  const handleColumnClick = (type, clickedItemId) => {
    const itemsToMoveBack = type === 'fruit' ? fruits : vegetables;
    setItems(prevItems => [...prevItems, ...itemsToMoveBack.filter(item => item.id === clickedItemId)]);
    if (type === 'fruit') {
      setFruits(prevFruits => prevFruits.filter(item => item.id !== clickedItemId));
    } else {
      setVegetables(prevVegetables => prevVegetables.filter(item => item.id !== clickedItemId));
    }
    if (itemTimeouts.current[clickedItemId]) {
      clearTimeout(itemTimeouts.current[clickedItemId]);
      itemTimeouts.current[clickedItemId] = setTimeout(() => {
        setItems(prevItems => prevItems.filter(item => item.id !== clickedItemId));
        if (type === 'fruit') {
          setFruits(prevFruits => [...prevFruits, items.find(item => item.id === clickedItemId)]);
        } else {
          setVegetables(prevVegetables => [...prevVegetables, items.find(item => item.id === clickedItemId)]);
        }
        delete itemTimeouts.current[clickedItemId];
      }, 5000);
    }
  };

  return (
    <div className="container">
      <div className="column" id="items">
        {items
          .filter((item, index, self) => self.findIndex(t => t.id === item.id) === index)
          .map(item => (
            <div className="item STyl" key={item.id} onClick={() => moveItem(item.id, item.type)}>
              {item.name}
            </div>
          ))}
      </div>

      <div className="column" id="fruits" onClick={() => handleColumnClick('fruit', fruits[0]?.id)}>
        <div class="Fru">fruits</div>
        {fruits.map(fruit => (
          <div className="item STyl" key={fruit.id}>
            {fruit.name}
          </div>
        ))}
      </div>

      <div className="column" id="vegetables" onClick={() => handleColumnClick('vegetable', vegetables[0]?.id)}>
        <div class="Vege">vegetables</div>
        {vegetables.map(vegetable => (
          <div className="item STyl" key={vegetable.id} >
            {vegetable.name}
          </div>
        ))}
      </div>
    </div>
  );

}

export default App;
