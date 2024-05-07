const {PrismaClient}=require('@prisma/client');

const prisma=new PrismaClient();

const getElements=  ()=>{
    return  prisma.Commande.findMany();
}

const getElementId=(id)=>{
    return  prisma.Commande.findUnique({
        where:{
            id_cmd:id
        }
    });
}

const updateElement=(id,data)=>{
    return  prisma.Commande.update({
        where:{
            id_cmd:id
        },
        data
    });
}

const deleteElement=(id)=>{
    return  prisma.Commande.delete({
        where:{
            id_cmd:id
        }
    });
}

const createElement=(data)=>{
    return  prisma.Commande.create({
        data
    });
}

module.exports={
    getElements,
    getElementId,
    createElement,
    updateElement,
    deleteElement
}