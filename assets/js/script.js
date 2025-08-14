const Gerador = async(content) => {
    const response = await fetch(`https://api.qrserver.com/v1/create-qr-code/?data=${content}&size=300x300`)
    return response.url
}

const atualiarAlert = (mensage, img, color) => {
    p.textContent = mensage
    imgStatus.setAttribute("src", `../assets/img/${img}.png`)
    alert.style.backgroundColor = color
}

function carregarImagem (src){
        return new Promise((resolve, reject) => {
            img.onload = () => resolve(img)
            img.onerror = () => reject(new Error("Falha ao carregar imagem"))
            img.setAttribute("src", src)
        })
}

const gerarQrCode = async(content) => {
    const url = await Gerador(content)
    return carregarImagem(url)
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

    if (!content){
        atualiarAlert("Por favor, insira uma URL ou texto para gerar seu QR Code.", "caution",  "hsla(59, 57%, 51%, 0.58)")
        section.appendChild(alert);
        return
    }

    btnGerar.disabled = true;

    atualiarAlert("Gerando...", "stopwatch", "hsla(0, 0%, 46%, 0.58)")
    btnGerar.value = "Gerando QR Code.."
    section.appendChild(alert)


    try{
        const imgGerada = await gerarQrCode(content)
        
        img.classList.add("img")
        div.classList.add("div")

        if (!section.contains(div)){
            section.appendChild(div);   
        }

        section.classList.add("active");

        atualiarAlert("QR Code Gerado!", "checkmark", "hsla(120, 41%, 56%, 0.58)")

        btnGerar.value = "Gerar outro";
        btnGerar.disabled = false;

    }catch(error){
        atualiarAlert("Erro ao gerar QR Code!", "close", "hsla(0, 41%, 56%, 0.58)" )
        console.error(error);
        btnGerar.disabled = false;
        btnGerar.value = "Gerar QR Code";
    }
});



btnGerar.addEventListener("click", () => {
    if (btnGerar.value === "Gerar outro" && section.contains(div)){
        form.reset()
        div.remove()
        section.classList.remove("active")
        input.value = ""
        btnGerar.value = "Gerar QR Code"
    }
})
 

        

