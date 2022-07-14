const canvas = document.querySelector('canvas');
const cContext = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

cContext.fillRect(0,0, canvas.width, canvas.height)