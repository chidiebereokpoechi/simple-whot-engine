import { validate } from 'uuid'
import { Game, Player, random_name } from '../src'

describe('player', () => {
  it('should be created correctly', () => {
    const name = random_name()
    const player = new Player(name)

    expect(player).toBeInstanceOf(Player)
    expect(validate(player.id)).toBeTruthy()
    expect(player.name).toBe(name)
  })

  it('should be able to create a game correctly', () => {
    const player = new Player()
    expect(() => new Game(player)).not.toThrow()
  })

  it('should be able to join a game correctly', () => {
    const creator = new Player('1')
    const player = new Player('2')
    const game = creator.create_game()

    expect(game).toBeInstanceOf(Game)
    expect(() => player.join_game(game)).not.toThrow()
    expect(creator.is_game_creator).toBeTruthy()
    expect(player.is_game_creator).toBeFalsy()
  })

  it('should not be able to create a game while in another', () => {
    const player = new Player()
    player.create_game()
    expect(() => player.create_game()).toThrow(/in another/i)
  })

  it('should not be able to join a game while in another', () => {
    const game_1 = new Player().create_game()
    const game_2 = new Player().create_game()
    const player = new Player()
    player.join_game(game_1)

    expect(() => player.join_game(game_2)).toThrow(/concurrent/i)
  })

  it('should not be able to join a game that it is already in', () => {
    const player = new Player()
    expect(() => player.join_game(new Game(player))).toThrow(/already/i)
  })
})
