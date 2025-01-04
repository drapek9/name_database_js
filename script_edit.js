let nameID = location.hash.substring(1)

let names = load_storage_data("names", "list")
let the_name
let set_name_function = function(){
    the_name = names.find((oneName) => oneName.id === nameID)
    
    if (the_name === undefined){
        location.assign("/index.html")
    }
    
    document.querySelector("#name-edit").value = the_name.firstName
}

set_name_function()

document.querySelector("#changing-form").addEventListener("submit", function(event){
    event.preventDefault()
    fieldValue = event.target.elements.name_change
    if (fieldValue.value.trim() !== ""){
        the_name.firstName = document.querySelector("#name-edit").value

        save_to_storage(names, "names")
    } else {
        fieldValue.value = the_name.firstName
    }
})

window.addEventListener("storage", function(event){
    if (event.key === "names"){
        names = JSON.parse(event.newValue)
        set_name_function()
    }
})