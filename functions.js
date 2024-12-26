// načítání informací (v případě neexistujícího vrátí list)
const load_storage_data = function(type_inf, type_return){
    let names_data =  JSON.parse(localStorage.getItem(type_inf))
    if (names_data === null){
        if (type_return === "list"){
            names_data = []
        } else if (type_return === "object") {
            names_data = {}
        }
    }
    return names_data
}

const save_to_storage = function(value, where){
    localStorage.setItem(where, JSON.stringify(value))
}

const generateHTMLStructure = function(value){
    let contentDiv = document.createElement("div")
    let contentSpan = document.createElement("span")
    let contentButton = document.createElement("button")

    let anotherDiv = document.createElement("div")

    // nastavení vlastností
    contentButton.textContent = "Vymazat"
    contentSpan.textContent = value.firstName
    contentButton.name = value.id

    // přidávání
    anotherDiv.appendChild(contentButton)
    contentDiv.appendChild(contentSpan)
    contentDiv.appendChild(anotherDiv)

    anotherDiv.style.display = "inline-block"
    anotherDiv.style.textAlign = "right"
    anotherDiv.style.flex = "1"

    contentDiv.style.display = "flex"
    contentDiv.style.margin = "15px"

    contentSpan.style.fontWeight = "700"

    contentButton.style.padding = "4px 7.5px"
    contentButton.style.borderRadius = "5px"
    contentButton.style.backgroundColor = "red"
    contentButton.style.color = "white"
    contentButton.style.fontWeight = "700"
    contentButton.style.fontSize = "10px"
    contentButton.style.borderWidth = "0"

    contentButton.addEventListener("click", function(event){
        let forDelIndex = load_storage_data("names", "list").findIndex(function(one){
            return one.id === event.target.name
        })

        if (forDelIndex > -1){
        delFromLocalStorage(forDelIndex, "names")
        }
    })

    return contentDiv
}

const delFromLocalStorage = function(delIndex, nameList){
    let values = JSON.parse(localStorage.getItem(nameList))
    values.splice(delIndex, 1)

    save_to_storage(values, nameList)
    if (nameList === "names"){
        list_names_to_content_function()
    }
}

const create_no_showed_data = function(){
    let inf_p = document.createElement("p")
    inf_p.textContent = "No information showed"

    inf_p.style.lineHeight = "245px"
    inf_p.style.width = "100%"
    inf_p.style.margin = "auto 0"
    inf_p.style.textAlign = "center"
    inf_p.style.fontSize = "14px"
    inf_p.style.color = "grey"
    return inf_p
}