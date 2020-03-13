import mongoose from 'mongoose';
const mrl = 'mongodb://127.0.0.1:27017/diseases';

mongoose.connect(mrl);
const db = mongoose.connection ;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('got db connection');
});

export default db;
