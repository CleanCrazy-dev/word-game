import storage from '../Firebase';
import { Query } from '@firebase/firestore-types';
import dayjs from 'dayjs';
import { getRandomInt } from "./GetRandomInt";


export const getProblemFromFireStore = function (
  theme: number,
  level: number,
  isToday: boolean
) {
  let key = getRandomInt(10);
  let problemsRef = storage.collection('problems') as Query;
  problemsRef = filterStoreData(theme, level, isToday, problemsRef);
  if (!isToday) {
    problemsRef = problemsRef.where('random', '>=', key);
  }
  const result = problemsRef
    .limit(1)
    .get()
    .then(querySnapshot => {
      if (querySnapshot.size > 0) {
        const problems = querySnapshot.docs.map(doc => {
          const result = mergeIdWithDocData(doc.id, doc.data())
          return result
        });
        return problems[0];
      } else {
        let problemsRef = storage.collection('problems') as Query;
        problemsRef = filterStoreData(theme, level, isToday, problemsRef);
        if (!isToday) {
          problemsRef = problemsRef.where('random', '<', key);
        }
        const result = problemsRef
          .limit(1)
          .get()
          .then(querySnapshot => {
            const problems = querySnapshot.docs.map(doc => {
              const result = mergeIdWithDocData(doc.id, doc.data())
              return result
            });
            return problems[0];
          })
          .catch(err => {
            console.log('Error getting documents', err);
          });
        return result;
      }
    })
    .catch(error => {
      console.log('Error getting documents', error);
    });
  return result;
};

export const getProblemByIdFireStore = function (
  docId: string
) {
  let problems = storage.collection('problems');
  const result = problems
    .doc(docId)
    .get()
    .then(doc => {
      const result = mergeIdWithDocData(doc.id, doc.data())
      return result;
    })
    .catch(error => {
      console.log('Error getting document', error);
    });
  return result;
}


export const splitWordsList = (words: string[]) => {
  let qWords1 = words.slice(0, 5);
  let qWords2 = words.slice(5, 10);
  let qWords3 = words.slice(10, 15);
  return [qWords1, qWords2, qWords3];
};

export const filterStoreData = (
  theme: number,
  level: number,
  isToday: boolean,
  problemsRef: any
) => {
  problemsRef = problemsRef.where('level', '==', Number(level));
  problemsRef = problemsRef.where('theme', '==', Number(theme));
  if (isToday) {
    let now = dayjs();
    let tomorrow = now.add(1, 'day');
    let yesterday = now.subtract(1, 'day');
    problemsRef = problemsRef
      .where(
        'isToday',
        '>',
        new Date(yesterday.format('YYYY-MM-DD'))
      )
      .where(
        'isToday',
        '<',
        new Date(tomorrow.format('YYYY-MM-DD'))
      );
  }
  return problemsRef;
};


export const mergeIdWithDocData = (docId: string, docData: any) => {
  const id = {
    id: docId
  }
  const result = Object.assign({}, id, docData);
  return result;
}
