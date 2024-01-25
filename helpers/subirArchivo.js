import { v4 } from "uuid";
import path from "path";

export const subirArchivo = (files, extensionesPermitidas = ['jpg','png', 'jpeg', 'gift'], carpeta = '') => {

    return new Promise((resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        if (!extensionesPermitidas.includes(extension)) {
            reject(`La extension ${extension} no es permitida, Lista de extensiones permitidas : ${extensionesPermitidas}`)
        }

        const nombreTmp = v4() + '.' + extension;

        const uploadPath = path.join(process.cwd(), 'uploads/',carpeta, nombreTmp);

        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, (err) => {
            if (err)
                reject(err);

            resolve( nombreTmp );
        });
    });

}