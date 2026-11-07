/*
  UniCore | Student Results Management & Analysis System
  Assignment: Level 4 - Task 2
  Core concepts: Class, Constructor, Methods, if/else, &&, filter, map, reduce
*/

"use strict";

// ---------- 1) Student model ----------
class Student {
  constructor(id, name, grades, attendance) {
    this.id = id;
    this.name = name;
    this.grades = grades;
    this.attendance = attendance;
  }

  // Calculate the average of the three subjects using reduce().
  calculateAverage() {
    const total = this.grades.reduce((sum, grade) => sum + grade, 0);
    return total / this.grades.length;
  }

  // Grade boundaries are assumed because the task does not define them.
  getGrade(average) {
    if (average >= 90) {
      return "A";
    } else if (average >= 80) {
      return "B";
    } else if (average >= 70) {
      return "C";
    } else if (average >= 60) {
      return "D";
    } else if (average >= 50) {
      return "E";
    } else {
      return "F";
    }
  }

  // Passing requires BOTH average and attendance conditions.
  getFinalResult(average) {
    if (average >= 50 && this.attendance >= 75) {
      return "ناجح";
    } else {
      return "يحتاج مراجعة";
    }
  }
}

// ---------- 2) University data: four Student objects ----------
const studentsList = [
  new Student(202401, "أحمد محمد", [92, 88, 95], 96),
  new Student(202402, "مريم علي", [45, 42, 48], 84),
  new Student(202403, "عمر خالد", [76, 81, 79], 72),
  new Student(202404, "سارة محمود", [40, 45, 44], 91)
];

// Small formatting helper for readable console reports.
const formatNumber = (number) => Number(number.toFixed(2));

console.clear();
console.log("%c UNICORE  /  ACADEMIC ANALYTICS ", "background:#102b3d;color:#61e2c2;font-size:16px;font-weight:bold;padding:10px 14px;border-radius:6px");
console.log("%cStudent Results Management & Analysis System", "color:#8fa8bc;font-size:12px");

// ---------- 3) Main academic report ----------
console.group("%c01 | التقرير الأكاديمي لجميع الطلاب", "color:#61e2c2;font-weight:bold;font-size:13px");

const studentsReport = studentsList.map((student) => {
  const average = student.calculateAverage();

  return {
    "رقم الجلوس": student.id,
    "اسم الطالب": student.name,
    "المتوسط": formatNumber(average),
    "التقدير": student.getGrade(average),
    "الحضور %": student.attendance,
    "النتيجة النهائية": student.getFinalResult(average)
  };
});

console.table(studentsReport);
console.groupEnd();

// ---------- 4) Grace committee: filter() ----------
const strugglingStudents = studentsList.filter((student) => {
  const average = student.calculateAverage();
  return average >= 40 && average <= 49;
});

// ---------- 5) Apply five grace marks: map() ----------
const studentsAfterGrace = strugglingStudents.map((student) => {
  const oldAverage = student.calculateAverage();
  const newAverage = oldAverage + 5;

  return {
    id: student.id,
    name: student.name,
    oldAverage: formatNumber(oldAverage),
    graceMarks: 5,
    newAverage: formatNumber(newAverage),
    newGrade: student.getGrade(newAverage),
    attendance: student.attendance,
    finalResult: student.getFinalResult(newAverage)
  };
});

// ---------- 6) Sum adjusted averages: reduce() ----------
const totalAdjustedAverages = studentsAfterGrace.reduce((sum, student) => {
  return sum + student.newAverage;
}, 0);

// Division-by-zero protection (the requested "safety shield").
const graceAverage = studentsAfterGrace.length > 0
  ? totalAdjustedAverages / studentsAfterGrace.length
  : 0;

// ---------- 7) Grace committee output ----------
console.group("%c02 | تقرير لجنة الرأفة", "color:#f3c969;font-weight:bold;font-size:13px");

if (studentsAfterGrace.length > 0) {
  console.table(studentsAfterGrace);
} else {
  console.warn("لا يوجد طلاب تنطبق عليهم شروط لجنة الرأفة.");
}

console.log("عدد الطلاب المشمولين بالرأفة:", studentsAfterGrace.length);
console.log("إجمالي المتوسطات بعد إضافة الرأفة:", formatNumber(totalAdjustedAverages));
console.log("المتوسط العام بعد الرأفة:", formatNumber(graceAverage));
console.groupEnd();

console.log("%cتم تنفيذ التحليل بنجاح.", "color:#61e2c2;font-weight:bold");
