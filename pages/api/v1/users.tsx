import {NextApiHandler} from 'next';
import {getDatabaseConnection} from '../../../lib/getDatabaseConnection';
import {User} from 'src/entity/User';

const Users: NextApiHandler = async (req, res) => {
    const {username, password, passwordConfirmation} = req.body;
    const connection = await getDatabaseConnection(); // 第一次链接能不能用 get

    const user = new User();
    user.username = username.trim();
    user.username = username;
    user.password = password;
    user.passwordConfirmation = passwordConfirmation;

    await user.validate();

    if (user.hasErrors()) {
        res.statusCode = 422;
        res.write(JSON.stringify(user.errors));
    } else {
        await connection.manager.save(user);
        res.statusCode = 200;
        res.write(JSON.stringify(user));
    }
    res.end();
};

export default Users;
