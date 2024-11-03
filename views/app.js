const http = require('http');
const taskRoutes = require('../routes/taskRoutes');

const HOSTNAME = 'Localhost'
const PORT = 9000

const server = http.createServer((req,res) => {
    if(req.url.startsWith('/tasks')){
        taskRoutes(req,res)
    }else{
        res.writeHead(404, 'Not Found', {'content-type':'application/json'})
        res.end(JSON.stringify({
            Message: 'sorry, you got lost!'
        }))
    }
});


server.listen(PORT,HOSTNAME, () => {
    console.log(`sever running on pos ${PORT}`);  
})
