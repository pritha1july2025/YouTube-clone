import { useEffect, useState } from "react";
import axios from "axios";

export default function CommentSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  //fetch comments
  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/comments/${videoId}`
    );
    setComments(res.data);
  };
//Add comments

  const addComment = async () => {
    if (!text.trim()) return;

    await axios.post(
      `http://localhost:5000/api/comments/${videoId}`,
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setText("");
    fetchComments();
  };
//Edit

  const startEdit = (comment) => {
    setEditingId(comment._id);
    setText(comment.text);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setText("");
  };

  const updateComment = async () => {
    await axios.put(
      `http://localhost:5000/api/comments/${editingId}`,
      { text },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    cancelEdit();
    fetchComments();
  };
//delete
  const deleteComment = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/comments/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (id === editingId) cancelEdit();

    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  return (
    <div className="comments-section">
      <h3>Comments</h3>

      {/* INPUT */}
      <input className="add-comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={editingId ? "Edit comment..." : "Add a comment"}
      />


      <button className="update-comment" onClick={editingId ? updateComment : addComment}>
        {editingId ? "Update" : "Post"}
      </button>
      {editingId && (
        <button className="cancel-button" onClick={cancelEdit} >
          Cancel
        </button>
      )}


      {/* COMMENTS LIST */}
      {comments.map((c) => (
        <div key={c._id} className="comment">
          <p>
            <b>{c.user?.username}</b>: {c.text}
          </p>

          <button className="edit-comment" onClick={() => startEdit(c)}>✏ Edit</button>
          <button className="delete-comment" onClick={() => deleteComment(c._id)}>🗑 Delete</button>
        </div>
      ))}
    </div>
  );
}
