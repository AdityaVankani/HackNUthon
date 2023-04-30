let mobilenet,puffin;

const newspaperSpinning = [{ opacity: 0},{ opacity: 1 },];
const newspaperTiming = {duration: 2000,iterations: 1,fill: "forwards"};

function modelReady() {
    let ele = document.getElementById('status')
    ele.innerHTML = 'Image model is ready!!!'
    ele.animate(newspaperSpinning, newspaperTiming)
    mobilenet.predict(puffin, gotResults)
    ele.style="color: rgb(49, 154, 164)"
}

function gotResults(error, results) {
    if (error) {
        console.error(error)
    } else {
        let max = 0
        let index = 0
        console.log(results)
        // if data is not sorted by probability
        for(let i=0; i<results.length; i++) {   
            let probability = results[i].confidence
            if (probability > max) {
                max = probability
                index = i
            }
        }
        let prob = Math.floor(results[index].confidence * 100);
        let object = results[index].label
        document.getElementById('level').innerHTML = prob + '%';
        let ele = document.getElementById('result')
        ele.innerHTML = object
    }
}

function Imageready() {
    image(puffin, 0, 0, width, height)
    puffin.hide()
}

function revealPath (event) {
    var imgag = URL.createObjectURL(event.target.files[0])
    document.getElementById('img').src = imgag
    setup(imgag);
}

function setup(url) { 
    createCanvas(0, 0)
    background(0)
    puffin = createImg(url === undefined ? "" : url, Imageready)
    puffin.hide()
        
    mobilenet = ml5.imageClassifier('mobilenet', modelReady)
}

fetch('https://dummyjson.com/users/filter?key=hair.color&value=Brown')
.then(res => res.json())
.then(console.log);

fetch('https://fakestoreapi.com/products/category/')
.then(res=>res.json())
.then(json=>console.log(json))