const Gerador = async(content) => {
    const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${content}&size=300x300`)
    return response.url
}

const section = document.querySelector("section")
const form = document.querySelector("form")
const div = document.createElement("div")
const input = document.getElementById("content")
const img = document.createElement("img")
const btnGerar = document.getElementById("btnQR")
const alert = document.createElement("div")
const p = document.createElement("p")
const imgStatus = document.createElement("img")


div.appendChild(img)
alert.appendChild(p)
alert.appendChild(imgStatus)
alert.classList.add("alert");


imgStatus.className = "imgStatus"



form.addEventListener("submit", async(e) => {
    e.preventDefault();
    
    const content = input.value.trim();
    if (imgStatus.getAttribute("src") === "../assets/img/caution.png"){
    }

    if (!content){
        p.textContent = "Por favor, insira uma URL ou texto para gerar seu QR Code."
        imgStatus.setAttribute("src", "../assets/img/caution.png")
        alert.style.backgroundColor = "hsla(59, 57%, 51%, 0.58)"
        section.appendChild(alert);
        return
    }

    btnGerar.disabled = true;
    imgStatus.setAttribute("src", "../assets/img/stopwatch.png")
    alert.style.backgroundColor = "hsla(0, 0%, 46%, 0.58)"
    btnGerar.value = "Gerando QR Code.."
    p.textContent = "Gerando..."
    section.appendChild(alert)

    try{
        const result = await Gerador(content)
        img.setAttribute("src", result)
        img.classList.add("img")
        div.classList.add("div")

        if (!section.contains(div)) section.appendChild(div);

        img.onload = () => {
            section.classList.add("active");
            p.textContent = "QR Code Gerado!";
            
            imgStatus.setAttribute("src", "../assets/img/checkmark.png")
            alert.style.backgroundColor = "hsla(120, 41%, 56%, 0.58)"

            btnGerar.value = "Gerar outro";
            btnGerar.disabled = false;
        };

    }
    catch(error){
        p.textContent = "Erro ao gerar QR Code!";
        imgStatus.setAttribute("src", "../assets/img/close.png")
        alert.style.backgroundColor = "hsla(0, 41%, 56%, 0.58)"
        console.error(error);
        btnGerar.disabled = false;
        btnGerar.value = "Gerar QR Code";
    }
});



btnGerar.addEventListener("click", () => {
    if (btnGerar.value === "Gerar outro"){
        form.reset()
        div.remove()
        section.classList.remove("active")
        input.value = ""
        btnGerar.value = "Gerar QR Code"
    }
})
 

        

