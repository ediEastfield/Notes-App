import Utils from '../utils.js';
import Notes from '../data/local/notes.js';

const home = () => {
  const inputFormElement = document.querySelector('form-input');

  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  const showNote = () => {

    displayResult();

    showNoteList();
  };

  const onAddNoteHandler = (event) => {
    event.preventDefault();

    const { title , body } = event.detail;

    const newNote = {
      id: `note-${Date.now()}`,
      title: title,
      body: body,
      createdAt: new Date().toISOString(),
      archived: false
    };

    Notes.addNote(newNote);
    showNote();
  }

  const displayResult = () => {
    const notes = Notes.getAll();
    const noteItemElements = notes.map((note) => {
      const noteItemElement = document.createElement('note-item');
      noteItemElement.note = note;

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

  inputFormElement.addEventListener('addNote', onAddNoteHandler);
  showNote();
};

export default home;
