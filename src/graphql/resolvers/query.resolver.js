const connectDB = require('../../db/database');
const { ObjectId } = require('mongodb');
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
            course = await db.collection('courses').findOne({ _id: ObjectId(id)});
           } catch (error) {
            console.log('ERROR: ', error);
           }
           return course;
        },
        getPeoples: async () => {
            let db;
            let liststudents = [];
            try {
                db = await connectDB();
                liststudents = await db.collection('students').find().toArray();                
            } catch (error) {
                console.error(error)
            }
            return liststudents
        },
        getPerson: async (root, {id}) =>  {
            let db;
            let student = {};
           try {
            db = await connectDB();
            student = await db.collection('students').findOne({ _id: ObjectId(id)});
           } catch (error) {
            console.log('ERROR: ', error);
           }
           return student;
        },
        globalSearch: async (root, {keyword}) =>  {
            let db;
            let items;
            let courses;
            let people;
           try {
            db = await connectDB();
            courses = await db.collection('courses').find({
                $text: { $search: keyword }
            }).toArray();
            people = await db.collection('students').find({
                $text: { $search: keyword }
            }).toArray();
            console.log('students: ', people);
            items = [...courses, ...people];
           } catch (error) {
            console.log('ERROR: ', error);
           }
           return items;
        }
    
}