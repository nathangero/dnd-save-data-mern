export function User(id = "", name = "", characters = {}) {
  this.id = id
  this.name = name
  this.characters = characters
}

User.prototype.fromSnapshot = function(snapshot) {
  const { id, name, characters } = snapshot;
  return User(id, name, characters);
}