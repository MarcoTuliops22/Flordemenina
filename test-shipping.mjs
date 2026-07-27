const res = await fetch('http://localhost:3000/api/shipping/calculate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    cep: '01310-100',
    totalWeightGram: 50,
    cartSubtotal: 150,
  }),
});
const data = await res.json();
console.log(JSON.stringify(data, null, 2));
