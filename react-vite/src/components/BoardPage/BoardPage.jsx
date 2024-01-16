import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { thunkFetchNotes } from "../../redux/notes";
import "./BoardPage.css";

export default function BoardPage() {
  const sessionUser = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  const dispatch = useDispatch();

  const notesData = useSelector((state) => state.note.notes);
  const noteList = Object.values(notesData);

  useEffect(() => {
    if (!sessionUser) {
      navigate("/");
    }
  }, [sessionUser, navigate]);

  if (!noteList) return null;

  useEffect(() => {
    dispatch(thunkFetchNotes());
  }, [dispatch]);

  const devFeature = () => alert("Feature under development");

  const [note, setNote] = useState("");

  useEffect(() => {
    const savedNotesFromStorage = localStorage.getItem(
      `scratchPadNotes_${sessionUser?.id}`
    );
    if (savedNotesFromStorage) {
      setNote(JSON.parse(savedNotesFromStorage));
    }
  }, []);

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setNote(newNote);
    localStorage.setItem(
      `scratchPadNotes_${sessionUser?.id}`,
      JSON.stringify(newNote)
    );
  };

  return (
    <>
      <div className="main-board-wrapper">
        <div className="main-board-header">
          <p
            style={{
              fontSize: "20px",
              color: "#FFFFFF",
              textShadow: "rgba(0, 0, 0, 0.4) 1px 1px 2px",
            }}
          >
            Hello, {sessionUser?.username}!
          </p>
          <div className="main-board-header-side">
            <p
              style={{
                fontSize: "12px",
                color: "#f8f8f8",
                textShadow: "rgba(0, 0, 0, 0.4) 1px 1px 2px",
              }}
            >
              {formattedDate.toUpperCase()}
            </p>
            <button onClick={devFeature}>
              <i className="fas fa-sliders-h" style={{ marginLeft: "1px" }}></i>
              &nbsp;&nbsp;Customize
            </button>
          </div>
        </div>
        <div className="note-board-widget">
          <div className="note-board-wrapper">
            <div className="note-board-header">
              <Link
                to="/main/notes"
                style={{
                  textDecoration: "none",
                  color: "#333333",
                  margin: "0px 10px 0px 12px",
                  fontSize: "14px",
                }}
              >
                NOTES &nbsp;
                <i
                  className="fas fa-angle-right"
                  style={{ color: "orange" }}
                ></i>
              </Link>

              <Link
                style={{ textDecoration: "none", color: "black" }}
                className="add-note-button"
                to="/main/notes"
              >
                <i
                  className="material-icons"
                  style={{ color: "gray", paddingRight:"12px" }}
                >
                  note_add
                </i>
              </Link>
            </div>
            <div className="note-board-main">
              {[...noteList]
                .reverse()
                .map(({ title, content, created_at, id, img_url }) => (
                  <Link
                    to={`/main/notes/${id}`}
                    key={id}
                    className="note-section"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="note-section-title">{title}</div>
                    <div className="note-section-content">{content}</div>
                    {img_url && (
                      <img
                        className="note-section-img"
                        src={img_url}
                        alt="Note Image"
                      />
                    )}
                    <div className="note-section-date">
                      {created_at.slice(5, 11)}
                    </div>
                  </Link>
                ))}
            </div>
          </div>

          <div className="task-board-wrapper">
            <Link
              style={{
                textDecoration: "none",
                color: "#333333",
                fontSize: "14px",
              }}
            >
              MY TASKS &nbsp;
              <i className="fas fa-angle-right" style={{ color: "orange" }}></i>
            </Link>
          </div>

          <div className="scratch-pad-wrapper">
            <div
              style={{
                textDecoration: "none",
                color: "#333333",
                fontSize: "14px",
              }}
            >
              SCRATCH PAD &nbsp;
            </div>
            <div className="scratch-pad-body">
              <textarea
                placeholder="Start writing..."
                value={note}
                onChange={handleNoteChange}
              />
            </div>
            {/* <div className="scratch-pad-button">
              <button onClick={handleSaveNote}>Save Note</button>
            </div> */}
          </div>

          <div className="pinned-note-wrapper">
            <Link
              style={{
                textDecoration: "none",
                color: "#333333",
                fontSize: "14px",
              }}
            >
              PINNED NOTE &nbsp;
              <i className="fas fa-angle-right" style={{ color: "orange" }}></i>
            </Link>
          </div>
          <div className="tag-board-wrapper">
            <Link
              style={{
                textDecoration: "none",
                color: "#333333",
                fontSize: "14px",
              }}
            >
              TAGS &nbsp;
              <i className="fas fa-angle-right" style={{ color: "orange" }}></i>
            </Link>
          </div>
        </div>
        {/* <div className="creator-container">
          <ul style={{ listStyle: "none" }}>
            <p className="creator-header">About Creator</p>
            <li className="repo-link-container">
              <a
                className="creator-links"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/lovelyyun024/evernote-clone"
              >
                <i
                  className="fab fa-github-square"
                  style={{ marginRight: "5px" }}
                />
                Github Repo
              </a>
            </li>
            <li className="repo-link-container">
              <a
                className="creator-links"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/lovelyyun024"
              >
                <i
                  className="fa-brands fa-github"
                  style={{ marginRight: "5px" }}
                />
                Creator's Github
              </a>
            </li>
            <li className="repo-link-container">
              <a
                className="creator-links"
                target="_blank"
                rel="noreferrer"
                href="https://www.linkedin.com/in/estherzhangg/"
              >
                <i className="fab fa-linkedin" style={{ marginRight: "5px" }} />
                Creator's LinkedIn
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
}
