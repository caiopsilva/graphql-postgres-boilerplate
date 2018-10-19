import bookshelf from '../bookshelf'
import Post from './Post'

export default bookshelf.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  uuid: true,
  toJSON: function () {
    const attrs = bookshelf.Model.prototype.toJSON.apply(this, arguments)
    delete attrs.password
    return attrs
  },
  posts: function () {
    return this.hasMany(Post)
  }
})
