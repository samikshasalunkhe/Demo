import React, { useEffect, useState } from "react";
import {
  getAllNotices,
  addNotice,
  updateNotice,
  deleteNotice,
} from "../../services/noticeApi";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const AdminNotices = () => {
  const [allNotices, setAllNotices] = useState([]);
  const [facultyNotices, setFacultyNotices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [visibleTo, setVisibleTo] = useState("faculty,student");
  const [editingNotice, setEditingNotice] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const adminId = user?._id || user?.id || null;

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const data = await getAllNotices();
      const adminCreated = data.filter(
        (n) => n.createdBy === "Admin" && n.createdById === adminId
      );
      const facultyCreated = data.filter((n) => n.createdBy === "Faculty");

      setAllNotices(adminCreated);
      setFacultyNotices(facultyCreated);
    } catch (err) {
      console.error("Error fetching notices", err);
    }
  };

  const handleAddOrUpdateNotice = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim() || !visibleTo) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingNotice) {
        await updateNotice(editingNotice._id, {
          title,
          content,
          visibleTo,
        });
        setEditingNotice(null);
      } else {
        await addNotice({
          title,
          content,
          visibleTo,
          createdBy: "Admin",
          createdById: adminId,
        });
      }

      fetchNotices();
      setShowForm(false);
      setTitle("");
      setContent("");
      setVisibleTo("faculty,student");
    } catch (err) {
      console.error("Error saving notice", err.response?.data || err.message);
      alert("Failed to save notice. Check console for details.");
    }
  };

  const handleEdit = (notice) => {
    setEditingNotice(notice);
    setTitle(notice.title);
    setContent(notice.content);
    setVisibleTo(notice.visibleTo);
    setShowForm(true);
  };

  // *हा filter चुकीचा होता, तो काढून टाकला*
  // const filteredNotices = data.filter(
  // (notice) =>
  //   notice.createdBy.toLowerCase() === "faculty" &&
  //   (notice.visibleTo.toLowerCase() === "admin" ||
  //    notice.visibleTo.toLowerCase() === "all")
  // );

  const handleDelete = async (id) => {
    try {
      await deleteNotice(id);
      fetchNotices();
    } catch (err) {
      console.error("Error deleting notice", err);
    }
  };

  return (
    <div className="min-h-screen bg-purple-900 text-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Admin Notices</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingNotice(null);
            setTitle("");
            setContent("");
            setVisibleTo("faculty");
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          {showForm ? "Cancel" : "Add Notice"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAddOrUpdateNotice}
          className="bg-white text-gray-900 backdrop-blur-md border border-white/20 shadow-md rounded-lg p-6 mb-6"
        >
          <div className="mb-3">
            <label className="block font-semibold">Title</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="block font-semibold">Content</label>
            <textarea
              className="w-full border px-3 py-2 rounded"
              rows="4"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block font-semibold">Visible To</label>
            <select
              className="w-full border px-3 py-2 rounded"
              value={visibleTo}
              onChange={(e) => setVisibleTo(e.target.value)}
              required
            >
              <option value="faculty">Faculty</option>
              <option value="student">Student</option>
              <option value="all">All</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {editingNotice ? "Update Notice" : "Submit Notice"}
          </button>
        </form>
      )}

      {/* Admin Created Notices */}
      <div>
        <h3 className="text-xl font-semibold mb-2">📢 My Admin Notices</h3>
        {allNotices.length === 0 ? (
          <p>No notices created yet.</p>
        ) : (
          <div className="grid gap-4">
            {allNotices.map((notice) => (
              <div
                key={notice._id}
                className="bg-purple-200 shadow-md p-4 rounded-md"
              >
                <h3 className="text-lg text-gray-900 font-semibold">
                  {notice.title}
                </h3>
                <p className="text-sm text-gray-600">{notice.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Visible To: {notice.visibleTo}
                </p>
                <p className="text-xs text-gray-400">
                  Created At: {formatDate(notice.createdAt)}
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(notice)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Faculty Notices Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">🧑‍🏫 Faculty Posted Notices</h3>
        {facultyNotices.length === 0 ? (
          <p>No notices from faculty yet.</p>
        ) : (
          <div className="grid gap-4">
            {facultyNotices.map((notice) => (
              <div
                key={notice._id}
                className="bg-purple-200 shadow-sm p-4 rounded-md"
              >
                <h3 className="text-lg text-gray-900 font-semibold">
                  {notice.title}
                </h3>
                <p className="text-sm text-gray-700">{notice.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Visible To: {notice.visibleTo}
                </p>
                <p className="text-xs text-gray-500">
                  Created At: {formatDate(notice.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNotices;