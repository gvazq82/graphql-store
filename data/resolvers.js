import { Widgets, Categories } from "./dbConnectors";

const resolvers = {
    getProduct: async ({ id }) => {
        try {
            const product = await Widgets.findById(id);
            return product;
        } catch(error) {
            throw new Error(error);
        }
    },
    getAllProducts: async() => {
        try {
            return await Widgets.find({});
        } catch(e) {
            console.error('Error fetching the Products', e);
        }
    },
    createProduct: async ({ input }) => {
        const { name, description, price, soldout, inventory, stores } = input;
        const newWidget = new Widgets({
            name,
            description,
            price,
            soldout,
            inventory,
            stores,
        });
        newWidget.id = newWidget._id;
        try {
            await newWidget.save();
            return newWidget;
        } catch(e) {
            console.error('Error creating a product:', e);
        }
    },
    updateProduct: async ({ input }) => {
        try {
            const updateWidget = await Widgets.findOneAndUpdate({
                _id: input.id
            }, input, { new: true });
            return updateWidget;
        } catch(e) {
            console.error('Error updating a product:', e);
        }
    },
    deleteProduct: async({ id }) => {
        try {
            await Widgets.deleteOne({ _id: id });
            return 'Successfully deleted widget';
        } catch(e) {
            console.error('Error deleting a product:', e);
        } 
    },
    getAllCategories: async() => {
        try {
            return Categories.findAll();            
        } catch(e) {
            console.error('Error getting all categories', e);
        }
    }
}

export default resolvers;