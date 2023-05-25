const users = [];

const addUser= ({id,name,room}) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  //if user exists with same name and room then throw error
  const existingUser = users.find((user)=>user.name === name && user.room === room);
  if(existingUser){
    return {error: 'Username is taken'};
  }

  //creating new user
  const user = {id,name,room};

  users.push(user);

  return {user};
}

const removeUser = (id) => {
  const index = users.findIndex((user)=> user.id ===id);
  if(index!== -1){

    //this will remove the user from the users array
    return users.splice(index,1)[0];
  }
}

const getUser = (id) => users.find((user)=> user.id ===id);

const getUsersInRoom = (room) => users.filter((user)=> user.room ===room) ;

module.exports = {addUser, removeUser, getUser, getUsersInRoom };