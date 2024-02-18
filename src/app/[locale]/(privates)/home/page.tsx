'use client';
import { CardViewer } from '@/components';
import React from 'react';

export default function Home() {
  const mock = [
    {
      id: '8d9d2829-c6a3-11ee-af4c-74563c2a3e61',
      box: 'W1-T1',
      rarity: 'R',
      name: null,
      code: 'R-001',
      imgSrc:
        'https://s3.amazonaws.com/naruto-kayou-cards/cards-image/R-001.jpg'
    },
    {
      id: '8d9d29e3-c6a3-11ee-af4c-74563c2a3e61',
      box: 'W1-T1',
      rarity: 'R',
      name: null,
      code: 'R-002',
      imgSrc:
        'https://s3.amazonaws.com/naruto-kayou-cards/cards-image/R-002.jpg'
    },
    {
      id: '8d9d2a64-c6a3-11ee-af4c-74563c2a3e61',
      box: 'W1-T1',
      rarity: 'R',
      name: null,
      code: 'R-003',
      imgSrc:
        'https://s3.amazonaws.com/naruto-kayou-cards/cards-image/R-003.jpg'
    },
    {
      id: '8d9d2a97-c6a3-11ee-af4c-74563c2a3e61',
      box: 'W1-T1',
      rarity: 'R',
      name: null,
      code: 'R-004',
      imgSrc:
        'https://s3.amazonaws.com/naruto-kayou-cards/cards-image/R-004.jpg'
    },
    {
      id: '8d9d2aca-c6a3-11ee-af4c-74563c2a3e61',
      box: 'W1-T1',
      rarity: 'R',
      name: null,
      code: 'R-005',
      imgSrc:
        'https://s3.amazonaws.com/naruto-kayou-cards/cards-image/R-005.jpg'
    },
    {
      id: '8d9d2af9-c6a3-11ee-af4c-74563c2a3e61',
      box: 'W1-T1',
      rarity: 'R',
      name: null,
      code: 'R-006',
      imgSrc:
        'https://s3.amazonaws.com/naruto-kayou-cards/cards-image/R-006.jpg'
    },
    {
      id: '8d9d2b24-c6a3-11ee-af4c-74563c2a3e61',
      box: 'W1-T1',
      rarity: 'R',
      name: null,
      code: 'R-007',
      imgSrc:
        'https://s3.amazonaws.com/naruto-kayou-cards/cards-image/R-007.jpg'
    },
    {
      id: '8d9d2b53-c6a3-11ee-af4c-74563c2a3e61',
      box: 'W1-T1',
      rarity: 'R',
      name: null,
      code: 'R-008',
      imgSrc:
        'https://s3.amazonaws.com/naruto-kayou-cards/cards-image/R-008.jpg'
    },
    {
      id: '8d9d2b80-c6a3-11ee-af4c-74563c2a3e61',
      box: 'W1-T1',
      rarity: 'R',
      name: null,
      code: 'R-009',
      imgSrc:
        'https://s3.amazonaws.com/naruto-kayou-cards/cards-image/R-009.jpg'
    },
    {
      id: '8d9d2bac-c6a3-11ee-af4c-74563c2a3e61',
      box: 'W1-T1',
      rarity: 'R',
      name: null,
      code: 'R-010',
      imgSrc:
        'https://s3.amazonaws.com/naruto-kayou-cards/cards-image/R-010.jpg'
    }
  ];
  return (
    <>
      {mock.map(card => {
        return (
          <React.Fragment key={card.id}>
            <CardViewer
              card={card}
              isAuthenticated={true}
              hasRemoveBtn
              hasFavBtn
            ></CardViewer>
          </React.Fragment>
        );
      })}
    </>
  );
}
