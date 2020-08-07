import { Player } from './player'

export class Room {
  private _players: Player[]
  private _player_map: Map<string, number>
  private _index_counter: number
  private _current_index: number

  public get players(): Player[] {
    return this._players
  }

  public get player_count(): number {
    return this._players.length
  }

  public get current_player(): Player {
    return this._players[(this._current_index = this._current_index % this._index_counter)]
  }

  public get next_player(): Player {
    return this._players[(this._current_index + 1) % this._index_counter]
  }

  public get other_players(): Player[] {
    return this._players.filter(({ id }) => id !== this.current_player.id)
  }

  constructor() {
    this._players = []
    this._player_map = new Map<string, number>()
    this._index_counter = this._current_index = 0
  }

  private add_player(player: Player): void {
    this._players.push(player)
    this._player_map.set(player.id, this._index_counter++)
  }

  public add_players(...players: Player[]): void {
    players.map((player) => this.add_player(player))
  }

  public get_player(id: string): Player | null {
    const index = this._player_map.get(id)
    return index === undefined ? null : this.players[index]
  }

  public next_turn(): void {
    this._current_index++
  }
}
