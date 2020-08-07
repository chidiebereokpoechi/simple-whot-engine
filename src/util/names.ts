const names = [
  'Ariel',
  'Spencer',
  'Tarlok',
  'Olorin',
  'Anakin',
  'Snooki',
  'Brienne',
  'Darth Maul',
  'Wurlitzer',
  'Frank Ocean',
  'Rick',
  'Gandalf',
  'Jon Snow',
  'The Night King',
  'Frenchy',
  'Nathan Drake',
  'Finn',
  'KVN',
  'Sterling Archer',
]

export const random_name = (): string => {
  const index = Math.floor(Math.random() * (names.length - 1))
  return names[index]
}
