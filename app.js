function loadImage(url) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = "blob";
        xhr.onload = function (e) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const res = event.target.result;
                resolve(res);
            }
            const file = this.response;
            reader.readAsDataURL(file);
        }
        xhr.send();
    });
}

let signaturePad = null;

window.addEventListener('load', async () => {

    const canvas = document.querySelector("canvas");
    canvas.height = canvas.offsetHeight;
    canvas.width = canvas.offsetWidth;

    signaturePad = new SignaturePad(canvas, {});

    const form = document.querySelector('#form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let curso = document.getElementById('curso').value;
        let nombree = document.getElementById('nombree').value;
        let nombrep = document.getElementById('nombrep').value;
        let codigoe = document.getElementById('codigoe').value;
        let cursoc = document.getElementById('cursoc').value;
        let c1 = document.getElementById('c1').value;
        let c2 = document.getElementById('c2').value;
        let c3 = document.getElementById('c3').value;
        let pa = document.getElementById('pa').value;
        let c4 = document.getElementById('c4').value;
        let cc1 = document.getElementById('cc1').value;
        let cl = document.getElementById('cl').value;
        let cl2 = document.getElementById('cl2').value;
        let cc2 = document.getElementById('cc2').value;

        generatePDF(curso, nombree, nombrep, cursoc, codigoe,c1,c2,c3,c4,cc1,cc2,cl,cl2,pa);
    })

});

async function generatePDF(curso, nombree, nombrep, cursoc, codigoe,c1,c2,c3,c4,cc1,cc2,cl,cl2,pa) {
    const image = await loadImage("REPORTE DE CORRECION DE CALIFICACION.jpg");
    const signatureImage = signaturePad.toDataURL();

    const pdf = new jsPDF('p', 'pt', 'letter');

    pdf.addImage(image, 'PNG', 0, 0, 565, 792);
    pdf.addImage(signatureImage, 'PNG', 120, 320, 300, 60);

    pdf.setFontSize(12);
    
    pdf.setFontSize(10);
    pdf.text(nombree, 250, 105);
    pdf.text(codigoe, 250, 90);
    pdf.text(curso, 250, 75);
    pdf.text(nombrep, 250, 120);
    pdf.text(cursoc, 250, 135);
    pdf.text(pa, 250, 150);
    pdf.text(c1, 290, 165);
    pdf.text(c2, 355, 165);
    pdf.text(c3, 420, 165);
    pdf.text(c4, 498, 165);
    pdf.text(cc1, 100, 289);
    pdf.text(cc2, 100, 315);
    pdf.text(cl, 320, 289);
    pdf.text(cl2, 320, 315);
    

    pdf.setFillColor(0,0,0);





    pdf.save("Solicitud de retiro de curso.pdf");

}