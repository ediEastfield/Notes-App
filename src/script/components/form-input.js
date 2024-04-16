class FormInput extends HTMLElement {
    _shadowRoot = null;
    _style = null;

    _submitEvent = 'submit';
    _addNoteEvent = 'addNote';

    constructor() {
        super();

        this._shadowRoot = this.attachShadow({ mode: 'open'});
        this._style = document.createElement('style');

        this.render();
    }

    _emptyContent() {
        this._shadowRoot.innerHTML = '';
    }

    connectedCallback() {
        this._shadowRoot
          .querySelector('form')
          .addEventListener('submit', (event) => this._onFormSubmit(event, this));
        this.addEventListener(this._submitEvent, this._onFormInputSubmit);
    }

    disconnectedCallback() {
        this._shadowRoot
          .querySelector('form')
          .removeEventListener('submit', (event) => this._onFormSubmit(event, this));
        this.removeEventListener(this._submitEvent, this._onFormInputSubmit);
    }

    _onFormSubmit(event, formInputInstance) {
        formInputInstance.dispatchEvent(new CustomEvent('submit'));

        event.preventDefault();
    }

    _onFormInputSubmit() {
        const title = this._shadowRoot.querySelector('#title').value;
        const body = this._shadowRoot.querySelector('#body').value;

        this.dispatchEvent(
            new CustomEvent(this._addNoteEvent, {
                detail: { title, body },
                bubbles: true,
            }),
        );

        this._shadowRoot
          .querySelector('form')
          .reset();
    }

    _updateStyle() {
        this._style.textContent = `
            :host {
                display: inline;
            }

            .floating-form {
                background-color: white;
                padding: 16px;
                border-radius: 5px;

                position: sticky;
                top: 10px;

                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
            }

            .input-form .form-group {
                margin: 8px 0;
            }

            .input-form .form-group input {
                display: block;
                width: 90%;
                padding: 8px;
                border-radius: 5px;
            }

            .input-form .form-group textarea {
                display: block;
                width: 90%;
                padding: 8px;
                border-radius: 5px;
                resize: vertical;
                min-height: 100px;
            }

            .input-form .form-group label {
                color: cornflowerblue;
                font-weight: bold;
            }

            .input-form button {
                background-color: cornflowerblue;
                color: white;
                border: 0;
                border-radius: 5px;
                display: block;
                width: 50%;
                padding: 8px;
                cursor: pointer;
            }
        `;
    }

    render() {
        this._emptyContent();
        this._updateStyle();

        this._shadowRoot.appendChild(this._style);
        this._shadowRoot.innerHTML += `
            <div class="floating-form">
                <form id="inputForm" class="input-form">
                    <div class="form-group">
                        <label for="title">Judul</label>
                        <input id="title" name="title" type="text" />
                    </div>
                    <div class="form-group">
                        <label for="body">Body(isi)</label><br>
                        <textarea id="body" name="body" rows="4" cols="50" required minlength="0" maxlength="500"></textarea><br><br>
                    </div>

                    <button>Masukkan catatan</button>
                </form>
            </div>
        `;
    }
}

customElements.define('form-input', FormInput);