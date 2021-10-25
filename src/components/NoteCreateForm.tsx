import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useTypeSelector } from "../hooks/useTypeSelector";
import { createAsyncNote } from "../store/asyncActions/asyncNoteActions";
import QuillEditor from "./QuillEditor";
import "./styles/NoteCreateForm.scss";

const NoteCreateForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { selectNoteId, showCeateNoteForm, selectedGroup } = useTypeSelector(
    (state) => state
  );

  const [title, setTitle] = useState("");
  const [editorValue, setEditorValue] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    selectNoteId && !showCeateNoteForm && history.push(`/note/${selectNoteId}`);
  }, [history, selectNoteId, showCeateNoteForm]);

  const createNotehandler = () => {
    const tagsArray = tags.trim().split(" ");
    dispatch(
      createAsyncNote({
        title,
        text: editorValue,
        tags: tagsArray,
      })
    );
  };

  const changeEditorHandler = (
    value: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    setEditorValue(value);
  };

  const isDisableBtnSave =
    title.length && editorValue.length && selectedGroup !== "All";

  return (
    <div className="noteCreateForm__container">
      <div>
        <input
          className="noteCreateForm__container-title_input"
          type="text"
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <QuillEditor
          className="noteCreateForm__container-quillEditor"
          value={editorValue}
          onChangeHandler={changeEditorHandler}
        />
      </div>
      <div>
        <input
          className="noteCreateForm__container-tags_input"
          type="text"
          placeholder="#tags..."
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="noteCreateForm__container-btn_save-container">
          <Button
            disabled={!isDisableBtnSave}
            onClick={createNotehandler}
            className="noteCreateForm__container-btn_save"
          >
            SAVE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoteCreateForm;
