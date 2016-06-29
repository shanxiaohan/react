import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import { immutableRenderDecorator } from 'react-immutable-render-mixin'
import 'fe-reset'

import styles from './index.styl'
@immutableRenderDecorator
@CSSModules(styles)
export default class extends Component {
  state = {
    inputPage: 1,
    showInput: false
  }

  changePage = (index) => {
    console.log(index, 'changePage index')
    if (index === this.props.paginateData.currentPage) {
      return
    }
    if (typeof (this.props.onChangePage) !== 'undefined' && typeof (this.props.onChangePage) === 'function' && !isNaN(index)) {
      this.props.onChangePage(index)
    }
  }

  handleClick = (event) => {
    let targetVal = event.target.name
    let curPage = this.props.paginateData.currentPage
    if (targetVal === 'next') {
        this.props.onChangePage(curPage + 1)
      }else if (targetVal === 'previous') {
        this.props.onChangePage(curPage - 1)
      }
    }

  renderPagination = () => {
    let items = []
    let maxPage = this.props.paginateData.totalPage
    // console.log(maxPage, 'maxPage')
    let curPage = this.props.paginateData.currentPage

    if (maxPage > 5) {
      if (curPage - 1 > 3) {
        items.push(<button key={1} value={1} theme='theme1' className={(curPage === 1) ? styles.active : styles.normal} onClick={this.changePage.bind(null, 1)} >{1}</button>)
        items.push(<span key={2}> ... </span>)
        let temp = [curPage - 2, curPage - 1, curPage]
        temp.map((index) => {
          items.push(<button key={index} className={(curPage === index) ? styles.active : styles.normal} value={index} onClick={this.changePage.bind(null, index)}>{index}</button>)
        })
      } else {
        for (let index = 1; index <= curPage; index++) {
          items.push(<button key={index} value={index} className={(curPage === index) ? styles.active : styles.normal} onClick={this.changePage.bind(null, index)}>{index}</button>)
        }
      }
      if (maxPage - curPage > 3) {
        let t = [curPage + 1, curPage + 2]
        t.map((index) => {
          items.push(<button key={index} value={index} className={(curPage === index) ? styles.active : styles.normal} onClick={this.changePage.bind(null, index)}>{index}</button>)
        })
        items.push(<span key={maxPage - 1}> ... </span>)
        items.push(<button key={maxPage} value={maxPage} onClick={this.changePage.bind(null, maxPage)} className={(curPage === maxPage) ? styles.active : styles.normal} >{maxPage}</button>)
      } else {
        for (let index = curPage + 1; index <= maxPage; index++) {
          items.push(<button key={index} value={index} onClick={this.changePage.bind(null, index)} className={(curPage === index) ? styles.active : styles.normal} >{index}</button>)
        }
      }
    } else {
      for (let index = 1; index <= maxPage; index++) {
        items.push(<button key={index} value={index} onClick={this.changePage.bind(null, index)} className={(curPage === index) ? styles.active : styles.normal} >{index}</button>)
      }
    }
    return items
  }

  handleInput = event => {
    event.preventDefault()
    console.log(event.target.value, 'handleInput')
    this.setState({inputPage: parseInt(event.target.value)})
  }

  handleConfirm = event => {
    event.preventDefault()
    let turnPage = this.state.inputPage
    // console.log(+turnPage === parseInt(turnPage))
    if (!(+turnPage === parseInt(turnPage))) {
      return
    }
    let turnTo = parseInt(turnPage)
    // let turnTo = Math.max(1, turnPage)
    // turnTo = Math.min(this.props.paginateData.totalPage, turnTo)
    // ( turnTo !== turnPage ) ? this.setState({inputPage: turnTo}) : null
    !isNaN(turnTo) ? this.props.onChangePage(turnTo) : null
    console.log(turnTo, 'TURNPAGE')
    // console.log(turnPage, 'confirm click')
  }

  render () {
    let that = this
    let showPrevious = this.props.paginateData.currentPage > 1
    let showNext = this.props.paginateData.currentPage < this.props.paginateData.totalPage

    return (
      <ul className={styles.ul}>
        {showPrevious ? <li className={styles.inline}><button className={styles.previous} onClick={this.handleClick} name='previous'>上一页</button></li> : null}
        {that.renderPagination()}
        {showNext ? <li className={styles.inline}><button className={styles.next} onClick={this.handleClick} name='next'>下一页</button></li> : null}
         {this.state.showInput ? <li className={styles.inline}><button className={styles.confirm} onClick={this.handleConfirm.bind(this)}>确定</button></li> : null}
      </ul>
    )
  }
}
