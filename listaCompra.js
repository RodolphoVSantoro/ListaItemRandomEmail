const GUIMode = {
	EDIT: 0,
	VIEW: 1
}

var _lastId;
var _itens;
var _listaDOM;

function hide(element){
	//element.style.display = "none";
	element.setAttribute("style", "display:none");
}

function show(element){
	//element.style.display = "";
	element.setAttribute("style", "display:block");
}

function itemIndexOf(myArray, searchId) {
    for(var i = 0, len = myArray.length; i < len; i++) {
        if (myArray[i].id === searchId) {
        	return i;
        }
    }
    return -1;
}

class ItemCompra{
	constructor(id) {
		this.id = id;
    	this.mode = GUIMode.EDIT;
    	//div com tudo de cada item
    	this.divDOM = document.createElement("div");
		
		//textField para nome do produto
		this.itemTFieldDOM = document.createElement("input");
		this.itemTFieldDOM.setAttribute("type", "text");
		this.divDOM.appendChild(this.itemTFieldDOM);

		//paragrafo com o nome do produto
		//comeca vazio e escondido
		this.itemDOM = document.createElement("p");
		hide(this.itemDOM);
		this.divDOM.appendChild(this.itemDOM);
		
		//paragrafo com os dados do usuário
		this.userDOM = document.createElement("p");
		this.divDOM.appendChild(this.userDOM);
		//busca json da api e cria texto
		fetch('https://randomuser.me/api/')
		  .then(response => response.json())
		  .then(data => {
		  	this.userDOM.appendChild(document.createTextNode(data.results[0].email));
		  });

		this.botaoConfirm = document.createElement("button");
		this.botaoConfirm.addEventListener("click", () => {this.confirm(this)});
		this.botaoConfirm.appendChild(document.createTextNode("confirm"));
		this.divDOM.appendChild(this.botaoConfirm);

		this.botaoEdit = document.createElement("button");
		hide(this.botaoEdit);
		this.botaoEdit.addEventListener("click", () => {this.edit(this)});
		this.botaoEdit.appendChild(document.createTextNode("edit"));
		this.divDOM.appendChild(this.botaoEdit);
		
		this.botaoDelete =  document.createElement("button");
		this.botaoDelete.addEventListener("click", () => {this.destroy(this)});
		this.botaoDelete.appendChild(document.createTextNode("delete"));
		this.divDOM.appendChild(this.botaoDelete);

		_listaDOM.appendChild(this.divDOM);
	}
	confirm(obj){
		obj.mode = GUIMode.VIEW;
		hide(obj.itemTFieldDOM);
		hide(obj.botaoConfirm);
		show(obj.itemDOM);
		show(obj.botaoEdit);
		//pega texto do tField e coloca no paragrafo
		obj.itemDOM.textContent = obj.itemTFieldDOM.value;
	}
	edit(obj){
		obj.mode = GUIMode.EDIT;
		hide(obj.itemDOM);
		hide(obj.botaoEdit);
		show(obj.itemTFieldDOM);
		show(obj.botaoConfirm);
	}
	destroy(obj){
		obj.itemTFieldDOM.remove();
		obj.itemDOM.remove();
		obj.userDOM.remove();
		obj.divDOM.remove();
		obj.botaoConfirm.remove();
		obj.botaoEdit.remove();
		obj.botaoDelete.remove();
		var index = itemIndexOf(_itens, obj);
		_itens.splice(index, 1);
	}
}

function insert(){
	_itens.push(new ItemCompra(_lastId));
	_lastId+=1;
}

window.onload = function main(){
	_lastId = 0;
	_itens = [];
	_listaDOM = document.getElementById("listaCompra");

	var botaoNew = document.getElementById("insert");
	botaoNew.addEventListener("click", insert);
}