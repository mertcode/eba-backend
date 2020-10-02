const mongoose = require('mongoose')

mongoose.connect(`mongodb://${process.env.MONGO_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})