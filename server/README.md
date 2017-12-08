# server

PUT: /app/moveBlind { position: [0; 100] }
{
    200,
}

GET: /app/position
{ 
    position: 10,    
}

POST: /app/setPosition { position: 'top' | 'bottom' }
{
    200
}