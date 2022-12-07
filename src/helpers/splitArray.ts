export function splitArray<T>(array: Array<T>, page: number, col: number) {
  const split = []

  /**
   *
   *
   * Splitting algorithm
   *
   * 0 - 29
   *
   * page = 1 -> total photos = 30 * 1 = 30
   * col = 1
   *
   * therefore,
   *
   * start = 0-9 ; 10-19; 20-29
   * start = 0-19; 20-39; 40-59
   *
   * total = 30
   *
   * col => start = (col - 1) * 10
   *
   *
   */

  const totalImages = 30 * page
  const imagesPerCol = totalImages / 3

  const start = (col - 1) * 10
  const end = start + (imagesPerCol - 1)

  for (let i = start; i <= end; i++) {
    split.push(array[i])
  }

  return split
}
