const express = require('express');
const { validation, createUserSchema } = require('../utils/validation');
const router = express.Router();


router.post('/user', validation(createUserSchema), );
router.put('/user/:id', validation(createUserSchema), );
