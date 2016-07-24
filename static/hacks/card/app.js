var quotes = [
    ['[Luke:] I can\'t believe it! [Yoda:] That is why you fail.', 'Master Yoda'],
    ['Do or do not. There is no try.', 'Master Yoda'],
    ['Be the change you wish to see in the world.', 'Mahatma Gandhi'],
];

var quote = quotes[Math.floor(Math.random() * quotes.length)];
document.querySelector(".quote").innerText = quote[0];
document.querySelector("cite").innerText = "--" + quote[1];
