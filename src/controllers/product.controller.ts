import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductController {
  public async create(request: Request, response: Response) {
    const { nome, descricao, preco, estado, id_usuario } = request.body;

    try {
      const newProduct = await prisma.produto.create({
        data: {
          nome,
          descricao,
          preco,
          estado,
          id_usuario,
        },
      });

      return response.status(201).json(newProduct);
    } catch (error) {
      console.error("Erro ao criar o produto: ", error);
      return response.status(500).json({ error: "Erro interno no servidor", details: (error as Error).message });
    }
  }

  public async readAll(request: Request, response: Response) {
    try {
      const products = await prisma.produto.findMany();
      return response.status(200).json(products);
    } catch (error) {
      return response.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  public async readOne(request: Request, response: Response) {
    const { id } = request.params;

    try {
      const product = await prisma.produto.findUnique({
        where: { id_produto: Number(id) },
      });

      if (!product) {
        return response.status(404).json({ error: "Produto não encontrado" });
      }

      return response.status(200).json(product);
    } catch (error) {
      return response.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  public async update(request: Request, response: Response) {
    const { id } = request.params;
    const { nome, descricao, preco, estado, id_usuario } = request.body;

    try {
      const updatedProduct = await prisma.produto.update({
        where: { id_produto: Number(id) },
        data: {
          nome,
          descricao,
          preco,
          estado,
          id_usuario,
        },
      });

      return response.status(200).json(updatedProduct);
    } catch (error) {
      return response.status(500).json({ error: "Erro interno no servidor" });
    }
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    try {
      await prisma.produto.delete({
        where: { id_produto: Number(id) },
      });

      return response.status(204).send();
    } catch (error) {
      return response.status(500).json({ error: "Erro interno no servidor" });
    }
  }

}

export const productController = new ProductController();
