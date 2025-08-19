import React, { useRef } from "react";
import { BarChart2, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const data = [
  { subject: "Math", attendance: 88 },
  { subject: "Science", attendance: 92 },
  { subject: "English", attendance: 85 },
  { subject: "History", attendance: 75 },
  { subject: "Computer", attendance: 95 },
];

const AttendanceReport = () => {
  const reportRef = useRef();

  const totalSubjects = data.length;
  const averageAttendance = Math.round(
    data.reduce((sum, item) => sum + item.attendance, 0) / totalSubjects
  );

  const downloadPDF = () => {
    const input = reportRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("attendance-report.pdf");
    });
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-[#1e1b4b] to-gray-900 min-h-screen text-white p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <BarChart2 className="text-green-400" />
          <h2 className="text-3xl font-bold text-indigo-300">Attendance Report</h2>
        </div>
        <button
          onClick={downloadPDF}
          className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md flex items-center gap-2 text-sm"
        >
          <Download size={16} />
          Download PDF
        </button>
      </div>

      <div ref={reportRef}>
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow text-center">
            <p className="text-gray-400">Total Subjects</p>
            <h3 className="text-xl font-semibold text-purple-300">{totalSubjects}</h3>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow text-center">
            <p className="text-gray-400">Average Attendance</p>
            <h3 className="text-xl font-semibold text-green-400">{averageAttendance}%</h3>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow text-center">
            <p className="text-gray-400">Highest Attendance</p>
            <h3 className="text-xl font-semibold text-yellow-400">
              {Math.max(...data.map((d) => d.attendance))}%
            </h3>
          </div>
        </div>

        {/* Attendance Progress Bars */}
        <div className="bg-[#1f2937] p-6 rounded-xl mb-6 shadow-lg">
          <h4 className="text-xl font-semibold mb-4 text-purple-300">Subject-wise Attendance</h4>
          <ul className="space-y-4">
            {data.map((item, idx) => (
              <li key={idx}>
                <div className="flex justify-between mb-1">
                  <span>{item.subject}</span>
                  <span className="text-sm text-gray-300">{item.attendance}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-indigo-500 h-3 rounded-full"
                    style={{ width: `${item.attendance}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Recharts Bar Chart */}
        <div className="bg-[#1f2937] p-6 rounded-xl shadow-lg">
          <h4 className="text-xl font-semibold mb-4 text-purple-300">Attendance Chart</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="subject" stroke="#a78bfa" />
              <YAxis stroke="#a78bfa" />
              <Tooltip />
              <Bar dataKey="attendance" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AttendanceReport;
