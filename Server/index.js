import express, { response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Inst from 'instamojo-nodejs'




// express usage
const app = express()
app.use(express.json());
app.use(express.urlencoded())
app.use(cors())

//port 
const PORT = 5000;


// mongoose connection
mongoose.connect("mongodb+srv://prasandsouza:1234567890@mern.z8chls7.mongodb.net/?retryWrites=true&w=majority/userdata")
    .then(result => console.log("successfull connection"))
    .catch(result => console.log('error while connecting'))

    // new schema
const userSchema = new mongoose.Schema({
    invoice: String,
    Amount: Number,
    Qty: Number,
    Status: String
})
const User = new mongoose.model("userdata", userSchema)

// instaMOjo
const API_KEY = "test_8b1ca8b6dfb6691e7c87043914c"
const AUTH_KEY = "test_9d0bacc44ebe559ba8564976694"
Inst.setKeys(API_KEY, AUTH_KEY)
Inst.isSandboxMode(true)
let a = 0;


// api calls
app.post('/pay', async (req, res) => {
    let { name, email, amount } = req.body.data
    let sample = req.body.backendData
    let data = new Inst.PaymentData();
    a = sample._id;
    const REDIRECT_URL = 'https://graceful-tartufo-9e0f52.netlify.app/success'
    data.setRedirectUrl(REDIRECT_URL)
    data.purpose = 'Monk house assessment'
    data.send_email = 'true'
    data.amount = amount;
    data.email = email;
    data.name = name;
    Inst.createPayment(data, function (error, response) {
        if (error) {
            res.send({ message: 'enter valid data' })

        } else {
            res.send({ url: response })
        }
    })
})

app.post('/success', async (req, res) => {
    console.log(req.body)
    const { id, req_id, status } = req.body
    Inst.getPaymentDetails(id, req_id, async (error, response) => {
        console.log(response)
        if (error) {
            console.log(error);
            res.sendStatus(500);
        } else {
            if (status && status === 'Credit') {
                // Payment is successful
                res.sendStatus(200);
                let dataDB = await User.find({});
                await User.updateOne({ _id: a }, { Status: 'Paid' });
            } else {
                // Payment failed
                console.log(payment);
                res.sendStatus(400);
            }
        }
    });
})


app.get("/", async (req, res) => {
    let dataDB = await User.find({});
    try {
        res.send({ data: dataDB })
    } catch
    {
        console.log('error')
    }
})



app.post('/register', async (req, res) => {
    const { Amount, invoice, Qty, Status } = req.body
    try {
        let dataDB = await User.find({});
        let DataExist = await dataDB.filter((value) => {
            if (value.invoice == invoice) {
                return value
            }
        })
        if (DataExist.length <= 0) {
            const user = new User({
                Amount, invoice, Qty, Status
            })
            try {
                user.save();
                res.send({ message: 'invoice updated succesfully' })
            } catch (error) {
                console.log('error', error.message)
            }
        }
        else {
            res.send({ message: 'Invoice number already existed' })
        }
    } catch (error) {
        console.log("Error : ", error.message);
    }
})



//server start
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
})
