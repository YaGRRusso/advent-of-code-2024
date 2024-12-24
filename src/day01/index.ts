import clipboardy from 'clipboardy'

import * as fs from 'fs'
import * as path from 'path'

const filePath = path.join(__dirname, 'input.txt')

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) return

  const columns: { left: number[]; right: number[] } = { left: [], right: [] }
  const distancesArray: number[] = []

  const linesArray = data
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  linesArray.forEach((line) => {
    const [left, right] = line.split('   ')

    columns.left.push(parseInt(left))
    columns.right.push(parseInt(right))
  })

  columns.left.sort((a, b) => a - b)
  columns.right.sort((a, b) => a - b)

  const rowsCount = (columns.left.length + columns.right.length) / 2

  for (let i = 0; i < rowsCount; i++) {
    distancesArray.push(Math.abs(columns.right[i] - columns.left[i]))
  }

  const firstAnswer = distancesArray.reduce((acc, curr) => acc + curr, 0)
  console.log('First Answer:\n', firstAnswer)

  const counter: Record<number, number> = {}

  columns.left.forEach((leftNumber) => {
    columns.right.forEach((rightNumber) => {
      if (leftNumber === rightNumber) {
        if (counter[leftNumber]) {
          counter[leftNumber]++
        } else {
          counter[leftNumber] = 1
        }
      }
    })
  })

  const similarities: number[] = []

  Object.entries(counter).forEach(([key, value]) => {
    similarities.push(parseInt(key) * value)
  })

  const secondAnswer = similarities.reduce((acc, curr) => acc + curr, 0)
  console.log('Second Answer:\n', secondAnswer)

  clipboardy.writeSync([firstAnswer.toString(), secondAnswer.toString()].join(', '))
})
