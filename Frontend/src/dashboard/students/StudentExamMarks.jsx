import React from "react";

const StudentExamMarks = () => {
  const subjects = [
    {
      name: "Operating System",
      unit1: 27,
      unit2: 25,
    },
    {
      name: "Software Engineering",
      unit1: 24,
      unit2: 26,
    },
    {
      name: "Advanced Database Management",
      unit1: 28,
      unit2: 27,
    },
  ];

  const getAverage = (unit1, unit2) => ((unit1 + unit2) / 2).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-teal-200 py-10 px-4 text-gray-800 flex justify-center items-center">
      <div className="w-full max-w-5xl backdrop-blur-lg bg-white/30 border border-white/40 shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-8 text-center tracking-wide text-gray-900">
          🧪 Unit Test Marks by Subject (Out of 30)
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-white/40 text-gray-700 text-left">
                <th className="px-6 py-3">Subject</th>
                <th className="px-6 py-3">Unit Test 1<br />(/30)</th>
                <th className="px-6 py-3">Unit Test 2<br />(/30)</th>
                <th className="px-6 py-3">Average<br />(/30)</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => {
                const average = getAverage(subject.unit1, subject.unit2);
                return (
                  <tr
                    key={index}
                    className="border-b border-white/40 hover:bg-white/20 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {subject.name}
                    </td>
                    <td className="px-6 py-4 text-gray-800">{subject.unit1}</td>
                    <td className="px-6 py-4 text-gray-800">{subject.unit2}</td>
                    <td className="px-6 py-4 text-green-700 font-semibold">
                      {average}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <p className="mt-8 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} | Third Year Subject Marks
        </p>
      </div>
    </div>
  );
};

export default StudentExamMarks;