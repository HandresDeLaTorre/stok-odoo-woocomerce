'use strict'
/**
 * Controller Category
 */

const { woccommerce } = require('../../../../config/config')
const capitalize = require('capitalize')
const { categoryColumn } = require('../../../utils/construirProduct')
const { categories, subCategories } = require('../../../utils/filecategorys')

//const {productWoocomerce} = require('../../../utils/construirProduct')

const api = woccommerce

const getCategory = async () => {
    try {
        const categoryArray = await api.get('products/categories')
        const category = categoryArray.data.map((i) => {
            return {
                id: i.id,
                name: i.name,
                parent: i.parent,
                count: i.count
            }
        })
        return category
    } catch (e) {
        console.error(`❌ ||Controller Error ==> ${e.message}`)
    }
}

const findCategory = async (nameCategory) => {
    const categorySearch = await api.get('products/categories');
    const category = categoryArray.data.map((i) => {
        return i.name
    })
    const findCategory = category.find((i) => i.name == nameCategory)
    const validate = findCategory != undefined
        ? { id: findCategory.id, name: findCategory.name } : 0;
    return validate
}

const findSubCategory = async (nameSubCategory) => {
    const categorySearch = await getCategory();
    const findSubCategory = categorySearch.find((i) => i.name == nameSubCategory)
    const validate = findSubCategory != undefined
        ? { id: findSubCategory.id, name: findSubCategory.name } : 0;
    return validate
}


// const findCategory = async () => {
//     const categorys = await getCategory();
//     const categs = await categoryColumn();
//     const name = categorys.data[0].name
//     console.log(name); 
//     return name
// }

const createCategory1 = async () => {
    try {
        const categs = await categoryColumn();
        const verifyCateg = Promise.all(categs.map(async (i) => {
            // const categoria = {

            //     name: i.category,
            // }
            // const subCategoria = {
            //     name: i.subCategory,
            // }
            const newCategoria = await findCategory(i.category)
            const newSubCategoria = await findSubCategory(i.subCategory)
            if (newCategoria <= 1) {
                const createCategory = await api.post('products/categories', { name: i.category })
                const parent = await createCategory.data.id
                // const createSubCategory = await api.post('products/categories', {name:i.subCategory, parent:parent})
                console.log('Soy el if', parent);
                return [{ id: parent, name: i.category },]
                // } else if (newCategoria >= 1 && newSubCategoria <= 1) {
                //     const createSubCategory = await api.post('products/categories', {name:i.subCategory, parent:newCategoria})
                //     console.log(`'Soy el else' ${newCategoria} *** ${JSON.stringify(newSubCategoria)}`)
                //    return createSubCategory.data.name
            } else {
                // const allCateg = await getCategory();
                // //const categcreate = {
                // //     categoria: i.category,
                // //     subCategoria: i.subCategory
                // // }
                return 'No se crearon categorias'
            }
            //const crearCategoria = (newCategoria >= 1) ? `La categoria ya existe:  ` : await api.post('products/categories', categoria);
            //return crearCategoria
        }))
        return verifyCateg
    } catch (e) {
        console.error(`❌ ||Controller Error ==> ${e.message}`)
    }
}


const createCategory2 = async () => {
    try {
        const categs = await categoryColumn();

        const categoryArray = await api.get('products/categories')

        const category = categoryArray.data.map((i) => {
            return i.name
        })

        const verifyCat = Promise.all(categs.map(async (categorias) => {
            const findCategory = await category.find((item) => item == categorias.category)
            const resultado = await findCategory === undefined
                ? categorias.category
                : 0;
            return await resultado
        }))
        const reduceCateg = (await verifyCat).reduce((acumulador, item) => {
            acumulador[item] = item;
            return acumulador//[...pV, cV]
        },
            {}
        )
        const categoryChek = Object.keys(reduceCateg)
        const newCategory = categoryChek.map(async (item) => {
            const newCateId = await api.post('products/categories', { name: item })
            return newCateId.data
        })
        console.log(newCategory);
        return categoryChek
    } catch (e) {
        console.error(`❌ ||Controller Error ==> ${e.message}`)
    }
}

const createCategory = async () => {
    try {
        const categExistentes = await api.get('products/categories');
        const arrayCategExistentes = await categExistentes.data;

        const categorias = await categories();

        const newCategory = Promise.all(categorias.map(async (cat) => {
            const categoria = cat.Category;
            const findCategory = arrayCategExistentes.find(c => c.name === categoria)
            // console.log(findCategory);
            if (findCategory !== undefined) {
                console.log(`La categoria ${categoria} ya existe`);
                return `La categoria ${categoria} ya existe`
            } else {
                console.log('***✔️ Este es el Else');
                const data = { name: categoria }
                const newCategoria = await api.post('products/categories', data)
                const categoriaId = await newCategoria.data

                return await categoriaId
            }
        }))
        const respuesta = await newCategory
        // Return final **
        return respuesta
    } catch (e) {
        console.error(`❌ ||Controller create categori Error ==> ${e.message}`)
    }
}

const encontrarIdCategoria = async () => {
    const categs = await categoryColumn();
    const categExistentes = await api.get('products/categories');
    //console.log(categExistentes.data);
    const result = await categs.map((i) => {
        const find = categExistentes.data.find((c) => c.name == i.Category)
        // console.log(find.id);
        const dataSubCategory = {
            name: i.subCategory,
            parent: find.id
        }
        return dataSubCategory
    })

    console.log(result);
    // const arraycategExistentes = categExistentes.map((c) => {
    //     const categoriasExistentes = {
    //         id: c.id,
    //         name: c.name,
    //     }
    //     return categoriasExistentes
    // })
    // return arraycategExistentes
    // const findCategPartner = await categs.map(async (c)=> {
    //     const categoriaBuscar = c.category
    //     const findCategoria = await categExistentes.data.find((categoria) => categoria.name == categoriaBuscar )
    //     console.log(findCategoria);
    //})

}
// encontrarIdCategoria() 
// console.log(encontrarIdCategoria());

const chekSubCategory = async () => {
    try {
        const categExistentes = await api.get('products/categories');
        const subCategorias = await subCategories();
        //buscar si la sub categoria existe.
        const existelaSubCategoria = Promise.all(subCategorias.map(async (i) => {
            try {
                const subCategorias = i.subCategory;
                const categoria = i.Category;
                const findSubCat = await categExistentes.data.find((c) => c.name == subCategorias);
                const findIdCategory = await categExistentes.data.find((c) => c.name == categoria);
                const parentId = await findIdCategory !== undefined ? findIdCategory.id : false
                if (findSubCat !== undefined) {
                    console.log(`La categoria ${subCategorias} ya existe`);
                    return `La categoria ${subCategorias} ya existe`
                } else {
                        const dataSub = { name: subCategorias, parent: parentId };
                       return dataSub
                }
            } catch (e) {
                console.error(`❌ || controller category interior 1 Error ==> ${e}`)
            }
        }));
        return existelaSubCategoria// arryNew2Reduce //reduceCateg1//
    } catch (e) {
        console.error(`❌ ||Controller Error ==> ${e}`, e)
    }
}

const createSubCategory = async () => {
    const subCategoriasListas = await chekSubCategory()
    const uno = subCategoriasListas.map((item, index)=>{ 
        // console.log('hola');
        setTimeout( async () => {
            const newCateId = await api.post('products/categories', item)
            console.log(await newCateId.data.id);
            return item.parent
        }, 3000*index)    
    })
    //console.log('await,', uno);
}
// newSubCat()



const createSubCategory4 = async () => {
    try {
        const categExistentes = await api.get('products/categories');
        const subCategorias = await subCategories();
        //buscar si la sub categoria existe.
        const existelaSubCategoria = Promise.all(subCategorias.map(async (i) => {
            try {
                const subCategorias = i.subCategory
                const findSubCat = await categExistentes.data.find((c) => c.name == subCategorias);
                const subCatId = await findSubCat !== undefined ? findSubCat.id : false

                if (subCatId >= 10) {
                    console.log(subCatId);
                } else {
                    const find = await categExistentes.data.find((c) => c.name == i.Category);
                    const parentId = find !== undefined ? find.id : false
                    if (parentId >= 10) {
                        console.log('***✔️');
                        const data = { name: subCategorias, parent: parentId }
                        const newSubcategoria = setTimeout(async () => {
                            try {
                                const newCateId = await api.post('products/categories', data)
                            } catch (e) {
                                console.error(`❌ || controller category interior 2 Error ==> ${e}`)
                            }

                        }, 500)
                        console.log(newSubcategoria);
                        return newSubcategoria
                    }
                }
            } catch (e) {
                console.error(`❌ || controller category interior 1 Error ==> ${e}`)
            }
        }))
        //Fin de Buscar 
        //Paso 1 buscamos el ID de la categoria padre
        // const categoryId = Promise.all(subCategorias.map(async (item)=> {
        //     const find = await categExistentes.data.find((c) => c.name == item.Category);
        //     const parentId = find !== undefined ? find.id : false 
        //     if (parentId) {
        //         const data = {name: item.subCategory, parent:parentId}
        //         const newSubcategoria =  setTimeout( async () => {
        //             const newCateId = await api.post('products/categories', data)
        //         },500)
        //         console.log(newSubcategoria.data);
        //         return data
        //     }
        // }));
        //Final Paso 1

        //Paso 2 crear la categoria 
        //const newSubcategoria =  setTimeout
        // Fin Paso 2
        return existelaSubCategoria// arryNew2Reduce //reduceCateg1//
    } catch (e) {
        console.error(`❌ ||Controller Error ==> ${e}`, e)
    }
}


const createSubCategory3 = async () => {
    try {
        const categs = await categoryColumn();
        const categExistentes = await api.get('products/categories');

        const arrayPaso1 = Promise.all(categs.map(async (item) => {
            const find = await categExistentes.data.find((c) => c.name == item.Category);
            const isTrue = find !== undefined ? find.id : false
            const subCat = item.subCategory
            const data1 = {
                slug: subCat,
                parent: isTrue
            }
            if (data1.parent != false) {
                return data1
            }
        }));
        const arrayPaso2 = await arrayPaso1

        const arrayPaso3 = arrayPaso2.map(iC => {
            console.log(iC);
            const slug = iC.slug
            return slug
        });

        // const arrayPaso3 = arrayPaso2.reduce((acc, item) => acc[item.slug] = item ,[])
        console.log(typeof categs);

        // const arrayNew2duplicados2 = new Map(arrayNew2duplicados)
        // const unicos = [...arrayNew2duplicados2.values()]

        // const nuevaSubcat = Promise.all(unicos.map(async (item) =>{
        //     const dataFinal = {
        //         name: item.slug,
        //         parent: item.parent
        //     }
        //     //const crearSubCat = await api.post('products/categories', data)
        //     return dataFinal
        // }))

        return arrayPaso3 // arryNew2Reduce //reduceCateg1//
    } catch (e) {
        console.error(`❌ ||Controller Error ==> ${e}`, e)
    }
}


const createSubCategory2 = async () => {
    try {

        const categoryArray = await api.get('products/categories')

        const category = categoryArray.data.map((i) => {
            return i.name
        })
        const categoryId = categoryArray.data.map((i) => {
            const categoriasExistentes = {
                id: i.id,
                name: i.name,
            }
            return categoriasExistentes
        })


        const categs = await categoryColumn();
        const categParent = Promise.all(categs.map(async (c) => {
            // const categoriaParent = categoryId
            // console.log(categoriaParent);
            // const findSubCategory =  await Object.values(category).find((item, index ) =>  item === c.Category);
            // const resultadoParent = await findSubCategory === undefined 
            //     ? 1//{parent:findSubCategory.id, nameSub:subCateg.subCategory}
            //     : findSubCategory; 
            //console.log(resultadoParent);
            return resultadoParent
            // return {name:c.subCategory, parent:c.category}
        }))

        const verifyCat = Promise.all(categs.map(async (subCateg) => {
            //console.log(await categorias.subCategory);
            const findSubCategory = await category.find((item) => item == subCateg.subCategory)
            const resultado = await findSubCategory === undefined
                ? { categ: subCateg.category, subCateg: subCateg.subCategory }
                : 0;

            return await resultado
        }))
        //console.log(await verifyCat);

        const reduceCateg = (await verifyCat).reduce((acumulador, item) => {
            acumulador[item] = item;
            return acumulador//[...pV, cV] 
        },
            {}
        )
        const categoryChek = Object.keys(reduceCateg)

        // const newCategory = categoryChek.map(async (item)=>{
        //     const newCateId = await api.post('products/categories', {name:item})
        //     return newCateId.data
        // }) 
        // console.log(newCategory);

        return await categoryId
    } catch (e) {
        console.error(`❌ ||Controller Error ==> ${e.message}`)
    }
}



const createSubCategory1 = async (parentId, nameSubCategory) => {
    try {
        const categs = await categoryColumn();
        const verifyCateg = Promise.all(categs.map(async (i) => {
            const crear = await findSubCategory(i.subCategory)
            const parent = await findCategory(i.category)
            const data = {
                name: i.subCategory,
                parent: parent
            }
            const crearSubCategoria = (crear >= 1) ? `La sub categoria ya existe: ${JSON.stringify(data)} ` : await api.post('products/categories', data);
            return crearSubCategoria
        }))
        return verifyCateg
    } catch (e) {
        console.error(`❌ ||Controller Error ==> ${e.message}`)
    }
}


module.exports = {
    createSubCategory,
    createCategory,
    findSubCategory,
    findCategory,
    getCategory,
    // newSubCat
}
