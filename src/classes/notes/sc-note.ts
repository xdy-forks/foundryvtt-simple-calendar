import SCNoteCollection from "./sc-note-collection";
import {Logger} from "../logging";
import {ModuleName} from "../../constants";
import SCNoteSheetShim from "./sc-note-sheet-shim";

export default class SCNote {

    id: string;
    /**
     * The title of the note
     * @type {string}
     */
    title: string = '';
    /**
     * The content of the note
     * @type {string}
     */
    content: string = '';


    constructor(id: string, title: string, content: string, data: any) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    static async Create(title: string){
        if(SCNoteCollection.noteDirectory){
            const entry = await JournalEntry.create({
                name: title,
                folder: SCNoteCollection.noteDirectory.id,
                content: '',
                flags: {
                    [ModuleName]: {
                        test: 'asd'
                    }
                }
            });
            if(entry){
                //@ts-ignore
                entry._sheet = new SCNoteSheetShim(entry.id);
                return entry;
            } else {
                Logger.error(`Unable to create journal entry`);
            }
        } else {
            Logger.error(`Note Directory note found`);
        }
        return null;
    }

    /**
     * The canonical name of this Document type, for example "Actor".
     * @returns {string} The document name.
     */
    static get documentName() {
        return 'SCNote';
    }
}
