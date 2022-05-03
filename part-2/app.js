$(function(){
    let url = 'http://deckofcardsapi.com/api/deck';

//1
 $.getJSON(`${url}/new/draw`).then(data => {
    let {suit, value} = data.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
 });

//2
 let firstCard = null;
 $.getJSON(`${url}/new/draw`)
    .then(data => {
        firstCard = data.cards[0];
        let deckId = data.deck_id;
        return $.getJSON(`${url}/${deckId}/draw/`);
    })
    .then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
            console.log(
                `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
            );
        });
    });

//3
 let deckId = null;
 let $btn = $('button');
 let $cardArea = $('#card-area');

 $.getJSON(`${url}/new/shuffle`).then(data => {
     deckId = data.deck_id;
     $btn.show();
 });

 $btn.on('click', function() {
     $.getJSON(`${url}/${deckId}/draw/`).then(data => {
         let cardSrc = data.cards[0].image;
         let angle = Math.random() * 180 - 90;
         let randomX = Math.random() * 80 - 40;
         let randomY = Math.random() * 80 - 40;
         $cardArea.append(
             $('<img>', {
                 src: cardSrc,
                 css : {
                     transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                 }
             })
         );
         if (data.remaining === 0) $btn.remove();
     });
 });
});