import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

class UserController {
    public async create(req: Request, res: Response) {
        const {id_user, name, email, password, phone, type_user} = req.body;

        try {
            const user = await prisma.user.create({
                data: {
                    id_user,
                    name,
                    email,
                    password,
                    phone,
                    type_user
                },

                select: {
                    id_user: true,
                    name: true,
                    email: true,
                    password: false,
                    phone: true,
                    type_user: true
                }
            });

            return res.status(201).json({
                message: "Usuário criado com sucesso!",
            });

        }   catch (error) {
            return res.status(500).json({
                messageError: "Erro interno no servidor." 
            });

        }
    }
}

export const userController = new UserController();