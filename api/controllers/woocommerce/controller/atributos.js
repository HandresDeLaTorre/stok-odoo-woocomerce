'use strict'
/**
 * Controller Atribute
 */

const { woccommerce } = require('../../../../config/config')
const capitalize = require('capitalize')
const { categoryColumn, attribute } = require('../../../utils/construirProduct')

//const {productWoocomerce} = require('../../../utils/construirProduct')

const api = woccommerce

const searchAttribute = async () => {
    try {
        return await api.get('products/attributes')
    } catch (e) {
        console.error(`❌ ||Controller Error ==> ${e.message}`)
    }
}

const searchAttributeId = async (name) => {
    try {
        const nameCapitalize = capitalize.words(name)
        //console.log('***✔️ Name recibido en Attribute', nameCapitalize);
        const attributesArray = await api.get('products/attributes');
        const findAttributes = await attributesArray.data.find(attribute => attribute.name == nameCapitalize)
        const attributo = await {
            id: findAttributes.id,
            name: findAttributes.name
        }

        //console.log(`✔️ controller ${nameCapitalize}`, findAttributes); 
        return attributo;
    } catch (e) {
        console.error(`❌ ||Controller attribute Error ==> ${e}`)
    }
}

const createAttribute = async (name) => {
    const attribut = {
        name: name,
        slug: "pa_color",
        type: "select",
        order_by: "menu_order",
        has_archives: true
    }
    const newAttribute = await api.post('products/attributes', attribut);
    return newAttribute.data;
}

const validateAttribute = async (attributeName) => {
    try {
        const baseAttribute = await api.get('products/attributes');
        const attributes = baseAttribute.data.find(atributo=> {
            const exists = atributo.name == attributeName; 
            console.log('***✔️ atribute exist?', exists);
            return exists == true ?  true : false;
        })
        return attributes.name
    } catch (e) {
        console.error(`❌ ||Controller Error ==> ${e}`)
    }
}

const findAttribute = async () => {
    const atribute = await searchAttribute();
    const categs = await categoryColumn();
    const name = categorys.data[0].name
    console.log(name);
    return name
}



module.exports = {
    findAttribute,
    searchAttribute,
    searchAttributeId,
    validateAttribute
}
