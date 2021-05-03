import { EnergizorParser } from '../src/energizor.parser'

describe('energizor parser', () => {
  it('should be defined', () => {
    const parser = new EnergizorParser()

    expect(parser).toBeDefined()
  })

  it('should take in a stringified symbol and get its name', () => {
    const parser = new EnergizorParser()
    const parsedText = parser.getNameFromSymbol(Symbol('woef').toString())

    expect(parsedText).toBe('woef')
  })

  it('should take the name out of the class like string', () => {
    const parser = new EnergizorParser()
    const parsedText = parser.getNameFromClassLikeString(
      'class CoolService { }'
    )

    expect(parsedText).toBe('CoolService')
  })
})
