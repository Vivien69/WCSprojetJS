import './bootstrap';

fetch('/api/argonautes')
    .then(response => response.json())
    .then(data => console.log(data));