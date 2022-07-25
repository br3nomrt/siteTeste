class Skin {

    constructor() {
        this.id = 0;
        this.arraySkins = [];
        this.editId = null;
        window.addEventListener('load', function(event){
            console.log('ae krl')
            this.document.getElementById('mostrar-dados').click()
            
        })
        
    }
    
    
    adicionar() {
        this.id++
        const skin = this.inputDados()
        if (this.validador(skin)) {
            if (this.editId == null) {
                this.editar(skin)
            }
            else {
                this.atualizar(this.editId, skin)
            }
            
        }

        this.salvarDados()
        this.listaTabela()
        this.cancelar()

    }

    atualizar(id, skin) {

        for (let i = 0; i < this.arraySkins.length; i++) {
            if (this.arraySkins[i].id == id) {
                this.arraySkins[i].nomeSkin = skin.nomeSkin
                this.arraySkins[i].valor = skin.valor
                this.arraySkins[i].quantidade = skin.quantidade
                this.arraySkins[i].valorVenda = skin.valorVenda
                this.arraySkins[i].lucro = skin.lucro
            }
        }
    }


    listaTabela() {
        let tbody = document.getElementById('tbody')
        tbody.innerText = ''

        for (let i = 0; i < this.arraySkins.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell()
            let td_skin = tr.insertCell()
            let td_quantidade = tr.insertCell()
            let td_valor = tr.insertCell()
            let td_valorVenda = tr.insertCell()
            let td_lucro = tr.insertCell()
            let td_acao = tr.insertCell()

            td_id.innerText = this.arraySkins[i].id
            td_skin.innerText = this.arraySkins[i].nomeSkin
            td_quantidade.innerText = this.arraySkins[i].quantidade
            td_valor.innerText = this.arraySkins[i].valor
            td_valorVenda.innerText = this.arraySkins[i].valorVenda
            td_lucro.innerText = this.arraySkins[i].lucro

            td_id.classList.add('center')
            td_skin.classList.add('center')
            td_quantidade.classList.add('center')
            td_valor.classList.add('center')
            td_acao.classList.add('center')
            td_valorVenda.classList.add('center')
            td_lucro.classList.add('center')

            let imgEdit2 = document.createElement('img');
            imgEdit2.src = 'https://cdn-icons-png.flaticon.com/512/1827/1827951.png'

            td_acao.appendChild(imgEdit2)
            imgEdit2.setAttribute('onclick', "skin.edit(" + JSON.stringify(this.arraySkins[i]) + ")")

            let imgDelete = document.createElement('img');
            imgDelete.src = 'https://cdn-icons-png.flaticon.com/512/73/73858.png'

            td_acao.appendChild(imgDelete)
            imgDelete.setAttribute('onclick', "skin.deletar(" + this.arraySkins[i].id + ")")

        }
    }


    editar(skin) {

        skin.valor = parseFloat(skin.valor)
        
        this.arraySkins.push(skin)
        
    }

    edit(dados) {

        this.editId = dados.id

        document.getElementById('skin').value = dados.nomeSkin
        document.getElementById('quantidade').value = dados.quantidade
        document.getElementById('valor').value = dados.valor
        document.getElementById('valorVenda').value = dados.valorVenda
        dados.lucro

        document.getElementById('att').innerText = 'atualizar'
    }

    inputDados() {
        const skin = {}

        skin.id = this.id
        console.log(this.id)
        skin.nomeSkin = document.getElementById('skin').value;
        skin.quantidade = document.getElementById('quantidade').value;
        skin.valor = document.getElementById('valor').value;
        skin.valorVenda = document.getElementById('valorVenda').value


        skin.lucro = (skin.quantidade * skin.valor)
        let totalGasto = skin.lucro
        skin.lucro = (skin.quantidade * skin.valorVenda)
        let totalGanho = skin.lucro

        skin.lucro = (totalGanho * 0.9 - totalGasto) / skin.quantidade;

        return skin
    }

    validador(skin) {

        let msg = ''

        if (skin.nomeSkin == '') {
            alert("precisa adicionar algo")
        }

        if (msg != '') {
            alert(msg)
            return false
        }

        return true

    }

    deletar(id) {
        let tbody = document.getElementById('tbody')

        for (let i = 0; this.arraySkins.length; i++) {
            if (this.arraySkins[i].id == id) {
                this.arraySkins.splice(i, 1)
                tbody.deleteRow(i);
                this.salvarDados()
            }
        }
    }

    cancelar() {
        document.getElementById('skin').value = ''
        document.getElementById('quantidade').value = ''
        document.getElementById('valor').value = ''
        document.getElementById('valorVenda').value = ''

        document.getElementById('att').innerText = 'adicionar'
        this.editId = null;
    }

    salvarDados() {
        const data = JSON.stringify(this.arraySkins)
        localStorage.setItem('skins', data)
    }

    getItens() {
        if (localStorage.getItem('skins')) {
            const data = localStorage.getItem('skins')
            this.arraySkins = JSON.parse(data || {})
        }
    }

    mostrarDados() {
        this.getItens()
        this.listaTabela()
        console.log(this.arraySkins.length)
        this.id = this.arraySkins.length
        
    }

    limpar() {
        localStorage.clear()
    }

}


var skin = new Skin;



