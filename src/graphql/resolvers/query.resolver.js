const connectDB = require('../../db/database');
const { ObjectID } = require('mongodb');
module.exports = {
        getCourses: async () => {
            let db;
            let listCourses = [];
            try {
                db = await connectDB();
                listCourses = await db.collection('courses').find().toArray();                
            } catch (error) {
                console.error(error)
            }
            return listCourses
        },
        getCourse: async (root, {id}) =>  {
            let db;
            let course = {};
           try {
            db = await connectDB();
            course = await db.collection('courses').findOne({ _id: ObjectID(id)});
           } catch (error) {
            console.log('ERROR: ', error);
           }
           return course;
        }
    
}