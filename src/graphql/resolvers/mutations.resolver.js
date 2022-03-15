const connectDB = require('../../db/database');
const { ObjectId } = require('mongodb');
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
    },
    editCourse: async (root, {_id, input }) => {
        let db;
        let course;
        try {
            db = await connectDB();
            await db.collection('courses').updateOne(
                {_id: ObjectId(_id)},
                {$set: input}
                )
            course = await db.collection('courses').findOne({_id: ObjectId(_id)});
        } catch (error) {
            console.log('Error: ', error);
        }
        return course;
    },
    createStudent: async (root, { input }) => {
        let db;
        let student;
        try {
            db = await connectDB();
            student = await db.collection('students').insertOne(input)
            input._id = student.insertedId;
        } catch (error) {
            console.log('Error: ', error);
        }
        return input;
    },
    editStudent: async (root, {_id, input }) => {
        let db;
        let student;
        try {
            db = await connectDB();
            await db.collection('students').updateOne(
                {_id: ObjectId(_id)},
                {$set: input}
                )
            student = await db.collection('students').findOne({_id: ObjectId(_id)});
        } catch (error) {
            console.log('Error: ', error);
        }
        return student;
    }
}
