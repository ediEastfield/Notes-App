import Utils from "../utils.js";
import NotesApi from "../data/remote/notes-api.js";

const home = () => {
  const inputFormElement = document.querySelector("form-input");

  const noteListContainerElement = document.querySelector("#noteListContainer");
  const noteLoadingElement = noteListContainerElement.querySelector('.note-loading')
  const noteErrorElement = noteListContainerElement.querySelector('note-error');
  const noteListElement = noteListContainerElement.querySelector("note-list");

  const showNote = async () => {
    showLoading();

    try {
      const notes = await NotesApi.getNotes();
      displayResult(notes);
      
      showNoteList();
    } catch (error) {
      noteErrorElement.textContent = error.message;
      showNoteError();
    }

  };

  const onAddNoteHandler = (event) => {
    event.preventDefault();

    const { title, body } = event.detail;

    const newNote = {
      title: title,
      body: body,
    };

    NotesApi.addNote(newNote);
    showNote();
  };

  const displayResult = (notes) => {

    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement("note-item");
      noteItemElement.note = note;

      console.log(note.id);
      
      return noteItemElement;
    });

    Utils.emptyElement(noteListElement);
    noteListElement.append(...noteItemElements);
  };

  const showNoteList = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteListElement);
  };

  const showLoading = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteLoadingElement);
  };

  const showNoteError = () => {
    Array.from(noteListContainerElement.children).forEach((element) => {
      Utils.hideElement(element);
    });
    Utils.showElement(noteErrorElement);
  }

  inputFormElement.addEventListener("addNote", onAddNoteHandler);
  showNote();
};

export default home;
