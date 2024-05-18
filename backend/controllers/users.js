import { v4 as uuidv4 } from 'uuid';

let users = []

export const getAllUsers = (req, res) => {
    res.send(users);
}

export const getUser = (req, res) => {
    const { id } = req.params;
    
    const foundUser = users.find((user) => user.id == id);

    res.send(foundUser);
}

export const createUser = (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuidv4() });

    res.send(`User with the name ${user.fullName} added to DB!`);
}

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { fullName, username } = req.body;

    const user = users.find((user) => user.id == id);

    if(fullName) user.fullName = fullName;
    if(username) user.username = username;

    res.send(`User with the id ${id} has been updated`);
}

export const deleteUser = (req, res) => {
    const { id } = req.params;
    
    users = users.filter((user) => user.id != id);

    res.send(`User with the id ${id} deleted from the database.`);
}