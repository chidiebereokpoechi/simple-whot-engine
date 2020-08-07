import { v4 } from 'uuid'
import { Player } from './player'
import { Room } from './room'

export enum GameState {
  Waiting,
  Started,
  Ended,
}

export class Game {
  private _id: string
  private _room: Room
  private _game_creator: Player
  private _game_state: GameState
  private _expected_number_of_players: number

  public get id(): string {
    return this._id
  }

  public get game_creator(): Player {
    return this._game_creator
  }

  public get players(): Player[] {
    return this._room.players
  }

  public get player_count(): number {
    return this._room.player_count
  }

  public get current_player(): Player {
    return this._room.current_player
  }

  public get next_player(): Player {
    return this._room.next_player
  }

  public get game_started(): GameState {
    return this._game_state
  }

  public get player_spaces_left(): number {
    return this._expected_number_of_players - this._room.player_count
  }

  constructor(...players: Player[]) {
    this._game_state = GameState.Waiting
    this._id = v4()
    this._room = new Room()
    this._room.add_players(...players)
    this._game_creator = players[0]
    this._expected_number_of_players = -Infinity
  }

  private ensure_game_is_waiting(): void {
    if (this._game_state === GameState.Started) {
      throw new Error('The game has already started')
    }

    if (this._game_state === GameState.Ended) {
      throw new Error('The game is already over')
    }
  }

  private add_player(player: Player): void {
    this.ensure_game_is_waiting()

    if (this.player_spaces_left === 0) {
      throw new Error('The game is full')
    }

    if (this._room.get_player(player.id) !== null) {
      throw new Error(`Player "${player.name}" is already in this game room`)
    }

    this._room.add_players(player)
  }

  public add_players(...players: Player[]): void {
    players.map((player) => this.add_player(player))
  }

  public is_player_creator(player: Player): boolean {
    return this._game_creator === player
  }

  public set_expected_number_of_players(count: number): void {
    this.ensure_game_is_waiting()

    if (count < this.player_count) {
      throw new Error(`The players in the game are more than "${count}"`)
    }

    if (count < 2) {
      throw new Error('A game must have at least 2 players')
    }

    this._expected_number_of_players = count
  }

  public shrink_to_player_count(): void {
    this.set_expected_number_of_players(this.player_count)
  }

  public start_game(): void {
    this.ensure_game_is_waiting()

    if (this.player_count < 2 || this.player_count < this._expected_number_of_players) {
      throw new Error('There are fewer players than expected')
    }

    this._game_state = GameState.Started
  }
}
