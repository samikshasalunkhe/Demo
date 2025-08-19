import React, { useState } from "react";
import { Download, CalendarDays } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const ViewAttendance = () => {
  const dummyData = [
    { date: "2025-07-20", subject: "Math", present: 28, total: 30 },
    { date: "2025-07-21", subject: "Science", present: 30, total: 30 },
    { date: "2025-07-22", subject: "English", present: 27, total: 30 },
    { date: "2025-07-23", subject: "Math", present: 26, total: 30 },
    { date: "2025-07-24", subject: "Science", present: 25, total: 30 },
  ];

  const [subjectFilter, setSubjectFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");

  const filteredData = dummyData.filter((entry) => {
    const subjectMatch = subjectFilter === "All" || entry.subject === subjectFilter;
    const dateMatch = !dateFilter || entry.date === dateFilter;
    return subjectMatch && dateMatch;
  });

  const uniqueSubjects = ["All", ...new Set(dummyData.map((d) => d.subject))];

  const handleDownloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["Date,Subject,Present,Total,Attendance%"]
        .concat(
          filteredData.map(
            (d) =>
              `${d.date},${d.subject},${d.present},${d.total},${(
                (d.present / d.total) *
                100
              ).toFixed(1)}%`
          )
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "attendance_records.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Attendance Records", 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [["Date", "Subject", "Present", "Total", "Attendance %"]],
      body: filteredData.map((d) => [
        d.date,
        d.subject,
        d.present,
        d.total,
        ((d.present / d.total) * 100).toFixed(1) + "%",
      ]),
    });
    doc.save("attendance_records.pdf");
  };

  const chartData = filteredData.map((d) => ({
    name: `${d.subject} (${d.date})`,
    attendance: Number(((d.present / d.total) * 100).toFixed(1)),
  }));

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-purple-900 via-[#1e1b4b] to-gray-900 text-white">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-purple-300 mb-4 md:mb-0">
          Attendance Records
        </h2>
        <div className="flex gap-3">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded shadow"
          >
            <Download size={18} />
            CSV
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded shadow"
          >
            <Download size={18} />
            PDF
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="text-sm font-semibold mr-2">Subject:</label>
          <select
            className="bg-gray-800 text-white border border-purple-500 rounded px-3 py-1"
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
          >
            {uniqueSubjects.map((subject, idx) => (
              <option key={idx} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-semibold mr-2">Date:</label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-gray-800 text-white border border-purple-500 rounded px-3 py-1"
          />
        </div>
      </div>

      <div className="overflow-x-auto mb-10">
        <table className="min-w-full bg-[#1e293b] rounded-xl shadow-lg text-sm">
          <thead className="bg-purple-700 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Subject</th>
              <th className="py-3 px-6 text-left">Present</th>
              <th className="py-3 px-6 text-left">Total</th>
              <th className="py-3 px-6 text-left">Attendance %</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry, idx) => {
              const percent = ((entry.present / entry.total) * 100).toFixed(1);
              return (
                <tr
                  key={idx}
                  className="border-b border-gray-700 hover:bg-gray-800"
                >
                  <td className="py-3 px-6">{entry.date}</td>
                  <td className="py-3 px-6">{entry.subject}</td>
                  <td className="py-3 px-6">{entry.present}</td>
                  <td className="py-3 px-6">{entry.total}</td>
                  <td
                    className={`py-3 px-6 font-semibold ${
                      percent >= 90
                        ? "text-green-400"
                        : percent >= 75
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {percent}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="text-center text-gray-400 mt-6">
            No records available for the selected filters.
          </div>
        )}
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-purple-400">
        Attendance Trend
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis domain={[0, 100]} stroke="#ccc" />
          <Tooltip />
          <Bar dataKey="attendance" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ViewAttendance;
