import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class UserController {
  public async create(request: Request, response: Response) {
    const { nome, email, senha, endereco, telefone, tipo_usuario } = request.body;

    try {
      const newUser = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha,
          endereco,
          telefone,
          tipo_usuario,
        },
      });

      return response.status(201).json(newUser);
    } catch (error) {
      return response.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  public async readAll(request: Request, response: Response) {
    try {
      const users = await prisma.usuario.findMany();
      return response.status(200).json(users);
    } catch (error) {
      return response.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  public async readOne(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const user = await prisma.usuario.findUnique({
        where: { id_usuario: Number(id) },
      });

      if (!user) {
        return response.status(404).json({ error: "Usuário não encontrado" });
      }

      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, email, senha, endereco, telefone, tipo_usuario } = request.body;

    try {
      const updatedUser = await prisma.usuario.update({
        where: { id_usuario: Number(id) },
        data: {
          nome,
          email,
          senha,
          endereco,
          telefone,
          tipo_usuario,
        },
      });

      return response.status(200).json(updatedUser);
    } catch (error) {
      return response.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await prisma.usuario.delete({
        where: { id_usuario: Number(id) },
      });

      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export const userController = new UserController();

