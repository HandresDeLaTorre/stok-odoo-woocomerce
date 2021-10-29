/**
 * Controller Odoo API
 */
 require('dotenv').config()

const Odoo = require('odoo-await');



const odoo = new Odoo({
    baseUrl: process.env.PRODUODOOBASEURL,
    db: process.env.PRODUODOODB,
    port: process.env.PRODUODOOPORT,
    username: process.env.PRODUODOOUSER,
    password: process.env.PRODUODOOPSW,
    // baseUrl: 'https://ropahermosa.iku.solutions',
    // db: 'ropahermosa.iku.solutions',
    // port: 443,
    // username: 'gerencia@ropahermosamujer.com',
    // password: 'def8ba9ec544cf6f39eb4f1abddb94ae38e2c3cf'
})



/**
 * Busqueda de un contacto con el campo email
 * @param {string} email -Busqueda de un contacto con el campo email
 * @returns - id
 */
const searchContact = async (email)=> {
    await odoo.connect();
    return await odoo.search('res.partner', {email: email});
}

/**
 * Busqueda de un contacto con el campo email
 * @param {string} email_from -Busqueda de un lead con el campo email
 * @returns - id
 */
const searchLead = async (email_from)=> {
    await odoo.connect();
    return await odoo.search('crm.lead', {email_from: email_from});
}

/**
 * 
 * @param {string} countryName - Busca el Id de el pais para crear el contacto
 * @returns 
 */
const searchCountry = async (countryName)=> {
    await odoo.connect();
    return await odoo.search(`res.country`, {name: countryName});
}

/**
 * 
 * - Creamos un nuevo contacto
 * @param {string} name 
 * @param {string} email 
 * @param {number} country 
 * @param {string} mobile -Crear un nuevo contacto
 * @returns 
 */
const createContact = async (name, email, country, mobile)=> {
    await odoo.connect();
    return await odoo.create('res.partner', {
        name: name,
        email:email,
        country_id: country,
        mobile:mobile
    });
}


const createLead = async (partnerId, nameContact, mobile, userId ) => {
    await odoo.connect();
    return await odoo.create('crm.lead',{
        partner_id: partnerId, 
        name:`Nueva oportunidad desde Mautic de ${nameContact } para ${userId}`,
        phone:mobile,
        priority:'2'
    })
}


const readLeads = async (idLead) =>{
    await odoo.connect();
    return await odoo.read('crm.lead', idLead, ['name', 'stage_id', 'user_id', 'priority', '']);
}


const updateLeads = async (idLead) =>{
    await odoo.connect();
    return await odoo.update('crm.lead', idLead, {priority: '1', stage_id: 3});
}


const readContacts = async () => {
    try {
       await odoo.connect();
       const contacts = await odoo.read('res.partner', [8], ['name', 'email']);
       console.log(contacts);
    } catch (e) {
        console.error(e);
    }
}
/**
 * 
 * @param {string} domain -Dominio del campo que se busca
 * @param {sting} type - Tipo del campo que se busca
 * @returns 
 */
const fields = async (domain, type) => {
   //console.log( '*** Esta es la API de Odoo***', odoo.baseUrl);
    try {
       await odoo.connect();
       const fieldsName = await odoo.getFields(`${domain}.${type}`, ['required']);
       //console.log(fieldsName);
       return fieldsName
    } catch (e) {
        console.error(e); 
    }
}

const searchCode = async (barCode) => {
    await odoo.connect();
    return await odoo.search(`product.template`, {barcode:barCode});
}

const createCategory = async (newCategory) => {
    await odoo.connect();
    return await odoo.create('product.category', {name: newCategory, parent_id:false});
}

const createSubCategory = async (newSubCategory, parent) => {
    //const name = newSubCategory
    await odoo.connect();
    const parentId = await searchCategoryName(parent)
    // console.log(`*log Desde odooapi; ${newSubCategory} y el parent ${parent}`);
    // return parentId
    
    return await odoo.create('product.category', {name: newSubCategory, parent_id:parseInt(parentId)});
}

const searchCategoryNameComplete = async (nameCategory) => {
    await odoo.connect();
    // const categoryId = 
    return await odoo.search(`product.category`, {complete_name:nameCategory });
    //return await odoo.read(`product.category`, [parseInt(categoryId[0])])
}

const searchCategoryName = async (nameCategory) => {
    await odoo.connect();
    // const categoryId = 
    return await odoo.search(`product.category`, {name:nameCategory });
    //return await odoo.read(`product.category`, [parseInt(categoryId[0])])
}

const searchRead = async (domain, type) => {
    await odoo.connect();
    return await odoo.searchRead(`${domain}.${type}`);
}

const searchReadId = async (domain, type, id) => {
    await odoo.connect();
    return await odoo.read(`${domain}.${type}`, [parseInt(id)] , ['name', 'parent_id', 'child_id', 'complete_name']);
}

// const searchCategory = async ( ) => {
//     await odoo.connect();
//     //const productRef = 
//     return await odoo.search(`product.category`, {name: 'Mujer'});
//     ///return await odoo.search(`${domain}.${type}`, nameCategory);

//     // return await odoo.read(`${domain}.${type}`, [parseInt(productRef[0])]) 
// } 

/**
 * 
 * @param {string} ref -referencia interna del Producto
 */
const searchProduct = async (barCode) => {
    await odoo.connect();
    const productRef = await odoo.search(`product.template`, {barcode:barCode});
    return await odoo.read('product.template', [parseInt(productRef[0])])
} 

const createProduct = async (product) => {
    await odoo.connect();

    return await odoo.create(`product.template`, product)
}

const deleteProduct = async (productId) => {
    return await odoo.delete(`product.template`, productId )
}
//readContacts()

//readContacts()
module.exports = {
    fields,
    searchContact,
    searchLead,
    searchRead,
    searchProduct,
    //searchQuery,
    searchReadId,
    searchCode,
    readContacts,
    readLeads,
    createProduct,
    deleteProduct,
    createContact,
    createLead,
    updateLeads,
    searchCountry,
    createCategory,
    createSubCategory,
    searchCategoryName,
    searchCategoryNameComplete
}