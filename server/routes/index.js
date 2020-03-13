import express from 'express';
import path from 'path';

const apiRoutes = express.Router();

apiRoutes.get('/', (req,res) => {
	res.sendFile(path.join(__dirname,'../index.html'));
});

export default apiRoutes;
