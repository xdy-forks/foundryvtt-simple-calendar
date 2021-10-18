import SCNoteSheet from "./sc-note-sheet";
import SCNoteCollection from "./sc-note-collection";

export default class SCNoteSheetShim extends FormApplication{
    noteId: string;

    constructor(noteId: string) {
        super({});
        this.noteId = noteId;
    }

    get rendered() { return false; }

    render(){
        if(SCNoteCollection.noteDirectory)
        {
            const je = SCNoteCollection.noteDirectory.contents.find(e => e.id === this.noteId);
            if(je && je.sheet){
                const sheet = new SCNoteSheet(<JournalEntry>je);
                sheet.render(true, {focus: true});
            }
        }
    }

    async _render(){
        this.render();
    }

    protected _updateObject(event: Event, formData?: object): Promise<unknown> {
        return Promise.resolve(false);
    }

}
