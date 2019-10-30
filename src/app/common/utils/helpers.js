import moment from 'moment';


//method for coverting object to an array
//use at eventListItem for firebase
export const objectToArray = (object) => {
    if(object){
        return Object.entries(object).map(e => Object.assign(e[1], {id: e[0]}))
    }
}



//creating new event for firestore
//this is for create newEvent inside the eventactions
export const createNewTestimony = (user, photoURL, testimony, facebookUrl, twitterUrl, gitUrl) => {
    testimony.date = moment(testimony.date).toDate();
    return {
        ...testimony,
        hostUid:user.uid,
        postedBy:user.displayName,
        hostPhotoURL:photoURL || 'assets/user.png',
        facebookUrl:facebookUrl || "",
        twitterUrl: twitterUrl || "",
        gitUrl: gitUrl || "",
        testimonies: {
            [user.uid]: {
                postDate: Date.now(),
                photoURL:photoURL ||  'assets/user.png',
                displayName:user.displayName,
                host:true
            }
        }
    }
}



//datatree for chat reply
export const createDataTree = dataset => {
    let hashTable = Object.create(null);
    dataset.forEach(a => hashTable[a.id] = {...a, childNodes: []});
    let dataTree = [];
    dataset.forEach(a => {
        if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
        else dataTree.push(hashTable[a.id])
    });
    return dataTree
};