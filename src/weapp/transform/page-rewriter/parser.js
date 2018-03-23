import sax from 'sax'

export default function parse (xml) {
  const parser = sax.parser(false, {
    trim: true,
    lowercase: true,
    position: true
  })
  let root
  let currentParent
  const stack = []

  parser.onerror = function (e) {
    console.log(e)
  }

  parser.ontext = function (t) {
    currentParent && (currentParent.content = t.trim() || '')
  }

  parser.oncdata = function (t) {
    currentParent && (currentParent.content = t.trim() || '')
  }

  parser.onopentag = function (node) {
    node.children = []
    node.location = {
      line: this.line,
      column: this.column
    }
    if (!root) {
      root = node
    }
    if (currentParent) {
      node.parent = currentParent
      currentParent.children.push(node)
    }
    currentParent = node
    stack.push(currentParent)
  }

  parser.onclosetag = function (tagName) {
    stack.length -= 1
    currentParent = stack[stack.length - 1]
  }

  parser.write(xml).close()

  return root
}
