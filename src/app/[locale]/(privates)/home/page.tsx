'use client';
import React from 'react';

export default function Home() {
  const mock = [
    {
      id: '8d9d2829-c6a3-11ee-af4c-74563c2a3e61',
      box: 'W1-T1',
      rarity: 'R',
      quantity: 32,
      name: null,
      code: 'R-001',
      imgSrc:
        'https://s3.amazonaws.com/naruto-kayou-cards/cards-image/R-001.jpg'
    }
  ];
  // const removeCard = e => {
  //   console.log(e);
  // };
  // const addCard = e => {
  //   console.log(e);
  // };
  return (
    <>
      {mock.map(card => {
        return <React.Fragment key={card.id}></React.Fragment>;
      })}
    </>
  );
}
