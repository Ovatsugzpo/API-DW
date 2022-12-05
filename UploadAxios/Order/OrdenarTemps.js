class OrdenarTemps{
    async pegarNumDoNome(array) {
        let numeroLista = []
        array.forEach(a => {
            let lista = a.split('S')
            let numero = Number(lista[1])
            numeroLista.push(numero)
        })
        return numeroLista
    }
    async ProprioSort(nums) {
        nums.sort((x,y)=>{return x - y})
        let arrayClone = []
        nums.forEach(ep => {arrayClone.push(`doctor.who.S${ep}`)})
        return arrayClone
    }
}
module.exports = new OrdenarTemps