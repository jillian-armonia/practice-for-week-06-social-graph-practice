// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++;

    let newUser = {
      name: name,
      id: this.currentID,
    };

    this.users[newUser.id] = newUser;
    this.follows[newUser.id] = new Set();

    return newUser.id;
  }

  getUser(userID) {
    if (userID in this.users) return this.users[userID];

    return null;
  }

  follow(userID1, userID2) {
    if (this.getUser(userID2)) {
      this.follows[userID1].add(userID2);
      return true;
    }

    return false;
  }

  getFollows(userID) {
    return this.follows[userID]
  }

  getFollowers(userID) {
    let followers = new Set();

    for (let id in this.follows){
      if (this.follows[id].has(userID)){
        followers.add(+id);
      }
    }

    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    
  }
}

module.exports = SocialNetwork;
