import SCNote from "./sc-note";
import SimpleCalendar from "./simple-calendar";

export default class SCNoteCollection extends foundry.utils.Collection<any>{

    static onReady(){
        // Add the FQL unique Quest data type to the Foundry core data types.
        // @ts-ignore
        CONST.ENTITY_TYPES?.push(SCNote.documentName);
        // @ts-ignore
        CONST.ENTITY_LINK_TYPES?.push(SCNote.documentName);

        // Add the FQL Quest data type to CONFIG.
        // @ts-ignore
        CONFIG[SCNote.documentName] = {
            entityClass: SCNote,
            documentClass: SCNote,
            collection: SCNoteCollection,
            sidebarIcon: 'fas fa-scroll',
            sheetClass: SimpleCalendar
        };

        // Add our QuestCollection to the game collections.
        // @ts-ignore
        (<Game>game).collections.set(SCNote.documentName, new SCNoteCollection());
    }

    /**
     * Returns the document name for this Collection.
     * @returns {string} document name.
     */
    static get documentName(){
        return SCNote.documentName;
    }

    /**
     * Returns the document name for this Collection.
     * @returns {string} document name.
     */
    get documentName(){
        return SCNote.documentName;
    }

    /**
     * Returns this collection.
     * @returns {SCNoteCollection} This instance.
     */
    static get instance() {
        return (<Game>game).collections.get(SCNoteCollection.documentName);
    }
}
