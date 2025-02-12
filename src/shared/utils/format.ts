export function toCash(value:number | string | undefined) {
    let retorno;

    if (!value || isNaN(Number(value))) {
        retorno = (0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    } else {
        retorno = Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return retorno;
}

export function toDate(value: string | null ) {
    let retorno

    if (!!value && value.length > 9) {
        retorno = (value).substr(0, 10).split('-').reverse().join('/')
    }else{
        retorno = value
    }

    return retorno || '';
}

export function toDateTime(value: string | undefined) {
    let retorno = ''


    if (!!value && value.length > 15) {
        let data = value.substr(2, 8).split('-').reverse().join('/')
        let hora = value.substr(11, 5)
        retorno = `${data} ${hora}`
    }

    return retorno;
}

export function toTel(telefone: string | null) {
    let retorno = telefone || ''
    if (telefone?.length === 13) {
   
        let telFormatado = telefone.slice(2, telefone.length)

        retorno = `(${telFormatado.slice(0, 2)}) ${telFormatado.slice(2, telFormatado.length - 4)} ${telFormatado.slice(7, telFormatado.length)}`
    }

    return retorno;
}

export function addDateToTime(value: string | undefined) {
    let retorno = ''


    if (!!value && value.length > 4) {
       
        retorno = `2020-01-01T${value}`
    }

    return retorno;
}

export function getStorage(value: string | undefined) {
  
    return JSON.parse(localStorage.getItem(value || '') || '{}');
}
