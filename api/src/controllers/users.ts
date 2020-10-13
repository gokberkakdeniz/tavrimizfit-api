import User, {IUser, UserRole} from "../models/User";


export const login = (username: string, password: string) => {
    User.findOne({ username: username }, (err, user) => {
        if (err) throw err;

        if (!user) {
            console.log("Wrong username!")
        } else {
            if (password == user.password) {
                console.log("Succes!");
            } else {
                console.log("Wrong password!");
            }
        }
    })
};

export const register = (username: string, password: string, email:string) => {
    const user: IUser = new User({
        username: username,
        password: password,
        email: email,
        type: "normal",
      });
      
      user
        .save()
        .then(() => console.log("Register is succesful!"))
        .catch((err) => console.log(err));
};