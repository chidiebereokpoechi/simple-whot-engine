import { validate } from 'uuid'
import { Game, GameState, Player } from '../src'

const creator = new Player()
const player = new Player()
const game = new Game(creator)

describe('game', () => {
  it('should be created correctly', () => {
    expect(() => new Game(new Player())).not.toThrow()
    expect(game.game_creator).toBe(creator)
    expect(game.game_started).toBe(GameState.Waiting)
    expect(validate(game.id)).toBeTruthy()
    expect(game.players).toContain(creator)
  })

  it('should add a player correctly', () => {
    expect(() => game.add_players(player)).not.toThrow()
    expect(game.next_player).toBe(player)
    expect(game.players).toContain(player)
  })

  it('should correctly identify if a player is the creator', () => {
    expect(game.is_player_creator(creator)).toBeTruthy()
    expect(game.is_player_creator(player)).toBeFalsy()
  })

  it('should be able to select an expected number of players correctly', () => {
    const game = new Game(new Player())
    const players = [new Player(), new Player(), new Player()]

    expect(() => game.set_expected_number_of_players(4)).not.toThrow()
    expect(() => game.add_players(...players)).not.toThrow()
    expect(() => game.add_players(new Player())).toThrow(/full/i)
    expect(() => game.set_expected_number_of_players(3)).toThrow(/more/i)
    expect(() => new Game(new Player()).set_expected_number_of_players(-3)).toThrow(/more than/i)
  })

  it('should start correctly', () => {
    const game = new Game(new Player())
    expect(() => game.start_game()).toThrow(/fewer/i)

    game.add_players(new Player(), new Player())
    expect(() => game.start_game()).not.toThrow()
    expect(() => game.start_game()).toThrow(/already/i)
  })

  it('should not start if the players are incomplete', () => {
    const game = new Game(new Player())
    game.set_expected_number_of_players(5)
    expect(() => game.start_game()).toThrow(/fewer/i)
  })

  it('should shrink to fit available players correctly', () => {
    const game = new Game(new Player(), new Player())
    game.set_expected_number_of_players(5)
    expect(() => game.start_game()).toThrow(/fewer/i)

    game.shrink_to_player_count()
    expect(() => game.start_game()).not.toThrow()
  })
})
