let removedUsers = [];
let createdUsers = [];
const removedUsersKey = "removedUsers";
const createdUsersKey = "createdUsers";

const parseLocalStorage = () => {
  const removedUsersTemp = localStorage.getItem(removedUsersKey);
  if (!!removedUsersTemp) {
    removedUsers = removedUsersTemp.split("|").filter((el) => !!el.trim());
  }

  const createdUsersTemp = localStorage.getItem(createdUsersKey);
  if (!!createdUsersTemp && !!createdUsersTemp.trim()) {
    createdUsers = JSON.parse(createdUsersTemp);
  }
};

const addUserToRemoveList = (id) => {
  removedUsers.push(id);
  localStorage.setItem(removedUsersKey, removedUsers.join("|"));
};

const addUserToCreatedList = (user) => {
  createdUsers.push(user);
  localStorage.setItem(createdUsersKey, JSON.stringify(createdUsers));
};

parseLocalStorage();
