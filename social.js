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
    let queue = [[userID]];
    let visited = new Set();
    let recFollows = [];

    while (queue.length > 0){
      let path = queue.shift();
      let currentNode = path[path.length - 1];

      if (!visited.has(currentNode)){
        visited.add(currentNode);

        if (path.length > 2 && path.length <= degrees + 2){//Follows has to come from follow of a follow

            if (currentNode !== userID && this.follows[userID].has(currentNode) === false){ //in case it cycles back
              recFollows.push(currentNode);
            }
          }

          let currentFollows = this.follows[currentNode].keys();
          let nextNode = currentFollows.next().value;

          while (nextNode){
            let pathCopy = [...path];
            pathCopy.push(nextNode);
            queue.push(pathCopy);
            nextNode = currentFollows.next().value;
          }
        }
      }

    return recFollows
    }

  }


module.exports = SocialNetwork;
