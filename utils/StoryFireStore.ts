import storage from '../Firebase';
// import firebase from 'firebase/app';
import { Query } from '@firebase/firestore-types';
import { getRandomInt } from './GetRandomInt';
import { mergeIdWithDocData } from './ProblemFireStore';

export const addNewStory = (data: any) => {
    // adding data here
    const result = storage
        .collection('stories')
        .doc()
        .set(data)
        .then(() => {
            return 'Ok';
        })
        .catch((error: any) => {
            console.log('error:', error);
        });
    return result;
};
export const updateCurrentStory = (data: any, id: string) => {
    // adding data here
    const result = storage
        .collection('stories')
        .doc(id)
        .set(data)
        .then(() => {
            return 'Ok';
        })
        .catch((error: any) => {
            console.log('error:', error);
        });
    return result;
};

export const getStoryFromFireStore = function () {
    let stories = storage.collection('stories');
    const result = stories
        .get()
        .then(querySnapshot => {
            if (querySnapshot.size > 0) {
                const stories = querySnapshot.docs.map(doc => {
                    const result = mergeIdWithDocData(doc.id, doc.data());
                    return result;
                });
                const length = stories.length;
                return stories[getRandomInt(length - 1)];
            }
        })
        .catch(error => {
            console.log('Error getting documents', error);
        });
    return result;
};
export const getCurrentStoryByDocId = function (id: string) {
    let stories = storage.collection('stories');
    const result = stories
        .doc(id)
        .get()
        .then(querySnapshot => {
            const result = mergeIdWithDocData(querySnapshot.id, querySnapshot.data());
            return result;
        })
        .catch(error => {
            console.log('Error getting current document', error);
        });
    return result;
};
export const getTotalStoryAmount = function () {
    let stories = storage.collection('stories');
    const result = stories
        .get()
        .then(querySnapshot => {
            return querySnapshot.size;
        })
        .catch(error => {
            console.log('Error getting documents', error);
        });
    return result;
};

export const getSubStoryListById = function (index: number, sort: string) {
    let storiesRef = storage.collection('stories') as Query;
    switch (sort) {
        case 'ACCESS_DES':
            storiesRef = storiesRef
                .orderBy('access', 'desc')
                .orderBy('createdAt', 'desc');
            break;
        case 'ACCESS_ASC':
            storiesRef = storiesRef
                .orderBy('access', 'asc')
                .orderBy('createdAt', 'desc');
            break;
        case 'LEVEL_DES':
            storiesRef = storiesRef
                .orderBy('level', 'desc')
                .orderBy('createdAt', 'desc');
            break;
        case 'LEVEL_ASC':
            storiesRef = storiesRef
                .orderBy('level', 'asc')
                .orderBy('createdAt', 'desc');
            break;
        default:
            storiesRef = storiesRef.orderBy('createdAt', 'desc');
    }

    const result = storiesRef
        .get()
        .then(querySnapshot => {
            const currentStories = querySnapshot.docs.slice(
                index * 25,
                (index + 1) * 25
            );
            const stories = currentStories.map((doc, index) => {
                const formattedDocData = {
                    name: doc.data().name,
                    index: doc.data().index,
                    duration: doc.data().duration,
                    problemId: doc.data().problemId,
                    wordsCount: doc.data().wordsCount,
                    publishedStatus: doc.data().publishedStatus,
                    savedStatus: doc.data().savedStatus,
                    access: doc.data().access,
                    reads: doc.data().reads,
                    level: doc.data().level,
                    likes: doc.data().likes,
                    createdAt: doc.data().createdAt,
                };
                const result = mergeIdWithDocData(doc.id, formattedDocData);
                return result;
            });
            return stories;
        })
        .catch(error => {
            console.log('Error getting documents', error);
        });
    return result;
};


export const deleteStoryById = function (id: string) {
    let stories = storage.collection('stories');
    const result = stories
        .doc(id)
        .delete()
        .then(() => {
            console.log("Document successfully deleted!");
            return 'OK'
        })
        .catch(error => {
            console.error("Error removing document: ", error);
        });
    return result;
}
