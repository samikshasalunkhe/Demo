
import React, { useState } from "react";


const courseData = {
  FY: {
    Semester1: [
      {
        name: "Fundamentals of IT",
          outcomes: [
            "CO1 - Understand computer basics and hardware components.",
            "CO2 - Learn operating system and file handling.",
          ],
          marks: { theory: 60, practical: 40 },
        },

        {
          name: "Programming in C",
          outcomes: [
            "CO1 - Write basic C programs using control structures.",
            "CO2 - Apply functions, arrays, and pointers.",
          ],
          marks: { theory: 80, practical: 20 },
        },

        {
          name: "Basic Electronics",
          outcomes: [
            "CO1 - Identify electronic components and circuits.",
            "CO2 - Understand diodes, transistors and applications.",
          ],
          marks: { theory: 60, practical: 40 },
        },

        {
          name: "Communication Skills",
          outcomes: [
            "CO1 - Develop verbal and written communication abilities.",
            "CO2 - Enhance technical and business communication.",
          ],
          marks: { theory: 50, practical: 50 },
        },
        
        {
          name: "Engineering Mathematics-I",
          outcomes: [
            "CO1 - Apply calculus in engineering problems.",
            "CO2 - Understand limits, derivatives, and integrals.",
          ],
          marks: { theory: 100, practical: 0 },
        },

        {
          name: "Computer Workshop",
          outcomes: [
            "CO1 - Identify computer hardware components.",
            "CO2 - Assemble and troubleshoot basic PC setups.",
          ],
          marks: { theory: 0, practical: 100 },
        },
    ],

    Semester2: [
      {
        name: "Applied Mathematics",
        outcomes: [
          "CO1 - Solve engineering problems using mathematical concepts.",
          "CO2 - Use matrices and differential equations.",
        ],
        marks: { theory: 100, practical: 0 },
      },
      {
        name: "Digital Electronics",
        outcomes: [
          "CO1 - Understand number systems and logic gates.",
          "CO2 - Design combinational and sequential circuits.",
        ],
        marks: { theory: 70, practical: 30 },
      },

       {
          name: "Environmental Studies",
          outcomes: [
            "CO1 - Understand environmental challenges and solutions.",
            "CO2 - Promote sustainable development.",
          ],
          marks: { theory: 75, practical: 25 },
        },

         {
          name: "Database Fundamentals",
          outcomes: [
            "CO1 - Understand database models and operations.",
            "CO2 - Perform queries using SQL.",
          ],
          marks: { theory: 70, practical: 30 },
        },
       {
          name: "Web Designing",
          outcomes: [
            "CO1 - Design basic websites using HTML/CSS.",
            "CO2 - Implement responsive design concepts.",
          ],
          marks: { theory: 60, practical: 40 },
        },
    ],
  },
  SY: {
   Semester3:[
 
  {
    name: "DATABASE MANAGEMENT SYSTEM",
    outcomes: [
      "CO1 - Explain concept of database management system.",
      "CO2 - Design the database for given problem.",
      "CO3 - Manage database using SQL.",
      "CO4 - Implement PL/SQL codes for given application.",
      "CO5 - Apply security and backup methods on database.",
    ],
    marks: { theory: 70, practical: 30 },
  },
  {
    name: "OBJECT ORIENTED PROGRAMMING USING C++",
    outcomes: [
      "CO1 - Write C++ programs using classes and objects.",
      "CO2 - Develop C++ programs using constructors.",
      "CO3 - Implement Inheritance in C++.",
      "CO4 - Implement Polymorphism in C++.",
      "CO5 - Develop C++ programs to perform file operations.",
    ],
    marks: { theory: 70, practical: 30 },
  },
  {
    name: "DIGITAL TECHNIQUES AND MICROPROCESSORS",
    outcomes: [
      "CO1 - Test logic gates and digital systems.",
      "CO2 - Use basic combinational and sequential logic circuits employing digital ICs.",
      "CO3 - Perform operations on registers using 8086 instructions.",
      "CO4 - Use 8086 microprocessor environment to build and execute assembly language programs.",
      "CO5 - Develop assembly language programming in 8086 to implement loops and branching instructions.",
    ],
    marks: { theory: 70, practical: 30 },
  },
  {
    name: "ESSENCE OF INDIAN CONSTITUTION",
    outcomes: [
      "CO1 - List salient features and characteristics of the constitution of India.",
      "CO2 - Follow fundamental rights and duties as responsible citizen of the country.",
      "CO3 - Analyze major constitutional amendments in the constitution.",
      "CO4 - Follow procedure to cast vote using voter-id.",
    ],
    marks: { theory: 60, practical: 40 },
  },
],
  
Semester4: [
  {
    name: "ENVIRONMENTAL EDUCATION AND SUSTAINABILITY",
    outcomes: [
      "CO1 - Identify the relevant Environmental issues in specified locality.",
      "CO2 - Provide the green solution to the relevant environmental problems.",
      "CO3 - Conduct SWOT analysis of biodiversity hotspot.",
      "CO4 - Apply the relevant measures to mitigate the environmental pollution.",
      "CO5 - Implement the environmental policies under the relevant legal framework.",
    ],
    marks: { theory: 80, practical: 20 },
  },
  {
    name: "JAVA PROGRAMMING",
    outcomes: [
      "CO1 - Develop java program using classes and objects.",
      "CO2 - Develop java program for implementing code reusability concept.",
      "CO3 - Develop program to implement multithreading and exception handling.",
      "CO4 - Develop java program for implementing event handling using window-based application components.",
      "CO5 - Implement network programming in java.",
      "CO6 - Develop java program for managing database.",
    ],
    marks: { theory: 60, practical: 40 },
  },
  {
    name: "DATA COMMUNICATION AND COMPUTER NETWORK",
    outcomes: [
      "CO1 - Analyze the functioning of Data Communication and Computer Network.",
      "CO2 - Select relevant Transmission Media and Switching Techniques as per need.",
      "CO3 - Analyze the Transmission Errors with respect to IEEE standards.",
      "CO4 - Configure different TCP/IP services.",
      "CO5 - Implement relevant Network Topology using Networking Devices.",
    ],
    marks: { theory: 60, practical: 40 },
  },
  {
    name: "PYTHON PROGRAMMING",
    outcomes: [
      "CO1 - Develop python programs using control flow statements.",
      "CO2 - Perform operations on various data structures in Python.",
      "CO3 - Develop packages to solve given problem using python.",
      "CO4 - Apply object-oriented approach to solve given problem using python.",
      "CO5 - Use relevant built-in python package to develop application.",
    ],
    marks: { theory: 60, practical: 40 },
  },
  {
    name: "UI/UX DESIGN",
    outcomes: [
      "CO1 - Create user-centered interfaces.",
      "CO2 - Understand UX principles and usability.",
    ],
    marks: { theory: 50, practical: 50 },
  },
],
}, 
  TY: {
    Semester5: [
      {
        name: "Operating System",
        outcomes: [
          "CO1 - Understand process management, scheduling, and memory management.",
          "CO2 - Explain file systems and I/O management.",
        ],
        marks: { theory: 80, practical: 20 },
      },
      {
        name: "Computer Networks",
        outcomes: [
          "CO1 - Explain network topologies and OSI layers.",
          "CO2 - Understand protocols and transmission techniques.",
        ],
        marks: { theory: 60, practical: 40 },
      },

     {
          name: "Cloud Computing",
          outcomes: [
            "CO1 - Understand virtualization and cloud models.",
            "CO2 - Use AWS/GCP services.",
          ],
          marks: { theory: 50, practical: 50 },
      },

      {
          name: "Python Programming",
          outcomes: [
            "CO1 - Write and execute Python scripts.",
            "CO2 - Use libraries like NumPy and Pandas.",
          ],
          marks: { theory: 70, practical: 30 },
      },

      {
          name: "Project Management",
          outcomes: [
            "CO1 - Plan and monitor software projects.",
            "CO2 - Apply cost and risk management.",
          ],
          marks: { theory: 100, practical: 0 },
      },

 ],
    Semester6: [
      {
        name: "Web Development",
        outcomes: [
          "CO1 - Build web pages using HTML, CSS, JS.",
          "CO2 - Develop full-stack apps using MERN stack.",
        ],
        marks: { theory: 60, practical: 40 },
      },
      {
        name: "Project Development",
        outcomes: [
          "CO1 - Plan, design, and execute software projects.",
          "CO2 - Use version control and documentation.",
        ],
        marks: { theory: 0, practical: 100 },
      },

      {
          name: "Artificial Intelligence",
          outcomes: [
            "CO1 - Understand AI fundamentals and search strategies.",
            "CO2 - Implement expert systems and agents.",
          ],
          marks: { theory: 70, practical: 30 },
     },

    {
          name: "Software Testing",
          outcomes: [
            "CO1 - Understand types and levels of testing.",
            "CO2 - Perform unit and system testing.",
          ],
          marks: { theory: 70, practical: 30 },
    },
     {
          name: "Data Analytics",
          outcomes: [
            "CO1 - Work with Hadoop and Spark.",
            "CO2 - Process large scale datasets.",
          ],
          marks: { theory: 60, practical: 40 },
        }
    ],
  },
};


const StudentCourses = () => {
  const [selectedYear, setSelectedYear] = useState("FY");
  const [selectedSemester, setSelectedSemester] = useState("Semester1");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const yearData = courseData[selectedYear] || {};
  const semesterData = yearData[selectedSemester] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-pink-100 p-10">
      {/* Year Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        {["FY", "SY", "TY"].map((year) => (
          <button
            key={year}
            className={`px-4 py-2 rounded-xl font-semibold shadow-md transition-all duration-200 ${
              selectedYear === year
                ? "bg-pink-600 text-white"
                : "bg-white text-pink-700 hover:bg-pink-100"
            }`}
            onClick={() => {
              setSelectedYear(year);
              setSelectedSemester("Semester1");
              setSelectedCourse(null);
            }}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Semester Buttons */}
      <div className="flex justify-center gap-4 mb-4">
        {Object.keys(yearData).map((sem) => (
          <button
            key={sem}
            className={`px-4 py-2 rounded-xl font-medium shadow transition-all duration-200 ${
              selectedSemester === sem
                ? "bg-orange-600 text-white"
                : "bg-white text-orange-700 hover:bg-orange-100"
            }`}
            onClick={() => {
              setSelectedSemester(sem);
              setSelectedCourse(null);
            }}
          >
            {sem}
          </button>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
        {/* Course List */}
        <div className="bg-white p-6 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-pink-700">
            📚 Courses
          </h2>
          <ul>
            {semesterData.map((course, idx) => (
              <li
                key={idx}
                className="mb-3 cursor-pointer bg-pink-50 hover:bg-pink-100 text-pink-900 px-4 py-2 rounded-xl transition-all"
                onClick={() => handleCourseClick(course)}
              >
                {course.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Course Detail */}
        <div className="bg-white p-6 rounded-3xl shadow-xl min-h-[300px]">
          {selectedCourse ? (
            <>
              <h3 className="text-2xl font-semibold mb-2 text-orange-800">
                {selectedCourse.name}
              </h3>
              <h4 className="text-md font-medium mt-2 mb-1 text-gray-500">
                COURSE LEVEL LEARNING OUTCOMES
              </h4>
              <ul className="list-disc ml-6 mb-4 text-gray-800">
                {selectedCourse.outcomes.map((co, i) => (
                  <li key={i}>{co}</li>
                ))}
              </ul>
              <h4 className="text-md font-medium mt-4 mb-1 text-gray-500">
                MARKING SCHEME:
              </h4>
              <ul className="list-disc ml-6 text-gray-800">
                <li>Theory: {selectedCourse.marks.theory} Marks</li>
                <li>Practical: {selectedCourse.marks.practical} Marks</li>
              </ul>
            </>
          ) : (
            <p className="text-gray-500 text-lg mt-20 text-center">
              Select a course to view details.
            </p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-600 mt-12">
        © 2025 | Course Learning Outcomes
      </div>
    </div>
  );
};

export default StudentCourses;