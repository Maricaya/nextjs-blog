import {NextApiHandler} from "next";
import {getDatabaseConnection} from "../../../lib/getDatabaseConnection";
import {User} from "src/entity/User";
import md5 from "md5";

const Users: NextApiHandler =  async (req, res) => {
    const {username, password, passwordConfirmation} = req.body;
    const errors = {
        username: [] as string[],
        password: [] as string[],
        passwordConfirmation: [] as string[]
    };
    if (username.trim() === '') {
        errors.username.push('不能为空');
    }
    // if (/[a-zA-Z0-9]/.test(username.trim())) {
    //     errors.username.push('格式不合法');
    // }
    if (username.trim().length > 42) {
        errors.username.push('太长')
    }
    if (password === '') {
        errors.password.push('不能为空')
    }
    if (password !== passwordConfirmation) {
        errors.passwordConfirmation.push('密码不匹配');
    }
    const hasErrors = Object.values(errors).find(v => v.length > 0);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    if (hasErrors) {
        res.statusCode = 422;
        res.write(JSON.stringify(errors));
    } else {
        const connection = await getDatabaseConnection();
        const user = new User();
        user.username = username;
        user.passwordDigest = md5(password);
        await connection.manager.save(user);
        res.statusCode = 200;
        res.write(JSON.stringify(user));
    }
    res.end();
};

export default Users
