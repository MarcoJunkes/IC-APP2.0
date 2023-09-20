const Users = require("../models/Users");
const Medicamentos = require("../models/Medicamentos");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function passwordValidation(password) {
    if (password.length < 8)
        return "Senha deve ter no mínimo 8 caracteres!";
    else if (!password.match(/[a-zA-Z]/g))
        return "Senha deve ter no mínimo uma letra!";
    else if (!password.match(/[0-9]+/))
        return "Senha deve ter no mínimo um número";
    else return "OK";
}

function generateToken(id) {
    console.log(process.env.JWT_SECRET);
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 82800, //Token expira em 24 horas
    });
    console.log(token);
    return token;
}

module.exports = {

    async authentication(req, res) {
        const email = req.body.email;
        const password = req.body.password;
    
        if (!email || !password)
            return res.status(400).json({ msg: "Campos obrigatórios vazios!" });
    
        try {
            const user = await Users.findOne({
                where: { email },
            });
    
            if (!user)
                return res.status(404).json({ msg: "Usuário ou senha Inválido!" });
            else {
                if (bcrypt.compareSync(password, user.senha)) {
                    const token = generateToken(user.email);
                    return res.status(200).json({ msg: "Autenticado com sucesso! ", token });
                } else
                    return res.status(404).json({ msg: "Usuário ou senha Inválido! " });
            }
        } catch (error) {
            console.error("Erro na autenticação:", error);
            res.status(500).json({ msg: "Erro na autenticação, consulte o console para obter detalhes." });
        }
    },
    

    async listAllUsers(req, res) {
        const users = await Users.findAll({
            order: [["nome", "ASC"]],
        }).catch((error) => {
            res.status(500).json({ msg: "Falha na conexão.", error });
        });
        if (users)
            res.status(200).json({ users });
        else
            res.status(404).json({ msg: "Não foi possível encontrar usuários." });
    },

    async newUser(req, res) {
        const {
            email,
            nome,
            telefone,
            senha,
            nome_responsavel,
            contato_responsavel
        } = req.body;
        if (!email || !nome || !telefone || !senha || !nome_responsavel || !contato_responsavel) {
            res.status(400).json({ msg: "Campos obrigatórios não preenchidos! " });
        }

        //validação de senha
        const passwordValid = passwordValidation(senha);
        if (passwordValid != "OK")
            return res.status(400).json({ msg: passwordValid });

        //veririfica se usuário já existe
        const isUserNew = await Users.findOne({
            where: { email },
        });

        if (isUserNew)
            res.status(403).json({ msg: "Usuário já cadastrado! " });
        else {
            //calcula hash da senha
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(senha, salt);

            const user = await Users.create({
                email,
                nome,
                telefone,
                senha: hash,
                nome_responsavel,
                contato_responsavel,
            }).catch((error) => {
                res.status(500).json({ msg: "Não foi possível inserir os dados! ", error });
            });
            if (user)
                res.status(201).json({ msg: "Usuário cadastro com sucesso!" });
            else res.status(404).json({ msg: "Não foi possível cadastrar usuário! " });
        }
    },

    async deleteUser(req, res) {
        const userEmail = req.params.email;
        const deleteUser = await Users.destroy({
            where: { email: userEmail },
        }).catch(async (error) => {
            const userComMedicamento = await Medicamentos.findOne({
                where: { userEmail },
            }).catch((error) => {
                res.status(500).json({ msg: "Falha na conexão ", error });
            });
            if (userComMedicamento)
                return res.status(403).json({ msg: "Usuário possuí medicamentos cadastrados. " });
        });
        if (deleteUser)
            res.status(200).json({ msg: "Usuário deletado com sucesso! " });
        else res.status(404).json({ msg: "Usuario não encontrado! " });
    },

    async updateUser(req, res) {
        const userEmail = req.body.email;
        const user = req.body;
        if (!userEmail)
            res.status(404).json({ msg: "Email não preenchido." });
        else {
            const verificaEmail = await Users.findOne({
                where: { email: userEmail },
            });
            if (!verificaEmail)
                res.status(403).json({ msg: "Usuário não encontrado! " });
            else {
                if (user.email || user.nome || user.telefone || user.senha || user.nome_responsavel || user.contato_responsavel) {
                    if (user.senha) {
                        const senhaValida = bcrypt.compareSync(user.senha, verificaEmail.senha);
                        if (!senhaValida) {
                            return res.status(403).json({ msg: "Senha atual inválida! " });
                        }
                        const salt = bcrypt.genSaltSync(12);
                        const novaSenhaHash = bcrypt.hashSync(user.senha, salt);
                        user.senha = novaSenhaHash; 
                    }
    
                    await Users.update(user, {
                        where: { email: userEmail },
                    });
                    return res.status(200).json({ msg: "Usuário atualizado com sucesso! " });
                } else {
                    return res.status(400).json({ msg: "Dados não preenchidos!" });
                }
            }
        }
    }
    
};