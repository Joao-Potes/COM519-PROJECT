const mongoose = require('mongoose')
const mongoPath = 'mongodb+srv://admin:admin@cluster0.ifaag.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
  })

  return mongoose
}
