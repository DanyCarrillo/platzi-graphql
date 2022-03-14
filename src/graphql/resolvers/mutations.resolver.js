const connectDB = require('../../db/database');

module.exports = {
    createCourse: async (root, { input }) => {
        let db;
        let course;
        const dfaults = {
            teacher: '',
            topic: '',
        };
        const newInput = Object.assign(dfaults, input);
        try {
            db = await connectDB();
            course = await db.collection('courses').insertOne(newInput)
            newInput._id = course.insertedId;
        } catch (error) {
            console.log('Error: ', error);
        }
        return newInput;
    }
}