export interface IStoryProps {
  id: string,//document Id
  name: string, // story name
  story: string,//story content
  duration: number,
  problemId: string,
  wordsCount: number,
  publishedStatus: string,//ALL_FRIENDS,PRIVATE_FRIENDS,PUBLIC_IMAGINAWORD
  savedStatus:string,//PUBLISH,SAVE,PUASE
  access: string,//ALL_FRIENDS:1,PRIVATE_FRIENDS:1,PUBLIC_IMAGINAWORD:2
  reads: number,
  likes: number,
  level: number,//story level
  createdAt: Date,//published date
}
