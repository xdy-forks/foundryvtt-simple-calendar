/**
 * This file mocks the FoundryVTT game global so that it can be used in testing
 */
import {SettingNames} from "../src/constants";

//@ts-ignore
const local: Localization = {
    lang: '',
    translations: {},
    initialize: jest.fn(() => {return Promise.resolve();}),
    localize: jest.fn((stringId: string) => {return '';}),
    format: jest.fn((stringId: string, replacements: any) => {return '';}),
    setLanguage: jest.fn((lang: string) => {return Promise.resolve();})
};

// @ts-ignore
const user: User = {
    name: '',
    id: '',
    active: true,
    viewedScene: '',
    avatar: '',
    //character: {},
    permissions: [],
    isTrusted: false,
    isGM: false,
    isSelf: true,
    can: jest.fn((permission: string) => {return false;}),
    hasPermission: jest.fn((permission: string) => {return false;}),
    hasRole: jest.fn((role: string) => {return false;}),
    isRole: jest.fn((role: string) => {return false;}),
    setPermission: jest.fn((premission: string, allowed: boolean) => {}),
    assignHotbarMacro: jest.fn((macro: Macro | null, slot: number, {fromSlot}: { fromSlot?: number }): Promise<User> => { return Promise.resolve(user);}),
    getHotbarMacros: jest.fn((page?: number): Macro[] => {return [];})
};

// @ts-ignore
const game = {
    data: null,
    i18n: local,
    user: user,
    // @ts-ignore
    settings: {
        get: jest.fn((moduleName: string, settingName: string): any => {
            switch (settingName){
                case SettingNames.AllowPlayersToAddNotes:
                case SettingNames.DefaultNoteVisibility:
                    return false;
                case SettingNames.YearConfiguration:
                    return {numericRepresentation: 0, prefix: '', postfix: '', showWeekdayHeadings: true};
                case SettingNames.MonthConfiguration:
                    return [[{name: '', numericRepresentation: 1, numberOfDays: 2, numberOfLeapYearDays: 2, intercalary: false, intercalaryInclude: false}]];
                case SettingNames.WeekdayConfiguration:
                    return [[{name: '', numericRepresentation: 0}]];
                case SettingNames.LeapYearRule:
                    return {rule: 'none', customMod: 0};
                case SettingNames.CurrentDate:
                    return {year: 0, month: 1, day: 2};
                case SettingNames.Notes:
                    return [[{year: 0, month: 1, day: 2, title:'', content:'', author:'', playerVisible:  false, id: 'abc123'}]];
            }
        }),
        register: jest.fn((moduleName: string, settingName: string, data: any) => {}),
        set: jest.fn((moduleName: string, settingName: string, data: any) => {return Promise.resolve(true);})
    }
    //keyboard: null,
    //modules: null
};
// @ts-ignore
global.game = game;

// @ts-ignore
global.ui = {
    notifications: {
        info: jest.fn((message: string) => {}),
        warn: jest.fn((message: string) => {}),
        error: jest.fn((message: string) => {})
    }
};
