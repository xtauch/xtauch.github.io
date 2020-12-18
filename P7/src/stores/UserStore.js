import { extendObservable} from "mobx";

class UserStore {
    constructor() {
        extendObservable(this, {
            loading : true,
            isLoggedIn: false,
            username: '',
            selectedPost: {},
            listOfPosts: [],
            listOfComments: []
        })
    }
}

export default new UserStore();