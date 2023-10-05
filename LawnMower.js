const movingForward = (currentPosition) => {
    let xPosition = Number(currentPosition[0])
    let yPosition = Number(currentPosition[1])
    let orientation = currentPosition[2]
    if (orientation === 'N') {
        let nextYPosition = yPosition + 1
        return [xPosition, nextYPosition, orientation]
    }
    if (orientation === 'S') {
        let nextYPosition = yPosition - 1
        return [xPosition, nextYPosition, orientation]
    }
    if (orientation === 'W') {
        let nextXPosition = xPosition - 1
        return [nextXPosition, yPosition, orientation]
    }
    if (orientation === 'E') {
        let nextXPosition = xPosition + 1
        return [nextXPosition, yPosition, orientation]
    }
}

const orientationArr = ['N', 'E', 'S', 'W']

const nextIndex = (currentIndex, length) => {
    const next = (currentIndex + 1) % length
    return orientationArr[next]
}

const prevIndex = (currentIndex, length) => {
    const prev = (currentIndex - 1 + length) % length
    return orientationArr[prev]
}
const checkingPosition = (initialPosition, maxPosition) => {
    let currentXPosition = initialPosition[0]
    let currentYPosition = initialPosition[1]
    
    return (currentXPosition<=maxPosition[0] && currentYPosition<=maxPosition[1])
}
const movingPosition = (movingSequence, initialPosition,maxPosition) => {
    let currentPosition = [...initialPosition]
    let movingSequenceArr = movingSequence.split('')
    if (!checkingPosition(initialPosition,maxPosition)) {
        return 'initial position is out of area'
     }
        movingSequenceArr.forEach((instruction) => {
            if (instruction === 'G') {
                let currentIndex = orientationArr.indexOf(currentPosition[2])
                let newOrientation = prevIndex(currentIndex, orientationArr.length)
                currentPosition = [...currentPosition.slice(0, 2), newOrientation]
            }
            if (instruction === 'D') {
                let currentIndex = orientationArr.indexOf(currentPosition[2])
                let newOrientation = nextIndex(currentIndex, orientationArr.length)
                currentPosition = [...currentPosition.slice(0, 2), newOrientation]
            }
            if (instruction === 'A') {
                currentPosition = movingForward(currentPosition)
            }
        })
    
        return `Final position: ${currentPosition.join(' ')}`
    
}
module.exports = {movingPosition}