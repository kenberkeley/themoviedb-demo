import React from 'react'
import { func } from 'prop-types'
import { WatchListType } from '~/types/watchlist'
import getYearFromDate from '~/utils/getYearFromDate'
import getLangByCode from '~/utils/getLangByCode'
import getImgUrl from '~/utils/getImgUrl'
import styles from './SearchResultsList.module.css'

const columns = [
  /* [label<string>, field<string>, formatter(val, row)<function?>] */
  ['Cover', 'poster_path', (url, item) => (
    <img className={styles.poster} alt={item.name} src={getImgUrl(url, 'poster')} />
  )],
  ['Title', 'name'],
  ['Year', 'first_air_date', getYearFromDate],
  ['Rate', 'vote_average', val => val + '%'],
  ['Lang', 'original_language', getLangByCode]
]

export default class SearchResultsList extends React.Component {
  static propTypes = {
    results: WatchListType,
    watchlist: WatchListType,
    addToWatchList: func.isRequired,
    rmFromWatchList: func.isRequired
  }

  render () {
    const { results, watchlist, addToWatchList, rmFromWatchList } = this.props
    const isWatched = id => !!watchlist.find(item => item.id === id)
    return (
      <table className='table is-fullwidth'>
        <thead>
          <tr>
            {
              columns.map(([label, field]) => (
                <td key={field}>{ label }</td>
              ))
            }
            <td>Add / Remove Watchlist</td>
          </tr>
        </thead>
        <tbody>
          {
            results.map(item => (
              <tr key={item.id}>
                {
                  columns.map(([label, field, formatter]) => (
                    <td key={field}>
                      {
                        formatter
                          ? formatter(item[field], item)
                          : item[field]
                      }
                    </td>
                  ))
                }
                <td>
                  {
                    isWatched(item.id)
                      ? <button className='button' onClick={() => rmFromWatchList(item.id)}
                          aria-label='remove from watchlist'>
                          <span className='icon is-small'>
                            <i className='fas fa-trash'></i>
                          </span>
                        </button>
                      : <button className='button' onClick={() => addToWatchList(item)}
                          aria-label='add to watchlist'>
                          <span className='icon is-small'>
                            <i className='fas fa-plus'></i>
                          </span>
                        </button>
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    )
  }
}
