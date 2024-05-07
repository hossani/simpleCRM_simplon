const {PrismaClient}=require('@prisma/client');

const prisma=new PrismaClient();

const getElements=  ()=>{
    return  prisma.Facture.findMany();
}

const getElementId=(id)=>{
    return  prisma.Facture.findUnique({
        where:{
            id_fact:id
        }
    });
}

const updateElement=(id,data,TTC)=>{
    return  prisma.Facture.update({
        where:{
            id_fact:id
        },
        data:{
            ...data,
            montantTTC:TTC
        }
    });
}

const deleteElement=(id)=>{
    return  prisma.Facture.delete({
        where:{
            id_fact:id
        }
    });
}

const createElement=(data,HT,TTC)=>{
    return  prisma.Facture.create({
        data: {
            ...data, // Inclure les propriétés de data  (les donnees sont regroupées dans objet date avec spread je decompose l'object)
            montantHT :HT,
            montantTTC :TTC
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