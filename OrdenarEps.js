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
        array.forEach(a=>{
            let extensao = a.split(')')[1]
            extensaoLista.push(extensao)
        })
        return extensaoLista
    }
    async ProprioSort(nums) {
        nums.sort((x,y)=>{return x - y})
        let arrayClone = []
        nums.forEach(ep => {arrayClone.push(`DoctorWho (${ep}).mp4`)})
        return arrayClone
    }
}
module.exports = new OrdenarEps