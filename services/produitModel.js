const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const  getElements=  () => {
        return  prisma.Produit.findMany();
    }
    
    const getElementId=  (id) => {
        return  prisma.Produit.findUnique({
            where: {
                id_prod: id
            }
        });
    }

    const createElement=  (data,taux) => {
        return  prisma.Produit.create({
            data: {
                ...data, // Inclure les propriétés de data  (les donnees sont regroupées dans objet date avec spread je decompose l'object)
               taux_marge:taux
            }
        });
    }
   
const updateElement=  (id, data,taux) => {
        return  prisma.Produit.update({
            where: {
                id_prod: id
            },
            data:{
                ...data,
            taux_marge:taux
            }
        });
    }

   const deleteElement=  (id) => {
        return  prisma.Produit.delete({
            where: {
                id_prod: id
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