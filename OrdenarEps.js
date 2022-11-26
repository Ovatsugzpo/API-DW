class OrdenarEps{
    async pegarNumDoNome(array) {
        let numeroLista = []
        array.forEach(a => {
            let lista = a.split('(')
            let numeroStr = lista[1].split(')')
            let numero = Number(numeroStr[0])
            numeroLista.push(numero)
        })
        return numeroLista
    }
    async pegarEp(array) {
        let numeroLista = []
        array.forEach(a => {
            let lisEp = Number(a.split('Ep')[1].split('.')[0])
            let lisTemp = Number(a.split('_T')[1].split('-')[0])
            let EpTemp = {lisEp, lisTemp}
            numeroLista.push(EpTemp)
        })
        return numeroLista
    }

    async pegarExtensao(array){
        let extensaoLista = []
        for (let i = 0; i <= array.length; i++) {
            let extensao = array.split('.')[1]
            extensaoLista.push(extensao)
        } 
        return extensaoLista
    }
    async ProprioSort(nums, extensao) {
        nums.sort((x,y)=>{return x - y})
        let arrayClone = []
        nums.forEach(ep => {arrayClone.push(`DoctorWho (${ep}).${extensao}`)})
        return arrayClone
    }

    async ProprioSort2(EpTemp, extensao){
        let listaEp = []
        EpTemp.forEach((epi) => {
            listaEp.push(epi.lisEp)  
        })
        listaEp.sort((x,y)=>{return x - y})
        let arrayClone = []
        listaEp.forEach((ep, I) => {
            let Temp = EpTemp[I].lisTemp
            arrayClone.push(`DoctorWho_T${Temp}-Ep${ep}.${extensao}`)
        })
        return arrayClone
    }
}
module.exports = new OrdenarEps