import React, { useContext, ChangeEvent, SyntheticEvent } from 'react'
import GameContext from '../contexts/GameContext'
import EmitterContext from '../contexts/EmitterContext'
import { ClientEvent, PlayerVote } from '../typings/socket-events'
import { Button } from './visual'
import styled from './styled'
import { Round, Scores } from '../typings/game'

const Table = styled('table')`
  width: 100%;
  table-layout: fixed;
  margin-bottom: 2rem;

  thead {
    text-align: left;
  }
`

interface ResultsTableProps {
  categoryName: string
  answers: Round
  scores: Scores
}

const ResultsTable = ({ categoryName, answers, scores }: ResultsTableProps) => {
  const game = useContext(GameContext)
  const emit = useContext(EmitterContext)

  if (!game || !emit) {
    return null
  }

  const handleVote = (playerID: string, category: string) => (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const payload: PlayerVote = {
      playerID,
      category,
      value: event.target.checked,
    }
    emit(ClientEvent.VOTE_ANSWER, payload)
  }

  const getPlayerName = (uuid: string) =>
    game.players.find((player) => uuid === player.uuid)?.name || uuid

  return (
    <Table key={categoryName}>
      <colgroup>
        <col span={1} style={{ width: '20%' }} />
        <col span={1} style={{ width: '60%' }} />
        <col span={1} style={{ width: '20%' }} />
      </colgroup>
      <thead>
        <tr>
          <th>{/* Player */}</th>
          <th>{categoryName}</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(answers).map((playerID) => {
          const answer = answers[playerID][categoryName]
          const score = scores[playerID][categoryName]
          return (
            <tr key={`${categoryName}-${playerID}`}>
              <td>{getPlayerName(playerID)}</td>
              <td>{answer}</td>
              <td>
                <input
                  type='checkbox'
                  title='Vote'
                  checked={Boolean(score)}
                  onChange={handleVote(playerID, categoryName)}
                />{' '}
                {score}
              </td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

export default function ReviewRound() {
  const emit = useContext(EmitterContext)
  const game = useContext(GameContext)

  if (!game || !emit) return null

  const { config, state, players } = game
  const round = state.currentRound

  const handleNextRoundClick = (event: SyntheticEvent<HTMLButtonElement>) => {
    emit(ClientEvent.START_ROUND)
  }

  if (!round) return null

  const playerWhoEndedRound =
    players.find(({ uuid }) => uuid === round.endedByPlayer)?.name ||
    round.endedByPlayer

  return (
    <div>
      <h1>Game {config.id}</h1>
      <h2>Review of round {state.rounds.length + 1}</h2>
      <p>
        Round finished by <strong>{playerWhoEndedRound}</strong>
      </p>

      {config.categories.map((category) => {
        return (
          <ResultsTable
            categoryName={category}
            answers={round.answers}
            scores={round.scores}
          />
        )
      })}

      <Button onClick={handleNextRoundClick}>Next round</Button>
    </div>
  )
}
