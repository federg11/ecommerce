import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const authUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Validaciones básicas
        if (!email || !password) {
            return res.status(400).json({message: 'Email y contraseña son requeridos'});
        }

        const user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({message: 'email o contraseña no válida'});
        }

        const isPasswordValid = await user.matchPassword(password);
        
        if(!isPasswordValid) {
            return res.status(401).json({message: 'email o contraseña no válida'});
        }

        return res.status(200).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
        
    } catch (error) {
        console.error('Error en autenticación:', error);
        return res.status(500).json({message: 'Error del servidor al iniciar sesión'});
    }
}

//Registrar un nuevo usuario
export const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        // Validaciones básicas
        if (!name || name.length < 3) {
            return res.status(400).json({message: 'El nombre debe tener al menos 3 caracteres'});
        }

        if (!email || !email.includes('@') || !email.includes('.')) {
            return res.status(400).json({message: 'Por favor ingresa un email válido'});
        }

        if (!password || password.length < 6) {
            return res.status(400).json({message: 'La contraseña debe tener al menos 6 caracteres'});
        }

        // Verificar si el usuario ya existe
        const userExist = await User.findOne({email});

        if(userExist) {
            return res.status(401).json({message: 'El usuario ya existe con este email'});
        }

        // El primer usuario será administrador
        const isFirstUser = await User.countDocuments() === 0;

        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password,
            isAdmin: isFirstUser
        });

        console.log(`Usuario creado: ${user.name} (${user.email}), Admin: ${user.isAdmin}`);

        if(user) {
            return res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        } else {
            return res.status(400).json({message: 'Error al crear el usuario'});
        }
    } catch (error) {
        console.error('Error en registro:', error);
        
        // Manejar errores de MongoDB
        if (error.code === 11000) {
            return res.status(400).json({message: 'El email ya está registrado'});
        }
        
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({message: messages.join(', ')});
        }

        return res.status(500).json({message: 'Error del servidor al registrar usuario'});
    }
}
