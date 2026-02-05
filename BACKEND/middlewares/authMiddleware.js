import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//Middleware para usuarios autenticados
export const protect = async(req, res, next) => {
    let token;

//El token suele enviarse en el header 'Authorization' como 'Bearer <token>'
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
        //extraemos el token
        token = req.headers.authorization.split(' ')[1];

        //decodificamos el token para obtener el ID del usuario
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //buscamos al usuario y lo añadimos al objeto 'req' (sin la contraseña)
        req.user = await User.findById(decoded.id).select('-password');

        next(); //continuamos a la siguiente funcion
    } catch (error) {
        console.error(error)
        res.status(401).json({message: 'No autorizado, token fallido'})
    }
}
}

//middleware para verificar si es administrador
export const admin = async (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    }else {
        res.status(401).json({message: 'No autorizado como administrador'})
    }
}