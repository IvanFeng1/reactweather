var images = {}
for (var i = 1; i <= 4; i++) {
    let index = i.toString()
    let ff = require(`./imgs/0${index}d@2x.png`)
    let gg = require(`./imgs/0${(index)}n@2x.png`)
    images[`0${index}d`] = ff
    images[`0${index}n`] = gg
}
let bb = require('./imgs/09d@2x.png')
let cc = require('./imgs/09n@2x.png')
images[`09d`] = bb
images[`09n`] = cc
for (var i = 10; i <= 13; i++) {
    if (i === 12) {

    } else {
        let index = i.toString()
        let ff = require(`./imgs/${index}d@2x.png`)
        let gg = require(`./imgs/${(index)}n@2x.png`)
        images[`${index}d`] = ff
        images[`${index}n`] = gg
    }
}
let a = require('./imgs/50d@2x.png')
let b = require('./imgs/50n@2x.png')
images['50d'] = a
images['50n'] = b
export default images 