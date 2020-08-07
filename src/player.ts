import { v4 } from 'uuid'
import { Game, GameState } from './game'
import { random_name } from './util'

export class Player {
  private readonly _id: string
  private _name: string
  private _game: Game | null

  public get id(): string {
    return this._id
  }

  public get name(): string {
    return this._name
  }

  public get is_game_creator(): boolean {
    if (!this._game) {
      return false
    }

    return this._game.is_player_creator(this)
  }

  public get in_a_game(): boolean {
    return this._game !== null && this._game.game_started !== GameState.Ended
  }

  constructor(name?: string) {
    this._id = v4()
    this._name = name ?? random_name()
    this._game = null
  }

  public edit_name(new_name: string): void {
    this._name = new_name
  }

  public create_game(): Game {
    if (this.in_a_game) {
      throw new Error('You cannot create a game while in another')
    }

    return (this._game = new Game(this))
  }

  public join_game(game: Game): void {
    if (this.in_a_game) {
      throw new Error('You cannot be in multiple concurrent games')
    }

    game.add_players(this)
    this._game = game
  }
}
