let cardsValue = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']


const getCardVal = card => {
  return (cardsValue.indexOf(card) + 1)
}

const orderPokerHand = pokerHand => {
  let hand = pokerHand
    .split(' ')
    .map(card => {
      return {
        num: getCardVal(card.charAt(0)),
        suit: card.charAt(1),
      }
    })
    .sort((a, b) => a.num - b.num)
  return hand
}
const counting = (pokerHand) => {
    let hand = orderPokerHand(pokerHand);
    const numCounts = hand.reduce((counts, { num }) => {
      counts[num] = (counts[num] || 0) + 1;
      return counts;
    }, {});
    const numValues = Object.values(numCounts);
    return numValues
}

const isFullHouse = (pokerHand) => {
    const numCounts = counting(pokerHand)
      const hasThreeSame = numCounts.includes(3);
      const hasTwoSame = numCounts.includes(2);
  return hasThreeSame && hasTwoSame
}


const isStraightFlush = (pokerHand,kind) => {
    let hand = orderPokerHand(pokerHand);
  const { num: firstNum, suit: firstSuit } = hand[0];
  let isValid = true;

  hand.slice(1).forEach(({ num, suit }, index) => {
    if (kind === "straightFlush") {
      isValid = !(num !== firstNum + index + 1 || suit !== firstSuit);
    } else if (kind === "straight") {
      isValid = !(num !== firstNum + index + 1);
    } else if (kind === "flush") {
      isValid = !(suit !== firstSuit);
    }
  });
  return isValid
}

const isTwoPair = (pokerHand) => {
    const numCounts = counting(pokerHand)
    const numOfPairs = numCounts.filter(count => count === 2).length
  return numOfPairs === 2;
}

const isNumbOfKind = (pokerHand,Numb) => {
   let counts=counting(pokerHand)
    return counts.some((count) => count === Numb)
}
const getHighestCard = (pokerHand) => {
    let hand = orderPokerHand(pokerHand)
    let handNumbers=hand.map(({ num }) => num)
    let maxNum = Math.max(...handNumbers)
    let value = cardsValue[maxNum - 1]

    if (value === 'A') {
        return {cardName:'Ace',cardValue:maxNum,handNumbers}
    }
    if (value === 'Q') {
        return {cardName:'Queen',cardValue:maxNum,handNumbers}
    }
    if (value === 'K') {
        return {cardName:'King',cardValue:maxNum,handNumbers}
    }
    if (value === 'J') {
        return  {cardName:'Jack',cardValue:maxNum,handNumbers}
    }
    return  {cardName:value,cardValue:maxNum,handNumbers}
}
const getPokerHandRank = (pokerHand) => {
    let pokerHandsRank = [
        { name:'straightFlush',rank: 9, value:isStraightFlush(pokerHand,'straightFlush') },
        { name:'FourOfKind',rank: 8 ,value:isNumbOfKind(pokerHand,4)},
        { name:'fullHouse',rank: 7 ,value:isFullHouse(pokerHand)},
        { name:'flush' ,rank:6,value: isStraightFlush(pokerHand,"flush")},
        { name:'straight',rank: 5,value: isStraightFlush(pokerHand,"straight") },
        { name:'threeOfKind' ,rank:4 ,value:isNumbOfKind(pokerHand,3) },
        { name:'twoPair',rank: 3 ,value:isTwoPair(pokerHand) },
        { name:'pair',rank: 2 ,value:isNumbOfKind(pokerHand,2) },
        { name:'highCard' ,rank:1 ,value: true},
    ]
    
    const result = pokerHandsRank.find((element) => element.value);

  if (result) {
    return {
      name: result.name,
      rank: result.rank,
      highestCard:getHighestCard(pokerHand)
    };
  }
}


const getWinner = (firstPlayerHand,secondePlayerHand) => {
    let firstPlayerHandRank = getPokerHandRank(firstPlayerHand)
    let secondePlayerHandRank = getPokerHandRank(secondePlayerHand)
    
    if (firstPlayerHandRank.rank > secondePlayerHandRank.rank) {
        return `first Player wins - with ${firstPlayerHandRank.name}: ${firstPlayerHandRank.highestCard.cardName} `
    }
  
    if (firstPlayerHandRank.rank === secondePlayerHandRank.rank) {
        if (firstPlayerHandRank.highestCard.cardValue > secondePlayerHandRank.highestCard.cardValue) {
            return `first Player wins - with ${firstPlayerHandRank.name}: ${firstPlayerHandRank.highestCard.cardName} `
        }
        if (firstPlayerHandRank.highestCard.cardValue === secondePlayerHandRank.highestCard.cardValue) {
            const handOne = firstPlayerHandRank.highestCard.handNumbers
            const handTwo = secondePlayerHandRank.highestCard.handNumbers
            const uniqueNumbers = handOne.filter(num => !handTwo.includes(num));
            const winnerNumber= Math.max(...uniqueNumbers)

            if (handOne.includes(winnerNumber)) {
                return `first Player wins - with ${firstPlayerHandRank.name}: ${winnerNumber+1} `
            }
            if (handTwo.includes(winnerNumber)) {
                    return `seconde Player wins - with ${firstPlayerHandRank.name}: ${winnerNumber+1} `
                }
            
            return `Tie`
        }
        
    }
  
    return `seconde Player wins - with ${secondePlayerHandRank.name}: ${secondePlayerHandRank.highestCard.cardName}`
}
