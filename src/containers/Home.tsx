import React, { Component } from 'react'
import { Dispatch } from 'redux'
import { RootState } from 'MyTypes'
import { connect } from 'react-redux'
import { loadUserAsync } from './actions'
import toJS from '../utils/toJS'
import { ITodoStateData } from './reducer'

type IHomeProps = {
  user: ITodoStateData
  dispatch: Dispatch
}
class Home extends Component<IHomeProps> {
  componentDidMount() {
    this.props.dispatch(loadUserAsync.request({ order: 'desc', sort: 'starts' }))
  }

  render() {
    const {
      user: { data },
    } = this.props
    return (
      <div>
        <h4>Home</h4>
        {data && data.length > 0 && data.map((v: any) => <div key={v.id}>{v.name}</div>)}
      </div>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  user: state.get('user'),
})

export default connect(mapStateToProps)(toJS(Home))
