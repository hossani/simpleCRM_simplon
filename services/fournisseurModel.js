const {PrismaClient}=require('@prisma/client');

const prisma= new PrismaClient();

const getElements=  ()=>{
    return  prisma.Fournisseur.findMany();
}

const getElementId=(id)=>{
    return  prisma.Fournisseur.findUnique({
        where:{
            id_fourni:id
        }
    });
}

const updateElement=(id,data)=>{
    return  prisma.Fournisseur.update({
        where:{
            id_fourni:id
        },
        data
    });
}

const deleteElement=(id)=>{
    return  prisma.Fournisseur.delete({
        where:{
            id_fourni:id
        }
    });
}

const createElement=(data)=>{
    return  prisma.Fournisseur.create({
        data
    });
}

module.exports={
    getElements,
    getElementId,
    createElement,
    updateElement,
    deleteElement,
    
}