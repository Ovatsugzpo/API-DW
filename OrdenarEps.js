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
}
module.exports = new OrdenarEps