import bookshelf from '../bookshelf'
import User from './User'

export default bookshelf.Model.extend({
  tableName: 'posts',
  hasTimestamps: true,
  uuid: true,
  users: function () {
    return this.belongsTo(User)
  }
})
