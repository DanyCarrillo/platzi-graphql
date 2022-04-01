const connectDB = require("../../db/database");
const { ObjectId } = require("mongodb");

module.exports = {
  Course: {
    people: async ({ people }) => {
      let db;
      let peopleData;
      let studentsIds;
      try {
        db = await connectDB();
        studentsIds = people ? people.map((id) => ObjectId(id)) : [];
        peopleData =
          studentsIds.length > 0
            ? await db
                .collection("students")
                .find({ _id: { $in: studentsIds } })
                .toArray()
            : [];
      } catch (error) {
        console.log(error);
      }
      return peopleData;
    },
  },
  Person: {
    __resolveType: (person, context, info) => {
      if(person.phone){
        return 'Monitor';
      }
      return 'Student';
    }
  },
  GlobalSearch:{
    __resolveType: (item, context, info) => {
      if(item.title){
        return 'Course'
      }

      if(item.phone){
        return 'Monitor';
      }
      return 'Student';
    }
  }
};
