const names = load_storage_data("names", "list")


let myForm = document.querySelector("#test-form")
let theContentDiv = document.querySelector(".content-names")

let no_inf_l = create_no_showed_data()
theContentDiv.appendChild(no_inf_l)

let clearButton = document.querySelector("#clear-list")
let myCheckBox = document.querySelector(".my-checkbox")

clearButton.addEventListener("click", (event) => {
    event.preventDefault()
    list_names_to_content_function("eventik", true)
})

myForm.addEventListener("submit", (event) => {
    const names = load_storage_data("names", "list")
    event.preventDefault()
    if (event.target.elements.firstName.value.trim() !== ""){
        names.push(
            {
                id: uuidv4(),
                firstName: event.target.elements.firstName.value,
                adult: myCheckBox.checked
            }
        )
    
        save_to_storage(names, "names")
        myCheckBox.checked = false
    }

    event.target.elements.firstName.value = ""
})

let list_names_to_content_function = (event, clearIt=false) => {
    let allNamesInf = load_storage_data("names", "list")
    theContentDiv.innerHTML = ""
    if (allNamesInf.length !== 0 && !clearIt){
        allNamesInf.forEach(function(oneValue){
            let HTMLstructureResult = generateHTMLStructure(oneValue)
            theContentDiv.appendChild(HTMLstructureResult)
        })
        clearButton.style.display = "block"
    } else {
        let no_inf_l = create_no_showed_data()
        theContentDiv.appendChild(no_inf_l)
        clearButton.style.display = "none"
    }
}

document.querySelector(".to-content").addEventListener("click", list_names_to_content_function)

// document.querySelector("#adult_p").style.bottom = `${document.querySelector(".my-checkbox").offsetTop}px`

window.addEventListener("storage", (event) => {
    if (event.key === "names"){
        list_names_to_content_function()
        console.log("ahha")
    }
})