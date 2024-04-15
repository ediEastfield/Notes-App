import Utils from '../utils.js';
import Notes from '../data/local/notes.js';

const home = () => {
  const inputFormElement = document.querySelector('form-input');

  const noteListContainerElement = document.querySelector('#noteListContainer');
  const noteListElement = noteListContainerElement.querySelector('note-list');

  const showNote = (newNote) => {

    const result = Notes.getAll();
    displayResult(result);

    showNoteList();
  };

  const onAddNoteHandler = (event) => {
    event.preventDefault();

    const { title , body } = event.detail;

    const newNote = {
      id: `note-${Date.now()}`,
      title: title,
      body: body,
      createAt: new Date().toISOString(),
      archived: false
    };

    console.log('test');
    showNote(newNote);
  }

  const displayResult = (notes) => {
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

  showNote();
  inputFormElement.addEventListener('addNote', onAddNoteHandler);
};

export default home;
