import { Player, Room } from '../src'

const room = new Room()
const NUMBER_OF_PLAYERS = 4
const players = [...new Array(NUMBER_OF_PLAYERS)].map(() => new Player())
room.add_players(...players)

describe('room', () => {
  it('should be created without problems', () => {
    expect(() => new Room()).not.toThrow()
  })

  it('should correctly register all players', () => {
    expect(room.players).toHaveLength(NUMBER_OF_PLAYERS)
    expect(room.current_player).toBe(players[0])
    expect(room.next_player).toBe(players[1])
  })

  it('should correctly move to the next player', () => {
    room.next_turn()
    expect(room.current_player).toBe(players[1])
    expect(room.next_player).not.toBe(players[1])
  })

  it('should wrap around to player 1 when a full cycle is made', () => {
    for (let i = 0; i < NUMBER_OF_PLAYERS - 1; ++i) {
      room.next_turn()
    }

    expect(room.current_player).toBe(players[0])
    expect(room.next_player).toBe(players[1])
  })

  it('should correctly return players other than the current player', () => {
    expect(room.other_players).not.toContain(room.current_player)
    expect(room.other_players).toHaveLength(NUMBER_OF_PLAYERS - 1)
  })

  it('should correctly return a requested player', () => {
    expect(room.get_player(players[0].id)).toBe(players[0])
    expect(room.get_player(players[1].id)).not.toBe(players[0])
  })
})
