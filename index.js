const express = require ('express');
const mongoose = require ('mongoose');
const env = require ('dotenv');
env.config();
const router = express.Router();
 const app = express();
 
 const customerSchema = new mongoose.Schema({
    Name: String,
  ProductDomain: String,
  ProductType: String,
  Location: String
  });
  const complaints = mongoose.model('complaints', customerSchema);
  
  const dataSchema = new mongoose.Schema({
    Name: {
        required: true,
        type: String
    },
    ProductDomain: {
        required: true,
        type: String
    },
    ProductType: {
        required: true,
        type: String
    },
    Location: {
        required: true,
        type: String
    }
})
const complaints_model = mongoose.model('complaints', customerSchema);

module.exports = mongoose.model('Data', dataSchema)

app.use(express.json());

router.get("/", (request,response)=>{
    response.send("hello");
});

router.get("/customer", async(request,response)=>{
    var customers= await Customer.find({name : request.query.name});
    response.send(customers);
});



    //Post Method
router.post('/post', async (request, response) => {
    const data = new complaints_model({
        Name: request.body.Name,
        ProductDomain: request.body.ProductDomain,
        ProductType: request.body.ProductType,
        Location: request.body.Location  
    })

    try{

        const dataToSave = await data.save();
        response.status(200).json(dataToSave)

    }
    catch(error){

        response.status(400).json({message: error.message})
        
    }
})

//Get by Name Method
router.get('/getOne/:Name', async (request, response) => {
    try{
        const data = await complaints.find({ Name:request.params.Name});
        response.json(data)
    }
    catch(error){
        response.status(500).json({message: error.message})
    }
})

//Update by Name Method
router.patch('/update/:Name/:Location', async(request, response) => {
    

    try {
        const Name = request.params.Name;
        const updatedData = request.params;
        const options = { new: true };

        const result = await complaints.updateOne({Name : request.params.Name}, {Location : request.params.Location});


        response.send(result)
    }
    catch (error) {
        response.status(400).json({ message: error.message })
    }

})

/*Delete by ID Method
router.delete('/delete/:id', (request, response) => {
    response.send('Delete by ID API')

    try {
        const id = request.params.id;
        const data = Model.findByIdAndDelete(id)
         response.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        response.status(400).json({ message: error.message })
    }
}) */

app.use("/",router)
 

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
});

const constr = process.env.mdburl;
console.log(constr);
mongoose.connect(constr);
var mongodb=mongoose.connection;
mongodb.on('error', (error) => {
    console.log(error)
});



mongodb.once('connected', () => {
    console.log('Database Connected');
});



  