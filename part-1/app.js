let favNum = 3;
let url = 'http://numberapi.com'

// 1.
$.getJSON(`${url}/${favNum}?json`).then(data => {
    console.log(data);
  });
  
  // 2.
  let favNums = [4, 8, 15, 16, 23, 42];
  $.getJSON(`${url}/${favNums}?json`).then(data => {
    console.log(data);
  });
  
  // 3.
  Promise.all(
    Array.from({ length: 4 }, () => {
      return $.getJSON(`${url}/${favNum}?json`);
    })
  ).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
  });
  