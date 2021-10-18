import SCNote from "./sc-note";
import SCNoteSheet from "./sc-note-sheet";
import {ModuleName, SCNotes} from "../../constants";
import {GameSettings} from "../game-settings";
import {Logger} from "../logging";
import SCNoteSheetShim from "./sc-note-sheet-shim";

export default class SCNoteCollection extends foundry.utils.Collection<any>{

    static noteDirectory: Folder | undefined;


    /**
     * Called during Foundries ready hook to apply all of these changes.
     */
    static async onReady(){
        // Add the FQL unique Quest data type to the Foundry core data types.
        // @ts-ignore
        //CONST.ENTITY_TYPES?.push(SCNote.documentName);
        // @ts-ignore
        //CONST.ENTITY_LINK_TYPES?.push(SCNote.documentName);

        // Add the FQL Quest data type to CONFIG.
        // @ts-ignore
        /*CONFIG[SCNote.documentName] = {
            entityClass: SCNote,
            documentClass: SCNote,
            collection: SCNoteCollection,
            sidebarIcon: 'fas fa-scroll',
            sheetClass: SCNoteSheet
        };*/

        // Add our QuestCollection to the game collections.
        // @ts-ignore
        //(<Game>game).collections.set(SCNote.documentName, new SCNoteCollection());

        // Get the note folder, or create it if it has not been created
        const journalDirectory = (<Game>game).journal?.directory;
        if(journalDirectory){
            SCNoteCollection.noteDirectory = journalDirectory.folders.find(f => f.name === SCNotes.DirectoryName);
            if(!SCNoteCollection.noteDirectory && GameSettings.IsGm()){
                await Folder.create({name: SCNotes.DirectoryName, type: 'JournalEntry', parent: null});
                SCNoteCollection.noteDirectory = journalDirectory.folders.find(f => f.name === SCNotes.DirectoryName);
            }

            if(SCNoteCollection.noteDirectory){
                //If there are journal entries under this folder, link them to use the sheet shim for rendering rather than the default journal sheet
                SCNoteCollection.noteDirectory.contents.forEach(n => {
                    //@ts-ignore
                    n._sheet = new SCNoteSheetShim(n.id || '');
                    //@ts-ignore
                    n.sheet = () => {console.log('test');};
                });

            } else {
                Logger.error(`Could not find the note directory`);
            }
        }
    }
}
