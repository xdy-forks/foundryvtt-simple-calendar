import SCNote from "./sc-note";
import {ModuleName} from "../../constants";

export default class SCNoteSheet extends FormApplication{
    journalEntry: JournalEntry;

    note: SCNote;

    constructor(journalEntry: JournalEntry, options = {}) {
        super({}, options);
        console.log(journalEntry, options);
        this.journalEntry = journalEntry;
        this.note = new SCNote(this.journalEntry.id || '', this.journalEntry.data.name, this.journalEntry.data.content, this.journalEntry.data.flags[ModuleName])
    }

    /**
     * Returns the default options for this application
     */
    static get defaultOptions() {
        const options = super.defaultOptions;
        options.template = "modules/foundryvtt-simple-calendar/templates/note.html";
        options.title = "FSC.Notes.DialogTitle";
        options.classes = ["form","simple-calendar-note"];
        options.resizable = true;
        options.closeOnSubmit = false;
        options.width = 500;
        return options;
    }



    protected _updateObject(event: Event, formData?: object): Promise<unknown> {
        return Promise.resolve(false);
    }

}

