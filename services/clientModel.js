const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

  const  getElements=  () => {
        return  prisma.Client.findMany();
    }
    
    const getElementId=  (id) => {
        return  prisma.Client.findUnique({
            where: {
                id_clt: id
            }
        });
    }

    const createElement=  (data) => {
        return  prisma.Client.create({
            data
        });
    }
   
const updateElement=  (id, data) => {
        return  prisma.Client.update({
            where: {
                id_clt: id
            },
            data
        });
    }

   const deleteElement=  (id) => {
        return  prisma.Client.delete({
            where: {
                id_clt: id
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