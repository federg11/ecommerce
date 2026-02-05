import Product from '../models/Product.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        
        // Ensure consistent image field for frontend
        const processedProducts = products.map(product => ({
            ...product.toObject(),
            image: product.image || product.imageUrl
        }));
        
        return res.status(200).json(processedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Error fetching products' })
    }
}

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            // Ensure consistent image field for frontend
            const responseProduct = {
                ...product.toObject(),
                image: product.image || product.imageUrl
            };
            return res.status(200).json(responseProduct);
        } else {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        res.status(500).json({ message: 'Error al obtener el producto' });
    }
}

export const createProduct = async (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Request file:', req.file);
        console.log('Request headers:', req.headers);
        
        // Basic validation
        const { name, price, description, stock, category } = req.body;
        
        if (!name || !price || !description || !category || stock === undefined) {
            return res.status(400).json({ message: 'All required fields must be provided' });
        }
        
        if (!req.file) {
            console.log('File not received. Multer configuration issue?');
            return res.status(400).json({ message: 'Image is required' });
        }

        // Subir imagen a Cloudinary - OBLIGATORIO
        let image;
        try {
            console.log('🚀 Starting Cloudinary upload for file:', req.file.originalname);
            console.log('📁 File buffer size:', req.file.buffer.length, 'bytes');
            
            const cloudinaryResult = await uploadToCloudinary(req.file);
            image = cloudinaryResult.secure_url;
            console.log('✅ SUCCESS: Image uploaded to Cloudinary:', image);
            console.log('🔗 Cloudinary public_id:', cloudinaryResult.public_id);
        } catch (uploadError) {
            console.error('❌ ERROR uploading to Cloudinary:', uploadError);
            return res.status(500).json({ 
                message: 'Error uploading image to Cloudinary',
                error: uploadError.message 
            });
        }

        const product = new Product({
            name,
            price: parseFloat(price),
            image: image,
            category,
            stock: parseInt(stock),
            description,
            user: req.user._id
        });

        const createdProduct = await product.save();
        return res.status(201).json(createdProduct);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Error saving product to database' });
    }
}

export const editProduct = async (req, res) => {
    try {
        console.log('Editing product ID:', req.params.id);
        console.log('Request body:', req.body);
        console.log('File received:', req.file);

        const { name, price, description, stock, category } = req.body;
        
        // Build update object
        const updateData = {
            name,
            price: parseFloat(price),
            category,
            stock: parseInt(stock),
            description
        };

        // Handle image upload if new image is provided
        if (req.file) {
            console.log('New image provided, uploading to Cloudinary...');
            try {
                const cloudinaryResult = await uploadToCloudinary(req.file);
                updateData.image = cloudinaryResult.secure_url;
                console.log('✅ New image uploaded to Cloudinary:', updateData.image);
            } catch (uploadError) {
                console.error('❌ Error uploading new image to Cloudinary:', uploadError);
                return res.status(500).json({ 
                    message: 'Error uploading new image to Cloudinary',
                    error: uploadError.message 
                });
            }
        }

        console.log('Update data:', updateData);

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        console.log('✅ Product updated successfully:', updatedProduct);
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ 
            message: 'Error al actualizar el producto',
            error: error.message 
        });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const removeProduct = await Product.findByIdAndDelete(req.params.id)
        return res.status(201).json(removeProduct);
    } catch (error) {
        res.status(404).json({ message: 'error al eliminar el productos' })
    }
}