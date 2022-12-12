const { studentRecord, facultyRecord } = require("../../models/record.model");
const { Student, Faculty } = require("../../models/user.model");
const { calculateDate } = require("../../utils/calcDate");

// GET -> /records/registered-students
async function registeredStudents(req, res) {
  const data = await Student.find({});

  return res.json(data);
}

// GET -> /records/registered-faculties
async function registeredFaculties(req, res) {
  const data = await Faculty.find({});

  return res.json(data);
}

// GET -> /records/students
async function getStudentRecords(req, res) {
  const date = calculateDate();

  const data = await studentRecord.find({ date: date.date }).sort({ _id: -1 });
  return res.json(data);
}

// GET -> /records/faculties
async function getFacultyRecords(req, res) {
  const date = calculateDate();

  const data = await facultyRecord.find({ date: date.date }).sort({ _id: -1 });

  return res.json(data);
}

// POST -> /records/filter-student
async function filteredStudent(req, res) {
  const body = req.body;

  const student = await Student.findOne(body);

  if (!student) {
    return res.json({ error: "No records" });
  }

  const data = await studentRecord.find({
    student_id: student._id,
    ...body,
  });

  return res.json(data);
}

// POST -> /records/filter-faculty
async function filteredFaculty(req, res) {
  const body = req.body;

  const faculty = await Faculty.findOne(body);

  if (!faculty) {
    return res.json({ error: "No records" });
  }

  const data = await facultyRecord.find({
    faculty_id: faculty._id,
    ...body,
  });

  return res.json(data);
}

module.exports = {
  getStudentRecords,
  getFacultyRecords,
  registeredStudents,
  registeredFaculties,
  filteredStudent,
  filteredFaculty,
};
