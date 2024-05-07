const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const  getElements=  () => {
        return  prisma.ligneCommande.findMany();
    }
    
    const getElementId=  (id) => {
        return  prisma.ligneCommande.findUnique({
            where: {
                id_ligneCmd: id
            }
        });
    }

    const createElement=  (data) => {
        return  prisma.ligneCommande.create({
            data
        });
    }
   
const updateElement=  (id, data) => {
        return  prisma.ligneCommande.update({
            where: {
                id_ligneCmd: id
            },
            data
        });
    }

   const deleteElement=  (id) => {
        return  prisma.ligneCommande.delete({
            where: {
                id_ligneCmd: id
            }
        });
    }

module.exports={
    getElements,
    getElementId,
    createElement,
    updateElement,
    deleteElement
}