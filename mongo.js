const mongoose = require('mongoose')
const mongoPath = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false'

module.exports = async () => {
  await mongoose.connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  
  })

  return mongoose
}
