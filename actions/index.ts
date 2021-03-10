import {
    SET_ACTIVE_PROBLEM,
    SET_ACIVE_LEVEL,
    SET_ACTIVE_THEME,
    SET_LOADING_STATUS,
    SET_START_STATUS,
    SET_START_OVER_STATUS,
    SET_PAUSE_STATUS,
    SET_ACTIVE_STORY,
    FETCH_ALL_STORIES,
    SET_STORY_LIST,
    SET_STORIES_TOTAL_NUMBER,
    UPDATED_STORY_LIST,
    SET_PREPARE_STATUS,
    SET_ACTIVE_MODAL_ID,
} from "../constants/actionTypes";

import { IProblemProps } from '../models/ProblemModel';
import { IStoryProps } from '../models/StoryModel';

/**
 * @param {object} problem extends from IProblemProps  
 */
export const setActiveProblem = (problem: IProblemProps) => ({
    type: SET_ACTIVE_PROBLEM,
    problem,
});

export const setActiveTheme = (theme: number) => ({
    type: SET_ACTIVE_THEME,
    theme,
});
export const setActiveLevel = (level: number) => ({
    type: SET_ACIVE_LEVEL,
    level,
});

export const setLoadingStatus = (status: boolean) => ({
    type: SET_LOADING_STATUS,
    status,
})
export const setStoryStart = (status: boolean) => ({
    type: SET_START_STATUS,
    status,
})
export const setStoryPause = (status: boolean) => ({
    type: SET_PAUSE_STATUS,
    status,
})
export const setStartOver = (status: boolean) => ({
    type: SET_START_OVER_STATUS,
    status,
})
export const setStoryPrePare = (status: boolean) => ({
    type: SET_PREPARE_STATUS,
    status,
})
export const setActiveModalId = (modalId: string) => ({
    type: SET_ACTIVE_MODAL_ID,
    modalId,
})


export const setActiveStory = (story: IStoryProps) => ({
    type: SET_ACTIVE_STORY,
    story,
})

export function fetchAllStories() {
    return {
        type: FETCH_ALL_STORIES,
    };
}
export function setStoryList(list: any) {
    return {
        type: SET_STORY_LIST,
        list
    };
}
export function setStoryTotal(total: number) {
    return {
        type: SET_STORIES_TOTAL_NUMBER,
        total
    };
}
export function setIsStoryUpdate(status: boolean) {
    return {
        type: UPDATED_STORY_LIST,
        status
    };
}


