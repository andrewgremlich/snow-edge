let output = document.querySelector('output')

function outputToScreen(text) {
  let textNode = document.createTextNode(text),
    paragraphOutput = document.createElement('pre')

  paragraphOutput.appendChild(textNode)
  output.appendChild(paragraphOutput)
  paragraphOutput.scrollIntoView()
}

export default outputToScreen
