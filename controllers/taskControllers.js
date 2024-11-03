const {IncomingForm} = require('formidable');
const { readTasksFromFile, writeTasksToFile } = require("../utils/fileHandler")

exports.getTasks = (req, res) => {
    const tasks = readTasksFromFile();
    res.writeHead(200, {'content-type': 'application/json'})
    res.end(JSON.stringify(tasks))
}

exports.createTask = (req, res) =>{
    const form = new IncomingForm();
    form.parse(req, (err, fields,files) =>{
        if(err){
            res.writeHead(400,{'content-type': 'application/json'})
            res.end(JSON.stringify({
                Message: 'Error pasing form'
        }))
          return;
        }

        const image = files.image[0]
        const tasks = readTasksFromFile();
        const newTask = {
            id: Date.now(),
            title: fields.title,
            description: fields?.description || '',
            status : fields?.status || 'pending',
            image: image ? `./uploads/${image.originalFilename}`: null,
        }

        tasks.push(newTask);

        writeTasksToFile(tasks);

        if(files.image){
            copyFileSync(image.filepath, path.join(__dirname,'../uploads', image.originalFilename))
            res.end(JSON.stringify(newTask))
        }
    })
}

exports.updateTask = (req, res) =>{
    res.end(JSON.stringify({
        message: 'Not yet implemented'
    }))
}

exports. deleteTask = (req, res) =>{
    res.end(JSON.stringify({
        message: 'Not yet implemented'
    }))
}