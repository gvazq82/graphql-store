import mongoose from "mongoose";
import { Sequelize, DataTypes } from "sequelize";
import _ from "lodash";
import casual from "casual";

async function connectMongo() {
    try {
        await mongoose.connect('mongodb://localhost/widgets');
        console.log('Connected to MongoDB');
    } catch(e) {
        console.error('Error Connecting', e);
    }
}

connectMongo();

const widgetSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    soldout: String,
    inventory: String,
    stores: Array,
});

const Widgets = mongoose.model('widgets', widgetSchema);

const sequelize = new Sequelize('sqlite::memory:');

const Categories = sequelize.define('categories', {
    category: DataTypes.STRING,
    description: DataTypes.STRING,
});

async function syncAndSeedCategories() {
    try {
        await sequelize.sync({ force: false });
        console.log('SQLite connection established and Categories model sync');
        
        // Send categories
        await Promise.all(_.times(5, () => {
            return Categories.create({
                category: casual.string,
                description: casual.sentence,
            });
        }));
        console.log('Categories seeded');
    } catch(e) {
        console.error('Error with SQlite DB:', e);
    }
}

syncAndSeedCategories();

export { Widgets, Categories };