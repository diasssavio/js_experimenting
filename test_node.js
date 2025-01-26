const http = require('http');
const fs = require('fs');

const PORT = 8124;

// const server_func = (request, response) => {
//     response.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
//     response.end('Bonjour le monde !\n');
// };

const server_func = (request, response) => {
    let name = require('url').parse(request.url, true).query.name;

    name = (name === undefined) ? 'le monde' : name;
    
    if (name === 'burningbird')
    {
        const file = 'pics/phoenix.jpg';
        fs.stat(file, (err, stat) => {
            if (err)
            {
                console.error(err);
                response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
                response.end('Désolé, Burningbird n\'est pas là pour le moment.\n');
            }
            else
            {
                const img = fs.readFileSync(file);
                response.contentType = 'image/png';
                response.contentLength = stat.size;
                response.end(img, 'binary');
            }
        });
    }
    else
    {
        response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        response.end(`Bonjour, ${name} !`)
    }
};

let server = http.createServer(server_func);
server.listen(PORT, () => console.log(`Serveur exécuté sur http://127.0.0.1:${PORT}/`));
